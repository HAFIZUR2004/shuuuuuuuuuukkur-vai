"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { translations } from "@/constants/translations";

import {
  FaGithub,
  FaLinkedinIn,
  FaChevronUp,
  FaShieldAlt,
  FaFacebookF,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { useLanguage } from "@/constants/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentYear = new Date().getFullYear();
  const { lang } = useLanguage();
  const t = translations[lang];

  // Abstract Wireframe Canvas Effect (শুধু লাইন + ডটস, কোন BG নেই)
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
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      nodes = Array.from({ length: 35 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.2 + 0.6,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines (wireframe)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const opacity = 0.2 * (1 - d / 100);
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(16, 185, 129, 0.4)";
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(16, 185, 129, 0.8)";
        ctx.fill();

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < -20) n.x = canvas.width + 20;
        if (n.x > canvas.width + 20) n.x = -20;
        if (n.y < -20) n.y = canvas.height + 20;
        if (n.y > canvas.height + 20) n.y = -20;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const refreshTrigger = () => ScrollTrigger.refresh();
    const ctx = gsap.context(() => {
      gsap.from(".reveal-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 92%",
          onEnter: refreshTrigger,
        },
      });
    }, footerRef);

    window.addEventListener("load", refreshTrigger);
    return () => {
      ctx.revert();
      window.removeEventListener("load", refreshTrigger);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative text-white pt-20 pb-10 px-6 md:px-12 overflow-hidden border-t border-white/10"
      style={{
        background: 'linear-gradient(135deg, #03050b 0%, #0a0c18 50%, #02040a 100%)'
      }}
    >
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2310b981' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '30px 30px'
        }}
      />

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/5 via-transparent to-transparent pointer-events-none z-0" />

      {/* Abstract Wireframe Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0"
      />

      <div className="relative z-10 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-5 space-y-6 reveal-item">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 rounded-xl p-1 border border-emerald-500/30">
                <Image
                  src="https://i.postimg.cc/yYds37Q3/logo-preview.png"
                  alt="Logo"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-black italic leading-none tracking-tight bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
                  GROW
                </h2>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">
                  Business Solutions
                </span>
              </div>
            </div>
            <p className="text-base text-white/50 leading-relaxed max-w-sm">
              {t.footerDesc || "Enterprise-grade web solutions for the modern era. Trusted by government projects and global businesses."}
            </p>
            {/* Trust Badge */}
            <div className="flex items-center gap-2 pt-1">
              <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono text-emerald-400/50 tracking-[0.2em]">OPERATIONAL_READINESS</span>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 reveal-item">
            <div className="space-y-4">
              <h4 className="text-[11px] font-mono text-emerald-400 uppercase font-bold tracking-[0.2em]">
                {t.solutions || "SOLUTIONS"}
              </h4>
              <ul className="space-y-3 text-sm font-medium text-white/40">
                {[
                  t.development || "Development", 
                  t.strategy || "Strategy", 
                  t.security || "Security"
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="hover:text-emerald-400 transition-all duration-300 cursor-pointer flex items-center gap-2 group"
                  >
                    <span className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[11px] font-mono text-emerald-400 uppercase font-bold tracking-[0.2em]">
                {t.protocol || "PROTOCOL"}
              </h4>
              <ul className="space-y-3 text-sm font-medium text-white/40">
                {[
                  t.corev3 || "Core v3.0", 
                  t.uptime || "99.99% Uptime", 
                  t.nodes || "Global Nodes"
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="hover:text-emerald-400 transition-all duration-300 cursor-pointer flex items-center gap-2 group"
                  >
                    <span className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-6 reveal-item lg:text-right">
            <h4 className="text-[11px] font-mono text-emerald-400 uppercase font-bold tracking-[0.2em]">
              {t.terminal || "CONNECT"}
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:growbusinesssolutionsbd@gmail.com"
                className="text-base font-semibold block hover:text-emerald-400 transition-colors break-all"
              >
                growbusinesssolutionsbd@gmail.com
              </a>
              <p className="text-[10px] text-white/30 font-mono tracking-wider">
                response: &lt; 24h
              </p>
              <div className="flex gap-3 lg:justify-end">
                {[
                  { Icon: FaFacebookF, url: "https://www.facebook.com/growbusinesssolutionsbd" },
                  { Icon: FaGithub, url: "https://github.com/Grow-Businesssolutionsbd" },
                  { Icon: FaXTwitter, url: "https://x.com/GrowBS_BD" },
                  { Icon: FaInstagram, url: "https://www.instagram.com/growbusinesssolutions/" },
                  { Icon: FaLinkedinIn, url: "https://www.linkedin.com/company/grow-business-solutionsbd/" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-emerald-500 hover:border-emerald-500 hover:text-black transition-all duration-300 group"
                  >
                    <social.Icon size={14} className="transition-transform group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="reveal-item relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="reveal-item flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-[9px] font-mono text-white/20 uppercase tracking-widest">
            <span>© {currentYear} GROW_BUSINESS_SOLUTIONS</span>
            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1">
              <FaShieldAlt size={8} /> ENCRYPTED_v4
            </span>
            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-white/20" />
            <span>BUILT_WITH_MERN</span>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[10px] font-bold text-white/30 hover:text-white transition-all uppercase tracking-wider"
          >
            <span>{t.returnTop || "BACK TO TOP"}</span>
            <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-black transition-all duration-300">
              <FaChevronUp size={11} className="group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>

        {/* Bottom Tagline */}
        <div className="text-center mt-8">
          <p className="text-[7px] text-white/10 font-mono tracking-[0.3em] uppercase">
            ENGINEERING DIGITAL ECOSYSTEMS FOR THE MODERN ERA
          </p>
        </div>
      </div>
    </footer>
  );
}