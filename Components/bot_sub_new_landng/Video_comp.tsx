"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollImageSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const frameCount = 500;
  const currentFrame = (i: number) =>
    `/frames/frame_${String(i).padStart(4, "0")}.png`;

  useGSAP(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    const images: HTMLImageElement[] = [];
    const frame = { index: 1 };

    canvas.width = 1920;
    canvas.height = 1080;

    // Preload images
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i + 200);
      images[i] = img;
    }

    // Draw first frame when loaded
    images[1].onload = () => {
      context.drawImage(images[1], 0, 0, canvas.width, canvas.height);
    };

    // GSAP animation
    gsap.to(frame, {
      index: frameCount,
      snap: "index",
      ease: "none",
      scrollTrigger: {
        trigger: canvas,
        scrub: 0.5,
        pin: true,
        end: "+=2000",
      },
      onUpdate: () => {
        const img = images[frame.index];
        if (img && img.complete) {
          // Use requestAnimationFrame for smooth drawing
          requestAnimationFrame(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
          });
        }
      },
    });
  }, []);

  return (
    <div className="w-full h-[200vh] bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-screen block mx-auto"
        style={{ display: "block" }}
      />
    </div>
  );
}
