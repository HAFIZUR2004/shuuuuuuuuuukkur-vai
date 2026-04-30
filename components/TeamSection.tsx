"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FiArrowRight,
  FiGithub,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";
import { useLanguage } from "@/constants/LanguageContext";
import { translations } from "@/constants/translations";

// ✅ টাইপ ডিফাইন করুন
interface SocialLinks {
  twitter: string;
  github: string;
  linkedin: string;
  instagram: string;
}

interface TeamMember {
  name: string;
  role: string;
  company: string;
  image: string;
  social: SocialLinks;
}

const SocialLink = ({
  href,
  icon,
  bgColor,
}: {
  href: string;
  icon: React.ReactNode;
  bgColor: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex-1 flex items-center justify-center text-white/60 text-xl transition-all duration-300 ${bgColor} hover:text-white`}
  >
    {icon}
  </a>
);

const TeamSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { lang } = useLanguage();
  const t = translations[lang];

  const teamData = t.teamHorizontal;
  const members: TeamMember[] = teamData.members;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.95, 1, 1, 0.95],
  );

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  // Particle Network Canvas Effect
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

            const op = 0.1 * (1 - distance / 170);
            const gradient = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y,
            );
            gradient.addColorStop(0, `rgba(196, 181, 253, ${op})`);
            gradient.addColorStop(1, `rgba(165, 243, 252, ${op})`);

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

  return (
    <section
      ref={containerRef}
      className={`relative bg-[#0b0c18] py-24 px-6 md:px-10 overflow-hidden ${lang === "BN" ? "font-hind" : ""}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.5 }}
      />

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 animate-pulse" />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none z-0 animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-cyan-500/5 blur-[100px] rounded-full pointer-events-none z-0" />

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
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500" />
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] font-semibold">
              {teamData.badge}
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
                {teamData.title}
              </span>
              <br />
              <span className="relative inline-block mt-2">
                <span className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 blur-2xl" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-400">
                  {teamData.titleGradient}
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
            {teamData.description}
          </motion.p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={scrollPrev}
            className="group flex items-center justify-center w-12 h-12 bg-white/[0.05] border border-white/10 rounded-full shadow-sm hover:bg-cyan-500/20 hover:text-white hover:border-cyan-500/50 transition-all duration-300"
          >
            <FiArrowRight
              size={20}
              className="rotate-180 text-white/60 group-hover:text-cyan-400 group-hover:-translate-x-1 transition-transform"
            />
          </button>

          <button
            onClick={scrollNext}
            className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 border border-purple-500/30 rounded-full shadow-sm hover:bg-gradient-to-r hover:from-purple-600/40 hover:to-cyan-500/40 transition-all duration-300"
          >
            <FiArrowRight
              size={20}
              className="text-white/80 group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-10 hide-scrollbar"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* ✅ any সরিয়ে TeamMember টাইপ ব্যবহার করা হয়েছে */}
          {members.map((member: TeamMember, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="min-w-[320px] md:min-w-[360px] bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl group relative overflow-hidden hover:border-purple-500/30 transition-all duration-500"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="relative h-[380px] w-full overflow-hidden bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
                <Image
                  src={member.image || "/team/placeholder.jpg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/team/placeholder.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c18] via-[#0b0c18]/40 to-transparent opacity-60" />
              </div>

              <div className="p-6 bg-transparent">
                <h3 className="text-2xl font-semibold text-white leading-tight">
                  {member.name.split(" ")[0]}{" "}
                  <span className="font-light text-white/50">
                    {member.name.split(" ").slice(1).join(" ")}
                  </span>
                </h3>
                <p
                  className={`text-cyan-400 mt-2 text-sm font-medium ${lang === "BN" ? "font-hind" : ""}`}
                >
                  {member.role}
                </p>
                <p className="text-white/30 text-xs mt-1">{member.company}</p>
              </div>

              <div className="absolute top-0 left-0 w-full h-14 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-sm -translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out flex z-20">
                <SocialLink
                  href={member.social.twitter}
                  icon={<FiTwitter />}
                  bgColor="hover:bg-[#1DA1F2]"
                />
                <SocialLink
                  href={member.social.github}
                  icon={<FiGithub />}
                  bgColor="hover:bg-[#333]"
                />
                <SocialLink
                  href={member.social.linkedin}
                  icon={<FiLinkedin />}
                  bgColor="hover:bg-[#0077B5]"
                />
                <SocialLink
                  href={member.social.instagram}
                  icon={<FiInstagram />}
                  bgColor="hover:bg-gradient-to-r from-[#833AB4] via-[#E4405F] to-[#F56040]"
                />
              </div>

              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center z-10">
                <span className="text-cyan-400 text-xs font-mono">
                  0{idx + 1}
                </span>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-500/10 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8 gap-2"
        >
          <div className="flex gap-2">
            {members.map((_, idx) => (
              <div
                key={idx}
                className="w-1.5 h-1.5 rounded-full bg-white/20 transition-all duration-300 hover:bg-cyan-400 hover:w-3 cursor-pointer"
                onClick={() => {
                  if (scrollRef.current) {
                    scrollRef.current.scrollTo({
                      left: idx * 368,
                      behavior: "smooth",
                    });
                  }
                }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mt-16 pt-8 border-t border-white/5"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider">
              {teamData.systemStatus}
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider">
              {teamData.allNodesActive}
            </span>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
