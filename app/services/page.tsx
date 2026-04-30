"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Code2, Layers, Cpu, Globe, Search, Layout, Terminal, Rocket, ArrowRight,
  ShoppingCart, FileText, Brain, BarChart, CheckCircle, Sparkles,
  TrendingUp, Users, Zap, Shield, Award, Clock, MessageSquare, Phone, Mail,
  Send, Loader2
} from "lucide-react";
import Link from "next/link";
import PremiumSpinner from "@/components/PremiumSpinner";
import ParticleNetwork from "@/components/ParticleNetwork";
import { PublicLayout } from "../public-layout";

gsap.registerPlugin(ScrollTrigger);

// --- Services Data ---
const services = [
  {
    title: "High-Performance Ecommerce",
    desc: "Headless Shopify Plus and custom storefronts for conversion-optimized global stores.",
    value: "Shopify • Liquid • Hydrogen",
    icon: ShoppingCart,
    color: "#96bf48",
    span: "md:col-span-2",
    badge: "ECOMMERCE"
  },
  {
    title: "Enterprise Content Hub",
    desc: "WordPress and headless CMS solutions for scalable content architecture.",
    value: "WordPress • Headless • GraphQL",
    icon: FileText,
    color: "#21759b",
    span: "md:col-span-1",
    badge: "CMS"
  },
  {
    title: "Generative AI Integration",
    desc: "LLMs, agents, and automation workflows bringing intelligence and personalization.",
    value: "OpenAI • LangChain • Fine-tuning",
    icon: Brain,
    color: "#10a37f",
    span: "md:col-span-1",
    badge: "AI-FIRST"
  },
  {
    title: "Global No-Code Orchestration",
    desc: "Rapid MVP to enterprise-grade scaling with Webflow, Framer, and Bubble.",
    value: "Webflow • Bubble • FlutterFlow",
    icon: Layout,
    color: "#4353ff",
    span: "md:col-span-1",
    badge: "RAPID-DEV"
  },
  {
    title: "Intelligent Analytics & Ops",
    desc: "Custom BI tools and automation systems for data-driven decisions.",
    value: "BigQuery • Looker • n8n",
    icon: BarChart,
    color: "#f9ab00",
    span: "md:col-span-1",
    badge: "INSIGHTS"
  }
];

// --- Timeline Data ---
const timeline = [
  { id: "01", title: "Discovery & Audit", desc: "Analyzing business goals, tech stack, and market position to build your roadmap.", icon: Search },
  { id: "02", title: "Strategy & Blueprint", desc: "Defining design systems, architecture, and performance metrics.", icon: Layers },
  { id: "03", title: "Agile Build & Test", desc: "Transparent sprints with development, QA, and user testing.", icon: Terminal },
  { id: "04", title: "Launch & Optimize", desc: "Global deployment with 24/7 monitoring and continuous optimization.", icon: Rocket },
];

export default function ServicesPage() {
  const [loading, setLoading] = useState(true);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const timelineScrollRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    requirements: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

  // সিমুলেটেড লোডিং - প্রিমিয়াম স্পিনার দেখানোর জন্য
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to contact form function
  const scrollToContactForm = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // GSAP Timeline Animation
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        if (timelineLineRef.current && timelineScrollRef.current) {
          gsap.fromTo(
            timelineLineRef.current,
            { height: 0 },
            {
              height: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: timelineScrollRef.current,
                start: "top 20%",
                end: "bottom 80%",
                scrub: 1,
              },
            }
          );
        }

        timeline.forEach((_, i) => {
          gsap.fromTo(
            `.timeline-step-${i}`,
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              scrollTrigger: {
                trigger: `.timeline-step-${i}`,
                start: "top 85%",
                end: "top 50%",
                scrub: 0.5,
              },
            }
          );
        });
        
        ScrollTrigger.refresh();
      }, 100);
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loading]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.requirements
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Thank you! Our team will contact you within 24 hours.' 
        });
        
        setFormData({ name: "", email: "", requirements: "" });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Something went wrong. Please try again or email us directly.' 
      });
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state - Full screen overlay
  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#05070a]">
        <PremiumSpinner text="Loading Services" subText="Please wait" />
      </div>
    );
  }

  // Content with PublicLayout (Footer will show only after loading is complete)
  return (
    <PublicLayout showFooter={true}>
      <main className="relative min-h-screen bg-[#05070a] text-white selection:bg-[#6c5ce7]/30 overflow-hidden">
        
        {/* Particle Network BG */}
        <ParticleNetwork 
          opacity={0.4}
          particleCount={60}
          connectionDistance={150}
          particleSize={{ min: 0.5, max: 2.5 }}
          particleColor="rgba(108, 92, 231, 0.5)"
          lineColor="rgba(108, 92, 231"
          lineOpacity={0.15}
          speed={0.5}
          glowEffect={true}
        />
        
        {/* Hero Section */}
        <section className="relative z-10 min-h-[90vh] flex items-center pt-20 px-6 overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-[#6c5ce7]/15 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[0%] w-[30%] h-[40%] bg-[#00cec9]/5 blur-[100px] rounded-full" />

          <div className="max-w-7xl mx-auto w-full relative grid lg:grid-cols-2 gap-10 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 border border-[#a29bfe]/30 bg-[#6c5ce7]/10 backdrop-blur-xl px-4 py-2 rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-[#00cec9] animate-pulse" />
                <span className="text-[10px] tracking-[0.3em] font-black uppercase">Trusted by 50+ Global Brands</span>
              </div>
              
              <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-black leading-[0.85] tracking-tighter mb-8">
                FULL-STACK <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#00cec9]">
                  ECOSYSTEM
                </span>
              </h1>
              
              <p className="max-w-xl text-lg text-white/50 leading-relaxed mb-6 font-medium">
                From <span className="text-white">custom web applications</span> and <span className="text-white">WordPress</span> to 
                <span className="text-white"> Shopify</span> and <span className="text-white">AI-powered solutions</span> — we build everything under one roof.
              </p>
              
              <p className="max-w-xl text-base text-white/40 leading-relaxed mb-10 font-medium">
                No matter the platform. No matter the complexity. Your vision, fully engineered.
              </p>

              <div className="flex flex-wrap gap-5">
                <button 
                  onClick={scrollToContactForm}
                  className="px-10 py-5 bg-[#6c5ce7] rounded-2xl font-black text-xs tracking-widest uppercase shadow-[0_0_30px_rgba(108,92,231,0.4)] hover:scale-105 transition-all"
                >
                  Book a Strategy Call →
                </button>
                <Link href="/projects">
                  <button className="px-10 py-5 border border-white/10 hover:bg-white/5 rounded-full transition-all duration-300">
                    View Case Studies
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Right side visual */}
            <div className="hidden lg:block relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-[#0a0c0f]/80 backdrop-blur-3xl border border-white/10 p-10 rounded-[2rem]">
                <div className="flex items-center justify-between mb-10">
                  <div className="text-[10px] font-mono text-white/40 tracking-[0.2em]">PLATFORM_AGNOSTIC</div>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/50"/>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"/>
                    <div className="w-2 h-2 rounded-full bg-green-500/50"/>
                  </div>
                </div>
                
                {/* Platform Icons Row */}
                <div className="flex justify-around mb-8 pb-6 border-b border-white/10">
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-[#6c5ce7]/20 flex items-center justify-center mx-auto mb-2">
                      <Code2 size={18} className="text-[#6c5ce7]" />
                    </div>
                    <span className="text-[8px] font-mono text-white/40">Full-Stack</span>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-[#21759b]/20 flex items-center justify-center mx-auto mb-2">
                      <FileText size={18} className="text-[#21759b]" />
                    </div>
                    <span className="text-[8px] font-mono text-white/40">WordPress</span>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-[#96bf48]/20 flex items-center justify-center mx-auto mb-2">
                      <ShoppingCart size={18} className="text-[#96bf48]" />
                    </div>
                    <span className="text-[8px] font-mono text-white/40">Shopify</span>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-[#10a37f]/20 flex items-center justify-center mx-auto mb-2">
                      <Brain size={18} className="text-[#10a37f]" />
                    </div>
                    <span className="text-[8px] font-mono text-white/40">AI</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/60">
                      <span>Custom Web App Dev</span>
                      <span>Enterprise Grade</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2 }} className="h-full bg-[#6c5ce7]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/60">
                      <span>WordPress + WooCommerce</span>
                      <span>∞ Scalable</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, delay: 0.2 }} className="h-full bg-[#21759b]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/60">
                      <span>Shopify + Headless Commerce</span>
                      <span>Global Ready</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, delay: 0.4 }} className="h-full bg-[#96bf48]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/60">
                      <span>AI Integration & Automation</span>
                      <span>Next-Gen</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, delay: 0.6 }} className="h-full bg-[#10a37f]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Services Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <div className="mb-20 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 uppercase">What We Engineer</h2>
            <p className="text-white/40 max-w-xl font-medium">Platforms, custom code, and AI — three layers of expertise.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, borderColor: `${s.color}40` }}
                className={`${s.span} p-10 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 relative overflow-hidden group transition-all`}
              >
                <div className="absolute top-6 right-6 z-20">
                  <span className="text-[9px] font-mono font-black px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 tracking-wider">
                    {s.badge}
                  </span>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: s.color }} />
                <s.icon className="mb-8 group-hover:scale-110 transition-transform" style={{ color: s.color }} size={36} />
                <h3 className="text-2xl font-black mb-4 tracking-tight">{s.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-8 font-medium">{s.desc}</p>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/20 block mb-1">Tech Stack</span>
                    <span className="text-[11px] font-bold uppercase tracking-tighter" style={{ color: s.color }}>{s.value}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Enhanced "Our Journey" Counter Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-20 text-center max-w-4xl mx-auto p-10 rounded-3xl bg-gradient-to-r from-[#6c5ce7]/5 to-[#00cec9]/5 border border-white/10"
          >
            <p className="text-xl md:text-2xl font-medium text-white/70 italic leading-relaxed">
              "Empowering businesses with <span className="text-white font-bold">future-ready digital solutions</span> — 
              where innovation meets execution, and every line of code drives growth."
            </p>
            <div className="mt-6 flex justify-center gap-2 text-[#00cec9]">
              <Sparkles size={16} />
              <Sparkles size={16} />
              <Sparkles size={16} />
            </div>
          </motion.div>
        </section>

        {/* Timeline Section with GSAP */}
        <section 
          ref={timelineScrollRef} 
          className="relative z-10 py-32 px-6 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#6c5ce7]/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00cec9]/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-24">
              <h2 className="text-3xl font-black tracking-[0.3em] uppercase opacity-40 mb-2">Methodology</h2>
              <h3 className="text-5xl font-black tracking-tighter">THE BLUEPRINT TO SCALE</h3>
            </div>

            <div className="relative">
              <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              
              <div 
                ref={timelineLineRef} 
                className="absolute left-[24px] md:left-1/2 w-[2px] bg-gradient-to-b from-[#6c5ce7] via-[#a29bfe] to-[#00cec9] top-0 shadow-[0_0_15px_#00cec9]"
                style={{ height: 0 }}
              />

              <div className="space-y-24">
                {timeline.map((item, idx) => (
                  <div
                    key={idx}
                    className={`timeline-step-${idx} relative flex items-center w-full ${
                      idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="hidden md:block w-1/2" />
                    
                    <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 z-10">
                      <div
                        className="w-12 h-12 rounded-full bg-[#05070a] border-2 border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-150 cursor-pointer shadow-[0_0_20px_rgba(108,92,231,0.25)]"
                        style={{
                          boxShadow: `0 0 20px ${idx % 2 === 0 ? "#6c5ce7" : "#00cec9"}`,
                        }}
                      >
                        <item.icon size={18} style={{ color: idx % 2 === 0 ? "#6c5ce7" : "#00cec9" }} />
                      </div>
                    </div>

                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                      idx % 2 === 0 ? 'md:pr-20 text-left md:text-right' : 'md:pl-20 text-left'
                    }`}>
                      <span className="text-[10px] font-mono text-[#6c5ce7] font-black mb-2 block uppercase tracking-[0.3em]">
                        Step_{item.id}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black mb-3 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-white/40 text-base font-medium leading-relaxed max-w-sm ml-0 md:ml-auto mr-0 md:mr-0">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section 
          id="contact-form" 
          ref={contactFormRef}
          className="relative z-10 max-w-7xl mx-auto px-6 py-40"
        >
          <div className="relative p-12 md:p-24 rounded-[3rem] bg-gradient-to-br from-[#111319] to-transparent border border-white/10 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#6c5ce7]/10 blur-[100px] rounded-full" />
            
            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                <h2 className="text-5xl md:text-7xl font-black leading-[0.9] mb-10 tracking-tighter">
                  READY TO <br /> <span className="text-white/30 italic">DOMINATE?</span>
                </h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#6c5ce7]/20 transition-colors border border-white/5 flex-shrink-0">
                      <Mail size={24} />
                    </div>
                    <span className="text-xl text-white/70 font-bold break-all md:break-normal">
                      growbusinesssolutionsbd@gmail.com
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#00cec9]/20 transition-colors border border-white/5 flex-shrink-0">
                      <Globe size={24} />
                    </div>
                    <span className="text-xl text-white/70 font-bold">Global Delivery Center</span>
                  </div>
                  
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#f9ab00]/20 transition-colors border border-white/5 flex-shrink-0">
                      <Phone size={24} />
                    </div>
                    <span className="text-xl text-white/70 font-bold">+880 1884 369340</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 bg-white/[0.02] p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-inner">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <input 
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full bg-transparent border-b border-white/10 py-5 focus:border-[#6c5ce7] outline-none transition-all font-bold text-sm"
                  />
                  <input 
                    type="email"
                    placeholder="Work Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full bg-transparent border-b border-white/10 py-5 focus:border-[#6c5ce7] outline-none transition-all font-bold text-sm"
                  />
                  <textarea 
                    placeholder="Project Requirements..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                    required
                    className="w-full bg-transparent border-b border-white/10 py-5 focus:border-[#6c5ce7] outline-none transition-all font-bold text-sm h-32 resize-none"
                  />
                  
                  {submitStatus && (
                    <div className={`p-4 rounded-xl text-sm font-medium ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {submitStatus.message}
                    </div>
                  )}
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 bg-[#6c5ce7] rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-[#5a4ad1] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        SENDING...
                      </>
                    ) : (
                      'Schedule Discovery Call'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}