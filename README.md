# GAE galleries — 2026-09-21

Open `index.html` directly or serve this directory with a static HTTP server.

The teaser before TL;DR contains 18 paired RGB / progressive videos: 17 from jiahaoluresults and the former Curated 02 toy-room scene. Existing galleries retain RGB, depth, progressive videos and pose visualization. Video galleries omit PLY assets and interactive point-cloud displays. The OmniWorld section is removed; curated cases 03, 15 and 19 are removed, with original case numbering retained.

MVS-Synth follows the curated gallery, with original cases 02, 05, 10, 11, 13 and 16 removed. Ten cases remain, retaining their original numbering.

The image gallery restores 20 RGB/depth pairs from gld-page-preview. The pipeline overview and vector PDF are included; the image gallery includes 20 interactive PLY models, loaded on demand, with a PLY download link.

## Synchronized sequences — 2026-09-22

`sequence-player.js` gives the teaser, Indoor and Outdoor galleries one six-second
scene timeline per pair. It maps each 81-view video's native duration to that
timeline, waits for both videos, corrects drift, and shares play/pause, seeking,
looping and visibility handling. RGB/Depth/Pose switches retain the scene position
and paused state. Pose mode draws the corresponding camera trajectory frame.

31 exactly matched depth videos and predicted pose sequences were imported from
`page0920-depth-pose-slim` into `assets/sequence-extras/`; original pose NPY files
are retained. `scripts/import-sequence-assets.py` regenerates the browser data
(with NumPy and FFmpeg). Of 55 displayed cases, 53 now have Depth and Pose.
The supplied pack does **not** contain `lm-lingbo-forward` (Temple approach) or
`lm-lingbo-world2` (Village gate); their unavailable modes remain hidden.

Preview with `python3 scripts/preview.py`, then open `http://127.0.0.1:8766`.
This server supports HTTP byte ranges, which Chrome needs for reliable MP4 seeks;
a server that ignores Range requests can reset video seeks to the beginning.
For deployment, use static hosting with byte-range support.

Browser regression: `node scripts/test-sequence-player.cjs` (Playwright required;
set `CHROME_PATH` if Chrome is installed elsewhere). It checks different native
frame rates, pause/seek/mode retention, looping, and all available depth/pose cases.
