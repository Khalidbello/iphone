"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const FeatureScrollSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;

    // PIN THE SECTION
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=2500", // length of animation
      pin: true,
      scrub: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=2500",
        scrub: 1,
      },
    });

    // Phone fade in
    tl.fromTo(
      phoneRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1 }
    );

    // Feature tips animation sequence
    tl.fromTo(
      ".tip-left",
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
      "+=0.4"
    );

    tl.fromTo(
      ".tip-right",
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
      "+=0.4"
    );

    tl.fromTo(
      ".tip-top",
      { y: -120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "+=0.4"
    );

    tl.fromTo(
      ".tip-bottom",
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "+=0.4"
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-[200vh] bg-white flex items-center justify-center overflow-hidden"
    >
      {/* CENTER PHONE */}
      <div
        ref={phoneRef}
        className="relative w-64 h-[500px] bg-gray-200 rounded-3xl shadow-2xl border-4 border-black"
      >
        {/* Replace this gray box with actual phone UI */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xl">
          Phone UI
        </div>
      </div>

      {/* FEATURE TIPS */}
      <div className="absolute left-4 sm:left-12 top-1/3 tip-left text-lg font-semibold bg-white shadow-md px-4 py-2 rounded-xl">
        Buy Data Instantly
      </div>

      <div className="absolute right-4 sm:right-12 top-1/3 tip-right text-lg font-semibold bg-white shadow-md px-4 py-2 rounded-xl">
        Works in Free Mode
      </div>

      <div className="absolute top-10 tip-top text-lg font-semibold bg-white shadow-md px-4 py-2 rounded-xl">
        Fast, Smooth & Simple
      </div>

      <div className="absolute bottom-10 tip-bottom text-lg font-semibold bg-white shadow-md px-4 py-2 rounded-xl">
        Secure Transactions
      </div>
    </div>
  );
};

export default FeatureScrollSection;
