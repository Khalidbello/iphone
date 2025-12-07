"use client";

import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiMail,
  FiArrowRight,
} from "react-icons/fi";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-to-b from-slate-900 to-black text-white overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12">
        {/* ---------------- TOP CTA ---------------- */}
        <div className="bg-gradient-to-r from-blue-700 to-cyan-600 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center md:text-left leading-tight max-w-xl">
            Ready to enjoy seamless data & airtime without stress?
          </h2>

          <button className="group relative px-10 py-4 bg-white text-blue-700 rounded-full font-semibold text-lg flex items-center gap-2 hover:scale-105 transition-all shadow-lg">
            <span>Get Started</span>
            <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* ---------------- MAIN GRID ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-20">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              BotSub
            </h3>
            <p className="mt-4 text-gray-400 leading-relaxed text-sm">
              BotSub helps you buy data, airtime, and pay bills instantly — even
              without an active internet connection. Built for speed, simplicity
              and reliability.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Buy Data</li>
              <li>Buy Airtime</li>
              <li>Electricity Bills</li>
              <li>TV Subscriptions</li>
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <p className="flex items-center gap-2">
                <FiMail /> support@botsub.com
              </p>
              <p>Kaduna, Nigeria</p>
            </div>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FiFacebook />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-400 transition"
              >
                <FiTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 transition"
              >
                <FiInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* ---------------- BOTTOM BAR ---------------- */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} BotSub. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
