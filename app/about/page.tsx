"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Link from 'next/link';

import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2, Atom, Terminal, Database, Server, FileJson, Globe, ShieldCheck,
  Rocket, Layers, Search, Cpu, Award, Users, TrendingUp, Zap,
  GitBranch, Layout, Sparkles, Braces, Cloud,
  Lock, Workflow, Eye, BarChart3, CheckCircle, Briefcase, Building2,
  HardDrive, Network, Boxes, Cable
} from "lucide-react";
import { FaAws, FaFigma, FaDocker } from "react-icons/fa";
import { SiTailwindcss, SiGraphql, SiExpress } from "react-icons/si";
import ParticleNetwork from "@/components/ParticleNetwork";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- EXPANDED TECH STACK WITH MIXED ICONS ---
const technologies = [
  { name: "Next.js", color: "#ffffff", orbit: 210, speed: 45, icon: Code2, isReactIcon: false },
  { name: "React", color: "#61dafb", orbit: 140, speed: 30, icon: Atom, isReactIcon: false },
  { name: "Node.js", color: "#68a063", orbit: 250, speed: 55, icon: Server, isReactIcon: false },
  { name: "MongoDB", color: "#47a248", orbit: 180, speed: 40, icon: Database, isReactIcon: false },
  { name: "TypeScript", color: "#3178c6", orbit: 160, speed: 35, icon: FileJson, isReactIcon: false },
  { name: "Express", color: "#ffffff", orbit: 200, speed: 48, icon: SiExpress, isReactIcon: true },
  { name: "Tailwind", color: "#38bdf8", orbit: 230, speed: 52, icon: SiTailwindcss, isReactIcon: true },
  { name: "GraphQL", color: "#e535ab", orbit: 150, speed: 32, icon: SiGraphql, isReactIcon: true },
  { name: "Docker", color: "#2496ed", orbit: 270, speed: 58, icon: FaDocker, isReactIcon: true },
  { name: "AWS", color: "#ff9900", orbit: 190, speed: 42, icon: FaAws, isReactIcon: true },
  { name: "Git", color: "#f05032", orbit: 220, speed: 46, icon: GitBranch, isReactIcon: false },
  { name: "Figma", color: "#f24e1e", orbit: 170, speed: 38, icon: FaFigma, isReactIcon: true },
];

// --- JOURNEY STEPS ---
const journeySteps = [
  {
    id: "01",
    year: "2022 – 2024",
    title: "The Foundation",
    desc: "Started as developers on key government projects, proving technical excellence and professionalism. These collaborative roots inspired us to build our own platform.",
    icon: Building2,
    color: "#6c5ce7",
    align: "left",
    deliverables: ["Govt. Project Experience", "Core Team Synergy", "Technical Excellence"],
    duration: "Collaborative Roots"
  },
  {
    id: "02",
    year: "2025",
    title: "The Transition",
    desc: "Conceptualized Grow Business Solutions. Extensive research on solving business problems with custom web apps and modern technology.",
    icon: Search,
    color: "#a29bfe",
    align: "right",
    deliverables: ["Market Research", "Service Roadmap", "Strategic Planning"],
    duration: "Concept Phase"
  },
  {
    id: "03",
    year: "2026",
    title: "The Official Launch",
    desc: "Grow Business Solutions BD officially launches. Ready to deliver global-standard custom web solutions using cutting-edge MERN Stack technology.",
    icon: Rocket,
    color: "#00cec9",
    align: "left",
    deliverables: ["Official Agency Launch", "Custom Web Solutions", "Client-First Approach"],
    duration: "New Era Begins"
  },
  {
    id: "04",
    year: "Future",
    title: "Global Impact",
    desc: "Aiming to serve global clients with high-performance digital ecosystems, innovation, and uncompromised quality.",
    icon: Globe,
    color: "#6c5ce7",
    align: "right",
    deliverables: ["Global Reach", "Innovation Lab", "Enterprise Solutions"],
    duration: "Worldwide Vision"
  },
];

// Stats Data
const stats = [
  { value: 3, label: "Govt. Projects", suffix: "+", icon: Award, note: "Team Experience" },
  { value: 100, label: "Code Quality", suffix: "%", icon: Zap, note: "Standards" },
  { value: 24, label: "Support", suffix: "/7", icon: ShieldCheck, note: "Dedicated" },
  { value: 10, label: "Tech Stack", suffix: "+", icon: Layers, note: "Modern Tools" },
];

// Helper component to render both Lucide and React Icons
const IconRenderer = ({ icon, isReactIcon, size = 18, color }: { icon: any; isReactIcon: boolean; size?: number; color?: string }) => {
  if (isReactIcon) {
    const IconComponent = icon;
    return <IconComponent size={size} color={color} />;
  }
  const LucideIcon = icon;
  return <LucideIcon size={size} style={{ color }} />;
};

export default function AboutPage() {
  const orbitRefs = useRef<HTMLDivElement[]>([]);
  const journeyLineRef = useRef<HTMLDivElement>(null);
  const journeyScrollRef = useRef<HTMLDivElement>(null);

  // Orbital Animation
  useEffect(() => {
    orbitRefs.current.forEach((node, i) => {
      if (!node) return;
      const tech = technologies[i];
      gsap.to(node, { rotation: 360, duration: tech.speed, repeat: -1, ease: "none" });
      const inner = node.querySelector(".tech-node-inner");
      if (inner) gsap.to(inner, { rotation: -360, duration: tech.speed, repeat: -1, ease: "none" });
    });
  }, []);

  // GSAP Journey Timeline Animation
  useEffect(() => {
    if (journeyLineRef.current && journeyScrollRef.current) {
      gsap.fromTo(
        journeyLineRef.current,
        { height: 0 },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: journeyScrollRef.current,
            start: "top 20%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );
    }

    journeySteps.forEach((_, i) => {
      gsap.fromTo(
        `.journey-step-${i}`,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: `.journey-step-${i}`,
            start: "top 85%",
            end: "top 50%",
            scrub: 0.5,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#05070a] text-white font-sans overflow-x-hidden">
      
      {/* Particle Network BG - পুরনো সব BG এর জায়গায় */}
      <ParticleNetwork 
        opacity={0.35}
        particleCount={80}
        connectionDistance={170}
        particleSize={{ min: 0.8, max: 2.5 }}
        particleColor="rgba(108, 92, 231, 0.45)"
        lineColor="rgba(108, 92, 231"
        lineOpacity={0.12}
        speed={0.35}
        glowEffect={true}
      />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden z-10">
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 border border-[#a29bfe]/30 bg-[#6c5ce7]/10 backdrop-blur-md px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#00cec9] animate-pulse" />
            <span className="text-[10px] md:text-[11px] tracking-[0.3em] text-white uppercase font-bold">OUR ARCHITECTURAL DNA</span>
          </motion.div>

          <h1 className="font-black leading-[0.9] tracking-tighter text-white text-[clamp(2.5rem,10vw,6.5rem)] mb-6">
            ENGINEERING <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#00cec9] italic">
              DIGITAL EQUITY
            </span>
          </h1>

          <p className="max-w-xl mx-auto lg:mx-0 text-base md:text-xl text-white/70 leading-relaxed mb-10 font-medium">
            Grow Business Solutions is a collective of architects designing <span className="text-[#a29bfe] font-bold">high-performance</span> digital ecosystems for the modern era.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link href="/vision">
              <button className="w-full sm:w-auto bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] hover:shadow-[0_0_30px_rgba(108,92,231,0.5)] transition-all px-8 py-4 rounded-xl text-xs md:text-sm font-black tracking-widest uppercase">
                Explore Our Vision
              </button>
            </Link>

            <Link href="/ContactUs">
              <button className="px-10 py-5 bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] rounded-2xl font-black text-xs tracking-widest uppercase shadow-[0_0_30px_rgba(108,92,231,0.4)] hover:scale-105 transition-all cursor-pointer">
                Start Your Journey →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- Stats Section --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <StatIcon className="w-8 h-8 mx-auto mb-3 text-[#6c5ce7]" />
                <div className="text-3xl md:text-4xl font-black text-white">{stat.value}{stat.suffix}</div>
                <div className="text-white/40 text-xs uppercase tracking-wider mt-2">{stat.label}</div>
                {stat.note && <div className="text-[10px] text-white/20 mt-1">{stat.note}</div>}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* --- THE FULL STACK SECTION --- */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 z-10">
        <div className="mb-16 md:mb-20 text-center lg:text-left">
          <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase mb-4">The Full Stack</h2>
          <p className="text-white/40 font-mono text-xs md:text-sm tracking-widest uppercase">12+ Modern Technologies • MERN • DevOps • Cloud</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {[
              { icon: Terminal, title: "Optimized Core", desc: "Engineered for peak dominance.", color: "#00cec9", isReactIcon: false },
              { icon: Atom, title: "Reactive UI", desc: "Fluid, responsive interfaces.", color: "#a29bfe", isReactIcon: false },
              { icon: Globe, title: "Distributed Edge", desc: "Global scale infrastructure.", color: "#6c5ce7", isReactIcon: false },
              { icon: ShieldCheck, title: "Ironclad Security", desc: "Enterprise-grade protection.", color: "#00b894", isReactIcon: false },
              { icon: FaDocker, title: "Containerized", desc: "Consistent deployment everywhere.", color: "#2496ed", isReactIcon: true },
              { icon: Cloud, title: "Cloud Native", desc: "AWS ready infrastructure.", color: "#ff9900", isReactIcon: false },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 md:p-8 rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-[#6c5ce7]/30 transition-all group backdrop-blur-sm"
              >
                <IconRenderer icon={item.icon} isReactIcon={item.isReactIcon} size={24} color={item.color} />
                <h4 className="font-bold text-lg md:text-xl text-white mb-2 mt-4">{item.title}</h4>
                <p className="text-xs md:text-sm text-white/30 italic">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Orbital Section - With 12 technologies */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative h-[450px] md:h-[600px] flex items-center justify-center">
            <div className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#6c5ce7]/5 blur-[80px] rounded-full animate-pulse" />
            
            <div className="relative z-30 w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#05070a]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center">
               <div className="text-center">
                  <div className="text-[8px] font-bold tracking-widest text-[#6c5ce7] uppercase">Core</div>
                  <div className="text-lg md:text-xl font-black text-white">MERN+</div>
               </div>
            </div>

            {technologies.map((tech, i) => {
              const responsiveOrbit = typeof window !== 'undefined' && window.innerWidth < 768 ? tech.orbit * 0.6 : tech.orbit;
              
              return (
                <div key={i} ref={(el) => { if (el) orbitRefs.current[i] = el; }} 
                     className="absolute flex items-center justify-center" 
                     style={{ width: responsiveOrbit * 2, height: responsiveOrbit * 2 }}>
                  <div className="tech-node-inner absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#0d0e14]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-xl">
                      <IconRenderer icon={tech.icon} isReactIcon={tech.isReactIcon} size={18} color={tech.color} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- JOURNEY SECTION --- */}
      <section 
        ref={journeyScrollRef} 
        className="relative z-10 py-32 px-6 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#6c5ce7]/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00cec9]/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-3xl font-black tracking-[0.3em] uppercase opacity-40 mb-2">Our Journey</h2>
            <h3 className="text-5xl font-black tracking-tighter">THE PATH <span className="text-white/20 italic">TO INNOVATION</span></h3>
          </div>

          {/* Central Vertical Timeline */}
          <div className="relative">
            <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            
            <div 
              ref={journeyLineRef} 
              className="absolute left-[24px] md:left-1/2 w-[2px] bg-gradient-to-b from-[#6c5ce7] via-[#a29bfe] to-[#00cec9] top-0 shadow-[0_0_15px_#00cec9]"
              style={{ height: 0 }}
            />

            <div className="space-y-24">
              {journeySteps.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={idx}
                    className={`journey-step-${idx} relative flex items-center w-full ${
                      step.align === "left" ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="hidden md:block w-1/2" />
                    
                    <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 z-10">
                      <div
                        className="w-14 h-14 rounded-full bg-[#05070a] border-2 border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-150 cursor-pointer shadow-[0_0_20px_rgba(108,92,231,0.25)]"
                        style={{ boxShadow: `0 0 20px ${step.color}` }}
                      >
                        <StepIcon size={20} style={{ color: step.color }} />
                      </div>
                    </div>

                    <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${
                      step.align === "left" ? 'md:pr-20 text-left md:text-right' : 'md:pl-20 text-left'
                    }`}>
                      <span className="text-[10px] font-mono text-[#6c5ce7] font-black mb-2 block uppercase tracking-[0.3em]">
                        {step.id} • {step.year}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black mb-3 tracking-tight" style={{ color: step.color }}>
                        {step.title}
                      </h3>
                      <p className="text-white/40 text-base font-medium leading-relaxed max-w-sm ml-0 md:ml-auto">
                        {step.desc}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4 justify-start md:justify-end">
                        {step.deliverables.map((d, i) => (
                          <span key={i} className="text-[9px] font-mono bg-white/5 px-2 py-1 rounded-full text-white/30">
                            {d}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-3 justify-start">
                        <span className="text-[10px] text-white/30 font-mono">{step.duration}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-[#111319] to-transparent border border-white/10 overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#6c5ce7]/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#00cec9]/5 blur-[100px] rounded-full" />
          
          <div className="text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-black leading-[1.1] mb-6 tracking-tighter">
              Ready to Write <br />
              <span className="bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] bg-clip-text text-transparent">Your Success Story?</span>
            </h2>
            <p className="text-white/40 text-lg mb-10 max-w-2xl mx-auto">
              Let's build something extraordinary together. Join the ranks of our global clients.
            </p>
            <Link href="/ContactUs">
              <button className="px-10 py-5 bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] rounded-2xl font-black text-xs tracking-widest uppercase shadow-[0_0_30px_rgba(108,92,231,0.4)] hover:scale-105 transition-all cursor-pointer">
                Start Your Journey →
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}