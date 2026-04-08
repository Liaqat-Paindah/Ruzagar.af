"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Briefcase, GraduationCap, LogIn, UserPlus, Menu, X, FileText, ChevronDown, ClipboardList, FileSearch } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Jobs", icon: Briefcase },
  { to: "/training", label: "Training", icon: GraduationCap },
];

const tenderSubLinks = [
  { to: "/tenders", label: "All Tenders", icon: FileText },
  { to: "/tenders?type=RFQ", label: "RFQs", icon: ClipboardList },
  { to: "/tenders?type=RFP", label: "RFPs", icon: FileSearch },
];

const authLinks = [
  { to: "/login", label: "Login", icon: LogIn },
  { to: "/register", label: "Register", icon: UserPlus },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tenderOpen, setTenderOpen] = useState(false);
  const [mobileTenderOpen, setMobileTenderOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isTenderActive = pathname.startsWith("/tenders");

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTenderOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setTenderOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="nexus-gradient h-8 w-8 rounded-lg flex items-center justify-center">
            <Briefcase className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            Ruzagar<span className="nexus-text-gradient">.af</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                href={link.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}

          {/* Tenders dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setTenderOpen(!tenderOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isTenderActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <FileText className="h-4 w-4" />
              Tenders
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${tenderOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {tenderOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 w-48 rounded-lg border border-border bg-popover shadow-lg overflow-hidden z-50"
                >
                  {tenderSubLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.to}
                      onClick={() => setTenderOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          {authLinks.map((link) => {
            const isPrimary = link.to === "/register";
            return (
              <Link
                key={link.to}
                href={link.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isPrimary
                    ? "nexus-gradient text-primary-foreground hover:opacity-90 shadow-md"
                    : "border border-border text-foreground hover:bg-secondary"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-secondary">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  href={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}

              {/* Mobile Tenders accordion */}
              <button
                onClick={() => setMobileTenderOpen(!mobileTenderOpen)}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium hover:bg-secondary transition-colors w-full"
              >
                <span className="flex items-center gap-3">
                  <FileText className="h-4 w-4" />
                  Tenders
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileTenderOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileTenderOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    {tenderSubLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.to}
                        onClick={() => { setMobileOpen(false); setMobileTenderOpen(false); }}
                        className="flex items-center gap-3 pl-11 pr-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                      >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="border-t border-border my-2" />
              {authLinks.map((link) => (
                <Link
                  key={link.to}
                  href={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
