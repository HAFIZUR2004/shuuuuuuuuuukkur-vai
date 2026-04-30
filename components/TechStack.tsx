"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/constants/LanguageContext";
import { translations } from "@/constants/translations";
import {
  Code2,
  Atom,
  Terminal,
  Database,
  Server,
  Globe,
  ShieldCheck,
  Layers,
  BarChart3,
  ChevronUp,
  ChevronDown,
  ShoppingCart,
  Layout,
  Search,
  Zap,
  Cloud,
  Smartphone,
  HeadphonesIcon,
  Cpu,
  Sparkles,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// টেকনোলজি লিস্ট - Full Stack Service এর জন্য
const technologies = [
  { name: "WordPress", color: "#21759b", orbit: 320, speed: 52, icon: Layout },
  { name: "Shopify", color: "#7ab55c", orbit: 270, speed: 44, icon: ShoppingCart },
  { name: "WooCommerce", color: "#96588a", orbit: 350, speed: 58, icon: ShoppingCart },
  { name: "React", color: "#61dafb", orbit: 210, speed: 38, icon: Atom },
  { name: "Next.js", color: "#ffffff", orbit: 260, speed: 48, icon: Code2 },
  { name: "Tailwind", color: "#38bdf8", orbit: 230, speed: 40, icon: Layers },
  { name: "Node.js", color: "#68a063", orbit: 290, speed: 50, icon: Server },
  { name: "PHP", color: "#777bb4", orbit: 310, speed: 54, icon: Terminal },
  { name: "MySQL", color: "#4479a1", orbit: 370, speed: 62, icon: Database },
  { name: "MongoDB", color: "#47a248", orbit: 195, speed: 36, icon: Database },
  { name: "Firebase", color: "#ffca28", orbit: 240, speed: 46, icon: Cloud },
  { name: "Docker", color: "#2496ed", orbit: 390, speed: 65, icon: Layers },
  { name: "AWS", color: "#ff9900", orbit: 330, speed: 56, icon: Cloud },
  { name: "Vercel", color: "#ffffff", orbit: 280, speed: 49, icon: Code2 },
  { name: "SEO", color: "#f26522", orbit: 250, speed: 43, icon: Search },
  { name: "Security", color: "#e84393", orbit: 300, speed: 47, icon: ShieldCheck },
];

const TechStack = () => {
  const sectionRef = useRef(null);
  const orbitRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const [currentRow, setCurrentRow] = useState(0);

  const { lang } = useLanguage();
  const t = translations[lang];
  
  // Translation থেকে features নেওয়া
  const features = t.techStack?.features || [];

  const totalRows = Math.ceil(features.length / 2);
  const visibleRows = 2;

  const scrollNext = () => {
    if (currentRow < totalRows - visibleRows) {
      setCurrentRow((prev) => prev + 1);
    }
  };

  const scrollPrev = () => {
    if (currentRow > 0) {
      setCurrentRow((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".tech-header", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Orbit animations
      orbitRefs.current.forEach((node, i) => {
        if (!node) return;
        const tech = technologies[i % technologies.length];
        gsap.to(node, {
          rotation: 360,
          duration: tech.speed,
          repeat: -1,
          ease: "none",
        });
        const inner = node.querySelector(".tech-node-inner");
        if (inner) {
          gsap.to(inner, {
            rotation: -360,
            duration: tech.speed,
            repeat: -1,
            ease: "none",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      gsap.to(gridRef.current, {
        y: `-${currentRow * 310}px`,
        duration: 0.8,
        ease: "power3.inOut",
      });
    }
  }, [currentRow]);

  const featureIcons = [Cpu, Globe, ShieldCheck, Layers, BarChart3, Zap];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden bg-[#0a0b14] text-white"
    >
      {/* Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-cyan-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-blue-600/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Header */}
        <div className="tech-header text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500" />
            <span className="text-purple-400 text-xs font-mono tracking-[0.3em] uppercase font-bold">
              {lang === 'BN' ? 'টেকনোলজি স্ট্যাক' : 'TECH STACK'}
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500" />
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
            {t.techStack?.title || "The"}{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              {t.techStack?.titleGradient || "Atomic"}
            </span>{" "}
            {t.techStack?.titleEnd || "Stack."}
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
            {lang === 'BN' 
              ? 'আমরা ব্যবহার করি বিশ্বের সবচেয়ে আধুনিক ও শক্তিশালী টুলস এবং টেকনোলজি'
              : 'We use cutting-edge tools & technologies'}
          </p>

          {/* Divider */}
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Features Grid from Translation */}
          <div className="space-y-8">
            <div className="relative h-[620px] overflow-hidden rounded-3xl">
              <div
                ref={gridRef}
                className="features-grid grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {features.map((feature, index) => {
                  const Icon = featureIcons[index % featureIcons.length];
                  const gradients = [
                    "from-purple-500/20 to-pink-500/20",
                    "from-blue-500/20 to-cyan-500/20",
                    "from-green-500/20 to-emerald-500/20",
                    "from-orange-500/20 to-yellow-500/20",
                    "from-red-500/20 to-rose-500/20",
                    "from-indigo-500/20 to-purple-500/20",
                  ];
                  return (
                    <div
                      key={index}
                      className="feature-card group relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-purple-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="relative z-10">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/20`}>
                          <Icon size={24} className="text-purple-400" />
                        </div>
                        <h4 className={`font-bold text-white text-lg mb-2 group-hover:text-purple-400 transition-colors ${lang === 'BN' ? 'font-hind' : ''}`}>
                          {feature.title}
                        </h4>
                        <p className={`text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors ${lang === 'BN' ? 'font-hind' : ''}`}>
                          {feature.desc}
                        </p>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scroll Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={scrollPrev}
                disabled={currentRow === 0}
                className={`p-3 rounded-full border transition-all duration-300 ${
                  currentRow === 0
                    ? "border-white/10 opacity-30 cursor-not-allowed"
                    : "border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-400 hover:scale-110"
                }`}
              >
                <ChevronUp size={20} className="text-white" />
              </button>
              <button
                onClick={scrollNext}
                disabled={currentRow >= totalRows - visibleRows}
                className={`p-3 rounded-full border transition-all duration-300 ${
                  currentRow >= totalRows - visibleRows
                    ? "border-white/10 opacity-30 cursor-not-allowed"
                    : "border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-400 hover:scale-110"
                }`}
              >
                <ChevronDown size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Right Side - Orbital Tech Stack */}
          <div className="relative h-[650px] flex items-center justify-center">
            {/* Orbit Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[420, 380, 340, 300, 260, 220, 180].map((radius, idx) => (
                <div
                  key={radius}
                  className="absolute rounded-full border border-white/[0.03]"
                  style={{
                    width: radius * 2,
                    height: radius * 2,
                  }}
                />
              ))}
            </div>

            {/* Glow Effect */}
            <div className="absolute w-[200px] h-[200px] bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-full blur-[60px] animate-pulse" />

            {/* Center Core */}
            <div className="relative z-30 w-36 h-36 rounded-full bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-cyan-600/30 border-2 border-white/20 flex items-center justify-center backdrop-blur-2xl shadow-2xl">
              <div className="text-center">
                <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className={`text-sm font-black tracking-tighter text-white ${lang === 'BN' ? 'font-hind text-xs' : ''}`}>
                  {t.techStack?.centerText || "MERN+"}
                </div>
                <div className="text-[8px] text-purple-400 font-mono mt-1">STACK</div>
              </div>
            </div>

            {/* Orbiting Technologies */}
            {technologies.map((tech, i) => {
              const angle = (i / technologies.length) * 360;
              return (
                <div
                  key={i}
                  ref={(el) => {
                    orbitRefs.current[i] = el;
                  }}
                  className="absolute flex items-center justify-center pointer-events-none"
                  style={{
                    width: tech.orbit * 2,
                    height: tech.orbit * 2,
                    transform: `rotate(${angle}deg)`,
                  }}
                >
                  <div
                    className="tech-node-inner absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto group"
                    style={{ transform: `rotate(-${angle}deg)` }}
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0a0b14] to-[#1a1b24] border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 group-hover:border-purple-400 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] group-hover:scale-125 cursor-pointer">
                      <tech.icon
                        size={22}
                        style={{ color: tech.color }}
                        className="opacity-90 group-hover:opacity-100 transition-all group-hover:scale-110"
                      />
                      <span className={`text-[7px] font-mono uppercase tracking-wider text-white/50 group-hover:text-white mt-1 transition-colors ${lang === 'BN' ? 'font-hind' : ''}`}>
                        {tech.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Bottom Category Labels */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-3 text-[9px] font-mono text-white/30">
              <span className="px-2 py-1 rounded-full bg-white/5">CMS</span>
              <span className="px-2 py-1 rounded-full bg-white/5">Frontend</span>
              <span className="px-2 py-1 rounded-full bg-white/5">Backend</span>
              <span className="px-2 py-1 rounded-full bg-white/5">Database</span>
              <span className="px-2 py-1 rounded-full bg-white/5">Cloud</span>
              <span className="px-2 py-1 rounded-full bg-white/5">DevOps</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;