"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileCheck,
  CheckCircle2,
  Clock,
  Award,
  Search,
  Filter,
  Download,
  PlusCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  X,
  Star,
  UserCheck,
  GraduationCap,
  Building,
  AlertTriangle,
  Check
} from "lucide-react";

export default function EmployerEvaluationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3600);
  };

  // Evaluations Roster State
  const [evaluations, setEvaluations] = useState([
    {
      id: "EVAL-501",
      internName: "Alex Chen",
      initials: "AC",
      avatarBg: "bg-indigo-600/20 text-indigo-400 border-indigo-500/30",
      school: "Stanford University • MS Computer Science",
      role: "Distributed Systems Engineering Intern",
      reqId: "REQ-8802",
      supervisor: "Marcus Vance (Principal Architect)",
      period: "Week 6: Mid-Term Evaluation",
      score: "4.9 / 5.0 (A+ Outstanding)",
      status: "Certified & Signed",
      deanStatus: "Stanford EECS Chair Certified",
      rubric: {
        architecture: 5,
        velocity: 5,
        communication: 5,
        autonomy: 4.8
      },
      remarks:
        "Alex demonstrated exceptional system engineering maturity. Designed a resilient distributed rate limiter with zero lock contention in production Go services.",
      creditsApproved: "6 Credits Recommended"
    },
    {
      id: "EVAL-502",
      internName: "Nishita Upreti",
      initials: "NU",
      avatarBg: "bg-amber-600/20 text-amber-400 border-amber-500/30",
      school: "Graphic Era University (GEU) • B.Tech CSE",
      role: "Distributed Systems Engineering Intern",
      reqId: "REQ-8802",
      supervisor: "Elena Rostova (Staff Platform Eng)",
      period: "Week 6: Mid-Term Evaluation",
      score: "4.8 / 5.0 (A+ Outstanding)",
      status: "Certified & Signed",
      deanStatus: "GEU Dean Academic Sign-off Complete",
      rubric: {
        architecture: 4.9,
        velocity: 4.8,
        communication: 4.9,
        autonomy: 4.7
      },
      remarks:
        "Nishita resolved Kafka consumer rebalance lag by 42% through partition offset optimizations. Consistently proactive in standups and code reviews.",
      creditsApproved: "6 Credits Recommended"
    },
    {
      id: "EVAL-503",
      internName: "Maya Chen",
      initials: "MC",
      avatarBg: "bg-emerald-600/20 text-emerald-400 border-emerald-500/30",
      school: "MIT • PhD AI Lab",
      role: "AI & Foundation Models Research Fellow",
      reqId: "REQ-8910",
      supervisor: "Dr. Aris Thorne (Research Director)",
      period: "Week 12: Final Exit Assessment",
      score: "5.0 / 5.0 (A+ Exceptional)",
      status: "Certified & Signed",
      deanStatus: "MIT Graduate Division Approved",
      rubric: {
        architecture: 5,
        velocity: 5,
        communication: 5,
        autonomy: 5
      },
      remarks:
        "Authored a landmark technical report on verifiable chain-of-thought distillation. Co-authoring upcoming research publication with senior team.",
      creditsApproved: "8 Doctoral Credits Awarded"
    },
    {
      id: "EVAL-504",
      internName: "Marcus Vance",
      initials: "MV",
      avatarBg: "bg-purple-600/20 text-purple-400 border-purple-500/30",
      school: "Carnegie Mellon • B.Des HCI",
      role: "Product Design & Design Systems Intern",
      reqId: "REQ-8794",
      supervisor: "Rachel Vance (Head of Design)",
      period: "Week 6: Mid-Term Evaluation",
      score: "Pending Supervisor Submission",
      status: "Action Required",
      deanStatus: "Awaiting Host Appraisal",
      rubric: {
        architecture: null,
        velocity: null,
        communication: null,
        autonomy: null
      },
      remarks: "Evaluation rubric open for supervisor review. Due by Friday, 5:00 PM PT.",
      creditsApproved: "Pending Mid-Term Quorum"
    },
    {
      id: "EVAL-505",
      internName: "Sarah Lindqvist",
      initials: "SL",
      avatarBg: "bg-rose-600/20 text-rose-400 border-rose-500/30",
      school: "University of Waterloo • B.SE Co-op",
      role: "Cloud Infrastructure & SRE Apprentice",
      reqId: "REQ-8650",
      supervisor: "Marcus Vance (Principal Architect)",
      period: "Week 6: Mid-Term Evaluation",
      score: "4.7 / 5.0 (A Excellent)",
      status: "Under University Review",
      deanStatus: "Waterloo Co-op Director Reviewing",
      rubric: {
        architecture: 4.8,
        velocity: 4.6,
        communication: 4.7,
        autonomy: 4.8
      },
      remarks:
        "Maintained 99.99% staging cluster uptime. Built automated Terraform drift detection hooks with Slack alerts.",
      creditsApproved: "Co-op Credit Clearance in Progress"
    }
  ]);

  // Handle Submit / Certify Evaluation
  const handleCertifyEvaluation = (evalId) => {
    setEvaluations((prev) =>
      prev.map((e) =>
        e.id === evalId
          ? {
              ...e,
              status: "Certified & Signed",
              score: "4.8 / 5.0 (A+ Outstanding)",
              deanStatus: "Certified by Host Organization",
              rubric: {
                architecture: 4.8,
                velocity: 4.9,
                communication: 4.7,
                autonomy: 4.8
              },
              remarks: "Supervisor evaluation finalized and certified for university credit quorum."
            }
          : e
      )
    );
    setSelectedEvaluation(null);
    showToast("Evaluation rubric certified and dispatched to University Dean Portal!");
  };

  const filtered = evaluations.filter((item) => {
    if (activeTab === "midterm" && !item.period.includes("Mid-Term")) return false;
    if (activeTab === "final" && !item.period.includes("Final")) return false;
    if (activeTab === "action" && item.status !== "Action Required") return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.internName.toLowerCase().includes(q) ||
        item.school.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        item.supervisor.toLowerCase().includes(q)
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
            <span className="text-gray-300">Evaluations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Internship Performance Evaluations
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Conduct standardized mid-term and final performance reviews, calibrate supervisor rubrics, and certify university academic credit.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast("Exporting official evaluation transcripts CSV...")}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs sm:text-sm font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Transcripts</span>
          </button>
          <button
            onClick={() => showToast("Opening university rubric submission portal...")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ New Evaluation</span>
          </button>
        </div>
      </section>

      {/* 4 Metric Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Total Evaluations", val: "18", sub: "Across 4 active host tracks", color: "text-white" },
          { title: "Mid-Term Evaluations", val: "12", sub: "10 certified • 2 in review", color: "text-sky-400" },
          { title: "Final Exit Reviews", val: "4", sub: "Capstones & credit sign-offs", color: "text-emerald-400" },
          { title: "Academic Compliance", val: "100%", sub: "Tripartite accredited quorum", color: "text-amber-400" }
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

      {/* Filter and Search Bar */}
      <section className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          {[
            { id: "all", label: "All Evaluations (18)" },
            { id: "midterm", label: "Mid-Term (Week 6)" },
            { id: "final", label: "Final Assessment (Week 12)" },
            { id: "action", label: "Action Required (1)" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
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
            placeholder="Search intern or supervisor..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
          />
        </div>
      </section>

      {/* Evaluations Table */}
      <section className="rounded-2xl bg-[#1c1c1c] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-5">Intern Candidate</th>
                <th className="py-3 px-5">Host Supervisor</th>
                <th className="py-3 px-5">Milestone Period</th>
                <th className="py-3 px-5 text-center">Score / Grade</th>
                <th className="py-3 px-5">University Dean Quorum</th>
                <th className="py-3 px-5 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-xs shrink-0 ${item.avatarBg}`}
                      >
                        {item.initials}
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs group-hover:text-orange-400 transition-colors">
                          {item.internName}
                        </div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{item.school}</div>
                        <div className="font-mono text-[10px] text-orange-400">{item.role}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="font-semibold text-white text-xs">{item.supervisor}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Assigned Industry Host</div>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-semibold text-gray-200">{item.period}</span>
                    <div className="text-[10px] text-gray-500 mt-0.5">{item.creditsApproved}</div>
                  </td>

                  <td className="py-4 px-5 text-center">
                    <span
                      className={`font-mono text-xs font-bold px-2.5 py-1 rounded-full border ${
                        item.score.includes("Outstanding") || item.score.includes("Exceptional")
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          : item.score.includes("Pending")
                          ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                          : "bg-sky-500/15 text-sky-400 border-sky-500/30"
                      }`}
                    >
                      {item.score}
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 text-xs text-gray-300">
                      {item.status === "Certified & Signed" ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      )}
                      <span>{item.deanStatus}</span>
                    </div>
                  </td>

                  <td className="py-4 px-5 text-right pr-6">
                    <button
                      onClick={() => setSelectedEvaluation(item)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        item.status === "Action Required"
                          ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-500/20"
                          : "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border-white/10"
                      }`}
                    >
                      {item.status === "Action Required" ? "Submit Rubric" : "View Rubric"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= EVALUATION RUBRIC MODAL ================= */}
      {selectedEvaluation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center font-bold text-sm ${selectedEvaluation.avatarBg}`}
                >
                  {selectedEvaluation.initials}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{selectedEvaluation.internName}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {selectedEvaluation.score}
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    {selectedEvaluation.period} • Supervisor: {selectedEvaluation.supervisor}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedEvaluation(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              {/* Institution Quorum Card */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-gray-400 block">
                    Academic Accreditation
                  </span>
                  <div className="font-bold text-white text-sm mt-0.5">{selectedEvaluation.school}</div>
                  <div className="text-emerald-400 font-mono text-[11px] mt-0.5">
                    {selectedEvaluation.creditsApproved}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-semibold text-gray-400 block">
                    Dean Sign-Off Status
                  </span>
                  <div className="text-white font-medium text-xs mt-0.5">
                    {selectedEvaluation.deanStatus}
                  </div>
                </div>
              </div>

              {/* Rubric Competency Breakdown */}
              <div>
                <span className="text-gray-400 font-semibold block mb-2">
                  Standardized Assessment Criteria
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Systems Architecture & Technical Acumen", val: selectedEvaluation.rubric.architecture || "4.8" },
                    { label: "Execution Velocity & Production Code Quality", val: selectedEvaluation.rubric.velocity || "4.9" },
                    { label: "Team Collaboration & Standup Communication", val: selectedEvaluation.rubric.communication || "4.7" },
                    { label: "Autonomy, Problem Formulation & SRE Ownership", val: selectedEvaluation.rubric.autonomy || "4.8" }
                  ].map((crit, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                      <span className="text-[11px] text-gray-400 block">{crit.label}</span>
                      <div className="font-mono text-sm font-bold text-amber-400 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{crit.val} / 5.0</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Qualitative Remarks */}
              <div>
                <span className="text-gray-400 font-semibold block mb-1.5">Supervisor Official Remarks</span>
                <p className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-gray-300 leading-relaxed italic">
                  "{selectedEvaluation.remarks}"
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => {
                  showToast(`Generating certified PDF for ${selectedEvaluation.internName}...`);
                }}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Certified PDF</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedEvaluation(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 text-xs font-semibold transition-colors"
                >
                  Close
                </button>
                {selectedEvaluation.status === "Action Required" ? (
                  <button
                    onClick={() => handleCertifyEvaluation(selectedEvaluation.id)}
                    className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Certify &amp; Sign Evaluation</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      showToast("Evaluation re-sync with university portal triggered.");
                      setSelectedEvaluation(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all"
                  >
                    Sign-Off Certified
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}