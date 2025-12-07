"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FiX } from "react-icons/fi";

type PlatformOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlatform: (platform: "facebook" | "whatsapp") => void;
};

export default function PlatformOverlay({
  isOpen,
  onClose,
  onSelectPlatform,
}: PlatformOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Animate overlay open/close
  useEffect(() => {
    if (isOpen) {
      setVisible(true); // Render overlay
    }
  }, [isOpen]);

  useEffect(() => {
    if (!visible) return;

    if (isOpen) {
      // OPEN animation
      const tl = gsap.timeline();
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power3.out" }
      );
      tl.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.2"
      );
    } else {
      // CLOSE animation
      const tl = gsap.timeline({
        onComplete: () => setVisible(false),
      });
      tl.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });
      tl.to(
        overlayRef.current,
        { opacity: 0, duration: 0.3, ease: "power3.in" },
        "-=0.25"
      );
    }
  }, [visible, isOpen]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div
        ref={modalRef}
        className="bg-gradient-to-b from-blue-900 to-slate-900 rounded-3xl p-8 max-w-md w-full text-center relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center bg-white transition"
        >
          <FiX size={24} className="text-red-700 w-5 h-5" />
        </button>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Get Started with BotSub
        </h2>

        <p className="text-gray-300 mb-8">Select a platform to use BotSub:</p>

        {/* Platform Options */}
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a href="https://facebook.com/100094053438576" target="_blank">
            <button
              onClick={() =>
                setTimeout(() => onSelectPlatform("facebook"), 250)
              }
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold text-lg shadow-lg hover:scale-[1.05] active:scale-[0.95]"
            >
              <FaFacebookF size={24} /> Facebook
            </button>
          </a>
          <a href="https://wa.me/+2349136659673" target="_blank">
            <button
              onClick={() =>
                setTimeout(() => onSelectPlatform("whatsapp"), 250)
              }
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-green-500 hover:bg-green-600 transition text-white font-semibold text-lg shadow-lg hover:scale-[1.05] active:scale-[0.95]"
            >
              <FaWhatsapp size={24} /> WhatsApp
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
