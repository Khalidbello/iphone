"use client";

import { explore1Img, explore2Img } from "@/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    gsap.to(videoRef.current, {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: videoRef.current,
        start: "top 70%",
        toggleActions: "play pause reverse restart",
      },
      onComplete: () => {
        videoRef.current?.play();
      },
    });

    gsap.to("#features_title", {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: "#features_title",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play play play reverse",
      },
    });

    gsap.to(".g_grow", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".g_grow",
        start: "top 70%",
        end: "bottom 10%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.to(".g_grow", {
      scale: 1,
      scrollTrigger: {
        trigger: ".g_grow",
        start: "top 70%",
        end: "bottom 10%",
        toggleActions: "play none none reverse",
        scrub: 4,
      },
    });

    gsap.to(".g_text", {
      opacity: 1,
      y: 0,
      stagger: 0.5,
      scrollTrigger: {
        trigger: ".g_text",
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        //markers: true,
      },
    });
  }, []);

  return (
    <div className="flex items-center justify-center  bg-[#101010] ">
      <div className="h-full w-full max-w-[1120px] sm:py-25 py-15 sm:px-10 px-5 relative overflow-hiddens">
        {/* <div className=""> */}
        <div className="mb-16 w-full">
          <h1
            id="features_title"
            className="text-center font-semibold text-[#86868b] lg:text-7xl md:text-6xl text-4xl lg:mb-0 opacity-0 translate-y-20"
          >
            Forged in Titaniaum
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center overflow-hidden">
          {/* <div className="mt- mb-24">
            <h2 className="text-4xl lg:text-6xl">iPhone.</h2>
            <h2 className="text-4xl lg:text-6xl">Foregd in titanium.</h2>
          </div> */}
          <div className="flex items-center justify-center flex-col gap-4 sm:px-10">
            <div className="relative h-[50vh] w-full flex items-center rounded-3xl overflow-hidden">
              <video
                ref={videoRef}
                playsInline
                id="explore_vidoe"
                className="w-full h-full object-cover object-center"
                autoPlay
                muted
              >
                <source src={"assets/videos/explore.mp4"} />
              </video>
            </div>
            <div className="flex flex-col w-full relative">
              <div className="flex flex-col sm:flex-row gap-8 w-full h-full object-cover object-center opacity-100">
                <div className="overflow-hidden flex-1 h-[50vh] rounded-3xl">
                  <Image
                    src={explore1Img}
                    alt="explore image"
                    className="g_grow w-full h-full object-cover object-center scale-200 opacity-10"
                  />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh] rounded-3xl">
                  <Image
                    src={explore2Img}
                    alt="explore image 2"
                    className="g_grow w-full h-full object-cover object-center scale-200 opacity-10"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col sm:flex-row gap-5  mt-10 md:mt-16">
                <div className="flex-1 flex-center max-w-lg">
                  <p className="g_text w-full  text-justify text-[#86868b] text-lg md:text-xl font-medium opacity-1 translate-y-[100px]">
                    iPhone 15 Pro is{" "}
                    <span className="text-white">
                      the first iPhone to feature an aerospace-grade titanium
                      design
                    </span>
                    , using the same alloy that spacecrafts use for missions to
                    Mars.
                  </p>
                </div>
                <div className="flex-1 flex-center max-w-lg">
                  <p className="g_text text-justify text-[#86868b]  text-lg md:text-xl font-medium opacity-1 translate-y-[100px]">
                    Titanium has one of the best strength-to-weight ratios of
                    any metal, making these our{" "}
                    <span className="text-white">
                      lightest Pro models ever.
                    </span>
                    You{"'"}ll notice the difference the moment you pick one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
