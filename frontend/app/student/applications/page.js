"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  FolderOpen,
  Send,
  Eye,
  Star,
  CalendarClock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Download,
  PlusCircle,
  Calendar,
  DollarSign,
  MapPin,
  ChevronRight,
  MoreVertical,
  ChevronLeft,
  ChevronDown,
  Clock,
  FileText,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Code2,
  CalendarDays,
  FileCheck
} from "lucide-react";

const INITIAL_APPLICATIONS = [
  {
    id: 1,
    company: "Stripe",
    role: "Product Design Intern - Summer 2025",
    logoText: "S",
    logoBg: "bg-indigo-600/20 text-indigo-400 border-indigo-500/40",
    location: "San Francisco, CA (Hybrid)",
    appliedDate: "Apr 12, 2025",
    compensation: "$6,200/mo + Housing Stipend",
    status: "Interview Scheduled",
    statusColor: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    borderHighlight: "border-l-4 border-l-orange-500",
    updatedAgo: "2 hours ago",
    nextStep: {
      title: "Technical Interview with Staff Eng",
      time: "Apr 24, 2:00 PM PT",
      cta: "View Stage"
    },
    skills: ["Design Systems", "Figma Pro"],
    matchRate: "98% Match",
    term: "Summer 2025"
  },
  {
    id: 2,
    company: "Datadog",
    role: "Distributed Systems Apprenticeship",
    logoText: "DD",
    logoBg: "bg-purple-950/60 text-purple-300 border-purple-800/40",
    location: "New York, NY (In-Person)",
    appliedDate: "Apr 08, 2025",
    compensation: "$55/hr ($8,800/mo)",
    status: "Interview Scheduled",
    statusColor: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    borderHighlight: "border-l-4 border-l-orange-500",
    updatedAgo: "Yesterday",
    nextStep: {
      title: "Systems Architecture Pair Programming",
      time: "Apr 26, 10:00 AM ET",
      cta: "View Syllabus"
    },
    skills: ["Rust / Go", "Kubernetes"],
    matchRate: "95% Match",
    term: "Summer 2025"
  },
  {
    id: 3,
    company: "Cohere",
    role: "Campus AI Fellow (Part-time)",
    logoText: "CO",
    logoBg: "bg-emerald-950/60 text-emerald-400 border-emerald-800/40",
    location: "Toronto, ON / Remote",
    appliedDate: "Mar 20, 2025",
    compensation: "$12,000 Academic Fellowship Grant",
    status: "Selected",
    statusColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    borderHighlight: "border-l-4 border-l-emerald-500",
    updatedAgo: "Apr 15, 2025",
    offerPill: {
      text: "Official Offer Letter Issued. Response requested by May 02, 2025.",
      cta: "Review Contract"
    },
    skills: ["LLM Fine-tuning", "NLP"],
    matchRate: "99% Match",
    term: "Summer 2025"
  },
  {
    id: 4,
    company: "Anthropic",
    role: "AI Alignment Research Fellow",
    logoText: "AN",
    logoBg: "bg-purple-950/40 text-purple-200 border-purple-800/30",
    location: "San Francisco, CA",
    appliedDate: "Apr 05, 2025",
    compensation: "$60/hr Stipend",
    status: "Shortlisted",
    statusColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    borderHighlight: "border-l-4 border-l-purple-500",
    updatedAgo: "Apr 14, 2025",
    skills: ["Mechanistic Interpretability", "PyTorch"],
    matchRate: "99% Match",
    term: "Summer 2025"
  },
  {
    id: 5,
    company: "Figma",
    role: "Systems Software Engineer Intern",
    logoText: "FG",
    logoBg: "bg-sky-950/60 text-sky-300 border-sky-800/40",
    location: "San Francisco, CA (Remote)",
    appliedDate: "Apr 14, 2025",
    compensation: "$58/hr + Relocation",
    status: "Under Review",
    statusColor: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    borderHighlight: "border-l-4 border-l-sky-500",
    updatedAgo: "3 days ago",
    skills: ["WebAssembly", "C++"],
    matchRate: "94% Match",
    term: "Summer 2025"
  },
  {
    id: 6,
    company: "Scale AI",
    role: "Growth Marketing Intern",
    logoText: "SC",
    logoBg: "bg-neutral-900 text-white border-neutral-700",
    location: "San Francisco, CA",
    appliedDate: "Apr 16, 2025",
    compensation: "$42/hr stipend",
    status: "Applied",
    statusColor: "bg-neutral-800 text-gray-300 border-neutral-700",
    borderHighlight: "border-l-4 border-l-gray-600",
    updatedAgo: "Apr 16, 2025",
    skills: ["SQL", "B2B SaaS"],
    matchRate: "91% Match",
    term: "Summer 2025"
  },
  {
    id: 7,
    company: "Notion",
    role: "Full Stack Engineering Intern",
    logoText: "N",
    logoBg: "bg-neutral-900 text-gray-400 border-neutral-700",
    location: "San Francisco, CA",
    appliedDate: "Mar 15, 2025",
    compensation: "$52/hr",
    status: "Rejected",
    statusColor: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    borderHighlight: "border-l-4 border-l-rose-500/50",
    updatedAgo: "Apr 02, 2025",
    note: "Position filled for Summer 2025 pool.",
    skills: ["React", "Node.js"],
    matchRate: "88% Match",
    term: "Summer 2025"
  },
  {
    id: 8,
    company: "OpenAI",
    role: "Research Resident (Fall)",
    logoText: "OA",
    logoBg: "bg-neutral-900 text-gray-400 border-neutral-700",
    location: "San Francisco, CA",
    appliedDate: "Mar 10, 2025",
    compensation: "$65/hr",
    status: "Withdrawn",
    statusColor: "bg-neutral-800 text-gray-400 border-neutral-700",
    borderHighlight: "border-l-4 border-l-gray-700",
    updatedAgo: "Mar 28, 2025",
    note: "Withdrawn by candidate due to schedule overlap with thesis work.",
    skills: ["Reinforcement Learning", "Python"],
    matchRate: "96% Match",
    term: "Fall 2025"
  }
];

const UPCOMING_INTERVIEWS = [
  {
    id: 1,
    company: "Stripe",
    round: "Round 2",
    inDays: "In 6 Days",
    title: "Technical Portfolio Deep Dive",
    schedule: "Wed, Apr 24 • 2:00 PM - 3:00 PM PT",
    host: "Rachel Thorne (Staff Designer)",
    linkText: "Join Link"
  },
  {
    id: 2,
    company: "Datadog",
    round: "Round 3",
    inDays: "In 8 Days",
    title: "Systems Architecture Pair Coding",
    schedule: "Fri, Apr 26 • 10:00 AM - 11:30 AM ET",
    host: "Core Infra Eng Team",
    linkText: "Cheat Sheet"
  }
];

const RECENT_ACTIVITIES = [
  {
    id: 1,
    title: "Interview invite scheduled by Stripe recruiter.",
    time: "2 hours ago",
    color: "bg-orange-500"
  },
  {
    id: 2,
    title: "Application dispatched to Scale AI via Quick Apply.",
    time: "Yesterday at 6:42 PM",
    color: "bg-purple-500"
  },
  {
    id: 3,
    title: "Fellowship acceptance letter generated by Cohere.",
    time: "Apr 15, 2025",
    color: "bg-emerald-500"
  },
  {
    id: 4,
    title: "Status moved to Shortlisted at Anthropic.",
    time: "Apr 14, 2025",
    color: "bg-sky-500"
  }
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [activeTab, setActiveTab] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Pipeline counts
  const pipelineCounts = useMemo(() => {
    return {
      all: applications.length,
      applied: applications.filter((a) => a.status === "Applied").length,
      underReview: applications.filter((a) => a.status === "Under Review").length,
      shortlisted: applications.filter((a) => a.status === "Shortlisted").length,
      interview: applications.filter((a) => a.status === "Interview Scheduled").length,
      selected: applications.filter((a) => a.status === "Selected").length,
      rejected: applications.filter((a) => a.status === "Rejected").length,
      withdrawn: applications.filter((a) => a.status === "Withdrawn").length
    };
  }, [applications]);

  // Filtered applications
  const filteredApplications = useMemo(() => {
    return applications
      .filter((app) => {
        if (activeTab === "All") return true;
        return app.status.toLowerCase() === activeTab.toLowerCase();
      })
      .sort((a, b) => {
        if (sortBy === "company") return a.company.localeCompare(b.company);
        return a.id - b.id;
      });
  }, [applications, activeTab, sortBy]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-orange-600 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* 1. Breadcrumbs & Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1.5">
            <Link href="/student" className="hover:text-orange-400 transition-colors">
              Student
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-orange-400 font-medium">Applications</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              My Applications
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
              Cycle 2025
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Track, manage, and review status updates for all your submitted student opportunities.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => showToast("Exporting Application Summary PDF...")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1c1c1c] border border-white/10 text-white text-xs font-medium hover:bg-[#252525] transition-colors"
          >
            <Download className="w-4 h-4 text-gray-400" />
            <span>Export Application Summary</span>
          </button>
          <button
            onClick={() => showToast("Tracking external opportunity modal launched")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition-all shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Track External Job</span>
          </button>
        </div>
      </section>

      {/* 2. Lifecycle Pipeline Bar (7 Cards) */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="font-semibold uppercase tracking-wider text-gray-300">
            Application Lifecycle Pipeline
          </span>
          <span className="text-emerald-400/90 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            ATS Status Synchronized · Verified 12m ago
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-2.5">
          {/* Total */}
          <div
            onClick={() => setActiveTab("All")}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              activeTab === "All"
                ? "bg-orange-500/10 border-orange-500/40 text-orange-400"
                : "bg-[#1c1c1c] border-white/10 hover:border-white/20 text-gray-300"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[11px] truncate">Total</span>
              <FolderOpen className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xl font-bold text-white">{pipelineCounts.all}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Recorded</div>
          </div>

          {/* Applied */}
          <div
            onClick={() => setActiveTab("Applied")}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              activeTab === "Applied"
                ? "bg-orange-500/10 border-orange-500/40 text-orange-400"
                : "bg-[#1c1c1c] border-white/10 hover:border-white/20 text-gray-300"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[11px] truncate">Applied</span>
              <Send className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xl font-bold text-white">{pipelineCounts.applied}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Awaiting review</div>
          </div>

          {/* Under Review */}
          <div
            onClick={() => setActiveTab("Under Review")}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              activeTab === "Under Review"
                ? "bg-sky-500/10 border-sky-500/40 text-sky-400"
                : "bg-[#1c1c1c] border-white/10 hover:border-white/20 text-gray-300"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[11px] truncate">Under Review</span>
              <Eye className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-xl font-bold text-sky-400">{pipelineCounts.underReview}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Screening</div>
          </div>

          {/* Shortlisted */}
          <div
            onClick={() => setActiveTab("Shortlisted")}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              activeTab === "Shortlisted"
                ? "bg-purple-500/10 border-purple-500/40 text-purple-300"
                : "bg-[#1c1c1c] border-white/10 hover:border-white/20 text-gray-300"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[11px] truncate">Shortlisted</span>
              <Star className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl font-bold text-purple-300">{pipelineCounts.shortlisted}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Resume passed</div>
          </div>

          {/* Interview Scheduled (Highlighted) */}
          <div
            onClick={() => setActiveTab("Interview Scheduled")}
            className={`p-3 rounded-xl border cursor-pointer transition-all relative overflow-hidden ${
              activeTab === "Interview Scheduled"
                ? "bg-orange-500/20 border-orange-500 text-orange-400 shadow-md"
                : "bg-[#1c1c1c] border-orange-500/40 text-orange-300 hover:border-orange-500/60"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[11px] font-bold truncate">Interviews</span>
              <CalendarClock className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-xl font-bold text-orange-400 flex items-baseline gap-1.5">
              <span>{pipelineCounts.interview}</span>
              <span className="text-[10px] text-emerald-400 font-normal">Next: Apr 24</span>
            </div>
            <div className="text-[10px] text-orange-400/80 mt-0.5 font-medium">Action recommended</div>
          </div>

          {/* Selected */}
          <div
            onClick={() => setActiveTab("Selected")}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              activeTab === "Selected"
                ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                : "bg-[#1c1c1c] border-emerald-500/30 text-emerald-400 hover:border-emerald-500/60"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[11px] font-bold truncate">Selected</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-emerald-400">{pipelineCounts.selected}</div>
            <div className="text-[10px] text-emerald-400/80 mt-0.5">Offer received</div>
          </div>

          {/* Rejected */}
          <div
            onClick={() => setActiveTab("Rejected")}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              activeTab === "Rejected"
                ? "bg-rose-500/10 border-rose-500/40 text-rose-400"
                : "bg-[#1c1c1c] border-white/10 hover:border-white/20 text-gray-400"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[11px] truncate">Rejected</span>
              <XCircle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-xl font-bold text-gray-300">{pipelineCounts.rejected}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Archived</div>
          </div>
        </div>
      </section>

      {/* 3. Status Tabs & Sorting Bar */}
      <section className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { label: "All", count: pipelineCounts.all },
            { label: "Applied", count: pipelineCounts.applied },
            { label: "Under Review", count: pipelineCounts.underReview },
            { label: "Shortlisted", count: pipelineCounts.shortlisted },
            { label: "Interview Scheduled", count: pipelineCounts.interview },
            { label: "Selected", count: pipelineCounts.selected },
            { label: "Rejected", count: pipelineCounts.rejected }
          ].map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-[#252525] text-gray-400 hover:text-white border border-white/5"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            );
          })}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-gray-400 hidden sm:inline">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#252525] border border-white/10 rounded-xl py-1.5 px-3 text-xs text-gray-300 focus:outline-none focus:border-orange-500 cursor-pointer"
          >
            <option value="recent">Last Updated (Recent)</option>
            <option value="company">Company Name A-Z</option>
          </select>
        </div>
      </section>

      {/* 4. Two-Column Split Feed & Right Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Applications Cards (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-3.5">
          {/* Header above 3 boxes with View All */}
          <div className="flex items-center justify-between pb-1 px-1">
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white">Active Applications</h2>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                Showing 3 of {applications.length}
              </span>
            </div>
            <Link
              href="/student/applications/all"
              className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors group"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {filteredApplications.slice(0, 3).map((app) => (
            <article
              key={app.id}
              className={`bg-[#1c1c1c] border border-white/10 rounded-2xl p-5 hover:border-orange-500/50 transition-all duration-200 shadow-sm relative overflow-hidden group ${app.borderHighlight}`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-sm shrink-0 ${app.logoBg}`}
                  >
                    {app.logoText}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-bold text-white">{app.company}</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-500" />
                        {app.location}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-200 mt-0.5">{app.role}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-2 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        Applied: {app.appliedDate}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-400 font-medium">{app.compensation}</span>
                      <span>•</span>
                      <span className="text-[11px] text-gray-500">Updated: {app.updatedAgo}</span>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="sm:text-right shrink-0">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${app.statusColor}`}
                  >
                    {app.status === "Interview Scheduled" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping"></span>
                    )}
                    {app.status}
                  </span>
                </div>
              </div>

              {/* Next Step / Action Callout */}
              {app.nextStep && (
                <div className="mt-4 p-3 rounded-xl bg-[#252525] border border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 text-xs text-gray-200">
                    <CalendarClock className="w-4 h-4 text-orange-400 shrink-0" />
                    <div>
                      <span className="font-semibold text-orange-400">Next Step:</span>{" "}
                      {app.nextStep.title} on {app.nextStep.time}
                    </div>
                  </div>
                  <button
                    onClick={() => showToast(`Opening preparation portal for ${app.company}`)}
                    className="px-3 py-1 rounded-lg bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition-colors shrink-0"
                  >
                    {app.nextStep.cta}
                  </button>
                </div>
              )}

              {/* Offer Acceptance Pill */}
              {app.offerPill && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{app.offerPill.text}</span>
                  </div>
                  <button
                    onClick={() => showToast("Downloading offer contract PDF...")}
                    className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition-colors shrink-0"
                  >
                    {app.offerPill.cta}
                  </button>
                </div>
              )}

              {/* Explanatory Note (Rejected / Withdrawn) */}
              {app.note && (
                <div className="mt-3 text-xs text-gray-400 bg-[#252525]/60 p-2.5 rounded-lg border border-white/5">
                  {app.note}
                </div>
              )}

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {app.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[11px] bg-[#252525] text-gray-400 border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 rounded text-[11px] bg-orange-500/10 text-orange-400 font-medium">
                    {app.matchRate}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/student/applications/details?id=${app.id}`}
                    className="px-3 py-1.5 rounded-lg bg-[#252525] border border-white/10 text-xs font-medium text-gray-200 hover:text-white hover:border-orange-500/40 transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => showToast(`Application menu for ${app.company}`)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}

          {filteredApplications.length === 0 && (
            <div className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-8 text-center text-gray-400 text-sm">
              No applications match this filter.
            </div>
          )}
        </div>

        {/* Right: Asymmetric Drawer (Upcoming Interviews, Activity Log, Resume) (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* 1. Upcoming Interviews */}
          <div className="bg-[#1c1c1c] border border-orange-500/30 rounded-2xl p-5 relative overflow-hidden shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-orange-400" />
                <h3 className="font-semibold text-white text-sm">Upcoming Interviews</h3>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-orange-500 text-white rounded-full">
                2 Scheduled
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {UPCOMING_INTERVIEWS.map((interview) => (
                <div
                  key={interview.id}
                  className="p-3.5 rounded-xl bg-[#252525] border border-white/5 hover:border-orange-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-orange-400">
                      {interview.company} • {interview.round}
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      {interview.inDays}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white mt-1">{interview.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{interview.schedule}</div>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                    <span className="text-gray-400 truncate max-w-[150px]">
                      {interview.host}
                    </span>
                    <button
                      onClick={() => showToast(`Launching meeting connection for ${interview.company}`)}
                      className="text-orange-400 hover:underline flex items-center gap-0.5 font-medium"
                    >
                      {interview.linkText} <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Activity Log Stream */}
          <div className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <h3 className="font-semibold text-white text-sm">Activity Log</h3>
              </div>
              <button
                onClick={() => showToast("Opening full audit timeline...")}
                className="text-[11px] text-orange-400 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-4 relative before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-[2px] before:bg-white/10">
              {RECENT_ACTIVITIES.map((act) => (
                <div key={act.id} className="flex items-start gap-3 relative">
                  <div
                    className={`w-6 h-6 rounded-full ${act.color} flex items-center justify-center text-white shrink-0 ring-4 ring-[#1c1c1c] z-10 text-[10px] font-bold`}
                  >
                    ✓
                  </div>
                  <div>
                    <p className="text-xs text-gray-200">{act.title}</p>
                    <span className="text-[10px] text-gray-500">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Active Resume Asset */}
          <div className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-orange-400" />
                Active Resume Asset
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                Parsed OK
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono truncate">
              Alex_Vance_CS_2025_Systems_v4.pdf
            </p>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => showToast("Upload new resume modal triggered")}
                className="flex-1 py-1.5 px-3 rounded-lg bg-[#252525] border border-white/10 text-xs font-medium text-gray-200 hover:text-white transition-colors"
              >
                Replace File
              </button>
              <button
                onClick={() => showToast("Previewing active resume PDF...")}
                className="py-1.5 px-3 rounded-lg bg-[#252525] border border-white/10 text-xs font-medium text-gray-200 hover:text-white transition-colors"
              >
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
