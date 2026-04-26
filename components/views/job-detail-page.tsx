"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
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
} from "lucide-react";
import { motion } from "framer-motion";
import { GetJobs } from "@/hooks/useJobs";

const formatDate = (value: string) => {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data, isPending, error } = GetJobs();
  const job = data?.data.find((item) => String(item.id) === id);
  const skills = job?.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

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
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Jobs
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="nexus-card p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />

            <div className="flex items-start gap-5 relative">
              <div className="nexus-gradient h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg nexus-glow">
                <span className="text-primary-foreground font-display font-bold text-2xl">
                  {job.company.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">{job.title}</h1>
                <p className="text-lg text-muted-foreground mt-1">{job.company}</p>
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
                <div key={item.label} className="p-4 rounded-xl bg-secondary/50 border border-border">
                  <item.icon className="h-5 w-5 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5 break-words">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills?.length ? (
                  skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary/10 to-accent text-accent-foreground text-sm font-medium border border-primary/10"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No skills listed.</p>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <h2 className="font-display text-lg font-semibold text-foreground mb-3">Job Description</h2>
              <p className="text-muted-foreground leading-relaxed">{job.description}</p>

              <div className="grid gap-4 md:grid-cols-3 mt-6">
                <div className="rounded-xl border border-border bg-secondary/40 p-4">
                  <p className="text-xs text-muted-foreground">Application Deadline</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {formatDate(job.deadline)}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-secondary/40 p-4">
                  <p className="text-xs text-muted-foreground">Preferred Gender</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{job.gender}</p>
                </div>
                <div className="rounded-xl border border-border bg-secondary/40 p-4">
                  <p className="text-xs text-muted-foreground">Company</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{job.company}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-3">
              <button className="nexus-gradient px-8 py-3.5 rounded-xl text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg nexus-glow flex items-center justify-center gap-2">
                <Send className="h-4 w-4" />
                Apply Now
              </button>
              <button className="px-6 py-3.5 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                <Bookmark className="h-4 w-4" />
                Save Job
              </button>
              <button className="px-6 py-3.5 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
