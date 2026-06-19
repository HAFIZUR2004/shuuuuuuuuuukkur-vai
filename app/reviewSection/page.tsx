"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/constants/LanguageContext";
import { translations } from "@/constants/translations";

// ✅ টেস্টিমোনিয়াল টাইপ ডিফাইন করুন (MongoDB _id স্ট্রিং হবে)
interface TestimonialType {
  id: string; // MongoDB _id
  name: string;
  role: string;
  comment: string;
  image: string;
  rating: number;
  company: string;
}

interface PremiumReviewsProps {
  t?: any;
  lang?: string;
}

const PremiumReviews = ({ t: propT, lang: propLang }: PremiumReviewsProps) => {
  const context = useLanguage();
  const lang = propLang || context.lang;
  const t = propT || translations[lang as keyof typeof translations];

  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ ডেটাবেস থেকে টেস্টিমোনিয়াল লোড করুন (শুধু active)
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          // MongoDB _id → id ম্যাপিং
          const formatted: TestimonialType[] = result.data.map((item: any) => ({
            id: item._id.toString(),
            name: item.name || "",
            role: item.role || "",
            comment: item.comment || "",
            image: item.image || "",
            rating: item.rating || 5,
            company: item.company || "",
          }));
          setTestimonials(formatted);
        } else {
          console.warn("No testimonials found or API error");
          setTestimonials([]);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials([]);
      }
    };

    fetchTestimonials();
  }, []);

  // Particle Network Canvas Effect (অপরিবর্তিত)
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
      color: string;
      pulse: number;
      pulseDir: number;
    }> = [];

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
        65,
        Math.floor((canvas.width * canvas.height) / 20000),
      );
      nodes = [];

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 2.8 + 1,
          color:
            Math.random() > 0.5
              ? `rgba(139, 92, 246, ${Math.random() * 0.5 + 0.3})`
              : `rgba(34, 211, 238, ${Math.random() * 0.5 + 0.2})`,
          pulse: Math.random() * Math.PI * 2,
          pulseDir: 0.02 + Math.random() * 0.03,
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
      if (!ctx || !canvas || nodes.length === 0) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 170) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            const opacity = 0.1 * (1 - distance / 170);
            const gradient = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y,
            );
            gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity})`);
            gradient.addColorStop(1, `rgba(34, 211, 238, ${opacity})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        const pulseRadius = node.r + Math.sin(node.pulse) * 0.8;
        node.pulse += node.pulseDir;

        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        if (node.r > 2) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r + 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 92, 246, 0.05)`;
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

    draw();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Auto-slide logic
  useEffect(() => {
    if (testimonials.length === 0) return;

    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, testimonials.length]);

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setIsAutoPlaying(false);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setIsAutoPlaying(false);
    setIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) handleNext();
    if (touchStart - touchEnd < -75) handlePrev();
  };

  // ✅ No data state
  if (testimonials.length === 0) {
    return (
      <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 overflow-hidden bg-gradient-to-br from-[#0b0c18] via-[#0f0f1a] to-[#0b0c18]">
        <div className="text-center">
          <p className="text-white/40">
            {t?.premiumReviews?.noData || "No testimonials available"}
          </p>
        </div>
      </section>
    );
  }

  const currentReview = testimonials[index];

  // ✅ UI Rendering (বাকি অংশ অপরিবর্তিত)
  return (
    <section
      ref={containerRef}
      className={`relative py-16 md:py-24 lg:py-32 px-4 md:px-6 overflow-hidden bg-gradient-to-br from-[#0b0c18] via-[#0f0f1a] to-[#0b0c18] ${lang === "BN" ? "font-hind" : ""}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.45 }}
      />

      <div className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-900/15 blur-[100px] md:blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-900/15 blur-[100px] md:blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-4"
          >
            <span className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-cyan-500" />
            <p className="text-cyan-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] font-semibold">
              {t.premiumReviews?.badge || "Social Proof"}
            </p>
            <span className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-cyan-500" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-tight"
          >
            {t.premiumReviews?.title || "Trusted by"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-400">
              {t.premiumReviews?.titleGradient || "Industry Leaders"}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/40 text-sm md:text-base max-w-2xl mx-auto mt-3 md:mt-4 px-4"
          >
            {t.premiumReviews?.description ||
              "Don't just take our word for it — hear from our amazing clients around the world"}
          </motion.p>
        </div>

        {/* Main Testimonial Card */}
        <div
          className="relative min-h-[450px] md:min-h-[500px] flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -30 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
              className="absolute w-full max-w-3xl lg:max-w-4xl px-2 md:px-0"
            >
              <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:border-purple-500/30 transition-all duration-500 mx-2 md:mx-0">
                <div className="absolute top-4 md:top-8 right-4 md:right-8 text-6xl md:text-8xl opacity-5 text-white font-serif">
                  &quot;
                </div>

                <div className="p-6 md:p-10 lg:p-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="flex justify-center gap-1 md:gap-1.5 mb-6 md:mb-8"
                  >
                    {[...Array(currentReview.rating || 5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 fill-current drop-shadow-lg"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </motion.div>

                  <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-slate-200 mb-6 md:mb-10 leading-relaxed text-center italic px-2 md:px-4"
                  >
                    {currentReview.comment}
                  </motion.blockquote>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/20 shadow-xl bg-[#0b0c18]">
                        {currentReview.image ? (
                          <Image
                            src={currentReview.image}
                            alt={currentReview.name}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const parent = target.parentElement;
                              if (parent) {
                                const fallback = document.createElement("span");
                                fallback.className =
                                  "text-white text-xl font-bold flex items-center justify-center w-full h-full";
                                fallback.textContent =
                                  currentReview.name?.charAt(0) || "U";
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-white text-xl font-bold">
                              {currentReview.name?.charAt(0) || "U"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <h4 className="text-white font-bold text-lg md:text-xl mt-3 md:mt-4">
                      {currentReview.name}
                    </h4>

                    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mt-1">
                      <p className="text-slate-400 text-xs md:text-sm uppercase tracking-wider">
                        {currentReview.role}
                      </p>
                      <span className="hidden sm:inline text-white/20">•</span>
                      <p className="text-cyan-400 text-xs md:text-sm font-mono">
                        {currentReview.company}
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2">
                  <button
                    onClick={handlePrev}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 hover:bg-purple-500/20 hover:border-purple-500/50 flex items-center justify-center transition-all duration-300 group backdrop-blur-sm"
                    aria-label={
                      t.premiumReviews?.prevButton || "Previous review"
                    }
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-purple-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                </div>

                <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2">
                  <button
                    onClick={handleNext}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/50 flex items-center justify-center transition-all duration-300 group backdrop-blur-sm"
                    aria-label={t.premiumReviews?.nextButton || "Next review"}
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-cyan-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 md:gap-3 mt-8 md:mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsAutoPlaying(false);
                setIndex(i);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className={`relative h-1.5 transition-all duration-500 rounded-full overflow-hidden ${
                i === index
                  ? "w-12 md:w-16"
                  : "w-3 md:w-4 bg-white/10 hover:bg-white/20"
              }`}
              aria-label={`Go to review ${i + 1}`}
            >
              {i === index && isAutoPlaying && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/5"
        >
          {[
            {
              icon: "⭐",
              text:
                t.premiumReviews?.trustBadges?.rating || "4.9/5 Average Rating",
            },
            {
              icon: "😊",
              text:
                t.premiumReviews?.trustBadges?.happyClients ||
                "200+ Happy Clients",
            },
            {
              icon: "🏆",
              text:
                t.premiumReviews?.trustBadges?.projectsDelivered ||
                "50+ Projects Delivered",
            },
            {
              icon: "💬",
              text: t.premiumReviews?.trustBadges?.support || "24/7 Support",
            },
          ].map((badge, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="text-cyan-500 text-sm md:text-base">
                {badge.icon}
              </span>
              <span className="text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-wider whitespace-nowrap">
                {badge.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="block md:hidden text-center mt-6">
          <p className="text-white/20 text-[10px] font-mono uppercase tracking-wider">
            {t.premiumReviews?.swipeHint || "← Swipe to navigate →"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PremiumReviews;
