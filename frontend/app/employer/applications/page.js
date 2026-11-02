"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  Download,
  Calendar,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Eye,
  FileText,
  Mail,
  GraduationCap,
  X,
  ExternalLink,
  Building,
  Check,
  AlertCircle,
  MoreVertical,
  Kanban,
  Table as TableIcon,
  Star
} from "lucide-react";

export default function EmployerApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [shortlistFilter, setShortlistFilter] = useState("all"); // 'all' | 'shortlisted' | 'not_shortlisted'
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [assignInterviewModalCandidate, setAssignInterviewModalCandidate] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // table | kanban
  const [toastMessage, setToastMessage] = useState(null);

  // Assign Interview Form State
  const [interviewForm, setInterviewForm] = useState({
    round: "Round 1: Technical & Concurrency Screen",
    interviewer: "Marcus Vance (Principal Architect)",
    date: "2025-04-28",
    time: "14:00",
    notes: "Deep dive on distributed queuing, lock contention, and systems architecture."
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3600);
  };

  // Pipeline metrics
  const stageStats = [
    { id: "all", label: "All Applications", count: 1482, color: "text-white" },
    { id: "new", label: "New Intake", count: 342, color: "text-blue-400" },
    { id: "under_review", label: "Under Review", count: 218, color: "text-sky-400" },
    { id: "shortlisted", label: "Shortlisted", count: 184, color: "text-purple-400" },
    { id: "interview", label: "Interview Scheduled", count: 86, color: "text-orange-400" },
    { id: "offered", label: "Offered / Accepted", count: 24, color: "text-emerald-400" }
  ];

  // Candidates roster with isShortlisted state
  const [candidates, setCandidates] = useState([
    {
      id: "APP-84920",
      name: "Alex Chen",
      initials: "AC",
      avatarBg: "bg-indigo-600/20 text-indigo-400 border-indigo-500/30",
      email: "alex.chen@stanford.edu",
      university: "Stanford University",
      degree: "MS Computer Science (Systems)",
      gpa: "3.94 / 4.00",
      appliedRole: "Distributed Systems Engineering Intern",
      reqId: "REQ-8802",
      appliedDate: "Apr 12, 2025",
      matchScore: 96,
      stage: "Offered / Accepted",
      isShortlisted: true,
      resumeName: "Alex_Chen_Stanford_CS_Resume.pdf",
      skills: ["Go", "Kafka", "Postgres", "Distributed Locks", "eBPF"],
      notes: "Scored 96/100 on Rate Limiter takehome. Unanimous hire recommendation by Elena & Marcus."
    },
    {
      id: "APP-84918",
      name: "Nishita Upreti",
      initials: "NU",
      avatarBg: "bg-amber-600/20 text-amber-400 border-amber-500/30",
      email: "nishita.upreti@university.edu",
      university: "Graphic Era University (GEU)",
      degree: "B.Tech Computer Science & Eng",
      gpa: "8.9 / 10.0",
      appliedRole: "Distributed Systems Engineering Intern",
      reqId: "REQ-8802",
      appliedDate: "Apr 14, 2025",
      matchScore: 94,
      stage: "Interview Scheduled",
      isShortlisted: true,
      resumeName: "Nishita_Upreti_Resume_2025.pdf",
      skills: ["Go", "Kafka", "Distributed Systems", "Kubernetes", "Redis"],
      notes: "Exceptional mastery of Kafka partition rebalancing and consensus protocols. Round 2 scheduled."
    },
    {
      id: "APP-84905",
      name: "Maya Chen",
      initials: "MC",
      avatarBg: "bg-emerald-600/20 text-emerald-400 border-emerald-500/30",
      email: "m.chen@mit.edu",
      university: "MIT",
      degree: "PhD AI Lab Candidate",
      gpa: "3.98 / 4.00",
      appliedRole: "AI & Foundation Models Research Fellow",
      reqId: "REQ-8910",
      appliedDate: "Apr 10, 2025",
      matchScore: 98,
      stage: "Shortlisted",
      isShortlisted: true,
      resumeName: "Maya_Chen_MIT_NeurIPS_Resume.pdf",
      skills: ["PyTorch", "RLHF", "CUDA", "LLM Reasoning", "Distributed Training"],
      notes: "Lead author on 2 NeurIPS papers in verifiable reasoning. Invited for research panel interview."
    },
    {
      id: "APP-84880",
      name: "Marcus Vance",
      initials: "MV",
      avatarBg: "bg-purple-600/20 text-purple-400 border-purple-500/30",
      email: "marcus.v@cmu.edu",
      university: "Carnegie Mellon University",
      degree: "B.Des in Human-Computer Interaction",
      gpa: "3.88 / 4.00",
      appliedRole: "Product Design & Design Systems Intern",
      reqId: "REQ-8794",
      appliedDate: "Apr 08, 2025",
      matchScore: 92,
      stage: "Under Review",
      isShortlisted: false,
      resumeName: "Marcus_Vance_Design_Portfolio.pdf",
      skills: ["Figma Pro", "Design Systems", "Prototyping", "Design Tokens"],
      notes: "High aesthetic caliber and strong token architecture documentation."
    },
    {
      id: "APP-84852",
      name: "David Kim",
      initials: "DK",
      avatarBg: "bg-sky-600/20 text-sky-400 border-sky-500/30",
      email: "dkim@berkeley.edu",
      university: "UC Berkeley",
      degree: "BS Electrical Engineering & CS",
      gpa: "3.82 / 4.00",
      appliedRole: "Distributed Systems Engineering Intern",
      reqId: "REQ-8802",
      appliedDate: "Apr 15, 2025",
      matchScore: 89,
      stage: "New Intake",
      isShortlisted: false,
      resumeName: "David_Kim_Berkeley_EECS.pdf",
      skills: ["C++", "Go", "Docker", "Linux Kernel"],
      notes: "Strong OS background. Ready for resume screening review."
    },
    {
      id: "APP-84810",
      name: "Sarah Lindqvist",
      initials: "SL",
      avatarBg: "bg-rose-600/20 text-rose-400 border-rose-500/30",
      email: "slindqvist@uwaterloo.ca",
      university: "University of Waterloo",
      degree: "B.SE Software Engineering Co-op",
      gpa: "3.91 / 4.00",
      appliedRole: "Cloud Infrastructure & SRE Apprentice",
      reqId: "REQ-8650",
      appliedDate: "Apr 11, 2025",
      matchScore: 91,
      stage: "Shortlisted",
      isShortlisted: true,
      resumeName: "Sarah_Lindqvist_Waterloo_Resume.pdf",
      skills: ["Kubernetes", "Terraform", "Go", "Prometheus", "AWS"],
      notes: "Previous co-op at Shopify Infrastructure team. Strong operational acumen."
    }
  ]);

  // Toggle Shortlist action only
  const handleToggleShortlist = (candidateId) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === candidateId) {
          const nextStatus = !c.isShortlisted;
          showToast(
            nextStatus
              ? `★ ${c.name} added to Shortlist!`
              : `${c.name} removed from Shortlist.`
          );
          return {
            ...c,
            isShortlisted: nextStatus,
            stage: nextStatus && c.stage === "New Intake" ? "Shortlisted" : c.stage
          };
        }
        return c;
      })
    );
    if (selectedCandidate && selectedCandidate.id === candidateId) {
      setSelectedCandidate((prev) => ({
        ...prev,
        isShortlisted: !prev.isShortlisted
      }));
    }
  };

  // Assign Interview handler
  const handleConfirmAssignInterview = (e) => {
    e.preventDefault();
    if (!assignInterviewModalCandidate) return;

    setCandidates((prev) =>
      prev.map((c) =>
        c.id === assignInterviewModalCandidate.id
          ? { ...c, stage: "Interview Scheduled" }
          : c
      )
    );

    if (selectedCandidate && selectedCandidate.id === assignInterviewModalCandidate.id) {
      setSelectedCandidate((prev) => ({ ...prev, stage: "Interview Scheduled" }));
    }

    showToast(`Interview successfully assigned for ${assignInterviewModalCandidate.name}! Invitations dispatched.`);
    setAssignInterviewModalCandidate(null);
  };

  // Filter candidates
  const filtered = candidates.filter((item) => {
    // Shortlist primary filter
    if (shortlistFilter === "shortlisted" && !item.isShortlisted) return false;
    if (shortlistFilter === "not_shortlisted" && item.isShortlisted) return false;

    // Stage filter
    if (stageFilter === "new" && item.stage !== "New Intake") return false;
    if (stageFilter === "under_review" && item.stage !== "Under Review") return false;
    if (stageFilter === "shortlisted" && item.stage !== "Shortlisted") return false;
    if (stageFilter === "interview" && item.stage !== "Interview Scheduled") return false;
    if (stageFilter === "offered" && item.stage !== "Offered / Accepted") return false;

    // Role filter
    if (roleFilter !== "all" && item.reqId !== roleFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.university.toLowerCase().includes(q) ||
        item.appliedRole.toLowerCase().includes(q) ||
        item.skills.some((s) => s.toLowerCase().includes(q))
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
            <span className="text-gray-300">Applications</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Application Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Review candidate applications across active requisitions, evaluate qualifications, and progress talent.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="p-1 rounded-xl bg-black/40 border border-white/10 flex items-center gap-1">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "table" ? "bg-orange-500 text-white" : "text-gray-400 hover:text-white"
              }`}
              title="Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "kanban" ? "bg-orange-500 text-white" : "text-gray-400 hover:text-white"
              }`}
              title="Pipeline View"
            >
              <Kanban className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => showToast("Exporting applicant dossier master CSV...")}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs sm:text-sm font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </section>

      {/* Pipeline Stage Summary Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {stageStats.map((st) => (
          <button
            key={st.id}
            onClick={() => setStageFilter(st.id)}
            className={`p-4 rounded-2xl border text-left transition-all ${
              stageFilter === st.id
                ? "bg-[#252525] border-orange-500/50 shadow-md shadow-orange-500/10"
                : "bg-[#1c1c1c] border-white/10 hover:border-white/20"
            }`}
          >
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block truncate">
              {st.label}
            </span>
            <div className={`text-2xl sm:text-3xl font-bold tracking-tight mt-2 font-mono ${st.color}`}>
              {st.count}
            </div>
          </button>
        ))}
      </section>

      {/* Major Filter: Shortlisted or Not (Prominent Recruiter Control) */}
      <section className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Candidate Filter:
            </span>
            <div className="inline-flex p-1 rounded-xl bg-black/50 border border-white/10">
              <button
                onClick={() => setShortlistFilter("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  shortlistFilter === "all"
                    ? "bg-white text-black shadow-sm font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                All ({candidates.length})
              </button>
              <button
                onClick={() => setShortlistFilter("shortlisted")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  shortlistFilter === "shortlisted"
                    ? "bg-amber-500 text-black shadow-sm font-bold"
                    : "text-amber-400 hover:text-amber-300"
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${shortlistFilter === "shortlisted" ? "fill-black" : "fill-amber-400"}`} />
                <span>★ Shortlisted ({candidates.filter((c) => c.isShortlisted).length})</span>
              </button>
              <button
                onClick={() => setShortlistFilter("not_shortlisted")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  shortlistFilter === "not_shortlisted"
                    ? "bg-white/20 text-white shadow-sm font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Not Shortlisted ({candidates.filter((c) => !c.isShortlisted).length})
              </button>
            </div>
          </div>

          <div className="text-xs text-gray-400">
            Showing <strong className="text-white">{filtered.length}</strong> qualified applicant{filtered.length === 1 ? "" : "s"}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center pt-2 border-t border-white/5">
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by candidate name, university, skills (Go, PyTorch), or role..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="md:col-span-5 flex items-center gap-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-300 focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              <option value="all">All Requisitions (24 Roles)</option>
              <option value="REQ-8802">Distributed Systems Eng (#REQ-8802)</option>
              <option value="REQ-8794">Product Design &amp; UX (#REQ-8794)</option>
              <option value="REQ-8910">AI &amp; Foundation Models (#REQ-8910)</option>
              <option value="REQ-8650">Cloud Infrastructure (#REQ-8650)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Content: Table View */}
      {viewMode === "table" ? (
        <section className="rounded-2xl bg-[#1c1c1c] border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-5">Candidate</th>
                  <th className="py-3 px-5">Target Requisition</th>
                  <th className="py-3 px-5 text-center">Match Rate</th>
                  <th className="py-3 px-5 text-center">Shortlist</th>
                  <th className="py-3 px-5">Pipeline Stage</th>
                  <th className="py-3 px-5 text-right pr-6">Primary Actions</th>
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
                          <div
                            onClick={() => setSelectedCandidate(item)}
                            className="font-bold text-white text-xs group-hover:text-orange-400 cursor-pointer transition-colors"
                          >
                            {item.name}
                          </div>
                          <div className="text-[11px] text-gray-400 mt-0.5">
                            {item.university} • GPA: <strong className="text-gray-300">{item.gpa}</strong>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <div className="font-semibold text-white text-xs">{item.appliedRole}</div>
                      <div className="font-mono text-[10px] text-orange-400 mt-0.5">{item.reqId}</div>
                    </td>

                    <td className="py-4 px-5 text-center">
                      <span className="font-bold font-mono text-emerald-400 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        {item.matchScore}%
                      </span>
                    </td>

                    <td className="py-4 px-5 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleShortlist(item.id);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                          item.isShortlisted
                            ? "bg-amber-500/15 text-amber-400 border-amber-500/40 hover:bg-amber-500/25 shadow-sm shadow-amber-500/10"
                            : "bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10"
                        }`}
                        title={item.isShortlisted ? "Click to remove from shortlist" : "Click to shortlist candidate"}
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            item.isShortlisted ? "fill-amber-400 text-amber-400" : "text-gray-400"
                          }`}
                        />
                        <span>{item.isShortlisted ? "Shortlisted" : "Shortlist"}</span>
                      </button>
                    </td>

                    <td className="py-4 px-5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          item.stage === "Offered / Accepted"
                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                            : item.stage === "Interview Scheduled"
                            ? "bg-orange-500/15 text-orange-400 border-orange-500/30"
                            : item.stage === "Shortlisted"
                            ? "bg-purple-500/15 text-purple-400 border-purple-500/30"
                            : item.stage === "Under Review"
                            ? "bg-sky-500/15 text-sky-400 border-sky-500/30"
                            : "bg-gray-500/15 text-gray-300 border-gray-500/30"
                        }`}
                      >
                        {item.stage}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        {/* Assign Interview Action */}
                        <button
                          onClick={() => setAssignInterviewModalCandidate(item)}
                          className="px-3 py-1.5 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-400 text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Assign Interview</span>
                        </button>

                        {/* View Dossier Action */}
                        <button
                          onClick={() => setSelectedCandidate(item)}
                          className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors"
                          title="View Full Candidate Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        /* Kanban Pipeline View */
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { id: "New Intake", title: "New Intake", color: "border-t-blue-500" },
            { id: "Under Review", title: "Under Review", color: "border-t-sky-500" },
            { id: "Shortlisted", title: "Shortlisted", color: "border-t-purple-500" },
            { id: "Interview Scheduled", title: "Interviews", color: "border-t-orange-500" },
            { id: "Offered / Accepted", title: "Offered", color: "border-t-emerald-500" }
          ].map((col) => {
            const inCol = filtered.filter((c) => c.stage === col.id);
            return (
              <div
                key={col.id}
                className={`p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 border-t-4 ${col.color} space-y-3`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <h3 className="text-xs font-bold text-white">{col.title}</h3>
                  <span className="font-mono text-xs text-gray-400">{inCol.length}</span>
                </div>

                <div className="space-y-2.5">
                  {inCol.map((c) => (
                    <div
                      key={c.id}
                      className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-orange-500/40 transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          onClick={() => setSelectedCandidate(c)}
                          className="font-bold text-white text-xs hover:text-orange-400 cursor-pointer"
                        >
                          {c.name}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">
                          {c.matchScore}%
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 truncate">{c.university}</p>
                      <p className="text-[10px] text-orange-400 font-mono truncate">{c.appliedRole}</p>

                      {/* Recruiter-only actions */}
                      <div className="flex items-center gap-1.5 pt-1 border-t border-white/5">
                        <button
                          onClick={() => handleToggleShortlist(c.id)}
                          className={`flex-1 py-1 rounded-lg text-[10px] font-semibold border flex items-center justify-center gap-1 transition-all ${
                            c.isShortlisted
                              ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                              : "bg-white/5 text-gray-400 border-white/10 hover:text-white"
                          }`}
                        >
                          <Star className={`w-3 h-3 ${c.isShortlisted ? "fill-amber-400" : ""}`} />
                          <span>{c.isShortlisted ? "Shortlisted" : "Shortlist"}</span>
                        </button>
                        <button
                          onClick={() => setAssignInterviewModalCandidate(c)}
                          className="flex-1 py-1 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-400 text-[10px] font-semibold transition-colors flex items-center justify-center gap-1"
                        >
                          <Calendar className="w-3 h-3" />
                          <span>Interview</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  {inCol.length === 0 && (
                    <p className="text-[11px] text-gray-500 text-center py-4">No candidates</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= CANDIDATE DOSSIER MODAL DRAWER ================= */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-sm ${selectedCandidate.avatarBg}`}
                >
                  {selectedCandidate.initials}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{selectedCandidate.name}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {selectedCandidate.matchScore}% Match
                    </span>
                    {selectedCandidate.isShortlisted && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>Shortlisted</span>
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {selectedCandidate.degree} • {selectedCandidate.university}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              {/* Target Requisition Box */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-gray-400 block">
                    Target Requisition
                  </span>
                  <div className="font-bold text-white text-sm mt-0.5">
                    {selectedCandidate.appliedRole}
                  </div>
                  <div className="font-mono text-[11px] text-orange-400">{selectedCandidate.reqId}</div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-semibold text-gray-400 block">
                    Cumulative GPA
                  </span>
                  <div className="font-mono text-emerald-400 font-bold text-sm mt-0.5">
                    {selectedCandidate.gpa}
                  </div>
                </div>
              </div>

              {/* Matched Skills */}
              <div>
                <span className="text-gray-400 font-medium block mb-1.5">
                  Verified Skills &amp; Competencies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.skills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-300 border border-orange-500/20 font-mono text-xs"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Evaluator Notes */}
              <div>
                <span className="text-gray-400 font-medium block mb-1.5">
                  Recruiter &amp; Evaluator Notes
                </span>
                <p className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-gray-300 leading-relaxed">
                  {selectedCandidate.notes}
                </p>
              </div>

              {/* Attached Resume */}
              <div>
                <span className="text-gray-400 font-medium block mb-1.5">Submitted Artifacts</span>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-orange-400" />
                    <div>
                      <div className="font-semibold text-white">{selectedCandidate.resumeName}</div>
                      <div className="text-[10px] text-gray-500">PDF • Verified Academic Record</div>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast(`Downloading ${selectedCandidate.resumeName}...`)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer: strictly Shortlist and Assign Interview actions */}
            <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => handleToggleShortlist(selectedCandidate.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                  selectedCandidate.isShortlisted
                    ? "bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30"
                    : "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border-white/10"
                }`}
              >
                <Star className={`w-4 h-4 ${selectedCandidate.isShortlisted ? "fill-amber-400 text-amber-400" : ""}`} />
                <span>{selectedCandidate.isShortlisted ? "★ Shortlisted (Click to Remove)" : "Add to Shortlist"}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const c = selectedCandidate;
                    setSelectedCandidate(null);
                    setAssignInterviewModalCandidate(c);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Assign Interview</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ASSIGN INTERVIEW MODAL ================= */}
      {assignInterviewModalCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/25 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Assign Candidate Interview</h2>
                  <p className="text-xs text-gray-400">
                    Candidate: <span className="text-white font-medium">{assignInterviewModalCandidate.name}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAssignInterviewModalCandidate(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmAssignInterview} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-gray-400 block">Candidate &amp; Role</span>
                <div className="text-white font-bold">{assignInterviewModalCandidate.name}</div>
                <div className="text-orange-400 text-[11px] font-mono">{assignInterviewModalCandidate.appliedRole}</div>
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Interview Assessment Round *</label>
                <select
                  value={interviewForm.round}
                  onChange={(e) => setInterviewForm({ ...interviewForm, round: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="Round 1: Technical & Concurrency Screen">Round 1: Technical &amp; Concurrency Screen</option>
                  <option value="Round 2: Systems Architecture & Scalable Queues">Round 2: Systems Architecture &amp; Scalable Queues</option>
                  <option value="Round 3: Final Executive & Panel Evaluation">Round 3: Final Executive &amp; Panel Evaluation</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Assign Lead Interviewer *</label>
                <select
                  value={interviewForm.interviewer}
                  onChange={(e) => setInterviewForm({ ...interviewForm, interviewer: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="Marcus Vance (Principal Architect)">Marcus Vance (Principal Architect)</option>
                  <option value="Elena Rostova (Staff Platform Eng)">Elena Rostova (Staff Platform Eng)</option>
                  <option value="Dr. Aris Thorne (Research Director)">Dr. Aris Thorne (Research Director)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={interviewForm.date}
                    onChange={(e) => setInterviewForm({ ...interviewForm, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Time (PT) *</label>
                  <input
                    type="time"
                    required
                    value={interviewForm.time}
                    onChange={(e) => setInterviewForm({ ...interviewForm, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Session Scope &amp; Focus Area</label>
                <textarea
                  rows={2}
                  value={interviewForm.notes}
                  onChange={(e) => setInterviewForm({ ...interviewForm, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAssignInterviewModalCandidate(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-lg shadow-orange-500/20 transition-all flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Assign &amp; Dispatch Invites</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
