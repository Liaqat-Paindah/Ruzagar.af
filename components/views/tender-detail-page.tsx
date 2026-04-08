"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { tenders } from "@/data/tenders";
import { ArrowLeft, FileText, Building2, MapPin, Calendar, Clock, Download, DollarSign, Tag } from "lucide-react";
import { motion } from "framer-motion";

const typeColors: Record<string, string> = {
  Tender: "from-primary to-emerald-600",
  RFQ: "from-blue-500 to-cyan-500",
  RFP: "from-violet-500 to-purple-500",
};

export function TenderDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const tender = tenders.find((item) => item.id === id);

  if (!tender) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">Tender not found.</p>
          <Link href="/tenders" className="text-primary hover:underline mt-2 inline-block">
            Back to Tenders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className={`bg-gradient-to-r ${typeColors[tender.type]} py-2`} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/tenders" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Tenders
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="nexus-card p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-lg text-sm font-bold bg-gradient-to-r ${typeColors[tender.type]} text-white`}>
              {tender.type}
            </span>
            <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
              tender.status === "Open" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
              tender.status === "Closing Soon" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
              "bg-muted text-muted-foreground"
            }`}>
              {tender.status}
            </span>
          </div>

          <h1 className="font-display text-3xl font-bold text-foreground">{tender.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Building2 className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Organization</p>
                <p className="text-sm font-medium text-foreground">{tender.organization}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium text-foreground">{tender.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <DollarSign className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Estimated Budget</p>
                <p className="text-sm font-semibold nexus-text-gradient">{tender.budget}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Deadline</p>
                <p className="text-sm font-medium text-foreground">{tender.deadline}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Tag className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="text-sm font-medium text-foreground">{tender.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Posted</p>
                <p className="text-sm font-medium text-foreground">{tender.posted}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <h2 className="font-display text-lg font-semibold text-foreground mb-3">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{tender.description}</p>
          </div>

          {tender.documents && tender.documents.length > 0 && (
            <div className="mt-6 pt-6 border-t border-border">
              <h2 className="font-display text-lg font-semibold text-foreground mb-3">Documents</h2>
              <div className="flex flex-wrap gap-3">
                {tender.documents.map((doc) => (
                  <button key={doc} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary hover:bg-accent transition-colors text-sm font-medium text-foreground">
                    <Download className="h-4 w-4 text-primary" />
                    {doc}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-3">
            <button className="nexus-gradient px-8 py-3 rounded-xl text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-2">
              <FileText className="h-4 w-4" />
              Submit Proposal
            </button>
            <button className="px-8 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors">
              Save for Later
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
