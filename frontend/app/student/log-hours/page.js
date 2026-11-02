"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock3,
  CalendarDays,
  FileText,
  ChevronRight,
  PlusCircle,
  Download,
  Filter,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info,
  GitCommit,
  UserCheck,
  Paperclip,
  Briefcase,
  ArrowRight
} from "lucide-react";

export default function LogHoursPage() {
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Filters state (status filter for this week's table)
  const [statusFilter, setStatusFilter] = useState("all");

  // Form State
  const [formData, setFormData] = useState({
    date: "2025-07-23",
    ticket: "ST-402: Idempotent Event Delivery Engine",
    startTime: "09:00",
    endTime: "17:30",
    breakMinutes: "30",
    category: "Feature Dev",
    prUrl: "https://github.com/stripe/core-ledger/pull/1842",
    summary: "Refactored distributed lock acquisition timeout and verified replay tolerance across regional Kafka clusters under 50k QPS synthetic load.",
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Flagged entries that need review / have been rejected
  const flaggedEntries = [
    {
      id: "LOG-1043",
      date: "Jul 13, 2025",
      day: "Sunday",
      ticket: "ST-GEN",
      ticketTitle: "Weekend On-Call Standby Triage",
      hours: 4.0,
      status: "Rejected",
      reason: "Weekend hours require prior Dean approval under CPT guidelines. Pre-authorization proof required.",
      auditor: "MIT Co-op Dean Office"
    },
    {
      id: "LOG-1038",
      date: "Jun 29, 2025",
      day: "Sunday",
      ticket: "ST-389",
      ticketTitle: "Database Indexing & Query Tuning",
      hours: 2.5,
      status: "Needs Review",
      reason: "Daily cap exceeded without supervisor pre-authorization note attached.",
      auditor: "Host Supervisor"
    },
    {
      id: "LOG-1025",
      date: "Jun 18, 2025",
      day: "Wednesday",
      ticket: "ST-GEN",
      ticketTitle: "Internal Team Architecture Sync",
      hours: 3.0,
      status: "Rejected",
      reason: "Activity summary lacks deliverable artifacts. Please attach PR link or milestone deliverable.",
      auditor: "Faculty Advisor"
    }
  ];

  // Sample Timesheet Entries (Current Week items displayed on main table)
  const [entries, setEntries] = useState([
    {
      id: "LOG-1050",
      date: "Jul 23, 2025",
      day: "Wednesday",
      ticket: "ST-402",
      ticketTitle: "Kafka Dead-letter Queue & Replay Backoff",
      summary: "Implemented exponential retry backoff and dead-letter quarantine logic across consumer groups.",
      hours: 8.0,
      category: "Feature Dev",
      verifier: "Marcus Vance",
      verifierOrg: "Stripe",
      verifierInitials: "MV",
      status: "pending",
      isThisWeek: true,
      prUrl: "https://github.com/stripe/core-ledger/pull/1842"
    },
    {
      id: "LOG-1049",
      date: "Jul 22, 2025",
      day: "Tuesday",
      ticket: "ST-402",
      ticketTitle: "Kafka Partition Failover testing",
      summary: "Simulated broker outage and measured replay lag across 3 distributed consumer groups. Documented consumer rebalance time under 420ms.",
      hours: 8.0,
      category: "Feature Dev",
      verifier: "Marcus Vance",
      verifierOrg: "Stripe",
      verifierInitials: "MV",
      status: "pending",
      isThisWeek: true,
      prUrl: "https://github.com/stripe/core-ledger/pull/1842",
      notes: "Submitted for supervisor weekly sign-off."
    },
    {
      id: "LOG-1048",
      date: "Jul 21, 2025",
      day: "Monday",
      ticket: "ST-210",
      ticketTitle: "Distributed Lock Benchmark Suite",
      summary: "Profiling memory footprints in Redis cluster client under 50k QPS synthetic workloads. Reduced connection pool leak in connection reuse pool.",
      hours: 8.0,
      category: "Feature Dev",
      verifier: "Marcus Vance",
      verifierOrg: "Stripe",
      verifierInitials: "MV",
      status: "approved",
      signedAt: "Jul 21, 2025 • 18:00 PM",
      isThisWeek: true,
      prUrl: "https://github.com/stripe/core-ledger/pull/1838",
      notes: "Approved. Verified benchmark metrics."
    }
  ]);

  // Handle Form Submission
  const handleLogHoursSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `LOG-${Math.floor(1055 + Math.random() * 50)}`,
      date: new Date(formData.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      day: new Date(formData.date).toLocaleDateString("en-US", { weekday: "long" }),
      ticket: formData.ticket.split(":")[0],
      ticketTitle: formData.ticket.split(":")[1]?.trim() || "Engineering Task",
      summary: formData.summary,
      hours: 8.0,
      category: formData.category,
      verifier: "Marcus Vance",
      verifierOrg: "Stripe",
      verifierInitials: "MV",
      status: "pending",
      isThisWeek: true,
      prUrl: formData.prUrl,
      notes: "Submitted for supervisor weekly sign-off."
    };

    setEntries([newEntry, ...entries]);
    setIsModalOpen(false);
    showToast(`Successfully logged 8.0 hours for ${newEntry.date}! Sent for Marcus Vance sign-off.`);
  };

  // Filter this week's entries
  const currentWeekEntries = useMemo(() => {
    return entries.filter((item) => {
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      return item.isThisWeek;
    });
  }, [entries, statusFilter]);

  // Summary counts
  const totalApproved = 240.0;
  const totalPending = 40.0;
  const totalFlagged = flaggedEntries.reduce((sum, item) => sum + item.hours, 0);
  const totalTarget = 480.0;

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-orange-600 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb & CPT Authorization Bar */}
      <section className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/student" className="hover:text-orange-400 transition-colors">
            Student Portal
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <Link href="/student/internship" className="hover:text-orange-400 transition-colors">
            My Internship
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-orange-400 font-medium">Timesheet & Hours Logging</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="font-medium">F-1 CPT Work Authorization Active (Max 40.0h / week · SEVIS DSO Verified)</span>
        </div>
      </section>

      {/* Header Section */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shadow-inner">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Log Internship Hours
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                Stripe • Backend Systems & Distributed Infrastructure Co-op · Tracked under MIT Course 6-A Practicum
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/student/log-hours/all"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Hours History & Audit Trail →
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium text-xs sm:text-sm shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            + Log Working Hours
          </button>
        </div>
      </section>

      {/* 4 Bento KPI Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Approved Hours */}
        <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-emerald-500/30 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Total Approved
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tight">{totalApproved.toFixed(1)}</span>
            <span className="text-sm font-medium text-gray-400">hrs</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs text-gray-400 border-t border-white/5 pt-2">
            <span className="flex items-center gap-1 text-emerald-400">
              <Check className="w-3.5 h-3.5" /> Verified by Marcus Vance
            </span>
            <span className="text-gray-500">Host Supv</span>
          </div>
        </div>

        {/* Pending Hours */}
        <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-amber-500/30 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Pending Approval
            </span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock3 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-amber-400 tracking-tight">
              {totalPending.toFixed(1)}
            </span>
            <span className="text-sm font-medium text-gray-400">hrs</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs text-gray-400 border-t border-white/5 pt-2">
            <span className="text-amber-400/90">Awaiting Host Sign-off</span>
            <span className="text-gray-500">2 shifts</span>
          </div>
        </div>

        {/* Needs Review / Flagged */}
        <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-red-500/30 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Needs Review / Flagged
            </span>
            <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-red-400 tracking-tight">
              {totalFlagged.toFixed(1)}
            </span>
            <span className="text-sm font-medium text-gray-400">hrs</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs text-gray-400 border-t border-white/5 pt-2">
            <span className="text-red-400 font-medium">{flaggedEntries.length} shifts flagged with notes</span>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="text-red-400 hover:text-red-300 font-bold hover:underline"
            >
              View all
            </button>
          </div>
        </div>

        {/* Required Academic Practicum Target */}
        <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/30 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Academic Credit Goal
            </span>
            <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-bold text-white tracking-tight">280</span>
              <span className="text-sm text-gray-400"> / 480 hrs</span>
            </div>
            <span className="text-xs font-semibold text-orange-400 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20">
              58.3%
            </span>
          </div>
          {/* Progress Bar */}
          <div className="mt-3 w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: "58.3%" }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400">
            <span>200.0 hrs remaining</span>
            <span>Target: Course 6-A</span>
          </div>
        </div>
      </section>

      {/* SIDE-BY-SIDE GRID: Current Week Summary Box (left 5 cols) & Weekly Cadence Graph (right 7 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Current Week Summary Box */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-[#1c1c1c] via-[#221c17] to-[#1c1c1c] border border-orange-500/20 flex flex-col justify-between gap-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center text-orange-400 shrink-0">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
                    Current Week
                  </span>
                  <span className="text-xs text-gray-400 ml-2">Week 6 of 12</span>
                </div>
              </div>

              <span className="text-[11px] font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                In Progress
              </span>
            </div>

            {/* Start and End Times for Current Week */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between items-center text-gray-400">
                <span>Week Start:</span>
                <span className="text-white font-mono font-medium">Monday, Jul 21, 2025 • 09:00 AM</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Week End:</span>
                <span className="text-white font-mono font-medium">Sunday, Jul 27, 2025 • 11:59 PM EST</span>
              </div>
              <div className="flex justify-between items-center text-gray-400 pt-1 border-t border-white/5">
                <span>Weekly Hours Logged:</span>
                <span className="text-orange-400 font-bold font-mono">24.0 / 40.0 hrs</span>
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>Weekly Target Pace</span>
                <span className="text-orange-400 font-bold">60% (3 of 5 shifts logged)</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full transition-all" style={{ width: "60%" }} />
              </div>
            </div>

            {/* Weekly Sign-off Deadline */}
            <div className="text-xs text-gray-400 bg-black/20 p-2.5 rounded-xl border border-white/5">
              <span>Weekly Sign-off Deadline:</span>
              <div className="font-semibold text-orange-400 flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5" /> Friday, July 25, 11:59 PM EST (2 days left)
              </div>
            </div>
          </div>

          {/* Red Review Required Button replacing submit shift early */}
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-white font-semibold text-xs border border-red-500/40 shadow-lg shadow-red-500/10 transition-all flex items-center justify-center gap-2"
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            Review Required ({flaggedEntries.length} Flagged Shifts)
          </button>
        </div>

        {/* Right: Hours Distribution & Weekly Cadence Bar Chart (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 flex flex-col justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Hours Distribution & Weekly Cadence</h3>
                  <p className="text-xs text-gray-400">Summer 2025 Practicum • 40.0 hrs/week target pace</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Approved
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> Pending
                </span>
                <span className="flex items-center gap-1.5 text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-sm bg-white/10" /> Remaining
                </span>
              </div>
            </div>

            {/* Weekly Bar Chart Simulation */}
            <div className="mt-4">
              <div className="h-40 w-full flex items-end justify-between gap-2 px-2 pt-4 pb-2 border-b border-white/10">
                {[
                  { week: "W1", hours: 40, status: "approved", label: "Jun 9 - 13" },
                  { week: "W2", hours: 40, status: "approved", label: "Jun 16 - 20" },
                  { week: "W3", hours: 40, status: "approved", label: "Jun 23 - 27" },
                  { week: "W4", hours: 40, status: "approved", label: "Jun 30 - Jul 4" },
                  { week: "W5", hours: 40, status: "approved", label: "Jul 7 - 11" },
                  { week: "W6", hours: 24, status: "pending", label: "Jul 21 - 25 (Active)" },
                  { week: "W7", hours: 0, status: "upcoming", label: "Jul 28 - Aug 1" },
                  { week: "W8", hours: 0, status: "upcoming", label: "Aug 4 - 8" },
                  { week: "W9", hours: 0, status: "upcoming", label: "Aug 11 - 15" },
                  { week: "W10", hours: 0, status: "upcoming", label: "Aug 18 - 22" },
                  { week: "W11", hours: 0, status: "upcoming", label: "Aug 25 - 29" },
                ].map((col) => {
                  const heightPercent = col.hours > 0 ? (col.hours / 40) * 100 : 8;
                  const isPending = col.status === "pending";
                  const isApproved = col.status === "approved";
                  return (
                    <div
                      key={col.week}
                      className="flex-1 flex flex-col items-center gap-2 group relative cursor-pointer"
                      onClick={() => showToast(`${col.week} (${col.label}): ${col.hours} hrs logged`)}
                    >
                      <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform origin-bottom bg-black border border-white/20 text-white text-[10px] px-2 py-1 rounded shadow-xl whitespace-nowrap z-20 pointer-events-none">
                        {col.week}: {col.hours}.0h ({col.status})
                      </div>

                      <div className="w-full max-w-[28px] h-28 flex items-end justify-center bg-white/5 rounded-t-md overflow-hidden p-0.5">
                        <div
                          className={`w-full rounded-t-sm transition-all duration-300 ${
                            isApproved
                              ? "bg-emerald-500/80 group-hover:bg-emerald-400"
                              : isPending
                              ? "bg-amber-500/80 group-hover:bg-amber-400"
                              : "bg-white/10"
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <span className={`text-[10px] font-mono ${isPending ? "text-amber-400 font-bold" : "text-gray-400"}`}>
                        {col.week}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Monthly Analytics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <div className="flex justify-between items-center text-[11px] text-gray-400">
                  <span>June 2025</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-mono text-[10px]">
                    <Check className="w-3 h-3" /> 100%
                  </span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-base font-bold text-white">160.0</span>
                  <span className="text-[11px] text-gray-400">/ 160h</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <div className="flex justify-between items-center text-[11px] text-gray-400">
                  <span>July 2025</span>
                  <span className="text-amber-400 flex items-center gap-1 font-mono text-[10px]">
                    <Clock3 className="w-3 h-3" /> Active
                  </span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-base font-bold text-white">104.0</span>
                  <span className="text-[11px] text-gray-400">/ 160h</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <div className="flex justify-between items-center text-[11px] text-gray-400">
                  <span>August 2025</span>
                  <span className="text-gray-500 font-mono text-[10px]">Upcoming</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-base font-bold text-gray-500">0.0</span>
                  <span className="text-[11px] text-gray-500">/ 160h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* This Week's Timesheet Entries (Small & Compact) with View All link */}
      <section className="rounded-2xl bg-[#1c1c1c] border border-white/10 overflow-hidden">
        {/* Table Header with View All Link and No Search Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">This Week's Timesheet Entries</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold">
                Week 6 (Jul 21 - Jul 27)
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Daily verified shifts recorded for the current work week.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Status Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  statusFilter === "all" ? "bg-orange-500 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                All ({entries.length})
              </button>
              <button
                onClick={() => setStatusFilter("pending")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  statusFilter === "pending" ? "bg-amber-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setStatusFilter("approved")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  statusFilter === "approved" ? "bg-emerald-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Approved
              </button>
            </div>

            {/* View All Button leading to Stitch History Page */}
            <Link
              href="/student/log-hours/all"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-xs font-semibold text-orange-400 transition-colors whitespace-nowrap"
            >
              <span>View All Work Logs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Compact Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 sm:px-6">Date & Day</th>
                <th className="py-3 px-4 sm:px-6">Task Activity & Deliverable</th>
                <th className="py-3 px-4 text-center">Hours</th>
                <th className="py-3 px-4">Host Verifier</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {currentWeekEntries.map((row) => (
                <tr key={row.id} className="hover:bg-white/[0.03] transition-colors group">
                  <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap align-top">
                    <div className="font-semibold text-white text-xs">{row.date}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{row.day}</div>
                  </td>

                  <td className="py-3.5 px-4 sm:px-6 max-w-md align-top">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-white text-xs group-hover:text-orange-400 transition-colors">
                        {row.ticketTitle}
                      </span>
                      <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-white/5 text-orange-400 border border-white/10 font-bold">
                        {row.ticket}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      {row.summary}
                    </p>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-center align-top">
                    <span className="inline-block px-2 py-0.5 rounded bg-white/5 text-white font-mono font-bold text-xs border border-white/10">
                      {row.hours.toFixed(1)} hrs
                    </span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap align-top">
                    <div className="text-xs font-medium text-white">{row.verifier}</div>
                    <div className="text-[10px] text-gray-400">{row.verifierOrg}</div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap align-top">
                    {row.status === "approved" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Check className="w-3 h-3" /> Approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Clock3 className="w-3 h-3" /> Pending Review
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-right pr-6 align-top">
                    <button
                      onClick={() => setSelectedEntry(row)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info linking to all hours */}
        <div className="p-3.5 border-t border-white/10 bg-white/[0.01] flex items-center justify-between text-xs text-gray-400">
          <span>Showing 3 shifts logged for Week 6</span>
          <Link href="/student/log-hours/all" className="text-orange-400 hover:underline flex items-center gap-1 font-semibold">
            Search all historical hours by date →
          </Link>
        </div>
      </section>

      {/* ================= MODAL: Review Required (Flagged Shifts List) ================= */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#1c1c1c] border border-red-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-red-500/20 flex items-center justify-between bg-red-950/20 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Review Required: Flagged Shifts ({flaggedEntries.length})</h3>
                  <p className="text-xs text-red-300">Shifts requiring response or correction before supervisor verification</p>
                </div>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Rejected / Needs Review Shifts (Simple Line Each) */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[60vh] space-y-2.5">
              {flaggedEntries.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-red-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 mt-0.5 ${
                        item.status === "Rejected"
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {item.status}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-white text-xs">{item.date}</span>
                        <span className="text-gray-500 text-[10px]">({item.day})</span>
                        <span className="text-gray-500">•</span>
                        <span className="font-mono text-red-400 font-bold text-xs">{item.hours.toFixed(1)} hrs</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-orange-400 font-mono text-[11px] font-semibold">{item.ticket}</span>
                        <span className="text-gray-400 text-[11px] hidden md:inline">({item.ticketTitle})</span>
                      </div>
                      <p className="text-xs text-gray-300 mt-1 leading-snug">
                        <span className="text-red-400 font-medium">Notice: </span>
                        {item.reason}
                      </p>
                      <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-1.5">
                        <span>Auditor: {item.auditor}</span>
                        <span>•</span>
                        <span className="font-mono text-[10px]">Ref #{item.id}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      showToast(`Correction / appeal draft opened for ${item.id} (${item.date}).`);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 border border-red-500/40 text-red-300 hover:text-white text-xs font-semibold shrink-0 transition-colors self-end sm:self-center"
                  >
                    Fix & Resubmit
                  </button>
                </div>
              ))}
            </div>

            <div className="px-6 py-3.5 border-t border-white/10 bg-white/[0.01] flex items-center justify-between text-xs text-gray-400 shrink-0">
              <span>All appeals are reviewed within 48 business hours by CPT committee</span>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: Log Working Hours ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Log Working Hours</h2>
                  <p className="text-xs text-gray-400">
                    Submit billable hours for co-op credit & Marcus Vance sign-off
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLogHoursSubmit} className="p-6 overflow-y-auto space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    Work Date <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    Project / Jira Task Ticket <span className="text-orange-400">*</span>
                  </label>
                  <select
                    value={formData.ticket}
                    onChange={(e) => setFormData({ ...formData, ticket: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="ST-402: Idempotent Event Delivery Engine">ST-402: Idempotent Event Delivery</option>
                    <option value="ST-391: Redis Cluster Partition Failover">ST-391: Redis Cluster Partition Failover</option>
                    <option value="ST-380: Envoy Proxy gRPC Rate Limiter">ST-380: Envoy Proxy gRPC Rate Limiter</option>
                    <option value="ST-210: Distributed Lock Benchmark Suite">ST-210: Distributed Lock Benchmark</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1">End Time</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1">Break Deduction</label>
                  <select
                    value={formData.breakMinutes}
                    onChange={(e) => setFormData({ ...formData, breakMinutes: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white"
                  >
                    <option value="0">0 min</option>
                    <option value="15">15 min</option>
                    <option value="30">30 min break</option>
                    <option value="45">45 min break</option>
                    <option value="60">60 min lunch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-orange-400 mb-1">Billable Total</label>
                  <div className="px-2 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-xs font-mono font-bold text-orange-300 text-center">
                    8.0 hrs
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Activity Category</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Feature Dev", "Code Review", "Standup / Sync", "Incident Response", "Documentation", "Mentorship", "Testing / QA", "Research"].map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border text-center transition-all ${
                        formData.category === cat
                          ? "bg-orange-500/20 border-orange-500 text-orange-300 font-semibold"
                          : "bg-black/30 border-white/10 text-gray-400 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Pull Request / Git Commit Link (Optional Proof)
                </label>
                <div className="relative">
                  <GitCommit className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={formData.prUrl}
                    onChange={(e) => setFormData({ ...formData, prUrl: e.target.value })}
                    placeholder="https://github.com/stripe/core-ledger/pull/..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Shift Deliverables & Work Summary <span className="text-orange-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Detail the technical tasks performed, test cases executed, and engineering findings..."
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-medium transition-colors"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      showToast("Draft shift log saved locally.");
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-lg shadow-orange-500/25 transition-all"
                  >
                    Submit for Marcus Vance Sign-off
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: View Entry Details ================= */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-xs font-mono text-orange-400">{selectedEntry.id}</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedEntry.ticketTitle}</h3>
              </div>
              <button
                onClick={() => setSelectedEntry(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-gray-400">Shift Date</span>
                <div className="text-white font-medium mt-1">{selectedEntry.date} ({selectedEntry.day})</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-gray-400">Total Hours</span>
                <div className="text-white font-medium mt-1">{selectedEntry.hours.toFixed(1)} hrs (Billable)</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-gray-400">Host Verifier</span>
                <div className="text-white font-medium mt-1">{selectedEntry.verifier} ({selectedEntry.verifierOrg})</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-gray-400">Status</span>
                <div className="mt-1">
                  <span className="font-semibold text-emerald-400 uppercase tracking-wide text-[11px]">
                    {selectedEntry.status}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-medium text-gray-400">Deliverable Summary</span>
              <p className="text-xs text-gray-300 mt-1.5 p-3 rounded-xl bg-black/40 border border-white/5 leading-relaxed">
                {selectedEntry.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedEntry(null)}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
