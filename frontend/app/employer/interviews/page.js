"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Users,
  Award,
  CheckCircle2,
  PlusCircle,
  Download,
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  Sparkles,
  X,
  FileCheck,
  Star,
  UserCheck,
  ArrowRight,
  CalendarCheck2,
  Check,
  Sliders
} from "lucide-react";

export default function EmployerInterviewsPage() {
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'selected' | 'upcoming' | 'pending'
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [rescheduleSession, setRescheduleSession] = useState(null);
  const [selectedScorecard, setSelectedScorecard] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3600);
  };

  // Schedule Interview Form State
  const [newInterview, setNewInterview] = useState({
    candidate: "Nishita Upreti",
    role: "Distributed Systems Engineering Intern",
    round: "Round 2: Systems Architecture & Distributed Queues",
    interviewer: "Marcus Vance (Principal Architect)",
    date: "2025-04-26",
    time: "14:00"
  });

  // Reschedule Form State
  const [rescheduleForm, setRescheduleForm] = useState({
    date: "2025-04-27",
    time: "15:00",
    interviewer: "Marcus Vance (Principal Architect)"
  });

  // Scorecard Form State
  const [scorecardData, setScorecardData] = useState({
    techScore: 5,
    commScore: 5,
    recommendation: "Strong Hire",
    feedback: ""
  });

  // Selected Finalists Roster (Candidates cleared by interview panel and selected for hire)
  const [selectedCandidates, setSelectedCandidates] = useState([
    {
      id: "SEL-8801",
      candidate: "Alex Chen",
      school: "Stanford University • MS CS",
      role: "Distributed Systems Engineering Intern",
      reqId: "REQ-8802",
      score: "5.0 / 5.0 (Exceptional)",
      status: "Selected for Offer",
      evaluator: "Marcus Vance & Elena Rostova",
      roundsCleared: "All 3 Rounds Cleared",
      dateSelected: "Apr 22, 2025",
      summary: "Unanimous committee consensus. Mastered Kafka rebalance protocols and zero-allocation buffer caches."
    },
    {
      id: "SEL-8802",
      candidate: "Maya Chen",
      school: "MIT • PhD AI Lab",
      role: "AI & Foundation Models Research Fellow",
      reqId: "REQ-8910",
      score: "4.9 / 5.0 (Strong Hire)",
      status: "Selected for Offer",
      evaluator: "Dr. Aris Thorne (Research Director)",
      roundsCleared: "All 3 Rounds Cleared",
      dateSelected: "Apr 20, 2025",
      summary: "Verifiable reasoning proof defenses evaluated at top 1% benchmark. Outstanding researcher candidate."
    },
    {
      id: "SEL-8803",
      candidate: "Nishita Upreti",
      school: "Graphic Era University (GEU) • B.Tech CSE",
      role: "Distributed Systems Engineering Intern",
      reqId: "REQ-8802",
      score: "4.8 / 5.0 (Strong Hire)",
      status: "Selected for Offer",
      evaluator: "Elena Rostova (Staff Platform Eng)",
      roundsCleared: "Technical Rounds Cleared",
      dateSelected: "Apr 24, 2025",
      summary: "Flawless pair programming on distributed mutex contention and ring buffer concurrency in Go."
    }
  ]);

  // Interviews Scheduling Roster (Slot Management)
  const [interviews, setInterviews] = useState([
    {
      id: "INT-4091",
      candidate: "Alex Chen",
      school: "Stanford University • MS CS",
      role: "Distributed Systems Engineering Intern",
      round: "Round 2: Systems Architecture & Scalable Queues",
      interviewer: "Marcus Vance (Principal Architect)",
      time: "Apr 25, 2025 • 2:00 PM – 3:00 PM PT",
      status: "Completed",
      score: "5.0 / 5.0 (Exceptional)",
      notes: "Outstanding mastery of Kafka consumer rebalancing and idempotent state management."
    },
    {
      id: "INT-4092",
      candidate: "Nishita Upreti",
      school: "Graphic Era University (GEU) • B.Tech CSE",
      role: "Distributed Systems Engineering Intern",
      round: "Round 1: Live Coding & Distributed Concurrency",
      interviewer: "Elena Rostova (Staff Platform Eng)",
      time: "Apr 26, 2025 • 10:00 AM – 11:00 AM PT",
      status: "Upcoming",
      score: null,
      notes: "Pair programming in Go. Focus on mutex lock contention and ring buffer concurrency."
    },
    {
      id: "INT-4088",
      candidate: "Maya Chen",
      school: "MIT • PhD AI Lab",
      role: "AI & Foundation Models Research Fellow",
      round: "Round 2: LLM Reasoning & Distributed RLHF",
      interviewer: "Dr. Aris Thorne (Research Director)",
      time: "Apr 26, 2025 • 3:30 PM – 4:45 PM PT",
      status: "Upcoming",
      score: null,
      notes: "Deep dive on verifiable chain-of-thought proofs and reinforcement learning scaling laws."
    },
    {
      id: "INT-4075",
      candidate: "Marcus Vance",
      school: "Carnegie Mellon • B.Des HCI",
      role: "Product Design & Design Systems Intern",
      round: "Round 1: Design Systems & Enterprise Token Architecture",
      interviewer: "Rachel Vance (Head of Design)",
      time: "Apr 24, 2025 • 1:00 PM – 2:00 PM PT",
      status: "Feedback Pending",
      score: null,
      notes: "Scorecard awaiting evaluator submission."
    }
  ]);

  // Handle Schedule Submit
  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    const created = {
      id: `INT-${Math.floor(4100 + Math.random() * 80)}`,
      candidate: newInterview.candidate,
      school: "University Candidate",
      role: newInterview.role,
      round: newInterview.round,
      interviewer: newInterview.interviewer,
      time: `${newInterview.date} • ${newInterview.time} PT`,
      status: "Upcoming",
      score: null,
      notes: "Scheduled slot reserved in company interview calendar."
    };

    setInterviews([created, ...interviews]);
    setIsScheduleModalOpen(false);
    showToast(`Interview slot scheduled for ${created.candidate}! Calendar invite dispatched.`);
  };

  // Handle Reschedule Submit
  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (!rescheduleSession) return;

    setInterviews((prev) =>
      prev.map((it) =>
        it.id === rescheduleSession.id
          ? {
              ...it,
              time: `${rescheduleForm.date} • ${rescheduleForm.time} PT`,
              interviewer: rescheduleForm.interviewer || it.interviewer,
              status: "Upcoming"
            }
          : it
      )
    );
    showToast(`Session ${rescheduleSession.id} rescheduled to ${rescheduleForm.date} ${rescheduleForm.time}!`);
    setRescheduleSession(null);
  };

  // Handle Scorecard Submit
  const handleScorecardSubmit = (e) => {
    e.preventDefault();
    if (!selectedScorecard) return;

    const isHire =
      scorecardData.recommendation === "Strong Hire" ||
      scorecardData.recommendation === "Hire";

    setInterviews((prev) =>
      prev.map((it) =>
        it.id === selectedScorecard.id
          ? {
              ...it,
              status: "Completed",
              score: `${scorecardData.techScore}.0 / 5.0 (${scorecardData.recommendation})`,
              notes: scorecardData.feedback || it.notes
            }
          : it
      )
    );

    // If rated Strong Hire / Hire, ensure they appear in selected candidates
    if (isHire && !selectedCandidates.some((c) => c.candidate === selectedScorecard.candidate)) {
      setSelectedCandidates((prev) => [
        {
          id: `SEL-${Math.floor(8810 + Math.random() * 90)}`,
          candidate: selectedScorecard.candidate,
          school: selectedScorecard.school,
          role: selectedScorecard.role,
          reqId: "REQ-8802",
          score: `${scorecardData.techScore}.0 / 5.0 (${scorecardData.recommendation})`,
          status: "Selected for Offer",
          evaluator: selectedScorecard.interviewer,
          roundsCleared: "Evaluator Approved",
          dateSelected: "Today",
          summary: scorecardData.feedback || "Evaluator approved candidate for hire."
        },
        ...prev
      ]);
    }

    setSelectedScorecard(null);
    showToast(
      isHire
        ? `Scorecard submitted! ${selectedScorecard.candidate} has been marked as SELECTED for offer.`
        : `Scorecard recorded for ${selectedScorecard.candidate}.`
    );
  };

  // Filtered interviews list
  const filteredInterviews = interviews.filter((item) => {
    if (activeTab === "upcoming" && item.status !== "Upcoming") return false;
    if (activeTab === "pending" && item.status !== "Feedback Pending") return false;
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
            <span className="text-gray-300">Interviews</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Interview Scheduling &amp; Candidate Selection
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Manage interview slot scheduling, calibrate committee evaluations, and track selected finalists ready for formal offer.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/employer/offers"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold transition-colors"
          >
            <Star className="w-4 h-4 fill-amber-400" />
            <span>View Offers ({selectedCandidates.length} Selected)</span>
          </Link>
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Schedule Interview Slot</span>
          </button>
        </div>
      </section>

      {/* 4 Metric Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Active Scheduled Slots", val: "86", sub: "Across 24 requisitions", color: "text-white" },
          { title: "Upcoming Sessions", val: "42", sub: "Next 7 days scheduled", color: "text-orange-400" },
          { title: "Selected for Hire", val: selectedCandidates.length.toString(), sub: "Cleared rounds • Ready for offer", color: "text-amber-400" },
          { title: "Scorecards Pending", val: "8", sub: "Evaluator action required", color: "text-sky-400" }
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

      {/* ================= SECTION: SELECTED CANDIDATES (READY FOR OFFER) ================= */}
      <section className="p-6 rounded-2xl bg-gradient-to-br from-[#211a12] via-[#1c1c1c] to-[#171717] border border-amber-500/30 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Selected Candidates</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {selectedCandidates.length} Cleared Final Round
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                Candidates evaluated by hiring panel with unanimous recommendation for formal internship offer.
              </p>
            </div>
          </div>

          <Link
            href="/employer/offers"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-md shadow-orange-500/20 transition-all self-start sm:self-center"
          >
            <span>Manage All Offers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Selected Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {selectedCandidates.map((sel) => (
            <div
              key={sel.id}
              className="p-4 rounded-xl bg-black/50 border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between gap-3"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-sm hover:text-amber-400 transition-colors">
                      {sel.candidate}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">{sel.school}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-bold font-mono shrink-0">
                    {sel.score}
                  </span>
                </div>

                <div className="text-[11px] text-orange-300 font-mono font-medium">
                  {sel.role}
                </div>

                <p className="text-[11px] text-gray-300 italic bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                  "{sel.summary}"
                </p>

                <div className="text-[10px] text-gray-400 flex items-center justify-between pt-1">
                  <span>Panel: {sel.evaluator}</span>
                  <span className="text-emerald-400 font-semibold">{sel.roundsCleared}</span>
                </div>
              </div>

              {/* Offer CTA for this selected candidate */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400/80">
                  Ready for Offer
                </span>
                <Link
                  href={`/employer/offers?candidate=${encodeURIComponent(sel.candidate)}`}
                  className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-sm transition-all inline-flex items-center gap-1"
                >
                  <span>Extend Offer</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation Filter Tabs for Interview Sessions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {[
          { id: "all", label: `All Scheduled Slots (${interviews.length})` },
          { id: "upcoming", label: "Upcoming Sessions" },
          { id: "pending", label: "Scorecard Pending" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-orange-500 text-white shadow-sm font-bold"
                : "bg-[#1c1c1c] text-gray-400 hover:text-white border border-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Interview Slots List */}
      <div className="space-y-4">
        {filteredInterviews.map((item) => (
          <article
            key={item.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 group"
          >
            {/* Left Content */}
            <div className="space-y-2 min-w-0 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                  {item.candidate}
                </h3>
                <span className="text-xs text-gray-400">({item.school})</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-orange-400 border border-white/10 font-bold">
                  {item.id}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    item.status === "Completed"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : item.status === "Feedback Pending"
                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                      : "bg-orange-500/15 text-orange-400 border border-orange-500/30"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-orange-300 font-semibold">
                <Award className="w-3.5 h-3.5 text-orange-400" />
                <span>{item.round}</span>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-400 flex-wrap">
                <span className="text-gray-300 font-medium">Role: {item.role}</span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-gray-300">
                  <UserCheck className="w-3.5 h-3.5 text-gray-500" />
                  Lead Interviewer: {item.interviewer}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-white font-mono font-medium">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  Slot: {item.time}
                </span>
              </div>

              <p className="text-xs text-gray-400 italic pt-1">"{item.notes}"</p>

              {item.score && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5" />
                  <span>Scorecard: {item.score}</span>
                </div>
              )}
            </div>

            {/* Right Action Buttons: Scheduling & Slot Management (No Live Video Calls) */}
            <div className="flex items-center gap-2.5 self-start lg:self-center shrink-0">
              {/* Reschedule Slot Action */}
              <button
                onClick={() => {
                  setRescheduleSession(item);
                  setRescheduleForm({
                    date: "2025-04-28",
                    time: "14:00",
                    interviewer: item.interviewer
                  });
                }}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-orange-400" />
                <span>Reschedule Slot</span>
              </button>

              {/* Submit or View Scorecard */}
              <button
                onClick={() => {
                  setSelectedScorecard(item);
                  setScorecardData({
                    techScore: 5,
                    commScore: 5,
                    recommendation: "Strong Hire",
                    feedback: item.notes || ""
                  });
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>{item.score ? "View Scorecard" : "Submit Scorecard"}</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* ================= RESCHEDULE INTERVIEW SLOT MODAL ================= */}
      {rescheduleSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/25 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Reschedule Interview Slot</h2>
                  <p className="text-xs text-gray-400">
                    Candidate: <span className="text-white font-medium">{rescheduleSession.candidate}</span> ({rescheduleSession.id})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setRescheduleSession(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRescheduleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-gray-400 block">Current Assignment</span>
                <div className="text-white font-semibold">{rescheduleSession.round}</div>
                <div className="text-orange-400 text-[11px] font-mono">Current Slot: {rescheduleSession.time}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">New Date *</label>
                  <input
                    type="date"
                    required
                    value={rescheduleForm.date}
                    onChange={(e) => setRescheduleForm({ ...rescheduleForm, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-1">New Time Slot (PT) *</label>
                  <input
                    type="time"
                    required
                    value={rescheduleForm.time}
                    onChange={(e) => setRescheduleForm({ ...rescheduleForm, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Lead Interviewer / Panelist</label>
                <select
                  value={rescheduleForm.interviewer}
                  onChange={(e) => setRescheduleForm({ ...rescheduleForm, interviewer: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="Marcus Vance (Principal Architect)">Marcus Vance (Principal Architect)</option>
                  <option value="Elena Rostova (Staff Platform Eng)">Elena Rostova (Staff Platform Eng)</option>
                  <option value="Dr. Aris Thorne (Research Director)">Dr. Aris Thorne (Research Director)</option>
                  <option value="Rachel Vance (Head of Design)">Rachel Vance (Head of Design)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setRescheduleSession(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-lg shadow-orange-500/20 transition-all flex items-center gap-1.5"
                >
                  <CalendarCheck2 className="w-3.5 h-3.5" />
                  <span>Update &amp; Dispatch Slot</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= SCHEDULE INTERVIEW MODAL ================= */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/25 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Schedule Candidate Interview Slot</h2>
                  <p className="text-xs text-gray-400">Enterprise calendar slot management and panel coordination</p>
                </div>
              </div>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 font-medium mb-1">Candidate Name *</label>
                <input
                  type="text"
                  required
                  value={newInterview.candidate}
                  onChange={(e) => setNewInterview({ ...newInterview, candidate: e.target.value })}
                  placeholder="e.g. Nishita Upreti"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Target Requisition</label>
                <select
                  value={newInterview.role}
                  onChange={(e) => setNewInterview({ ...newInterview, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="Distributed Systems Engineering Intern">Distributed Systems Engineering Intern</option>
                  <option value="Product Design & Design Systems Intern">Product Design &amp; Design Systems Intern</option>
                  <option value="AI & Foundation Models Research Fellow">AI &amp; Foundation Models Research Fellow</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Interview Round Type</label>
                <input
                  type="text"
                  value={newInterview.round}
                  onChange={(e) => setNewInterview({ ...newInterview, round: e.target.value })}
                  placeholder="e.g. Round 2: Systems Architecture & Distributed Queues"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Lead Interviewer / Panelist</label>
                <input
                  type="text"
                  value={newInterview.interviewer}
                  onChange={(e) => setNewInterview({ ...newInterview, interviewer: e.target.value })}
                  placeholder="e.g. Marcus Vance (Principal Architect)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Interview Date</label>
                  <input
                    type="date"
                    value={newInterview.date}
                    onChange={(e) => setNewInterview({ ...newInterview, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Start Time (PT)</label>
                  <input
                    type="time"
                    value={newInterview.time}
                    onChange={(e) => setNewInterview({ ...newInterview, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/20 transition-all"
                >
                  Confirm &amp; Reserve Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= SUBMIT SCORECARD MODAL ================= */}
      {selectedScorecard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div>
                <h3 className="text-base font-bold text-white">
                  Evaluator Scorecard: {selectedScorecard.candidate}
                </h3>
                <p className="text-xs text-gray-400">{selectedScorecard.round}</p>
              </div>
              <button
                onClick={() => setSelectedScorecard(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScorecardSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">
                    Technical Architecture (1-5)
                  </label>
                  <select
                    value={scorecardData.techScore}
                    onChange={(e) => setScorecardData({ ...scorecardData, techScore: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value={5}>5 - Exceptional Mastery</option>
                    <option value={4}>4 - Strong Hire</option>
                    <option value={3}>3 - Meets Bar</option>
                    <option value={2}>2 - Marginal</option>
                    <option value={1}>1 - Below Bar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 font-medium mb-1">Hiring Recommendation</label>
                  <select
                    value={scorecardData.recommendation}
                    onChange={(e) => setScorecardData({ ...scorecardData, recommendation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="Strong Hire">Strong Hire (Unanimous)</option>
                    <option value="Hire">Hire</option>
                    <option value="Lean Hire">Lean Hire</option>
                    <option value="No Hire">No Hire</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">
                  Official Committee Remarks &amp; Feedback *
                </label>
                <textarea
                  rows={4}
                  required
                  value={scorecardData.feedback}
                  onChange={(e) => setScorecardData({ ...scorecardData, feedback: e.target.value })}
                  placeholder="Summarize candidate technical competencies, code clarity, and teamwork signals..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedScorecard(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/20 transition-all"
                >
                  Submit Official Scorecard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
