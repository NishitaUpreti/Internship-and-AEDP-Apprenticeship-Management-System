"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  PlusCircle,
  Search,
  Filter,
  UserCheck,
  FileCheck,
  Calendar,
  ChevronRight,
  ShieldCheck,
  X,
  FileText,
  Star,
  Building,
  Check
} from "lucide-react";

export default function EmployerInternsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInternHours, setSelectedInternHours] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [assignSupervisorIntern, setAssignSupervisorIntern] = useState(null);
  const [selectedSupervisor, setSelectedSupervisor] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3600);
  };

  // Available industry supervisors
  const availableSupervisors = [
    { name: "Marcus Vance", title: "Principal Architect", dept: "Distributed Systems", activeMentees: 2, maxCapacity: 4 },
    { name: "Elena Rostova", title: "Staff Platform Eng", dept: "Platform & Concurrency", activeMentees: 1, maxCapacity: 3 },
    { name: "Dr. Aris Thorne", title: "Research Director", dept: "AI & Foundation Models", activeMentees: 1, maxCapacity: 3 },
    { name: "Rachel Vance", title: "Head of Design", dept: "Product & Design Systems", activeMentees: 1, maxCapacity: 2 },
    { name: "David K. Henderson", title: "VP Infrastructure", dept: "Cloud SRE & Networks", activeMentees: 0, maxCapacity: 3 }
  ];

  const handleOpenAssignSupervisor = (intern) => {
    setAssignSupervisorIntern(intern);
    setSelectedSupervisor(intern.supervisor);
  };

  const handleConfirmAssignSupervisor = (e) => {
    e.preventDefault();
    if (!assignSupervisorIntern || !selectedSupervisor) return;

    setInterns((prev) =>
      prev.map((it) =>
        it.id === assignSupervisorIntern.id
          ? { ...it, supervisor: selectedSupervisor }
          : it
      )
    );
    showToast(`Supervisor for ${assignSupervisorIntern.name} updated to ${selectedSupervisor}!`);
    setAssignSupervisorIntern(null);
  };

  // Register Intern Form State
  const [newIntern, setNewIntern] = useState({
    name: "Nishita Upreti",
    university: "Graphic Era University (GEU)",
    role: "Distributed Systems Engineering Intern",
    supervisor: "Marcus Vance (Principal Architect)",
    hoursTarget: 480,
    term: "Summer 2025 (May 26 – Aug 22)"
  });

  // Intern Roster
  const [interns, setInterns] = useState([
    {
      id: "INTN-201",
      name: "Alex Chen",
      initials: "AC",
      avatarBg: "bg-indigo-600/20 text-indigo-400 border-indigo-500/30",
      school: "Stanford University • MS CS",
      role: "Distributed Systems Engineering Intern",
      supervisor: "Marcus Vance (Principal Architect)",
      cohort: "Summer 2025",
      weekProgress: "Week 8 of 12",
      pctComplete: 67,
      loggedHours: 320,
      targetHours: 480,
      approvedHours: 320,
      flaggedHours: 0,
      midtermEval: "Passed (4.9 / 5.0)",
      cptStatus: "Verified Tripartite Agreement",
      status: "Active"
    },
    {
      id: "INTN-202",
      name: "Nishita Upreti",
      initials: "NU",
      avatarBg: "bg-amber-600/20 text-amber-400 border-amber-500/30",
      school: "Graphic Era University (GEU) • B.Tech CSE",
      role: "Distributed Systems Engineering Intern",
      supervisor: "Marcus Vance (Principal Architect)",
      cohort: "Summer 2025",
      weekProgress: "Week 6 of 12",
      pctComplete: 50,
      loggedHours: 240,
      targetHours: 480,
      approvedHours: 200,
      flaggedHours: 40,
      midtermEval: "Due in 5 days",
      cptStatus: "Verified Tripartite Agreement",
      status: "Active"
    },
    {
      id: "INTN-203",
      name: "Maya Chen",
      initials: "MC",
      avatarBg: "bg-emerald-600/20 text-emerald-400 border-emerald-500/30",
      school: "MIT • PhD AI Lab",
      role: "AI & Foundation Models Research Fellow",
      supervisor: "Dr. Aris Thorne (Research Director)",
      cohort: "Summer 2025",
      weekProgress: "Week 4 of 16",
      pctComplete: 25,
      loggedHours: 160,
      targetHours: 640,
      approvedHours: 160,
      flaggedHours: 0,
      midtermEval: "Upcoming",
      cptStatus: "Verified Tripartite Agreement",
      status: "Active"
    },
    {
      id: "INTN-198",
      name: "Elena Rostova",
      initials: "ER",
      avatarBg: "bg-purple-600/20 text-purple-400 border-purple-500/30",
      school: "MIT • PhD Computer Science",
      role: "Machine Learning Research Co-op",
      supervisor: "Elena Rostova (Staff Platform Eng)",
      cohort: "Spring 2025",
      weekProgress: "Week 12 of 12",
      pctComplete: 100,
      loggedHours: 480,
      targetHours: 480,
      approvedHours: 480,
      flaggedHours: 0,
      midtermEval: "Passed (5.0 / 5.0)",
      cptStatus: "Final Practicum Certified",
      status: "Completed"
    },
    {
      id: "INTN-209",
      name: "David Kim",
      initials: "DK",
      avatarBg: "bg-sky-600/20 text-sky-400 border-sky-500/30",
      school: "UC Berkeley • BS EECS",
      role: "Distributed Systems Engineering Intern",
      supervisor: "Marcus Vance (Principal Architect)",
      cohort: "Summer 2025 (Cohort B)",
      weekProgress: "Starts June 02",
      pctComplete: 0,
      loggedHours: 0,
      targetHours: 480,
      approvedHours: 0,
      flaggedHours: 0,
      midtermEval: "Upcoming",
      cptStatus: "Onboarding In Progress",
      status: "Upcoming"
    }
  ]);

  // Handle Register Intern Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const created = {
      id: `INTN-${Math.floor(215 + Math.random() * 50)}`,
      name: newIntern.name,
      initials: newIntern.name.split(" ").map((n) => n[0]).join(""),
      avatarBg: "bg-orange-600/20 text-orange-400 border-orange-500/30",
      school: newIntern.university,
      role: newIntern.role,
      supervisor: newIntern.supervisor,
      cohort: "Summer 2025",
      weekProgress: "Starts May 26",
      pctComplete: 0,
      loggedHours: 0,
      targetHours: Number(newIntern.hoursTarget) || 480,
      approvedHours: 0,
      flaggedHours: 0,
      midtermEval: "Upcoming",
      cptStatus: "Agreement Dispatched",
      status: "Upcoming"
    };

    setInterns([created, ...interns]);
    setIsRegisterModalOpen(false);
    showToast(`Intern ${created.name} registered and supervisor paired! Ref: ${created.id}`);
  };

  const filtered = interns.filter((item) => {
    if (statusFilter === "active" && item.status !== "Active") return false;
    if (statusFilter === "upcoming" && item.status !== "Upcoming") return false;
    if (statusFilter === "completed" && item.status !== "Completed") return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.school.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-16">
      {/* Toast Feedback */}
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
            <span className="text-gray-300">Interns</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Active Intern Management &amp; Capstones
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Cohort: Summer 2025 • Central supervisor verification, tripartite legal compliance, and real-time capstone milestone monitoring.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast("Exporting intern dossiers & hours verification CSV...")}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs sm:text-sm font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Dossiers</span>
          </button>
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Register Intern</span>
          </button>
        </div>
      </section>

      {/* 4 KPI Metrics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Total Interns", val: "14", sub: "10 Active • 3 Upcoming • 1 Completed", color: "text-white" },
          { title: "Hours Logged", val: "3,420h", sub: "92% approved (180h review required)", color: "text-emerald-400" },
          { title: "Pending Milestone Evals", val: "6", sub: "Mid-term evaluations due in 5 days", color: "text-amber-400" },
          { title: "Tripartite Legal Agreements", val: "14 / 14", sub: "100% CPT compliance quorum", color: "text-orange-400" }
        ].map((m, i) => (
          <div key={i} className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">
              {m.title}
            </span>
            <div className={`text-2xl sm:text-3xl font-bold tracking-tight mt-2 font-mono ${m.color}`}>
              {m.val}
            </div>
            <span className="text-[10px] text-gray-500 font-medium block mt-1">{m.sub}</span>
          </div>
        ))}
      </section>

      {/* Filter Tabs & Search */}
      <section className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          {[
            { id: "all", label: "All Cohort (14)" },
            { id: "active", label: "Active Interns (10)" },
            { id: "upcoming", label: "Upcoming (3)" },
            { id: "completed", label: "Completed (1)" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                statusFilter === tab.id
                  ? "bg-orange-500 text-white shadow-sm font-bold"
                  : "bg-black/40 text-gray-400 hover:text-white border border-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search intern name, role, school..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
          />
        </div>
      </section>

      {/* Interns Cards Roster */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 group"
          >
            {/* Left Content */}
            <div className="space-y-2 min-w-0 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-xs shrink-0 ${item.avatarBg}`}
                >
                  {item.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-orange-400 border border-white/10 font-bold">
                      {item.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        item.status === "Active"
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : item.status === "Upcoming"
                          ? "bg-sky-500/15 text-sky-400 border border-sky-500/30"
                          : "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-400">{item.school}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-400 flex-wrap pt-1">
                <span className="text-gray-200 font-semibold">{item.role}</span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-orange-300">
                  <UserCheck className="w-3.5 h-3.5 text-orange-400" />
                  <span>
                    Supervisor: <strong className="text-white">{item.supervisor}</strong>
                  </span>
                  <button
                    onClick={() => handleOpenAssignSupervisor(item)}
                    className="ml-1 text-[11px] text-amber-400 hover:text-amber-300 underline font-semibold transition-colors cursor-pointer"
                  >
                    (Change)
                  </button>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-gray-400">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  {item.weekProgress}
                </span>
              </div>

              {/* Progress & Milestone Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Hours Completed</span>
                    <span className="font-mono font-bold text-white">
                      {item.loggedHours} / {item.targetHours}h ({item.pctComplete}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                      style={{ width: `${item.pctComplete}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                      Midterm Milestone
                    </span>
                    <span className="font-bold text-orange-400 mt-0.5 block">{item.midtermEval}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {item.cptStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-start lg:self-center shrink-0 flex-wrap">
              {/* Assign Supervisor Action */}
              <button
                onClick={() => handleOpenAssignSupervisor(item)}
                className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Assign Supervisor</span>
              </button>

              <button
                onClick={() => setSelectedInternHours(item)}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Review Timesheets</span>
              </button>
              <button
                onClick={() => showToast(`Opening Tripartite Academic Agreement for ${item.name}...`)}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
              >
                Agreement PDF
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* ================= REVIEW INTERN HOURS MODAL ================= */}
      {selectedInternHours && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Hours Audit: {selectedInternHours.name}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-orange-400 border border-white/10">
                    {selectedInternHours.id}
                  </span>
                </h3>
                <p className="text-xs text-gray-400">Supervisor: {selectedInternHours.supervisor}</p>
              </div>
              <button
                onClick={() => setSelectedInternHours(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-gray-400 text-[10px] uppercase font-semibold">Total Logged</span>
                  <div className="font-mono text-white font-bold text-lg mt-1">
                    {selectedInternHours.loggedHours}h
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-gray-400 text-[10px] uppercase font-semibold">Approved</span>
                  <div className="font-mono text-emerald-400 font-bold text-lg mt-1">
                    {selectedInternHours.approvedHours}h
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-gray-400 text-[10px] uppercase font-semibold">Review Required</span>
                  <div className="font-mono text-amber-400 font-bold text-lg mt-1">
                    {selectedInternHours.flaggedHours}h
                  </div>
                </div>
              </div>

              {/* Sample Timesheet Log Rows */}
              <div className="space-y-2">
                <span className="text-gray-400 font-medium block">Recent Weekly Log Submissions</span>
                {[
                  { week: "Week 6 (Jul 21 – Jul 27)", hours: 40.0, status: "Pending Supervisor Sign-off", color: "text-amber-400" },
                  { week: "Week 5 (Jul 14 – Jul 20)", hours: 40.0, status: "Verified & Approved", color: "text-emerald-400" },
                  { week: "Week 4 (Jul 07 – Jul 13)", hours: 40.0, status: "Verified & Approved", color: "text-emerald-400" }
                ].map((row, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-white">{row.week}</div>
                      <div className={`text-[10px] font-semibold mt-0.5 ${row.color}`}>{row.status}</div>
                    </div>
                    <span className="font-mono font-bold text-white text-xs">{row.hours.toFixed(1)} hrs</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex items-center justify-between">
              <button
                onClick={() => setSelectedInternHours(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showToast(`All pending weekly shifts for ${selectedInternHours.name} approved.`);
                  setSelectedInternHours(null);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Sign-off &amp; Approve Hours</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= REGISTER INTERN MODAL ================= */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/25 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Register New Intern</h2>
                  <p className="text-xs text-gray-400">Initiate university CPT practicum tracking &amp; supervisor pairing</p>
                </div>
              </div>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 font-medium mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={newIntern.name}
                  onChange={(e) => setNewIntern({ ...newIntern, name: e.target.value })}
                  placeholder="e.g. Nishita Upreti"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">University / Academic Institution</label>
                <input
                  type="text"
                  required
                  value={newIntern.university}
                  onChange={(e) => setNewIntern({ ...newIntern, university: e.target.value })}
                  placeholder="e.g. Graphic Era University (GEU)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Internship Requisition</label>
                <select
                  value={newIntern.role}
                  onChange={(e) => setNewIntern({ ...newIntern, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="Distributed Systems Engineering Intern">Distributed Systems Engineering Intern</option>
                  <option value="Product Design & Design Systems Intern">Product Design &amp; Design Systems Intern</option>
                  <option value="AI & Foundation Models Research Fellow">AI &amp; Foundation Models Research Fellow</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Assigned Industry Host Supervisor</label>
                <select
                  value={newIntern.supervisor}
                  onChange={(e) => setNewIntern({ ...newIntern, supervisor: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="Marcus Vance (Principal Architect)">Marcus Vance (Principal Architect)</option>
                  <option value="Elena Rostova (Staff Platform Eng)">Elena Rostova (Staff Platform Eng)</option>
                  <option value="Dr. Aris Thorne (Research Director)">Dr. Aris Thorne (Research Director)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Total Practicum Hours Target</label>
                  <input
                    type="number"
                    value={newIntern.hoursTarget}
                    onChange={(e) => setNewIntern({ ...newIntern, hoursTarget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Cohort Term</label>
                  <input
                    type="text"
                    value={newIntern.term}
                    onChange={(e) => setNewIntern({ ...newIntern, term: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/20 transition-all"
                >
                  Register &amp; Activate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ================= ASSIGN SUPERVISOR MODAL ================= */}
      {assignSupervisorIntern && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/25 flex items-center justify-center">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Assign Industry Supervisor</h2>
                  <p className="text-xs text-gray-400">
                    Pair qualified mentor for <span className="text-white font-medium">{assignSupervisorIntern.name}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAssignSupervisorIntern(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmAssignSupervisor} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-semibold text-gray-400">Active Intern</span>
                  <span className="text-amber-400 text-[10px] font-mono font-bold">{assignSupervisorIntern.id}</span>
                </div>
                <div className="text-white font-bold text-sm">{assignSupervisorIntern.name}</div>
                <div className="text-gray-400 text-[11px]">{assignSupervisorIntern.role} • {assignSupervisorIntern.school}</div>
                <div className="text-[11px] text-gray-300 pt-1">
                  Current Supervisor: <strong className="text-orange-400">{assignSupervisorIntern.supervisor}</strong>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Select Certified Supervisor / Lead Mentor *
                </label>
                <div className="space-y-2">
                  {availableSupervisors.map((sup, idx) => {
                    const fullSupervisorName = `${sup.name} (${sup.title})`;
                    const isSelected = selectedSupervisor === fullSupervisorName;
                    return (
                      <label
                        key={idx}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? "bg-amber-500/15 border-amber-500/50 text-white shadow-sm"
                            : "bg-black/30 border-white/5 hover:border-white/20 text-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="supervisorSelection"
                            value={fullSupervisorName}
                            checked={isSelected}
                            onChange={(e) => setSelectedSupervisor(e.target.value)}
                            className="text-orange-500 focus:ring-orange-500"
                          />
                          <div>
                            <div className="font-bold text-white text-xs">{sup.name}</div>
                            <div className="text-[10px] text-gray-400">{sup.title} • {sup.dept}</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                            {sup.activeMentees}/{sup.maxCapacity} Mentees
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAssignSupervisorIntern(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Confirm Supervisor Assignment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
