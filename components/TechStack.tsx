"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  memo,
  useCallback,
} from "react";
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
  Star,
  Clock,
  CheckCircle2,
  Lock,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

// ✅ Import ParticleNetwork
import ParticleNetwork from "@/components/ParticleNetwork";

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

interface TechStackProps {
  t: any;
  lang: string;
}

// Memoized tech node component
const TechNode = memo(
  ({
    tech,
    index,
    totalTechs,
    hoveredTech,
    setHoveredTech,
  }: {
    tech: (typeof technologies)[0];
    index: number;
    totalTechs: number;
    hoveredTech: string | null;
    setHoveredTech: (name: string | null) => void;
  }) => {
    const angle = (index / totalTechs) * 360;
    const radius = 210;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    const isHovered = hoveredTech === tech.name;

    return (
      <div
        className="absolute left-1/2 top-1/2 w-0 h-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        }}
      >
        <motion.div
          className="pointer-events-auto group"
          animate={{
            scale: isHovered ? 1.35 : 1,
            filter: isHovered
              ? `drop-shadow(0 0 28px ${tech.color})`
              : "drop-shadow(0 0 8px rgba(0,0,0,0.4))",
          }}
          onMouseEnter={() => setHoveredTech(tech.name)}
          onMouseLeave={() => setHoveredTech(null)}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 15,
          }}
        >
          <div
            className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-slate-900/85 to-slate-800/80 border-2 border-white/20 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-300 hover:border-white/50 cursor-pointer overflow-hidden shadow-xl"
            style={{
              boxShadow: isHovered
                ? `0 0 32px ${tech.color}70, inset 0 0 20px ${tech.color}15, 0 0 60px ${tech.color}40`
                : `0 0 16px rgba(0,0,0,0.5), 0 0 20px ${tech.color}20`,
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-35 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at center, ${tech.color}50 0%, transparent 70%)`,
              }}
            />

            <motion.div
              className="relative z-10"
              animate={{
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.25 : 1,
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              <tech.icon
                size={28}
                style={{
                  color: tech.color,
                  filter: `drop-shadow(0 0 8px ${tech.color}80)`,
                }}
              />
            </motion.div>

            <span className="relative z-10 text-[7px] font-mono uppercase tracking-wider text-white/70 group-hover:text-white mt-1 font-bold text-center leading-none">
              {tech.name}
            </span>
          </div>
        </motion.div>
      </div>
    );
  },
);

TechNode.displayName = "TechNode";

const TechStack = ({ t, lang }: TechStackProps) => {
  const sectionRef = useRef(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [currentRow, setCurrentRow] = useState(0);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const features = t.techStack?.features || [];

  const totalRows = Math.ceil(features.length / 2);
  const visibleRows = 2;

  // Viewport detection with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollNext = useCallback(() => {
    if (currentRow < totalRows - visibleRows) {
      setCurrentRow((prev) => prev + 1);
    }
  }, [currentRow, totalRows, visibleRows]);

  const scrollPrev = useCallback(() => {
    if (currentRow > 0) {
      setCurrentRow((prev) => prev - 1);
    }
  }, [currentRow]);

  // Grid scroll animation - optimized with CSS transform
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.style.transform = `translateY(-${currentRow * 310}px)`;
      gridRef.current.style.transition =
        "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
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

  // Memoize categories to prevent unnecessary re-renders
  const categories = useMemo(
    () => [...new Set(technologies.map((t) => t.category))],
    [],
  );

  // Memoize tech nodes array
  const memoizedTechNodes = useMemo(
    () =>
      isVisible
        ? technologies.map((tech, i) => (
            <TechNode
              key={`${tech.name}-${i}`}
              tech={tech}
              index={i}
              totalTechs={technologies.length}
              hoveredTech={hoveredTech}
              setHoveredTech={setHoveredTech}
            />
          ))
        : null,
    [isVisible, hoveredTech],
  );

  // Trust badges with Lucide icons
  const trustBadges = [
    { text: "24/7 Support", icon: Clock },
    { text: "100% Client Satisfaction", icon: Star },
    { text: "On-Time Delivery", icon: Rocket },
    { text: "Enterprise Grade Security", icon: Lock },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden bg-[#0b0c18]"
    >
      {/* ✅ Particle Network Background - All other backgrounds removed */}
      <ParticleNetwork 
        particleCount={50}
        opacity={0.3}
        glowEffect={true}
        // mouseInfluence={0.4}
        connectionDistance={180}
        className="absolute inset-0 z-0"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* প্রিমিয়াম হেডার */}
        <motion.div
          className="tech-header text-center mb-24"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500" />
            <span className="text-purple-400 text-xs font-mono tracking-[0.3em] uppercase font-bold">
              {lang === "BN" ? "টেকনোলজি স্ট্যাক" : "TECH STACK"}
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500" />
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-hind tracking-tighter mb-6">
            {t.techStack?.title || "The"}{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              {t.techStack?.titleGradient || "Atomic"}
            </span>{" "}
            {t.techStack?.titleEnd || "Stack."}
          </h2>

          <p className="text-white/40 max-w-2xl mx-auto font-hind text-lg font-light">
            {lang === "BN"
              ? "আমরা ব্যবহার করি বিশ্বের সবচেয়ে আধুনিক ও শক্তিশালী টুলস এবং টেকনোলজি"
              : "We use cutting-edge tools & technologies to build exceptional digital experiences"}
          </p>

          {/* অ্যানিমেটেড ডটস - Lucide Sparkles ব্যবহার করে */}
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
                {features.map((feature: any, index: number) => {
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

          {/* ডান পাশ - এন্টারপ্রাইজ অরবিটাল টেক স্ট্যাক */}
          <div className="relative flex items-center justify-center py-12 lg:py-0">
            {/* কন্টেইনড কন্টেইনার - বৃহত্তর */}
            <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center">
              {/* প্রিমিয়াম গ্লো লেয়ার - ParticleNetwork দিয়ে রিপ্লেস করা হয়েছে */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <motion.div
                  className="absolute w-full h-full bg-gradient-to-r from-purple-600/20 via-purple-500/10 to-transparent rounded-full blur-3xl"
                  animate={{
                    scale: [0.9, 1.15, 0.9],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>

              {/* প্রিমিয়াম অরবিট রিংস - স্মুথ রোটেশন */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[
                  { size: 420, duration: 120, direction: 1 },
                  { size: 320, duration: 90, direction: -1 },
                  { size: 200, duration: 60, direction: 1 },
                ].map((ring, idx) => (
                  <motion.div
                    key={ring.size}
                    className="absolute rounded-full border border-white/[0.05] shadow-lg"
                    style={{
                      width: ring.size,
                      height: ring.size,
                      boxShadow: `inset 0 0 30px rgba(139,92,246,0.1)`,
                    }}
                    animate={{
                      rotate: ring.direction === 1 ? 360 : -360,
                    }}
                    transition={{
                      duration: ring.duration,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ))}
              </div>

              {/* প্রিমিয়াম সেন্টার কোর - পালসিং */}
              <div className="absolute inset-0 flex items-center justify-center z-30">
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    scale: [0.98, 1.02, 0.98],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* অ্যানিমেটেড বর্ডার রিং */}
                  <motion.div
                    className="absolute w-48 h-48 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      background:
                        "conic-gradient(from 0deg, #8b5cf6 0%, #ec4899 25%, #22d3ee 50%, #8b5cf6 75%, #8b5cf6 100%)",
                      WebkitMaskImage:
                        "radial-gradient(circle, transparent 88%, black 100%)",
                      maskImage:
                        "radial-gradient(circle, transparent 88%, black 100%)",
                      boxShadow: "0 0 40px rgba(139,92,246,0.4)",
                    }}
                  />

                  {/* মূল কোর বক্স */}
                  <div
                    className="relative w-48 h-48 rounded-full bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80 border-2 border-white/25 backdrop-blur-xl flex flex-col items-center justify-center shadow-2xl overflow-hidden"
                    style={{
                      boxShadow:
                        "0 0 50px rgba(139,92,246,0.3), inset 0 0 30px rgba(139,92,246,0.1)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 to-cyan-500/8" />
                    <div className="relative z-10 text-center">
                      <div
                        className={`text-2xl font-black tracking-tight text-white drop-shadow-lg ${lang === "BN" ? "font-hind" : ""}`}
                      >
                        {t.techStack?.centerText || "MERN+"}
                      </div>
                      <motion.div
                        className="text-[11px] text-purple-300 font-mono font-bold mt-2 tracking-widest drop-shadow-md"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        STACK
                      </motion.div>
                      <div className="mt-4 flex gap-2 justify-center">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"
                            animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* বৃহৎ অরবিটিং টেক নোডস - সিঙ্ক্রোনাইজড সার্কুলার রোটেশন */}
              <motion.div
                className="absolute inset-0"
                animate={isVisible ? { rotate: 360 } : { rotate: 0 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
              >
                {memoizedTechNodes}
              </motion.div>

              {/* প্রিমিয়াম ক্যাটাগরি ব্যাজেস */}
              <motion.div
                className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full flex flex-wrap justify-center gap-2 text-[9px] font-mono px-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {categories.map((category, idx) => (
                  <motion.span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/15 text-white/60 hover:text-white/80 transition-all duration-300 font-semibold cursor-pointer text-nowrap shadow-lg"
                    whileHover={{
                      scale: 1.1,
                      borderColor: categoryColors[category],
                      boxShadow: `0 0 16px ${categoryColors[category]}40`,
                    }}
                  >
                    {category}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* বটম ট্রাস্ট ব্যাজ - সমস্ত ইমোজি সরিয়ে Lucide আইকন ব্যবহার করা হয়েছে */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mt-20 pt-8"
        >
          {trustBadges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all duration-300"
              >
                <Icon size={16} className="text-purple-400" />
                <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider">
                  {badge.text}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;