"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  UserCheck,
  Users,
  Award,
  CheckCircle2,
  AlertTriangle,
  Download,
  PlusCircle,
  Search,
  Filter,
  Mail,
  Building,
  Star,
  ChevronRight,
  Clock,
  X,
  Sparkles
} from "lucide-react";

export default function EmployerSupervisorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3600);
  };

  // Add Supervisor Form State
  const [newSupervisor, setNewSupervisor] = useState({
    name: "",
    email: "",
    dept: "Core Infrastructure",
    title: "",
    capacity: 3
  });

  // Supervisors Roster
  const [supervisors, setSupervisors] = useState([
    {
      id: "SUP-101",
      name: "Marcus Vance",
      title: "Principal Distributed Systems Architect",
      dept: "Core Infrastructure",
      email: "marcus.vance@acme.com",
      assignedCount: 3,
      maxCapacity: 3,
      capacityStatus: "Max Capacity",
      capacityColor: "bg-rose-500/15 text-rose-400 border-rose-500/30",
      mentees: ["Alex Chen (Stanford)", "Nishita Upreti (GEU)", "David Kim (Berkeley)"],
      pendingTimesheets: 2,
      rating: "4.95 / 5.0",
      activeProjects: "Kafka Consensus, Regional DB Sharding"
    },
    {
      id: "SUP-102",
      name: "Elena Rostova",
      title: "Staff Platform Engineer",
      dept: "Reliability & SRE",
      email: "elena.rostova@acme.com",
      assignedCount: 2,
      maxCapacity: 3,
      capacityStatus: "Optimal Load",
      capacityColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      mentees: ["Sarah Lindqvist (Waterloo)", "Elena Rostova (MIT)"],
      pendingTimesheets: 1,
      rating: "4.90 / 5.0",
      activeProjects: "eBPF Kernel Probes, Rate Limiting Filters"
    },
    {
      id: "SUP-103",
      name: "Dr. Aris Thorne",
      title: "Research Director",
      dept: "Reasoning & LLM Labs",
      email: "aris.thorne@acme.com",
      assignedCount: 1,
      maxCapacity: 2,
      capacityStatus: "Available (1 slot)",
      capacityColor: "bg-sky-500/15 text-sky-400 border-sky-500/30",
      mentees: ["Maya Chen (MIT)"],
      pendingTimesheets: 1,
      rating: "4.85 / 5.0",
      activeProjects: "Verifiable RLHF, Chain-of-Thought Scaling"
    },
    {
      id: "SUP-104",
      name: "Rachel Vance",
      title: "Head of Enterprise UX",
      dept: "Product Design",
      email: "rachel.vance@acme.com",
      assignedCount: 1,
      maxCapacity: 2,
      capacityStatus: "Available (1 slot)",
      capacityColor: "bg-sky-500/15 text-sky-400 border-sky-500/30",
      mentees: ["Marcus Vance (CMU)"],
      pendingTimesheets: 1,
      rating: "4.75 / 5.0",
      activeProjects: "Design Tokens V3, Component Accessibility"
    }
  ]);

  // Handle Add Supervisor
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const created = {
      id: `SUP-${Math.floor(105 + Math.random() * 50)}`,
      name: newSupervisor.name,
      title: newSupervisor.title,
      dept: newSupervisor.dept,
      email: newSupervisor.email,
      assignedCount: 0,
      maxCapacity: Number(newSupervisor.capacity) || 3,
      capacityStatus: "Available (Open)",
      capacityColor: "bg-sky-500/15 text-sky-400 border-sky-500/30",
      mentees: [],
      pendingTimesheets: 0,
      rating: "New",
      activeProjects: "Mentorship onboarding"
    };

    setSupervisors([created, ...supervisors]);
    setIsAddModalOpen(false);
    showToast(`Industry supervisor ${created.name} registered successfully! ID: ${created.id}`);
  };

  const filtered = supervisors.filter((s) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.dept.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-16">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-orange-600 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Breadcrumbs */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/employer" className="hover:text-orange-400 transition-colors">
              Employer Portal
            </Link>
            <span>/</span>
            <span className="text-gray-300">Supervisors</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Industry Supervisor Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Cycle: Summer 2025 • Workload balancing, timesheet sign-off authority, and student mentorship caliber.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast("Exporting industry supervisor roster & capacity reports CSV...")}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs sm:text-sm font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Roster</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add Supervisor</span>
          </button>
        </div>
      </section>

      {/* 5 KPI Metric Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        {[
          { title: "Total Supervisors", val: "8 Registered", sub: "Across 4 departments", color: "text-white" },
          { title: "Active Mentees", val: "14 Assigned", sub: "100% supervision quorum", color: "text-emerald-400" },
          { title: "Capacity Load", val: "1.75 / Mentor", sub: "Avg students per lead", color: "text-sky-400" },
          { title: "Pending Evaluations", val: "5 Reviews", sub: "Mid-term due in 72h", color: "text-amber-400" },
          { title: "Mentorship Quality", val: "4.85 / 5.0", sub: "+0.2 vs Spring cohort", color: "text-orange-400" }
        ].map((m, i) => (
          <div key={i} className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">
              {m.title}
            </span>
            <div className={`text-xl sm:text-2xl font-bold tracking-tight mt-2 font-mono ${m.color}`}>
              {m.val}
            </div>
            <span className="text-[10px] text-gray-500 font-medium block mt-1">{m.sub}</span>
          </div>
        ))}
      </section>

      {/* Search Input */}
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by supervisor name, title, department..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* Supervisor Workload Cards */}
      <div className="space-y-4">
        {filtered.map((sup) => (
          <article
            key={sup.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 group"
          >
            {/* Left Content */}
            <div className="space-y-2 min-w-0 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold flex items-center justify-center text-xs shrink-0">
                  {sup.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                      {sup.name}
                    </h3>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-orange-400 border border-white/10 font-bold">
                      {sup.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${sup.capacityColor}`}>
                      {sup.capacityStatus}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-400">{sup.title} • {sup.dept}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-400 flex-wrap pt-1">
                <span className="flex items-center gap-1.5 text-gray-300">
                  <Mail className="w-3.5 h-3.5 text-gray-500" />
                  {sup.email}
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  Rating: {sup.rating}
                </span>
                <span>•</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {sup.pendingTimesheets} Timesheets to sign
                </span>
              </div>

              {/* Assigned Mentees Chips */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider block mb-1.5">
                  Assigned Student Interns ({sup.assignedCount} / {sup.maxCapacity}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {sup.mentees.map((m, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-black/40 text-gray-300 border border-white/5 text-xs font-medium"
                    >
                      {m}
                    </span>
                  ))}
                  {sup.mentees.length === 0 && (
                    <span className="text-xs text-gray-500 italic">No interns currently paired.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
              <Link
                href="/employer/interns"
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-md shadow-orange-500/20 transition-all"
              >
                View Mentees
              </Link>
              <button
                onClick={() => showToast(`Workload rebalancing initiated for ${sup.name}.`)}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
              >
                Rebalance
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* ================= ADD SUPERVISOR MODAL ================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/25 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Register Industry Supervisor</h2>
                  <p className="text-xs text-gray-400">Authorize engineering lead for timesheet sign-off</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 font-medium mb-1">Supervisor Full Name *</label>
                <input
                  type="text"
                  required
                  value={newSupervisor.name}
                  onChange={(e) => setNewSupervisor({ ...newSupervisor, name: e.target.value })}
                  placeholder="e.g. Marcus Vance"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Corporate Email Address</label>
                <input
                  type="email"
                  required
                  value={newSupervisor.email}
                  onChange={(e) => setNewSupervisor({ ...newSupervisor, email: e.target.value })}
                  placeholder="e.g. marcus.vance@acme.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    value={newSupervisor.title}
                    onChange={(e) => setNewSupervisor({ ...newSupervisor, title: e.target.value })}
                    placeholder="e.g. Principal Distributed Systems Architect"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-medium mb-1">Department</label>
                  <select
                    value={newSupervisor.dept}
                    onChange={(e) => setNewSupervisor({ ...newSupervisor, dept: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="Core Infrastructure">Core Infrastructure</option>
                    <option value="Reliability & SRE">Reliability &amp; SRE</option>
                    <option value="Reasoning & LLM Labs">Reasoning &amp; LLM Labs</option>
                    <option value="Product Design">Product Design</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Max Student Mentee Capacity</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={newSupervisor.capacity}
                  onChange={(e) => setNewSupervisor({ ...newSupervisor, capacity: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 font-mono"
                />
                <p className="text-[10px] text-gray-500 mt-1">Recommended load: 2-3 students per engineering mentor.</p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/20 transition-all"
                >
                  Authorize Supervisor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
