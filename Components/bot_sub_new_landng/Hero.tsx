"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Intro from "./Intro";

gsap.registerPlugin(ScrollTrigger);

const HeroFeature = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  /* ---------------------------------------------
      RUN HERO REVEAL AFTER INTRO (UNCHANGED)
  ---------------------------------------------- */
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

  const splitText = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="hero-char inline-block"
        style={{ display: char === " " ? "inline" : "inline-block" }}
      >
        {char}
      </span>
    ));

  /* ---------------------------------------------
      MAIN SCROLL ANIMATION
  ---------------------------------------------- */
  useGSAP(() => {
    const hero = heroRef.current;
    const feature = featureRef.current;

    // RESET
    gsap.set(".hero-char", { opacity: 0, y: 60 });
    gsap.set(ctaRef.current, { opacity: 0 });
    gsap.set(textRef.current, { opacity: 0 });

    /* --- Pin HERO section until features slide upward --- */
    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom+=80% top", // length hero stays pinned
      pin: true,
      pinSpacing: false,
      scrub: 1,
    });

    //   /* --- Pin FEATURE section until all tips animate in --- */
    //   // FEATURE animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: feature,
        start: "top top",
        end: "+=1500",
        pin: true,
        scrub: 2,
      },
    });

    /* 1. Intro text shows first */
    tl.fromTo(
      "#feature-intro",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2 },
      "0%"
    );

    /* 2. Fade intro text out */
    tl.to("#feature-intro", { opacity: 0, y: -40, duration: 1 }, "10%");

    /* 3. Phone fades in AFTER intro text */
    tl.fromTo(
      phoneRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1 },
      "20%"
    );

    /* 4. Your existing left/right tips follow normally */
    tl.fromTo("#first", { x: -120, opacity: 0 }, { x: 0, opacity: 1 }, "30%");
    tl.fromTo("#second", { x: 120, opacity: 0 }, { x: 0, opacity: 1 }, "45%");
    tl.fromTo("#third", { x: -120, opacity: 0 }, { x: 0, opacity: 1 }, "60%");
    tl.fromTo("#forth", { x: 120, opacity: 0 }, { x: 0, opacity: 1 }, "75%");
  }, []);

  /* ---------------------------------------------
      VIEW
  ---------------------------------------------- */
  return (
    <div ref={containerRef} className="w-full overflow-x-hidden bg-white">
      <Intro onComplete={runOnIntroComplete} />

      {/* ---------------- HERO SECTION ---------------- */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-8 pt-32 bg-linear-60 from-white to-blue-50"
      >
        {/* Glow Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="hero-glow absolute top-1/3 left-1/4 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl"></div>
          <div className="hero-glow absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="hero-glow absolute -bottom-40 -right-20 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl"></div>
          <div className="hero-glow absolute -top-4 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="hero-glow absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.12),transparent)]"></div>
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
            ref={ctaRef}
            className="relative px-10 py-4 rounded-full bg-blue-700 text-white font-semibold text-lg shadow-lg hover:shadow-2xl transition-all hover:scale-[1.04] active:scale-[0.96] overflow-hidden group"
          >
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000"></span>

            <span className="relative z-10 flex items-center">
              Sub Now
              <svg
                className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </button>
        </div>
      </section>

      {/* ---------------- FEATURE SECTION ---------------- */}
      <section
        ref={featureRef}
        className="relative w-full h-screen pt-20 flex items-center justify-center bg-linear-30  from-slate-800 to-blue-900 overflow-hidden"
      >
        <div
          id="feature-intro"
          className="absolute text-center text-white text-4xl font-extrabold opacity-0"
        >
          BotSub on Facebook
        </div>
        {/* Center Phone */}
        <div
          ref={phoneRef}
          className="relative h-[90%] aspect-[11/20] bg-gray-200 rounded-3xl shadow-2xl border-4 border-black"
        >
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xl">
            Phone UI
          </div>
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
  );
};

export default HeroFeature;
