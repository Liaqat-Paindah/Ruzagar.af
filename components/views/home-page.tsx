"use client";

import { useState } from "react";
import { jobs, jobTypes } from "@/data/jobs";
import { JobCard } from "@/components/JobCard";
import {
  Search,
  SlidersHorizontal,
  TrendingUp,
  Users,
  Building2,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { label: "Active Jobs", value: "2,400+", icon: Briefcase },
  { label: "Companies", value: "580+", icon: Building2 },
  { label: "Job Seekers", value: "12,000+", icon: Users },
  { label: "Hired This Month", value: "340+", icon: TrendingUp },
];

export function HomePage() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");

  const filtered = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    const matchType = activeType === "All" || job.type === activeType;
    return matchSearch && matchType;
  });

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
              Find Your Next
              <span className="nexus-text-gradient"> Career</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Afghanistan&apos;s leading job portal connecting talent with
              opportunity. Discover thousands of roles across all industries.
            </p>

            <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, or skills..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full rounded-xl border border-border bg-card py-3 pr-4 pl-11 text-foreground placeholder:text-muted-foreground transition-shadow focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <button className="nexus-gradient flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium text-primary-foreground shadow-md transition-opacity hover:opacity-90 sm:w-auto">
                <SlidersHorizontal className="h-4 w-4" />
                Search
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:gap-4 md:mt-12 md:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="nexus-card p-4 text-center">
                <stat.icon className="mx-auto mb-1.5 h-5 w-5 text-primary" />
                <p className="font-display text-xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto mb-6 flex max-w-4xl flex-wrap gap-2">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeType === type
                  ? "nexus-gradient text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="mx-auto mb-6 flex max-w-4xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Latest Opportunities
          </h2>
          <span className="text-sm text-muted-foreground">
            {filtered.length} jobs found
          </span>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:gap-5">
          {filtered.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              No jobs found matching your criteria.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
