"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { jobs } from "@/data/jobs";
import { ArrowLeft, MapPin, Clock, Briefcase, Zap, DollarSign, Send, Bookmark, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const job = jobs.find((item) => item.id === id);

  if (!job) {
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

            {job.urgent && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold w-fit mb-4">
                <Zap className="h-3.5 w-3.5" />
                Urgent Hiring
              </div>
            )}

            <div className="flex items-start gap-5 relative">
              <div className="nexus-gradient h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg nexus-glow">
                <span className="text-primary-foreground font-display font-bold text-2xl">{job.company.charAt(0)}</span>
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">{job.title}</h1>
                <p className="text-lg text-muted-foreground mt-1">{job.company}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { icon: MapPin, label: "Location", value: job.location },
                { icon: Briefcase, label: "Type", value: job.type },
                { icon: DollarSign, label: "Salary", value: job.salary },
                { icon: Clock, label: "Posted", value: job.posted },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl bg-secondary/50 border border-border">
                  <item.icon className="h-5 w-5 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary/10 to-accent text-accent-foreground text-sm font-medium border border-primary/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <h2 className="font-display text-lg font-semibold text-foreground mb-3">Job Description</h2>
              <p className="text-muted-foreground leading-relaxed">{job.description}</p>

              <h3 className="font-display text-base font-semibold text-foreground mt-6 mb-3">Responsibilities</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" /> Lead development of user-facing features and ensure technical feasibility of UI/UX designs</li>
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" /> Collaborate with cross-functional teams to define and implement innovative solutions</li>
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" /> Optimize applications for maximum speed and scalability</li>
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" /> Participate in code reviews and maintain high code quality standards</li>
              </ul>

              <h3 className="font-display text-base font-semibold text-foreground mt-6 mb-3">Requirements</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" /> Relevant degree or equivalent practical experience</li>
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" /> 2+ years of professional experience in a related field</li>
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" /> Excellent communication skills in Dari, Pashto, or English</li>
              </ul>
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
