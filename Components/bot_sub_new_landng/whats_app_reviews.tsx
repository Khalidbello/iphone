"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FaArrowRight, FaStar } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Alice Johnson",
    text: "BotSub has completely changed how I manage my data top-ups. Fast, reliable, and intuitive.",
    avatar: "/avatar1.png",
    role: "Product Manager",
    rating: 5,
  },
  {
    name: "Bob Smith",
    text: "Buying data without internet is a game-changer. Smooth experience every single time.",
    avatar: "/avatar2.png",
    role: "Digital Nomad",
    rating: 5,
  },
  {
    name: "Carol Williams",
    text: "Secure transactions and a premium UI. Makes top-ups stress-free and enjoyable.",
    avatar: "/avatar3.png",
    role: "Tech Entrepreneur",
    rating: 5,
  },
  {
    name: "Dave Lee",
    text: "Beautiful design, reliable system, and no waiting for connectivity anymore.",
    avatar: "/avatar4.png",
    role: "Software Engineer",
    rating: 5,
  },
  {
    name: "Emma Wilson",
    text: "I travel a lot—this app is a lifesaver. Offline mode works flawlessly.",
    avatar: "/avatar5.png",
    role: "Travel Blogger",
    rating: 5,
  },
];

export default function WhatsAppTestimonials() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const cards = cardsRef.current;

      if (!container || !cards) return;

      const totalScroll = cards.scrollWidth - container.offsetWidth;

      // Pin section
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: `+=${totalScroll + 80}`,
        scrub: true,
        pin: true,
      });

      // Horizontal scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${totalScroll}`,
          scrub: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      tl.to(cards, {
        x: -totalScroll,
        ease: "none",
      });

      // Card reveal animations
      gsap.utils.toArray<HTMLElement>(cards.children).forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          scale: 0.3,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: "left 100%",
            end: "left 50%",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={
            i < rating ? "text-yellow-400 text-xl" : "text-gray-600 text-xl"
          }
        />
      ))}
    </div>
  );

  return (
    <section className="relative w-full bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-800">
      {/* Title */}
      <div className="pt-16 text-center">
        <div className="inline-block px-2 py-1 relative">
          <div className="w-1 h-full bg-yellow-300 absolute top-0 left-0"></div>
          <p className="text-white/90 text-xl font-bold tracking-wide">
            What BotSub Users Say On WhatsApp
          </p>
        </div>
      </div>

      {/* Pinned area */}
      <div
        ref={containerRef}
        className="relative w-full h-screen flex items-center overflow-hidden"
      >
        {/* FIXED progress bar */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-2/3 sm:w-1/2 z-50">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-cyan-400 w-0 rounded-full transition-none"
            ></div>
          </div>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="flex gap-12 pl-6 pr-12 md:px-20">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[32rem]
                bg-white/10 border border-white/20 rounded-3xl p-5 shadow-2xl
                backdrop-blur-xl flex flex-col items-center text-center text-white flex-shrink-0"
            >
              <Image
                src={t.avatar}
                alt={t.name}
                width={120}
                height={120}
                className="rounded-full mb-4 shadow-lg"
              />

              <StarRating rating={t.rating} />

              <p className="text-white/90 text-base leading-relaxed">
                {t.text}
              </p>

              <h3 className="text-white font-bold text-2xl mt-6">{t.name}</h3>
              <p className="text-cyan-300 text-sm">{t.role}</p>

              <div className="mt-6 w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="
      relative px-8 sm:px-10 py-3 sm:py-4 
      rounded-3xl 
      bg-gradient-to-r from-cyan-400 to-blue-500 
      text-white font-semibold text-lg sm:text-xl 
      shadow-lg shadow-cyan-500/50 
      hover:scale-105 hover:shadow-cyan-500/70 
      active:scale-95 
      transition-all duration-300
      backdrop-blur-md
      border border-white/20
      overflow-hidden
      flex items-center gap-2 mb-16
    "
        >
          Use BotSub on Facebook <FaArrowRight className="text-white text-lg" />
        </button>
      </div>
    </section>
  );
}
