// Defer offscreen video sources rather than merely pausing downloaded clips.
const deferredVideoJobs = new WeakMap();
const readyVideos = new WeakSet();
const mediaLoadObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    const video = entry.target;
    readyVideos.add(video);
    mediaLoadObserver.unobserve(video);
    const job = deferredVideoJobs.get(video);
    deferredVideoJobs.delete(video);
    if (job) job();
  }
}, {rootMargin: '600px 0px'});
function deferVideoSource(video, apply) {
  // The first gallery is the next likely destination, so warm both clips at startup.
  if (video.id.startsWith('teaser-')) {
    readyVideos.add(video);
    video.preload = 'auto';
    return false;
  }
  if (readyVideos.has(video)) return false;
  video.preload = 'none';
  video.autoplay = false;
  deferredVideoJobs.set(video, apply);
  mediaLoadObserver.observe(video);
  return true;
}

// Generated from local source modules by scripts/build.py.
(() => {
const module1 = (() => {
const teaserSamples = [
  {
    "key": "worldlabs-057",
    "tab": "Village square",
    "domain": "WorldLabs",
    "sample": "057",
    "title": "Village square",
    "checkpoint": "WorldLabs \u00b7 step 13000",
    "rgb": "assets/teaser-sync/worldlabs-057_rgb.mp4",
    "progressive": "assets/teaser-sync/worldlabs-057_progressive.mp4",
    "caption": "A storybook village square framed by timber houses and a stone well.",
    "source": "step0013000/worldlabs_packed/scannetpp/057_pred.mp4",
    "metrics": [
      "81 frames \u00b7 12 fps",
      "672 \u00d7 378",
      "1 conditioning frame"
    ],
    "displayNumber": 1,
    "label": "Village square",
    "rgbPoster": "assets/colleague/curated-20260916/videos/worldlabs-057_rgb_poster.jpg",
    "progressivePoster": "assets/colleague/curated-20260916/videos/worldlabs-057_progressive_poster.jpg"
  },
  {
    "key": "worldlabs-064",
    "tab": "Ancient forest",
    "domain": "WorldLabs",
    "sample": "064",
    "title": "Ancient forest",
    "checkpoint": "WorldLabs \u00b7 step 13000",
    "rgb": "assets/teaser-sync/worldlabs-064_rgb.mp4",
    "progressive": "assets/teaser-sync/worldlabs-064_progressive.mp4",
    "caption": "A camera path through an ancient forest of roots, moss, and running water.",
    "source": "step0013000/worldlabs_packed/scannetpp/064_pred.mp4",
    "metrics": [
      "81 frames \u00b7 12 fps",
      "672 \u00d7 378",
      "1 conditioning frame"
    ],
    "displayNumber": 2,
    "label": "Ancient forest",
    "rgbPoster": "assets/colleague/curated-20260916/videos/worldlabs-064_rgb_poster.jpg",
    "progressivePoster": "assets/colleague/curated-20260916/videos/worldlabs-064_progressive_poster.jpg"
  },
  {
    "key": "world-054",
    "label": "Desert drive",
    "rgb": "assets/teaser-sync/world-054_rgb.mp4",
    "progressive": "assets/teaser-sync/world-054_progressive.mp4",
    "displayNumber": 3,
    "tab": "Desert drive",
    "title": "Desert drive",
    "rgbPoster": "assets/teaser/world-054_rgb_poster.jpg",
    "progressivePoster": "assets/teaser/world-054_progressive_poster.jpg"
  },
  {
    "key": "world-061",
    "label": "Hillside drive",
    "rgb": "assets/teaser-sync/world-061_rgb.mp4",
    "progressive": "assets/teaser-sync/world-061_progressive.mp4",
    "displayNumber": 4,
    "tab": "Hillside drive",
    "title": "Hillside drive",
    "rgbPoster": "assets/teaser/world-061_rgb_poster.jpg",
    "progressivePoster": "assets/teaser/world-061_progressive_poster.jpg"
  },
  {
    "key": "world-089",
    "label": "Village street",
    "rgb": "assets/teaser-sync/world-089_rgb.mp4",
    "progressive": "assets/teaser-sync/world-089_progressive.mp4",
    "displayNumber": 5,
    "tab": "Village street",
    "title": "Village street",
    "rgbPoster": "assets/teaser/world-089_rgb_poster.jpg",
    "progressivePoster": "assets/teaser/world-089_progressive_poster.jpg"
  },
  {
    "key": "world-114",
    "label": "Forest rider",
    "rgb": "assets/teaser-sync/world-114_rgb.mp4",
    "progressive": "assets/teaser-sync/world-114_progressive.mp4",
    "displayNumber": 6,
    "tab": "Forest rider",
    "title": "Forest rider",
    "rgbPoster": "assets/teaser/world-114_rgb_poster.jpg",
    "progressivePoster": "assets/teaser/world-114_progressive_poster.jpg"
  },
  {
    "key": "world-120",
    "label": "Night walk",
    "rgb": "assets/teaser-sync/world-120_rgb.mp4",
    "progressive": "assets/teaser-sync/world-120_progressive.mp4",
    "displayNumber": 7,
    "tab": "Night walk",
    "title": "Night walk",
    "rgbPoster": "assets/teaser/world-120_rgb_poster.jpg",
    "progressivePoster": "assets/teaser/world-120_progressive_poster.jpg"
  },
  {
    "key": "world-125",
    "label": "Town square",
    "rgb": "assets/teaser-sync/world-125_rgb.mp4",
    "progressive": "assets/teaser-sync/world-125_progressive.mp4",
    "displayNumber": 8,
    "tab": "Town square",
    "title": "Town square",
    "rgbPoster": "assets/teaser/world-125_rgb_poster.jpg",
    "progressivePoster": "assets/teaser/world-125_progressive_poster.jpg"
  },
  {
    "key": "lm-lingbo-world2",
    "tab": "Village gate",
    "domain": "Large motion v1",
    "sample": "lm-lingbo-world2",
    "title": "Village gate",
    "checkpoint": "LM-v1 \u00b7 step 2000",
    "rgb": "assets/teaser-sync/lm-lingbo-world2_rgb.mp4",
    "progressive": "assets/teaser-sync/lm-lingbo-world2_progressive.mp4",
    "caption": "A forward traversal through a wooden gate into a mountain village.",
    "source": "large-motion-v1-page-eval/0002000/20260904_224943/eval/shard_2/case_000",
    "metrics": [
      "81 frames \u00b7 8 fps",
      "672 \u00d7 378",
      "1 conditioning frame"
    ],
    "displayNumber": 9,
    "label": "Village gate",
    "rgbPoster": "assets/colleague/curated-20260916/videos/lm-lingbo-world2_rgb_poster.jpg",
    "progressivePoster": "assets/colleague/curated-20260916/videos/lm-lingbo-world2_progressive_poster.jpg"
  },
  {
    "key": "pexels-36584880",
    "tab": "Old town",
    "domain": "Large motion v2",
    "sample": "pexels-36584880",
    "title": "Old town",
    "checkpoint": "LM-v2 Pexels \u00b7 step 1000",
    "rgb": "assets/teaser-sync/pexels-36584880_rgb.mp4",
    "progressive": "assets/teaser-sync/pexels-36584880_progressive.mp4",
    "caption": "An aerial orbit over a dense historic town at dusk.",
    "source": "large-motion-v2-pexels-eval/0001000/20260907_101355/eval/shard_4/case_000",
    "metrics": [
      "81 frames \u00b7 8 fps",
      "672 \u00d7 378",
      "1 conditioning frame"
    ],
    "displayNumber": 10,
    "label": "Old town",
    "rgbPoster": "assets/colleague/curated-20260916/videos/pexels-36584880_rgb_poster.jpg",
    "progressivePoster": "assets/colleague/curated-20260916/videos/pexels-36584880_progressive_poster.jpg"
  },
  {
    "key": "pexels-38724392-c0",
    "tab": "Lakeside trail",
    "domain": "Large motion v2",
    "sample": "pexels-38724392-c0",
    "title": "Lakeside trail",
    "checkpoint": "LM-v2 Pexels \u00b7 step 1000",
    "rgb": "assets/teaser-sync/pexels-38724392-c0_rgb.mp4",
    "progressive": "assets/teaser-sync/pexels-38724392-c0_progressive.mp4",
    "caption": "A low camera path along a pine forest trail beside a lake.",
    "source": "large-motion-v2-pexels-eval/0001000/20260907_101355/eval/shard_6/case_001",
    "metrics": [
      "81 frames \u00b7 8 fps",
      "672 \u00d7 378",
      "1 conditioning frame"
    ],
    "displayNumber": 11,
    "label": "Lakeside trail",
    "rgbPoster": "assets/colleague/curated-20260916/videos/pexels-38724392-c0_rgb_poster.jpg",
    "progressivePoster": "assets/colleague/curated-20260916/videos/pexels-38724392-c0_progressive_poster.jpg"
  },
  {
    "key": "worldlabs-001",
    "tab": "Knitted harbor",
    "domain": "WorldLabs",
    "sample": "001",
    "title": "Knitted harbor",
    "checkpoint": "WorldLabs \u00b7 step 13000",
    "rgb": "assets/teaser-sync/worldlabs-001_rgb.mp4",
    "progressive": "assets/teaser-sync/worldlabs-001_progressive.mp4",
    "caption": "A handcrafted harbor scene centered on a knitted octopus and miniature boats.",
    "source": "step0013000/worldlabs_packed/scannetpp/001_pred.mp4",
    "metrics": [
      "81 frames \u00b7 12 fps",
      "672 \u00d7 378",
      "1 conditioning frame"
    ],
    "displayNumber": 12,
    "label": "Knitted harbor",
    "rgbPoster": "assets/colleague/curated-20260916/videos/worldlabs-001_rgb_poster.jpg",
    "progressivePoster": "assets/colleague/curated-20260916/videos/worldlabs-001_progressive_poster.jpg"
  },
  {
    "key": "lm-kitti-0005-split7",
    "tab": "Driveway",
    "domain": "Large motion v1",
    "sample": "lm-kitti-0005-split7",
    "title": "Driveway",
    "checkpoint": "LM-v1 \u00b7 step 2000",
    "rgb": "assets/teaser-sync/lm-kitti-0005-split7_rgb.mp4",
    "progressive": "assets/teaser-sync/lm-kitti-0005-split7_progressive.mp4",
    "caption": "A close residential driveway sequence with strong foreground parallax.",
    "source": "large-motion-v1-page-eval/0002000/20260904_224943/eval/shard_5/case_002",
    "metrics": [
      "81 frames \u00b7 8 fps",
      "672 \u00d7 378",
      "1 conditioning frame"
    ],
    "displayNumber": 13,
    "label": "Driveway",
    "rgbPoster": "assets/colleague/curated-20260916/videos/lm-kitti-0005-split7_rgb_poster.jpg",
    "progressivePoster": "assets/colleague/curated-20260916/videos/lm-kitti-0005-split7_progressive_poster.jpg"
  },
  {
    "key": "indoor-000",
    "label": "Blue sofa",
    "rgb": "assets/teaser-sync/indoor-000_rgb.mp4",
    "progressive": "assets/teaser-sync/indoor-000_progressive.mp4",
    "displayNumber": 14,
    "tab": "Blue sofa",
    "title": "Blue sofa",
    "rgbPoster": "assets/teaser/indoor-000_rgb_poster.jpg",
    "progressivePoster": "assets/teaser/indoor-000_progressive_poster.jpg"
  },
  {
    "key": "indoor-001",
    "label": "Cozy bedroom",
    "rgb": "assets/teaser-sync/indoor-001_rgb.mp4",
    "progressive": "assets/teaser-sync/indoor-001_progressive.mp4",
    "displayNumber": 15,
    "tab": "Cozy bedroom",
    "title": "Cozy bedroom",
    "rgbPoster": "assets/teaser/indoor-001_rgb_poster.jpg",
    "progressivePoster": "assets/teaser/indoor-001_progressive_poster.jpg"
  },
  {
    "key": "outdoor-033",
    "label": "Urban avenue",
    "rgb": "assets/teaser-sync/outdoor-033_rgb.mp4",
    "progressive": "assets/teaser-sync/outdoor-033_progressive.mp4",
    "displayNumber": 16,
    "tab": "Urban avenue",
    "title": "Urban avenue",
    "rgbPoster": "assets/teaser/outdoor-033_rgb_poster.jpg",
    "progressivePoster": "assets/teaser/outdoor-033_progressive_poster.jpg"
  },
  {
    "key": "outdoor-035",
    "label": "Church steps",
    "rgb": "assets/teaser-sync/outdoor-035_rgb.mp4",
    "progressive": "assets/teaser-sync/outdoor-035_progressive.mp4",
    "displayNumber": 17,
    "tab": "Church steps",
    "title": "Church steps",
    "rgbPoster": "assets/teaser/outdoor-035_rgb_poster.jpg",
    "progressivePoster": "assets/teaser/outdoor-035_progressive_poster.jpg"
  },
  {
    "key": "worldlabs-005",
    "label": "Toy room",
    "rgb": "assets/teaser-sync/worldlabs-005_rgb.mp4",
    "progressive": "assets/teaser-sync/worldlabs-005_progressive.mp4",
    "displayNumber": 18,
    "tab": "Toy room",
    "title": "Toy room",
    "rgbPoster": "assets/colleague/curated-20260916/videos/worldlabs-005_rgb_poster.jpg",
    "progressivePoster": "assets/colleague/curated-20260916/videos/worldlabs-005_progressive_poster.jpg"
  }
];

return { teaserSamples };
})();
const module3 = (() => {
const motionSamples = [
  {
    key: "re10k-motion-000", tab: "Bedroom entry", title: "Hallway-to-bedroom traversal",
    domain: "RealEstate10K", rgb: "assets/i2v/videos/re10k_motion_000_rgb.mp4",
    depth: "assets/i2v/videos/re10k_motion_000_depth.mp4",
    pose: "assets/i2v/poses/re10k_motion_000_pose.png",
    poseData: "assets/i2v/pose-data/000.json",
    caption: "A large forward camera move crosses a warm upper-floor landing and enters a bright bedroom. Doorway parallax, room-scale translation, and endpoint appearance remain coherent across all 33 GAE-predicted frames. The synchronized inset compares the exact input trajectory against camera poses decoded directly from GAE's generated ray head.",
    metrics: ["33 predicted frames · 4 fps", "direct pose nATE 0.60%", "504 x 504 RGB prediction", "300k-point GAE prediction"]},
  {
    key: "re10k-motion-003", tab: "Bath sweep", title: "Bathroom vanity sweep",
    domain: "RealEstate10K", rgb: "assets/i2v/videos/re10k_motion_003_rgb.mp4",
    depth: "assets/i2v/videos/re10k_motion_003_depth.mp4",
    pose: "assets/i2v/poses/re10k_motion_003_pose.png",
    poseData: "assets/i2v/pose-data/003.json",
    caption: "The predicted camera translates across a bathroom from the shower enclosure toward a close vanity and sink. The long lateral baseline creates pronounced motion along the mirror, countertop, door edge, and tiled floor. The compact trajectory inset advances one camera at a time and compares the requested path with GAE's direct ray-head pose output.",
    metrics: ["33 predicted frames · 4 fps", "direct pose nATE 1.39%", "504 x 504 RGB prediction", "300k-point GAE prediction"]},
  {
    key: "re10k-motion-004", tab: "Living room", title: "Living-room lateral traversal",
    domain: "RealEstate10K", rgb: "assets/i2v/videos/re10k_motion_004_rgb.mp4",
    depth: "assets/i2v/videos/re10k_motion_004_depth.mp4",
    pose: "assets/i2v/poses/re10k_motion_004_pose.png",
    poseData: "assets/i2v/pose-data/004.json",
    caption: "A broad predicted trajectory moves through a furnished living and dining area toward a sunlit window. Chairs, table edges, wall art, and the exterior opening undergo clear parallax over all 33 views. The animated inset directly compares the input camera centers against poses decoded from the same GAE latent that produces the RGB sequence.",
    metrics: ["33 predicted frames · 4 fps", "direct pose nATE 3.57%", "504 x 504 RGB prediction", "300k-point GAE prediction"]}];

const rows = [
["re10k","021","Golden dining","Golden dining room","A warm dining-room trajectory keeps the table, chairs, bright windows, ceiling fan, and hardwood floor visually stable. This scene is selected for its particularly close predicted-camera alignment.","RealEstate10K"],
["re10k","025","Kitchen dinner","Kitchen and dining room","The camera moves across a bright kitchen and formal dining table, preserving cabinetry, chairs, recessed lights, and foreground place settings.","RealEstate10K"],
["re10k","000","Bedroom landing","Hallway-to-bedroom landing","A forward camera move approaches a bright bedroom from an upstairs landing. The rail, wall trim, doorway, and bed remain coherent as the view advances.","RealEstate10K"],
["re10k","009","Open living","Open-plan living room","The view travels through a warm open-plan living space with a sofa, island, archway, and wood floor under a well-aligned camera path.","RealEstate10K"],
["re10k","012","Console hallway","Hallway console and wall art","A close interior motion passes a console, flowers, framed art, and an adjoining room, retaining fine furniture boundaries.","RealEstate10K"],
["re10k","019","Library lounge","Library lounge interior","The trajectory crosses a furnished living room with bookcases, armchairs, a sofa, and layered wall openings under strong pose agreement.","RealEstate10K"],
["re10k","002","Dark dining","Dark dining room","The camera moves across a dark dining space with a glossy table, chairs, display cabinet, chandelier, and neighboring rooms held in a stable layout.","RealEstate10K"],
["scannetpp","029","Meeting chairs","Meeting room chairs","A clean meeting room with repeated chairs, a table edge, and a bright wall is selected for exceptionally well-aligned predicted pose.","ScanNet++"],
["scannetpp","004","Workshop desk","Workshop desk and cabinets","A dense workspace with wood cabinets, drawers, papers, and equipment provides close occlusions and rich small-object geometry.","ScanNet++"],
["scannetpp","008","Blue chair","Blue chair workstation","The camera follows a blue office chair, desk, equipment, and floor-level clutter with stable close-range geometry.","ScanNet++"],
["scannetpp","030","Lounge cushions","Floor-cushion lounge","A small lounge scene with layered floor cushions and clean wall boundaries provides a compact, pose-aligned camera traversal.","ScanNet++"],
["scannetpp","007","Window office","Window-side office","The viewpoint moves through an office with desks, shelving, window light, and repeated furniture boundaries held consistently.","ScanNet++"],
["scannetpp","000","Office desk","Cluttered office desk","A close desk scene contains a monitor, keyboard, papers, cables, and chairs; small objects stay registered as the view moves.","ScanNet++"],
["scannetpp","002","Sink","Bathroom sink","Chrome fixtures, tiled walls, bottles, and a deep sink offer reflective and fine-scale geometry under a close camera motion.","ScanNet++"],
["scannetpp","005","Utility room","Utility room and storage","The camera explores a compact utility space with doors, appliances, boxes, and shelving under challenging indoor lighting.","ScanNet++"],
["scannetpp","035","Shelf office","Office shelving and binders","A close office shelf with binders, books, and equipment provides a compact high-detail scene for the camera-conditioned sequence.","ScanNet++"],
["re10k","037","Dining TV","Dining room and television","The camera moves through a warm dining room toward a television wall, chairs, lamps, and window openings with low pose error.","RealEstate10K"],
["re10k","038","Arched lounge","Arched living room","A broad indoor motion passes arched windows, sofas, bookshelves, and a television wall while maintaining the room layout.","RealEstate10K"],
["regular_re10k","019","Regular lounge","Living room regular evaluation","A matched regular step-38000 evaluation traverses a living room with bookcases, chairs, sofa, and wall art; it is included alongside the geo-refined gallery scenes.","RealEstate10K"],
["re10k","020","Atrium living","Atrium living room","The trajectory crosses a bright double-height living room with staircase railings, windows, and layered furniture.","RealEstate10K"]];

const remainingSamples = rows
  .filter(([dataset, id]) => dataset !== "regular_re10k" && !(dataset === "re10k" && id === "000"))
  .map(([dataset, id, tab, title, caption, domain]) => {
  const key = `${dataset}_${id}`;
  return {
    key, tab, title, domain,
    rgb: `assets/i2v/videos/${key}_rgb.mp4`,
    depth: `assets/i2v/videos/${key}_depth.mp4`,
    pose: `assets/i2v/poses/${key}_pose.png`,
    poseData: `assets/i2v/pose-data/${key}.json`,
    caption,
    metrics: [
      "81 generated views · 16 fps",
      "step 38,000 geo-refined RGB + geometry",
      "672 × 378 RGB + depth",
      "interactive point-cloud geometry"]};
});

const i2vSamples = (typeof window !== "undefined" && window.NGD_I2V_SAMPLES) || [...motionSamples, ...remainingSamples];

return { i2vSamples };
})();
const module4 = (() => {
/** Curated VAE encode→decode reconstructions (auto-generated by tools/build_recon_assets.py). */
const reconSamples = [
  {
    "key": "vidgen_000",
    "tab": "Plush toys",
    "title": "Plush toys on a bed",
    "domain": "VidGen",
    "rgb": "assets/recon/videos/vidgen_000_rgb.mp4",
    "compare": "assets/recon/videos/vidgen_000_compare.mp4",
    "depth": "assets/recon/videos/vidgen_000_depth.mp4",
    "pose": "assets/recon/poses/vidgen_000_pose.png",
    "caption": "GAE reconstructs the RGB sequence, metric depth, camera path, and point-cloud geometry from one compact 128-channel latent state.",
    "metrics": [
      "33-view encode → decode",
      "AbsRel vs DA3 0.003",
      "pose ATE 0.0189",
      "recon RGB · depth · point cloud"
    ]
  },
  {
    "key": "artgrid_000",
    "tab": "Glacier",
    "title": "Glacier landscape",
    "domain": "ArtGrid",
    "rgb": "assets/recon/videos/artgrid_000_rgb.mp4",
    "compare": "assets/recon/videos/artgrid_000_compare.mp4",
    "depth": "assets/recon/videos/artgrid_000_depth.mp4",
    "pose": "assets/recon/poses/artgrid_000_pose.png",
    "caption": "GAE reconstructs the RGB sequence, metric depth, camera path, and point-cloud geometry from one compact 128-channel latent state.",
    "metrics": [
      "33-view encode → decode",
      "AbsRel vs DA3 0.005",
      "pose ATE 0.0236",
      "recon RGB · depth · point cloud"
    ]
  },
  {
    "key": "spatialvid_009",
    "tab": "Yacht cabin",
    "title": "Luxury yacht cabin",
    "domain": "SpatialVID",
    "rgb": "assets/recon/videos/spatialvid_009_rgb.mp4",
    "compare": "assets/recon/videos/spatialvid_009_compare.mp4",
    "depth": "assets/recon/videos/spatialvid_009_depth.mp4",
    "pose": "assets/recon/poses/spatialvid_009_pose.png",
    "caption": "GAE reconstructs the RGB sequence, metric depth, camera path, and point-cloud geometry from one compact 128-channel latent state.",
    "metrics": [
      "33-view encode → decode",
      "AbsRel vs DA3 0.004",
      "pose ATE 0.0149",
      "recon RGB · depth · point cloud"
    ]
  },
  {
    "key": "spatialvid_004",
    "tab": "Rainy street",
    "title": "Rainy urban street",
    "domain": "SpatialVID",
    "rgb": "assets/recon/videos/spatialvid_004_rgb.mp4",
    "compare": "assets/recon/videos/spatialvid_004_compare.mp4",
    "depth": "assets/recon/videos/spatialvid_004_depth.mp4",
    "pose": "assets/recon/poses/spatialvid_004_pose.png",
    "caption": "GAE reconstructs the RGB sequence, metric depth, camera path, and point-cloud geometry from one compact 128-channel latent state.",
    "metrics": [
      "33-view encode → decode",
      "AbsRel vs DA3 0.005",
      "pose ATE 0.1503",
      "recon RGB · depth · point cloud"
    ]
  },
  {
    "key": "re10k_014",
    "tab": "Dining room",
    "title": "Sunlit dining room",
    "domain": "RealEstate10K",
    "rgb": "assets/recon/videos/re10k_014_rgb.mp4",
    "compare": "assets/recon/videos/re10k_014_compare.mp4",
    "depth": "assets/recon/videos/re10k_014_depth.mp4",
    "pose": "assets/recon/poses/re10k_014_pose.png",
    "caption": "GAE reconstructs the RGB sequence, metric depth, camera path, and point-cloud geometry from one compact 128-channel latent state.",
    "metrics": [
      "33-view encode → decode",
      "AbsRel vs DA3 0.002",
      "pose ATE 0.0059",
      "recon RGB · depth · point cloud"
    ]
  },
  {
    "key": "dl3dv_014",
    "tab": "Robotics workbench",
    "title": "Robotics workbench",
    "domain": "DL3DV",
    "rgb": "assets/recon/videos/dl3dv_014_rgb.mp4",
    "compare": "assets/recon/videos/dl3dv_014_compare.mp4",
    "depth": "assets/recon/videos/dl3dv_014_depth.mp4",
    "pose": "assets/recon/poses/dl3dv_014_pose.png",
    "caption": "GAE reconstructs the RGB sequence, metric depth, camera path, and point-cloud geometry from one compact 128-channel latent state.",
    "metrics": [
      "33-view encode → decode",
      "AbsRel vs DA3 0.004",
      "pose ATE 0.0154",
      "recon RGB · depth · point cloud"
    ]
  },
  {
    "key": "scannet_001",
    "tab": "Laptop desk",
    "title": "Laptop workstation",
    "domain": "ScanNet++",
    "rgb": "assets/recon/videos/scannet_001_rgb.mp4",
    "compare": "assets/recon/videos/scannet_001_compare.mp4",
    "depth": "assets/recon/videos/scannet_001_depth.mp4",
    "pose": "assets/recon/poses/scannet_001_pose.png",
    "caption": "GAE reconstructs the RGB sequence, metric depth, camera path, and point-cloud geometry from one compact 128-channel latent state.",
    "metrics": [
      "33-view encode → decode",
      "AbsRel vs DA3 0.003",
      "pose ATE 0.0257",
      "recon RGB · depth · point cloud"
    ]
  },
  {
    "key": "mvs_006",
    "tab": "Church facade",
    "title": "Church facade",
    "domain": "MVS-Synth",
    "rgb": "assets/recon/videos/mvs_006_rgb.mp4",
    "compare": "assets/recon/videos/mvs_006_compare.mp4",
    "depth": "assets/recon/videos/mvs_006_depth.mp4",
    "pose": "assets/recon/poses/mvs_006_pose.png",
    "caption": "GAE reconstructs the RGB sequence, metric depth, camera path, and point-cloud geometry from one compact 128-channel latent state.",
    "metrics": [
      "33-view encode → decode",
      "AbsRel vs DA3 0.012",
      "pose ATE 0.1378",
      "recon RGB · depth · point cloud"
    ]
  },
  {
    "key": "omni_game_009",
    "tab": "Fantasy forest",
    "title": "Fantasy forest explorer",
    "domain": "OmniWorld-Game",
    "rgb": "assets/recon/videos/omni_game_009_rgb.mp4",
    "compare": "assets/recon/videos/omni_game_009_compare.mp4",
    "depth": "assets/recon/videos/omni_game_009_depth.mp4",
    "pose": "assets/recon/poses/omni_game_009_pose.png",
    "caption": "GAE reconstructs the RGB sequence, metric depth, camera path, and point-cloud geometry from one compact 128-channel latent state.",
    "metrics": [
      "33-view encode → decode",
      "AbsRel vs DA3 0.005",
      "pose ATE 0.1916",
      "recon RGB · depth · point cloud"
    ]
  },
  {
    "key": "osp_015",
    "tab": "Snow walk",
    "title": "Walking a dog in snow",
    "domain": "OSP-iStock",
    "rgb": "assets/recon/videos/osp_015_rgb.mp4",
    "compare": "assets/recon/videos/osp_015_compare.mp4",
    "depth": "assets/recon/videos/osp_015_depth.mp4",
    "pose": "assets/recon/poses/osp_015_pose.png",
    "caption": "GAE reconstructs the RGB sequence, metric depth, camera path, and point-cloud geometry from one compact 128-channel latent state.",
    "metrics": [
      "33-view encode → decode",
      "AbsRel vs DA3 0.003",
      "pose ATE 0.0173",
      "recon RGB · depth · point cloud"
    ]
  }
];

return { reconSamples };
})();
const module2 = (() => {
const {  i2vSamples  } = module3;
const {  reconSamples  } = module4;

const omniworldSamples = (typeof window !== "undefined" && window.NGD_OMNIWORLD_SAMPLES) || [];
const outdoorSamples = (typeof window !== "undefined" && window.NGD_OUTDOOR_SAMPLES) || [];

const t2iSamples = [
  {
    "key": "reliquary",
    "tab": "Gilt reliquary",
    "title": "Antique gilt reliquary",
    "rgb": "assets/t2i/images/reliquary_rgb.png",
    "depth": "assets/t2i/images/reliquary_depth.png",
    "caption": "Gleaming in rich golden hues, an antique French gilt-and-silver reliquary shaped like a heart, covered in ornate botanical filigree and crowned by a small cross, rests on a dark wooden table under warm museum lighting."
  },
  {
    "key": "hamster",
    "tab": "Armored hamster",
    "title": "Armored hamster",
    "rgb": "assets/t2i/images/hamster_rgb.png",
    "depth": "assets/t2i/images/hamster_depth.png",
    "caption": "A charming anthropomorphic hamster with fluffy white-and-caramel fur, wearing a full suit of polished silver medieval plate armor, standing among vivid pink cosmos flowers in a sunlit meadow; centered full-body portrait, shallow depth of field, crisp photorealistic detail."
  },
  {
    "key": "robot",
    "tab": "Forest robot",
    "title": "Robot at golden hour",
    "rgb": "assets/t2i/images/robot_rgb.png",
    "depth": "assets/t2i/images/robot_depth.png",
    "caption": "A detailed humanoid robot standing in a misty forest at golden hour, with glossy black-and-chrome armor, rounded mechanical joints, and luminous green eyes; cinematic backlight, reflective metal surfaces, realistic atmospheric depth."
  },
  {
    "key": "boy_dogs",
    "tab": "Boy and dogs",
    "title": "Boy and dogs in a meadow",
    "rgb": "assets/t2i/images/boy_dogs_rgb.png",
    "depth": "assets/t2i/images/boy_dogs_depth.png",
    "caption": "A peaceful oil painting of a young boy seated with two friendly dogs beneath a mature tree in a sunlit meadow, rendered with loose impressionistic brushwork, warm natural colors, and a quiet pastoral atmosphere."
  },
  {
    "key": "hiker",
    "tab": "Lakeside hiker",
    "title": "Lakeside hiker",
    "rgb": "assets/t2i/images/hiker_rgb.png",
    "depth": "assets/t2i/images/hiker_depth.png",
    "caption": "In a serene landscape, a lone hiker with a backpack and walking pole stands on moss-covered rocks overlooking a still forest lake, surrounded by dense evergreen trees under cool, subdued daylight."
  },
  {
    "key": "bear",
    "tab": "Forest bear",
    "title": "Graphic forest bear",
    "rgb": "assets/t2i/images/bear_rgb.png",
    "depth": "assets/t2i/images/bear_depth.png",
    "caption": "A comic-style illustration of a massive, ferocious bear striding through a shadowed forest, drawn with bold black ink contours, deep moss-green fur, dramatic backlighting, and dense graphic foliage."
  },
  {
    "key": "interior",
    "tab": "Living room",
    "title": "Moroccan-inspired interior",
    "rgb": "assets/t2i/images/interior_rgb.png",
    "depth": "assets/t2i/images/interior_depth.png",
    "caption": "A warm and inviting Moroccan-inspired living room with a rust-red sectional sofa, turquoise and saffron cushions, a carved round wooden coffee table, patterned rug, and a small teal vase; balanced frontal composition and soft natural light."
  },
  {
    "key": "motorcycle",
    "tab": "Motorcycle",
    "title": "Silver cruiser motorcycle",
    "rgb": "assets/t2i/images/motorcycle_rgb.png",
    "depth": "assets/t2i/images/motorcycle_depth.png",
    "caption": "A sleek silver-and-black cruiser motorcycle photographed from the side on a sunlit city street, highlighting the sculpted fuel tank, exposed engine, curved exhaust pipes, low saddle, and polished metal components."
  },
  {
    "key": "pie",
    "tab": "Lemon pie",
    "title": "Lemon meringue pie",
    "rgb": "assets/t2i/images/pie_rgb.png",
    "depth": "assets/t2i/images/pie_depth.png",
    "caption": "An elegant slice of lemon meringue pie on a blue-and-white porcelain plate, topped with a neat row of piped cream, photographed on a rustic wooden table; close-up food photography, shallow depth of field, soft daylight."
  },
  {
    "key": "footballer",
    "tab": "Footballer",
    "title": "Celebrating footballer",
    "rgb": "assets/t2i/images/footballer_rgb.png",
    "depth": "assets/t2i/images/footballer_depth.png",
    "caption": "A radiant, exuberant footballer in a vivid red jersey laughs broadly in a stadium, captured as a centered chest-up sports portrait with crisp facial detail, soft crowd bokeh, and energetic red lighting."
  },
  {
    "key": "skull",
    "tab": "Luminous skull",
    "title": "Luminous skull in snow",
    "rgb": "assets/t2i/images/skull_rgb.png",
    "depth": "assets/t2i/images/skull_depth.png",
    "caption": "A weathered silver-white skull lies half-buried in fresh snow while molten orange energy glows from its eye sockets and branches through the temple like lightning; icy atmosphere, dramatic fantasy lighting, extreme material detail."
  },
  {
    "key": "rover",
    "tab": "Desert rover",
    "title": "Armored desert rover",
    "rgb": "assets/t2i/images/rover_rgb.png",
    "depth": "assets/t2i/images/rover_depth.png",
    "caption": "Against a saturated orange sunset, a heavy armored expedition rover with oversized off-road tires, roof-mounted equipment, reinforced grille, and glowing headlights crosses a desert landscape in cinematic golden light."
  },
  {
    "key": "medusa",
    "tab": "Medusa",
    "title": "Medusa sculpture",
    "rgb": "assets/t2i/images/medusa_rgb.png",
    "depth": "assets/t2i/images/medusa_depth.png",
    "caption": "A detailed close-up of a classical Medusa statue in dark green stone, her calm face framed by densely coiled snakes with finely sculpted scales; centered symmetrical composition, dramatic museum lighting, monochromatic sculptural study."
  },
  {
    "key": "rain_portrait",
    "tab": "Storm portrait",
    "title": "Portrait in heavy rain",
    "rgb": "assets/t2i/images/rain_portrait_rgb.png",
    "depth": "assets/t2i/images/rain_portrait_depth.png",
    "caption": "A serious man in a crisp white button-down shirt stands motionless in a dark storm as diagonal rain cuts through the frame; centered cinematic portrait, wet atmosphere, deep charcoal clouds, and controlled dramatic lighting."
  },
  {
    "key": "coffee",
    "tab": "Coffee table",
    "title": "Two cappuccinos and cake",
    "rgb": "assets/t2i/images/coffee_rgb.png",
    "depth": "assets/t2i/images/coffee_depth.png",
    "caption": "Two cappuccinos with delicate leaf-shaped latte art sit beside a slice of cake on a round wooden caf\u00e9 table in strong afternoon sunlight; intimate European caf\u00e9 setting, crisp shadows, inviting warm tones."
  },
  {
    "key": "pug",
    "tab": "Pug",
    "title": "Pug on a leash",
    "rgb": "assets/t2i/images/pug_rgb.png",
    "depth": "assets/t2i/images/pug_depth.png",
    "caption": "A small fawn pug stands on an outdoor gravel path and looks directly up at the camera, its expressive dark eyes, wrinkled face, curled tail, compact body, and black leash captured in bright natural light."
  },
  {
    "key": "geisha",
    "tab": "Android geisha",
    "title": "Futuristic android geisha",
    "rgb": "assets/t2i/images/geisha_rgb.png",
    "depth": "assets/t2i/images/geisha_depth.png",
    "caption": "A futuristic android geisha with a porcelain-silver face, elaborate floral mechanical headdress, gold circuitry, and symmetrical cybernetic ornamentation, gazing directly at the viewer against a deep violet background; intricate science-fiction editorial portrait."
  },
  {
    "key": "mythic_rider",
    "tab": "Mythic rider",
    "title": "Mythic celestial rider",
    "rgb": "assets/t2i/images/mythic_rider_rgb.png",
    "depth": "assets/t2i/images/mythic_rider_depth.png",
    "caption": "A mythic celestial figure rides a pale, serpentine dragon-like creature through a dark cosmic realm, framed by a luminous moon halo, curling clouds, and ornate hand-painted details in an otherworldly narrative illustration."
  },
  {
    "key": "gown",
    "tab": "Wedding gown",
    "title": "Ivory ball gown",
    "rgb": "assets/t2i/images/gown_rgb.png",
    "depth": "assets/t2i/images/gown_depth.png",
    "caption": "Elegant and timeless, an ivory ball-gown wedding dress is displayed on a headless mannequin against a neutral studio backdrop. The fitted sleeveless bodice is decorated with delicate lace appliqu\u00e9, while the full skirt opens into a broad, symmetrical silhouette with embroidered floral detailing along the hem; soft frontal light separates the sculpted fabric, mannequin, and background into a clean geometric composition."
  },
  {
    "key": "kettle",
    "tab": "Yellow kettle",
    "title": "Vintage enamel kettle",
    "rgb": "assets/t2i/images/kettle_rgb.png",
    "depth": "assets/t2i/images/kettle_depth.png",
    "caption": "A vintage yellow enamel tea kettle stands alone on a pale surface against a minimalist neutral wall. Its glossy rounded body, domed lid, black finial, long tapered spout, small side grip, and high arched black handle form a crisp product-style silhouette, with controlled studio lighting and an uncluttered background that make the generated depth layers and object geometry especially legible."
  }
];

return { i2vSamples,reconSamples,omniworldSamples,outdoorSamples,t2iSamples };
})();
const module5 = (() => {
// Latent-backend comparison: the GAE geometry latent against five alternative
// latents, all driven by the same DiT recipe and launcher.
//
// Source is the i2v-vae-backend ablation sweep (dl3dv-trained arms). Every arm
// is evaluated through the same launcher at V=9, cond=1, cfg 2.0, 50 sampler
// steps. The clips are I2V samples drawn from noise off a single conditioning
// frame, not autoencoder round-trips.
//
// Two eval families feed this section:
//   RealEstate10K  interval 10, *_iv10 dirs   -- WAN2.1 from wan21tem @ 40k
//   ScanNet++      interval 1,  *_iv1 dirs    -- WAN2.1 from wan21tem_dl3dv @ 80k
// ScanNet++ only exists in the interval-1 evaluations, which is why the two
// families differ in interval.
//
// Steps are not surfaced on the page, so keep the real configuration recorded
// here: ours 50k EMA, RAEv2 30k, SD-VAE 30k, Raw DA3 L0 26k, Raw DA3 L3 22k,
// all raw except ours.
//
// `psnr` is mean PSNR in dB of each arm against the ground-truth clip, measured
// at a common 252 px after resampling, with each arm scored against its own GT
// render so the 252/256 grid difference does not bias the comparison.
const re10k = [
  ["044", "Ridge cabin", "A-frame cabin on a forested ridge",
   { ours: 18.01, raev2: 16.70, sdvae: 15.32, wan21: 14.52, da3l0: 13.71, da3l3: 12.47 },
   "A camera move past an A-frame cabin overlooking a wooded valley. Compare the roofline, driveway, and background across views."],
  ["010", "Window room", "Hallway into a window room",
   { ours: 22.66, raev2: 19.81, sdvae: 20.31, wan21: 17.79, da3l0: 19.00, da3l3: 17.60 },
   "A forward move toward a bright window over a dark wooden floor. Compare window alignment, wall boundaries, and floor reflections."],
  ["052", "Kitchen column", "Kitchen behind a painted column",
   { ours: 21.17, raev2: 18.45, sdvae: 19.62, wan21: 17.02, da3l0: 18.22, da3l3: 17.18 },
   "The camera moves around a painted column into a kitchen. Compare the column, cabinets, and countertop across views."],
  ["061", "Stair banister", "Armchair beside a stair banister",
   { ours: 19.92, raev2: 17.52, sdvae: 18.05, wan21: 17.21, da3l0: 17.19, da3l3: 16.81 },
   "An armchair beside a staircase with narrow spindles. Compare the railing structure and its alignment during the camera move."],
  ["026", "Orange dining", "Dining room with orange walls",
   { ours: 19.66, raev2: 17.95, sdvae: 17.54, wan21: 15.12, da3l0: 17.60, da3l3: 16.58 },
   "A dining room with orange walls, a ceiling fan, and a long table. Compare color consistency and the shapes of the furniture."],
  ["001", "Wall artwork", "Long artwork above a bench",
   { ours: 23.29, raev2: 19.90, sdvae: 20.03, wan21: 18.15, da3l0: 20.91, da3l3: 18.92 },
   "A small camera move past a bench and wall artwork. Compare the artwork, wall layout, and furniture placement."],
];

const scannetpp = [
  ["057", "Banquet chairs", "Draped chairs at a banquet setup",
   { ours: 23.15, raev2: 19.37, sdvae: 19.85, wan21: 15.60, da3l0: 19.16, da3l3: 17.81 },
   "Rows of covered banquet chairs beside floral decorations and a mirror. Compare repeated shapes, fine textures, and straight edges."],
  ["008", "Bar stools", "Bar stools on a patterned carpet",
   { ours: 19.61, raev2: 16.04, sdvae: 17.28, wan21: 15.06, da3l0: 16.79, da3l3: 15.75 },
   "A lateral move past bar stools on a patterned carpet. Compare stool spacing, the counter edge, and the carpet pattern."],
];

// Drawn in grid order; the shared camera-path panel is spliced in after `gt`.
const compareArms = [
  { key: "gt", label: "Ground truth", detail: "reference clip" },
  { key: "ours", label: "GAE", detail: "compact DA3 features", highlight: true },
  { key: "raev2", label: "Semantic RAEv2", detail: "DINOv3-L k7 semantic features" },
  { key: "sdvae", label: "SD VAE", detail: "image VAE" },
  { key: "wan21", label: "Wan2.1 VAE", detail: "temporal video VAE" },
  { key: "da3l0", label: "Raw DA3 L0", detail: "uncompressed DA3 layer 0 features" },
  { key: "da3l3", label: "Raw DA3 L3", detail: "uncompressed DA3 layer 3 features" },
];

const build = (rows, prefix, domain) =>
  rows.map(([id, tab, title, psnr, caption]) => ({
    key: `${prefix}-${id}`,
    tab,
    title,
    domain,
    caption,
    scene: id,
    psnr,
    videos: Object.fromEntries(
      compareArms.map(({ key }) => [key, `assets/compare/videos/lb_${prefix}_${id}_${key}.mp4`]),
    ),
    poseData: `assets/compare/pose-data/lb_${prefix}_${id}.json`,
    metrics: ["9 views · 8 fps · 252 × 252"],
  }));

const paperScenes = [
  {
    key: "paper-re10k-024",
    tab: "Library doorway",
    title: "Sitting room and library doorway",
    domain: "RealEstate10K",
    caption: "The camera moves across a sitting room toward a wood-framed glass doorway and the bookshelves beyond.",
    scene: "024",
    psnr: { ours: 18.04, raev2: 17.17, sdvae: 17.77, wan21: 13.57, da3l0: 15.87, da3l3: 16.88 },
    videos: Object.fromEntries(
      compareArms.map(({ key }) => [key, `assets/compare/videos/paper_verified_re10k_024_${key}.mp4`]),
    ),
    poseData: "assets/compare/pose-data/paper_re10k_024.json",
    metrics: ["9 views · 8 fps · 252 × 252"],
  },
  {
    key: "paper-re10k-002",
    tab: "Dining to kitchen",
    title: "Dining room opening into a kitchen",
    domain: "RealEstate10K",
    caption: "The camera advances from the dining area into a bright kitchen with wooden cabinets and stainless-steel appliances.",
    scene: "002",
    psnr: { ours: 18.16, raev2: 16.81, sdvae: 16.50, wan21: 16.46, da3l0: 17.80, da3l3: 14.05 },
    videos: Object.fromEntries(
      compareArms.map(({ key }) => [key, `assets/compare/videos/paper_exact_re10k_002_${key}.mp4`]),
    ),
    poseData: "assets/compare/pose-data/paper_re10k_002.json",
    metrics: ["9 views · 8 fps · 252 × 252"],
  },
];

const compareSamples = [
  ...build(re10k, "re10k", "RealEstate10K"),
  ...build(scannetpp, "snpp", "ScanNet++"),
  ...paperScenes,
];

return { compareArms,compareSamples };
})();
const module6 = (() => {
// Four-way comparison of the point clouds each method generates on
// RealEstate10K, driven by the shared 64-scene manifest
// (gen3r/re10k_geom_seed42_v9_iv10_n64, seed 42, V=9, interval 10, cond 1).
// Every run stores bit-identical ground-truth frames, so a scene index means the
// same clip in all four.
//
// Geometry is rebuilt the way the metrics do it: per-view c2w and intrinsics are
// recovered from the ray head, then depth is back-projected with an OpenCV
// pinhole. Gen3R stores world points directly. The reference cloud is DA3 run on
// the real target frames.
//
// `cham` is the symmetric nearest-neighbour distance and `pmap` the mean
// distance between corresponding points, both after a Sim3 fit and both in units
// of the reference cloud's median radius. Lower is better. Measured over all 64
// scenes the means are ours .065 / DA3-L0 .074 / Gen3R .119 / GLD .159 Chamfer,
// with ours best on 40 of the 64.
const cloudArms = [
  { key: "gt", label: "Reference", detail: "DA3 on the real frames" },
  { key: "ours", label: "GAE", detail: "compact DA3 features", highlight: true },
  { key: "da3l0", label: "Raw DA3 L0", detail: "uncompressed DA3 features" },
  { key: "gen3r", label: "Gen3R", detail: "feed-forward 3D generator" },
  { key: "gld", label: "GLD", detail: "geometry latent diffusion" },
];

const scenes = [
  ["010", "Window room", "Hallway into a window room",
   { ours: [0.0476, 0.1347], da3l0: [0.1360, 0.3149], gen3r: [0.1303, 0.4869], gld: [0.2395, 0.7076] },
   "The widest geometry margin of the 64 scenes: ours is 2.7× closer to the reference than the best of the three baselines. The room reads as a box with a doorway cut into it. GLD collapses the same scene into a splayed, streaked sheet and turns the doorway into a floating slab, Gen3R keeps a box but corrugates every wall, and Raw DA3 L0 tilts the whole room and warps the opening."],
  ["044", "Ridge cabin", "A-frame cabin on a forested ridge",
   { ours: [0.0604, 0.2866], gld: [0.1452, 0.4740], da3l0: [0.1962, 0.7520], gen3r: [0.3054, 1.0172] },
   "An outdoor scene with a genuinely far background, which is where the baselines come apart. Ours keeps the winding road, the tree mass and the sky at their right relative depths. GLD flattens the sky into a curved shell and loses most of the road surface, Raw DA3 L0 shatters the sky into a scattered band, and Gen3R splays the ground outward — its worst scene of the four here."],
  ["026", "Orange dining", "Dining room with orange walls",
   { ours: [0.0238, 0.0614], da3l0: [0.0412, 0.1019], gen3r: [0.0557, 0.1451], gld: [0.0865, 0.2727] },
   "The easiest of the four in absolute terms — a compact room where every method gets the rough box — and useful for that reason: the ordering is unchanged even when all four are close. Ours resolves the window reveals and the table as separate surfaces; GLD washes the walls pale and drops the table entirely."],
  ["003", "Bathroom", "Bathroom with pedestal basin",
   { ours: [0.0365, 0.1025], da3l0: [0.0925, 0.2187], gen3r: [0.0969, 0.3432], gld: [0.1997, 0.6096] },
   "A small room whose content is mostly thin fixtures. Ours keeps the basin and the toilet as distinct volumes against the wall. Gen3R invents a tall white column through the middle of the room, GLD splays the walls apart, and Raw DA3 L0 keeps the fixtures but tilts the floor plane."],
  ["001", "Bright studio", "Bright meeting room with display shelves",
   { ours: [0.0582, 0.1126], da3l0: [0.1350, 0.2654], gen3r: [0.0806, 0.1638], gld: [0.1584, 0.3090] },
   "A bright room with long planar walls, a central table, and shelving along the side. GAE preserves the room envelope and keeps the furniture attached to the floor, while the baselines introduce larger wall and depth distortions."],
  ["061", "Bedroom", "Bedroom beyond an open landing",
   { ours: [0.0302, 0.0610], da3l0: [0.0350, 0.0901], gen3r: [0.1124, 0.2436], gld: [0.1537, 0.3879] },
   "A wide interior with a bedroom opening into the main space. GAE keeps the floor, doorway, and distant bed in one coherent layout and achieves the lowest Chamfer error among all four generated methods."],
];

const cloudSamples = scenes.map(([id, tab, title, metrics, caption]) => ({
  key: `pc-${id}`,
  tab,
  title,
  domain: "RealEstate10K",
  caption,
  scene: id,
  metrics,
  videos: Object.fromEntries(
    cloudArms.map(({ key }) => [key, `assets/compare/geometry-videos/geometry_${id}_${key}.mp4`]),
  ),
}));

return { cloudArms,cloudSamples };
})();
const module7 = (() => {
const colleagueSamples = [
  {
    "key": "lm-kitti-0002-split20",
    "tab": "Sunlit drive",
    "domain": "Large motion v1",
    "sample": "lm-kitti-0002-split20",
    "title": "Sunlit drive",
    "checkpoint": "LM-v1 · step 2000",
    "rgb": "assets/colleague/curated-20260916/videos/lm-kitti-0002-split20_rgb.mp4",
    "progressive": "assets/colleague/curated-20260916/videos/lm-kitti-0002-split20_progressive.mp4",
    "caption": "A sunlit drive along a leafy residential street.",
    "source": "large-motion-v1-page-eval/0002000/20260904_224943/eval/shard_2/case_002",
    "metrics": [
      "81 frames · 8 fps",
      "672 × 378",
      "1 conditioning frame"
    ],
    "displayNumber": 1,
    "label": "Sunlit drive"
  },
  {
    "key": "lm-kitti-0000-split10",
    "tab": "Urban drive",
    "domain": "Large motion v1",
    "sample": "lm-kitti-0000-split10",
    "title": "Urban drive",
    "checkpoint": "LM-v1 · step 2000",
    "rgb": "assets/colleague/curated-20260916/videos/lm-kitti-0000-split10_rgb.mp4",
    "progressive": "assets/colleague/curated-20260916/videos/lm-kitti-0000-split10_progressive.mp4",
    "caption": "An urban residential drive with parked and moving vehicles.",
    "source": "large-motion-v1-page-eval/0002000/20260904_224943/eval/shard_0/case_002",
    "metrics": [
      "81 frames · 8 fps",
      "672 × 378",
      "1 conditioning frame"
    ],
    "displayNumber": 2,
    "label": "Urban drive"
  },
  {
    "key": "lm-lingbo-forward",
    "tab": "Temple approach",
    "domain": "Large motion v1",
    "sample": "lm-lingbo-forward",
    "title": "Temple approach",
    "checkpoint": "LM-v1 · step 2000",
    "rgb": "assets/colleague/curated-20260916/videos/lm-lingbo-forward_rgb.mp4",
    "progressive": "assets/colleague/curated-20260916/videos/lm-lingbo-forward_progressive.mp4",
    "caption": "A designed forward approach toward a classical temple.",
    "source": "large-motion-v1-page-eval/0002000/lingbo_designed3_20260905_1812/eval/shard_0/case_000",
    "metrics": [
      "81 frames · 8 fps",
      "672 × 378",
      "1 conditioning frame"
    ],
    "displayNumber": 3,
    "label": "Temple approach"
  },
  {
    "key": "pexels-35548242",
    "tab": "Snowy creek",
    "domain": "Large motion v2",
    "sample": "pexels-35548242",
    "title": "Snowy creek",
    "checkpoint": "LM-v2 Pexels · step 1000",
    "rgb": "assets/colleague/curated-20260916/videos/pexels-35548242_rgb.mp4",
    "progressive": "assets/colleague/curated-20260916/videos/pexels-35548242_progressive.mp4",
    "caption": "A smooth flight above a snow-covered forest creek.",
    "source": "large-motion-v2-pexels-eval/0001000/20260907_101355/eval/shard_3/case_000",
    "metrics": [
      "81 frames · 8 fps",
      "672 × 378",
      "1 conditioning frame"
    ],
    "displayNumber": 4,
    "label": "Snowy creek"
  },
  {
    "key": "pexels-38250760-c1",
    "tab": "Mountain village",
    "domain": "Large motion v2",
    "sample": "pexels-38250760-c1",
    "title": "Mountain village",
    "checkpoint": "LM-v2 Pexels · step 1000",
    "rgb": "assets/colleague/curated-20260916/videos/pexels-38250760-c1_rgb.mp4",
    "progressive": "assets/colleague/curated-20260916/videos/pexels-38250760-c1_progressive.mp4",
    "caption": "An aerial view across an autumn mountain village.",
    "source": "large-motion-v2-pexels-eval/0001000/20260907_101355/eval/shard_3/case_001",
    "metrics": [
      "81 frames · 8 fps",
      "672 × 378",
      "1 conditioning frame"
    ],
    "displayNumber": 5,
    "label": "Mountain village"
  },
  {
    "key": "pexels-38250760-c3",
    "tab": "Autumn canyon",
    "domain": "Large motion v2",
    "sample": "pexels-38250760-c3",
    "title": "Autumn canyon",
    "checkpoint": "LM-v2 Pexels · step 1000",
    "rgb": "assets/colleague/curated-20260916/videos/pexels-38250760-c3_rgb.mp4",
    "progressive": "assets/colleague/curated-20260916/videos/pexels-38250760-c3_progressive.mp4",
    "caption": "A sweeping view into an autumn mountain canyon.",
    "source": "large-motion-v2-pexels-eval/0001000/20260907_101355/eval/shard_5/case_001",
    "metrics": [
      "81 frames · 8 fps",
      "672 × 378",
      "1 conditioning frame"
    ],
    "displayNumber": 6,
    "label": "Autumn canyon"
  },
  {
    "key": "pexels-39112915",
    "tab": "City rooftop",
    "domain": "Large motion v2",
    "sample": "pexels-39112915",
    "title": "City rooftop",
    "checkpoint": "LM-v2 Pexels · step 1000",
    "rgb": "assets/colleague/curated-20260916/videos/pexels-39112915_rgb.mp4",
    "progressive": "assets/colleague/curated-20260916/videos/pexels-39112915_progressive.mp4",
    "caption": "A rooftop panorama across a modern city district.",
    "source": "large-motion-v2-pexels-eval/0001000/20260907_101355/eval/shard_7/case_000",
    "metrics": [
      "81 frames · 8 fps",
      "672 × 378",
      "1 conditioning frame"
    ],
    "displayNumber": 7,
    "label": "City rooftop"
  },
  {
    "key": "omniworld-099",
    "tab": "Hillside rider",
    "domain": "OmniWorld iv3",
    "sample": "099",
    "title": "Hillside rider",
    "checkpoint": "OmniWorld iv3 · step 13000",
    "rgb": "assets/colleague/curated-20260916/videos/omniworld-099_rgb.mp4",
    "progressive": "assets/colleague/curated-20260916/videos/omniworld-099_progressive.mp4",
    "caption": "A rider crossing a sunlit hillside with dense vegetation.",
    "source": "step0013000/iv3/omniworld_game_packed/scannetpp/099_pred.mp4",
    "metrics": [
      "81 frames · 12 fps",
      "672 × 378",
      "1 conditioning frame"
    ],
    "displayNumber": 8,
    "label": "Hillside rider"
  },
  {
    "key": "worldlabs-034",
    "tab": "Indoor pool",
    "domain": "WorldLabs",
    "sample": "034",
    "title": "Indoor pool",
    "checkpoint": "WorldLabs · step 13000",
    "rgb": "assets/colleague/curated-20260916/videos/worldlabs-034_rgb.mp4",
    "progressive": "assets/colleague/curated-20260916/videos/worldlabs-034_progressive.mp4",
    "caption": "A quiet indoor pool with reflective water and layered room geometry.",
    "source": "step0013000/worldlabs_packed/scannetpp/034_pred.mp4",
    "metrics": [
      "81 frames · 12 fps",
      "672 × 378",
      "1 conditioning frame"
    ],
    "displayNumber": 9,
    "label": "Indoor pool"
  }
];

return { colleagueSamples };
})();
const module8 = (() => {
const independent3DMethods = [
  { key: "wan21", label: "Wan2.1 VAE", detail: "appearance-native latent", color: "#f28e2b" },
  { key: "raev2", label: "RAEv2", detail: "semantic-native latent", color: "#7657d5" },
  { key: "gae", label: "GAE", detail: "geometry-native latent", color: "#0a9b83", highlight: true },
];

const root = "assets/independent3d";

const independent3DSamples = [
  {
    key: "re10k011",
    tab: "Glass-door room",
    title: "White glass-door interior",
    domain: "RealEstate10K",
    reference: root + "/re10k011/reference.png",
    caption: "Thin white door frames and glass grids make cross-view drift immediately visible. GAE preserves a coherent room and follows the prescribed path more closely.",
  },
  {
    key: "re10k020",
    tab: "Wood kitchen",
    title: "Wood-cabinet kitchen",
    domain: "RealEstate10K",
    reference: root + "/re10k020/reference.png",
    caption: "The cabinet, counter, and appliance planes expose depth layering and pose drift. Compare the independently recovered geometry and trajectory under the same input path.",
  },
  {
    key: "scannetpp002",
    tab: "Forest display",
    title: "Woodland barrel display",
    domain: "ScanNet++",
    reference: root + "/scannetpp002/reference.png",
    caption: "The outdoor display combines thin branches, vessels, and surrounding foliage. GAE retains a more stable spatial arrangement while the baselines show stronger warping and layering.",
  },
].map((sample) => ({
  ...sample,
  videos: Object.fromEntries(independent3DMethods.map(({ key }) => [key, root + "/" + sample.key + "/video_" + key + ".mp4"])),
  poseData: root + "/" + sample.key + "/pose-sync.json",
  poses: Object.fromEntries(independent3DMethods.map(({ key }) => [key, root + "/" + sample.key + "/pose_" + key + ".png"])),
}));

return { independent3DMethods,independent3DSamples };
})();
const module0 = (() => {
const {  teaserSamples  } = module1;
const {  i2vSamples, t2iSamples, reconSamples, outdoorSamples  } = module2;
const {  compareSamples, compareArms  } = module5;
const {  cloudSamples, cloudArms  } = module6;
const {  colleagueSamples  } = module7;
const {  independent3DSamples, independent3DMethods  } = module8;

// Merge only exactly matched source cases; preserve existing authored metadata.
for (const sample of [...teaserSamples, ...i2vSamples, ...colleagueSamples, ...outdoorSamples]) {
  sample.metrics = sample.metrics?.map(metric => /frames.*fps/.test(metric) ? "81 views · 6 s synchronized" : metric);
  const extra = window.NGD_SEQUENCE_EXTRAS?.[sample.key];
  if (extra) {
    sample.depth = extra.depth; sample.pose = extra.pose; sample.poseData = extra.poseData;
    window.NGD_DIRECT_POSES[sample.poseData] = extra.data;
  }
}
const sequencePlayers = new Map();
function sequencePlayer(prefix) {
  if (!sequencePlayers.has(prefix)) sequencePlayers.set(prefix, window.createSequencePlayer({
    left: document.querySelector(`#${prefix}-video`),
    right: document.querySelector(`#${prefix}-progressive-video`),
    host: document.querySelector(`#${prefix}-video`).closest('.media-panel'),
    canvas: document.querySelector(`#${prefix}-pose-overlay`),
    image: document.querySelector(`#${prefix}-pose`),
  }));
  return sequencePlayers.get(prefix);
}

function setActive(container, key) {
  container.querySelectorAll("button").forEach((button) => {
    const active = button.dataset.key === key;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });
}

function updateMediaToggle(toggle, sample, mode) {
  if (!toggle) return;
  const buttons = [...toggle.querySelectorAll('button')];
  const available = buttons.filter(button => Boolean(sample[button.dataset.mode]));
  toggle.hidden = available.length < 2;
  for (const button of buttons) {
    button.hidden = !sample[button.dataset.mode];
    button.classList.toggle('active', button.dataset.mode === mode);
    button.setAttribute('aria-pressed', String(button.dataset.mode === mode));
  }
}

function swapVideo(video, source, openLinkSelector = "#i2v-video-open", autoplay = true) {
  video.poster = source.replace(/\.mp4(?=([?#]|$))/, "_poster.jpg");
  if (deferVideoSource(video, () => swapVideo(video, source, openLinkSelector, autoplay))) return false;
  const directLink = document.querySelector(openLinkSelector);
  if (directLink) directLink.href = source;
  if (video.dataset.videoSource === source) {
    if (autoplay) {
      const play = video.play();
      if (play) play.catch(() => {});
    }
    return false;
  }
  video.dataset.videoSource = source;
  video.pause();
  video.removeAttribute("src");
  const mp4 = document.createElement("source");
  mp4.src = source;
  mp4.type = "video/mp4";
  const webmPath = source.replace(/\.mp4(?=([?#]|$))/, ".webm");
  const nodes = [mp4];
  // Recon gallery ships MP4 only; keep WebM optional for I2V.
  if (webmPath !== source && !source.startsWith("assets/recon/")
    && !source.startsWith("assets/colleague/")
    && !source.startsWith("assets/teaser/")) {
    const webm = document.createElement("source");
    webm.src = webmPath;
    webm.type = 'video/webm; codecs="vp9"';
    nodes.push(webm);
  }
  video.replaceChildren(...nodes, document.createTextNode("Your browser does not support HTML5 video playback."));
  video.load();
  if (autoplay) {
    const play = video.play();
    if (play) play.catch(() => {});
  }
  return true;
}

function poseSource(sample) {
  if (sample.pose) return sample.pose;
  return sample.rgb
    .replace("assets/i2v/videos/", "assets/i2v/poses/")
    .replace(/_rgb\.mp4$/, "_pose.png");
}

let poseOverlayData = null;
let poseOverlayLoadToken = 0;
let poseOverlayAnimation = 0;

function poseCanvasPoint(point, area) {
  return [area.x + point[0] * area.w, area.y + point[1] * area.h];
}

function drawPosePath(ctx, points, end, area, color, alpha, dashed = false) {
  if (!points?.length) return;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = dashed ? 1.5 : 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.setLineDash(dashed ? [5, 6] : []);
  ctx.beginPath();
  points.slice(0, end + 1).forEach((point, index) => {
    const [x, y] = poseCanvasPoint(point, area);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.restore();
}

function drawPoseCamera(ctx, point, direction, area, color) {
  const [x, y] = poseCanvasPoint(point, area);
  const length = Math.hypot(direction[0], direction[1]) || 1;
  const dx = direction[0] / length;
  const dy = direction[1] / length;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.atan2(dy, dx));
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.moveTo(11, 0);
  ctx.lineTo(-6, -6);
  ctx.lineTo(-3, 0);
  ctx.lineTo(-6, 6);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawPoseOverlayInto(canvas, video, data) {
  if (!canvas || !video || canvas.hidden || !data) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const frameCount = data.frameCount || 33;
  const fps = data.fps || 4;
  const frame = Math.max(0, Math.min(frameCount - 1, Math.floor(video.currentTime * fps + 0.001)));
  const input = data.input;
  const predicted = data.predicted;
  const area = { x: 22, y: 58, w: width - 44, h: height - 96 };
  const cyan = "#67e8f9";
  const magenta = "#f0abfc";

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(5, 7, 12, .88)";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(255, 255, 255, .22)";
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, width - 2, height - 2);

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 17px Inter, system-ui, sans-serif";
  ctx.fillText("POSE", 22, 28);
  ctx.fillStyle = "rgba(255,255,255,.65)";
  ctx.font = "700 14px Inter, system-ui, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`${String(frame + 1).padStart(2, "0")}/${frameCount}`, width - 22, 28);
  ctx.textAlign = "left";

  ctx.fillStyle = cyan;
  ctx.fillRect(22, 41, 14, 3);
  ctx.font = "700 12px Inter, system-ui, sans-serif";
  ctx.fillText("INPUT", 42, 46);
  ctx.fillStyle = magenta;
  ctx.fillRect(126, 41, 14, 3);
  ctx.fillText("GAE", 146, 46);

  drawPosePath(ctx, input.xy, frameCount - 1, area, cyan, 0.20, true);
  drawPosePath(ctx, predicted.xy, frameCount - 1, area, magenta, 0.20, true);
  drawPosePath(ctx, input.xy, frame, area, cyan, 0.95);
  drawPosePath(ctx, predicted.xy, frame, area, magenta, 0.95);

  const inputPoint = poseCanvasPoint(input.xy[frame], area);
  const predPoint = poseCanvasPoint(predicted.xy[frame], area);
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,.72)";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([3, 4]);
  ctx.beginPath();
  ctx.moveTo(inputPoint[0], inputPoint[1]);
  ctx.lineTo(predPoint[0], predPoint[1]);
  ctx.stroke();
  ctx.restore();
  drawPoseCamera(ctx, input.xy[frame], input.direction[frame], area, cyan);
  drawPoseCamera(ctx, predicted.xy[frame], predicted.direction[frame], area, magenta);

  const nate = data.metrics.ateNormalized * 100;
  ctx.fillStyle = "rgba(255,255,255,.84)";
  ctx.font = "700 13px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.fillText(`nATE ${nate.toFixed(2)}%`, 22, height - 18);
  ctx.textAlign = "right";
  ctx.fillText("INPUT ↔ GAE", width - 22, height - 18);
  ctx.textAlign = "left";
}

function drawPoseOverlay() {
  drawPoseOverlayInto(
    document.querySelector("#i2v-pose-overlay"),
    document.querySelector("#i2v-video"),
    poseOverlayData,
  );
}

function startPoseOverlayAnimation() {
  cancelAnimationFrame(poseOverlayAnimation);
  const tick = () => {
    drawPoseOverlay();
    const video = document.querySelector("#i2v-video");
    const canvas = document.querySelector("#i2v-pose-overlay");
    if (video && canvas && !video.paused && !canvas.hidden) {
      poseOverlayAnimation = requestAnimationFrame(tick);
    }
  };
  poseOverlayAnimation = requestAnimationFrame(tick);
}

async function loadPoseOverlay(sample) {
  const canvas = document.querySelector("#i2v-pose-overlay");
  const token = ++poseOverlayLoadToken;
  poseOverlayData = null;
  canvas.hidden = true;
  if (!sample.poseData) return;
  try {
    const data = window.NGD_DIRECT_POSES?.[sample.poseData];
    if (!data) throw new Error("embedded pose data unavailable");
    if (token !== poseOverlayLoadToken) return;
    poseOverlayData = data;
    canvas.hidden = true;
    drawPoseOverlay();
    startPoseOverlayAnimation();
  } catch (error) {
    console.warn("Pose overlay unavailable:", error);
  }
}

function initPoseOverlay() {
  const video = document.querySelector("#i2v-video");
  if (!video) return;
  video.addEventListener("play", startPoseOverlayAnimation);
  ["loadedmetadata", "timeupdate", "seeking", "seeked", "pause"].forEach((eventName) => {
    video.addEventListener(eventName, drawPoseOverlay);
  });
}

function updateI2VMedia() {
  const sample = i2vSamples[currentI2V];
  updateMediaToggle(document.querySelector('#i2v-media-toggle'), sample, currentI2VMode);
  sequencePlayer('i2v').select(sample, currentI2VMode);
}

const viewerById = {};
let currentI2V = 0;
let currentI2VMode = "rgb";
let currentI2VGeoMode = "progressive";
let i2vStarted = false;
let currentT2I = 0;
let currentT2IMode = "rgb";
let t2iStarted = false;
let currentRecon = 0;
let currentReconMode = "compare";
let reconStarted = false;

function initRecon() {
  const tabs = document.querySelector("#recon-tabs");
  if (!tabs || !reconSamples?.length) return;

  reconSamples.forEach((sample, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.role = "tab";
    button.dataset.key = sample.key;
    button.innerHTML = `<img src="${sample.rgb.replace(/\.mp4$/, "_poster.jpg")}" alt="" loading="lazy" decoding="async" /><span><b>${String(index + 1).padStart(2, "0")} · ${sample.tab}</b></span>`;
    button.addEventListener("click", () => selectRecon(index));
    tabs.appendChild(button);
  });

  document.querySelectorAll("#recon-media-toggle button").forEach((button) => {
    button.addEventListener("click", () => {
      currentReconMode = button.dataset.mode;
      document.querySelectorAll("#recon-media-toggle button").forEach((item) => {
        item.classList.toggle("active", item === button);
          item.setAttribute("aria-pressed", String(item === button));
      });
      updateReconMedia();
    });
  });

  const video = document.querySelector("#recon-video");
  const status = document.querySelector("#recon-video-status");
  const directLink = document.querySelector("#recon-video-open");
  if (video && status && directLink) {
    video.addEventListener("loadeddata", () => { status.hidden = true; });
    video.addEventListener("error", () => { status.hidden = false; });
    video.addEventListener("loadstart", () => {
      status.hidden = true;
      directLink.href = video.currentSrc || video.querySelector("source")?.src || directLink.href;
    });
  }

  selectRecon(0);
}

function updateReconMedia() {
  const sample = reconSamples[currentRecon];
  const video = document.querySelector("#recon-video");
  const pose = document.querySelector("#recon-pose");
  if (!sample || !video || !pose) return;

  const showingPose = currentReconMode === "pose";
  video.hidden = showingPose;
  pose.hidden = !showingPose;
  if (showingPose) {
    video.pause();
    pose.src = sample.pose;
    pose.alt = `${sample.title} — input versus reconstructed camera trajectory`;
  } else {
    swapVideo(video, sample[currentReconMode], "#recon-video-open");
  }
}

function selectRecon(index) {
  currentRecon = index;
  const sample = reconSamples[index];
  setActive(document.querySelector("#recon-tabs"), sample.key);
  document.querySelector("#recon-title").textContent = sample.title;
  document.querySelector("#recon-caption").textContent = sample.caption;
  document.querySelector("#recon-metrics").innerHTML = sample.metrics
    .map((metric) => `<span>${metric}</span>`)
    .join("");
  updateReconMedia();

}

function initI2V() {
  const tabs = document.querySelector("#i2v-tabs");
  i2vSamples.forEach((sample, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.role = "tab";
    button.dataset.key = sample.key;
    button.innerHTML = `<img src="${sample.rgb.replace(/\.mp4$/, "_poster.jpg")}" alt="" loading="lazy" decoding="async" /><span><b>${String(index + 1).padStart(2, "0")} · ${sample.tab}</b></span>`;
    button.addEventListener("click", () => selectI2V(index));
    tabs.appendChild(button);
  });

  document.querySelectorAll("#i2v-media-toggle button").forEach((button) => {
    button.addEventListener("click", () => {
      currentI2VMode = button.dataset.mode;
      document.querySelectorAll("#i2v-media-toggle button").forEach((item) => item.classList.toggle("active", item === button));
      updateI2VMedia();
    });
  });

  document.querySelectorAll("#i2v-geo-toggle button").forEach((button) => {
    button.addEventListener("click", () => {
      currentI2VGeoMode = button.dataset.geo;
      document.querySelectorAll("#i2v-geo-toggle button").forEach((item) => item.classList.toggle("active", item === button));
      updateI2VGeo();
    });
  });

  selectI2V(0);
  updateI2VGeo();
}

function setProgressiveVideo() { /* Sources are owned by the shared timeline. */ }
function updateI2VGeo() {}

function selectI2V(index) {
  currentI2V = index;
  const sample = i2vSamples[index];
  setActive(document.querySelector("#i2v-tabs"), sample.key);
  document.querySelector("#i2v-title").textContent = sample.title;
  document.querySelector("#i2v-caption").textContent = sample.caption;
  document.querySelector("#i2v-metrics").innerHTML = sample.metrics.map((metric) => `<span>${metric}</span>`).join("");
  if (!sample[currentI2VMode]) currentI2VMode = "rgb";
  updateMediaToggle(document.querySelector('#i2v-media-toggle'), sample, currentI2VMode);
  updateI2VMedia();
  setProgressiveVideo(sample);

}

// ---- Generated sequence galleries share the same
// behavior, but each factory instance owns independent selection and pose state. ----
function createSequenceGallery(prefix, samples) {
  let current = 0;
  let currentMode = "rgb";
  let currentGeoMode = "progressive";
  let started = false;
  let poseData = null;
  let poseLoadToken = 0;
  let poseAnimation = 0;

  const element = (suffix) => document.querySelector(`#${prefix}-${suffix}`);
  const elements = (suffix) => document.querySelectorAll(`#${prefix}-${suffix} button`);
  const viewerKey = `${prefix}-viewer`;

  function drawPoseOverlay() {
    drawPoseOverlayInto(element("pose-overlay"), element("video"), poseData);
  }

  function startPoseAnimation() {
    cancelAnimationFrame(poseAnimation);
    const tick = () => {
      drawPoseOverlay();
      const video = element("video");
      const canvas = element("pose-overlay");
      if (video && canvas && !video.paused && !canvas.hidden) {
        poseAnimation = requestAnimationFrame(tick);
      }
    };
    poseAnimation = requestAnimationFrame(tick);
  }

  function initPoseOverlay() {
    const video = element("video");
    if (!video) return;
    video.addEventListener("play", startPoseAnimation);
    ["loadedmetadata", "timeupdate", "seeking", "seeked", "pause"].forEach((eventName) => {
      video.addEventListener(eventName, drawPoseOverlay);
    });
  }

  function loadPoseOverlay(sample) {
    const canvas = element("pose-overlay");
    const token = ++poseLoadToken;
    poseData = null;
    canvas.hidden = true;
    if (!sample.poseData) return;
    try {
      const data = window.NGD_DIRECT_POSES?.[sample.poseData];
      if (!data) throw new Error("embedded pose data unavailable");
      if (token !== poseLoadToken) return;
      poseData = data;
      canvas.hidden = true;
      drawPoseOverlay();
      startPoseAnimation();
    } catch (error) {
      console.warn("Pose overlay unavailable:", error);
    }
  }

  function updateMedia() {
    updateMediaToggle(element('media-toggle'), samples[current], currentMode);
    sequencePlayer(prefix).select(samples[current], currentMode);
  }
  function setProgressiveVideo() {}
  function updateGeo() {}

  function select(index) {
    current = index;
    const sample = samples[index];
    setActive(element("tabs"), sample.key);
    element("title").textContent = sample.title;
    element("caption").textContent = sample.caption;
    element("metrics").innerHTML = sample.metrics
      .map((metric) => `<span>${metric}</span>`)
      .join("");
    if (!sample[currentMode]) currentMode = "rgb";
    updateMediaToggle(element('media-toggle'), sample, currentMode);
      updateMedia();
    setProgressiveVideo(sample);
  }

  function init() {
    const tabs = element("tabs");
    if (!tabs || !samples?.length) return;
    samples.forEach((sample, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.role = "tab";
      button.dataset.key = sample.key;
      button.innerHTML = `<img src="${sample.rgb.replace(/\.mp4$/, "_poster.jpg")}" alt="" loading="lazy" decoding="async" /><span><b>${String(index + 1).padStart(2, "0")} · ${sample.tab}</b></span>`;
      button.addEventListener("click", () => select(index));
      tabs.appendChild(button);
    });

    elements("media-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        currentMode = button.dataset.mode;
        elements("media-toggle").forEach((item) => {
          item.classList.toggle("active", item === button);
          item.setAttribute("aria-pressed", String(item === button));
        });
        updateMedia();
      });
    });

    elements("geo-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        currentGeoMode = button.dataset.geo;
        elements("geo-toggle").forEach((item) => {
          item.classList.toggle("active", item === button);
          item.setAttribute("aria-pressed", String(item === button));
        });
        updateGeo();
      });
    });

    select(0);
    updateGeo();
  }

  function initVideoFallback() {
    const video = element("video");
    const status = element("video-status");
    const directLink = element("video-open");
    if (!video || !status || !directLink) return;
    video.addEventListener("loadeddata", () => { status.hidden = true; });
    video.addEventListener("error", () => { status.hidden = false; });
    video.addEventListener("loadstart", () => {
      status.hidden = true;
      directLink.href = video.currentSrc || video.src;
    });
  }

  return { init, initPoseOverlay, initVideoFallback };
}

const outdoorGallery = createSequenceGallery("outdoor", [...colleagueSamples, ...outdoorSamples]);

function initT2I() {
  const tabs = document.querySelector("#t2i-tabs");
  t2iSamples.forEach((sample, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.role = "tab";
    button.dataset.key = sample.key;
    button.innerHTML = `<img src="${sample.rgb}" alt="" loading="lazy" decoding="async" /><span>${String(index + 1).padStart(2, "0")} · ${sample.tab}</span>`;
    button.addEventListener("click", () => selectT2I(index));
    tabs.appendChild(button);
  });

  document.querySelectorAll("#t2i-media-toggle button").forEach((button) => {
    button.addEventListener("click", () => {
      currentT2IMode = button.dataset.mode;
      document.querySelectorAll("#t2i-media-toggle button").forEach((item) => item.classList.toggle("active", item === button));
      updateT2IImage();
    });
  });

  selectT2I(0);
}

function updateT2IImage() {
  const sample = t2iSamples[currentT2I];
  const image = document.querySelector("#t2i-image");
  image.src = sample[currentT2IMode];
  image.alt = `${sample.title} — generated ${currentT2IMode === "rgb" ? "RGB image" : "depth map"}`;
  document.querySelector("#t2i-modality").textContent = currentT2IMode.toUpperCase();
}

function selectT2I(index) {
  currentT2I = index;
  const sample = t2iSamples[index];
  setActive(document.querySelector("#t2i-tabs"), sample.key);
  document.querySelector("#t2i-title").textContent = sample.title;
  document.querySelector("#t2i-caption").textContent = sample.caption;
  updateT2IImage();
  const depth = document.querySelector("#t2i-depth-image");
  depth.src = sample.depth;
  depth.alt = sample.title + " — generated depth map";
  document.dispatchEvent(new CustomEvent("image-scene-selected", {detail: sample.key}));
}

let currentCompare = 0;
let comparePoseData = null;
let comparePoseLoadToken = 0;
let comparePoseAnimation = 0;

// Grid order: ground truth, the shared camera path, then ours followed by the
// baselines. The pose cell is spliced in rather than living in compareArms so
// the arm list stays a pure description of the models.
const compareCells = (() => {
  const cells = compareArms.map((arm) => ({ type: "video", arm }));
  cells.splice(1, 0, { type: "pose" });
  return cells;
})();

const compareVideoId = (key) => `compare-v-${key}`;
const comparePsnrId = (key) => `compare-psnr-${key}`;

function compareVideos() {
  return compareArms
    .map(({ key }) => document.querySelector(`#${compareVideoId(key)}`))
    .filter(Boolean);
}

// The oblique orthographic projection is baked by
// tools/export_sweep_pose_overlay.py, so this only has to stroke 2D polylines.
const COMPARE_GHOST_EVERY = 4;

function isoPoint(point, area) {
  // The exported geometry shares one scale across both axes, so a vertical unit
  // is the same pixel length as a horizontal one.
  return [area.x + point[0] * area.w, area.y + area.h / 2 + (point[1] - 0.5) * area.w];
}

function isoFrustum(ctx, frustum, apex, area, stroke, lineWidth, fill) {
  const quad = frustum.map((corner) => isoPoint(corner, area));
  const tip = isoPoint(apex, area);
  ctx.save();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = stroke;
  ctx.lineJoin = "round";
  ctx.beginPath();
  quad.forEach(([x, y], index) => (index ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  ctx.stroke();
  ctx.beginPath();
  quad.forEach(([x, y]) => {
    ctx.moveTo(tip[0], tip[1]);
    ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.restore();
}

function isoSegments(ctx, segments, area, stroke, lineWidth) {
  ctx.save();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  segments.forEach(([from, to]) => {
    const a = isoPoint(from, area);
    const b = isoPoint(to, area);
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
  });
  ctx.stroke();
  ctx.restore();
}

function isoPolyline(ctx, points, area, stroke, lineWidth, dashed = false) {
  if (points.length < 2) return;
  ctx.save();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.setLineDash(dashed ? [4, 5] : []);
  ctx.beginPath();
  points.forEach((point, index) => {
    const [x, y] = isoPoint(point, area);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.restore();
}

function drawComparePose() {
  const canvas = document.querySelector("#compare-pose-overlay");
  const video = document.querySelector(`#${compareVideoId("gt")}`);
  const iso = comparePoseData?.iso;
  if (!canvas || !video) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  if (!iso) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(5, 7, 12, .88)";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(255, 255, 255, .22)";
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, width - 2, height - 2);
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 17px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("PAPER KEYFRAMES", width / 2, height / 2 - 12);
    ctx.fillStyle = "rgba(255,255,255,.62)";
    ctx.font = "700 13px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.fillText("REF · T=5 · T=9", width / 2, height / 2 + 18);
    ctx.textAlign = "left";
    return;
  }
  const frameCount = comparePoseData.frameCount || iso.path.length;
  const fps = comparePoseData.fps || 8;
  const frame = Math.max(0, Math.min(frameCount - 1, Math.floor(video.currentTime * fps + 0.001)));
  const cyan = "#67e8f9";

  const availW = width - 36;
  const availH = height - 96;
  const ratio = iso.heightRatio || 0.5;
  let boxW = availW;
  if (boxW * ratio > availH) boxW = availH / ratio;
  const area = { x: (width - boxW) / 2, y: 56, w: boxW, h: boxW * ratio };
  area.y = 56 + (availH - area.h) / 2;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(5, 7, 12, .88)";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(255, 255, 255, .22)";
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, width - 2, height - 2);

  isoSegments(ctx, iso.ground, area, "rgba(255, 255, 255, .13)", 1);

  // Sparse ghost frustums give the whole path an orientation reading without
  // burying the current camera in overlapping pyramids.
  for (let i = 0; i < frameCount; i += COMPARE_GHOST_EVERY) {
    isoSegments(ctx, [iso.drops[i]], area, "rgba(103, 232, 249, .16)", 1);
    isoFrustum(ctx, iso.frustums[i], iso.path[i], area, "rgba(103, 232, 249, .30)", 1);
  }

  isoPolyline(ctx, iso.path, area, "rgba(103, 232, 249, .26)", 2, true);
  isoPolyline(ctx, iso.path.slice(0, frame + 1), area, cyan, 3);
  ctx.fillStyle = "rgba(103, 232, 249, .9)";
  iso.path.slice(0, frame + 1).forEach((point) => {
    const [x, y] = isoPoint(point, area);
    ctx.beginPath();
    ctx.arc(x, y, 2.6, 0, Math.PI * 2);
    ctx.fill();
  });

  isoSegments(ctx, [iso.drops[frame]], area, "rgba(255, 255, 255, .38)", 1);
  isoFrustum(ctx, iso.frustums[frame], iso.path[frame], area, cyan, 2, "rgba(103, 232, 249, .18)");

  const [sx, sy] = isoPoint(iso.path[0], area);
  ctx.strokeStyle = "rgba(255, 255, 255, .8)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(sx, sy, 6.5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 255, 255, .8)";
  ctx.font = "700 11px Inter, system-ui, sans-serif";
  ctx.fillText("COND", sx + 10, sy - 8);

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 16px Inter, system-ui, sans-serif";
  ctx.fillText("INPUT CAMERA PATH", 22, 28);
  ctx.fillStyle = "rgba(255,255,255,.65)";
  ctx.font = "700 14px Inter, system-ui, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`${String(frame + 1).padStart(2, "0")}/${frameCount}`, width - 22, 28);
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(255,255,255,.55)";
  ctx.font = "700 12px Inter, system-ui, sans-serif";
  ctx.fillText("SHARED BY EVERY ARM", 22, 46);

  const metrics = comparePoseData.metrics || {};
  ctx.fillStyle = "rgba(255,255,255,.84)";
  ctx.font = "700 13px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.fillText(`${(metrics.pathLength ?? 0).toFixed(2)} m path`, 22, height - 18);
  ctx.textAlign = "right";
  ctx.fillText("interval 10", width - 22, height - 18);
  ctx.textAlign = "left";
}

function startComparePoseAnimation() {
  cancelAnimationFrame(comparePoseAnimation);
  const tick = () => {
    drawComparePose();
    const video = document.querySelector(`#${compareVideoId("gt")}`);
    if (video && !video.paused) {
      comparePoseAnimation = requestAnimationFrame(tick);
    }
  };
  tick();
}

async function loadComparePose(sample) {
  const token = ++comparePoseLoadToken;
  comparePoseData = null;
  if (!sample.poseData) {
    drawComparePose();
    return;
  }
  try {
    const data = window.NGD_COMPARE_POSES?.[sample.poseData];
    if (!data) throw new Error("embedded comparison pose data unavailable");
    if (token !== comparePoseLoadToken) return;
    comparePoseData = data;
    startComparePoseAnimation();
  } catch (error) {
    console.warn("compare pose overlay unavailable", sample.poseData, error);
  }
}

function setCompareSource(video, source) {
  if (!video) return;
  video.poster = source.replace(/\.mp4$/, "_poster.jpg");
  if (deferVideoSource(video, () => setCompareSource(video, source))) return;
  video.pause();
  const mp4 = document.createElement("source");
  mp4.src = source.includes("assets/compare/videos/") && source.endsWith("_wan21.mp4")
    ? source.replace("_wan21.mp4", "_wan21_compat.mp4") : source;
  mp4.type = "video/mp4";
  video.preload = "metadata";
  video.replaceChildren(mp4, document.createTextNode("Your browser does not support HTML5 video playback."));
  video.load();
}

// The clips are the same length; restarting them together keeps the frame shown
// in each cell comparable, which is the whole point of the section.
function syncComparePlayback() {
  const videos = compareVideos();
  videos.forEach((video) => { video.currentTime = 0; });
  videos.forEach((video) => {
    const play = video.play();
    if (play) play.catch(() => {});
  });
}

function buildCompareGrid() {
  const grid = document.querySelector("#compare-grid");
  if (!grid) return;
  grid.replaceChildren(...compareCells.map((cell) => {
    const figure = document.createElement("figure");
    figure.className = "compare-cell";
    if (cell.type === "pose") {
      figure.innerHTML = `
        <figcaption><b id="compare-pose-title">Input camera path</b><small id="compare-pose-detail">shared by every arm</small></figcaption>
        <div class="compare-frame compare-frame-pose">
          <canvas id="compare-pose-overlay" width="380" height="380" aria-label="Animated input camera trajectory shared by every comparison arm"></canvas>
        </div>`;
      return figure;
    }
    const { key, label, detail, highlight } = cell.arm;
    if (highlight) figure.classList.add("compare-cell-ours");
    // The ground truth is the reference the PSNR is measured against, so it gets
    // no score of its own.
    const score = key === "gt" ? "" : `<span class="compare-psnr" id="${comparePsnrId(key)}"></span>`;
    figure.innerHTML = `
      <figcaption><b>${label}</b><small>${detail}</small>${score}</figcaption>
      <div class="compare-frame">
        <video id="${compareVideoId(key)}" autoplay muted loop playsinline preload="metadata" width="252" height="252"></video>
      </div>`;
    return figure;
  }));
}

function selectCompare(index) {
  currentCompare = index;
  const sample = compareSamples[currentCompare];
  if (!sample) return;
  setActive(document.querySelector("#compare-tabs"), sample.key);
  document.querySelector("#compare-title").textContent = sample.title;
  document.querySelector("#compare-caption").textContent = sample.caption;
  const poseTitle = document.querySelector("#compare-pose-title");
  const poseDetail = document.querySelector("#compare-pose-detail");
  if (poseTitle) poseTitle.textContent = sample.poseData ? "Input camera path" : "Displayed moments";
  if (poseDetail) poseDetail.textContent = sample.poseData ? "shared by every arm" : "paper keyframes";
  document.querySelector("#compare-metrics").innerHTML = sample.metrics
    .map((metric) => `<span>${metric}</span>`)
    .join("");
  loadComparePose(sample);
  const scores = sample.psnr ?? {};
  const leader = Object.entries(scores).reduce(
    (best, entry) => (best && best[1] >= entry[1] ? best : entry), null);
  compareArms.forEach(({ key }) => {
    setCompareSource(document.querySelector(`#${compareVideoId(key)}`), sample.videos[key]);
    const badge = document.querySelector(`#${comparePsnrId(key)}`);
    if (!badge) return;
    const value = scores[key];
    badge.textContent = typeof value === "number" ? `PSNR ${value.toFixed(1)} dB` : "";
    badge.classList.toggle("compare-psnr-best", Boolean(leader) && key === leader[0]);
  });
  syncComparePlayback();
}

function initCompare() {
  const tabs = document.querySelector("#compare-tabs");
  if (!tabs || !compareSamples?.length) return;
  buildCompareGrid();

  compareSamples.forEach((sample, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.role = "tab";
    button.dataset.key = sample.key;
    button.innerHTML = `<img src="${sample.videos.ours.replace(/\.mp4$/, "_poster.jpg")}" alt="" loading="lazy" decoding="async" /><span><b>${String(index + 1).padStart(2, "0")} · ${sample.tab}</b></span>`;
    button.addEventListener("click", () => selectCompare(index));
    tabs.appendChild(button);
  });

  // Re-sync whenever the GT clip wraps so the cells cannot drift apart over time.
  const gt = document.querySelector(`#${compareVideoId("gt")}`);
  if (gt) {
    gt.addEventListener("ended", syncComparePlayback);
    ["play", "seeked", "timeupdate", "loadeddata"].forEach((eventName) => {
      gt.addEventListener(eventName, drawComparePose);
    });
    gt.addEventListener("play", startComparePoseAnimation);
  }

  selectCompare(0);
}

let currentCloud = 0;
let cloudStarted = false;
let geometryRotateActive = false;

const geometryVideoId = (key) => `geometry-video-${key}`;
const geometryViewerId = (key) => `geometry-cloud-${key}`;

function cloudScore(sample, key) {
  const metric = sample.metrics?.[key];
  return metric ? `Cham ${metric[0].toFixed(3)}` : "reference";
}

function geometryViewers() {
  return cloudArms
    .map(({ key }) => viewerById[geometryViewerId(key)])
    .filter(Boolean);
}

function geometryVideos() {
  return cloudArms
    .map(({ key }) => document.querySelector(`#${geometryVideoId(key)}`))
    .filter(Boolean);
}

function syncGeometryPlayback() {
  const videos = geometryVideos();
  videos.forEach((video) => { video.currentTime = 0; });
  videos.forEach((video) => {
    const play = video.play();
    if (play) play.catch(() => {});
  });
}

function buildGeometryComparison() {
  const pairGrid = document.querySelector("#geometry-pair-grid");
  if (!pairGrid) return;

  pairGrid.replaceChildren(...cloudArms.map(({ key, label, detail, highlight }) => {
    const article = document.createElement("article");
    article.className = `geometry-pair-card geometry-method-card${highlight ? " geometry-method-card-ours" : ""}`;
    article.innerHTML = `
      <header class="geometry-pair-card-head">
        <div><b>${label}</b><small>${detail}</small></div>
        <span class="geometry-score" data-geometry-score="${key}"></span>
      </header>
      <div class="geometry-pair-media">
        <span class="geometry-media-label">Generated video</span>
        <div class="geometry-video-frame">
          <video id="${geometryVideoId(key)}" autoplay muted loop playsinline preload="metadata" width="252" height="252"></video>
        </div>
      </div>
      
      `;
    return article;
  }));
}

function loadGeometryVideos(sample) {
  cloudArms.forEach(({ key }) => {
    setCompareSource(document.querySelector(`#${geometryVideoId(key)}`), sample.videos[key]);
  });
  syncGeometryPlayback();
}

function selectCloud(index) {
  currentCloud = index;
  const sample = cloudSamples[index];
  if (!sample) return;
  setActive(document.querySelector("#cloud-tabs"), sample.key);
  document.querySelector("#cloud-title").textContent = sample.title;
  document.querySelector("#cloud-caption").textContent = sample.caption;
  document.querySelector("#cloud-metrics").innerHTML = [
    "9 views · 8 fps · interval 10 · cond 1",
    "Chamfer ↓ after Sim3 fit",
    "geometry reconstruction score",
  ].map((metric) => `<span>${metric}</span>`).join("");
  document.querySelectorAll("[data-geometry-score]").forEach((slot) => {
    slot.textContent = cloudScore(sample, slot.dataset.geometryScore);
  });
  loadGeometryVideos(sample);
}

function initCloud() {
  const tabs = document.querySelector("#cloud-tabs");
  if (!tabs || !cloudSamples?.length) return;
  buildGeometryComparison();
  cloudSamples.forEach((sample, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.role = "tab";
    button.dataset.key = sample.key;
    button.innerHTML = `<img src="assets/compare/pointclouds/lb_pc_${sample.scene}_poster.jpg" alt="" loading="lazy" decoding="async" /><span><b>${String(index + 1).padStart(2, "0")} · ${sample.tab}</b></span>`;
    button.addEventListener("click", () => selectCloud(index));
    tabs.appendChild(button);
  });
  const gt = document.querySelector(`#${geometryVideoId("gt")}`);
  if (gt) gt.addEventListener("ended", syncGeometryPlayback);
  selectCloud(0);
}



let currentIndependent3D = 0;
let independent3DStarted = false;
let independent3DRotateActive = false;
let independent3DPoseData = null;
let independent3DPoseToken = 0;
let independent3DPoseAnimation = 0;

const independent3DViewerId = (key) => "independent3d-cloud-" + key;
const independent3DVideoId = (key) => "independent3d-video-" + key;

function independent3DViewers() {
  return independent3DMethods
    .map(({ key }) => viewerById[independent3DViewerId(key)])
    .filter(Boolean);
}

function independent3DVideos() {
  return independent3DMethods
    .map(({ key }) => document.querySelector("#" + independent3DVideoId(key)))
    .filter(Boolean);
}

function independent3DColor(key) {
  return independent3DMethods.find((method) => method.key === key)?.color || "#0a9b83";
}

function drawIndependent3DPose(key) {
  const canvas = document.querySelector('[data-independent3d-pose="' + key + '"]');
  const video = document.querySelector("#" + independent3DVideoId(key));
  const method = independent3DPoseData?.methods?.[key];
  const target = independent3DPoseData?.target;
  if (!canvas || !video || !method || !target?.length) return;

  const cssWidth = Math.max(canvas.clientWidth, 280);
  const cssHeight = Math.round(cssWidth * 0.56);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  if (canvas.width !== Math.round(cssWidth * dpr) || canvas.height !== Math.round(cssHeight * dpr)) {
    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);
  }
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssWidth, cssHeight);

  const count = target.length;
  const progress = video.duration > 0 ? video.currentTime / video.duration : 0;
  const frame = Math.max(0, Math.min(count - 1, Math.floor(progress * count + 0.001)));
  const color = independent3DColor(key);
  const marginX = 34;
  const marginTop = 38;
  const marginBottom = 34;
  const point = (value) => [
    marginX + value[0] * (cssWidth - marginX * 2),
    marginTop + value[1] * (cssHeight - marginTop - marginBottom),
  ];

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "rgba(62, 73, 87, .62)";
  ctx.lineWidth = 2;
  ctx.setLineDash([7, 6]);
  ctx.beginPath();
  target.forEach((value, index) => {
    const [x, y] = point(value);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.setLineDash([]);

  for (let index = 0; index <= frame; index += 1) {
    const [tx, ty] = point(target[index]);
    const [rx, ry] = point(method.path[index]);
    ctx.strokeStyle = "rgba(180, 65, 58, .42)";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(rx, ry);
    ctx.stroke();
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = 5;
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;
  ctx.beginPath();
  method.path.slice(0, frame + 1).forEach((value, index) => {
    const [x, y] = point(value);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.shadowBlur = 0;

  target.forEach((value) => {
    const [x, y] = point(value);
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#465260";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(x, y, 4.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  method.path.slice(0, frame + 1).forEach((value, index) => {
    const [x, y] = point(value);
    ctx.fillStyle = index === frame ? color : "#ffffff";
    ctx.strokeStyle = color;
    ctx.lineWidth = index === frame ? 3 : 2;
    ctx.beginPath();
    ctx.arc(x, y, index === frame ? 7 : 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  const [cx, cy] = point(method.path[frame]);
  const direction = method.directions[frame] || [1, 0];
  const angle = Math.atan2(direction[1], direction[0]);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(17, 0);
  ctx.lineTo(-10, -8);
  ctx.lineTo(-5, 0);
  ctx.lineTo(-10, 8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  const [sx, sy] = point(method.path[0]);
  ctx.fillStyle = "#e53935";
  ctx.beginPath();
  ctx.arc(sx, sy, 6.5, 0, Math.PI * 2);
  ctx.fill();

  const [ex, ey] = point(method.path[count - 1]);
  ctx.strokeStyle = "#1473e6";
  ctx.lineWidth = 2;
  ctx.strokeRect(ex - 5, ey - 5, 10, 10);

  ctx.font = "700 11px Inter, system-ui, sans-serif";
  ctx.fillStyle = document.body.dataset.theme === "dark" ? "#c5cdd6" : "#465260";
  ctx.fillText("TARGET", 14, 19);
  ctx.fillStyle = color;
  ctx.fillText("RECOVERED ×" + independent3DPoseData.displayResidualScale, 76, 19);
  ctx.textAlign = "right";
  ctx.fillStyle = "#697586";
  ctx.fillText("t=" + frame + " / " + (count - 1), cssWidth - 14, 19);
  ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.fillText("ATE " + method.ate.toFixed(2) + "%  ·  Rot " + method.rotation.toFixed(2) + "°", cssWidth - 14, cssHeight - 11);
  ctx.textAlign = "left";
}

function drawIndependent3DPoses() {
  independent3DMethods.forEach(({ key }) => drawIndependent3DPose(key));
}

function startIndependent3DPoseAnimation() {
  if (independent3DPoseAnimation) cancelAnimationFrame(independent3DPoseAnimation);
  const tick = () => {
    const videos = independent3DVideos();
    const lead = videos[0];
    if (lead && lead.duration > 0) {
      const leadProgress = lead.currentTime / lead.duration;
      videos.slice(1).forEach((video) => {
        if (!video.duration) return;
        const desired = leadProgress * video.duration;
        if (Math.abs(video.currentTime - desired) > 0.055) video.currentTime = desired;
      });
    }
    drawIndependent3DPoses();
    if (videos.some((video) => !video.paused && !video.ended)) {
      independent3DPoseAnimation = requestAnimationFrame(tick);
    } else {
      independent3DPoseAnimation = 0;
    }
  };
  tick();
}

const independent3DEmbeddedPoses = {"assets/independent3d/re10k020/pose-sync.json":{"frameCount":9,"fps":8,"displayResidualScale":8.0,"target":[[0.090164,0.41114],[0.182243,0.431935],[0.261859,0.445707],[0.369576,0.458969],[0.476376,0.473147],[0.569949,0.486029],[0.666858,0.508655],[0.76806,0.553489],[0.848033,0.589978]],"methods":{"gae":{"path":[[0.124864,0.377523],[0.201004,0.433429],[0.23517,0.453118],[0.345202,0.488226],[0.471385,0.485497],[0.540814,0.491638],[0.652358,0.509036],[0.791227,0.529766],[0.871095,0.590816]],"directions":[[0.991601,-0.129333],[0.989228,-0.146383],[0.986642,-0.162906],[0.98299,-0.183657],[0.977056,-0.212983],[0.972259,-0.233909],[0.963622,-0.267269],[0.946883,-0.321579],[0.931828,-0.362901]],"ate":0.499,"rotation":1.145},"raev2":{"path":[[0.203749,0.476482],[0.198172,0.413723],[0.258847,0.328923],[0.293391,0.460394],[0.415765,0.465944],[0.475511,0.539314],[0.60951,0.570008],[0.868338,0.57392],[0.909836,0.53034]],"directions":[[0.986037,-0.166529],[0.984097,-0.177634],[0.981915,-0.189324],[0.976548,-0.215299],[0.968877,-0.247541],[0.961007,-0.276523],[0.949444,-0.313936],[0.928786,-0.370616],[0.912431,-0.409231]],"ate":1.545,"rotation":7.929},"wan21":{"path":[[0.15944,0.501209],[0.143078,0.444684],[0.350812,0.387766],[0.358956,0.427583],[0.356388,0.335487],[0.449169,0.45495],[0.767587,0.671077],[0.776405,0.580665],[0.871284,0.555627]],"directions":[[0.982174,-0.187971],[0.979068,-0.203535],[0.97546,-0.220178],[0.969247,-0.246092],[0.964712,-0.263308],[0.957494,-0.288454],[0.941131,-0.338043],[0.926478,-0.376348],[0.905572,-0.424194]],"ate":1.984,"rotation":9.842}}},"assets/independent3d/re10k011/pose-sync.json":{"frameCount":9,"fps":8,"displayResidualScale":8.0,"target":[[0.225563,0.431191],[0.301437,0.45622],[0.375501,0.485053],[0.44764,0.506951],[0.524373,0.522411],[0.600691,0.536536],[0.677384,0.549978],[0.754728,0.556244],[0.832553,0.557678]],"methods":{"gae":{"path":[[0.243266,0.411862],[0.318347,0.47233],[0.365538,0.489178],[0.441142,0.523714],[0.504626,0.535609],[0.580377,0.520134],[0.662318,0.523789],[0.765972,0.560279],[0.858284,0.565367]],"directions":[[0.936778,0.349925],[0.924399,0.381427],[0.916449,0.400151],[0.910669,0.413136],[0.905208,0.424969],[0.899706,0.436496],[0.89784,0.440321],[0.897856,0.440289],[0.90014,0.435601]],"ate":0.484,"rotation":4.261},"raev2":{"path":[[0.245119,0.420509],[0.286912,0.36579],[0.398384,0.530573],[0.485026,0.558232],[0.525922,0.596172],[0.575914,0.51482],[0.58909,0.555237],[0.723666,0.541103],[0.909836,0.519828]],"directions":[[0.951602,0.307334],[0.937009,0.349305],[0.932021,0.362405],[0.926442,0.376437],[0.925196,0.379489],[0.919843,0.392287],[0.920851,0.389914],[0.920396,0.390987],[0.920569,0.390579]],"ate":1.353,"rotation":14.506},"wan21":{"path":[[0.090164,0.3365],[0.274862,0.445724],[0.433641,0.473042],[0.63188,0.578839],[0.609776,0.6635],[0.593233,0.534132],[0.664842,0.53095],[0.703298,0.521923],[0.738172,0.517651]],"directions":[[0.935302,0.35385],[0.926078,0.377332],[0.916576,0.399861],[0.908636,0.417589],[0.904151,0.427213],[0.895082,0.445902],[0.894781,0.446504],[0.893517,0.44903],[0.892495,0.451058]],"ate":2.273,"rotation":2.659}}},"assets/independent3d/scannetpp002/pose-sync.json":{"frameCount":9,"fps":8,"displayResidualScale":8.0,"target":[[0.339086,0.53354],[0.395809,0.530642],[0.447458,0.524937],[0.494762,0.516793],[0.557044,0.506334],[0.588199,0.510226],[0.628087,0.539552],[0.667614,0.594559],[0.697455,0.629882]],"methods":{"gae":{"path":[[0.33698,0.49882],[0.416449,0.514117],[0.446676,0.549455],[0.489794,0.520734],[0.526309,0.530751],[0.57245,0.527797],[0.612143,0.544375],[0.681638,0.574164],[0.733073,0.626252]],"directions":[[-0.064976,0.997887],[-0.088642,0.996064],[-0.087307,0.996181],[-0.072554,0.997365],[-0.134947,0.990853],[-0.227057,0.973882],[-0.349901,0.936787],[-0.438239,0.898858],[-0.475328,0.879809]],"ate":0.937,"rotation":2.294},"raev2":{"path":[[0.326251,0.410215],[0.389544,0.507005],[0.388014,0.520793],[0.430638,0.594081],[0.622854,0.675811],[0.673534,0.642395],[0.669295,0.584767],[0.597954,0.580411],[0.717428,0.370986]],"directions":[[-0.138834,0.990316],[-0.163499,0.986543],[-0.157271,0.987555],[-0.148591,0.988899],[-0.223674,0.974664],[-0.313524,0.94958],[-0.428156,0.903705],[-0.48587,0.874031],[-0.509665,0.860373]],"ate":4.602,"rotation":5.322},"wan21":{"path":[[0.099623,0.524851],[0.59553,0.475811],[0.696332,0.525675],[0.66469,0.656258],[0.748002,0.685585],[0.635125,0.756563],[0.376211,0.531226],[0.909836,0.487059],[0.090164,0.243437]],"directions":[[-0.024551,0.999699],[-0.030124,0.999546],[-0.047744,0.99886],[-0.06349,0.997982],[-0.093757,0.995595],[-0.146829,0.989162],[-0.209904,0.977722],[-0.308396,0.951258],[-0.393312,0.919405]],"ate":12.04,"rotation":13.743}}}};

function loadIndependent3DPoseData(sample) {
  const token = ++independent3DPoseToken;
  independent3DPoseData = null;
  try {
    const data = independent3DEmbeddedPoses[sample.poseData];
    if (!data) throw new Error("Camera trajectory data unavailable");
    if (token !== independent3DPoseToken) return;
    independent3DPoseData = data;
    startIndependent3DPoseAnimation();
  } catch (error) {
    console.warn("independent 3D pose data unavailable", sample.poseData, error);
  }
}

function buildIndependent3D() {
  const grid = document.querySelector("#independent3d-grid");
  if (!grid) return;
  grid.replaceChildren(...independent3DMethods.map(({ key, label, detail, highlight }) => {
    const article = document.createElement("article");
    article.className = "independent3d-card" + (highlight ? " independent3d-card-ours" : "");
    article.innerHTML =
      '<header><div><b>' + label + '</b><small>' + detail + '</small></div>' +
      (highlight ? '<span>Ours</span>' : '') + '</header>' +
      '<section class="independent3d-output independent3d-video-output">' +
        '<div class="independent3d-output-label"><b>Generated Video</b><small>9 views · pose-synchronized</small></div>' +
        '<div class="independent3d-video-frame"><video id="' + independent3DVideoId(key) + '" autoplay muted loop playsinline preload="metadata"></video></div>' +
      '</section>' +
      '<section class="independent3d-output independent3d-pose-output">' +
        '<div class="independent3d-output-label"><b>Pose</b><small>residuals ×8 · metrics true-scale</small></div>' +
        '<div class="independent3d-pose-frame"><canvas data-independent3d-pose="' + key + '" aria-label="' + label + ' synchronized recovered camera pose"></canvas></div>' +
      '</section>' ;
    return article;
  }));

  independent3DVideos().forEach((video) => {
    ["loadedmetadata", "loadeddata", "seeked", "timeupdate", "pause"].forEach((eventName) => {
      video.addEventListener(eventName, drawIndependent3DPoses);
    });
    video.addEventListener("play", startIndependent3DPoseAnimation);
  });
}

function loadIndependent3DVideos(sample) {
  independent3DMethods.forEach(({ key }) => {
    const video = document.querySelector("#" + independent3DVideoId(key));
    setCompareSource(video, sample.videos[key]);
    video.currentTime = 0;
    const play = video.play();
    if (play) play.catch(() => {});
  });
}

function selectIndependent3D(index) {
  currentIndependent3D = index;
  const sample = independent3DSamples[index];
  if (!sample) return;
  setActive(document.querySelector("#independent3d-tabs"), sample.key);
  document.querySelector("#independent3d-title").textContent = sample.title;
  document.querySelector("#independent3d-caption").textContent = sample.caption;
  const reference = document.querySelector("#independent3d-reference");
  reference.src = sample.reference;
  reference.alt = sample.title + " reference image";
  loadIndependent3DVideos(sample);
  loadIndependent3DPoseData(sample);
}

function initIndependent3D() {
  const tabs = document.querySelector("#independent3d-tabs");
  if (!tabs || !independent3DSamples.length) return;
  buildIndependent3D();
  independent3DSamples.forEach((sample, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.role = "tab";
    button.dataset.key = sample.key;
    button.innerHTML = '<img src="' + sample.reference + '" alt="" loading="lazy" decoding="async" /><span><b>' +
      String(index + 1).padStart(2, "0") + " · " + sample.tab + "</b></span>";
    button.addEventListener("click", () => selectIndependent3D(index));
    tabs.appendChild(button);
  });
  selectIndependent3D(0);
}

function initPageChrome() {
  document.documentElement.classList.add("reveal-ready");
  const header = document.querySelector(".site-header");
  const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 14);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px" });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

}

function initVideoFallback() {
  const video = document.querySelector("#i2v-video");
  const status = document.querySelector("#i2v-video-status");
  const directLink = document.querySelector("#i2v-video-open");
  if (!video || !status || !directLink) return;
  video.addEventListener("loadeddata", () => { status.hidden = true; });
  video.addEventListener("error", () => { status.hidden = false; });
  video.addEventListener("loadstart", () => {
    status.hidden = true;
    directLink.href = video.currentSrc || video.src;
  });
}

initVideoFallback();
outdoorGallery.initVideoFallback();
initI2V();
outdoorGallery.init();
  initCompare();
  initCloud();

initT2I();
initPageChrome();

function initTeaser() {
  const buttons = document.querySelector('#teaser-scenes');
  const left = document.querySelector('#teaser-rgb');
  const caption = left.previousElementSibling;
  const label = document.createElement('span'); label.textContent='RGB video';
  caption.replaceChildren(label);
  const toggle = document.createElement('div'); toggle.className='segmented';
  toggle.id='teaser-media-toggle'; toggle.setAttribute('aria-label','Video representation');
  toggle.innerHTML='<button data-mode="rgb">RGB</button><button data-mode="depth">Depth</button><button data-mode="pose">Pose</button>';
  caption.append(toggle);
  const player = window.createSequencePlayer({left, right:document.querySelector('#teaser-progressive'),
    host:document.querySelector('.teaser-pair'), controls:document.querySelector('.teaser-playback'), label});
  let current=0, mode='rgb';
  function select(index) {
    current=index; const sample=teaserSamples[index];
    if (!sample[mode]) mode='rgb';
    updateMediaToggle(toggle,sample,mode); player.select(sample,mode);
    document.querySelector('#teaser-title').textContent=`${String(index+1).padStart(2,'0')} · ${sample.label}`;
    [...buttons.children].forEach((button,i)=>{button.classList.toggle('active',i===index);button.setAttribute('aria-pressed',String(i===index));});
  }
  toggle.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{mode=button.dataset.mode;select(current);}));
  teaserSamples.forEach((sample,index)=>{
    const button=document.createElement('button');button.type='button';
    button.innerHTML=`<img src="${sample.rgbPoster}" alt="" loading="lazy" decoding="async"><span>${String(index+1).padStart(2,'0')} · ${sample.label}</span>`;
    button.addEventListener('click',()=>select(index));buttons.append(button);
  });
  select(0);
}
initTeaser();

return {  };
})();
})();

// Limit concurrent playback and provide a visible recovery path in embedded browsers.
(() => {
  const visible = new WeakSet();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(({target: video, isIntersecting}) => {
      if (isIntersecting) {
        visible.add(video);
        video.play().catch(() => {});
      } else {
        visible.delete(video);
        video.pause();
      }
    });
  }, {threshold: 0.05});
  document.querySelectorAll('video:not([data-hero-output]):not([data-teaser-output]):not([data-sequence-output]):not([data-summary-output])').forEach(video => {
    observer.observe(video);
    video.addEventListener('play', () => { if (!visible.has(video)) video.pause(); });
  });
  document.querySelectorAll('#compare-grid video').forEach(video => {
    const frame = video.parentElement;
    const fallback = document.createElement('img');
    fallback.className = 'compare-playback-poster';
    fallback.alt = 'Video preview';
    const retry = document.createElement('button');
    retry.className = 'compare-playback-retry';
    retry.type = 'button';
    retry.textContent = 'Play video ↻';
    retry.hidden = true;
    fallback.hidden = true;
    frame.append(fallback, retry);
    const recover = () => {
      fallback.src = video.poster;
      fallback.hidden = false;
      retry.hidden = false;
    };
    video.addEventListener('error', recover);
    video.addEventListener('pause', () => { if (visible.has(video)) recover(); });
    video.addEventListener('playing', () => { fallback.hidden = true; retry.hidden = true; });
    video.addEventListener('loadstart', () => { fallback.hidden = true; retry.hidden = true; });
    retry.addEventListener('click', () => {
      if (video.error) video.load();
      video.play().catch(recover);
    });
  });
})();

(() => {
  const host = document.querySelector('#t2i-viewer');
  let viewer = null;
  let current = document.querySelector('#t2i-tabs button.active')?.dataset.key;
  const load = () => {
    if (!viewer || !current) return;
    document.querySelector('#t2i-ply-download').hidden = true;
    viewer.load('assets/t2i/pointclouds/' + current + '.ply');
  };
  document.addEventListener('image-scene-selected', event => { current = event.detail; load(); });
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting) || viewer) return;
    try {
      viewer = new window.GAEImagePointCloudViewer(host, {dark: false});
      load();
      observer.disconnect();
    } catch (error) {
      host.querySelector('.viewer-loading b').textContent = '3D requires WebGL in your browser';
      console.warn('Image point-cloud viewer unavailable', error);
    }
  }, {rootMargin: '150px'});
  observer.observe(host);
  const controls = document.querySelector('#t2i-viewer-controls');
  controls.querySelector('[data-image-action="reset"]').addEventListener('click', () => viewer?.reset());
  controls.querySelector('[data-image-action="rotate"]').addEventListener('click', event => {
    if (viewer) event.currentTarget.setAttribute('aria-pressed', String(viewer.toggleRotate()));
  });
  controls.querySelector('input').addEventListener('input', event => viewer?.setPointSize(event.target.value));
  controls.querySelector('[data-image-action="fullscreen"]').addEventListener('click', () => host.requestFullscreen?.());
})();
