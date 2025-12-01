"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import React from "react";
import Image from "next/image";
import { rightImg, watchImg } from "@/utils";
//import VideoCarousel from "./VideoCarousel";
//import VideoCarouselTest from "./vidCarouselTest";
import MyCarousel from "./myCarousel";

gsap.registerPlugin(ScrollTrigger);

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: "#title",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
    gsap.to(".link", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.25,
      scrollTrigger: {
        trigger: ".link",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });

  return (
    <section
      id="highlights"
      className="overflow-hidden w-full h-full sm:py-32 py-20 sm:px-10 px-5 bg-[#101010] "
    >
      <div
        style={{
          marginInlineStart: "auto",
          marginInlineEnd: "auto",
          position: "relative",
          maxWidth: "1120px",
        }}
        className=""
      >
        <div className="mb-12 flex gap-2 max-sm:flex-col max-sm:items-start items-end justify-between">
          <h1
            id="title"
            className="text-gray-500 lg:text-6xl md:text-5xl text-3xl lg:mb-0 font-bold opacity-0 translate-y-20"
          >
            Get the highlights.
          </h1>
          <div className="flex flex-wrap items-end gap-5">
            <p className="link text-blue-400 text-xs hover:underline cursor-pointer flex items-center opacity-0 translate-y-20">
              watch the film
              <Image
                src={watchImg}
                alt="watch icon"
                height={12}
                width={12}
                className="ml-2"
              />
            </p>
            <p className="link text-blue-400 hover:underline cursor-pointer flex items-center text-xs opacity-0 translate-y-20">
              watch the event
              <Image
                src={rightImg}
                alt="watch icon"
                height={8}
                width={8}
                className="ml-2"
              />
            </p>
          </div>
        </div>
        {/* <VideoCarousel /> */}
        {/* <VideoCarouselTest /> */}
        <MyCarousel />
      </div>
    </section>
  );
};

export default Highlights;
