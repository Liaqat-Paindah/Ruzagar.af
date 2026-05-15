// app/skills/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Monitor,
  Server,
  Database,
  Cloud,
  Shield,
  GitBranch,
  Code2,
  Terminal,
  Sparkles,
  CheckCircle,
  Cpu,
  Network,
  Lock,
  Zap,
  Layers,
  Boxes,
} from "lucide-react";

const skillsData = {
  frontend: {
    icon: Monitor,
    title: "Frontend Engineering",
    proficiency: 95,
    technologies: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Vue.js", level: 85 },
    ],
  },
  backend: {
    icon: Server,
    title: "Backend Engineering",
    proficiency: 92,
    technologies: [
      { name: "Node.js", level: 94 },
      { name: "Laravel", level: 90 },
      { name: "Express.js", level: 88 },
      { name: "REST APIs", level: 95 },
      { name: "Microservices", level: 85 },
    ],
  },
  database: {
    icon: Database,
    title: "Database Management",
    proficiency: 88,
    technologies: [
      { name: "PostgreSQL", level: 90 },
      { name: "MongoDB", level: 88 },
      { name: "Redis", level: 85 },
      { name: "MySQL", level: 87 },
      { name: "Supabase", level: 82 },
    ],
  },
  devops: {
    icon: Cloud,
    title: "DevOps & Cloud",
    proficiency: 85,
    technologies: [
      { name: "Docker", level: 88 },
      { name: "Kubernetes", level: 82 },
      { name: "AWS ECS", level: 85 },
      { name: "CI/CD", level: 90 },
      { name: "Nginx", level: 85 },
    ],
  },
  security: {
    icon: Shield,
    title: "Security",
    proficiency: 88,
    technologies: [
      { name: "JWT/OAuth2", level: 92 },
      { name: "RBAC", level: 90 },
      { name: "Encryption", level: 85 },
      { name: "XSS/CSRF", level: 88 },
      { name: "SQL Injection", level: 90 },
    ],
  },
  tools: {
    icon: Terminal,
    title: "Dev Tools",
    proficiency: 90,
    technologies: [
      { name: "Git", level: 95 },
      { name: "Docker Compose", level: 88 },
      { name: "GitHub Actions", level: 85 },
      { name: "Postman", level: 92 },
      { name: "VSCode", level: 90 },
    ],
  },
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden relative">
      {/* Background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size:50px_50px" />
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
            <Link
              href="/"
              className="text-xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
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

      <div className="relative z-10 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs text-blue-400 font-medium">
                Technical Arsenal
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h1>
            <p className="text-slate-400 mt-3">
              30+ technologies mastered over 6+ years
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(skillsData).map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600/20 to-purple-600/20 rounded-sm blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative bg-slate-900/60 backdrop-blur-sm border border-slate-700 rounded-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-sm bg-blue-500/10 border border-blue-500/20">
                      <category.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {category.title}
                    </h3>
                    <span className="ml-auto text-xs text-blue-400 font-mono">
                      {category.proficiency}%
                    </span>
                  </div>

                  <div className="space-y-3">
                    {category.technologies.map((tech, techIdx) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + techIdx * 0.05 }}
                      >
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-300">{tech.name}</span>
                          <span className="text-slate-500">{tech.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${tech.level}%` }}
                            transition={{
                              delay: idx * 0.1 + techIdx * 0.05,
                              duration: 0.8,
                              ease: "easeOut",
                            }}
                            className="h-full bg-linear-to-r from-blue-500 to-purple-500 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications & Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12"
          >
            <div className="bg-slate-900/40 border border-slate-700 rounded-sm p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-400" />
                Core Competencies
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  "Clean Architecture",
                  "Agile Methodologies",
                  "Performance Optimization",
                  "Security Hardening",
                  "CI/CD Automation",
                  "Code Review",
                  "Technical Documentation",
                  "Team Mentorship",
                ].map((comp, idx) => (
                  <motion.div
                    key={comp}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + idx * 0.05 }}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <CheckCircle className="h-3.5 w-3.5 text-blue-400" />
                    {comp}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
