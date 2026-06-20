"use client";

import React from "react";
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

// ✅ Import ParticleNetwork
import ParticleNetwork from "@/components/ParticleNetwork";

interface CTABridgeSectionProps {
  t: any;
  lang: string;
}

export default function CTABridgeSection({ t, lang }: CTABridgeSectionProps) {
  // ✅ ট্রান্সলেশন ডেটা সরাসরি t থেকে নেওয়া হচ্ছে
  const features = [
    {
      icon: Zap,
      title: t?.cta?.fastImplementation || (lang === "BN" ? "দ্রুত বাস্তবায়ন" : "Lightning Fast"),
      desc: t?.cta?.fastDesc || (lang === "BN" ? "আপনার আইডিয়া থেকে বাজার পর্যন্ত ৩০ দিনে" : "From idea to market in just 30 days"),
    },
    {
      icon: Target,
      title: t?.cta?.goalOriented || (lang === "BN" ? "লক্ষ্য ভিত্তিক" : "Goal Oriented"),
      desc: t?.cta?.goalDesc || (lang === "BN" ? "আপনার ব্যবসায়িক লক্ষ্য আমাদের মিশন" : "Your business goals drive our mission"),
    },
    {
      icon: Heart,
      title: t?.cta?.dedicatedCare || (lang === "BN" ? "যত্নশীল সহায়তা" : "Dedicated Care"),
      desc: t?.cta?.careDesc || (lang === "BN" ? "২৪/৭ সাপোর্ট এবং ক্রমাগত অপটিমাইজেশন" : "24/7 support and continuous optimization"),
    },
  ];

  const stats = [
    {
      number: t?.cta?.uptime || "99.9%",
      label: t?.cta?.uptimeLabel || (lang === "BN" ? "আপটাইম" : "Uptime"),
      icon: Rocket,
    },
    {
      number: t?.cta?.growth || "2x",
      label: t?.cta?.growthLabel || (lang === "BN" ? "দ্রুত বৃদ্ধি" : "Growth"),
      icon: TrendingUp,
    },
    {
      number: t?.cta?.satisfaction || "100%",
      label: t?.cta?.satisfactionLabel || (lang === "BN" ? "সন্তুষ্টি" : "Satisfaction"),
      icon: Star,
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden bg-[#0b0c18]">
      
      {/* ✅ Particle Network Background - All other backgrounds removed */}
      <ParticleNetwork 
        particleCount={60}
        opacity={0.4}
        glowEffect={true}
        // mouseInfluence={0.5}
        connectionDistance={200}
        className="absolute inset-0 z-0"
      />

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
              {t?.cta?.badge || (lang === "BN" ? "আপনার সাফল্য আমাদের লক্ষ্য" : "Your Success, Our Mission")}
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-purple-500" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-tight">
            <span className="text-white">
              {t?.cta?.title || (lang === "BN" ? "প্রস্তুত" : "Ready to")}
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              {t?.cta?.titleGradient || (lang === "BN" ? "রূপান্তরিত করতে?" : "Transform?")}
            </span>
          </h2>

          <p className="text-white/50 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            {t?.cta?.description || (lang === "BN"
              ? "আমরা শুধু ডেভেলপার নই, আমরা আপনার বৃদ্ধির অংশীদার। আপনার ডিজিটাল স্বপ্ন বাস্তবায়নের জন্য আমরা প্রতিশ্রুতিবদ্ধ।"
              : "We're not just developers—we're partners in your growth. Let's build something extraordinary together.")}
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
              {t?.cta?.startProject || (lang === "BN" ? "প্রকল্প শুরু করুন" : "Start Your Project")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>

          <Link href="/CareerPage">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl border-2 border-purple-500/50 text-white font-bold text-lg hover:bg-purple-500/10 transition-all duration-300 group flex items-center gap-3"
            >
              {t?.cta?.joinTeam || (lang === "BN" ? "আমাদের দলে যোগ দিন" : "Join Our Team")}
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
            {t?.cta?.bottomText || (lang === "BN"
              ? "নীচে আমাদের সাম্প্রতিক প্রকল্প দেখুন"
              : "See Our Recent Work Below")}
            <div className="h-px w-4 bg-gradient-to-l from-transparent to-white/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}