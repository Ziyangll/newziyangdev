import React, { useRef, useEffect } from "react";

interface CanvasProps {
  width: number;
  height: number;
}
interface DropsType {
  t: number;
  deg: number;
}
interface ParticleType {
  x: number;
  y: number;
  t: number;
  deg: number;
}
function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
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
      const ctx = canvas.getContext("2d");
      let frameCount = 0;
      let animationFrameId;

      let CY = -300;
      const RAIN_LENGTH = 0.1;
      let circle_r = 800;
      let t = 0;
      let forward = true;
      const drops: DropsType[] = [];
      const particles: ParticleType[] = [];
      for (let i = 0; i < 100; i++) {
        drops.push({
          t: Math.random(),
          deg: Math.random() * Math.PI,
        });
      }

      const draw = (ctx, frameCount, timestamp, diff) => {
        resize(canvas);
        circle_r = canvas.height * 4;
        CY = (-circle_r * 3) / 4;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "white";
        ctx.lineWidth = 0.5;
        ctx.save();
        ctx.translate(canvas.width / 2, CY);

        ctx.fillStyle = "black";

        if (forward) {
          t += diff / 2000;
        } else {
          t -= diff / 2000;
        }
        t = 1;

        ctx.arc(
          0,
          0,
          circle_r * easeOutCubic(t),
          (0 * Math.PI) / 180,
          (360 * Math.PI) / 180,
          false
        );
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
            if (Math.random() < 0.2) {
              particles.push({
                x: Math.cos(drop.deg) * circle_r * 0.95,
                y: Math.sin(drop.deg) * circle_r * 0.95,
                t: 0,
                deg: drop.deg + Math.PI,
              });
            }

            drop.t = Math.random() - 0.5;
            drop.deg = Math.random() * Math.PI;
          }
        }
        ctx.closePath();
        ctx.stroke();
        particles.forEach((particle, index) => {
          ctx.fillStyle = "white";
          const rev =
            -1 * Math.pow(particle.t - 0.5, 2) * circle_r * 0.05 -
            circle_r * 0.04;
          ctx.fillRect(
            Math.cos(particle.deg) * rev + particle.x,
            Math.sin(particle.deg) * rev + particle.y,
            3,
            3
          );
          particle.t += diff / 300;
          if (particle.t > 1) {
            particles.splice(index, 1);
          }
        });

        ctx.restore();
      };
      let start;
      let before;
      const step = (timestamp) => {
        frameCount++;
        if (start === undefined) {
          start = timestamp;
        }
        const elapsed = timestamp - start;
        if (before === undefined) {
          before = elapsed;
        }

        draw(ctx, frameCount, elapsed, elapsed - before);
        before = elapsed;
        window.requestAnimationFrame(step);
      };

      window.requestAnimationFrame(step);

      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    }
  }, [width]);

  return <canvas ref={canvasRef} height={height} width={width} />;
};

export default Canvas;
