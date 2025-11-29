"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import { animateNavbar } from "./nav_bar";

const Intro = ({ onComplete }: { onComplete: () => void }) => {
  useGSAP(() => {
    // Reset all elements
    gsap.set([".first-letter", ".sec-letter", ".third-letter"], {
      y: "300%",
      opacity: 1,
    });

    gsap.set(["#upper-cover", "#lower-cover"], {
      opacity: 1,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
        animateNavbar();
        gsap.set("#intro-wrapper", { display: "none" });
      },
    });

    // Cover animation - 10 seconds total
    tl.to("#upper-cover", {
      bottom: "100%",
      duration: 10,
      ease: "power1",
    })
      .to(
        "#lower-cover",
        {
          bottom: "-50%",
          duration: 10,
          ease: "power1",
        },
        0
      )

      // First text letters: show at 0.8s, hide at 2.8s
      .to(
        ".first-letter",
        {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
        },
        0.4
      )
      .to(
        ".first-letter",
        {
          y: "-300%",
          duration: 0.6,
          ease: "power3.in",
          stagger: 0.05,
        },
        2.6
      )

      // Second text letters: show at 3.4s, hide at 5.8s
      .to(
        ".sec-letter",
        {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
        },
        3.2
      )
      .to(
        ".sec-letter",
        {
          y: "-200%",
          duration: 0.6,
          ease: "power3.in",
          stagger: 0.05,
        },
        5.4
      )

      // Third text letters: show at 6.4s, hide at 8s
      .to(
        ".third-letter",
        {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
        },
        6.2
      )
      .to(
        ".third-letter",
        {
          y: "-200%",
          duration: 0.6,
          ease: "power3.in",
          stagger: 0.05,
        },
        7.8
      )
      .to(
        "#intro-wrapper",
        {
          opacity: 0,
          duration: 0.3,
        },
        9.7
      );
  });

  return (
    <div
      id="intro-wrapper"
      className="w-full h-screen fixed top-0 left-0 overflow-hidden pointer-events-none z-50 bg-white font-extrabold"
    >
      <div
        className="h-full w-full bg-white relative text-gray-900 flex items-center justify-center text-4xl xs:text-6xl 
           sm:text-7xl md:text-8xl lg:text-9xl  px-4 sm:px-6 lg:px-8
           "
      >
        {/* All texts stacked on top of each other */}
        <div className="py-6 text-center w-full font-mono  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          <div id="first-intro" className="inline-block w-full px-2">
            {splitText("Buy Data", "first-letter")}
          </div>
        </div>
        <div className="py-6 text-center w-full font-mono absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          <div id="sec-intro" className="inline-block w-full px-2">
            {splitText("Without Data", "sec-letter")}
          </div>
        </div>
        <div className="py-6 text-center w-full font-mono  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          <div id="third-intro" className="inline-block w-full px-2">
            {splitText("Using", "third-letter")}{" "}
            <span className="text-blue-800 font-extrabold">
              {splitText("BotSub", "third-letter")}
            </span>
          </div>
        </div>
      </div>

      <div
        id="upper-cover"
        className="absolute bottom-1/2 left-0 bg-blue-800 w-full h-1/2"
      ></div>
      <div
        id="lower-cover"
        className="absolute bottom-0 left-0 bg-blue-800 w-full h-1/2"
      ></div>
    </div>
  );
};

// Helper function to split text into letters
const splitText = (text: string, className: string) => {
  return text.split("").map((letter, index) => (
    <span key={index} className={`${className} inline-block`}>
      {letter === " " ? "\u00A0" : letter}
    </span>
  ));
};
export default Intro;

export { splitText };
