"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const WhatsaapFeature = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  /* ---------------------------------------------
      MAIN SCROLL ANIMATION
  ---------------------------------------------- */
  useGSAP(() => {
    const feature = featureRef.current;

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

    /* 1. Intro text shows wa-first */
    tl.fromTo(
      "#wa-feature-intro",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2 },
      "0%"
    );

    /* 2. Fade intro text out */
    tl.to("#wa-feature-intro", { opacity: 0, y: -40, duration: 1 }, "10%");

    /* 3. Phone fades in AFTER intro text */
    tl.fromTo(
      phoneRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1 },
      "20%"
    );

    /* 4. Your existing left/right tips follow normally */
    tl.fromTo(
      "#wa-first",
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1 },
      "30%"
    );
    tl.fromTo(
      "#wa-second",
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1 },
      "45%"
    );
    tl.fromTo(
      "#wa-third",
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1 },
      "60%"
    );
    tl.fromTo("#wa-forth", { x: 120, opacity: 0 }, { x: 0, opacity: 1 }, "75%");
  }, []);

  /* ---------------------------------------------
      VIEW
  ---------------------------------------------- */
  return (
    <div ref={containerRef} className="w-full overflow-x-hidden bg-white">
      {/* ---------------- FEATURE SECTION ---------------- */}
      <section
        id="wa"
        ref={featureRef}
        className="relative w-full h-screen pt-20 flex items-center justify-center bg-gradient-to-b from-slate-900 via-green-950 to-black overflow-hidden"
      >
        <div
          id="wa-feature-intro"
          className="absolute text-center text-white text-4xl font-extrabold opacity-0"
        >
          BotSub on WhatsApp
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
          id="wa-first"
          className="absolute left-[3%] md:left-[20%] top-[24%] pl-2 text-lg font-semibold bg-transparent text-yellow-500 
          py-2 rounded-xl"
        >
          <div className="absolute top-2 left-0 bg-white h-px w-full"></div>
          <div className="absolute top-1 left-0 bg-white w-2 h-2 rounded-full"></div>
          Buy Data Instantly
        </div>

        <div
          id="wa-second"
          className="absolute right-[3%] md:right-[20%] top-[40%] pr-2  text-lg font-semibold bg-transparent text-yellow-500 
          py-2 rounded-xl"
        >
          <div className="absolute top-2 left-0 bg-white h-px w-full"></div>
          <div className="absolute top-1 right-0 bg-white w-2 h-2 rounded-full"></div>
          Works in Free Mode
        </div>

        <div
          id="wa-third"
          className="absolute left-[3%] md:left-[20%] top-[60%] pl-2  text-lg font-semibold bg-transparent text-yellow-500 
          py-2 rounded-xl"
        >
          <div className="absolute top-2 left-0 bg-white h-px w-full"></div>
          <div className="absolute top-1 left-0 bg-white w-2 h-2 rounded-full"></div>
          Fast, Smooth & Simple
        </div>

        <div
          id="wa-forth"
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

export default WhatsaapFeature;
