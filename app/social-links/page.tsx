"use client";

import React from "react";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
  FaGlobe,
} from "react-icons/fa6";

// Your social media links
const SOCIAL_LINKS = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    url: "https://www.facebook.com/growbusinesssolutionsbd",
    color: "#1877F2",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    url: "https://github.com/Grow-Businesssolutionsbd",
    color: "#333",
  },
  {
    name: "X (Twitter)",
    icon: FaXTwitter,
    url: "https://x.com/GrowBS_BD",
    color: "#000",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/growbusinesssolutions/",
    color: "#E4405F",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/company/grow-business-solutionsbd/",
    color: "#0A66C2",
  },
];

export default function SocialMediaPage() {
  const websiteUrl = "https://www.growbusinessbd.com";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(websiteUrl);
      alert("Website link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#03050b] via-[#0a0c18] to-[#02040a] flex items-center justify-center p-6">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2310b981' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Logo / Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 border border-emerald-500/30 mb-4">
              <span className="text-2xl font-black bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
                GBS
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
              GROW
            </h1>
            <p className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-[0.2em] mt-1">
              Business Solutions
            </p>
          </div>

          {/* Website Link Section - Main */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-700/10 rounded-xl p-4 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <FaGlobe className="text-emerald-400" size={16} />
                </div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.2em]">
                  Visit Our Website
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white/70 hover:text-emerald-400 transition-colors truncate flex-1"
                >
                  {websiteUrl.replace("https://www.", "")}
                </a>
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1 text-[9px] font-mono uppercase tracking-wider text-emerald-400 hover:text-white hover:bg-emerald-500/20 rounded transition-all"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-[9px] font-mono text-white/20 bg-transparent">
                CONNECT WITH US
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            {SOCIAL_LINKS.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-110"
                  style={{ backgroundColor: `${social.color}20` }}
                >
                  <social.icon size={18} style={{ color: social.color }} />
                </div>
                <span className="flex-1 font-medium text-white/70 group-hover:text-white transition-colors">
                  {social.name}
                </span>
                <span className="text-white/20 group-hover:text-emerald-400 transition-colors text-xs">
                  ➤
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-[7px] text-white/10 font-mono tracking-[0.2em] mt-6">
          GROW BUSINESS SOLUTIONS • SOCIAL HUB
        </p>
      </div>
    </main>
  );
}