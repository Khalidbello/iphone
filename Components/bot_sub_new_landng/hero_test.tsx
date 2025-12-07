"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Intro from "./Intro";
import { FiArrowRight } from "react-icons/fi";
import PlatformOverlay from "./overlay";

gsap.registerPlugin(ScrollTrigger);

export default function HeroFeatureWithScroll() {
  /* ------------------------------ REFS ------------------------------ */
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  /* overlay control codes */
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  const handlePlatformSelect = (platform: "facebook" | "whatsapp") => {
    console.log("Selected Platform:", platform);
    setOverlayOpen(false);
    // navigate or open chat based on platform
  };

  /* Canvas inside phone */
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ------------------------------ SPLIT TEXT ------------------------------ */
  const splitText = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="hero-char inline-block"
        style={{
          display: char === " " ? "inline" : "inline-block",
        }}
      >
        {char}
      </span>
    ));

  /* ------------------------- INTRO COMPLETION ANIMATION ------------------------- */
  const runOnIntroComplete = () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    );

    tl.fromTo(
      ".hero-char",
      { opacity: 0, y: 60, rotateX: 70, transformOrigin: "bottom" },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.025,
        ease: "expo.out",
      },
      "-=0.4"
    );

    tl.fromTo(
      ".hero-glow",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.4, stagger: 0.2 },
      "-=1"
    );

    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.8)" },
      "-=0.5"
    );

    tl.to(ctaRef.current, {
      y: -6,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  };

  /* ------------------------------ MAIN ANIMATIONS ------------------------------ */
  useGSAP(() => {
    const hero = heroRef.current;
    const feature = featureRef.current;
    const canvas = canvasRef.current;

    if (!canvas || !hero || !feature) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    /* RESET */
    gsap.set([".hero-char", textRef.current, ctaRef.current], {
      opacity: 0,
    });

    /* ------------------ SCROLL IMAGE SEQUENCE ------------------ */
    const frameCount = 300;

    const currentFrame = (i: number) =>
      `/frames_opt/frame_${String(i).padStart(4, "0")}.webp`;

    const images: HTMLImageElement[] = [];
    const frame = { index: 1 };

    canvas.width = 1080;
    canvas.height = 1920;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images[i] = img;
    }

    images[1].onload = () => {
      context.drawImage(images[1], 0, 0, canvas.width, canvas.height);
    };

    gsap.to(frame, {
      index: frameCount,
      snap: "index",
      ease: "none",
      scrollTrigger: {
        trigger: feature,
        scrub: 0.5,
        start: "top top",
        end: "+=2000",
        pin: false,
      },
      onUpdate: () => {
        const img = images[frame.index];
        if (img && img.complete) {
          requestAnimationFrame(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
          });
        }
      },
    });

    /* ------------------ HERO PINNING ------------------ */
    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom+=80% top",
      pin: true,
      pinSpacing: false,
      scrub: 1,
    });

    /* ------------------ FEATURE PIN + TEXT ANIM ------------------ */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: feature,
        start: "top top",
        end: "+=2000",
        pin: true,
        scrub: 1,
      },
    });

    tl.fromTo(
      "#feature-intro",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.5 },
      "0%"
    );

    tl.to("#feature-intro", { opacity: 0, y: -40, duration: 1 }, "5%");

    tl.fromTo(
      phoneRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1 },
      "15%"
    );

    tl.fromTo("#first", { x: -120, opacity: 0 }, { x: 0, opacity: 1 }, "30%");
    tl.fromTo("#second", { x: 120, opacity: 0 }, { x: 0, opacity: 1 }, "45%");
    tl.fromTo("#third", { x: -120, opacity: 0 }, { x: 0, opacity: 1 }, "60%");
    tl.fromTo("#forth", { x: 120, opacity: 0 }, { x: 0, opacity: 1 }, "75%");
  }, []);

  /* ------------------------------ JSX VIEW ------------------------------ */
  return (
    <>
      <div ref={containerRef} className="w-full overflow-x-hidden bg-white">
        <Intro onComplete={runOnIntroComplete} />

        {/* ---------------- HERO SECTION ---------------- */}
        <section
          id="home"
          ref={heroRef}
          className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-8 pt-32 bg-linear-60 from-white to-blue-50"
        >
          {/* Glows */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="hero-glow absolute top-1/3 left-1/4 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl" />
            <div className="hero-glow absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-10 max-w-5xl text-center">
            <div ref={textRef} className="leading-tight overflow-hidden">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 ">
                {splitText("Top Up Made Easy With")}
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mt-2 text-blue-600">
                {splitText("BotSub")}
              </h1>
            </div>

            <button
              onClick={() => setOverlayOpen(true)}
              ref={ctaRef}
              className="relative px-10 py-4 rounded-full bg-blue-700 text-white font-semibold text-lg shadow-lg hover:shadow-2xl transition-all hover:scale-[1.04] active:scale-[0.96] overflow-hidden group"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />

              <span className="relative z-10 flex items-center gap-2">
                Sub Now <FiArrowRight className="text-xl" />
              </span>
            </button>
          </div>
        </section>

        {/* ---------------- FEATURE SECTION ---------------- */}
        <section
          id="fb"
          ref={featureRef}
          className="relative w-full h-screen pt-20 flex items-center justify-center bg-linear-to-b from-slate-900 via-blue-950 to-black overflow-hidden"
        >
          <div
            id="feature-intro"
            className="absolute text-center text-white text-4xl font-extrabold opacity-0"
          >
            BotSub on Facebook
          </div>

          {/* PHONE UI + CANVAS */}
          <div
            ref={phoneRef}
            className="relative h-[90%] aspect-[11/20] bg-black rounded-3xl shadow-2xl border-4 border-black overflow-hidden"
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Tips */}
          <div
            id="first"
            className="absolute left-[3%] md:left-[20%] top-[24%] pl-2 text-lg font-semibold bg-transparent text-yellow-500 
          py-2 rounded-xl"
          >
            <div className="absolute top-2 left-0 bg-white h-px w-full"></div>
            <div className="absolute top-1 left-0 bg-white w-2 h-2 rounded-full"></div>
            Buy Data Instantly
          </div>

          <div
            id="second"
            className="absolute right-[3%] md:right-[20%] top-[40%] pr-2  text-lg font-semibold bg-transparent text-yellow-500 
          py-2 rounded-xl"
          >
            <div className="absolute top-2 left-0 bg-white h-px w-full"></div>
            <div className="absolute top-1 right-0 bg-white w-2 h-2 rounded-full"></div>
            Works in Free Mode
          </div>

          <div
            id="third"
            className="absolute left-[3%] md:left-[20%] top-[60%] pl-2  text-lg font-semibold bg-transparent text-yellow-500 
          py-2 rounded-xl"
          >
            <div className="absolute top-2 left-0 bg-white h-px w-full"></div>
            <div className="absolute top-1 left-0 bg-white w-2 h-2 rounded-full"></div>
            Fast, Smooth & Simple
          </div>

          <div
            id="forth"
            className="absolute right-[3%] md:right-[20%] top-[85%] pr-2  text-lg font-semibold bg-transparent text-yellow-500 
          py-2 rounded-xl"
          >
            <div className="absolute top-2 left-0 bg-white h-px w-full"></div>
            <div className="absolute top-1 right-0 bg-white w-2 h-2 rounded-full"></div>
            Secure Transactions
          </div>
        </section>
      </div>

      <PlatformOverlay
        isOpen={isOverlayOpen}
        onClose={() => setOverlayOpen(false)}
        onSelectPlatform={handlePlatformSelect}
      />
    </>
  );
}
