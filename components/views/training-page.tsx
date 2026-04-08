"use client";

import { trainings } from "@/data/trainings";
import { Star, Users, Clock, BookOpen, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const levelColors: Record<string, string> = {
  Beginner: "bg-nexus-success/10 text-nexus-success",
  Intermediate: "bg-nexus-info/10 text-nexus-info",
  Advanced: "bg-nexus-warning/10 text-nexus-warning",
};

export function TrainingPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="nexus-gradient h-14 w-14 rounded-2xl mx-auto flex items-center justify-center mb-5 nexus-glow">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Level Up Your <span className="nexus-text-gradient">Skills</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-lg">
              Professional training programs to boost your career. Learn from industry experts and get certified.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trainings.map((training, index) => (
            <motion.div
              key={training.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="nexus-card p-5 hover:border-primary/30 transition-all group cursor-pointer flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${levelColors[training.level]}`}>
                  {training.level}
                </span>
                {training.free && (
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-primary/10 text-primary">
                    Free
                  </span>
                )}
              </div>

              <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                {training.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{training.provider}</p>
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed flex-1">
                {training.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{training.duration}</span>
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{training.enrolled}</span>
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-nexus-warning" />{training.rating}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-border">
                {training.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-md bg-accent text-accent-foreground text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <button className="mt-4 w-full py-2.5 rounded-lg border border-primary text-primary font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-2">
                <BookOpen className="h-4 w-4" />
                Enroll Now
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
