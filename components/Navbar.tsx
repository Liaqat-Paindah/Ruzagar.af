"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import {
  Briefcase,
  GraduationCap,
  LogIn,
  UserPlus,
  Menu,
  X,
  FileText,
  ChevronDown,
  ClipboardList,
  FileSearch,
  Search,
  Building2,
  Bookmark,
  MessageSquare,
  User,
  Settings,
  PlusCircle,
  Bell,
  LogOut,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./provider/authContext";
import { supabase } from "@/utils/supabase/supabase";

const navLinks = [
  {
    to: "/",
    label: "Jobs",
    icon: Briefcase,
    description: "Find your next career opportunity",
  },
  {
    to: "/training",
    label: "Training",
    icon: GraduationCap,
    description: "Upskill with professional courses",
  },
];

const UserLinks = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: Briefcase,
  },
  {
    to: "/applications",
    label: "Applications",
    icon: FileText,
  },
  {
    to: "/messages",
    label: "Messages",
    icon: MessageSquare,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

const tenderSubLinks = [
  {
    to: "/tenders",
    label: "All Tenders",
    icon: FileText,
    linear: "from-primary to-emerald-600",
  },
  {
    to: "/tenders?type=RFQ",
    label: "RFQs",
    icon: ClipboardList,
    linear: "from-blue-500 to-cyan-500",
  },
  {
    to: "/tenders?type=RFP",
    label: "RFPs",
    icon: FileSearch,
    linear: "from-violet-500 to-purple-500",
  },
];

const authLinks = [
  { to: "/login", label: "Login", icon: LogIn },
  { to: "/register", label: "Register", icon: UserPlus },
];

export const Navbar = () => {
  const { profile, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tenderOpen, setTenderOpen] = useState(false);
  const [mobileTenderOpen, setMobileTenderOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const isTenderActive = pathname.startsWith("/tenders");

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setTenderOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setTenderOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error);
    } else {
      router.push("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="nexus-gradient h-8 w-8 rounded-lg flex items-center justify-center relative">
              <Briefcase className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            Ruzagar<span className="nexus-text-gradient">.af</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {user ? (
            <>
              {UserLinks.map((link) => {
                const active = pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    href={link.to}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "bg-linear-to-r from-primary/10 via-emerald-500/10 to-blue-500/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-linear-to-r hover:from-primary/5 hover:via-emerald-500/5 hover:to-blue-500/5"
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
            </>
          ) : (
            <>
              {navLinks.map((link) => {
                const active = pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    href={link.to}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all group ${
                      active
                        ? "bg-linear-to-r from-primary/10 via-emerald-500/10 to-blue-500/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-linear-to-r hover:from-primary/5 hover:via-emerald-500/5 hover:to-blue-500/5"
                    }`}
                  >
                    <link.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-linear-to-r from-primary via-emerald-500 to-blue-500"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </>
          )}

          {!user ? (
            <>
              {" "}
              {/* Tenders Mega Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setTenderOpen(!tenderOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isTenderActive
                      ? "bg-linear-to-r from-primary/10 via-emerald-500/10 to-blue-500/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-linear-to-r hover:from-primary/5 hover:via-emerald-500/5 hover:to-blue-500/5"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Tenders
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${tenderOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {tenderOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-border bg-popover/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-2">
                        {tenderSubLinks.map((link) => (
                          <Link
                            key={link.label}
                            href={link.to}
                            onClick={() => setTenderOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-popover-foreground hover:bg-linear-to-r hover:from-primary/5 hover:via-emerald-500/5 hover:to-blue-500/5 transition-all group"
                          >
                            <div
                              className={`h-8 w-8 rounded-lg bg-linear-to-br ${link.linear} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}
                            >
                              <link.icon className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{link.label}</div>
                              <div className="text-xs text-muted-foreground">
                                {link.label === "All Tenders" &&
                                  "Browse all opportunities"}
                                {link.label === "RFQs" &&
                                  "Request for Quotations"}
                                {link.label === "RFPs" &&
                                  "Request for Proposals"}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-border p-3 bg-linear-to-r from-primary/5 via-emerald-500/5 to-blue-500/5">
                        <div className="flex items-center gap-2 text-xs">
                          <TrendingUp className="h-3.5 w-3.5 text-primary" />
                          <span className="text-muted-foreground">
                            <span className="font-semibold text-foreground">
                              24
                            </span>{" "}
                            new tenders this week
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />

          {!user ? (
            <>
              {authLinks.map((link) => {
                const isPrimary = link.to === "/register";
                return (
                  <Link
                    key={link.to}
                    href={link.to}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isPrimary
                        ? "nexus-gradient text-primary-foreground hover:opacity-90 shadow-lg hover:shadow-xl"
                        : "border border-border text-foreground hover:bg-linear-to-r hover:from-primary/5 hover:via-emerald-500/5 hover:to-blue-500/5"
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
            </>
          ) : (
            <>
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-linear-to-r hover:from-primary/5 hover:via-emerald-500/5 hover:to-blue-500/5 transition-all">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-linear-to-r from-primary to-emerald-600 ring-2 ring-background" />
              </button>

              {/* Create Job Button */}
              <Link
                href="/jobs/create"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-linear-to-r from-primary/10 via-emerald-500/10 to-blue-500/10 border border-primary/20 text-primary hover:border-primary/40 hover:shadow-md transition-all"
              >
                <PlusCircle className="h-4 w-4" />
                Post Job
              </Link>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-linear-to-r hover:from-primary/5 hover:via-emerald-500/5 hover:to-blue-500/5 transition-all"
                >
                  <div className="h-8 w-8 rounded-full bg-linear-to-br from-primary via-emerald-500 to-blue-500 flex items-center justify-center text-white font-medium shadow-md">
                    {user.email?.[0].toUpperCase() || "U"}
                  </div>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-56 rounded-xl border border-border bg-popover/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className=" p-3 border-b border-border bg-linear-to-r from-primary/5 via-emerald-500/5 to-blue-500/5">
                                                <p className=" py-2 text-md font-medium text-foreground truncate">
                            {profile?.first_name && profile?.last_name}
                          </p>
                        <p className="text-sm font-medium text-foreground truncate">

                          {user.email}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Personal Account
                        </p>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 cursor-pointer w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          {user && (
            <button className="relative p-2 rounded-lg hover:bg-secondary">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            </button>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-linear-to-r hover:from-primary/5 hover:via-emerald-500/5 hover:to-blue-500/5 transition-all"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="p-4 flex flex-col gap-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {/* Quick Search Mobile */}
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {user ? (
                <>
                  {/* User Profile Mobile */}
                  <div className="flex items-center gap-3 p-3 mb-2 rounded-lg bg-linear-to-r from-primary/5 via-emerald-500/5 to-blue-500/5 border border-border">
                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-primary via-emerald-500 to-blue-500 flex items-center justify-center text-white font-medium">
                      {user.email?.[0].toUpperCase() || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {user.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Personal Account
                      </p>
                    </div>
                  </div>

                  {UserLinks.map((link) => (
                    <Link
                      key={link.to}
                      href={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium hover:bg-linear-to-r hover:from-primary/5 hover:via-emerald-500/5 hover:to-blue-500/5 transition-all"
                    >
                      <span className="flex items-center gap-3">
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </span>
                    </Link>
                  ))}

                  <Link
                    href="/jobs/create"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-primary border border-primary/20 bg-linear-to-r from-primary/10 via-emerald-500/10 to-blue-500/10 mt-2"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Post a Job
                  </Link>
                </>
              ) : (
                navLinks.map((link) => (
                  <Link
                    key={link.to}
                    href={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-linear-to-r hover:from-primary/5 hover:via-emerald-500/5 hover:to-blue-500/5 transition-all group"
                  >
                    <link.icon className="h-5 w-5 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <div className="flex-1">
                      <div className="font-medium">{link.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {link.description}
                      </div>
                    </div>
                  </Link>
                ))
              )}

              {/* Mobile Tenders Accordion */}
              {!user ? (
                <>
                  {" "}
                  <div className="mt-2">
                    <button
                      onClick={() => setMobileTenderOpen(!mobileTenderOpen)}
                      className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-sm font-medium hover:bg-linear-to-r hover:from-primary/5 hover:via-emerald-500/5 hover:to-blue-500/5 transition-all"
                    >
                      <span className="flex items-center gap-3">
                        <FileText className="h-4 w-4" />
                        Tenders
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${mobileTenderOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileTenderOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden ml-4"
                        >
                          {tenderSubLinks.map((link) => (
                            <Link
                              key={link.label}
                              href={link.to}
                              onClick={() => {
                                setMobileOpen(false);
                                setMobileTenderOpen(false);
                              }}
                              className="flex items-center gap-3 pl-8 pr-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-linear-to-r hover:from-primary/5 hover:via-emerald-500/5 hover:to-blue-500/5 transition-all"
                            >
                              <div
                                className={`h-6 w-6 rounded bg-linear-to-br ${link.linear} flex items-center justify-center`}
                              >
                                <link.icon className="h-3.5 w-3.5 text-white" />
                              </div>
                              {link.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="border-t border-border my-3" />

              {!user ? (
                <>
                  {authLinks.map((link) => (
                    <Link
                      key={link.to}
                      href={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium hover:bg-linear-to-r hover:from-primary/5 hover:via-emerald-500/5 hover:to-blue-500/5 transition-all"
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium nexus-gradient text-primary-foreground mt-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    Get Started
                  </Link>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
