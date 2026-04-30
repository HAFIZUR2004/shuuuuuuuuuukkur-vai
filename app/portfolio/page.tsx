"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/constants/LanguageContext";
import { translations } from "@/constants/translations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// API Response Type
interface PortfolioItem {
  _id: string;
  id: string;
  category?: string;
  title: string;
  description: string;
  tech: string[];
  colorKey?: string;
  image?: string;
  imageAlt: string;
}

interface ProjectType {
  _id: string;
  id: string;
  tag?: string;
  title: string;
  description: string;
  tech: string[];
  color: string;
  image: string;
  imageAlt: string;
  category?: string;
  colorKey?: string;
}

// লোকালাইজেশন টাইপ
interface PortfolioTranslation {
  badge: string;
  title: string;
  titleGradient: string;
  desc?: string;
  exploreBtn?: string;
  loading?: string;
  noProjects?: string;
  noProjectsDesc?: string;
  loadingTexts?: string[];
  pleaseWait?: string;
  complete?: string;
}

// কালার ম্যাপিং
const colorMap: Record<string, string> = {
  purple: "#b5a7ff",
  cyan: "#3ee8f6",
  blue: "#60a5fa",
  emerald: "#34d399",
  default: "#b5a7ff",
};

export default function HomePage() {
  const { lang } = useLanguage();
  const t = translations[lang] as any;

  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/portfolio");
        if (!response.ok) throw new Error("Failed to fetch");
        const data: PortfolioItem[] = await response.json();

        // ডাটাকে হোম পেজের ফরম্যাটে কনভার্ট করুন
        const formattedProjects: ProjectType[] = data.map(
          (item: PortfolioItem) => ({
            _id: item._id,
            id: item.id,
            tag: item.category,
            title: item.title,
            description: item.description,
            tech: item.tech,
            color: colorMap[item.colorKey ?? "default"],
            image: item.image?.trim() || "",
            imageAlt: item.imageAlt,
            category: item.category,
            colorKey: item.colorKey,
          }),
        );

        setProjects(formattedProjects);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Particle Network Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    interface NodeType {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
    }

    let nodes: NodeType[] = [];

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      nodes = Array.from({ length: 55 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2.5 + 0.8,
        color:
          Math.random() > 0.6
            ? "rgba(181, 167, 255, 0.5)"
            : "rgba(62, 232, 246, 0.4)",
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(
            nodes[i].x - nodes[j].x,
            nodes[i].y - nodes[j].y,
          );
          if (d < 160) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const opacity = 0.1 * (1 - d / 160);

            const gradient = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y,
            );
            gradient.addColorStop(0, "rgba(181, 167, 255, " + opacity + ")");
            gradient.addColorStop(1, "rgba(62, 232, 246, " + opacity + ")");

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        if (n.r > 1.8) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(181, 167, 255, 0.08)`;
          ctx.fill();
        }

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) {
          n.x = 0;
          n.vx *= -1;
        }
        if (n.x > canvas.width) {
          n.x = canvas.width;
          n.vx *= -1;
        }
        if (n.y < 0) {
          n.y = 0;
          n.vy *= -1;
        }
        if (n.y > canvas.height) {
          n.y = canvas.height;
          n.vy *= -1;
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (loading || projects.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(".portfolio-title", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      const validCards = cardRefs.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );

      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 50, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.2,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, projects]);

  // Loading State - Fixed version
  if (loading) {
    return (
      <section className="relative bg-[#0b0c18] px-6 overflow-hidden py-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">
            {t?.portfolio?.loading || 
             t?.portfolio?.loadingTexts?.[0] || 
             "Loading amazing projects..."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0b0c18] px-6 overflow-hidden py-20"
    >
      {/* Particle Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
      />

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none z-0" />

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="mb-24 portfolio-title">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-[1px] w-12 bg-cyan-500" />
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.5em]">
              {t?.portfolio?.badge || "Selected Works"}
            </p>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            {t?.portfolio?.title || "Digital"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 italic font-light">
              {t?.portfolio?.titleGradient || "Artifacts."}
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.slice(0, 6).map((project, idx) => (
            <div
              key={project._id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="group relative bg-[#121323] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500"
            >
              {/* Image Section */}
              <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
                <Image
                  src={
                    project.image ||
                    "https://placehold.co/600x400/1a1a2e/ffffff?text=Project+Image"
                  }
                  alt={project.imageAlt || project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://placehold.co/600x400/1a1a2e/ffffff?text=Project+Image";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121323] via-transparent to-transparent opacity-60" />

                {/* Overlay Color */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: project.color }}
                />
              </div>

              {/* Content Section */}
              <div className="relative p-8">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${project.color}10, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-4xl font-black text-white/5">
                      {project.id}
                    </span>

                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 group-hover:rotate-45 transition-transform duration-500"
                      style={{ color: project.color }}
                    >
                      ↗
                    </div>
                  </div>

                  <p
                    className="font-mono text-[10px] uppercase tracking-widest mb-2"
                    style={{ color: project.color }}
                  >
                    {project.tag}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((techName) => (
                      <span
                        key={techName}
                        className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[10px] text-white/60 font-mono"
                      >
                        {techName}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[10px] text-white/60 font-mono">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center portfolio-title">
          <Link href="/projects">
            <button className="group relative px-8 py-4 bg-transparent border border-white/10 overflow-hidden rounded-full transition-all duration-300 hover:border-cyan-500/50">
              <span className="relative z-10 text-white/80 font-mono text-xs uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                {t?.portfolio?.exploreBtn || "Explore All Artifacts"}
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.02] transition-opacity" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}