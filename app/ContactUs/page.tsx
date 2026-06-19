"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "@/constants/translations";
import { useLanguage } from "@/constants/LanguageContext";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  MessageSquare,
  User,
  AtSign,
  Star,
  Rocket,
  MessageCircle,
  Award,
} from "lucide-react";
import ParticleNetwork from "@/components/ParticleNetwork";
import { PublicLayout } from "../public-layout";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function ContactSection() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholders = [
    "your@email.com",
    "john@company.com",
    "hello@startup.com",
    "contact@business.com",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const contactInfo = [
    {
      icon: Phone,
      label: "DIRECT LINE",
      value: "+8801726441994",
      color: "#6c5ce7",
      detail: "24/7 Available",
    },
    {
      icon: Mail,
      label: "QUANTUM MAIL",
      value: "growbusinesssolutionsbd@gmail.com",
      color: "#a29bfe",
      detail: "Response within 24h",
    },
    {
      icon: MapPin,
      label: "GLOBAL NODE",
      value: "House 76/A, Road 11, Banani, Dhaka, Banani Model Town, Bangladesh, 1213 • Remote First",
      color: "#00cec9",
      detail: "Worldwide Service",
    },
    {
      icon: Clock,
      label: "RESPONSE SLA",
      value: "7/24 Hours",
      color: "#fdcb6e",
      detail: "Average Response",
    },
  ];

  const trustBadges = [
    { icon: Star, text: "4.9/5 Rating", color: "#fdcb6e" },
    { icon: Rocket, text: "50+ Projects", color: "#6c5ce7" },
    { icon: MessageCircle, text: "24/7 Support", color: "#00cec9" },
    { icon: Award, text: "100% Satisfaction", color: "#10b981" },
  ];
  const socialLinks = [
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/growbusinesssolutions",
      label: "Instagram",
    },
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/growbusinesssolutionsbd",
      label: "Facebook",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/company/growbusinesssolutionsbd",
      label: "LinkedIn",
    },
    {
      icon: FaXTwitter,
      href: "https://x.com/GrowBS_BD",
      label: "Twitter",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
        setFormData({ name: "", email: "", message: "" });
      } else alert("Failed to send message. Please try again.");
    } catch (error) {
      console.error("Submit error:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <PublicLayout>
      <section className="relative min-h-screen bg-[#05070a] text-white font-hind flex items-center px-4 md:px-10 py-32 overflow-hidden">
        <ParticleNetwork
          opacity={0.4}
          particleCount={70}
          connectionDistance={160}
          particleSize={{ min: 0.8, max: 2.5 }}
          particleColor="rgba(108, 92, 231, 0.45)"
          lineColor="rgba(108, 92, 231"
          lineOpacity={0.12}
          speed={0.35}
          glowEffect={true}
        />

        <div className="max-w-6xl w-full mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#a29bfe]/30 bg-[#6c5ce7]/10 backdrop-blur-xl mx-auto mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inset-0 rounded-full bg-[#00cec9] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00cec9]"></span>
                </span>
                <span className="text-[9px] uppercase font-black tracking-[0.2em] text-[#a29bfe]/80">
                  {t.secureChannel || "ENCRYPTED CHANNEL"}
                </span>
                <Shield size={10} className="text-[#6c5ce7]" />
              </div>

              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase">
                {t.initiate || "INITIATE"} <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6c5ce7] via-[#a29bfe] to-[#00cec9] italic">
                  {t.connection || "CONNECTION"}
                </span>
              </h2>

              <p className="text-white/40 text-base max-w-2xl leading-relaxed font-medium mx-auto mt-6">
                {t.contactDesc ||
                  "Ready to transform your digital presence? Let's connect and build something extraordinary together."}
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/2 border border-white/10 hover:border-purple-500/30 transition-all"
                >
                  <badge.icon size={14} style={{ color: badge.color }} />
                  <span className="text-[10px] text-white/60 font-mono uppercase tracking-wider">
                    {badge.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Main Content - 2 Columns */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left Side - Contact Info Cards */}
              <div className="space-y-6">
                <div className="relative rounded-3xl bg-linear-to-br from-white/3 to-transparent border border-white/10 p-6 backdrop-blur-sm">
                  <h3 className="text-lg font-black uppercase tracking-wider mb-6 bg-linear-to-r from-white to-white/50 bg-clip-text text-transparent">
                    {t.connectUs}
                  </h3>
                  <div className="space-y-4">
                    {contactInfo.map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 10, borderColor: item.color }}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white/2 border border-white/10 hover:border-opacity-50 transition-all group cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center shrink-0">
                          <item.icon size={22} style={{ color: item.color }} />
                        </div>
                        <div>
                          <p className="text-[9px] font-mono text-white/40 uppercase tracking-wider">
                            {item.label}
                          </p>
                          <p className="text-white font-medium text-sm">
                            {item.value}
                          </p>
                          <p className="text-[8px] text-white/30 mt-1">
                            {item.detail}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="text-[9px] text-white/40 uppercase tracking-wider mb-3">
                      Follow Us
                    </p>
                    <div className="flex gap-3">
                      {socialLinks.map((social, i) => (
                        <a
                          key={i}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-500/50 hover:scale-110 transition-all duration-300 group"
                        >
                          <social.icon
                            size={14}
                            className="text-white/60 group-hover:text-white transition-colors"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="relative rounded-3xl bg-linear-to-br from-white/3 to-transparent border border-white/10 p-6 backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-linear-to-tr from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl" />

                <h3 className="text-lg font-black uppercase tracking-wider mb-6 bg-linear-to-r from-white to-white/50 bg-clip-text text-transparent">
                  {t.sendMessage}
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="relative group">
                    <div className="absolute -inset-px bg-linear-to-r from-[#00cec9]/50 to-[#6c5ce7]/50 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-[#0a0c0f]/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden group-hover:border-white/20 transition-colors">
                      <User
                        size={12}
                        className="absolute left-4 top-4 -translate-y-1/2 text-white/20"
                      />
                      <label className="absolute top-2 left-9 text-[9px] tracking-widest text-[#6c5ce7]/60 uppercase font-bold">
                        YOUR NAME OR TITLE
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent pt-7 pb-3 pl-9 pr-4 text-sm text-white focus:outline-none placeholder:text-white/10"
                        placeholder={
                          t.namePlaceholder || "Enter your full name"
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-px bg-linear-to-r from-[#6c5ce7]/50 to-[#00cec9]/50 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-[#0a0c0f]/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden group-hover:border-white/20 transition-colors">
                      <AtSign
                        size={12}
                        className="absolute left-4 top-4 -translate-y-1/2 text-white/20"
                      />
                      <label className="absolute top-2 left-9 text-[9px] tracking-widest text-[#6c5ce7]/60 uppercase font-bold">
                        QUANTUM ID
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent pt-7 pb-3 pl-9 pr-4 text-sm text-white focus:outline-none placeholder:text-white/10"
                        placeholder={placeholders[placeholderIndex]}
                        required
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-px bg-linear-to-r from-[#6c5ce7]/50 via-[#a29bfe]/30 to-[#00cec9]/50 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-[#0a0c0f]/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden group-hover:border-white/20 transition-colors">
                      <MessageSquare
                        size={12}
                        className="absolute left-4 top-2.5 text-white/20"
                      />
                      <label className="absolute top-2 left-9 text-[9px] tracking-widest text-[#6c5ce7]/60 uppercase font-bold">
                        WRIGHT YOUR MESSAGE
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-transparent pt-7 pb-3 pl-9 pr-4 text-sm text-white focus:outline-none placeholder:text-white/10 resize-none"
                        placeholder={
                          t.messagePlaceholder ||
                          "Tell us about your project..."
                        }
                        required
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    disabled={isLoading}
                    className="relative group w-full py-5 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all overflow-hidden shadow-2xl disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                      {isLoading
                        ? "SENDING..."
                        : t.executeProtocol || "SEND SECURE MESSAGE"}
                      {!isLoading && (
                        <Send
                          size={14}
                          className={
                            isHovered
                              ? "translate-x-1 transition-transform"
                              : ""
                          }
                        />
                      )}
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-[#6c5ce7] via-[#a29bfe] to-[#00cec9]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00cec9] via-[#a29bfe] to-[#6c5ce7] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  </motion.button>
                </form>
              </div>
            </div>

            {/* Response Time Indicator */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5">
                <Clock size={12} className="text-[#00cec9]" />
                <span className="text-[9px] text-white/40 font-mono uppercase tracking-wider">
                  Average response time: 7/24 hours
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] text-white px-8 py-4 rounded-full font-black text-xs tracking-widest uppercase shadow-2xl flex items-center gap-3"
            >
              <CheckCircle size={18} />
              {t.successMessage || "MESSAGE TRANSMITTED SUCCESSFULLY"}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </PublicLayout>
  );
}
