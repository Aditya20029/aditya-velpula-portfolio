"use client";
import { useEffect, useRef, useState } from "react";
import { skills } from "@/data/skills";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* Build nodes/edges */
function buildGraph() {
  const nodes = [{ id: "center", label: "AV", type: "root", r: 22 }];
  const edges = [];
  const angleStep = (Math.PI * 2) / skills.categories.length;

  skills.categories.forEach((cat, i) => {
    const angle = i * angleStep;
    nodes.push({
      id: cat.id,
      label: cat.name,
      type: "category",
      color: cat.color,
      r: 14,
      baseAngle: angle,
    });
    edges.push({ source: "center", target: cat.id });

    const childAngleSpan = angleStep * 0.8;
    cat.skills.forEach((s, j) => {
      const childAngle =
        angle - childAngleSpan / 2 + (childAngleSpan * j) / (cat.skills.length - 1 || 1);
      nodes.push({
        id: `${cat.id}-${s.name}`,
        label: s.name,
        proficiency: s.proficiency,
        type: "skill",
        color: cat.color,
        parent: cat.id,
        r: 7,
        baseAngle: childAngle,
      });
      edges.push({ source: cat.id, target: `${cat.id}-${s.name}` });
    });
  });
  return { nodes, edges };
}

const COLOR_MAP = {
  "--accent-primary": "#3b82f6",
  "--accent-secondary": "#06b6d4",
  "--accent-tertiary": "#8b5cf6",
  "--accent-success": "#10b981",
  "--accent-warm": "#f59e0b",
};

export default function SkillsGraph() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let W = (canvas.width = wrapper.clientWidth * dpr);
    let H = (canvas.height = wrapper.clientHeight * dpr);
    canvas.style.width = `${wrapper.clientWidth}px`;
    canvas.style.height = `${wrapper.clientHeight}px`;
    ctx.scale(dpr, dpr);

    const { nodes, edges } = buildGraph();
    const cx = wrapper.clientWidth / 2;
    const cy = wrapper.clientHeight / 2;
    const categoryRadius = Math.min(wrapper.clientWidth, wrapper.clientHeight) * 0.22;
    const skillRadius = Math.min(wrapper.clientWidth, wrapper.clientHeight) * 0.4;

    // Initialise positions
    nodes.forEach((n) => {
      if (n.type === "root") {
        n.x = cx;
        n.y = cy;
      } else if (n.type === "category") {
        n.x = cx + Math.cos(n.baseAngle) * categoryRadius;
        n.y = cy + Math.sin(n.baseAngle) * categoryRadius;
      } else {
        n.x = cx + Math.cos(n.baseAngle) * skillRadius;
        n.y = cy + Math.sin(n.baseAngle) * skillRadius;
      }
      n.vx = 0;
      n.vy = 0;
      n.tx = n.x;
      n.ty = n.y;
    });

    let mouse = { x: -1000, y: -1000, hover: null };
    let dragging = null;
    let pulseTimer = 0;
    const pulses = []; // {edgeIndex, progress}

    const onResize = () => {
      W = canvas.width = wrapper.clientWidth * dpr;
      H = canvas.height = wrapper.clientHeight * dpr;
      canvas.style.width = `${wrapper.clientWidth}px`;
      canvas.style.height = `${wrapper.clientHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const getNodeAt = (x, y) => {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const d = Math.hypot(n.x - x, n.y - y);
        if (d < n.r + 6) return n;
      }
      return null;
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (dragging) {
        dragging.tx = mouse.x;
        dragging.ty = mouse.y;
      } else {
        const n = getNodeAt(mouse.x, mouse.y);
        mouse.hover = n;
        if (n && n.type !== "root") {
          const rect2 = wrapper.getBoundingClientRect();
          setTooltip({
            x: n.x + 16,
            y: n.y - 10,
            label: n.label,
            proficiency: n.proficiency,
          });
        } else {
          setTooltip(null);
        }
      }
    };
    const onDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const n = getNodeAt(x, y);
      if (n && n.type !== "root") dragging = n;
    };
    const onUp = () => (dragging = null);

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("resize", onResize);

    let rafId;
    let t0 = performance.now();

    const tick = (now) => {
      const dt = Math.min(32, now - t0);
      t0 = now;

      // Theme-aware text colors so labels stay readable when the user
      // toggles the light/dark switch.
      const light = document.documentElement.dataset.theme === "light";
      const categoryLabelColor = light ? "#0b1220" : "#ffffff";
      const skillLabelColor = light ? "#334155" : "#e2e8f0";
      const skillLabelDim = light
        ? "rgba(100,116,139,0.35)"
        : "rgba(148,163,184,0.3)";
      const centerTextColor = "#ffffff"; // always white (sits on blue disc)

      // Spring back toward target positions with drift
      pulseTimer += dt;
      if (pulseTimer > 2800 && !reduced) {
        pulseTimer = 0;
        const skillEdges = edges
          .map((e, i) => ({ e, i }))
          .filter(({ e }) => {
            const src = nodes.find((n) => n.id === e.source);
            return src?.type === "category";
          });
        const pick = skillEdges[Math.floor(Math.random() * skillEdges.length)];
        if (pick) pulses.push({ edgeIndex: pick.i, progress: 0, toCenter: true, parent: nodes.find((n) => n.id === edges[pick.i].source) });
      }

      nodes.forEach((n) => {
        if (n === dragging) return;
        if (n.type !== "root") {
          const drift = 0.4 * Math.sin(now * 0.001 + (n.baseAngle || 0));
          const tx = n.tx + Math.cos(now * 0.0004 + n.baseAngle) * drift;
          const ty = n.ty + Math.sin(now * 0.0004 + n.baseAngle) * drift;
          n.x += (tx - n.x) * 0.04;
          n.y += (ty - n.y) * 0.04;
        }
      });
      if (dragging) {
        dragging.x += (dragging.tx - dragging.x) * 0.3;
        dragging.y += (dragging.ty - dragging.y) * 0.3;
      }

      ctx.clearRect(0, 0, wrapper.clientWidth, wrapper.clientHeight);

      // Determine highlight set
      const highlightCat =
        mouse.hover?.type === "category"
          ? mouse.hover.id
          : mouse.hover?.type === "skill"
          ? mouse.hover.parent
          : null;

      // Edges
      edges.forEach((e) => {
        const a = nodes.find((n) => n.id === e.source);
        const b = nodes.find((n) => n.id === e.target);
        if (!a || !b) return;
        const catId = a.type === "category" ? a.id : b.type === "category" ? b.id : null;
        const dim = highlightCat && catId !== highlightCat && e.source !== "center";
        const baseColor = b.color ? COLOR_MAP[b.color] || "#3b82f6" : "#3b82f6";
        ctx.strokeStyle = `${baseColor}${dim ? "22" : highlightCat && catId === highlightCat ? "aa" : "44"}`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      // Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += dt / 1200;
        const e = edges[p.edgeIndex];
        const a = nodes.find((n) => n.id === e.source);
        const b = nodes.find((n) => n.id === e.target);
        if (!a || !b) {
          pulses.splice(i, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * (1 - p.progress);
        const y = a.y + (b.y - a.y) * (1 - p.progress);
        const color = COLOR_MAP[b.color] || "#3b82f6";
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        if (p.progress >= 1) pulses.splice(i, 1);
      }

      // Nodes
      nodes.forEach((n) => {
        const dim = highlightCat && n.type === "skill" && n.parent !== highlightCat;
        const color = n.color ? COLOR_MAP[n.color] || "#3b82f6" : "#3b82f6";
        const alpha = dim ? 0.15 : 1;
        ctx.globalAlpha = alpha;

        if (n.type === "root") {
          // Center pulse
          const pulse = 1 + 0.06 * Math.sin(now * 0.002);
          ctx.fillStyle = "#3b82f6";
          ctx.shadowColor = "#3b82f6";
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.fillStyle = centerTextColor;
          ctx.font = "700 14px var(--font-mono), JetBrains Mono, monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(n.label, n.x, n.y);
        } else if (n.type === "category") {
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = highlightCat === n.id ? 25 : 10;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          // Category name label — needs to read on either background
          ctx.fillStyle = categoryLabelColor;
          ctx.font = "700 12px var(--font-sans), Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(n.label, n.x, n.y + n.r + 16);
        } else {
          const isHover = mouse.hover === n;
          ctx.fillStyle = color + (isHover ? "" : "cc");
          ctx.shadowColor = color;
          ctx.shadowBlur = isHover ? 20 : 6;
          ctx.beginPath();
          ctx.arc(n.x, n.y, isHover ? n.r + 2 : n.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.fillStyle = dim ? skillLabelDim : skillLabelColor;
          ctx.font = "500 10px var(--font-mono), monospace";
          ctx.textAlign = "left";
          ctx.fillText(n.label, n.x + n.r + 6, n.y + 3);
        }
        ctx.globalAlpha = 1;
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-[600px] md:h-[720px] rounded-2xl overflow-hidden glass-subtle"
    >
      <canvas ref={canvasRef} data-cursor data-cursor-label="Explore" />
      {tooltip && (
        <div
          className="absolute pointer-events-none z-10 glass-elevated px-3 py-2 rounded-lg max-w-[240px]"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: "translate(0, -100%)",
          }}
        >
          <div className="t-mono text-[var(--text-primary)]">{tooltip.label}</div>
          {tooltip.proficiency && (
            <div className="t-body-sm text-[var(--text-secondary)] mt-1">
              {tooltip.proficiency}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
