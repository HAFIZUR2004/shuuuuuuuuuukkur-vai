"use client";

import { useLanguage } from "@/constants/LanguageContext";
import { translations } from "@/constants/translations";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import {
  Star,
  Rocket,
  Trophy,
  Briefcase,
  Clock,
  Users,
  Award,
  LucideIcon,
} from "lucide-react";

// ✅ টাইপ ডিফাইন করুন
interface StatInfo {
  title: string;
  desc: string;
  icon: LucideIcon;
  isCounter: boolean;
  targetValue: number;
  suffix: string;
}

// Helper function for formatted counter
const getFormattedCounter = (value: number, suffix: string) => {
  return `${value}${suffix}`;
};

// Stats configuration
const statsConfig = [
  {
    icon: Clock,
    isCounter: true,
    targetValue: 8,
    suffix: "+",
  },
  {
    icon: Briefcase,
    isCounter: true,
    targetValue: 20,
    suffix: "+",
  },
  {
    icon: Users,
    isCounter: true,
    targetValue: 100,
    suffix: "%",
  },
];

// Card variants for animation
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      type: "spring" as const,
      stiffness: 100,
    },
  }),
};

const SuccessSection = () => {
  const [counters, setCounters] = useState([0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { lang } = useLanguage();
  const t = translations[lang];

  // ✅ FIXED: No any type - proper typing
  const dynamicStatsData: StatInfo[] = useMemo(() => {
    if (lang === "BN" && t.stats && Array.isArray(t.stats)) {
      return t.stats.map(
        (stat: { title: string; desc: string }, idx: number) => ({
          title: stat.title,
          desc: stat.desc,
          icon: [Clock, Briefcase, Users][idx] || Clock,
          isCounter: true,
          targetValue: idx === 2 ? 100 : 8,
          suffix: idx === 2 ? "%" : "+",
        }),
      );
    }
    // Default data for English
    return [
      {
        title: "8+ Years",
        desc: "Of dedicated craft in digital architecture.",
        icon: Clock,
        isCounter: true,
        targetValue: 8,
        suffix: "+",
      },
      {
        title: "20+ Projects",
        desc: "High-impact solutions delivered globally.",
        icon: Briefcase,
        isCounter: true,
        targetValue: 20,
        suffix: "+",
      },
      {
        title: "100% Client",
        desc: "Satisfaction rate across all partnerships.",
        icon: Users,
        isCounter: true,
        targetValue: 100,
        suffix: "%",
      },
    ];
  }, [lang, t.stats]);

  // Scroll animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Counter animation
  useEffect(() => {
    if (inView) {
      statsConfig.forEach((stat, idx) => {
        if (stat.isCounter) {
          let start = 0;
          const end = stat.targetValue;
          const duration = 2000;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCounters((prev) => {
                const newCounters = [...prev];
                newCounters[idx] = end;
                return newCounters;
              });
              clearInterval(timer);
            } else {
              setCounters((prev) => {
                const newCounters = [...prev];
                newCounters[idx] = Math.floor(start);
                return newCounters;
              });
            }
          }, 16);

          return () => clearInterval(timer);
        }
      });
    }
  }, [inView]);

  // Enhanced Particle Network Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    interface ParticleNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
      pulse: number;
    }

    let nodes: ParticleNode[] = [];

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      const nodeCount = Math.min(
        60,
        Math.floor((canvas.width * canvas.height) / 20000),
      );
      nodes = [];

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 2.5 + 1,
          color:
            Math.random() > 0.5
              ? `rgba(196, 181, 253, ${Math.random() * 0.5 + 0.3})`
              : `rgba(165, 243, 252, ${Math.random() * 0.5 + 0.2})`,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (nodes.length === 0) return;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 170) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            const opacity = 0.1 * (1 - distance / 170);
            const gradient = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y,
            );
            gradient.addColorStop(0, `rgba(196, 181, 253, ${opacity})`);
            gradient.addColorStop(1, `rgba(165, 243, 252, ${opacity})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        const pulseRadius = node.r + Math.sin(node.pulse) * 0.4;
        node.pulse += 0.02;

        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        if (node.r > 1.5) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseRadius + 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(196, 181, 253, 0.06)`;
          ctx.fill();
        }

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < -50) node.x = canvas.width + 50;
        if (node.x > canvas.width + 50) node.x = -50;
        if (node.y < -50) node.y = canvas.height + 50;
        if (node.y > canvas.height + 50) node.y = -50;
      });

      animId = requestAnimationFrame(draw);
    };

    setTimeout(() => {
      resize();
      draw();
    }, 100);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Trust badges from translation
  const trustBadges = [
    {
      icon: Trophy,
      text: t.trustBadges?.projectsCompleted || "8+ Projects Completed",
    },
    { icon: Star, text: t.trustBadges?.fiveStarRating || "5 Star Rating" },
    { icon: Rocket, text: t.trustBadges?.onTimeDelivery || "On-Time Delivery" },
    { icon: Award, text: t.trustBadges?.premiumQuality || "Premium Quality" },
  ];

  return (
    <section
      id="success-section"
      ref={(el) => {
        if (el) {
          sectionRef.current = el;
          inViewRef(el);
        }
      }}
      className={`relative bg-[#0b0c18] text-white py-24 px-6 overflow-hidden ${lang === "BN" ? "font-hind" : ""}`}
    >
      {/* Particle Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.5 }}
      />

      {/* Enhanced Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 animate-pulse" />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none z-0 animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-cyan-500/5 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500" />
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] font-semibold">
              {t.successBadge}
            </p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-tight">
              <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                {t.successTitle}
              </span>
              <br />
              <span className="relative inline-block mt-2">
                <span className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 blur-2xl" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-400">
                  {t.successTitleGradient}
                </span>
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-white/40 text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            {t.successDescription}
          </motion.p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {statsConfig.map((config, i) => {
            const IconComponent = config.icon;
            const counterValue = counters[i];
            const statInfo = dynamicStatsData[i];

            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -10 }}
                transition={{ delay: i * 0.15 }}
                className="group relative rounded-3xl bg-white/[0.02] backdrop-blur-sm border border-white/5 overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative p-8 md:p-10 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: i * 0.1 + 0.3,
                      type: "spring" as const,
                      stiffness: 200,
                    }}
                    viewport={{ once: true }}
                    className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/10 group-hover:scale-110 transition-transform duration-300"
                  >
                    <IconComponent
                      className="w-8 h-8 text-white/80 group-hover:text-cyan-400 transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.4 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black mb-3 tracking-tight"
                  >
                    <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                      {getFormattedCounter(counterValue, config.suffix)}
                    </span>
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.45 }}
                    viewport={{ once: true }}
                    className="text-white/60 text-sm font-semibold mb-2"
                  >
                    {statInfo?.title}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                    className="text-white/40 text-xs leading-relaxed max-w-[200px] mx-auto"
                  >
                    {statInfo?.desc}
                  </motion.p>

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 60 }}
                    transition={{ delay: i * 0.1 + 0.6, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="h-[2px] bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mt-6 mx-auto group-hover:w-24 transition-all duration-500"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mt-16 pt-8 border-t border-white/5"
        >
          {trustBadges.map((badge, idx) => {
            const BadgeIcon = badge.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all duration-300"
              >
                <BadgeIcon
                  className="w-4 h-4 text-cyan-400"
                  strokeWidth={1.5}
                />
                <span className="text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-wider whitespace-nowrap">
                  {badge.text}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SuccessSection;
