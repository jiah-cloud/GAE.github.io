#!/usr/bin/env python3
"""Export the 24 GAE project-page reference-camera cases without rerunning inference."""

from __future__ import annotations

import argparse
import csv
import json
import math
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import numpy as np

VIEWS = 81
EVAL_IMAGE_SIZE = (378, 672)
IVSWEEP_ROOT = Path(
    "/threed-code/jiahaolu/GLD/results/lm-eval-sep/d64/step0013000"
)
DATA_ROOT = Path("/threed-code/public_datasets/Geometry_diffusion_data")
LINGBO_ROOT = Path(
    "/threed-code/minghaoyin/GLD/results/large-motion-v1-page-eval/0002000"
)


@dataclass(frozen=True)
class CaseSpec:
    key: str
    title: str
    dataset: str
    eval_index: int | None
    pose_path: Path | None
    geom_path: Path | None
    metrics_path: Path
    source_scene: Path | None
    pose_meta_name: str | None
    frame_start: int
    frame_interval: int
    reference_type: str
    evidence_path: Path
    result_status: str
    synthetic_trajectory: bool = False


def _direct(
    key: str,
    title: str,
    dataset: str,
    eval_index: int,
    scene: str,
    frame_start: int,
    frame_interval: int,
    pose_meta_name: str,
    reference_type: str,
    log_name: str,
) -> CaseSpec:
    result_dir = IVSWEEP_ROOT / dataset
    source_root = {
        "worldlabs_packed": DATA_ROOT / "worldlabs_atlas_packed",
        "iv3/omniworld_game_packed": DATA_ROOT / "omniworld_game_packed/train",
        "iv3/scannetpp_preprocessed": DATA_ROOT / "scannetpp_preprocessed",
        "mvssynth_packed": DATA_ROOT / "mvssynth_packed",
    }[dataset]
    source_scene = source_root / Path(*scene.split("/"))
    return CaseSpec(
        key=key,
        title=title,
        dataset=dataset,
        eval_index=eval_index,
        pose_path=result_dir / "scannetpp" / f"{eval_index:03d}_poses.npz",
        geom_path=None,
        metrics_path=result_dir / "metrics.json",
        source_scene=source_scene,
        pose_meta_name=pose_meta_name,
        frame_start=frame_start,
        frame_interval=frame_interval,
        reference_type=reference_type,
        evidence_path=IVSWEEP_ROOT / log_name,
        result_status="直接找到",
    )


CASES = [
    _direct(
        "worldlabs-001",
        "Knitted harbor",
        "worldlabs_packed",
        1,
        "highlight__octopus_close_up",
        32,
        1,
        "meta_da3_metric.json",
        "DA3 metric estimated input/reference trajectory",
        "gpu3_worldlabs_packed_fixed.log",
    ),
    _direct(
        "worldlabs-005",
        "Toy room",
        "worldlabs_packed",
        5,
        "highlight__clay_shops_v2",
        19,
        1,
        "meta_da3_metric.json",
        "DA3 metric estimated input/reference trajectory",
        "gpu3_worldlabs_packed_fixed.log",
    ),
    _direct(
        "worldlabs-034",
        "Indoor pool",
        "worldlabs_packed",
        34,
        "long__birdman-1-minute__path-1__chunk_005",
        84,
        1,
        "meta_da3_metric.json",
        "DA3 metric estimated input/reference trajectory",
        "gpu3_worldlabs_packed_fixed.log",
    ),
    _direct(
        "worldlabs-057",
        "Village square",
        "worldlabs_packed",
        57,
        "long__medieval-village-dense__path-1__chunk_001",
        30,
        1,
        "meta_da3_metric.json",
        "DA3 metric estimated input/reference trajectory",
        "gpu3_worldlabs_packed_fixed.log",
    ),
    _direct(
        "worldlabs-064",
        "Ancient forest",
        "worldlabs_packed",
        64,
        "long__medieval-village-dense__path-1__chunk_000",
        63,
        1,
        "meta_da3_metric.json",
        "DA3 metric estimated input/reference trajectory",
        "gpu3_worldlabs_packed_fixed.log",
    ),
    _direct(
        "world-054",
        "Desert drive",
        "iv3/omniworld_game_packed",
        54,
        "6d8a47afa1ea_split10",
        0,
        3,
        "meta.json",
        "dataset-provided metric input/reference trajectory",
        "gpu2_omniworld_game_packed_sweep.log",
    ),
    _direct(
        "world-061",
        "Hillside drive",
        "iv3/omniworld_game_packed",
        61,
        "6d8a47afa1ea_split11",
        0,
        3,
        "meta.json",
        "dataset-provided metric input/reference trajectory",
        "gpu2_omniworld_game_packed_sweep.log",
    ),
    _direct(
        "world-089",
        "Village street",
        "iv3/omniworld_game_packed",
        89,
        "6d8a47afa1ea_split38",
        0,
        3,
        "meta.json",
        "dataset-provided metric input/reference trajectory",
        "gpu2_omniworld_game_packed_sweep.log",
    ),
    _direct(
        "omniworld-099",
        "Hillside rider",
        "iv3/omniworld_game_packed",
        99,
        "1b5d3c81b0d9_split15",
        0,
        3,
        "meta.json",
        "dataset-provided metric input/reference trajectory",
        "gpu2_omniworld_game_packed_sweep.log",
    ),
    _direct(
        "world-114",
        "Forest rider",
        "iv3/omniworld_game_packed",
        114,
        "397eb1cb3960_split46",
        0,
        3,
        "meta.json",
        "dataset-provided metric input/reference trajectory",
        "gpu2_omniworld_game_packed_sweep.log",
    ),
    _direct(
        "world-120",
        "Night walk",
        "iv3/omniworld_game_packed",
        120,
        "3d0aef206fd1_split17",
        0,
        3,
        "meta.json",
        "dataset-provided metric input/reference trajectory",
        "gpu2_omniworld_game_packed_sweep.log",
    ),
    _direct(
        "world-125",
        "Town square",
        "iv3/omniworld_game_packed",
        125,
        "6d8a47afa1ea_split20",
        0,
        3,
        "meta.json",
        "dataset-provided metric input/reference trajectory",
        "gpu2_omniworld_game_packed_sweep.log",
    ),
    _direct(
        "indoor-000",
        "Blue sofa",
        "iv3/scannetpp_preprocessed",
        0,
        "154c3e10d9/clip_009",
        0,
        3,
        "meta_da3_metric.json",
        "DA3 metric estimated input/reference trajectory",
        "gpu0_scannetpp_preprocessed_sweep.log",
    ),
    _direct(
        "indoor-001",
        "Cozy bedroom",
        "iv3/scannetpp_preprocessed",
        1,
        "0a76e06478/clip_016",
        0,
        3,
        "meta_da3_metric.json",
        "DA3 metric estimated input/reference trajectory",
        "gpu0_scannetpp_preprocessed_sweep.log",
    ),
    _direct(
        "indoor-003",
        "Glass doorway",
        "iv3/scannetpp_preprocessed",
        3,
        "154c3e10d9/clip_027",
        0,
        3,
        "meta_da3_metric.json",
        "DA3 metric estimated input/reference trajectory",
        "gpu0_scannetpp_preprocessed_sweep.log",
    ),
    _direct(
        "indoor-006",
        "Workshop corner",
        "iv3/scannetpp_preprocessed",
        6,
        "0e75f3c4d9/clip_025",
        0,
        3,
        "meta_da3_metric.json",
        "DA3 metric estimated input/reference trajectory",
        "gpu0_scannetpp_preprocessed_sweep.log",
    ),
    _direct(
        "indoor-014",
        "Sunlit wall",
        "iv3/scannetpp_preprocessed",
        14,
        "0d2ee665be/clip_021",
        0,
        3,
        "meta_da3_metric.json",
        "DA3 metric estimated input/reference trajectory",
        "gpu0_scannetpp_preprocessed_sweep.log",
    ),
    _direct(
        "indoor-018",
        "Office chair",
        "iv3/scannetpp_preprocessed",
        18,
        "104acbf7d2/clip_027",
        0,
        3,
        "meta_da3_metric.json",
        "DA3 metric estimated input/reference trajectory",
        "gpu0_scannetpp_preprocessed_sweep.log",
    ),
    _direct(
        "outdoor-019",
        "City storefront",
        "mvssynth_packed",
        19,
        "0076",
        13,
        1,
        "meta_da3_metric.json",
        "DA3 metric estimated input/reference trajectory",
        "gpu6_mvssynth_packed_fixed.log",
    ),
    _direct(
        "outdoor-033",
        "Urban avenue",
        "mvssynth_packed",
        33,
        "0050",
        18,
        1,
        "meta_da3_metric.json",
        "DA3 metric estimated input/reference trajectory",
        "gpu6_mvssynth_packed_fixed.log",
    ),
    _direct(
        "outdoor-035",
        "Church steps",
        "mvssynth_packed",
        35,
        "0093",
        12,
        1,
        "meta_da3_metric.json",
        "DA3 metric estimated input/reference trajectory",
        "gpu6_mvssynth_packed_fixed.log",
    ),
    _direct(
        "outdoor-037",
        "Palm-lined street",
        "mvssynth_packed",
        37,
        "0052",
        11,
        1,
        "meta_da3_metric.json",
        "DA3 metric estimated input/reference trajectory",
        "gpu6_mvssynth_packed_fixed.log",
    ),
    CaseSpec(
        key="lm-lingbo-world2",
        title="Village gate",
        dataset="large-motion-v1-page-eval",
        eval_index=0,
        pose_path=LINGBO_ROOT
        / "20260904_224943/eval/shard_2/case_000/scannetpp/000_poses.npz",
        geom_path=LINGBO_ROOT
        / "20260904_224943/eval/shard_2/case_000/scannetpp/000_geom.npz",
        metrics_path=LINGBO_ROOT / "20260904_224943/eval/shard_2/case_000/metrics.json",
        source_scene=DATA_ROOT
        / "large_motion_v1_packed/lingbot_mp4__lingbo_world2/chunk_000",
        pose_meta_name="meta_da3_metric.json",
        frame_start=0,
        frame_interval=1,
        reference_type="DA3 metric estimated input/reference trajectory",
        evidence_path=Path(
            "/threed-code/minghaoyin/GLD/_ICLR2027__native__geometry_diffusion/"
            "project-page-direct-galleries-20260920/render-manifest.json"
        ),
        result_status="从原始数据恢复导出",
    ),
    CaseSpec(
        key="lm-lingbo-forward",
        title="Temple approach",
        dataset="large-motion-v1-page-eval",
        eval_index=0,
        pose_path=LINGBO_ROOT
        / "lingbo_designed3_20260905_1812/eval/shard_0/case_000/scannetpp/000_poses.npz",
        geom_path=LINGBO_ROOT
        / "lingbo_designed3_20260905_1812/eval/shard_0/case_000/scannetpp/000_geom.npz",
        metrics_path=LINGBO_ROOT
        / "lingbo_designed3_20260905_1812/eval/shard_0/case_000/metrics.json",
        source_scene=None,
        pose_meta_name=None,
        frame_start=0,
        frame_interval=1,
        reference_type="designed synthetic input/reference trajectory",
        evidence_path=Path(
            "/threed-code/minghaoyin/GLD/configs/training/"
            "lingbo_world_designed_trajectories.json"
        ),
        result_status="从原始数据恢复导出",
        synthetic_trajectory=True,
    ),
]


def _load_json(path: Path) -> dict[str, Any]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, dict):
        raise TypeError(f"expected JSON object: {path}")
    return payload


def _validate_c2w(c2w: np.ndarray, name: str) -> dict[str, float]:
    if c2w.shape != (VIEWS, 4, 4):
        raise ValueError(f"{name}: expected {(VIEWS, 4, 4)}, got {c2w.shape}")
    if not np.isfinite(c2w).all():
        raise ValueError(f"{name}: contains NaN/Inf")
    last_row_error = float(np.max(np.abs(c2w[:, 3] - [0.0, 0.0, 0.0, 1.0])))
    rotations = c2w[:, :3, :3]
    identity = np.eye(3, dtype=np.float64)
    orthogonality_error = float(
        np.max(np.abs(np.swapaxes(rotations, 1, 2) @ rotations - identity))
    )
    determinant_error = float(np.max(np.abs(np.linalg.det(rotations) - 1.0)))
    if last_row_error > 1e-6:
        raise ValueError(f"{name}: bad homogeneous row, error={last_row_error}")
    if orthogonality_error > 1e-3 or determinant_error > 1e-3:
        raise ValueError(
            f"{name}: invalid rotations, orth={orthogonality_error}, det={determinant_error}"
        )
    return {
        "max_homogeneous_last_row_error": last_row_error,
        "max_rotation_orthogonality_error": orthogonality_error,
        "max_rotation_determinant_error": determinant_error,
    }


def _validate_k(k: np.ndarray, name: str) -> None:
    if k.shape != (VIEWS, 3, 3):
        raise ValueError(f"{name}: expected {(VIEWS, 3, 3)}, got {k.shape}")
    if not np.isfinite(k).all():
        raise ValueError(f"{name}: contains NaN/Inf")


def _source_frame_records(
    case: CaseSpec,
) -> tuple[list[dict[str, Any]], dict[str, Any] | None, float | None]:
    if case.synthetic_trajectory:
        return (
            [
                {
                    "eval_index": index,
                    "source_frame_index": None,
                    "source_frame_name": f"designed_view_{index:06d}",
                    "timestamp_seconds": None,
                    "synthetic_view_index": index,
                }
                for index in range(VIEWS)
            ],
            None,
            None,
        )
    if case.source_scene is None or case.pose_meta_name is None:
        raise ValueError(f"{case.key}: missing source metadata")
    pose_meta_path = case.source_scene / case.pose_meta_name
    pose_meta = _load_json(pose_meta_path)
    plain_meta_path = case.source_scene / "meta.json"
    plain_meta = _load_json(plain_meta_path) if plain_meta_path.is_file() else {}
    fps_raw = pose_meta.get("fps", plain_meta.get("fps"))
    fps = float(fps_raw) if fps_raw is not None else None
    frames = pose_meta.get("frames")
    if not isinstance(frames, list):
        raise TypeError(f"{pose_meta_path}: frames is not a list")
    indices = [case.frame_start + i * case.frame_interval for i in range(VIEWS)]
    records: list[dict[str, Any]] = []
    for eval_index, source_index in enumerate(indices):
        frame = frames[source_index]
        record = {
            "eval_index": eval_index,
            "source_frame_index": source_index,
            "source_frame_name": frame.get("name"),
            "timestamp_seconds": source_index / fps if fps else None,
        }
        for field in ("frame_idx", "global_frame_idx", "original_idx"):
            if field in frame:
                record[field] = frame[field]
        records.append(record)
    return records, pose_meta, fps


def _write_depth_video(depth: np.ndarray, output: Path, fps: int = 12) -> dict[str, float]:
    if depth.shape != (VIEWS, *EVAL_IMAGE_SIZE):
        raise ValueError(f"depth shape mismatch: {depth.shape}")
    finite = depth[np.isfinite(depth) & (depth > 0)]
    if finite.size == 0:
        raise ValueError("depth has no finite positive values")
    low, high = np.percentile(finite, [2.0, 98.0])
    if not math.isfinite(float(low)) or not math.isfinite(float(high)) or high <= low:
        raise ValueError(f"invalid depth range: {low}, {high}")
    height, width = EVAL_IMAGE_SIZE
    command = [
        "ffmpeg",
        "-y",
        "-loglevel",
        "error",
        "-f",
        "rawvideo",
        "-pix_fmt",
        "rgb24",
        "-s",
        f"{width}x{height}",
        "-r",
        str(fps),
        "-i",
        "-",
        "-an",
        "-c:v",
        "libx264",
        "-crf",
        "18",
        "-pix_fmt",
        "yuv420p",
        str(output),
    ]
    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    assert process.stdin is not None
    try:
        for frame in depth:
            clipped = np.clip((frame - low) / (high - low), 0.0, 1.0)
            gray = np.asarray((1.0 - clipped) * 255.0, dtype=np.uint8)
            invalid = ~np.isfinite(frame) | (frame <= 0)
            gray[invalid] = 0
            process.stdin.write(np.repeat(gray[:, :, None], 3, axis=2).tobytes())
    finally:
        process.stdin.close()
    return_code = process.wait()
    if return_code != 0:
        raise RuntimeError(f"ffmpeg failed with exit code {return_code}")
    return {
        "visualization_percentile_low": float(low),
        "visualization_percentile_high": float(high),
        "fps": fps,
    }


def _load_direct(case: CaseSpec) -> tuple[np.ndarray, np.ndarray, dict[str, Any]]:
    assert case.pose_path is not None
    with np.load(case.pose_path, allow_pickle=False) as archive:
        input_c2w = np.asarray(archive["input_c2w"], dtype=np.float64)
        input_k = np.asarray(archive["input_K"], dtype=np.float64)
        details = {
            "cond_num": int(archive["cond_num"]),
            "image_size": np.asarray(archive["image_size"], dtype=np.int64).tolist(),
        }
    return input_c2w, input_k, details


def _load_lingbo(
    case: CaseSpec,
) -> tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray, np.ndarray, dict[str, Any]]:
    assert case.pose_path is not None
    assert case.geom_path is not None
    with np.load(case.pose_path, allow_pickle=False) as archive:
        input_c2w = np.asarray(archive["input_c2w"], dtype=np.float64)
        input_k = np.asarray(archive["input_K"], dtype=np.float64)
        pred_c2w = np.asarray(archive["pred_c2w"], dtype=np.float64)
        pred_k = np.asarray(archive["pred_K"], dtype=np.float64)
        image_size = np.asarray(archive["image_size"], dtype=np.int64)
        cond_num = int(archive["cond_num"])
    with np.load(case.geom_path, allow_pickle=False) as archive:
        depth = np.asarray(archive["gen_depth"], dtype=np.float32)
        if not np.array_equal(input_c2w, archive["gt_c2w"]):
            raise ValueError(f"{case.key}: poses input_c2w != geom gt_c2w")
        if not np.array_equal(input_k, archive["gt_K"]):
            raise ValueError(f"{case.key}: poses input_K != geom gt_K")
    details = {"cond_num": cond_num, "image_size": image_size.tolist()}
    return (
        input_c2w,
        input_k,
        np.asarray(pred_c2w, dtype=np.float64),
        np.asarray(pred_k, dtype=np.float64),
        depth,
        details,
    )


def _export_case(
    case: CaseSpec,
    output_root: Path,
) -> dict[str, Any]:
    case_dir = output_root / case.key
    case_dir.mkdir(parents=True, exist_ok=True)
    pred_c2w = pred_k = depth = None
    if case.geom_path is None:
        input_c2w, input_k, details = _load_direct(case)
    else:
        input_c2w, input_k, pred_c2w, pred_k, depth, details = _load_lingbo(case)

    input_validation = _validate_c2w(input_c2w, f"{case.key}/input_c2w")
    _validate_k(input_k, f"{case.key}/input_K")
    np.save(case_dir / "input_c2w.npy", input_c2w)
    np.save(case_dir / "input_K.npy", input_k)

    frame_records, pose_meta, fps = _source_frame_records(case)
    (case_dir / "frame_ids.json").write_text(
        json.dumps({"frames": frame_records}, indent=2) + "\n", encoding="utf-8"
    )

    source_match_error = None
    if pose_meta is not None:
        source_c2w = np.asarray(
            [
                pose_meta["frames"][record["source_frame_index"]]["c2w"]
                for record in frame_records
            ],
            dtype=np.float64,
        )
        source_match_error = float(np.max(np.abs(source_c2w - input_c2w)))
        if source_match_error > 1e-9:
            raise ValueError(f"{case.key}: eval input does not match source c2w")

    depth_info = None
    pred_validation = None
    if pred_c2w is not None and pred_k is not None and depth is not None:
        pred_validation = _validate_c2w(pred_c2w, f"{case.key}/pred_c2w")
        _validate_k(pred_k, f"{case.key}/pred_K")
        np.save(case_dir / "pred_c2w.npy", pred_c2w)
        np.save(case_dir / "pred_K.npy", pred_k)
        depth_info = _write_depth_video(depth, case_dir / "depth.mp4")

    metrics = _load_json(case.metrics_path)
    pose_meta_path = (
        str(case.source_scene / case.pose_meta_name)
        if case.source_scene is not None and case.pose_meta_name is not None
        else None
    )
    source_size = None
    pose_convention = "opencv_c2w"
    source_is_metric = None
    if pose_meta is not None:
        width = pose_meta.get("width")
        height = pose_meta.get("height")
        source_size = [height, width] if height is not None and width is not None else None
        pose_convention = str(pose_meta.get("pose_convention", "opencv_c2w"))
        source_is_metric = pose_meta.get("is_metric")

    metadata = {
        "case_key": case.key,
        "title": case.title,
        "status": case.result_status,
        "dataset": case.dataset,
        "eval_index": case.eval_index,
        "source_pose_archive": str(case.pose_path) if case.pose_path else None,
        "source_geometry_archive": str(case.geom_path) if case.geom_path else None,
        "source_scene": str(case.source_scene) if case.source_scene else None,
        "source_pose_metadata": pose_meta_path,
        "evidence_path": str(case.evidence_path),
        "metrics_path": str(case.metrics_path),
        "checkpoint": metrics.get("ckpt"),
        "config": metrics.get("config"),
        "reference_trajectory_type": case.reference_type,
        "reference_is_ground_truth": False,
        "coordinate_representation": "camera-to-world homogeneous 4x4 matrices",
        "coordinate_convention": pose_convention,
        "scale_and_units": (
            "metric-scale source trajectory; translation unit documented as metric by source"
            if source_is_metric is True or case.synthetic_trajectory
            else "source scale retained without rescaling"
        ),
        "exported_pose_transform": (
            "none; input_c2w is byte-equivalent numerically to the 81 selected source c2w "
            "matrices"
            if source_match_error is not None
            else "none; copied from eval geom gt_c2w in evaluated view order"
        ),
        "display_alignment": "none",
        "model_pose_normalization": (
            "not baked into input_c2w; this export preserves the raw eval input/reference "
            "trajectory"
        ),
        "input_K_image_size_hw": details["image_size"],
        "source_camera_image_size_hw": source_size,
        "frame_count": VIEWS,
        "frame_start": case.frame_start,
        "frame_interval": case.frame_interval,
        "source_fps": fps,
        "conditioning": {
            "cond_num": details["cond_num"],
            "conditioning_eval_indices": list(range(details["cond_num"])),
            "conditioning_frame_included": True,
        },
        "correspondence_evidence": (
            "eval *_poses.npz contains input_c2w/input_K and matches selected source metadata "
            f"exactly (max abs c2w error {source_match_error})"
            if source_match_error is not None
            else (
                "eval 000_poses.npz directly contains input/pred c2w and K; "
                "000_geom.npz gt_c2w/gt_K matches input exactly"
            )
        ),
        "validation": {
            "input": input_validation,
            "predicted": pred_validation,
        },
        "depth_video": depth_info,
        "synthetic_trajectory": case.synthetic_trajectory,
        "designed_trajectory": (
            {
                "spec": str(case.evidence_path),
                "base_scene": str(
                    DATA_ROOT / "large_motion_v1_packed/lingbot_mp4__lingbo_world/chunk_000"
                ),
                "type": "forward",
                "distance": 16.0,
                "rise": 0.8,
                "progress_parameterization": "smoothstep(index / 80)",
                "anchor": "first c2w and K from the base scene pose metadata",
            }
            if case.synthetic_trajectory
            else None
        ),
    }
    (case_dir / "metadata.json").write_text(
        json.dumps(metadata, indent=2) + "\n", encoding="utf-8"
    )
    return metadata


def _write_manifest(output_root: Path, rows: list[dict[str, Any]]) -> None:
    fields = [
        "case_key",
        "title",
        "status",
        "dataset",
        "source_pose_archive",
        "source_geometry_archive",
        "source_scene",
        "frame_count",
        "output_path",
        "unresolved_reason",
    ]
    with (output_root / "manifest.csv").open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        for row in rows:
            writer.writerow(
                {
                    field: row.get(field, "")
                    for field in fields
                }
            )


def _write_readme(output_root: Path, rows: list[dict[str, Any]]) -> None:
    status_counts: dict[str, int] = {}
    for row in rows:
        status = str(row["status"])
        status_counts[status] = status_counts.get(status, 0) + 1
    lines = [
        "# GAE reference camera supplement",
        "",
        "This package contains the exact 81-view input/reference camera sequences used by",
        "the listed project-page evaluations. No video generation, model inference, or",
        "training was rerun. `input_c2w.npy` is always OpenCV camera-to-world and includes",
        "the conditioning frame at index 0.",
        "",
        "Important: `input` means the camera trajectory supplied to generation. DA3-derived",
        "references are estimates, not physical ground truth. No independent trajectory",
        "rescaling or display alignment was applied.",
        "",
        "Files per case:",
        "- `input_c2w.npy`: `(81, 4, 4)`, raw evaluated reference c2w.",
        "- `input_K.npy`: `(81, 3, 3)`, intrinsics for `(H,W)=(378,672)` eval images.",
        "- `frame_ids.json`: selected source indices/names and timestamps where available.",
        "- `metadata.json`: provenance, convention, scale, conditioning, and validation.",
        "- Lingbo only: `pred_c2w.npy`, `pred_K.npy`, and `depth.mp4`.",
        "",
        "Status summary:",
    ]
    lines.extend(f"- {key}: {value}" for key, value in sorted(status_counts.items()))
    lines.extend(
        [
            "",
            "Reproduce with:",
            "```bash",
            "/local-ssd/uv-venv-gld-d64-stage1-2node/bin/python export_poses.py \\",
            "  --output-root /local-ssd/gae-reference-poses",
            "```",
            "",
            "The Lingbo depth videos visualize existing `gen_depth` arrays with a global",
            "2nd–98th percentile range and inverse grayscale; exact limits are in metadata.",
            "",
            "## Cases",
            "",
            "| key | title | status | frames |",
            "|---|---|---|---:|",
        ]
    )
    lines.extend(
        f"| {row['case_key']} | {row['title']} | {row['status']} | {row['frame_count']} |"
        for row in rows
    )
    (output_root / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output-root", type=Path, required=True)
    args = parser.parse_args()
    args.output_root.mkdir(parents=True, exist_ok=True)

    rows: list[dict[str, Any]] = []
    for case in CASES:
        metadata = _export_case(case, args.output_root)
        row = {
            **metadata,
            "output_path": case.key,
            "unresolved_reason": "",
        }
        rows.append(row)
        print(f"[ok] {case.key}: {metadata['status']} ({metadata['frame_count']} frames)")

    _write_manifest(args.output_root, rows)
    _write_readme(args.output_root, rows)
    print(f"[done] {len(rows)} cases -> {args.output_root}")


if __name__ == "__main__":
    main()
