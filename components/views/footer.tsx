// components/Footer.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative z-10 border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Liaqat Paindah
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Senior Full Stack Developer crafting scalable, high-performance
              web applications with modern technologies.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-1 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Core Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Next.js",
                "React",
                "Node.js",
                "TypeScript",
                "MongoDB",
                "Tailwind",
                "PostgreSQL",
              ].map((tech, idx) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  className="px-2 py-1 text-xs font-mono bg-slate-800/50 border border-slate-700 text-slate-300 rounded-md"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Availability
            </h3>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-400">
                Open for opportunities
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Available for full-time positions, freelance work, and technical
              consultations.
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-500"
        >
          <p>© {currentYear} Liaqat Paindah. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Sparkles className="h-3 w-3 text-blue-400" />
            <span>using Supabase, Next.js & Tailwind CSS</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
