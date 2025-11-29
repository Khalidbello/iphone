"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useState } from "react";

// function to handle navBar animation
const animateNavbar = () => {
  const tl = gsap.timeline({});

  // Navbar entrance animation
  tl.fromTo(
    "#navbar",
    {
      y: -100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    }
  );

  // Logo animation
  tl.fromTo(
    "#logo",
    {
      x: -50,
      opacity: 0,
      scale: 0.8,
    },
    {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)",
    },
    "-=0.5"
  );

  // Desktop menu items animation
  tl.fromTo(
    ".nav-item",
    {
      y: -20,
      opacity: 0,
      scale: 0.9,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    },
    "-=0.3"
  );

  return tl;
};

const ResponsiveNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This will run the animation when component mounts
  useGSAP(() => {
    //animateNavbar();
  });

  const toggleMenu = () => {
    if (isMenuOpen) {
      // Close mobile menu
      gsap.to("#mobile-menu", {
        height: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
      gsap.to(".mobile-nav-item", {
        y: 20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
        onComplete: () => setIsMenuOpen(false),
      });
    } else {
      // Open mobile menu
      setIsMenuOpen(true);
      // Use next tick to ensure DOM is updated
      setTimeout(() => {
        gsap.fromTo(
          "#mobile-menu",
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          }
        );
        gsap.fromTo(
          ".mobile-nav-item",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            delay: 0.1,
            ease: "power2.out",
          }
        );
      }, 0);
    }
  };

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();

    // Button animation
    gsap.to(e.currentTarget, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });

    // Smooth scroll to section
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: targetElement, offsetY: 80 },
        ease: "power2.inOut",
      });
    }

    // Close mobile menu if open
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav
        id="navbar"
        className="fixed top-0 left-0 w-full bg-white/60 backdrop-blur-3xl shadow-lg z-50 overflow-hidden border-b border-gray-200/50"
        style={{ opacity: 0 }} // Initial state for animation
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div id="logo" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-blue-900 font-bold text-lg">B</span>
              </div>
              <span className="text-blue-900 font-bold text-xl hidden sm:block">
                BotSub
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="nav-item text-gray-600 hover:text-yellow-500 transition-colors duration-300 font-medium relative group py-2"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
              <button
                onClick={(e) => handleNavClick(e, "contact")}
                className="nav-item bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              id="menu-toggle"
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center flex-col space-y-1 p-2 bg-blue-600 rounded-lg w-10 h-10 hover:bg-blue-700 transition-colors duration-300"
            >
              <span
                className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Always in DOM but hidden with height: 0 */}
        <div
          id="mobile-menu"
          className="md:hidden bg-blue-800/95 backdrop-blur-lg overflow-hidden"
          style={{ height: 0 }} // Initial state
        >
          <div className="container mx-auto px-4 py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(e, item.id)}
                className="mobile-nav-item block w-full text-left text-white py-4 px-4 hover:bg-blue-700/50 rounded-lg transition-all duration-300 font-medium border-b border-blue-600/50 last:border-b-0 hover:translate-x-2"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={(e) => handleNavClick(e, "contact")}
              className="mobile-nav-item w-full bg-yellow-400 text-blue-900 py-4 px-4 rounded-lg font-bold hover:bg-yellow-300 transition-all duration-300 mt-4 hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ResponsiveNavbar;

export { animateNavbar };
