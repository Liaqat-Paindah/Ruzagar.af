"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
  Award,
  Users,
  Rocket,
  CheckCircle,
  TrendingUp,
  Zap,
  Clock,
  Layers,
  Microscope,
  Sparkles,
  Download,
  ExternalLink,
  Star,
  Heart,
  Globe,
  Smartphone,
  Monitor,
  Cpu,
  Network,
  Lock,
  BarChart3,
  Activity,
  Target,
  Eye,
  FolderGit2,
  Coffee,
  Brain,
  Boxes,
  Workflow,
  Timer,
} from "lucide-react";

// Professional color scheme
const colors = {
  primary: "#3b82f6",
  primaryDark: "#2563eb",
  secondary: "#8b5cf6",
  dark: "#0f172a",
  darker: "#020617",
  slate: "#1e293b",
  slateLight: "#334155",
  text: "#f1f5f9",
  textMuted: "#94a3b8",
};

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const scaleOnHover = {
  whileHover: { scale: 1.02, transition: { duration: 0.2 } },
};

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState({});
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Intersection Observer for section tracking
  useEffect(() => {
    const sections = ["hero", "skills", "experience", "projects"];
    const observers = sections.map((section) => {
      const ref = {
        hero: heroRef,
        skills: skillsRef,
        experience: experienceRef,
        projects: projectsRef,
      }[section];
      
      if (ref?.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveSection(section);
          },
          { threshold: 0.3 }
        );
        observer.observe(ref.current);
        return observer;
      }
      return null;
    });
    
    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Skills data from CV
  const skills = {
    frontend: {
      icon: Monitor,
      title: "Frontend",
      items: ["React.js", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "Bootstrap", "Chart.js", "D3.js"],
    },
    backend: {
      icon: Server,
      title: "Backend",
      items: ["Node.js", "Express.js", "Laravel", "PHP", "REST APIs", "Microservices", "Event-Driven Architecture"],
    },
    database: {
      icon: Database,
      title: "Database",
      items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase", "Query Optimization", "Indexing"],
    },
    devops: {
      icon: Cloud,
      title: "DevOps & Tools",
      items: ["Docker", "Kubernetes", "Nginx", "GitHub Actions", "CI/CD", "DigitalOcean", "AWS ECS"],
    },
    security: {
      icon: Shield,
      title: "Security",
      items: ["JWT", "OAuth2", "RBAC", "Row Level Security", "XSS/CSRF Protection", "SQL Injection Prevention"],
    },
    tools: {
      icon: GitBranch,
      title: "Development Tools",
      items: ["Git", "Postman", "Agile Development", "Performance Monitoring", "System Design"],
    },
  };

  // Experience data
  const experiences = [
    {
      company: "Allneeda.com",
      location: "Remote USA",
      period: "May 2025 – Feb 2026",
      role: "Full Stack Engineer",
      achievements: [
        "Architected scalable web apps using Next.js 15+ with App Router, achieving Core Web Vitals >95%",
        "Engineered high-performance RESTful APIs with JWT, OAuth2, and RBAC for multi-tenant security",
        "Integrated Supabase real-time subscriptions with WebSockets for live dashboards",
        "Developed geospatial systems using Google Maps APIs for radius-based search and polygon filtering",
        "Secured applications against XSS, CSRF, SQL injection - zero critical vulnerabilities",
      ],
      technologies: ["Next.js", "React", "Node.js", "Supabase", "Google Maps API", "Chart.js"],
    },
    {
      company: "MgtWell Consulting Services",
      location: "Kabul, Afghanistan",
      period: "Feb 2023 – Present",
      role: "Software Developer",
      achievements: [
        "Designed interactive web apps using React and Laravel with scalable interfaces",
        "Implemented API integrations, authentication, and payment gateways",
        "Developed Google Maps features for location-based services on Android/iOS",
        "Led testing, QA, and mentoring junior developers",
      ],
      technologies: ["React", "Laravel", "PHP", "Google APIs", "Payment Gateways"],
    },
    {
      company: "ARDHO",
      location: "Kabul, Afghanistan",
      period: "May 2024 – Dec 2024",
      role: "System Developer",
      achievements: [
        "Designed microservices with Laravel/Node.js using Event-Driven Architecture with Redis",
        "Integrated Clerk (MFA), Stripe payments, and Uploadthing with AWS S3",
        "Orchestrated Docker deployments on AWS ECS Fargate with blue-green deployment",
        "Optimized SSR with Next.js/Nuxt.js using CDN caching via Cloudflare",
      ],
      technologies: ["Laravel", "Node.js", "Redis", "Docker", "AWS ECS", "Stripe"],
    },
    {
      company: "Gulnegar Co.",
      location: "Kabul, Afghanistan",
      period: "Sep 2021 – Dec 2022",
      role: "Full Stack Developer",
      achievements: [
        "Developed SPAs and SSR with Vue 3 and Next.js using Webpack module federation",
        "Built modular APIs with Laravel and Node.js using Repository pattern",
        "Integrated Resend emails, Twilio SMS/OTP, and Stripe Connect",
        "Optimized frontend performance with Core Web Vitals monitoring",
      ],
      technologies: ["Vue 3", "Next.js", "Laravel", "Node.js", "Stripe Connect", "Twilio"],
    },
    {
      company: "Tawangaran Co.",
      location: "Kabul, Afghanistan",
      period: "Jul 2017 – Jul 2020",
      role: "Full Stack Developer",
      achievements: [
        "Designed RESTful APIs for system integration",
        "Developed responsive UIs with HTML5, CSS3, JavaScript, Tailwind",
        "Enhanced performance through code splitting and lazy loading",
        "Implemented security best practices (SQL injection, XSS, HTTPS)",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "REST APIs"],
    },
  ];

  // Projects data
  const projects = [
    {
      name: "Kimia Omran",
      url: "https://kimiaomran.com",
      description: "Engineering Management System",
      features: ["Project tracking", "Resource allocation", "Task management", "Reporting dashboard"],
    },
    {
      name: "HRS MgtWell",
      url: "https://www.hrs.mgtwell.com",
      description: "HR Management System",
      features: ["Employee management", "Leave tracking", "Payroll integration", "Performance reviews"],
    },
    {
      name: "Ayandaha",
      url: "https://ayandaha.com",
      description: "Educational Consulting System",
      features: ["Student management", "Course enrollment", "Consultation booking", "Progress tracking"],
    },
    {
      name: "HRS Ardho",
      url: "https://hrs.ardho.org",
      description: "HRMIS Platform",
      features: ["Multi-tenant HRIS", "Role-based access", "Analytics dashboard", "Report generation"],
    },
  ];

  // Stats data
  const stats = [
    { label: "Years Experience", value: "6+", icon: Timer },
    { label: "Projects Delivered", value: "20+", icon: FolderGit2 },
    { label: "Technologies", value: "30+", icon: Cpu },
    { label: "Happy Clients", value: "15+", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 max-w-6xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-xs text-blue-400 font-medium">Available for opportunities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4"
          >
            Liaqat Paindah
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl text-slate-300 mb-6"
          >
            Senior Full Stack Developer
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-400 max-w-2xl mx-auto mb-8"
          >
            6+ years of experience designing, architecting, and delivering scalable, high-performance 
            web applications with modern JavaScript frameworks and cloud-native architectures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/Liaqat_Paindah_CV.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-600 text-slate-300 font-medium rounded-lg hover:bg-slate-800/50 transition-all"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 text-slate-400 text-sm"
          >
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              liaqat.paindah@gmail.com
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              Kabul, Afghanistan
            </span>
     
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center">
            <div className="w-1 h-2 bg-blue-400 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-slate-800 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-3">Technical Expertise</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Comprehensive skill set across modern web technologies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.values(skills).map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 rounded-lg bg-blue-500/10">
                    <category.icon className="h-4 w-4 text-blue-400" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-xs font-medium bg-slate-800 text-slate-300 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} className="py-20 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-3">Professional Experience</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              6+ years of progressive experience in full-stack development
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />

            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row gap-4 mb-8 ${
                  idx % 2 === 0 ? "md:pr-[50%]" : "md:pl-[50%] md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500 border-2 border-slate-900" />

                <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                      <p className="text-blue-400 text-sm">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar className="h-3 w-3" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-1.5 mb-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle className="h-3.5 w-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-medium bg-slate-700/50 text-slate-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-3">Featured Projects</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Enterprise-grade applications delivered for clients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project, idx) => (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-slate-400">{project.description}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-0.5 text-[10px] font-medium bg-slate-800 text-slate-400 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 border-t border-slate-800 bg-slate-900/20">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 border border-slate-700 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-3">Ready to Build Something Great?</h2>
            <p className="text-slate-400 mb-6">
              Let's discuss how my expertise can help bring your next project to life
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
              >
                Start a Conversation
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>© {currentYear ? `${currentYear} ` : ""}Liaqat Paindah. All rights reserved.</p>
      </footer>
    </div>
  );
}
