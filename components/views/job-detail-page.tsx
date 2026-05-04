"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  Send,
  Bookmark,
  Share2,
  Users,
  Mail,
  Monitor,
  BadgeCheck,
  Calendar,
  Building2,
  GraduationCap,
  Heart,
  CheckCircle2,
  ExternalLink,
  Copy,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GetJobs } from "@/hooks/useJobs";
import { toast } from "sonner";
import { normalizeRichTextHtml } from "@/lib/rich-text";

const formatDate = (value: string) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data, isPending, error } = GetJobs();
  const job = data?.data.find((item) => String(item.id) === id);
  
  const [isSaved, setIsSaved] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const skills = job?.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
  const descriptionHtml = normalizeRichTextHtml(job?.description ?? "");

  const handleApply = async () => {
    setIsApplying(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsApplying(false);
    toast.success("Application submitted successfully!");
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!");
    setShowShareMenu(false);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "closed":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "draft":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      default:
        return "bg-secondary text-muted-foreground";
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Loading job details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">Job not found.</p>
          <Link href="/" className="text-primary hover:underline mt-2 inline-block">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="h-2 nexus-gradient" />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="relative">
            Back to Jobs
            <span className="absolute bottom-0 left-0 w-full h-px bg-foreground/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </span>
        </Link>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="nexus-card p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-primary/5 to-transparent rounded-bl-full" />

            <div className="flex items-start gap-5 relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="nexus-gradient h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg nexus-glow"
              >
                <span className="text-primary-foreground font-display font-bold text-2xl">
                  {job.company.charAt(0)}
                </span>
              </motion.div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="font-display text-3xl font-bold text-foreground">{job.title}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <Building2 className="h-4 w-4 text-primary" />
                      <p className="text-lg text-muted-foreground">{job.company}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { icon: MapPin, label: "Location", value: job.location },
                { icon: Briefcase, label: "Job Type", value: job.jobType },
                { icon: DollarSign, label: "Salary", value: job.salary },
                { icon: Clock, label: "Posted", value: formatDate(job.postedDate) },
                { icon: Users, label: "Vacancies", value: String(job.vacancies) },
                { icon: Monitor, label: "Remote", value: job.remoteOption },
                { icon: BadgeCheck, label: "Status", value: job.status },
                { icon: Mail, label: "Contact", value: job.contactEmail },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -2 }}
                  className="p-4 rounded-sm bg-secondary/50 border border-border hover:border-primary/20 transition-all"
                >
                  <item.icon className="h-5 w-5 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5 ">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills?.length ? (
                  skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 rounded-sm bg-linear-to-r from-primary/10 to-accent text-accent-foreground text-sm font-medium border border-primary/10 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No skills listed.</p>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="h-5 w-5 text-primary" />
                <h2 className="font-display text-lg font-semibold text-foreground">Job Description</h2>
              </div>
              {descriptionHtml ? (
                <div
                  className="prose prose-sm max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-p:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
              ) : (
                <p className="text-muted-foreground leading-relaxed">
                  No description provided.
                </p>
              )}

              <div className="grid gap-4 md:grid-cols-3 mt-6">
                <div className="rounded-sm border border-border bg-secondary/40 p-4">
                  <p className="text-xs text-muted-foreground">Application Deadline</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {formatDate(job.deadline)}
                  </p>
                </div>
                <div className="rounded-sm border border-border bg-secondary/40 p-4">
                  <p className="text-xs text-muted-foreground">Preferred Gender</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{job.gender}</p>
                </div>
                <div className="rounded-sm border border-border bg-secondary/40 p-4">
                  <p className="text-xs text-muted-foreground">Company</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{job.company}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Compact Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="nexus-card p-4  bottom-4 backdrop-blur-sm bg-card/95"
          >
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleApply}
                disabled={isApplying}
                className="flex-1 nexus-gradient px-6 py-3 rounded-sm text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-lg nexus-glow flex items-center justify-center gap-2"
              >
                {isApplying ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </motion.div>
                    <span className="hidden sm:inline">Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Apply Now
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSaved(!isSaved)}
                className="p-3 rounded-sm border border-border hover:border-primary/30 hover:bg-secondary transition-all shrink-0"
                title={isSaved ? "Unsave" : "Save"}
              >
                {isSaved ? (
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </motion.button>

              <div className="relative shrink-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="p-3 rounded-sm border border-border hover:border-primary/30 hover:bg-secondary transition-all"
                  title="Share"
                >
                  <Share2 className="h-4 w-4" />
                </motion.button>

                <AnimatePresence>
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-sm p-2 shadow-2xl backdrop-blur-sm flex gap-1"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleCopyLink}
                        className="h-9 w-9 rounded-sm hover:bg-secondary flex items-center justify-center transition-colors"
                        title="Copy link"
                      >
                        <Copy className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')}
                        className="h-9 w-9 rounded-sm hover:bg-secondary flex items-center justify-center transition-colors"
                        title="Twitter"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                        className="h-9 w-9 rounded-sm hover:bg-secondary flex items-center justify-center transition-colors"
                        title="Facebook"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')}
                        className="h-9 w-9 rounded-sm hover:bg-secondary flex items-center justify-center transition-colors"
                        title="LinkedIn"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
