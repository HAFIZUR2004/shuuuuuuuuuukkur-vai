"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/constants/LanguageContext";
import { translations } from "@/constants/translations";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "01",
    color: "#b5a7ff",
    align: "left",
  },
  {
    id: "02",
    color: "#3ee8f6",
    align: "right",
  },
  {
    id: "03",
    color: "#b5a7ff",
    align: "left",
  },
  {
    id: "04",
    color: "#3ee8f6",
    align: "right",
  },
];

const EngineeringProtocol = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { lang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    // --- GSAP Scroll Animations ---
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { height: 0 },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: scrollRef.current,
            start: "top 20%",
            end: "bottom 80%",
            scrub: 1,
          },
        },
      );
    }

    steps.forEach((_, i) => {
      gsap.fromTo(
        `.step-item-${i}`,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: `.step-item-${i}`,
            start: "top 85%",
            end: "top 50%",
            scrub: 0.5,
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  
  type StepType = {
    bgText: string;
    title: string;
    desc: string;
  };

  // Check if language is Bengali (case insensitive)
  const isBengali = lang?.toLowerCase() === 'bn';

  return (
    <section
      ref={scrollRef}
      className="relative bg-[#0b0c18] text-white py-20 px-6 overflow-hidden font-hind"
    >
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <h2 className={`text-6xl md:text-8xl font-black text-center mb-40 tracking-tight px-4 ${isBengali ? 'font-hind' : ''}`}>
          {t.protocolTitle}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 italic font-light inline-block pr-4">
            {t.protocolTitleItalic}
          </span>
        </h2>

        {/* Central Vertical Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/5 top-0" />
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#b5a7ff] to-[#3ee8f6] top-0 shadow-[0_0_15px_#3ee8f6]"
          />

          <div className="space-y-40 md:space-y-20">
            {t.steps.map((step: StepType, idx: number) => {
              const design = steps[idx];
              return (
                <div
                  key={idx}
                  className={`step-item-${idx} flex flex-col md:flex-row items-center w-full ${
                    design.align === "left"
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-full md:w-1/2 ${
                      design.align === "left"
                        ? "md:text-right md:pr-20"
                        : "md:text-left md:pl-20"
                    } relative`}
                  >
                    <div className="relative inline-block">
                      <span className="absolute -top-10 left-0 w-full text-center text-6xl font-black text-white/[0.02] uppercase pointer-events-none select-none">
                        {step.bgText}
                      </span>

                      <h4
                        className={`text-2xl font-bold mb-2 ${isBengali ? 'font-hind' : ''}`}
                        style={{ color: design.color }}
                      >
                        {design.id}. {step.title}
                      </h4>
                      <p className={`text-white/40 max-w-[400px] leading-relaxed mx-auto md:mx-0 ${isBengali ? 'font-hind' : ''}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-20 my-10 md:my-0">
                    <div
                      className="w-4 h-4 rounded-full border-4 border-[#0b0c18]"
                      style={{
                        backgroundColor: design.color,
                        boxShadow: `0 0 15px ${design.color}`,
                      }}
                    />
                  </div>

                  <div
                    className={`hidden md:block w-1/2 ${
                      design.align === "left" ? "pl-20" : "pr-20"
                    }`}
                  >
                    <span className="text-4xl font-black text-white/5 uppercase tracking-widest italic select-none">
                      {step.bgText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ইনলাইন স্টাইল যোগ করা হচ্ছে */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
        
        .font-hind {
          font-family: 'Hind Siliguri', 'Inter', sans-serif;
        }
      `}</style>
    </section>
  );
};

export default EngineeringProtocol;