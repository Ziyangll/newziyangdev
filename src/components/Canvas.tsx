import { useRef, useEffect } from "react";
interface CanvasProps {
  width: number;
  height: number;
}
interface DropsType {
  t: number;
  deg: number;
}
function resize(canvas) {
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;
  if (canvas.width !== displayWidth) {
    canvas.width = displayWidth;
  }
  if (canvas.height !== displayHeight) {
    canvas.height = displayHeight;
  }
}
const Canvas = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
      let CY = 0;
      const RAIN_LENGTH = 0.1;
      let circle_r = 0;
      const drops: DropsType[] = [];
      for (let i = 0; i < 100; i++) {
        drops.push({
          t: Math.random(),
          deg: Math.random() * Math.PI,
        });
      }
      const draw = (ctx: CanvasRenderingContext2D, diff: number) => {
        resize(canvas);
        circle_r = canvas.height * 4 + 300;
        CY = (-circle_r * 3) / 4;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 0.5;
        ctx.save();
        ctx.translate(canvas.width / 2, CY);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.beginPath();
        for (let drop of drops) {
          let x1 = Math.cos(drop.deg) * drop.t * circle_r;
          let x2 = Math.cos(drop.deg) * (drop.t + RAIN_LENGTH) * circle_r;
          let y1 = Math.sin(drop.deg) * drop.t * circle_r;
          let y2 = Math.sin(drop.deg) * (drop.t + RAIN_LENGTH) * circle_r;
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          drop.t += diff / 800;
          if (drop.t > 1) {
            drop.t = Math.random() - 0.5;
            drop.deg = Math.random() * Math.PI;
          }
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      };
      let start = -1;
      let before = -1;
      const step = (timestamp: number) => {
        if (start === -1) {
          start = timestamp;
        }
        const elapsed = timestamp - start;
        if (before === -1) {
          before = elapsed;
        }
        if (ctx) {
          draw(ctx, elapsed - before);
        }
        before = elapsed;
        window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }
  }, [width]);
  return (
    <canvas
      style={{ width: "100%", height: "100%" }}
      ref={canvasRef}
      height={height}
      width={width}
    />
  );
};
export default Canvas;
