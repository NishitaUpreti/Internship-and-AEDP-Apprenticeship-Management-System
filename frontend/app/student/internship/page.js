"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Calendar,
  Clock,
  MapPin,
  Building2,
  DollarSign,
  ChevronRight,
  Download,
  PlusCircle,
  FileText,
  Mail,
  MessageSquare,
  CalendarDays,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  UserCheck,
  Award,
  AlertCircle,
  Network,
  X
} from "lucide-react";

export default function InternshipWorkspacePage() {
  const [toastMessage, setToastMessage] = useState(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "2025-07-23",
    ticket: "ST-402: Idempotent Event Delivery",
    startTime: "09:00",
    endTime: "17:30",
    hours: "8.0",
    summary: "Simulated Kafka broker outage and measured replay lag across consumer groups."
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-orange-600 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* 1. Breadcrumbs & Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1.5">
            <Link href="/student" className="hover:text-orange-400 transition-colors">
              Student
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-gray-200">Internship Workspace</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-orange-400 font-medium">Summer 2025: Stripe</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              My Internship Workspace
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Active Term: Summer 2025 (In Progress)
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Real-time management for verified work placement, dual mentorship tracking, and university accreditation.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => showToast("Exporting official internship dossier PDF...")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-orange-500/15 border border-orange-500/40 text-orange-400 text-xs font-semibold hover:bg-orange-500/25 transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-orange-400" />
            <span>Export Dossier (PDF)</span>
          </button>
          <button
            onClick={() => setIsLogModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition-all shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log Working Hours</span>
          </button>
        </div>
      </section>

      {/* 2. Primary Hero Card: Current Internship Overview */}
      <section className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-white/10">
          {/* Identity */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 text-2xl font-bold shadow-inner shrink-0">
              S
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-semibold text-gray-200">Stripe, Inc.</span>
                <span className="text-gray-500">•</span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> San Francisco HQ
                </span>
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                Backend Engineering & Systems Co-op
              </h2>
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <Network className="w-4 h-4 text-orange-400" />
                <span>Core Payments Infrastructure & Distributed Ledger Pod</span>
              </p>
            </div>
          </div>

          {/* Progress Box */}
          <div className="flex flex-col items-start lg:items-end gap-2 bg-[#252525] p-4 rounded-xl border border-white/5 min-w-[280px]">
            <div className="flex items-center justify-between w-full text-xs">
              <span className="text-gray-400">Current Phase</span>
              <span className="px-2 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active • Week 6 of 12
              </span>
            </div>
            <div className="w-full space-y-1.5 mt-1">
              <div className="flex justify-between text-xs">
                <span className="text-white font-medium">50% Completed</span>
                <span className="text-gray-400">6 wks elapsed • 6 wks left</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-[#1c1c1c] h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metadata Grid (6-column metrics) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-6">
          {/* 1 */}
          <div className="p-3.5 rounded-xl bg-[#252525] border border-white/5">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <Calendar className="w-3.5 h-3.5 text-orange-400" />
              <span>Start Date</span>
            </div>
            <p className="text-sm font-semibold text-white">June 02, 2025</p>
            <span className="text-[10px] text-gray-500">Orientation Done</span>
          </div>

          {/* 2 */}
          <div className="p-3.5 rounded-xl bg-[#252525] border border-white/5">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <CalendarDays className="w-3.5 h-3.5 text-orange-400" />
              <span>End Date</span>
            </div>
            <p className="text-sm font-semibold text-white">August 22, 2025</p>
            <span className="text-[10px] text-gray-500">Final Defense</span>
          </div>

          {/* 3 */}
          <div className="p-3.5 rounded-xl bg-[#252525] border border-white/5">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Duration</span>
            </div>
            <p className="text-sm font-semibold text-white">12 Weeks</p>
            <span className="text-[10px] text-gray-500">40 hrs/wk full-time</span>
          </div>

          {/* 4 */}
          <div className="p-3.5 rounded-xl bg-[#252525] border border-white/5">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>Location</span>
            </div>
            <p className="text-sm font-semibold text-white">San Francisco</p>
            <span className="text-[10px] text-gray-500">Hybrid (3d onsite)</span>
          </div>

          {/* 5 */}
          <div className="p-3.5 rounded-xl bg-[#252525] border border-white/5">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
              <span>Authorization</span>
            </div>
            <p className="text-sm font-semibold text-white">CPT Approved</p>
            <span className="text-[10px] text-purple-300">4.0 Units (CS 198W)</span>
          </div>

          {/* 6 */}
          <div className="p-3.5 rounded-xl bg-[#252525] border border-white/5">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Stipend Rate</span>
            </div>
            <p className="text-sm font-bold text-emerald-400">$10,400 / mo</p>
            <span className="text-[10px] text-gray-500">Bi-weekly direct deposit</span>
          </div>
        </div>
      </section>

      {/* 3. Dual Mentorship & Tripartite Compliance (2-column layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Supervision Matrix (7 cols) */}
        <section className="lg:col-span-7 bg-[#1c1c1c] border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-orange-400" />
              <h3 className="font-semibold text-white text-base">Supervision & Advisory Matrix</h3>
            </div>
            <span className="text-xs text-gray-400">Dual Evaluator Protocol</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Host Supervisor */}
            <div className="p-4 rounded-xl bg-[#252525] border border-white/5 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    Industry Host Mentor
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" title="Online on Slack"></span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Marcus Vance</h4>
                  <p className="text-xs text-gray-400">Principal Systems Architect @ Stripe</p>
                </div>
                <div className="space-y-1.5 text-xs text-gray-400 pt-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-200">mvance@stripe.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-gray-500" />
                    <span>Contact Info: Bldg 4 • 3rd Floor (Slack: @marcusvance)</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Weekly Meeting: Pending Confirmation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Faculty Advisor */}
            <div className="p-4 rounded-xl bg-[#252525] border border-white/5 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    Faculty Co-op Advisor
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono">Stanford CS</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Prof. Elena Rostova, PhD</h4>
                  <p className="text-xs text-gray-400">School of Engineering • Systems Group</p>
                </div>
                <div className="space-y-1.5 text-xs text-gray-400 pt-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-200">erostova@cs.stanford.edu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-gray-500" />
                    <span>Office Bldg: Gates CS Bldg, Rm 392</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span>Office Hours: Mon 10:00 AM PT</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-400">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Final Paper Due: Aug 18, 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tripartite Compliance Card (5 cols) */}
        <section className="lg:col-span-5 bg-[#1c1c1c] border border-white/10 rounded-2xl p-6 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-semibold text-white text-base">Tripartite Compliance</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Legally Verified
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-3 leading-relaxed">
              Tripartite Educational Agreement between University, Host Employer, and Student registered with Registrar & Academic Senate.
            </p>

            <div className="space-y-2.5 mt-4">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#252525] border border-white/5">
                <div className="flex items-center gap-2 text-xs text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Student (Alex Vance)</span>
                </div>
                <span className="text-[11px] text-gray-400">Signed May 14, 2025</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#252525] border border-white/5">
                <div className="flex items-center gap-2 text-xs text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Employer (Rachel Thorne, Stripe VP)</span>
                </div>
                <span className="text-[11px] text-gray-400">Signed May 16, 2025</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#252525] border border-white/5">
                <div className="flex items-center gap-2 text-xs text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>University Registrar Endorsement</span>
                </div>
                <span className="text-[11px] text-gray-400">Endorsed May 19, 2025</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#252525] border border-white/5">
                <div className="flex items-center gap-2 text-xs text-white">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>NDA & IP Assignment Protocol</span>
                </div>
                <button
                  onClick={() => showToast("Opening NDA & IP Protocol PDF...")}
                  className="text-xs text-orange-400 hover:underline"
                >
                  View PDF
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast("Downloading Tripartite Agreement contract PDF...")}
            className="w-full mt-2 flex items-center justify-center gap-2 bg-orange-500/15 hover:bg-orange-500/25 text-orange-400 border border-orange-500/40 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-orange-400" />
            <span>Download Signed Tripartite Agreement (PDF)</span>
          </button>
        </section>
      </div>

      {/* 4. Technical Milestone Roadmap (Up to Current Week) */}
      <section className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-400" />
              <h3 className="font-semibold text-white text-base">
                Technical Milestone Roadmap
              </h3>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Academic deliverables synchronized with production infrastructure cycles through current week.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#252525] px-3.5 py-2 rounded-xl border border-white/5 text-xs">
            <div>
              <span className="text-gray-400 block text-[11px]">Milestones Completed</span>
              <span className="font-bold text-white">3 / 3 Completed to Date</span>
            </div>
            <div className="w-px h-6 bg-white/10"></div>
            <div>
              <span className="text-gray-400 block text-[11px]">Milestone Status</span>
              <span className="font-semibold text-emerald-400">Mid-Term Passed (A)</span>
            </div>
          </div>
        </div>

        {/* Phases Grid (Milestones up to current week only) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Phase 1 */}
          <div className="p-4 rounded-xl bg-[#252525] border border-white/5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-500">Phase 01</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-xs font-bold text-white">Onboarding & Architecture</h4>
              <p className="text-[11px] text-gray-400">
                Weeks 1-2 • Environment bootstrap, Raft consensus walkthrough
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 font-semibold">100% Done</span>
              <span className="text-gray-500">Signed off</span>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="p-4 rounded-xl bg-[#252525] border border-white/5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-500">Phase 02</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-xs font-bold text-white">Design Doc & RFC Review</h4>
              <p className="text-[11px] text-gray-400">
                Weeks 3-4 • RFC-209 Authored & approved by payments team
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 font-semibold">100% Done</span>
              <span className="text-gray-500">PR Approved</span>
            </div>
          </div>

          {/* Phase 3 (Active) */}
          <div className="p-4 rounded-xl bg-[#252525] border-2 border-orange-500 shadow-md flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-orange-400 font-bold">Phase 03 (Current Week 6)</span>
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
              </div>
              <h4 className="text-xs font-bold text-white">Implementation & Testing</h4>
              <p className="text-[11px] text-gray-300">
                Weeks 5-6 • Kafka deduplication idempotency & bench test
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-white/10 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-orange-400 font-bold">70% In Progress</span>
                <span className="text-gray-400">Week 6 of 12</span>
              </div>
              <div className="w-full bg-[#1c1c1c] h-1.5 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: "70%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MODAL: Log Working Hours ================= */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Log Working Hours</h3>
                  <p className="text-xs text-gray-400">Submit shift hours for Marcus Vance sign-off</p>
                </div>
              </div>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsLogModalOpen(false);
                showToast("8.0 working hours recorded and submitted for supervisor sign-off!");
              }}
              className="p-6 space-y-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Work Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Project Ticket</label>
                  <select
                    value={formData.ticket}
                    onChange={(e) => setFormData({ ...formData, ticket: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white"
                  >
                    <option value="ST-402: Idempotent Event Delivery">ST-402: Event Delivery</option>
                    <option value="ST-391: Redis Failover">ST-391: Redis Failover</option>
                    <option value="ST-210: Distributed Benchmark">ST-210: Benchmark Suite</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                <div>
                  <label className="block text-gray-400 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">End Time</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-orange-400 font-medium mb-1">Total</label>
                  <div className="px-2 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300 font-bold font-mono text-center">
                    8.0 hrs
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">Shift Deliverables & Summary</label>
                <textarea
                  rows={3}
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-white"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  Submit Working Hours
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
