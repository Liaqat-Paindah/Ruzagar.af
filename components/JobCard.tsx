"use client";

import { Job } from "@/type/jobs";
import {
  MapPin,
  Clock,
  Briefcase,
  ChevronRight,
  TrendingUp,
  Building2,
  Eye,
  Bookmark,
  Share2,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

interface JobCardProps {
  job: Job;
  index: number;
}

export const JobCard = ({ job, index }: JobCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const skillList = job.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
  const postedDateLabel = job.postedDate
    ? new Date(job.postedDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  return (
    <Link href={`/jobs/${job.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
        whileHover={{ y: -4 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative cursor-pointer"
      >
        <div className="absolute -inset-px rounded-sm bg-linear-to-r from-primary/0 via-primary/35 to-sky-500/0 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100 dark:via-cyan-400/40 dark:to-fuchsia-500/0" />

        <div className="relative overflow-hidden rounded-sm border border-border/70 bg-card text-card-foreground shadow-[0_18px_50px_-30px_rgba(15,23,42,0.18)] transition-all duration-500 dark:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.75)]">
          <motion.div
            className="absolute inset-0 bg-linear-to-br from-primary/0 via-primary/0 to-sky-500/0 transition-all duration-700 group-hover:from-primary/5 group-hover:via-transparent group-hover:to-sky-500/5 dark:group-hover:from-cyan-400/5 dark:group-hover:to-fuchsia-500/5"
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
          />

          <div className="h-0.5 w-full origin-left scale-x-0 bg-linear-to-r from-transparent via-primary to-transparent transition-transform duration-700 group-hover:scale-x-100 dark:via-cyan-400" />

          <div className="p-4 sm:p-5 md:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                transition={{ duration: 0.3 }}
                className="relative shrink-0"
              >
                <div className="absolute inset-0 rounded-xl bg-linear-to-r from-primary/45 to-sky-500/45 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-60 dark:from-cyan-400 dark:to-fuchsia-500" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-border/70 bg-linear-to-br from-background to-muted shadow-sm transition-all duration-300 group-hover:border-primary/40 dark:group-hover:border-cyan-400/40 md:h-14 md:w-14">
                  <span className="font-display text-base font-bold text-foreground md:text-lg">
                    <Image
                      src={job.companyLogo}
                      alt={job.company.charAt(0)}
                      width={40}
                      height={40}
                    ></Image>
                  </span>
                </div>
              </motion.div>

              <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary dark:group-hover:text-cyan-400 md:text-xl">
                      {job.title}
                    </h3>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {job.company}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 self-start sm:shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsBookmarked(!isBookmarked);
                    }}
                    className="rounded-lg border border-border/70 bg-background/80 p-2 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
                  >
                    <Bookmark
                      className={`h-4 w-4 ${isBookmarked ? "fill-primary text-primary dark:fill-cyan-300 dark:text-cyan-300" : ""}`}
                    />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.preventDefault()}
                    className="rounded-lg border border-border/70 bg-background/80 p-2 text-muted-foreground transition-all hover:border-sky-500/40 hover:text-sky-600 dark:hover:border-fuchsia-400/50 dark:hover:text-fuchsia-300"
                  >
                    <Share2 className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4">
              <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/70 px-2.5 py-1">
                <MapPin className="h-3.5 w-3.5 text-primary dark:text-cyan-300" />
                <span className="text-xs text-foreground/80">
                  {job.location}
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/70 px-2.5 py-1">
                <Briefcase className="h-3.5 w-3.5 text-sky-600 dark:text-fuchsia-300" />
                <span className="text-xs text-foreground/80">
                  {job.jobType}
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/70 px-2.5 py-1">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {postedDateLabel}
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4 border-t border-border/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-1.5">
                {skillList.slice(0, 3).map((skill, tagIdx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.02 + tagIdx * 0.03 }}
                    className="rounded-full border border-border/60 bg-muted/60 px-2.5 py-1 text-[10px] font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-primary dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
                  >
                    {skill}
                  </motion.span>
                ))}
                {skillList.length > 3 && (
                  <span className="px-2 py-1 text-[10px] text-muted-foreground">
                    +{skillList.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">
                    Est. Salary
                  </span>
                  <p className="whitespace-nowrap text-sm font-bold text-foreground">
                    {job.salary}
                  </p>
                </div>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-linear-to-r from-primary/10 to-sky-500/10 transition-all group-hover:border-primary dark:border-cyan-400/30 dark:from-cyan-400/10 dark:to-fuchsia-500/10 dark:group-hover:border-cyan-400"
                >
                  <ChevronRight className="h-4 w-4 text-primary dark:text-cyan-300" />
                </motion.div>
              </div>
            </div>

            <div className=" flex items-center gap-1 text-[10px] text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Eye className="h-3 w-3" />
              <span>234 views today</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
