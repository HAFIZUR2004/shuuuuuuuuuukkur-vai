"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { translations } from "@/constants/translations";
import { useLanguage } from "@/constants/LanguageContext";

import {
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2024);
  const { lang } = useLanguage();
  const t = translations[lang];
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const socialLinks = [
    { Icon: FaFacebookF, url: "https://www.facebook.com/growbusinesssolutionsbd" },
    { Icon: FaGithub, url: "https://github.com/Grow-Businesssolutionsbd" },
    { Icon: FaXTwitter, url: "https://x.com/GrowBS_BD" },
    { Icon: FaInstagram, url: "https://www.instagram.com/growbusinesssolutions/" },
    { Icon: FaLinkedinIn, url: "https://www.linkedin.com/company/grow-business-solutionsbd/" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0b0c18] pt-16 pb-0 overflow-hidden"
    >
      {/* ========== MAIN FOOTER CONTENT ========== */}
      <div className="relative z-10 max-w-7xl font-hind mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="relative w-10 h-10">
                <Image
                  src="https://i.postimg.cc/yYds37Q3/logo-preview.png"
                  alt="Grow Business Solutions"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Grow Business
                </h2>
                <p className="text-[8px] font-mono text-indigo-400 uppercase tracking-widest">
                  Solutions
                </p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              {t.footerDesc ||
                "Building digital ecosystems for the modern era. Trusted by businesses worldwide."}
            </p>
            <div className="flex gap-3 pt-1">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-indigo-500 hover:text-white transition-all duration-200 border border-white/10 hover:border-indigo-400"
                >
                  <social.Icon size={14} className="text-white/60" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Link */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white mb-2">
              {t.quickLinkTitle || "Quick Link"}
            </h4>
            {/* Decorative Dots */}
            <div className="flex gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-indigo-400/60" />
              ))}
            </div>
            <ul className="space-y-2.5">
              {[
                { label: t.home || "Home", href: "/" },
                { label: t.aboutUs || "About Us", href: "/about" },
                { label: t.services || "Services", href: "/services" },
                { label: t.product || "Product", href: "/products" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-white/50 hover:text-indigo-400 transition-colors duration-200"
                  >
                    <span className="text-indigo-400 text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Blog */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white mb-2">
              {t.blogTitle || "Blog"}
            </h4>
            {/* Decorative Dots */}
            <div className="flex gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-indigo-400/60" />
              ))}
            </div>
            <ul className="space-y-4">
              {[
                {
                  label: t.blogPost1 || "Anything You Want To Know Is Here",
                  date: "April 14, 2024",
                  href: "/blog/post-1",
                },
                {
                  label: t.blogPost2 || "Anything You Want To Know Is Here",
                  date: "April 14, 2024",
                  href: "/blog/post-2",
                },
              ].map((post, idx) => (
                <li key={idx}>
                  <Link
                    href={post.href}
                    className="block text-sm text-white/50 hover:text-indigo-400 transition-colors duration-200"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-indigo-400 text-xs">›</span>
                      {post.label}
                    </span>
                    <span className="text-[10px] text-white/30 mt-0.5 block">
                      {post.date}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white mb-2">
              {t.contactTitle || "Contact"}
            </h4>
            {/* Decorative Dots */}
            <div className="flex gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-indigo-400/60" />
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-white/50">
                <FaLocationDot size={16} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                <span>
                  {t.address || "House 76/A, Road 11, Banani, Dhaka, Banani Model Town, Bangladesh"}
                </span>
              </div>
              <a
                href="mailto:growbusinesssolutionsbd@gmail.com"
                className="flex items-center gap-3 text-sm text-white/50 hover:text-indigo-400 transition-colors"
              >
                <FaEnvelope size={15} className="text-indigo-400 flex-shrink-0" />
                <span className="break-all">growbusinesssolutionsbd@gmail.com</span>
              </a>
              <a
                href="tel:+8801884369340"
                className="flex items-center gap-3 text-sm text-white/50 hover:text-indigo-400 transition-colors"
              >
                <FaPhone size={15} className="text-indigo-400 flex-shrink-0" />
                <span>{t.phone || "+880 1884 369340"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========== WAVE DIVIDER & BOTTOM BAR ========== */}
      <div className="relative mt-8">
        {/* Wave SVG */}
        <div className="absolute inset-x-0 bottom-0 h-16 overflow-hidden">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M0,60 C360,120 720,0 1080,60 L1440,60 L1440,120 L0,120 Z"
              fill="#0f111f"
              opacity="0.5"
            />
            <path
              d="M0,80 C480,20 960,140 1440,80 L1440,120 L0,120 Z"
              fill="#1a1b2e"
              opacity="0.3"
            />
            <path
              d="M0,100 C600,40 1200,160 1440,100 L1440,120 L0,120 Z"
              fill="#0b0c18"
              opacity="0.2"
            />
          </svg>
        </div>

        {/* Bottom Content */}
        <div className="relative z-10 px-6 md:px-12 py-6 text-center">
          <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
            © {currentYear} Grow Business Solutions. {t.allRights || "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}