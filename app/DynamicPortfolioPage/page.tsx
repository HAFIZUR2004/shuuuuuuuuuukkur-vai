"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faExternalLinkAlt,
  faMicrochip,
  faDatabase,
  faShieldAlt,
  faBolt,
  faLayerGroup,
  faArrowRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useLanguage } from "@/constants/LanguageContext";
import { translations } from "@/constants/translations";

// ✅ ParticleNetwork ইম্পোর্ট করা হয়েছে
import ParticleNetwork from "@/components/ParticleNetwork";

// ✅ Icon Map with proper type
const iconMap: Record<string, IconDefinition> = {
  faLayerGroup: faLayerGroup,
  faDatabase: faDatabase,
  faMicrochip: faMicrochip,
  faBolt: faBolt,
  faShieldAlt: faShieldAlt,
};

// ✅ Color Map type
interface ColorStyles {
  bg: string;
  hoverBg: string;
  text: string;
  accent: string;
  gradient: string;
  border: string;
  glow: string;
}

const colorMap: Record<string, ColorStyles> = {
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
const dummyProjects: PortfolioItem[] = [];

interface DynamicPortfolioPageProps {
  t?: any;
  lang?: string;
}

export default function DynamicPortfolioPage({
  t: propT,
  lang: propLang,
}: DynamicPortfolioPageProps) {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<PortfolioItem[]>([]);
  const [showAll, setShowAll] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const context = useLanguage();
  const lang = propLang || context.lang;
  const t = propT || translations[lang as keyof typeof translations];
  const portfolio = t.portfolio;

  // Fetch data from API - Show ALL projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/portfolio");
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          // Initially show only first 3 projects
          setVisibleProjects(data.slice(0, 3));
        } else {
          setProjects(dummyProjects);
          setVisibleProjects(dummyProjects.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setProjects(dummyProjects);
        setVisibleProjects(dummyProjects.slice(0, 3));
      }
    };
    fetchProjects();
  }, []);

  // Handle Show More
  const handleShowMore = () => {
    setVisibleProjects(projects);
    setShowAll(true);
  };

  return (
    <div
      className={`relative bg-[#0b0c18] text-white py-8 px-6 overflow-hidden min-h-screen ${lang === "BN" ? "font-hind" : "font-sans"}`}
    >
      {/* ✅ Particle Network Background */}
      <ParticleNetwork
        particleCount={70}
        opacity={0.5}
        glowEffect={true}
        // mouseInfluence={0.4}
        connectionDistance={180}
        className="absolute inset-0 z-0"
      />

      {/* Content Area */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Header Section */}
        <div className="mb-6 md:mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-3"
          >
            <div className="h-px w-6 bg-cyan-500/30" />
            <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.2em] font-semibold">
              {portfolio?.badge || "OUR PORTFOLIO"}
            </span>
            <div className="h-px w-6 bg-cyan-500/30" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter uppercase leading-[1.1]">
              <span className="block text-white">
                {portfolio?.title || "CREATIVE"}
              </span>
              <span className="relative inline-block mt-1">
                <span className="absolute -inset-3 bg-purple-600/20 blur-2xl" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-400">
                  {portfolio?.titleGradient || "ARTIFACTS"}
                </span>
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/40 text-xs md:text-sm max-w-2xl mx-auto mt-2 leading-relaxed"
          >
            {portfolio?.desc ||
              "Explore our collection of digital masterpieces — each project represents a unique challenge solved with creativity and technical excellence."}
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mt-3"
          >
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-white">
                {projects.length}+
              </div>
              <div className="text-[8px] md:text-[9px] text-white/30 font-mono uppercase tracking-wider">
                PROJECTS DELIVERED
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-white">
                100%
              </div>
              <div className="text-[8px] md:text-[9px] text-white/30 font-mono uppercase tracking-wider">
                CLIENT SATISFACTION
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-white">
                24/7
              </div>
              <div className="text-[8px] md:text-[9px] text-white/30 font-mono uppercase tracking-wider">
                SUPPORT
              </div>
            </div>
          </motion.div>
        </div>

        {/* Projects Grid */}
        {visibleProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-3">📁</div>
            <p className="text-white/60 text-lg mb-1">
              {portfolio?.noProjects || "No projects found."}
            </p>
            <p className="text-white/40 text-sm">
              {portfolio?.noProjectsDesc ||
                "Add some projects from the admin dashboard to see them here."}
            </p>
          </div>
        ) : (
          <>
            {/* Counter Badge */}
            <div className="text-center mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[9px] font-mono text-white/50 uppercase tracking-wider">
                  {showAll ? projects.length : Math.min(visibleProjects.length, 3)}{" "}
                  {projects.length !== 1 ? "PROJECTS" : "PROJECT"}
                  {!showAll && projects.length > 3 && ` (Showing ${Math.min(3, projects.length)} of ${projects.length})`}
                </span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProjects.map((project, idx) => {
                const colors =
                  colorMap[project.colorKey as keyof typeof colorMap] ||
                  colorMap.purple;
                const IconComponent = iconMap[project.icon] || faLayerGroup;

                return (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      delay: idx * 0.05,
                      duration: 0.5,
                    }}
                    whileHover={{ y: -5 }}
                    className="group relative rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/5 overflow-hidden hover:border-white/15 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={
                          project.image ||
                          "https://placehold.co/800x600/1a1a2e/ffffff?text=Project+Image"
                        }
                        alt={project.imageAlt}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://placehold.co/800x600/1a1a2e/ffffff?text=Project+Image";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c18] via-transparent to-transparent z-10" />
                      <div className="absolute top-3 left-3 z-20">
                        <span
                          className={`px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[8px] font-bold tracking-wider uppercase border ${colors.border} ${colors.text}`}
                        >
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div
                          className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${colors.text} border border-white/10 group-hover:scale-105 transition-all duration-300`}
                        >
                          <FontAwesomeIcon
                            icon={IconComponent}
                            className="text-base"
                          />
                        </div>
                        <div className="flex gap-2">
                          {project.github && (
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              className="text-white/30 hover:text-white transition-colors"
                            >
                              <FontAwesomeIcon
                                icon={faGithub}
                                className="text-sm"
                              />
                            </motion.a>
                          )}
                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              className="text-white/30 hover:text-white transition-colors"
                            >
                              <FontAwesomeIcon
                                icon={faExternalLinkAlt}
                                className="text-xs"
                              />
                            </motion.a>
                          )}
                        </div>
                      </div>

                      <h3
                        className={`text-lg font-bold mb-1.5 transition-colors duration-300 ${colors.text}`}
                      >
                        {project.title}
                      </h3>
                      <p className="text-white/40 text-[11px] leading-relaxed mb-3 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded bg-white/5 text-[7px] font-mono text-white/40 uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="px-2 py-0.5 rounded bg-white/5 text-[7px] font-mono text-white/40">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}

        {/* Show More Button - Only show if there are more than 3 projects and not showing all */}
        {projects.length > 3 && !showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-8"
          >
            <motion.button
              onClick={handleShowMore}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-3 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 backdrop-blur-sm border border-white/10 rounded-full transition-all duration-300 hover:border-purple-500/50"
            >
              <span className="text-white/70 font-mono text-[10px] uppercase tracking-wider group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                SHOW MORE PROJECTS
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="text-[10px] group-hover:translate-y-1 transition-transform"
                />
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* View All Projects Button - Only show when showing all projects */}
        {showAll && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-8"
          >
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-3 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 backdrop-blur-sm border border-white/10 rounded-full transition-all duration-300 hover:border-purple-500/50"
              >
                <span className="text-white/70 font-mono text-[10px] uppercase tracking-wider group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                  VIEW ALL PROJECTS
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-[10px] group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}