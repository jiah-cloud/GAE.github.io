(() => {
  // output-quality-radar.js
  var SVG_NS = "http://www.w3.org/2000/svg";
  var AXES = [
    { lines: ["Smoothness", "(rho)"], group: "latent" },
    { lines: ["Reconstruction", "(PSNR)"], group: "latent" },
    { lines: ["Distance structure", "(LDS)"], group: "latent" },
    { lines: ["Spatial similarity", "(SRSS)"], group: "latent" },
    { lines: ["Correspondence", "(xLNC*)"], group: "latent" },
    { lines: ["Video realism", "(FVD)"], group: "generation" },
    { lines: ["Frame realism", "(FID)"], group: "generation" },
    { lines: ["Perceptual quality", "(LPIPS)"], group: "generation" },
    { lines: ["Fidelity", "(PSNR)"], group: "generation" },
    { lines: ["Structure", "(SSIM)"], group: "generation" },
    { lines: ["Trajectory", "(ATE)"], group: "consistency" },
    { lines: ["Translation", "(RPEt)"], group: "consistency" },
    { lines: ["Rotation", "(RPEr)"], group: "consistency" },
    { lines: ["Reprojection"], group: "consistency" },
    { lines: ["3D consistency", "(MEt3R)"], group: "consistency" }
  ];
  var GROUPS = {
    latent: { color: "#17836b", label: "Latent representation quality" },
    generation: { color: "#2f6fed", label: "DiT-generated RGB appearance quality" },
    consistency: { color: "#d06b24", label: "DiT-generated views 3D consistency" }
  };
  var SERIES = [
    { name: "Pixel VAE, single-image (SD-VAE)", color: "#111827", dash: "15 7", width: 2.1, values: [0.69752, 0.608544, 0.415214, 0.422425, 0.193146, 0.820901, 0.733597, 0.836232, 0.956129, 0.915913, 0.623868, 0.609682, 0.662358, 0.804126, 0.874674] },
    { name: "Pixel VAE, video (WAN2.1 VAE)", color: "#7c3aed", dash: "7 5", width: 2.1, values: [0.791896, 0.603923, 0.37084, 0.408083, 0.626168, 0.551457, 0.595826, 0.636388, 0.810087, 0.772353, 0.189656, 0.369888, 0.310073, 0.715027, 0.799811] },
    { name: "Semantic RAE (RAEV2, DINOv3-L)", color: "#00a6a6", dash: "15 5 3 5", width: 2.2, values: [0.853442, 0.739387, 0.270998, 0.286832, 0.91433, 0.613941, 0.850908, 0.794259, 0.884283, 0.803797, 0.441055, 0.457978, 0.54927, 0.691374, 0.914909] },
    { name: "Geometric VAE (DA3-Giant L0)", color: "#f08c00", width: 2.3, values: [0.690833, 0.996764, 0.161648, 0.160365, 1, 0.759072, 0.723613, 0.816721, 0.920626, 0.887081, 0.485824, 0.536561, 0.614615, 0.654497, 0.818381] },
    { name: "Geometric VAE (DA3-Giant L3)", color: "#8b4513", dash: "3 5", width: 2.1, values: [0.881498, 0.690705, 0.085578, 0.091265, 0.5919, 0.476207, 0.526782, 0.570822, 0.870635, 0.811332, 0.583471, 0.628273, 0.627707, 0.606135, 0.769057] },
    { name: "GLD (L0/L1 stage avg.)", color: "#16a34a", width: 2.6, marker: "diamond", values: [0.722431, 0.996764, 0.163233, 0.170795, 0.925234, 0.497835, 0.619035, 0.484638, 0.775433, 0.731364, 0.336699, 0.415678, 0.281344, 0.378211, 0.673764] },
    { name: "Ours (GAE-128 dim)", color: "#e6004c", width: 4.1, marker: "circle", ours: true, values: [0.931341, 1, 0.703645, 0.720991, 0.920561, 0.899206, 0.994724, 0.974726, 0.971068, 0.982118, 0.928247, 0.812375, 0.958688, 0.894109, 1] },
    { name: "Ours (GAE-64 dim)", color: "#2563eb", width: 4.5, marker: "circle", ours: true, primary: true, values: [1, 0.939971, 1, 1, 0.886293, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.993654] }
  ];
  function node(tag, attrs = {}) {
    const el = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, String(value)));
    return el;
  }
  function point(cx, cy, radius, angle) {
    return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
  }
  function pointsFor(values, cx, cy, radius, angles) {
    return values.map((value, i) => point(cx, cy, radius * value, angles[i]));
  }
  function polygonPath(points) {
    return `${points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ")} Z`;
  }
  function sectorPath(cx, cy, radius, start, end) {
    const [x1, y1] = point(cx, cy, radius, start);
    const [x2, y2] = point(cx, cy, radius, end);
    return `M${cx},${cy} L${x1},${y1} A${radius},${radius} 0 0 1 ${x2},${y2} Z`;
  }
  function legendSwatch(series) {
    const svg = node("svg", { viewBox: "0 0 74 18", "aria-hidden": "true" });
    const line = node("line", { x1: 3, y1: 9, x2: 71, y2: 9, stroke: series.color, "stroke-width": series.width, "stroke-linecap": "round" });
    if (series.dash) line.setAttribute("stroke-dasharray", series.dash);
    svg.append(line);
    if (series.marker) {
      const shape = series.marker === "diamond" ? node("rect", { x: 33, y: 5, width: 8, height: 8, fill: series.color, transform: "rotate(45 37 9)" }) : node("circle", { cx: 37, cy: 9, r: series.primary ? 4.2 : 3.8, fill: series.color, stroke: "white", "stroke-width": 1.2 });
      svg.append(shape);
    }
    return svg;
  }
  function renderOutputRadar() {
    const svg = document.querySelector("#output-quality-radar");
    const legend = document.querySelector("#output-quality-radar-legend");
    if (!svg || !legend) return;
    const width = 1200, height = 980, cx = 600, cy = 470, radius = 326, labelRadius = 414;
    const count = AXES.length;
    const angles = AXES.map((_, i) => -Math.PI / 2 + Math.PI * 2 * i / count);
    const sector = Math.PI * 2 / count;
    const desc = node("desc");
    desc.textContent = "Fifteen-axis best-relative comparison across eight latent families. Best value on each axis is on the outer ring.";
    svg.append(desc);
    AXES.forEach((axis, i) => {
      svg.append(node("path", {
        d: sectorPath(cx, cy, radius, angles[i] - sector / 2, angles[i] + sector / 2),
        fill: GROUPS[axis.group].color,
        "fill-opacity": 0.055,
        stroke: "none"
      }));
    });
    [0.25, 0.5, 0.75, 1].forEach((level) => {
      svg.append(node("circle", { cx, cy, r: radius * level, fill: "none", stroke: "#c8c8c8", "stroke-width": level === 1 ? 1.5 : 1, "stroke-opacity": 0.78 }));
    });
    [[0, 5, "latent"], [5, 10, "generation"], [10, 15, "consistency"]].forEach(([startIndex, endIndex, group]) => {
      const start = angles[startIndex] - sector / 2;
      const end = angles[endIndex - 1] + sector / 2;
      const r = radius + 16;
      const [x1, y1] = point(cx, cy, r, start);
      const [x2, y2] = point(cx, cy, r, end);
      svg.append(node("path", { d: `M${x1},${y1} A${r},${r} 0 0 1 ${x2},${y2}`, fill: "none", stroke: GROUPS[group].color, "stroke-width": 8, "stroke-linecap": "round", "stroke-opacity": 0.78 }));
    });
    AXES.forEach((axis, i) => {
      const [x, y] = point(cx, cy, radius, angles[i]);
      svg.append(node("line", { x1: cx, y1: cy, x2: x, y2: y, stroke: "#c8c8c8", "stroke-width": 1, "stroke-opacity": 0.65 }));
      const [lx, ly] = point(cx, cy, labelRadius, angles[i]);
      const cosine = Math.cos(angles[i]);
      const text = node("text", {
        x: lx,
        y: ly - (axis.lines.length - 1) * 9,
        fill: GROUPS[axis.group].color,
        "font-size": 17,
        "font-weight": 800,
        "paint-order": "stroke",
        stroke: "#ffffff",
        "stroke-width": 5,
        "stroke-opacity": 0.9,
        "text-anchor": cosine > 0.18 ? "start" : cosine < -0.18 ? "end" : "middle",
        "dominant-baseline": "middle",
        class: "output-radar-axis-label"
      });
      axis.lines.forEach((line, lineIndex) => {
        const tspan = node("tspan", { x: lx, dy: lineIndex ? 21 : 0 });
        tspan.textContent = line;
        text.append(tspan);
      });
      svg.append(text);
    });
    SERIES.forEach((series, seriesIndex) => {
      const group = node("g", { class: "output-radar-series", "data-output-series": String(seriesIndex) });
      const pts = pointsFor(series.values, cx, cy, radius, angles);
      const path = node("path", {
        d: polygonPath(pts),
        fill: series.color,
        "fill-opacity": series.primary ? 0.105 : series.ours ? 0.075 : 0.025,
        stroke: series.color,
        "stroke-width": series.width,
        "stroke-linejoin": "round",
        "stroke-linecap": "round"
      });
      if (series.dash) path.setAttribute("stroke-dasharray", series.dash);
      const title = node("title");
      title.textContent = series.name;
      path.append(title);
      group.append(path);
      if (series.marker) {
        pts.forEach(([x, y], axisIndex) => {
          const shape = series.marker === "diamond" ? node("rect", { x: x - 3.6, y: y - 3.6, width: 7.2, height: 7.2, fill: series.color, transform: `rotate(45 ${x} ${y})` }) : node("circle", { cx: x, cy: y, r: series.primary ? 5.2 : 4.7, fill: series.color, stroke: "white", "stroke-width": 1.4 });
          const tip = node("title");
          tip.textContent = `${series.name}: ${AXES[axisIndex].lines.join(" ")} = ${series.values[axisIndex].toFixed(3)}`;
          shape.append(tip);
          group.append(shape);
        });
      }
      svg.append(group);
    });
    let pinned = null;
    const applyHighlight = (selected) => {
      svg.querySelectorAll(".output-radar-series").forEach((item) => item.classList.toggle("is-dimmed", selected !== null && item.dataset.outputSeries !== String(selected)));
      legend.querySelectorAll("button").forEach((button) => {
        const active = selected !== null && button.dataset.outputSeries === String(selected);
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(pinned !== null && active));
      });
    };
    SERIES.forEach((series, i) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.outputSeries = String(i);
      button.setAttribute("aria-pressed", "false");
      if (series.ours) button.classList.add("ours");
      button.append(legendSwatch(series));
      const label = document.createElement("span");
      label.textContent = series.name;
      button.append(label);
      button.addEventListener("pointerenter", () => {
        if (pinned === null) applyHighlight(i);
      });
      button.addEventListener("pointerleave", () => {
        if (pinned === null) applyHighlight(null);
      });
      button.addEventListener("focus", () => {
        if (pinned === null) applyHighlight(i);
      });
      button.addEventListener("blur", () => {
        if (pinned === null) applyHighlight(null);
      });
      button.addEventListener("click", () => {
        pinned = pinned === i ? null : i;
        applyHighlight(pinned);
      });
      legend.append(button);
    });
  }
  renderOutputRadar();
})();
