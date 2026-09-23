# GAE: Learning a Geometry-Native Latent Space for 3D-Consistent World Generation

Source for the GAE project page, featuring the project video, method overview, synchronized RGB/depth/geometry galleries, camera trajectories, and experimental comparisons.

## Local preview

```bash
python3 scripts/preview.py
```

Open [http://127.0.0.1:8766](http://127.0.0.1:8766). The preview server supports HTTP byte ranges for video seeking. No frontend build step is required.

## Page files

- `index.html` — page content and layout.
- `styles.css` — styling and responsive layouts.
- `app.bundle.js` — galleries and page interactions.
- `sequence-player.js` — synchronized playback and pose rendering.
- `assets/` — videos, images, geometry, and scene data.
- `scripts/` — preview, data preparation, and browser checks.

The scene lists for the Indoor and Outdoor galleries are in `assets/direct-data/i2v-samples.js` and `assets/direct-data/outdoor-samples.js`. Featured and curated scene lists are defined in `app.bundle.js`.

## Camera trajectories

INPUT denotes the reference trajectory supplied to generation; GAE denotes the predicted trajectory. Estimated or designed references are not labeled as ground truth. Original arrays and reference provenance are retained in `assets/sequence-extras/` and `assets/reference-poses/`.

## Playback checks

With Node.js, Playwright, and Chrome installed, start the preview server and run:

```bash
node scripts/test-sequence-player.cjs
```

Set `CHROME_PATH` if needed. The checks cover playback synchronization, seeking, mode switching, looping, and depth/pose availability.

## Hosting

Serve the files as a static site with HTTP byte-range support for videos. Keep `.nojekyll` when publishing through GitHub Pages.
