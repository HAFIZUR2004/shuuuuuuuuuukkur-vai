'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Heart, Target, TrendingUp, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function VisionPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Advanced Particle + Wire Network Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: any[] = [];
    let wires: any[] = [];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      originalX: number;
      originalY: number;
      pulsePhase: number;

      constructor(x?: number, y?: number) {
        if (!canvas) {
          this.x = 0;
          this.y = 0;
        } else {
          this.x = x || Math.random() * canvas.width;
          this.y = y || Math.random() * canvas.height;
        }
        this.originalX = this.x;
        this.originalY = this.y;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.radius = Math.random() * 2.5 + 1;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      draw(time: number) {
        if (!ctx || !canvas) return;
        const pulse = 0.5 + Math.sin(time * 0.003 + this.pulsePhase) * 0.3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * (0.8 + pulse * 0.2), 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2);
        gradient.addColorStop(0, `rgba(108, 92, 231, ${0.8 + pulse * 0.2})`);
        gradient.addColorStop(1, `rgba(0, 206, 201, ${0.3 + pulse * 0.1})`);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + pulse * 0.3})`;
        ctx.fill();
      }

      update() {
        if (!canvas) return;
        const dx = mousePosition.x - this.x;
        const dy = mousePosition.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const angle = Math.atan2(dy, dx);
          const force = (200 - dist) / 200 * 0.5;
          this.vx -= Math.cos(angle) * force;
          this.vy -= Math.sin(angle) * force;
        }
        
        this.vx += (this.originalX - this.x) * 0.005;
        this.vy += (this.originalY - this.y) * 0.005;
        this.vx *= 0.98;
        this.vy *= 0.98;
        
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -0.5;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -0.5;
      }
    }

    class Wire {
      points: { x: number; y: number }[];
      phase: number;
      
      constructor() {
        this.phase = Math.random() * Math.PI * 2;
        this.points = [];
        
        if (canvas) {
          const startX = Math.random() * canvas.width;
          const startY = Math.random() * canvas.height;
          let currentX = startX;
          let currentY = startY;
          
          for (let i = 0; i < 8; i++) {
            currentX += (Math.random() - 0.5) * 80;
            currentY += (Math.random() - 0.5) * 80;
            this.points.push({ x: currentX, y: currentY });
          }
        }
      }
      
      draw(time: number) {
        if (!ctx || !canvas || this.points.length === 0) return;
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        
        for (let i = 1; i < this.points.length; i++) {
          const cp1x = this.points[i-1].x + (this.points[i].x - this.points[i-1].x) * 0.3;
          const cp1y = this.points[i-1].y + (this.points[i].y - this.points[i-1].y) * 0.3;
          const cp2x = this.points[i].x - (this.points[i].x - this.points[i-1].x) * 0.3;
          const cp2y = this.points[i].y - (this.points[i].y - this.points[i-1].y) * 0.3;
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, this.points[i].x, this.points[i].y);
        }
        
        const gradient = ctx.createLinearGradient(
          this.points[0].x, this.points[0].y, 
          this.points[this.points.length-1].x, this.points[this.points.length-1].y
        );
        gradient.addColorStop(0, `rgba(108, 92, 231, ${0.1 + Math.sin(time * 0.001 + this.phase) * 0.05})`);
        gradient.addColorStop(1, `rgba(0, 206, 201, ${0.1 + Math.cos(time * 0.001 + this.phase) * 0.05})`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      
      update() {
        this.points.forEach((point, i) => {
          point.x += Math.sin(Date.now() * 0.0005 + this.phase + i) * 0.3;
          point.y += Math.cos(Date.now() * 0.0004 + this.phase + i) * 0.3;
        });
      }
    }

    const initParticles = () => {
      if (!canvas) return;
      particles = [];
      const particleCount = Math.min(120, Math.floor((canvas.width * canvas.height) / 8000));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const initWires = () => {
      if (!canvas) return;
      wires = [];
      const wireCount = Math.min(15, Math.floor((canvas.width * canvas.height) / 50000));
      for (let i = 0; i < wireCount; i++) {
        wires.push(new Wire());
      }
    };

    const drawConnections = () => {
      if (!ctx || !canvas) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 180;

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = 0.12 * (1 - distance / maxDistance);
            
            const dashOffset = Date.now() * 0.001;
            ctx.setLineDash([5, 10]);
            ctx.lineDashOffset = dashOffset;
            ctx.strokeStyle = `rgba(108, 92, 231, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }
    };

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
      initWires();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(11, 12, 24, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      wires.forEach(wire => {
        wire.draw(Date.now());
        wire.update();
      });
      
      drawConnections();
      
      particles.forEach(particle => {
        particle.draw(Date.now());
        particle.update();
      });
      
      animId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [mousePosition]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />
      
      <main className="relative min-h-screen text-white z-10 overflow-x-hidden">
        
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-8 left-8 z-50"
        >
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-all duration-300 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-7xl mx-auto px-6 py-24 md:py-32"
        >
          
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 border border-[#6c5ce7]/30 bg-[#6c5ce7]/10 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8"
            >
              <motion.span 
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[#00cec9]" 
              />
              <span className="text-[10px] tracking-[0.3em] text-white uppercase font-bold">OUR VISION & MISSION</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-8 tracking-tighter"
            >
              Digital Solutions
              <br />
              <span className="bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#00cec9] bg-clip-text text-transparent animate-gradient">
                For Everyone
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white/50 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            >
              We believe that <span className="text-white font-semibold">high-quality digital platforms</span> shouldn't be a luxury. 
              Our mission is to make <span className="text-[#00cec9] font-semibold">affordable, modern web solutions</span> accessible to 
              businesses of all sizes.
            </motion.p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#6c5ce7]/5 to-[#00cec9]/5 border border-white/10 rounded-3xl p-10 md:p-16 mb-24 overflow-hidden"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-0 right-0 w-64 h-64 bg-[#6c5ce7]/20 blur-[100px] rounded-full" 
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-0 left-0 w-64 h-64 bg-[#00cec9]/10 blur-[100px] rounded-full" 
            />
            
            <div className="relative z-10 text-center">
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#6c5ce7]/20 to-[#00cec9]/20 flex items-center justify-center border border-white/10"
              >
                <Target size={40} className="text-[#6c5ce7]" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Core Belief</h2>
              <p className="text-white/70 text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
                "A great website isn't just for big corporations — 
                <span className="text-white font-bold"> every dreamer, entrepreneur, and small business</span> 
                deserves a modern, fast, and effective digital platform at an <span className="text-[#00cec9] font-bold">affordable price</span>."
              </p>
            </div>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative mb-24"
          >
            <div className="bg-gradient-to-r from-[#6c5ce7]/10 via-transparent to-[#00cec9]/10 border border-white/10 rounded-3xl p-10 md:p-14">
              <div className="text-center mb-10">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp size={32} className="text-[#00cec9] mx-auto mb-4" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Grow Business Solutions?</h2>
                <p className="text-white/50 text-lg max-w-2xl mx-auto">
                  We don't just write code — we build digital tools that drive real business growth
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  { value: "0%", label: "Hidden Charges", color: "#6c5ce7" },
                  { value: "∞", label: "Unlimited Revisions", color: "#00cec9" },
                  { value: "24/7", label: "Support Available", color: "#6c5ce7" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 cursor-pointer"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="text-4xl md:text-5xl font-black mb-2"
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </motion.div>
                    <p className="text-white/60 text-sm">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-full px-6 py-2 mb-8"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={14} className="text-[#00cec9]" />
              </motion.div>
              <span className="text-xs tracking-wide text-white/50">Start Your Journey Today</span>
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Dream Website?</h3>
            <p className="text-white/50 mb-10 max-w-md mx-auto">
              Book a free consultation and let's discuss your vision
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/ContactUs">
                <button className="group px-10 py-5 bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] rounded-2xl font-black text-xs tracking-widest uppercase shadow-[0_0_30px_rgba(108,92,231,0.4)] hover:shadow-[0_0_50px_rgba(108,92,231,0.6)] transition-all duration-300 cursor-pointer flex items-center gap-3 mx-auto">
                  Start Your Journey
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>
      </main>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
}