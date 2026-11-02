"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  GraduationCap,
  Sparkles,
  Search,
  Filter,
  Download,
  Calendar,
  Building,
  PlusCircle,
  Eye,
  FileText,
  ChevronRight,
  ShieldCheck,
  Zap,
  Check
} from "lucide-react";

export default function EmployerDashboard() {
  const [cadenceTab, setCadenceTab] = useState("weekly");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3600);
  };

  // KPI Metrics
  const stats = [
    {
      title: "Total Opportunities",
      value: "24",
      sub: "+4 this quarter",
      icon: Briefcase,
      color: "text-orange-400 bg-orange-500/10 border-orange-500/20"
    },
    {
      title: "Active Opportunities",
      value: "9",
      sub: "3 closing soon",
      icon: Zap,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
    },
    {
      title: "Total Applications",
      value: "1,482",
      sub: "+18% MoM intake",
      icon: Users,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      title: "Shortlisted",
      value: "142",
      sub: "Across 9 active pools",
      icon: Award,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
    },
    {
      title: "Selected / Offered",
      value: "38",
      sub: "91.6% yield rate",
      icon: CheckCircle2,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      title: "Active Interns",
      value: "18",
      sub: "4 active cohorts",
      icon: GraduationCap,
      color: "text-sky-400 bg-sky-500/10 border-sky-500/20"
    }
  ];

  // Intake Chart data (bars)
  const intakeBars = [
    { label: "Nov W1", height: 42, count: 110 },
    { label: "Nov W2", height: 56, count: 148 },
    { label: "Nov W3", height: 100, count: 312, peak: true },
    { label: "Nov W4", height: 68, count: 194 },
    { label: "Dec W1", height: 75, count: 220 },
    { label: "Dec W2", height: 92, count: 285 },
    { label: "Dec W3", height: 52, count: 160 },
    { label: "Jan W1", height: 58, count: 173 }
  ];

  // Opportunity Wise Stats
  const topOpportunities = [
    {
      id: "REQ-8802",
      title: "Software Engineering Intern",
      dept: "Distributed Systems Core • Summer 2025",
      applicants: 628,
      reviewedPct: 82,
      shortlisted: 14,
      conversion: "4.2%",
      status: "Live"
    },
    {
      id: "REQ-8794",
      title: "Product Design Intern",
      dept: "Design Systems & Enterprise UX • Summer 2025",
      applicants: 342,
      reviewedPct: 95,
      shortlisted: 8,
      conversion: "6.1%",
      status: "Closing"
    },
    {
      id: "REQ-8910",
      title: "AI Research Fellow",
      dept: "LLM Reasoning Labs • Fall Co-op",
      applicants: 412,
      reviewedPct: 48,
      shortlisted: 19,
      conversion: "3.8%",
      status: "Live"
    }
  ];

  // Funnel breakdown
  const funnelStages = [
    { name: "Applied", count: 667, pct: 45, color: "bg-blue-500" },
    { name: "In Review", count: 370, pct: 25, color: "bg-amber-500" },
    { name: "Shortlisted", count: 222, pct: 15, color: "bg-purple-500" },
    { name: "Interviewing", count: 148, pct: 10, color: "bg-orange-500" },
    { name: "Offered", count: 75, pct: 5, color: "bg-emerald-500" }
  ];

  // Recent Applicants
  const recentApplicants = [
    {
      id: "APP-9102",
      name: "Maya Chen",
      initials: "MC",
      avatarBg: "bg-indigo-600/20 text-indigo-400 border-indigo-500/30",
      school: "Stanford Univ • MS CS '25 • 3.94 GPA",
      role: "Distributed Systems Engineering Intern",
      ref: "#REQ-8802",
      appliedAt: "Today, 10:24 AM",
      status: "Interview Scheduled",
      statusColor: "bg-orange-500/15 text-orange-400 border-orange-500/30"
    },
    {
      id: "APP-9098",
      name: "Marcus Vance",
      initials: "MV",
      avatarBg: "bg-purple-600/20 text-purple-400 border-purple-500/30",
      school: "Carnegie Mellon • B.Des '26 • 3.88 GPA",
      role: "Enterprise UX Design Intern",
      ref: "#REQ-8794",
      appliedAt: "Yesterday, 4:15 PM",
      status: "Shortlisted",
      statusColor: "bg-purple-500/15 text-purple-400 border-purple-500/30"
    },
    {
      id: "APP-9076",
      name: "Elena Rostova",
      initials: "ER",
      avatarBg: "bg-emerald-600/20 text-emerald-400 border-emerald-500/30",
      school: "MIT • PhD AI Lab • Published NeurIPS",
      role: "Machine Learning Research Co-op",
      ref: "#REQ-8910",
      appliedAt: "Oct 12, 2024",
      status: "Under Review",
      statusColor: "bg-sky-500/15 text-sky-400 border-sky-500/30"
    },
    {
      id: "APP-9054",
      name: "David Kim",
      initials: "DK",
      avatarBg: "bg-amber-600/20 text-amber-400 border-amber-500/30",
      school: "UC Berkeley • BS EECS '26 • 3.85 GPA",
      role: "Distributed Systems Engineering Intern",
      ref: "#REQ-8802",
      appliedAt: "Oct 11, 2024",
      status: "Applied",
      statusColor: "bg-gray-500/15 text-gray-400 border-gray-500/30"
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-orange-600 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Hero Banner */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#201915] via-[#1c1815] to-[#161514] border border-orange-500/20 relative overflow-hidden shadow-lg">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-600 text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-lg border border-white/10">
              AT
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Welcome back, Sarah
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Employer • Audited 02/2025</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Acme Technologies • Employer Portal &amp; Internship Program Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/employer/opportunities"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Opportunity</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6 Metric KPI Bento Cards */}
      <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-400 font-medium truncate">{s.title}</span>
                <div className={`p-1.5 rounded-lg border ${s.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {s.value}
                </div>
                <div className="text-[10px] text-gray-400 font-medium mt-1 truncate">
                  {s.sub}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Middle Grid: Intake Chart & Opportunity Stats (Left) + Status Funnel & Quick Actions (Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Applications Over Time & Opportunity Breakdown */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* Applications Received Over Time Chart */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-3">
              <div>
                <h2 className="text-base font-bold text-white">Applications Received Over Time</h2>
                <p className="text-xs text-gray-400">
                  Intake cadence showing weekly peaks &amp; high-volume submission windows
                </p>
              </div>

              {/* Time Cadence Tabs */}
              <div className="flex items-center p-1 rounded-xl bg-black/40 border border-white/10 text-xs self-start sm:self-auto">
                {["weekly", "monthly", "quarterly"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCadenceTab(tab)}
                    className={`px-3 py-1 rounded-lg capitalize font-medium transition-all ${
                      cadenceTab === tab ? "bg-orange-500 text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Bar Visualization */}
            <div className="pt-4 pb-2">
              <div className="flex items-end justify-between gap-2 sm:gap-4 h-44 px-2">
                {intakeBars.map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {bar.count}
                    </span>
                    <div
                      className={`w-full max-w-[42px] rounded-t-lg transition-all ${
                        bar.peak
                          ? "bg-gradient-to-t from-orange-600 to-amber-500 shadow-lg shadow-orange-500/25"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                      style={{ height: `${bar.height}%` }}
                    />
                    <span
                      className={`text-[10px] whitespace-nowrap font-medium ${
                        bar.peak ? "text-orange-400 font-bold" : "text-gray-500"
                      }`}
                    >
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-between text-xs text-orange-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
                  Peak campus intake window (+142% over baseline in Nov W3)
                </span>
                <span className="font-mono font-bold text-orange-400">Avg: 201 apps / wk</span>
              </div>
            </div>
          </div>

          {/* Opportunity-Wise Statistics */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h2 className="text-base font-bold text-white">Opportunity-Wise Statistics</h2>
                <p className="text-xs text-gray-400">
                  Applicant pipeline conversion and review velocity by requisition
                </p>
              </div>
              <Link
                href="/employer/opportunities"
                className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
              >
                <span>View All (24)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {topOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-orange-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm">{opp.title}</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-orange-400 border border-white/10 font-semibold">
                        {opp.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          opp.status === "Live"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {opp.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{opp.dept}</p>
                  </div>

                  <div className="flex items-center gap-6 text-xs shrink-0">
                    <div className="text-center">
                      <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                        Applicants
                      </span>
                      <span className="font-bold text-white font-mono text-sm">{opp.applicants}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                        Reviewed
                      </span>
                      <span className="font-bold text-orange-400 font-mono text-sm">
                        {opp.reviewedPct}%
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                        Shortlisted
                      </span>
                      <span className="font-bold text-purple-400 font-mono text-sm">
                        {opp.shortlisted}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                        Conv. Rate
                      </span>
                      <span className="font-bold text-emerald-400 font-mono text-sm">
                        {opp.conversion}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Funnel Distribution, Shortcuts & Action Queue */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Status Distribution Visual Graph Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
            <div className="pb-3 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Status Distribution</h2>
                <p className="text-xs text-gray-400">Application stage progression funnel</p>
              </div>
              <span className="text-xs font-mono font-bold text-orange-400">1,482 Active</span>
            </div>

            {/* Circular Donut Graph */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
              <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                  {/* Background Track */}
                  <circle
                    cx="80"
                    cy="80"
                    r="62"
                    fill="none"
                    stroke="#262626"
                    strokeWidth="16"
                  />
                  {/* Applied - 45% (offset 0, length 45% of 389.56 = 175.3) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="62"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="16"
                    strokeDasharray="175.3 389.56"
                    strokeDashoffset="0"
                    className="transition-all duration-700 hover:opacity-80 cursor-pointer"
                  />
                  {/* In Review - 25% (offset -175.3, length 25% = 97.4) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="62"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="16"
                    strokeDasharray="97.4 389.56"
                    strokeDashoffset="-175.3"
                    className="transition-all duration-700 hover:opacity-80 cursor-pointer"
                  />
                  {/* Shortlisted - 15% (offset -272.7, length 15% = 58.4) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="62"
                    fill="none"
                    stroke="#A855F7"
                    strokeWidth="16"
                    strokeDasharray="58.4 389.56"
                    strokeDashoffset="-272.7"
                    className="transition-all duration-700 hover:opacity-80 cursor-pointer"
                  />
                  {/* Interviewing - 10% (offset -331.1, length 10% = 39.0) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="62"
                    fill="none"
                    stroke="#F97316"
                    strokeWidth="16"
                    strokeDasharray="39.0 389.56"
                    strokeDashoffset="-331.1"
                    className="transition-all duration-700 hover:opacity-80 cursor-pointer"
                  />
                  {/* Offered - 5% (offset -370.1, length 5% = 19.5) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="62"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="16"
                    strokeDasharray="19.5 389.56"
                    strokeDashoffset="-370.1"
                    className="transition-all duration-700 hover:opacity-80 cursor-pointer"
                  />
                </svg>

                {/* Center Stats */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold font-mono text-white tracking-tight">1,482</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Total Pool</span>
                </div>
              </div>

              {/* Legend with counts and percentages */}
              <div className="flex-1 w-full space-y-2 text-xs">
                {[
                  { name: "Applied", count: 667, pct: "45%", color: "bg-blue-500", text: "text-blue-400" },
                  { name: "In Review", count: 370, pct: "25%", color: "bg-amber-500", text: "text-amber-400" },
                  { name: "Shortlisted", count: 222, pct: "15%", color: "bg-purple-500", text: "text-purple-400" },
                  { name: "Interviewing", count: 148, pct: "10%", color: "bg-orange-500", text: "text-orange-400" },
                  { name: "Offered", count: 75, pct: "5%", color: "bg-emerald-500", text: "text-emerald-400" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`} />
                      <span className="text-gray-300 font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-white">{item.count}</span>
                      <span className={`font-mono text-[11px] font-bold ${item.text}`}>{item.pct}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Recruitment Actions */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <Zap className="w-4 h-4 text-orange-400" />
              <h3 className="text-sm font-bold text-white">Recruitment Shortcuts</h3>
            </div>

            <div className="space-y-2 text-xs">
              <Link
                href="/employer/applications"
                className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:border-orange-500/30 text-gray-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-orange-400" />
                  <span>Review Candidate Applications</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/employer/interviews"
                className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:border-orange-500/30 text-gray-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-orange-400" />
                  <span>Interview Schedule &amp; Scorecards</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/employer/offers"
                className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:border-orange-500/30 text-gray-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-orange-400" />
                  <span>Manage Finalist Offers</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/employer/interns"
                className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:border-orange-500/30 text-gray-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-orange-400" />
                  <span>Active Intern Hours &amp; Milestones</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </div>

          {/* Managed Space Below Shortcuts: Urgent Action Queue & Recruiter Tasks */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <h3 className="text-sm font-bold text-white">Urgent Recruiter Action Items</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                4 Pending
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-semibold text-white">8 Interview Scorecards Pending</div>
                  <div className="text-[11px] text-gray-400">Elena &amp; Marcus need to submit round feedback</div>
                </div>
                <Link
                  href="/employer/interviews"
                  className="px-2.5 py-1 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-400 text-[11px] font-semibold shrink-0 transition-colors"
                >
                  Review
                </Link>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-semibold text-white">2 Finalist Offers Expiring</div>
                  <div className="text-[11px] text-amber-400">DocuSign packages expire in &lt; 48 hours</div>
                </div>
                <Link
                  href="/employer/offers"
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-[11px] font-semibold shrink-0 transition-colors"
                >
                  Send Nudge
                </Link>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-semibold text-white">Timesheet Weekly Quorum</div>
                  <div className="text-[11px] text-gray-400">Week 6 hours pending supervisor sign-off</div>
                </div>
                <Link
                  href="/employer/interns"
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-[11px] font-semibold shrink-0 transition-colors"
                >
                  Verify
                </Link>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-semibold text-white">Supervisor Capacity Cap</div>
                  <div className="text-[11px] text-rose-400">Marcus Vance reached 3/3 mentee limit</div>
                </div>
                <Link
                  href="/employer/supervisors"
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-[11px] font-semibold shrink-0 transition-colors"
                >
                  Rebalance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Student Applications Table */}
      <section className="rounded-2xl bg-[#1c1c1c] border border-white/10 overflow-hidden">
        <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white">Recent Student Applications</h2>
            <p className="text-xs text-gray-400">
              Direct applicant intake queue across active university requisition pipelines
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => showToast("Exporting applicant intake CSV...")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <Link
              href="/employer/applications"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-400 text-xs font-semibold transition-colors"
            >
              <span>View All Applications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-5">Student Candidate</th>
                <th className="py-3 px-5">Target Requisition</th>
                <th className="py-3 px-5">Application Date</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentApplicants.map((app) => (
                <tr key={app.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-xs shrink-0 ${app.avatarBg}`}
                      >
                        {app.initials}
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs group-hover:text-orange-400 transition-colors">
                          {app.name}
                        </div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{app.school}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="font-semibold text-white text-xs">{app.role}</div>
                    <div className="font-mono text-[10px] text-orange-400 mt-0.5">{app.ref}</div>
                  </td>

                  <td className="py-4 px-5 whitespace-nowrap text-gray-400">
                    {app.appliedAt}
                  </td>

                  <td className="py-4 px-5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${app.statusColor}`}>
                      {app.status}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right pr-6">
                    <Link
                      href="/employer/applications"
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors inline-block"
                    >
                      View Dossier
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
