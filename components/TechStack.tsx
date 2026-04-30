"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
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
  Cloud,
  Cpu,
  Sparkles,
  Zap,
  Rocket,
  Eye,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// টেকনোলজি লিস্ট - কম্প্যাক্ট ও সাজানো
const technologies = [
  {
    name: "WordPress",
    color: "#21759b",
    orbit: 300,
    speed: 45,
    icon: Layout,
    category: "CMS",
  },
  {
    name: "Shopify",
    color: "#7ab55c",
    orbit: 260,
    speed: 40,
    icon: ShoppingCart,
    category: "Ecommerce",
  },
  {
    name: "WooCommerce",
    color: "#96588a",
    orbit: 340,
    speed: 50,
    icon: ShoppingCart,
    category: "Ecommerce",
  },
  {
    name: "React",
    color: "#61dafb",
    orbit: 200,
    speed: 35,
    icon: Atom,
    category: "Frontend",
  },
  {
    name: "Next.js",
    color: "#ffffff",
    orbit: 250,
    speed: 42,
    icon: Code2,
    category: "Frontend",
  },
  {
    name: "Tailwind",
    color: "#38bdf8",
    orbit: 220,
    speed: 38,
    icon: Layers,
    category: "Frontend",
  },
  {
    name: "Node.js",
    color: "#68a063",
    orbit: 280,
    speed: 48,
    icon: Server,
    category: "Backend",
  },
  {
    name: "PHP",
    color: "#777bb4",
    orbit: 320,
    speed: 52,
    icon: Terminal,
    category: "Backend",
  },
  {
    name: "MySQL",
    color: "#4479a1",
    orbit: 360,
    speed: 55,
    icon: Database,
    category: "Database",
  },
  {
    name: "MongoDB",
    color: "#47a248",
    orbit: 190,
    speed: 32,
    icon: Database,
    category: "Database",
  },
  {
    name: "Firebase",
    color: "#ffca28",
    orbit: 240,
    speed: 44,
    icon: Cloud,
    category: "Cloud",
  },
  {
    name: "Docker",
    color: "#2496ed",
    orbit: 380,
    speed: 60,
    icon: Layers,
    category: "DevOps",
  },
  {
    name: "AWS",
    color: "#ff9900",
    orbit: 310,
    speed: 50,
    icon: Cloud,
    category: "Cloud",
  },
  {
    name: "Vercel",
    color: "#ffffff",
    orbit: 270,
    speed: 46,
    icon: Code2,
    category: "Deploy",
  },
  {
    name: "SEO",
    color: "#f26522",
    orbit: 230,
    speed: 39,
    icon: Search,
    category: "Marketing",
  },
  {
    name: "Security",
    color: "#e84393",
    orbit: 290,
    speed: 47,
    icon: ShieldCheck,
    category: "Security",
  },
];

// ক্যাটাগরি রং
const categoryColors: Record<string, string> = {
  CMS: "#21759b",
  Ecommerce: "#7ab55c",
  Frontend: "#61dafb",
  Backend: "#68a063",
  Database: "#47a248",
  Cloud: "#ff9900",
  DevOps: "#2496ed",
  Deploy: "#ffffff",
  Marketing: "#f26522",
  Security: "#e84393",
};

const TechStack = () => {
  const sectionRef = useRef(null);
  const orbitRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const [currentRow, setCurrentRow] = useState(0);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const { lang } = useLanguage();
  const t = translations[lang];
  const features = t.techStack?.features || [];

  const totalRows = Math.ceil(features.length / 2);
  const visibleRows = 2;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

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

  // অরবিট এনিমেশন - অপটিমাইজড
  useEffect(() => {
    const ctx = gsap.context(() => {
      // হেডার এনিমেশন
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

      // অরবিট এনিমেশন - শুধু visible viewport এ
      const activeOrbits = orbitRefs.current.filter(
        (node, i) => node && Math.abs(i - 8) < 10,
      );
      activeOrbits.forEach((node, idx) => {
        if (!node) return;
        const tech = technologies[idx % technologies.length];
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

  // গ্রিড স্ক্রল
  useEffect(() => {
    if (gridRef.current) {
      gsap.to(gridRef.current, {
        y: `-${currentRow * 310}px`,
        duration: 0.8,
        ease: "power3.inOut",
      });
    }
  }, [currentRow]);

  const featureIcons = [
    Cpu,
    Globe,
    ShieldCheck,
    Layers,
    BarChart3,
    Zap,
    Rocket,
    Eye,
  ];
  const gradients = [
    "from-purple-500/20 to-pink-500/20",
    "from-blue-500/20 to-cyan-500/20",
    "from-green-500/20 to-emerald-500/20",
    "from-orange-500/20 to-yellow-500/20",
    "from-red-500/20 to-rose-500/20",
    "from-indigo-500/20 to-purple-500/20",
  ];

  // ক্যাটাগরি গ্রুপিং
  const categories = [...new Set(technologies.map((t) => t.category))];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-[#0a0b14] via-[#0a0b14] to-[#05060a]"
    >
      {/* অ্যানিমেটেড ব্যাকগ্রাউন্ড */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-cyan-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-blue-600/10 to-transparent rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[80px]" />
      </div>

      {/* গ্রিড প্যাটার্ন */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* প্রিমিয়াম হেডার */}
        <motion.div
          className="tech-header text-center mb-24"
          style={{ opacity: headerOpacity }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500" />
            <span className="text-purple-400 text-xs font-mono tracking-[0.3em] uppercase font-bold">
              {lang === "BN" ? "টেকনোলজি স্ট্যাক" : "TECH STACK"}
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500" />
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6">
            {t.techStack?.title || "The"}{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              {t.techStack?.titleGradient || "Atomic"}
            </span>{" "}
            {t.techStack?.titleEnd || "Stack."}
          </h2>

          <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
            {lang === "BN"
              ? "আমরা ব্যবহার করি বিশ্বের সবচেয়ে আধুনিক ও শক্তিশালী টুলস এবং টেকনোলজি"
              : "We use cutting-edge tools & technologies to build exceptional digital experiences"}
          </p>

          {/* অ্যানিমেটেড ডটস */}
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* বাম পাশ - ফিচার গ্রিড */}
          <div className="space-y-8">
            <div className="relative h-[620px] overflow-hidden rounded-3xl">
              <div
                ref={gridRef}
                className="features-grid grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {features.map((feature, index) => {
                  const Icon = featureIcons[index % featureIcons.length];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8 }}
                      className="feature-card group relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-purple-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      <div className="relative z-10">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon size={24} className="text-purple-400" />
                        </div>
                        <h4
                          className={`font-bold text-white text-lg mb-2 group-hover:text-purple-400 transition-colors ${lang === "BN" ? "font-hind" : ""}`}
                        >
                          {feature.title}
                        </h4>
                        <p
                          className={`text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors ${lang === "BN" ? "font-hind" : ""}`}
                        >
                          {feature.desc}
                        </p>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* স্ক্রল বাটন */}
            <div className="flex justify-center gap-4">
              <button
                onClick={scrollPrev}
                disabled={currentRow === 0}
                className={`p-3 rounded-full border transition-all duration-300 ${
                  currentRow === 0
                    ? "border-white/10 opacity-30 cursor-not-allowed"
                    : "border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-400 hover:scale-110 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
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
                    : "border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-400 hover:scale-110 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                }`}
              >
                <ChevronDown size={20} className="text-white" />
              </button>
            </div>

            {/* ফিচার কাউন্ট ইন্ডিকেটর */}
            <div className="flex justify-center gap-1">
              {[...Array(totalRows)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentRow(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    Math.floor(currentRow / visibleRows) === i
                      ? "w-6 bg-purple-500"
                      : "w-3 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ডান পাশ - অরবিটাল টেক স্ট্যাক */}
          <div className="relative h-[650px] flex items-center justify-center">
            {/* অরবিট রিংস */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[420, 380, 340, 300, 260, 220, 180].map((radius, idx) => (
                <div
                  key={radius}
                  className="absolute rounded-full border border-white/[0.03]"
                  style={{ width: radius * 2, height: radius * 2 }}
                />
              ))}
            </div>

            {/* গ্লো ইফেক্ট */}
            <div className="absolute w-[200px] h-[200px] bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-full blur-[60px] animate-pulse" />

            {/* সেন্টার কোর */}
            <motion.div
              className="relative z-30 w-36 h-36 rounded-full bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-cyan-600/30 border-2 border-white/20 flex items-center justify-center backdrop-blur-2xl shadow-2xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-center">
                <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div
                  className={`text-sm font-black tracking-tighter text-white ${lang === "BN" ? "font-hind text-xs" : ""}`}
                >
                  {t.techStack?.centerText || "MERN+"}
                </div>
                <div className="text-[8px] text-purple-400 font-mono mt-1">
                  STACK
                </div>
              </div>
            </motion.div>

            {/* অরবিটিং টেকনোলজিস */}
            {technologies.map((tech, i) => {
              const angle = (i / technologies.length) * 360;
              const isHovered = hoveredTech === tech.name;
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
                  <motion.div
                    className="tech-node-inner absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto group"
                    style={{ transform: `rotate(-${angle}deg)` }}
                    animate={{ scale: isHovered ? 1.2 : 1 }}
                    onHoverStart={() => setHoveredTech(tech.name)}
                    onHoverEnd={() => setHoveredTech(null)}
                  >
                    <div
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0a0b14] to-[#1a1b24] border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 group-hover:border-purple-400 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] group-hover:scale-125 cursor-pointer"
                      style={{
                        boxShadow: isHovered
                          ? `0 0 20px ${tech.color}`
                          : "none",
                      }}
                    >
                      <tech.icon
                        size={22}
                        style={{ color: tech.color }}
                        className="opacity-90 group-hover:opacity-100 transition-all group-hover:scale-110"
                      />
                      <span
                        className={`text-[7px] font-mono uppercase tracking-wider text-white/50 group-hover:text-white mt-1 transition-colors ${lang === "BN" ? "font-hind" : ""}`}
                      >
                        {tech.name}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}

            {/* ক্যাটাগরি লেবেল */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 text-[9px] font-mono">
              {categories.map((category, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded-full bg-white/5 backdrop-blur-sm text-white/40 hover:text-white transition-colors"
                  style={
                    {
                      "--hover-color": categoryColors[category],
                    } as React.CSSProperties
                  }
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* বটম ট্রাস্ট ব্যাজ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mt-20 pt-8"
        >
          {[
            { text: "24/7 Support", icon: "💬" },
            { text: "100% Client Satisfaction", icon: "⭐" },
            { text: "On-Time Delivery", icon: "🚀" },
            { text: "Enterprise Grade Security", icon: "🔒" },
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all duration-300"
            >
              <span className="text-sm">{badge.icon}</span>
              <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider">
                {badge.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
