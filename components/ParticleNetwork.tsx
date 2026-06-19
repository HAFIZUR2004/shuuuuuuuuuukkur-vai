"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ParticleNetworkProps {
  opacity?: number;
  particleCount?: number;
  connectionDistance?: number;
  particleSize?: {
    min?: number;
    max?: number;
  };
  particleColor?: string;
  lineColor?: string;
  lineOpacity?: number;
  speed?: number;
  className?: string;
  glowEffect?: boolean;
  bgOpacity?: number;
}

export default function ParticleNetwork({
  opacity = 0.85,
  particleCount = 50,
  connectionDistance = 200,
  particleSize = { min: 1.8, max: 4.5 },
  particleColor = "rgba(139, 92, 246, 0.95)",
  lineColor = "rgba(139, 92, 246",
  lineOpacity = 0.4,
  speed = 0.8,
  className = "",
  glowEffect = true,
  bgOpacity = 0.15,
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const nodesRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      pulse: number;
      pulseDir: number;
      brightness: number;
    }>
  >([]);

  // Safe values with defaults
  const minSize = particleSize?.min ?? 1.8;
  const maxSize = particleSize?.max ?? 4.5;

  useEffect(() => {
    // Intersection Observer to pause animation when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return; // Skip animation if not visible

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let nodes = nodesRef.current;

    const initNodes = (width: number, height: number) => {
      const actualCount = Math.min(
        particleCount,
        Math.floor((width * height) / 15000),
      );
      nodes = [];
      for (let i = 0; i < actualCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          r: Math.random() * (maxSize - minSize) + minSize,
          pulse: Math.random() * Math.PI * 2,
          pulseDir: 0.04 + Math.random() * 0.06,
          brightness: 0.6 + Math.random() * 0.4,
        });
      }
      nodesRef.current = nodes;
    };

    const resize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      ctx.fillStyle = "#0b0c18";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      initNodes(canvas.width, canvas.height);
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", resize);

    const connectionDistSq = connectionDistance * connectionDistance; // Pre-calculate squared distance
    const lineOpacityCached = lineOpacity;

    const draw = () => {
      if (!ctx || !canvas || nodes.length === 0) return;
      const W = canvas.width;
      const H = canvas.height;

      // Clear with solid color instead of gradient (faster)
      ctx.fillStyle = "#0b0c18";
      ctx.fillRect(0, 0, W, H);

      // Simple background gradient - drawn once
      const bgGradient = ctx.createRadialGradient(
        W * 0.2,
        H * 0.4,
        0,
        W * 0.5,
        H * 0.5,
        W * 0.8,
      );
      bgGradient.addColorStop(0, `rgba(110, 60, 210, ${bgOpacity * 0.8})`);
      bgGradient.addColorStop(0.6, `rgba(80, 40, 180, ${bgOpacity * 0.4})`);
      bgGradient.addColorStop(1, `rgba(11, 12, 24, 0)`);
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, W, H);

      // Draw connections with optimized loop - use squared distance
      for (let i = 0; i < nodes.length; i++) {
        const node1 = nodes[i];
        // Only check next nodes to avoid duplicate lines
        for (let j = i + 1; j < nodes.length; j++) {
          const node2 = nodes[j];
          const dx = node1.x - node2.x;
          const dy = node1.y - node2.y;
          const distanceSq = dx * dx + dy * dy;

          if (distanceSq < connectionDistSq) {
            const distance = Math.sqrt(distanceSq);
            const connectionOpacity =
              lineOpacityCached * (1 - distance / connectionDistance);

            ctx.lineWidth = 1.5;
            ctx.strokeStyle = `rgba(139, 92, 246, ${connectionOpacity * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(node1.x, node1.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles - simplified glow
      nodes.forEach((node) => {
        node.pulse += node.pulseDir;
        // Compute pulse radius but clamp to a sensible minimum to prevent
        // negative or zero radii which crash the canvas API (IndexSizeError).
        const rawPulse = node.r + Math.sin(node.pulse) * 0.8;
        const minAllowedRadius = Math.max(0.5, minSize * 0.25);
        const pulseRadius = Math.max(minAllowedRadius, rawPulse);

        // Skip expensive glow for smaller particles
        if (glowEffect && node.r > 2.5) {
          const glowRadius = Math.max(pulseRadius + 2, minAllowedRadius + 1);
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 92, 246, 0.15)`;
          ctx.fill();
        }

        // Draw particle — guard before calling arc
        if (pulseRadius > 0) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 92, 246, 0.8)`;
          ctx.fill();

          // Core highlight (smaller positive radius)
          const coreRadius = Math.max(
            pulseRadius * 0.4,
            minAllowedRadius * 0.5,
          );
          ctx.beginPath();
          ctx.arc(node.x - 1, node.y - 1, coreRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
          ctx.fill();
        }

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around screen
        const margin = 20;
        if (node.x < -margin) node.x = canvas.width + margin;
        if (node.x > canvas.width + margin) node.x = -margin;
        if (node.y < -margin) node.y = canvas.height + margin;
        if (node.y > canvas.height + margin) node.y = -margin;
      });

      animId = requestAnimationFrame(draw);
    };

    if (isVisible) {
      draw();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
    };
  }, [
    isVisible,
    particleCount,
    connectionDistance,
    lineOpacity,
    speed,
    glowEffect,
    bgOpacity,
    maxSize,
    minSize,
  ]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full" style={{ opacity }} />
    </motion.div>
  );
}
