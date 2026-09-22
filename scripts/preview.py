"""Local preview with HTTP byte ranges required for reliable video seeking."""
import http.server, re, os
from pathlib import Path
os.chdir(Path(__file__).resolve().parents[1])
class Handler(http.server.SimpleHTTPRequestHandler):
 def send_head(self):
  path=self.translate_path(self.path)
  match=re.fullmatch(r'bytes=(\d+)-(\d*)',self.headers.get('Range',''))
  self.byte_range=None
  if not match or not os.path.isfile(path):return super().send_head()
  size=os.path.getsize(path);start=int(match[1]);end=min(int(match[2]) if match[2] else size-1,size-1)
  if start>=size or start>end:
   self.send_response(416);self.send_header('Content-Range',f'bytes */{size}');self.end_headers();return None
  f=open(path,'rb');f.seek(start);self.byte_range=end-start+1
  self.send_response(206);self.send_header('Content-Type',self.guess_type(path));self.send_header('Accept-Ranges','bytes');self.send_header('Content-Range',f'bytes {start}-{end}/{size}');self.send_header('Content-Length',str(self.byte_range));self.end_headers();return f
 def copyfile(self,source,output):
  if self.byte_range is None:return super().copyfile(source,output)
  remaining=self.byte_range
  while remaining:
   chunk=source.read(min(65536,remaining))
   if not chunk:break
   output.write(chunk);remaining-=len(chunk)
 def log_message(self,*args):pass
http.server.ThreadingHTTPServer(('127.0.0.1',8766),Handler).serve_forever()
