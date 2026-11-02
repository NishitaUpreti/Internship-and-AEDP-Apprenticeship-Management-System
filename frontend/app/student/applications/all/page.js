"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  Calendar,
  DollarSign,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Eye,
  Send,
  Star,
  CalendarClock,
  XCircle,
  RotateCcw,
  ExternalLink,
  Briefcase,
  Filter,
  Check,
  X,
  FileText
} from "lucide-react";

const ALL_APPLICATIONS = [
  {
    id: 1,
    company: "Stripe",
    role: "Backend Engineering Fellow - Core Infrastructure",
    logoText: "S",
    logoBg: "bg-indigo-600/20 text-indigo-400 border-indigo-500/40",
    status: "Interview Scheduled",
    stage: "Technical Round 2 with Staff Eng",
    compensation: "$10,400 / month",
    location: "San Francisco, CA (Hybrid)",
    tags: ["Distributed Systems", "Ruby", "Kafka", "Postgres"],
    appliedDate: "Apr 12, 2025",
    updatedAgo: "2 hours ago",
    activeCategory: "interviews",
    highlight: "border-l-4 border-l-orange-500"
  },
  {
    id: 2,
    company: "Datadog",
    role: "Systems Observability Research Intern",
    logoText: "DD",
    logoBg: "bg-purple-950/60 text-purple-300 border-purple-800/40",
    status: "Under Review",
    stage: "Application & Portfolio Screening",
    compensation: "$9,200 / month",
    location: "New York, NY (In-Person)",
    tags: ["eBPF", "Linux Kernel", "Go", "Distributed Tracing"],
    appliedDate: "Apr 18, 2025",
    updatedAgo: "Yesterday",
    activeCategory: "active",
    highlight: "border-l-4 border-l-sky-500"
  },
  {
    id: 3,
    company: "Cohere",
    role: "NLP & Foundation Models Research Fellow",
    logoText: "CO",
    logoBg: "bg-emerald-950/60 text-emerald-400 border-emerald-800/40",
    status: "Shortlisted",
    stage: "Hiring Manager Review",
    compensation: "$11,000 / month",
    location: "Toronto, ON (Remote Option)",
    tags: ["LLM Alignment", "PyTorch", "RLHF", "Transformers"],
    appliedDate: "Mar 20, 2025",
    updatedAgo: "Apr 15, 2025",
    activeCategory: "active",
    highlight: "border-l-4 border-l-purple-500"
  },
  {
    id: 4,
    company: "Anthropic",
    role: "AI Safety & Constitutional Alignment Resident",
    logoText: "AN",
    logoBg: "bg-amber-950/60 text-amber-400 border-amber-800/40",
    status: "Interview Scheduled",
    stage: "Interpretability Pair Coding",
    compensation: "$12,500 / month",
    location: "San Francisco, CA (In-Person)",
    tags: ["Interpretability", "Python", "RLHF", "Safety Research"],
    appliedDate: "Apr 02, 2025",
    updatedAgo: "Apr 14, 2025",
    activeCategory: "interviews",
    highlight: "border-l-4 border-l-orange-500"
  },
  {
    id: 5,
    company: "Figma",
    role: "WebGL Rendering Systems Co-op",
    logoText: "FG",
    logoBg: "bg-rose-950/60 text-rose-300 border-rose-800/40",
    status: "Selected",
    stage: "Official Offer Letter Issued",
    compensation: "$10,000 / month",
    location: "San Francisco, CA (Hybrid)",
    tags: ["C++ / Rust", "WebAssembly", "Graphics", "WebGL"],
    appliedDate: "Mar 15, 2025",
    updatedAgo: "Apr 12, 2025",
    activeCategory: "offers",
    highlight: "border-l-4 border-l-emerald-500"
  },
  {
    id: 6,
    company: "Scale AI",
    role: "Autonomous Vehicle Dataset Platform Fellow",
    logoText: "SC",
    logoBg: "bg-blue-950/60 text-blue-300 border-blue-800/40",
    status: "Under Review",
    stage: "Data Infrastructure Team Screening",
    compensation: "$9,800 / month",
    location: "San Francisco, CA (In-Person)",
    tags: ["3D Point Clouds", "Python", "Data Pipelines", "LiDAR"],
    appliedDate: "Apr 14, 2025",
    updatedAgo: "Apr 16, 2025",
    activeCategory: "active",
    highlight: "border-l-4 border-l-sky-500"
  },
  {
    id: 7,
    company: "Notion",
    role: "Fullstack Product Engineering Intern - Notion AI",
    logoText: "NO",
    logoBg: "bg-gray-800 text-gray-200 border-gray-700",
    status: "Shortlisted",
    stage: "Take-home Exercise Evaluation",
    compensation: "$9,600 / month",
    location: "San Francisco, CA (Hybrid)",
    tags: ["TypeScript", "React", "Semantic Search", "Postgres"],
    appliedDate: "Apr 10, 2025",
    updatedAgo: "Apr 14, 2025",
    activeCategory: "active",
    highlight: "border-l-4 border-l-purple-500"
  },
  {
    id: 8,
    company: "OpenAI",
    role: "Research Residency - Superalignment & Scalable Oversight",
    logoText: "OA",
    logoBg: "bg-teal-950/60 text-teal-300 border-teal-800/40",
    status: "Applied",
    stage: "Resume & Academic Paper Screening",
    compensation: "$13,000 / month",
    location: "San Francisco, CA (In-Person)",
    tags: ["Residency", "Empirical Alignment", "Python", "Distributed Training"],
    appliedDate: "Apr 05, 2025",
    updatedAgo: "Apr 06, 2025",
    activeCategory: "active",
    highlight: "border-l-4 border-l-white/20"
  },
  {
    id: 9,
    company: "Linear",
    role: "Sync Engine & Local-First Systems Engineering Co-op",
    logoText: "LN",
    logoBg: "bg-indigo-950/60 text-indigo-300 border-indigo-800/40",
    status: "Rejected",
    stage: "Candidate Position Filled",
    compensation: "$8,800 / month",
    location: "Remote (Worldwide)",
    tags: ["CRDTs", "IndexedDB", "Rust / Wasm", "Electron"],
    appliedDate: "Apr 01, 2025",
    updatedAgo: "Apr 08, 2025",
    activeCategory: "archived",
    highlight: "border-l-4 border-l-rose-500/40"
  },
  {
    id: 10,
    company: "Vercel",
    role: "Edge Runtime Infrastructure Fellow",
    logoText: "VC",
    logoBg: "bg-white/10 text-white border-white/20",
    status: "Withdrawn",
    stage: "Withdrawn by Candidate (Coursework conflict)",
    compensation: "$9,500 / month",
    location: "Remote (US / Canada)",
    tags: ["V8 Isolates", "Next.js Turbopack", "Rust", "Edge Workers"],
    appliedDate: "Mar 28, 2025",
    updatedAgo: "Apr 03, 2025",
    activeCategory: "archived",
    highlight: "border-l-4 border-l-gray-600"
  }
];

export default function AllApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedApp, setSelectedApp] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filtered = useMemo(() => {
    return ALL_APPLICATIONS.filter((item) => {
      if (activeCategory === "active" && !["Applied", "Under Review", "Shortlisted"].includes(item.status)) return false;
      if (activeCategory === "interviews" && item.status !== "Interview Scheduled") return false;
      if (activeCategory === "offers" && item.status !== "Selected") return false;
      if (activeCategory === "archived" && !["Rejected", "Withdrawn"].includes(item.status)) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQ =
          item.company.toLowerCase().includes(q) ||
          item.role.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesQ) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "company") return a.company.localeCompare(b.company);
      if (sortBy === "compensation") return parseInt(b.compensation.replace(/\D/g, "")) - parseInt(a.compensation.replace(/\D/g, ""));
      return a.id - b.id;
    });
  }, [searchQuery, activeCategory, sortBy]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-orange-600 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb & Back Link */}
      <section className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/student" className="hover:text-orange-400 transition-colors">
            Student
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <Link href="/student/applications" className="hover:text-orange-400 transition-colors">
            Applications
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-orange-400 font-medium">All Applications</span>
        </div>

        <Link
          href="/student/applications"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Applications Tracker
        </Link>
      </section>

      {/* Page Header */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              My Applications
            </h1>
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold">
              18 Active Applications
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Complete archive of technical internships, fellowships, and research residency applications submitted across all cohorts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast("Exporting all applications to CSV with timestamp proofs...")}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition-colors font-medium"
          >
            Export Applications CSV
          </button>
        </div>
      </section>

      {/* Simple Search & Filter Bar (Matching Stitch Desktop) */}
      <section className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Simple Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role, company, or tech stack (e.g. Kafka, eBPF)..."
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

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none text-xs">
          {[
            { id: "all", label: "All", count: ALL_APPLICATIONS.length },
            { id: "active", label: "Active", count: ALL_APPLICATIONS.filter((a) => ["Applied", "Under Review", "Shortlisted"].includes(a.status)).length },
            { id: "interviews", label: "Interviews", count: ALL_APPLICATIONS.filter((a) => a.status === "Interview Scheduled").length },
            { id: "offers", label: "Offered", count: ALL_APPLICATIONS.filter((a) => a.status === "Selected").length },
            { id: "archived", label: "Archived", count: ALL_APPLICATIONS.filter((a) => ["Rejected", "Withdrawn"].includes(a.status)).length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeCategory === tab.id
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-black/40 text-gray-400 hover:text-white border border-white/5"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-300 focus:outline-none focus:border-orange-500 cursor-pointer"
          >
            <option value="newest">Last Activity (Newest)</option>
            <option value="compensation">Compensation (Highest)</option>
            <option value="company">Company Name A-Z</option>
          </select>
        </div>
      </section>

      {/* Applications List Feed */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <article
            key={item.id}
            className={`p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 group ${item.highlight}`}
          >
            {/* Left Content */}
            <div className="flex items-start gap-4 min-w-0">
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-sm shrink-0 ${item.logoBg}`}
              >
                {item.logoText}
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                    {item.role}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.status === "Interview Scheduled"
                        ? "bg-orange-500/15 text-orange-400 border border-orange-500/30"
                        : item.status === "Selected"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : item.status === "Under Review"
                        ? "bg-sky-500/15 text-sky-400 border border-sky-500/30"
                        : item.status === "Shortlisted"
                        ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                        : item.status === "Rejected"
                        ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                        : "bg-gray-500/15 text-gray-300 border border-gray-500/30"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                  <span className="font-semibold text-gray-300">{item.company}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    {item.location}
                  </span>
                  <span>•</span>
                  <span className="font-mono text-emerald-400 font-semibold">{item.compensation}</span>
                </div>

                {/* Tech Chips */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1.5">
                  {item.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-gray-400 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                  <span className="text-[10px] text-gray-500 ml-2">
                    Applied on {item.appliedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Actions: Only Apply or View Details */}
            <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
              {item.status === "Draft" ? (
                <button
                  onClick={() => showToast(`Starting application submission for ${item.company}...`)}
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-md shadow-orange-500/20 transition-all"
                >
                  Apply
                </button>
              ) : (
                <Link
                  href={`/student/applications/details?id=${item.id}`}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-orange-500 hover:text-white text-gray-300 text-xs font-semibold border border-white/10 hover:border-orange-500/40 transition-all flex items-center gap-1.5 group/btn"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all" />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Pagination Footer */}
      <footer className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <div>
          Showing <strong className="text-white">1 - {filtered.length}</strong> of{" "}
          <strong className="text-white">18</strong> total recorded applications
        </div>

        <div className="flex items-center gap-1.5">
          <button className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-gray-400 hover:text-white disabled:opacity-50">
            Previous
          </button>
          <button className="px-2.5 py-1 rounded-lg bg-orange-500 text-white font-bold">1</button>
          <button className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-gray-400 hover:text-white">
            2
          </button>
          <button className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-gray-400 hover:text-white">
            Next
          </button>
        </div>
      </footer>

      {/* ================= MODAL: Application Dossier ================= */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-xs font-mono text-orange-400 font-bold uppercase">Application Record</span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedApp.role}</h3>
                <span className="text-xs text-gray-400">{selectedApp.company} • {selectedApp.location}</span>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-gray-400">Current Status:</span>
                <div className="text-white font-bold mt-1">{selectedApp.status}</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-gray-400">Compensation:</span>
                <div className="text-emerald-400 font-bold font-mono mt-1">{selectedApp.compensation}</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 col-span-2">
                <span className="text-gray-400">Current Active Stage:</span>
                <div className="text-orange-400 font-medium mt-1">{selectedApp.stage}</div>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-gray-300">Technical Skill Keywords</span>
              <div className="flex items-center gap-1.5 flex-wrap mt-2">
                {selectedApp.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-black/50 text-gray-300 border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
