"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Clock,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  RotateCcw,
  ChevronRight,
  ArrowLeft,
  Download,
  Check,
  X,
  ShieldCheck,
  GitCommit,
  ExternalLink,
  CalendarDays
} from "lucide-react";

const HISTORICAL_ENTRIES = [
  {
    id: "LOG-1050",
    date: "2025-07-23",
    dateDisplay: "Jul 23, 2025",
    day: "Wednesday",
    ticket: "ST-402",
    ticketTitle: "Kafka Dead-letter Queue & Replay Backoff",
    summary: "Implemented exponential retry backoff and dead-letter quarantine logic across consumer groups.",
    hours: 8.0,
    category: "Feature Dev",
    verifier: "Marcus Vance",
    verifierOrg: "Stripe",
    status: "pending",
    month: "2025-07"
  },
  {
    id: "LOG-1049",
    date: "2025-07-22",
    dateDisplay: "Jul 22, 2025",
    day: "Tuesday",
    ticket: "ST-402",
    ticketTitle: "Kafka Partition Failover testing",
    summary: "Simulated broker outage and measured replay lag across 3 distributed consumer groups. Documented consumer rebalance time under 420ms.",
    hours: 8.0,
    category: "Feature Dev",
    verifier: "Marcus Vance",
    verifierOrg: "Stripe",
    status: "pending",
    month: "2025-07"
  },
  {
    id: "LOG-1048",
    date: "2025-07-21",
    dateDisplay: "Jul 21, 2025",
    day: "Monday",
    ticket: "ST-210",
    ticketTitle: "Distributed Lock Benchmark Suite",
    summary: "Profiling memory footprints in Redis cluster client under 50k QPS synthetic workloads.",
    hours: 8.0,
    category: "Feature Dev",
    verifier: "Marcus Vance",
    verifierOrg: "Stripe",
    status: "approved",
    signedAt: "Jul 21, 2025 • 18:00 PM",
    month: "2025-07"
  },
  {
    id: "LOG-1047",
    date: "2025-07-18",
    dateDisplay: "Jul 18, 2025",
    day: "Friday",
    ticket: "ST-114",
    ticketTitle: "Midterm Architecture Defense Prep",
    summary: "Slide preparation for university co-op mentor defense & engineering deck review.",
    hours: 8.0,
    category: "Documentation",
    verifier: "Marcus Vance",
    verifierOrg: "Stripe",
    status: "approved",
    signedAt: "Jul 19, 2025 • 09:14 AM",
    month: "2025-07"
  },
  {
    id: "LOG-1046",
    date: "2025-07-17",
    dateDisplay: "Jul 17, 2025",
    day: "Thursday",
    ticket: "ST-402",
    ticketTitle: "Kafka consumer dead-letter queue testing",
    summary: "Implemented auto-retry backoff handlers with circuit breaker tripping logic.",
    hours: 8.0,
    category: "Feature Dev",
    verifier: "Marcus Vance",
    verifierOrg: "Stripe",
    status: "approved",
    signedAt: "Jul 18, 2025 • 17:05 PM",
    month: "2025-07"
  },
  {
    id: "LOG-1045",
    date: "2025-07-16",
    dateDisplay: "Jul 16, 2025",
    day: "Wednesday",
    ticket: "ST-380",
    ticketTitle: "Envoy Filter gRPC Rate Limiting",
    summary: "Added Envoy proxy Lua filter for token-bucket rate limiting on internal inter-service gRPC calls.",
    hours: 8.0,
    category: "Feature Dev",
    verifier: "Marcus Vance",
    verifierOrg: "Stripe",
    status: "approved",
    signedAt: "Jul 17, 2025 • 10:20 AM",
    month: "2025-07"
  },
  {
    id: "LOG-1044",
    date: "2025-07-15",
    dateDisplay: "Jul 15, 2025",
    day: "Tuesday",
    ticket: "ST-391",
    ticketTitle: "Redis Cluster Partition Failover",
    summary: "Chaos engineering drill validating Redis replica promotion during network isolation.",
    hours: 8.0,
    category: "Incident Response",
    verifier: "Marcus Vance",
    verifierOrg: "Stripe",
    status: "approved",
    signedAt: "Jul 16, 2025 • 09:00 AM",
    month: "2025-07"
  },
  {
    id: "LOG-1043",
    date: "2025-07-13",
    dateDisplay: "Jul 13, 2025",
    day: "Sunday (Weekend)",
    ticket: "ST-GEN",
    ticketTitle: "Weekend On-Call Standby Triage",
    summary: "Assisted secondary on-call engineer during high-priority payment gateway webhook retry backoff spike.",
    hours: 4.0,
    category: "Incident Response",
    verifier: "MIT Co-op Dean Office",
    verifierOrg: "Dean Office",
    status: "needs_review",
    flagReason: "Dean Office Flag: Weekend hours require prior Dean approval under CPT guidelines. Please re-attribute as weekday research study.",
    month: "2025-07"
  },
  {
    id: "LOG-1042",
    date: "2025-07-11",
    dateDisplay: "Jul 11, 2025",
    day: "Friday",
    ticket: "ST-302",
    ticketTitle: "Weekly Sprint Retrospective & Demo",
    summary: "Demonstrated zero-loss transaction relay to infrastructure leads and faculty mentor.",
    hours: 8.0,
    category: "Standup / Sync",
    verifier: "Marcus Vance",
    verifierOrg: "Stripe",
    status: "approved",
    signedAt: "Jul 11, 2025 • 18:30 PM",
    month: "2025-07"
  },
  {
    id: "LOG-1041",
    date: "2025-06-30",
    dateDisplay: "Jun 30, 2025",
    day: "Monday",
    ticket: "ST-280",
    ticketTitle: "Production DB Shard Migration",
    summary: "Assisted senior DBA in running shadow write validation on Postgres 16 partition split.",
    hours: 8.0,
    category: "Feature Dev",
    verifier: "Marcus Vance",
    verifierOrg: "Stripe",
    status: "approved",
    signedAt: "Jul 01, 2025 • 08:45 AM",
    month: "2025-06"
  },
  {
    id: "LOG-1040",
    date: "2025-06-27",
    dateDisplay: "Jun 27, 2025",
    day: "Friday",
    ticket: "ST-255",
    ticketTitle: "Code Review & Security Audit Review",
    summary: "Reviewed 12 pull requests addressing mTLS cipher suites across egress edge gateways.",
    hours: 8.0,
    category: "Code Review",
    verifier: "Marcus Vance",
    verifierOrg: "Stripe",
    status: "approved",
    signedAt: "Jun 28, 2025 • 11:10 AM",
    month: "2025-06"
  }
];

export default function HoursHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [monthFilter, setMonthFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredEntries = useMemo(() => {
    return HISTORICAL_ENTRIES.filter((item) => {
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (monthFilter !== "all" && item.month !== monthFilter) return false;
      if (searchDate && item.date !== searchDate) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQ =
          item.ticketTitle.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.ticket.toLowerCase().includes(q) ||
          item.verifier.toLowerCase().includes(q);
        if (!matchesQ) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortBy === "hours") return b.hours - a.hours;
      return new Date(b.date) - new Date(a.date);
    });
  }, [searchQuery, searchDate, monthFilter, statusFilter, sortBy]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-orange-600 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb & Navigation */}
      <section className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/student" className="hover:text-orange-400 transition-colors">
            Student
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <Link href="/student/internship" className="hover:text-orange-400 transition-colors">
            My Internship
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <Link href="/student/log-hours" className="hover:text-orange-400 transition-colors">
            Log Hours & Timesheets
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-orange-400 font-medium">Hours History & Audit Records</span>
        </div>

        <Link
          href="/student/log-hours"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Current Week
        </Link>
      </section>

      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Hours History & Audit Trail
            </h1>
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              280.0 Total Tracked Hours
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Complete cryptographic audit trail of all working shifts, supervisor approvals, and CPT compliance verification.
          </p>
        </div>

        <button
          onClick={() => showToast("Exporting official timesheet CSV with SHA-256 registrar signatures...")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          Export Timesheet CSV
        </button>
      </section>

      {/* Comprehensive Filter Bar (Keyword Search + Search by Date + Dropdowns) */}
      <section className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Keyword Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by deliverable, ticket ID (ST-402), or task keywords..."
              className="w-full pl-10 pr-9 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search by Date Picker */}
          <div className="md:col-span-3 relative">
            <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="w-full pl-10 pr-8 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
              title="Search by specific work date"
            />
            {searchDate && (
              <button
                onClick={() => setSearchDate("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Month Selector */}
          <div className="md:col-span-3">
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-gray-300 focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              <option value="all">All Months</option>
              <option value="2025-07">July 2025 (Current)</option>
              <option value="2025-06">June 2025</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs & Sort Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            {[
              { id: "all", label: "All Records", count: HISTORICAL_ENTRIES.length },
              { id: "approved", label: "Approved", count: HISTORICAL_ENTRIES.filter((e) => e.status === "approved").length },
              { id: "pending", label: "Pending Review", count: HISTORICAL_ENTRIES.filter((e) => e.status === "pending").length },
              { id: "needs_review", label: "Needs Correction", count: HISTORICAL_ENTRIES.filter((e) => e.status === "needs_review").length, isRed: true }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                  statusFilter === tab.id
                    ? tab.isRed
                      ? "bg-red-600 text-white shadow-sm font-bold"
                      : "bg-orange-500 text-white shadow-sm font-bold"
                    : tab.isRed
                    ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 font-semibold"
                    : "bg-black/40 text-gray-400 hover:text-white border border-white/5"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-gray-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-300 focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              <option value="newest">Newest First (Default)</option>
              <option value="oldest">Oldest First</option>
              <option value="hours">Highest Hours</option>
            </select>
          </div>
        </div>
      </section>

      {/* Historical Timesheet Table */}
      <section className="rounded-2xl bg-[#1c1c1c] border border-white/10 overflow-hidden">
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
              {filteredEntries.map((row) => (
                <tr key={row.id} className="hover:bg-white/[0.03] transition-colors group">
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap align-top">
                    <div className="font-semibold text-white text-xs">{row.dateDisplay}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{row.day}</div>
                    <span className="inline-block mt-1 font-mono text-[10px] text-gray-500">
                      {row.id}
                    </span>
                  </td>

                  <td className="py-4 px-4 sm:px-6 max-w-md align-top">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-white text-xs group-hover:text-orange-400 transition-colors">
                        {row.ticketTitle}
                      </span>
                      <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-white/5 text-orange-400 border border-white/10 font-bold">
                        {row.ticket}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400">
                        {row.category}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                      {row.summary}
                    </p>

                    {row.flagReason && (
                      <div className="mt-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-red-400" />
                        <span>{row.flagReason}</span>
                      </div>
                    )}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-center align-top">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-white/5 text-white font-mono font-bold text-xs border border-white/10">
                      {row.hours.toFixed(1)} hrs
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap align-top">
                    <div className="text-xs font-medium text-white">{row.verifier}</div>
                    <div className="text-[10px] text-gray-400">{row.verifierOrg}</div>
                    {row.signedAt && (
                      <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                        <Check className="w-3 h-3" /> Signed {row.signedAt}
                      </div>
                    )}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap align-top">
                    {row.status === "approved" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Check className="w-3 h-3" /> Approved
                      </span>
                    )}
                    {row.status === "pending" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Clock3 className="w-3 h-3" /> Pending Review
                      </span>
                    )}
                    {row.status === "needs_review" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
                        <AlertTriangle className="w-3 h-3 text-red-400" /> Needs Correction
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-right pr-6 align-top">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedEntry(row)}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
                      >
                        Details
                      </button>
                      {row.status === "needs_review" && (
                        <button
                          onClick={() => showToast("Routing appeal to MIT Co-op Dean Office...")}
                          className="px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-medium border border-red-500/40"
                        >
                          Appeal
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEntries.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            <Search className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">No timesheet records match your filter</p>
            <p className="text-xs text-gray-500 mt-1">Try resetting the date picker or search keyword.</p>
          </div>
        )}

        <div className="p-4 border-t border-white/10 bg-white/[0.01] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <span>Showing {filteredEntries.length} of {HISTORICAL_ENTRIES.length} total shift logs</span>
          <div className="flex items-center gap-4 font-mono">
            <span>Cumulative Approved: <strong className="text-emerald-400">240.0 hrs</strong></span>
          </div>
        </div>
      </section>

      {/* ================= MODAL: Details Drawer ================= */}
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
                <div className="text-white font-medium mt-1">{selectedEntry.dateDisplay} ({selectedEntry.day})</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-gray-400">Total Hours</span>
                <div className="text-white font-medium mt-1">{selectedEntry.hours.toFixed(1)} hrs</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-gray-400">Host Verifier</span>
                <div className="text-white font-medium mt-1">{selectedEntry.verifier}</div>
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
