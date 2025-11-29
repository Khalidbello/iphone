"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const smallVidoe = "assets/videos/smallHero.mp4";
  const heroVideo = "assets/videos/hero.mp4";
  const [vidoeSrc, setVideoSrc] = useState("/hello");

  useGSAP(() => {
    gsap.to("#hero-title", { opacity: 1, delay: 1.5, duration: 1.8 });
    gsap.to("#cta", { y: -10, opacity: 1, delay: 2, duration: 1.5 });
  });

  const handleVideoSrcSet = () => {
    const src = window.innerWidth < 760 ? smallVidoe : heroVideo;
    setVideoSrc(src);
  };

  useEffect(() => {
    handleVideoSrcSet();
    window.addEventListener("resize", handleVideoSrcSet);

    return () => {
      window.removeEventListener("resize", handleVideoSrcSet);
    };
  }, []);
  return (
    <section className="w-full relative bg-black h-[calc(100vh-70px)]">
      <div className="h-5/6 w-full flex items-center justify-center flex-col">
        <p
          id="hero-title"
          className="text-center font-semibold text-2xl text-[#86868b] opacity-0 max-md:mb-10"
        >
          iPhone 15 pro
        </p>
        <div className="md:w-10/12 w-50">
          <video className="" autoPlay muted playsInline={true} key={vidoeSrc}>
            <source type="video/mp4" src={vidoeSrc} />
          </video>
        </div>
      </div>
      <div
        id="cta"
        className="flex flex-col items-center gap-4 opacity-0 translate-y-20"
      >
        <a
          href="#highlights"
          className="bg-transparent border-2 hover:bg-blue-600 hover:border-blue-600 rounded-3xl py-1 px-4 text-white"
        >
          Buy
        </a>
        <p className="text-sm">from $199/month 0r $999</p>
      </div>
    </section>
  );
};

export default Hero;
