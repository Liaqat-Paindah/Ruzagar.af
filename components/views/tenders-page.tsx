"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { tenders, tenderTypes, tenderCategories, Tender } from "@/data/tenders";
import { Search, FileText, Building2, MapPin, Calendar, Clock, AlertTriangle, Download, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const typeColors: Record<string, string> = {
  Tender: "from-primary to-emerald-600",
  RFQ: "from-blue-500 to-cyan-500",
  RFP: "from-violet-500 to-purple-500",
};

const statusStyles: Record<string, string> = {
  Open: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  "Closing Soon": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  Closed: "bg-muted text-muted-foreground border border-border",
};

function TenderCard({ tender, index }: { tender: Tender; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="nexus-card group hover:border-primary/30 transition-all duration-300 overflow-hidden"
    >
      <div className={`h-1 bg-gradient-to-r ${typeColors[tender.type] || "from-primary to-primary"}`} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-4 min-w-0 flex-1">
            <div className={`h-11 w-11 rounded-lg bg-gradient-to-br ${typeColors[tender.type]} flex items-center justify-center shrink-0 shadow-sm`}>
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 py-0.5 rounded-md text-xs font-bold bg-gradient-to-r ${typeColors[tender.type]} text-white`}>
                  {tender.type}
                </span>
                <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${statusStyles[tender.status]}`}>
                  {tender.status === "Closing Soon" && <AlertTriangle className="inline h-3 w-3 mr-1" />}
                  {tender.status}
                </span>
              </div>
              <h3 className="font-display font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">
                {tender.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" />
                {tender.organization}
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">{tender.description}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{tender.location}</span>
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Deadline: {tender.deadline}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{tender.posted}</span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold nexus-text-gradient">{tender.budget}</span>
            <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-md bg-secondary">{tender.category}</span>
          </div>
          <div className="flex items-center gap-2">
            {tender.documents && tender.documents.length > 0 && (
              <span className="flex items-center gap-1 text-xs text-primary">
                <Download className="h-3.5 w-3.5" />
                {tender.documents.length} docs
              </span>
            )}
            <Link href={`/tenders/${tender.id}`} className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              Details <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

type TendersPageProps = {
  initialType?: string;
};

export function TendersPage({ initialType }: TendersPageProps) {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState(initialType || "All");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    setActiveType(initialType || "All");
  }, [initialType]);

  const filtered = tenders.filter((tender) => {
    const matchSearch =
      tender.title.toLowerCase().includes(search.toLowerCase()) ||
      tender.organization.toLowerCase().includes(search.toLowerCase()) ||
      tender.category.toLowerCase().includes(search.toLowerCase());
    const matchType = activeType === "All" || tender.type === activeType;
    const matchCategory = activeCategory === "All" || tender.category === activeCategory;
    return matchSearch && matchType && matchCategory;
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
        <div className="container mx-auto px-4 py-16 md:py-20 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <FileText className="h-4 w-4" />
              Procurement & Opportunities
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Tenders, <span className="nexus-text-gradient">RFQs</span> & <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-purple-500">RFPs</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Discover government and private sector procurement opportunities across Afghanistan.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search tenders, organizations..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {tenderTypes.map((type) => (
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

        <div className="flex flex-wrap gap-2 mb-8">
          {tenderCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Active Opportunities</h2>
          <span className="text-sm text-muted-foreground">{filtered.length} found</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filtered.map((tender, index) => (
            <TenderCard key={tender.id} tender={tender} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No tenders found matching your criteria.</p>
          </div>
        )}
      </section>
    </div>
  );
}
