# GAE reference camera supplement

This package contains the exact 81-view input/reference camera sequences used by
the listed project-page evaluations. No video generation, model inference, or
training was rerun. `input_c2w.npy` is always OpenCV camera-to-world and includes
the conditioning frame at index 0.

Important: `input` means the camera trajectory supplied to generation. DA3-derived
references are estimates, not physical ground truth. No independent trajectory
rescaling or display alignment was applied.

Files per case:
- `input_c2w.npy`: `(81, 4, 4)`, raw evaluated reference c2w.
- `input_K.npy`: `(81, 3, 3)`, intrinsics for `(H,W)=(378,672)` eval images.
- `frame_ids.json`: selected source indices/names and timestamps where available.
- `metadata.json`: provenance, convention, scale, conditioning, and validation.
- Lingbo only: `pred_c2w.npy`, `pred_K.npy`, and `depth.mp4`.

Status summary:
- 从原始数据恢复导出: 2
- 直接找到: 22

Reproduce with:
```bash
/local-ssd/uv-venv-gld-d64-stage1-2node/bin/python export_poses.py \
  --output-root /local-ssd/gae-reference-poses
```

The Lingbo depth videos visualize existing `gen_depth` arrays with a global
2nd–98th percentile range and inverse grayscale; exact limits are in metadata.

## Cases

| key | title | status | frames |
|---|---|---|---:|
| worldlabs-001 | Knitted harbor | 直接找到 | 81 |
| worldlabs-005 | Toy room | 直接找到 | 81 |
| worldlabs-034 | Indoor pool | 直接找到 | 81 |
| worldlabs-057 | Village square | 直接找到 | 81 |
| worldlabs-064 | Ancient forest | 直接找到 | 81 |
| world-054 | Desert drive | 直接找到 | 81 |
| world-061 | Hillside drive | 直接找到 | 81 |
| world-089 | Village street | 直接找到 | 81 |
| omniworld-099 | Hillside rider | 直接找到 | 81 |
| world-114 | Forest rider | 直接找到 | 81 |
| world-120 | Night walk | 直接找到 | 81 |
| world-125 | Town square | 直接找到 | 81 |
| indoor-000 | Blue sofa | 直接找到 | 81 |
| indoor-001 | Cozy bedroom | 直接找到 | 81 |
| indoor-003 | Glass doorway | 直接找到 | 81 |
| indoor-006 | Workshop corner | 直接找到 | 81 |
| indoor-014 | Sunlit wall | 直接找到 | 81 |
| indoor-018 | Office chair | 直接找到 | 81 |
| outdoor-019 | City storefront | 直接找到 | 81 |
| outdoor-033 | Urban avenue | 直接找到 | 81 |
| outdoor-035 | Church steps | 直接找到 | 81 |
| outdoor-037 | Palm-lined street | 直接找到 | 81 |
| lm-lingbo-world2 | Village gate | 从原始数据恢复导出 | 81 |
| lm-lingbo-forward | Temple approach | 从原始数据恢复导出 | 81 |
