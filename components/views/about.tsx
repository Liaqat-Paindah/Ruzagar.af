"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  Code2,
  Server,
  Database,
  Cloud,
  Shield,
  GitBranch,
  Users,
  Rocket,
  CheckCircle,
  ExternalLink,
  Monitor,
  Cpu,
  Activity,
  FolderGit2,
  Timer,
  Terminal,
  Sparkles,
  GraduationCap,
  Languages,
  Quote,

  Award,
  Target,
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    { value: "6+", label: "Years Experience", icon: Timer },
    { value: "20+", label: "Projects", icon: FolderGit2 },
    { value: "30+", label: "Technologies", icon: Cpu },
    { value: "15+", label: "Clients", icon: Users },
  ];

  const expertise = [
    { category: "Frontend", icon: Monitor, tech: "React, Next.js, TypeScript" },
    { category: "Backend", icon: Server, tech: "Node.js, Laravel, Python" },
    { category: "Database", icon: Database, tech: "PostgreSQL, MongoDB, Redis" },
    { category: "DevOps", icon: Cloud, tech: "Docker, K8s, AWS, CI/CD" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[50px_50px]" />
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-[100px]"
        />
      </div>

      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              LP
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm text-slate-300 text-sm hover:bg-slate-800/50 hover:text-white transition-all duration-300"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs text-blue-400 font-medium">About Me</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Liaqat Paindah
            </h1>
            <p className="text-slate-400 mt-3 text-lg">Senior Full Stack Developer</p>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 to-purple-600/20 rounded-sm blur opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="relative bg-slate-900/60 border border-slate-700 rounded-sm p-4 text-center backdrop-blur-sm">
                  <stat.icon className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Professional Summary - Short & Impactful */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative group mb-12"
          >
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-purple-600 rounded-sm blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative bg-slate-900/60 backdrop-blur-sm border border-slate-700 rounded-sm p-6">
              <Quote className="h-8 w-8 text-blue-400/30 mb-3" />
              <p className="text-slate-200 leading-relaxed text-lg">
                6+ years crafting <span className="text-blue-400">scalable enterprise apps</span> with modern JavaScript ecosystems. 
                Expert in <span className="text-purple-400">Next.js, React, Node.js</span> and cloud-native infrastructure.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Next.js", "React", "Node.js", "TypeScript", "Docker", "K8s"].map((skill) => (
                  <span key={skill} className="px-2 py-1 text-xs bg-slate-800 text-slate-300 rounded-sm border border-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Expertise Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {expertise.map((item, idx) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + idx * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="bg-slate-900/50 border border-slate-700 rounded-sm p-4 text-center"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-sm bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <item.icon className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-sm font-semibold text-white">{item.category}</h3>
                <p className="text-xs text-slate-400 mt-1">{item.tech}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-slate-900/40 border border-slate-700 rounded-sm p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <GraduationCap className="h-5 w-5 text-blue-400" />
                <h3 className="text-white font-semibold">Education</h3>
              </div>
              <p className="text-white text-sm">Bachelor of Information Technology</p>
              <p className="text-slate-400 text-xs">Kabul Education University | 2015-2018</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.75 }}
              className="bg-slate-900/40 border border-slate-700 rounded-sm p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <Languages className="h-5 w-5 text-blue-400" />
                <h3 className="text-white font-semibold">Languages</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm">English</span>
                  <span className="text-xs text-blue-400">Fluent</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm">Dari/Persian</span>
                  <span className="text-xs text-blue-400">Native</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm">Pashto</span>
                  <span className="text-xs text-blue-400">Native</span>
                </div>
              </div>
            </motion.div>
          </div>

     
        </div>
      </div>
    </div>
  );
}