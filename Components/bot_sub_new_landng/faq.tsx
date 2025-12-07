"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaPlus, FaMinus } from "react-icons/fa";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "What is BotSub?",
    answer:
      "BotSub is a smart platform that lets you buy data, airtime and pay bills directly from Facebook — even without internet data.",
  },
  {
    question: "Can I use BotSub without data?",
    answer:
      "Yes! BotSub works in Facebook Free Mode so you can make transactions without active mobile data.",
  },
  {
    question: "Is BotSub safe to use?",
    answer:
      "Absolutely. BotSub uses secure payment gateways and encrypts all sensitive user data.",
  },
  {
    question: "How fast are transactions?",
    answer:
      "Transactions happen almost instantly — most are completed within seconds.",
  },
  {
    question: "Do I need to install an app?",
    answer:
      "No app required. Everything runs directly inside Facebook Messenger.",
  },
];

const FAQ = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    // intro animation
    gsap.from(".faq-title", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power4.out",
    });

    gsap.from(itemsRef.current, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  const toggleFAQ = (index: number) => {
    const item = itemsRef.current[index];
    const answer = item.querySelector(".faq-answer") as HTMLDivElement | null;
    const iconPlus = item.querySelector(".icon-plus") as HTMLElement | null;
    const iconMinus = item.querySelector(".icon-minus") as HTMLElement | null;

    if (!answer || !iconPlus || !iconMinus) return;

    const isOpen = answer.dataset.open === "true";

    if (isOpen) {
      // close
      gsap.to(answer, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });

      gsap.to(iconPlus, { rotate: 0, opacity: 1, duration: 0.3 });
      gsap.to(iconMinus, { rotate: -90, opacity: 0, duration: 0.3 });

      answer.dataset.open = "false";
    } else {
      // open
      gsap.set(answer, { height: "auto" });
      const autoHeight = answer.offsetHeight;

      gsap.fromTo(
        answer,
        { height: 0, opacity: 0 },
        {
          height: autoHeight,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        }
      );

      gsap.to(iconPlus, { rotate: 90, opacity: 0, duration: 0.3 });
      gsap.to(iconMinus, { rotate: 0, opacity: 1, duration: 0.3 });

      answer.dataset.open = "true";
    }
  };

  return (
    <section
      ref={containerRef}
      className="w-full bg-gradient-to-b from-slate-900 via-blue-950 to-black py-24 text-white"
    >
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="faq-title text-center text-4xl md:text-5xl font-extrabold mb-16">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer backdrop-blur-md"
              onClick={() => toggleFAQ(i)}
            >
              {/* Question */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-semibold">
                  {faq.question}
                </h3>

                <div className="relative w-6 h-6">
                  <FaPlus className="icon-plus absolute inset-0 transition" />
                  <FaMinus className="icon-minus absolute inset-0 opacity-0 rotate-[-90deg] transition" />
                </div>
              </div>

              {/* Answer */}
              <div
                className="faq-answer overflow-hidden h-0 opacity-0"
                data-open="false"
              >
                <p className="pt-4 text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
