'use client';
import { useAuth } from "@/components/provider/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Briefcase,
  Users,
  Eye,
  TrendingUp,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  MessageSquare,
  Bookmark,
  BarChart3,
  PieChart,
  Download,
  Filter,
  MoreVertical,
  ChevronRight,
  Sparkles,
  Award,
  Target,
  Zap,
  Activity,
  DollarSign,
  MapPin,
  Building2,
  Mail,
  Phone,
  Globe,
  PlusCircle,
  Settings,
  Bell,
  Search,
  Star,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";

// Mock data - Replace with actual API calls
const applicationStats = {
  total: 156,
  pending: 23,
  reviewed: 89,
  rejected: 32,
  shortlisted: 12,
};

const weeklyApplications = [
  { name: "Mon", applications: 12, views: 45 },
  { name: "Tue", applications: 19, views: 62 },
  { name: "Wed", applications: 15, views: 58 },
  { name: "Thu", applications: 25, views: 78 },
  { name: "Fri", applications: 22, views: 71 },
  { name: "Sat", applications: 8, views: 34 },
  { name: "Sun", applications: 5, views: 28 },
];

const jobCategories = [
  { name: "Technology", value: 45, color: "#3B82F6" },
  { name: "Marketing", value: 25, color: "#10B981" },
  { name: "Sales", value: 20, color: "#F59E0B" },
  { name: "Design", value: 10, color: "#8B5CF6" },
];

const recentApplications = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    applicant: "John Doe",
    appliedDate: "2024-01-15",
    status: "pending",
    avatar: "JD",
  },
  {
    id: 2,
    jobTitle: "Product Manager",
    company: "InnovateLabs",
    applicant: "Jane Smith",
    appliedDate: "2024-01-14",
    status: "reviewed",
    avatar: "JS",
  },
  {
    id: 3,
    jobTitle: "UI/UX Designer",
    company: "CreativeStudio",
    applicant: "Mike Johnson",
    appliedDate: "2024-01-13",
    status: "shortlisted",
    avatar: "MJ",
  },
  {
    id: 4,
    jobTitle: "Backend Engineer",
    company: "DataFlow Systems",
    applicant: "Sarah Williams",
    appliedDate: "2024-01-12",
    status: "rejected",
    avatar: "SW",
  },
];

const upcomingInterviews = [
  {
    id: 1,
    candidate: "Emily Chen",
    position: "Full Stack Developer",
    date: "2024-01-20",
    time: "10:00 AM",
    type: "Technical Interview",
  },
  {
    id: 2,
    candidate: "David Kumar",
    position: "Data Scientist",
    date: "2024-01-21",
    time: "2:30 PM",
    type: "HR Round",
  },
];

const jobPerformance = [
  { name: "Job Views", value: "12.4K", change: "+15%", icon: Eye },
  { name: "Applications", value: "342", change: "+8%", icon: FileText },
  { name: "Hire Rate", value: "12.5%", change: "+2.3%", icon: TrendingUp },
  { name: "Time to Hire", value: "18d", change: "-3d", icon: Clock },
];

export default function Dashboard() {
  const { isAuthenticated, user, profile, loading } = useAuth();
  const router = useRouter();
  const [timeframe, setTimeframe] = useState("week");
  const [selectedChart, setSelectedChart] = useState("applications");

  useEffect(() => {
    if (!loading && (!isAuthenticated || !user)) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router, user]);

  if (loading || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-border"></div>
            <div className="absolute inset-0 rounded-full border-2 border-t-primary animate-spin"></div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20";
      case "reviewed":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
      case "shortlisted":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border border-gray-500/20";
    }
  };

  // Simple bar chart component using CSS grid
  const SimpleBarChart = ({ data, type }: { data: typeof weeklyApplications; type: string }) => {
    const maxValue = Math.max(...data.map(d => type === 'applications' ? d.applications : d.views));
    
    return (
      <div className="mt-6">
        <div className="flex items-end gap-2 h-48">
          {data.map((item, idx) => {
            const value = type === 'applications' ? item.applications : item.views;
            const height = (value / maxValue) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-primary/20 rounded-sm transition-all duration-300 hover:bg-primary/30"
                  style={{ height: `${height}%`, minHeight: '4px' }}
                >
                  <div 
                    className="w-full bg-linear-to-t from-primary to-primary/60 rounded-sm transition-all duration-300"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Simple pie chart using SVG
  const SimplePieChart = ({ data }: { data: typeof jobCategories }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    
    return (
      <div className="relative w-48 h-48 mx-auto">
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          {data.map((item, idx) => {
            const angle = (item.value / total) * 360;
            const startAngle = currentAngle;
            const endAngle = startAngle + angle;
            currentAngle = endAngle;
            
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;
            
            const x1 = 50 + 40 * Math.cos(startRad);
            const y1 = 50 + 40 * Math.sin(startRad);
            const x2 = 50 + 40 * Math.cos(endRad);
            const y2 = 50 + 40 * Math.sin(endRad);
            
            const largeArc = angle > 180 ? 1 : 0;
            
            return (
              <path
                key={idx}
                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={item.color}
                className="transition-all duration-300 hover:opacity-80 cursor-pointer"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Welcome Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">
                Welcome back, {profile?.first_name || user.email?.split('@')[0]}!
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Here's what's happening with your job postings today.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/jobs/create"
                className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary text-primary-foreground rounded-sm text-sm font-medium hover:bg-primary/90 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                Post Job
              </Link>
              <button className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 border border-border rounded-sm text-sm font-medium hover:bg-accent transition-all">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          {jobPerformance.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.change.startsWith("+");
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-sm p-3 md:p-4 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="p-1.5 md:p-2 bg-primary/10 rounded-sm">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span
                    className={`text-xs font-medium px-1.5 py-0.5 rounded-sm ${
                      isPositive 
                        ? "text-green-600 bg-green-500/10" 
                        : "text-red-600 bg-red-500/10"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-0.5">
                  {stat.value}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {stat.name}
                </p>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-card border border-border rounded-sm p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <h2 className="text-base md:text-lg font-semibold text-foreground">
                  Recruitment Analytics
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Job views and applications over time
                </p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setSelectedChart("applications")}
                  className={`px-2 py-1 text-xs rounded-sm transition-all ${
                    selectedChart === "applications"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Applications
                </button>
                <button
                  onClick={() => setSelectedChart("views")}
                  className={`px-2 py-1 text-xs rounded-sm transition-all ${
                    selectedChart === "views"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Views
                </button>
              </div>
            </div>
            <SimpleBarChart data={weeklyApplications} type={selectedChart} />
            <div className="mt-4 flex justify-between text-xs text-muted-foreground">
              <span>📊 Weekly {selectedChart}</span>
              <span>↑ 23% vs last week</span>
            </div>
          </div>

          {/* Categories Chart */}
          <div className="bg-card border border-border rounded-sm p-4 md:p-6">
            <h2 className="text-base md:text-lg font-semibold text-foreground mb-4">
              Jobs by Category
            </h2>
            <SimplePieChart data={jobCategories} />
            <div className="mt-4 space-y-2">
              {jobCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-sm"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-muted-foreground">
                      {category.name}
                    </span>
                  </div>
                  <span className="font-medium text-foreground">
                    {category.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Applications & Interviews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Recent Applications */}
          <div className="bg-card border border-border rounded-sm overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base md:text-lg font-semibold text-foreground">
                    Recent Applications
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Latest candidates who applied
                  </p>
                </div>
                <Link
                  href="/applications"
                  className="text-primary hover:text-primary/80 text-xs font-medium flex items-center gap-1"
                >
                  View all
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
            <div className="divide-y divide-border">
              {recentApplications.map((application) => (
                <div
                  key={application.id}
                  className="p-3 md:p-4 hover:bg-accent/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                      {application.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                        <h3 className="text-sm font-medium text-foreground truncate">
                          {application.jobTitle}
                        </h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-sm inline-block w-fit ${getStatusColor(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {application.applicant} • {application.company}
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        Applied {new Date(application.appliedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Interviews */}
          <div className="bg-card border border-border rounded-sm overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base md:text-lg font-semibold text-foreground">
                    Upcoming Interviews
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Scheduled interviews this week
                  </p>
                </div>
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <div className="divide-y divide-border">
              {upcomingInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="p-3 md:p-4 hover:bg-accent/50 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-primary/10 rounded-sm">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-foreground">
                        {interview.candidate}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {interview.position}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                        <span>{interview.date}</span>
                        <span>•</span>
                        <span>{interview.time}</span>
                        <span>•</span>
                        <span>{interview.type}</span>
                      </div>
                    </div>
                    <button className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-all">
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-accent/30 border-t border-border">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Total interviews this week
                </span>
                <span className="font-semibold text-foreground">8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-2 bg-linear-to-r from-primary/10 via-primary/5 to-transparent border border-border rounded-sm p-4 md:p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
                  Ready to find top talent?
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Your job postings have received 45% more views this month.
                </p>
                <Link
                  href="/jobs/create"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-sm text-sm font-medium hover:bg-primary/90 transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  Post a New Job
                </Link>
              </div>
              <Sparkles className="w-8 h-8 text-primary/30 hidden sm:block" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-sm p-4 md:p-6">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-500" />
              Pro Tips
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-xs">
                <div className="w-1 h-1 rounded-full bg-green-500 mt-1.5"></div>
                <p className="text-muted-foreground">
                  Respond to applications within 48 hours
                </p>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5"></div>
                <p className="text-muted-foreground">
                  Add company culture to increase applications by 34%
                </p>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <div className="w-1 h-1 rounded-full bg-purple-500 mt-1.5"></div>
                <p className="text-muted-foreground">
                  Use specific keywords for better SEO
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}