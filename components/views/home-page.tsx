"use client";

import { useState } from "react";
import { jobs, jobTypes } from "@/data/jobs";
import { JobCard } from "@/components/JobCard";
import { Search, SlidersHorizontal, TrendingUp, Users, Building2, Briefcase } from "lucide-react";
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
            backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
              Find Your Next
              <span className="nexus-text-gradient"> Career</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Afghanistan&apos;s leading job portal connecting talent with opportunity. Discover thousands of roles across all industries.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, or skills..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                />
              </div>
              <button className="nexus-gradient px-6 py-3 rounded-xl text-primary-foreground font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-md">
                <SlidersHorizontal className="h-4 w-4" />
                Search
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="nexus-card p-4 text-center">
                <stat.icon className="h-5 w-5 mx-auto text-primary mb-1.5" />
                <p className="font-display text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeType === type
                  ? "nexus-gradient text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Latest Opportunities</h2>
          <span className="text-sm text-muted-foreground">{filtered.length} jobs found</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filtered.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No jobs found matching your criteria.</p>
          </div>
        )}
      </section>
    </div>
  );
}
