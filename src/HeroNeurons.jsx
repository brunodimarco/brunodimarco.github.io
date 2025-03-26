import { useRef, useEffect } from "react";

export default function HeroNeurons({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = 0,
      height = 0;

    function resize() {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", resize);
    resize();

    const NEURON_COUNT = 200;
    const CONNECT_DIST = 100;
    const neurons = [];
    const edges = new Map();
    const graph = Array.from({ length: NEURON_COUNT }, () => new Set());

    for (let i = 0; i < NEURON_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radiusX = width * 0.5;
      const radiusY = height * 0.45;
      const r = 0.45 + Math.random() * 0.55;

      const x =
        width / 2 + Math.cos(angle) * radiusX * r + (Math.random() - 0.5) * 40;
      const y =
        height / 2 + Math.sin(angle) * radiusY * r + (Math.random() - 0.5) * 40;

      neurons.push({
        x,
        y,
        size: 3 + Math.random() * 3,
        lit: 0,
      });
    }

    function edgeKey(i, j) {
      return i < j ? `${i}-${j}` : `${j}-${i}`;
    }

    for (let i = 0; i < neurons.length; i++) {
      const n1 = neurons[i];
      for (let j = i + 1; j < neurons.length; j++) {
        const n2 = neurons[j];
        const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
        if (dist < CONNECT_DIST) {
          graph[i].add(j);
          graph[j].add(i);

          const mx = (n1.x + n2.x) / 2;
          const my = (n1.y + n2.y) / 2;
          const offsetX = (Math.random() - 0.5) * dist * 0.5;
          const offsetY = (Math.random() - 0.5) * dist * 0.5;
          edges.set(edgeKey(i, j), {
            cx: mx + offsetX,
            cy: my + offsetY,
          });
        }
      }
    }

    function drawQuadraticCurve(ctx, x0, y0, cx, cy, x1, y1, color) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(cx, cy, x1, y1);
      ctx.stroke();
    }

    function quadCoord(t, p0, pc, p1) {
      const inv = 1 - t;
      return inv * inv * p0 + 2 * inv * t * pc + t * t * p1;
    }

    function createImpulse(fromIndex, colorSet) {
      const options = [...graph[fromIndex]].filter((j) => j !== fromIndex);
      if (options.length === 0) return null;

      const toIndex = options[Math.floor(Math.random() * options.length)];
      const n1 = neurons[fromIndex];
      const n2 = neurons[toIndex];
      const key = edgeKey(fromIndex, toIndex);
      const { cx, cy } = edges.get(key);

      return {
        from: fromIndex,
        to: toIndex,
        x0: n1.x,
        y0: n1.y,
        cx,
        cy,
        x1: n2.x,
        y1: n2.y,
        progress: 0.95,
        speed: 0.015 + Math.random() * 0.001,
        colorSet,
      };
    }

    const leftmost = neurons.reduce(
      (min, n, i) => (n.x < neurons[min].x ? i : min),
      0
    );
    const rightmost = neurons.reduce(
      (max, n, i) => (n.x > neurons[max].x ? i : max),
      0
    );

    let impulseA = createImpulse(
      leftmost,
      theme === "dark"
        ? { from: "#facc15", to: "#f97316" }
        : { from: "#ec4899", to: "#d946ef" }
    );

    let impulseB = createImpulse(
      rightmost,
      theme === "dark"
        ? { from: "#38bdf8", to: "#3b82f6" }
        : { from: "#e879f9", to: "#d946ef" }
    );

    function animate() {
      ctx.clearRect(0, 0, width, height);

      const connectionColor =
        theme === "dark"
          ? "rgba(125,213,250,0.10)"
          : "rgba(67, 194, 248, 0.25)";

      for (const [key, { cx, cy }] of edges.entries()) {
        const [i, j] = key.split("-").map(Number);
        const n1 = neurons[i];
        const n2 = neurons[j];
        drawQuadraticCurve(
          ctx,
          n1.x,
          n1.y,
          cx,
          cy,
          n2.x,
          n2.y,
          connectionColor
        );
      }

      for (const n of neurons) {
        if (n.lit > 0) n.lit -= 0.02;
        const glow = Math.min(n.lit, 1);
        ctx.beginPath();
        ctx.fillStyle =
          glow > 0
            ? theme === "dark"
              ? `rgba(232,62,140,${glow})`
              : `rgba(232,62,140,${glow})`
            : theme === "dark"
            ? "#089bdc"
            : "#075bc3";

        ctx.arc(n.x, n.y, n.size, 0, 2 * Math.PI);
        ctx.fill();
      }

      for (const impulse of [impulseA, impulseB]) {
        if (!impulse) continue;
        impulse.progress += impulse.speed;

        if (impulse.progress >= 1) {
          neurons[impulse.to].lit += 0.7;
          if (neurons[impulse.to].lit > 1) neurons[impulse.to].lit = 1;
          const newImpulse = createImpulse(impulse.to, impulse.colorSet);
          if (impulse === impulseA) impulseA = newImpulse;
          else impulseB = newImpulse;
        } else {
          const t = impulse.progress;
          const tx = quadCoord(t, impulse.x0, impulse.cx, impulse.x1);
          const ty = quadCoord(t, impulse.y0, impulse.cy, impulse.y1);

          const grad = ctx.createLinearGradient(
            impulse.x0,
            impulse.y0,
            impulse.x1,
            impulse.y1
          );
          grad.addColorStop(0, impulse.colorSet.from);
          grad.addColorStop(1, impulse.colorSet.to);

          ctx.beginPath();
          ctx.fillStyle = grad;
          ctx.arc(tx, ty, 3, 0, 2 * Math.PI);
          ctx.fill();
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
    return () => window.removeEventListener("resize", resize);
  }, [theme]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}
