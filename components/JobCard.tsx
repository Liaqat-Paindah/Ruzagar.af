"use client";

import { Job } from "@/data/jobs";
import { MapPin, Clock, Briefcase, Zap, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface JobCardProps {
  job: Job;
  index: number;
}

export const JobCard = ({ job, index }: JobCardProps) => {
  return (
    <Link href={`/jobs/${job.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        className="nexus-card hover:border-primary/30 transition-all duration-300 group cursor-pointer relative overflow-hidden"
      >
        {/* Gradient top accent */}
        <div className="h-1 nexus-gradient opacity-60 group-hover:opacity-100 transition-opacity" />

        <div className="p-5">
          {job.urgent && (
            <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-md bg-destructive/10 text-destructive text-xs font-semibold">
              <Zap className="h-3 w-3" />
              Urgent
            </div>
          )}

          <div className="flex items-start gap-4">
            <div className="nexus-gradient h-12 w-12 rounded-xl flex items-center justify-center shrink-0 shadow-md group-hover:nexus-glow transition-shadow">
              <span className="text-primary-foreground font-display font-bold text-base">
                {job.company.charAt(0)}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {job.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">{job.company}</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
            {job.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
            <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{job.type}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{job.posted}</span>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <div className="flex flex-wrap gap-1.5">
              {job.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-md bg-gradient-to-r from-primary/10 to-accent text-accent-foreground text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold nexus-text-gradient whitespace-nowrap">{job.salary}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
