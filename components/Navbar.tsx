"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Rocket, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "@/constants/translations";
import { useLanguage } from "@/constants/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLanguage();

  const t = translations[lang];

  const navItems = [
    { 
      name: typeof t.services === 'string' ? t.services : (t.services as any)?.title || "Services", 
      path: "/services" 
    },
    { 
      name: typeof t.projects === 'string' ? t.projects : (t.projects as any)?.title || "Projects", 
      path: "/projects" 
    },
    { 
      name: typeof t.about === 'string' ? t.about : (t.about as any)?.title || "About", 
      path: "/about" 
    },
    { 
      name: typeof t.career === 'string' ? t.career : (t.career as any)?.title || "Career", 
      path: "/CareerPage" 
    },
    { 
      name: typeof t.contact === 'string' ? t.contact : (t.contact as any)?.title || "Contact", 
      path: "/ContactUs" 
    },
  ];

  const languages = [
    { code: "EN", name: "English", flag: "https://flagcdn.com/w20/us.png" },
    { code: "BN", name: "বাংলা", flag: "https://flagcdn.com/w20/bd.png" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentLang = languages.find((l) => l.code === (lang as string)) || languages[0];

  const handleStartProject = () => {
    router.push("/ContactUs");
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full transition-all duration-500 z-[999] ${
      scrolled 
        ? 'bg-[#0b0c18]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
        : 'bg-transparent'
    } ${lang === 'BN' ? 'font-hind' : ''}`}>
      <div className="flex justify-between items-center py-3 md:py-4 px-4 md:px-10 max-w-screen-2xl mx-auto">
        
        {/* Logo Section - Premium Design without White BG */}
        <Link href="/" className="flex items-center gap-3 relative z-[1001] group">
          {/* Animated Gradient Border Circle */}
          <div className="relative">
            <motion.div 
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#00cec9] opacity-75 blur-md"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#0a0c0f] to-[#05070a] border border-white/10 flex items-center justify-center overflow-hidden">
              <Image
                src="https://i.postimg.cc/yYds37Q3/logo-preview.png"
                alt="Logo"
                width={40}
                height={40}
                unoptimized
                className="object-contain w-8 h-8 md:w-9 md:h-9"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#6c5ce7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
          
          {/* Text Logo */}
          <div className="hidden md:flex flex-col">
            <span className={`text-xl md:text-2xl font-black tracking-tighter leading-none bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent ${lang === 'BN' ? 'font-hind' : ''}`}>
              GROW
            </span>
            <div className="flex items-center gap-1">
              <span className={`text-[8px] md:text-[9px] font-mono text-[#a29bfe] font-bold uppercase tracking-[0.2em] ${lang === 'BN' ? 'font-hind' : ''}`}>
                {t.businessSolutions || "Business Solutions"}
              </span>
              <Sparkles size={8} className="text-[#00cec9]" />
            </div>
          </div>
        </Link>

        {/* Desktop Menu Links */}
        <div className="hidden lg:flex items-center gap-8 font-semibold">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`relative py-2 text-sm font-medium transition-all duration-300 ${
                pathname === item.path
                  ? "text-[#a29bfe]"
                  : "text-white/60 hover:text-white"
              } ${lang === 'BN' ? 'font-hind' : ''}`}
            >
              {String(item.name)}
              {pathname === item.path && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Actions Section */}
        <div className={`flex items-center gap-2 md:gap-4 z-[1001] transition-opacity duration-300 ${isOpen ? "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto" : "opacity-100"}`}>
          
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-2 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 ${lang === 'BN' ? 'font-hind' : ''}`}
            >
              <div className="relative w-5 h-3.5 rounded-sm overflow-hidden">
                <Image
                  src={currentLang.flag}
                  alt={currentLang.code}
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                  className="object-cover"
                />
              </div>
              <span className="hidden sm:inline text-xs font-bold text-white/80 uppercase tracking-wider">
                {currentLang.code}
              </span>
              <ChevronDown
                size={14}
                className={`text-white/40 transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-[1001]" onClick={() => setIsLangOpen(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 right-0 bg-[#0f0f1a] backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[140px] z-[1002]"
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code as "EN" | "BN");
                          setIsLangOpen(false);
                        }}
                        className={`flex items-center gap-3 w-full px-4 py-3 hover:bg-gradient-to-r hover:from-[#6c5ce7]/20 hover:to-transparent transition-all duration-300 text-xs text-white/80 hover:text-white font-medium ${lang === 'BN' ? 'font-hind' : ''}`}
                      >
                        <Image
                          src={l.flag}
                          alt={l.name}
                          width={18}
                          height={12}
                          unoptimized
                          className="rounded-sm"
                        />
                        {l.name}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Start Project Button - Premium Design */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartProject}
            className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#6c5ce7]/25"
          >
            <span className="relative z-10 flex items-center gap-2 text-xs uppercase tracking-wider">
              <span className="hidden sm:inline">
                {typeof t.startProject === 'string' ? t.startProject : (t.startProject as any)?.title || "Start Project"}
              </span>
              <Rocket size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#00cec9] to-[#6c5ce7] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 text-white bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Side Drawer - Premium Design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-[1002]"
          >
            <div
              className="absolute inset-0 bg-[#0b0c18]/90 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-[300px] sm:w-[340px] bg-gradient-to-b from-[#0f0f1a] to-[#0b0c18] border-l border-white/10 shadow-2xl"
            >
              <div className="flex flex-col h-full py-6 px-5">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] p-[1px]">
                      <div className="w-full h-full rounded-full bg-[#0f0f1a] flex items-center justify-center">
                        <Image
                          src="https://i.postimg.cc/yYds37Q3/logo-preview.png"
                          alt="Logo"
                          width={28}
                          height={28}
                          unoptimized
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <span className="text-white/60 font-black uppercase tracking-widest text-[10px]">{t.menu || "MENU"}</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex flex-col w-full gap-2 flex-1">
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between w-full py-4 px-4 rounded-xl transition-all duration-300 ${
                          pathname === item.path 
                            ? "bg-gradient-to-r from-[#6c5ce7]/20 to-transparent border-l-2 border-[#6c5ce7] text-[#a29bfe]" 
                            : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                        } ${lang === 'BN' ? 'font-hind' : ''}`}
                      >
                        <span className="text-sm font-semibold tracking-tight">
                          {String(item.name)}
                        </span>
                        {pathname === item.path && (
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#6c5ce7] animate-pulse" />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00cec9] animate-pulse" />
                          </div>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                {/* Mobile Start Project Button */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-6 mt-4 border-t border-white/10"
                >
                  <button
                    onClick={handleStartProject}
                    className="flex items-center justify-center gap-3 w-full py-4 px-4 rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#6c5ce7]/25"
                  >
                    <Rocket size={18} />
                    <span className="text-sm uppercase tracking-wider">
                      {typeof t.startProject === 'string' ? t.startProject : (t.startProject as any)?.title || "Start Project"}
                    </span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}