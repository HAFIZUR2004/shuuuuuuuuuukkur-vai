"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "@/constants/translations";
import { useLanguage } from "@/constants/LanguageContext";
import { 
  Send, Mail, Phone, MapPin, Clock, Shield, Lock, 
  CheckCircle, MessageSquare, User, AtSign
} from "lucide-react";
import Image from "next/image";
import ParticleNetwork from "@/components/ParticleNetwork";

// ============ প্রিমিয়াম লোডিং স্পিনার কম্পোনেন্ট ============
const PremiumSpinner = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading Contact");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    const texts = ["Initializing Secure Channel", "Loading Interface", "Preparing Form", "Almost Ready"];
    let textIndex = 0;
    const textInterval = setInterval(() => {
      if (textIndex < texts.length) {
        setLoadingText(texts[textIndex]);
        textIndex++;
      }
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#05070a] via-[#0a0c0f] to-[#05070a] flex flex-col items-center justify-center z-[200]">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] bg-[#6c5ce7]/20 rounded-full"
          animate={{ x: [-300, 300], y: [-300, 300] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] bg-[#00cec9]/20 rounded-full bottom-0 right-0"
          animate={{ x: [300, -300], y: [300, -300] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <motion.div
        className="relative w-32 h-32 mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#6c5ce7] border-r-[#00cec9]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-[#6c5ce7] border-l-[#00cec9]"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border-4 border-transparent border-t-[#a29bfe] border-r-[#00cec9]"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] rounded-full blur-md" />
        </motion.div>
      </motion.div>

      <motion.div
        className="relative w-20 h-20 mb-6"
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity },
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] rounded-full flex items-center justify-center">
          <span className="text-white text-2xl font-bold">✉️</span>
        </div>
      </motion.div>

      <motion.div
        className="text-center space-y-3"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] bg-clip-text text-transparent">
          {loadingText}
        </p>
        <p className="text-[#6c5ce7]/50 font-mono text-[10px] tracking-[0.3em] uppercase">
          Please wait
        </p>
      </motion.div>

      <div className="w-64 md:w-80 mt-8">
        <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <motion.p
          className="text-[10px] text-white/30 text-center mt-2 font-mono"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {loadingProgress}% Complete
        </motion.p>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#6c5ce7] rounded-full"
            initial={{
              x: "50%",
              y: "50%",
              scale: 0,
            }}
            animate={{
              x: `${50 + (Math.random() - 0.5) * 100}%`,
              y: `${50 + (Math.random() - 0.5) * 100}%`,
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
};
// ==================================================

export default function ContactSection() {
  const { lang } = useLanguage();
  const t = translations[lang];
  
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // সিমুলেটেড লোডিং - প্রিমিয়াম স্পিনার দেখানোর জন্য
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // আপনার কন্ট্যাক্ট ইনফো (ডায়নামিক)
  const contactInfo = [
    { icon: Phone, label: "DIRECT LINE", value: "+8801884369340", color: "#6c5ce7" },
    { icon: Mail, label: "QUANTUM MAIL", value: "growbusinesssolutionsbd@gmail.com", color: "#a29bfe" },
    { icon: MapPin, label: "GLOBAL NODE", value: "Barishal, Bangladesh • Remote First", color: "#00cec9" },
    { icon: Clock, label: "RESPONSE SLA", value: "< 24 Hours", color: "#fdcb6e" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Network error. Please try again.');
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

  // প্রিমিয়াম স্পিনার দেখানো হচ্ছে
  if (loading) {
    return <PremiumSpinner />;
  }

  return (
    <section className="relative min-h-screen bg-[#05070a] text-white flex items-center px-4 md:px-10 py-32 overflow-hidden font-sans">
      
      {/* Particle Network BG - পুরনো সব BG এর জায়গায় */}
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

      <div className="max-w-4xl w-full mx-auto relative z-10 px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col gap-10 max-w-3xl mx-auto"
        >
          <div className="space-y-5 text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#a29bfe]/30 bg-[#6c5ce7]/10 backdrop-blur-xl mx-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inset-0 rounded-full bg-[#00cec9] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00cec9]"></span>
              </span>
              <span className="text-[9px] uppercase font-black tracking-[0.2em] text-[#a29bfe]/80">
                {t.secureChannel || "ENCRYPTED CHANNEL"}
              </span>
              <Shield size={10} className="text-[#6c5ce7]" />
            </div>
            
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase text-center">
              {t.initiate || "INITIATE"} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#00cec9] italic">
                {t.connection || "CONNECTION"}
              </span>
            </h2>
            
            <p className="text-white/40 text-base max-w-lg leading-relaxed font-medium mx-auto">
              {t.contactDesc || "Ready to transform your digital presence? Let's connect and build something extraordinary together."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative group">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#00cec9]/50 to-[#6c5ce7]/50 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-[#0a0c0f]/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden group-hover:border-white/20 transition-colors">
                  <User size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                  <label className="absolute top-2 left-9 text-[9px] tracking-widest text-[#6c5ce7]/60 uppercase font-bold">
                    {t.nameLabel || "IDENTIFICATION"}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent pt-7 pb-3 pl-9 pr-4 text-sm text-white focus:outline-none placeholder:text-white/10"
                    placeholder={t.namePlaceholder || "Enter your full name"}
                    required
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#6c5ce7]/50 to-[#00cec9]/50 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-[#0a0c0f]/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden group-hover:border-white/20 transition-colors">
                  <AtSign size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                  <label className="absolute top-2 left-9 text-[9px] tracking-widest text-[#6c5ce7]/60 uppercase font-bold">
                    {t.emailLabel || "QUANTUM ID"}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent pt-7 pb-3 pl-9 pr-4 text-sm text-white focus:outline-none placeholder:text-white/10"
                    placeholder={t.emailPlaceholder || "your@email.com"}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-[#6c5ce7]/50 via-[#a29bfe]/30 to-[#00cec9]/50 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-[#0a0c0f]/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden group-hover:border-white/20 transition-colors">
                <MessageSquare size={12} className="absolute left-4 top-5 text-white/20" />
                <label className="absolute top-2 left-9 text-[9px] tracking-widest text-[#6c5ce7]/60 uppercase font-bold">
                  {t.messageLabel || "ENCRYPTED MESSAGE"}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent pt-7 pb-3 pl-9 pr-4 text-sm text-white focus:outline-none placeholder:text-white/10 resize-none"
                  placeholder={t.messagePlaceholder || "Tell us about your project..."}
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
                {isLoading ? "SENDING..." : (t.executeProtocol || "SEND SECURE MESSAGE")}
                {!isLoading && <Send size={14} className={isHovered ? "translate-x-1 transition-transform" : ""} />}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#00cec9]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#00cec9] via-[#a29bfe] to-[#6c5ce7] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </motion.button>
          </form>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/5">
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer text-center md:text-left"
              >
                <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
                  <item.icon size={10} style={{ color: item.color }} />
                  <p className="text-[8px] tracking-[0.15em] text-white/30 uppercase font-bold">
                    {item.label}
                  </p>
                </div>
                <p className="text-[11px] text-white/60 group-hover:text-white transition-colors font-mono">
                  {item.value}
                </p>
              </motion.div>
            ))}
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
  );  
}