"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Target,
  Rocket,
  Heart,
  Star,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

interface CTABridgeSectionProps {
  t: any;
  lang: string;
}

export default function CTABridgeSection({ t, lang }: CTABridgeSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated background canvas with flowing particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.6;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }

    const particles: Particle[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    const draw = () => {
      // Clear with semi-transparent background for trail effect
      ctx.fillStyle = "rgba(10, 10, 15, 0.02)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(108, 92, 231, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.opacity += (Math.random() - 0.5) * 0.02;
        particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));

        // Wrap around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2,
        );
        gradient.addColorStop(0, `rgba(108, 92, 231, ${particle.opacity})`);
        gradient.addColorStop(1, "rgba(108, 92, 231, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.6;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const features = [
    {
      icon: Zap,
      title: lang === "BN" ? "দ্রুত বাস্তবায়ন" : "Lightning Fast",
      desc:
        lang === "BN"
          ? "আপনার আইডিয়া থেকে বাজার পর্যন্ত ৩০ দিনে"
          : "From idea to market in just 30 days",
    },
    {
      icon: Target,
      title: lang === "BN" ? "লক্ষ্য ভিত্তিক" : "Goal Oriented",
      desc:
        lang === "BN"
          ? "আপনার ব্যবসায়িক লক্ষ্য আমাদের মিশন"
          : "Your business goals drive our mission",
    },
    {
      icon: Heart,
      title: lang === "BN" ? "যত্নশীল সহায়তা" : "Dedicated Care",
      desc:
        lang === "BN"
          ? "২৪/৭ সাপোর্ট এবং ক্রমাগত অপটিমাইজেশন"
          : "24/7 support and continuous optimization",
    },
  ];

  const stats = [
    {
      number: "99.9%",
      label: lang === "BN" ? "আপটাইম" : "Uptime",
      icon: Rocket,
    },
    {
      number: "2x",
      label: lang === "BN" ? "দ্রুত বৃদ্ধি" : "Growth",
      icon: TrendingUp,
    },
    {
      number: "100%",
      label: lang === "BN" ? "সন্তুষ্টি" : "Satisfaction",
      icon: Star,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden bg-gradient-to-b from-[#0a0b14] via-[#0f1420] to-[#0a0b14]"
    >
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.4 }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl font-hind mx-auto relative z-10 w-full">
        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-purple-500" />
            <span className="text-purple-400 text-xs font-mono tracking-widest font-bold uppercase">
              {lang === "BN"
                ? "আপনার সাফল্য আমাদের লক্ষ্য"
                : "Your Success, Our Mission"}
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-purple-500" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-tight">
            <span className="text-white">
              {lang === "BN" ? "প্রস্তুত" : "Ready to"}
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              {lang === "BN" ? "রূপান্তরিত করতে?" : "Transform?"}
            </span>
          </h2>

          <p className="text-white/50 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            {lang === "BN"
              ? "আমরা শুধু ডেভেলপার নই, আমরা আপনার বৃদ্ধির অংশীদার। আপনার ডিজিটাল স্বপ্ন বাস্তবায়নের জন্য আমরা প্রতিশ্রুতিবদ্ধ।"
              : "We're not just developers—we're partners in your growth. Let's build something extraordinary together."}
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8 }}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  >
                    <Icon className="w-6 h-6 text-purple-400" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                    {feature.desc}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </div>

        {/* Stats showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-20"
        >
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 bg-white/[0.02] backdrop-blur-sm transition-all duration-300"
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                    className="flex justify-center mb-3"
                  >
                    <Icon className="w-6 h-6 text-purple-400" />
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <p className="text-white/60 text-sm font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
        >
          <Link href="/ContactUs">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 group flex items-center gap-3"
            >
              {lang === "BN" ? "প্রকল্প শুরু করুন" : "Start Your Project"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>

          <Link href="/CareerPage">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl border-2 border-purple-500/50 text-white font-bold text-lg hover:bg-purple-500/10 transition-all duration-300 group flex items-center gap-3"
            >
              {lang === "BN" ? "আমাদের দলে যোগ দিন" : "Join Our Team"}
              <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-white/30 text-sm">
            <div className="h-px w-4 bg-gradient-to-r from-transparent to-white/30" />
            {lang === "BN"
              ? "নীচে আমাদের সাম্প্রতিক প্রকল্প দেখুন"
              : "See Our Recent Work Below"}
            <div className="h-px w-4 bg-gradient-to-l from-transparent to-white/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
