"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, IconDefinition } from "@fortawesome/free-brands-svg-icons";
import {
  faExternalLinkAlt,
  faMicrochip,
  faDatabase,
  faShieldAlt,
  faBolt,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "@/constants/LanguageContext";
import { translations } from "@/constants/translations";

const iconMap: Record<string, IconDefinition> = {
  faLayerGroup: faLayerGroup,
  faDatabase: faDatabase,
  faMicrochip: faMicrochip,
  faBolt: faBolt,
  faShieldAlt: faShieldAlt,
};

const colorMap = {
  purple: {
    bg: "bg-purple-500/5",
    hoverBg: "group-hover:bg-purple-500/10",
    text: "text-purple-400",
    accent: "text-purple-500/80",
    gradient: "from-purple-500/20 to-transparent",
    border: "border-purple-500/20",
    glow: "shadow-purple-500/20",
  },
  cyan: {
    bg: "bg-cyan-500/5",
    hoverBg: "group-hover:bg-cyan-500/10",
    text: "text-cyan-400",
    accent: "text-cyan-500/80",
    gradient: "from-cyan-500/20 to-transparent",
    border: "border-cyan-500/20",
    glow: "shadow-cyan-500/20",
  },
  blue: {
    bg: "bg-blue-500/5",
    hoverBg: "group-hover:bg-blue-500/10",
    text: "text-blue-400",
    accent: "text-blue-500/80",
    gradient: "from-blue-500/20 to-transparent",
    border: "border-blue-500/20",
    glow: "shadow-blue-500/20",
  },
  emerald: {
    bg: "bg-emerald-500/5",
    hoverBg: "group-hover:bg-emerald-500/10",
    text: "text-emerald-400",
    accent: "text-emerald-500/80",
    gradient: "from-emerald-500/20 to-transparent",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/20",
  },
};

interface PortfolioItem {
  _id: string;
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  icon: string;
  colorKey: string;
  stats: string;
  image: string;
  imageAlt: string;
  github?: string;
  liveUrl?: string;
}

// Dummy Data for fallback
const dummyProjects: PortfolioItem[] = [
  {
    _id: "1",
    id: "01",
    title: "AI Content Generator",
    category: "Web App",
    description:
      "An intelligent platform that generates SEO-optimized content using GPT-4 with real-time analytics.",
    tech: ["React", "Node.js", "OpenAI", "Tailwind"],
    icon: "faMicrochip",
    colorKey: "purple",
    stats: "Production Ready",
    image: "https://placehold.co/800x600/1a1a2e/ffffff?text=AI+Project",
    imageAlt: "AI Content Generator",
    github: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    _id: "2",
    id: "02",
    title: "DeFi Dashboard",
    category: "Blockchain",
    description:
      "Real-time DeFi analytics with wallet integration, portfolio tracking, and cross-chain support.",
    tech: ["Next.js", "Web3.js", "Solidity", "Ethers"],
    icon: "faDatabase",
    colorKey: "cyan",
    stats: "Audited",
    image: "https://placehold.co/800x600/1a1a2e/ffffff?text=DeFi+Dashboard",
    imageAlt: "DeFi Dashboard",
    github: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    _id: "3",
    id: "03",
    title: "Cyber Security Suite",
    category: "Security",
    description:
      "Advanced vulnerability scanner with real-time threat detection and automated reporting system.",
    tech: ["Python", "Django", "PostgreSQL", "Docker"],
    icon: "faShieldAlt",
    colorKey: "emerald",
    stats: "ISO Certified",
    image: "https://placehold.co/800x600/1a1a2e/ffffff?text=Security+Suite",
    imageAlt: "Cyber Security Suite",
    github: "https://github.com",
  },
  {
    _id: "4",
    id: "04",
    title: "E-Commerce Platform",
    category: "E-Commerce",
    description:
      "Full-featured e-commerce solution with payment gateway, inventory management, and analytics.",
    tech: ["Next.js", "Stripe", "MongoDB", "Redis"],
    icon: "faBolt",
    colorKey: "blue",
    stats: "10K+ Users",
    image: "https://placehold.co/800x600/1a1a2e/ffffff?text=E-Commerce",
    imageAlt: "E-Commerce Platform",
    liveUrl: "https://example.com",
  },
  {
    _id: "5",
    id: "05",
    title: "Mobile Banking App",
    category: "Mobile",
    description:
      "Secure and user-friendly mobile banking application with biometric authentication.",
    tech: ["React Native", "Node.js", "MongoDB", "Express"],
    icon: "faDatabase",
    colorKey: "cyan",
    stats: "50K+ Downloads",
    image: "https://placehold.co/800x600/1a1a2e/ffffff?text=Banking+App",
    imageAlt: "Mobile Banking App",
    github: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    _id: "6",
    id: "06",
    title: "Healthcare Portal",
    category: "Healthcare",
    description:
      "Complete healthcare management system with appointment scheduling and telemedicine.",
    tech: ["Next.js", "PostgreSQL", "Tailwind", "Prisma"],
    icon: "faShieldAlt",
    colorKey: "emerald",
    stats: "HIPAA Compliant",
    image: "https://placehold.co/800x600/1a1a2e/ffffff?text=Healthcare+Portal",
    imageAlt: "Healthcare Portal",
    liveUrl: "https://example.com",
  },
];

export default function DynamicPortfolioPage() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const portfolioText = t.portfolioPage;

  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!headerRef.current) return;

    const handleScroll = () => {
      const element = headerRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const startOffset = rect.top;
      const endOffset = rect.height;
      const scrollPosition = window.scrollY;

      let progress = (scrollPosition - startOffset) / endOffset;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch data from API - Show ALL projects (no limit)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/portfolio");
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(dummyProjects);
        }
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setProjects(dummyProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Enhanced Particle Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
      pulse: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const nodeCount = window.innerWidth < 768 ? 45 : 90;
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2.5 + 1,
        color:
          Math.random() > 0.6
            ? "rgba(168, 85, 247, 0.5)"
            : "rgba(34, 211, 238, 0.4)",
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const gradient = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y,
            );
            gradient.addColorStop(
              0,
              `rgba(168, 85, 247, ${0.12 * (1 - dist / 150)})`,
            );
            gradient.addColorStop(
              1,
              `rgba(34, 211, 238, ${0.12 * (1 - dist / 150)})`,
            );
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const pulseRadius = n.r + Math.sin(n.pulse) * 0.5;
        n.pulse += 0.02;

        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseRadius + 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, 0.03)`;
        ctx.fill();

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < -50) n.x = canvas.width + 50;
        if (n.x > canvas.width + 50) n.x = -50;
        if (n.y < -50) n.y = canvas.height + 50;
        if (n.y > canvas.height + 50) n.y = -50;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [loading]);

  const headerY = 1 - scrollProgress * 200;
  const headerOpacity = 1 - scrollProgress * 2;

  if (loading)
    return (
      <div className="min-h-screen bg-[#0b0c18] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-cyan-500/30 border-b-cyan-500 rounded-full animate-spin"
            style={{ animationDirection: "reverse" }}
          />
        </div>
      </div>
    );

  return (
    <div className="relative bg-[#0b0c18] text-white py-20 px-6 overflow-hidden min-h-screen font-sans">
      {/* Enhanced Particle Network Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-70"
      />

      {/* Static Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#0b0c18_95%)]" />
      </div>

      {/* Gradient Glows */}
      <div className="fixed top-[-20%] left-[-20%] w-[60%] h-[60%] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none z-0 animate-pulse" />
      <div
        className="fixed bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-cyan-900/15 blur-[150px] rounded-full pointer-events-none z-0 animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      {/* Content Area */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Header Section */}
        <motion.div
          ref={headerRef}
          animate={{
            y: headerY,
            opacity: headerOpacity,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-20 md:mb-32 text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-6 mx-auto md:mx-0"
          >
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500" />
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] font-semibold">
              {portfolioText.badge}
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter uppercase leading-[0.85]">
              <span className="block bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                {portfolioText.title}
              </span>
              <span className="relative inline-block mt-2 md:mt-4">
                <span className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 blur-2xl" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-400">
                  {portfolioText.titleGradient}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/40 text-sm md:text-base max-w-2xl mx-auto md:mx-0 mt-6 leading-relaxed"
          >
            {portfolioText.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-10 mt-8"
          >
            {[
              {
                value: projects.length,
                label: portfolioText.stats.totalProjects,
                suffix: "+",
              },
              { value: "100%", label: portfolioText.stats.clientSatisfaction },
              { value: "24/7", label: portfolioText.stats.support },
            ].map((stat, idx) => (
              <div key={idx} className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  {stat.value}
                  {stat.suffix || ""}
                </div>
                <div className="text-[10px] md:text-xs text-white/30 font-mono uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-white/60 text-xl mb-2">
              {portfolioText.noProjects}
            </p>
            <p className="text-white/40">{portfolioText.noProjectsDesc}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project, idx) => {
                const colors =
                  colorMap[project.colorKey as keyof typeof colorMap] ||
                  colorMap.purple;
                const IconComponent = iconMap[project.icon] || faLayerGroup;

                return (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      delay: idx * 0.05,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{ y: -8 }}
                    className="group relative rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/5 overflow-hidden hover:border-white/15 transition-all duration-500 hover:shadow-2xl"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-[#0b0c18] via-transparent to-transparent z-10`}
                      />
                      <Image
                        src={
                          project.image ||
                          "https://placehold.co/800x600/1a1a2e/ffffff?text=Project+Image"
                        }
                        alt={project.imageAlt}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://placehold.co/800x600/1a1a2e/ffffff?text=Project+Image";
                        }}
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span
                          className={`px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase border ${colors.border} ${colors.text}`}
                        >
                          {project.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    </div>

                    <div className="p-6 relative">
                      <div className="flex justify-between items-start mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${colors.text} border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                        >
                          <FontAwesomeIcon
                            icon={IconComponent}
                            className="text-xl"
                          />
                        </div>
                        <div className="flex gap-2">
                          {project.github && (
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              className="text-white/20 hover:text-white transition-colors"
                            >
                              <FontAwesomeIcon
                                icon={faGithub}
                                className="text-lg"
                              />
                            </motion.a>
                          )}
                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              className="text-white/20 hover:text-white transition-colors"
                            >
                              <FontAwesomeIcon
                                icon={faExternalLinkAlt}
                                className="text-base"
                              />
                            </motion.a>
                          )}
                        </div>
                      </div>

                      <h3
                        className={`text-xl font-bold mb-2 transition-colors duration-300 ${colors.text}`}
                      >
                        {project.title}
                      </h3>
                      <p className="text-white/40 text-xs leading-relaxed mb-4 font-light line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-lg bg-white/5 text-[8px] font-mono text-white/40 uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="px-2 py-0.5 rounded-lg bg-white/5 text-[8px] font-mono text-white/40 uppercase tracking-wider">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Project Count Footer */}
            <div className="text-center mt-12 pt-8 border-t border-white/5">
              <p className="text-white/30 text-xs font-mono uppercase tracking-wider">
                {portfolioText.showing} {projects.length}{" "}
                {projects.length !== 1
                  ? portfolioText.projects
                  : portfolioText.project}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
