"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  PlusCircle,
  Search,
  Filter,
  Download,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  ChevronRight,
  MoreVertical,
  X,
  FileText,
  DollarSign,
  GraduationCap,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function EmployerOpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // New Requisition Form State
  const [newRequisition, setNewRequisition] = useState({
    title: "",
    dept: "Engineering",
    term: "Summer 2025",
    location: "San Francisco, CA (Hybrid)",
    stipend: "$10,400 / month",
    openings: 2,
    deadline: "2025-04-15",
    minGpa: "3.5",
    skills: "Go, Kubernetes, Distributed Systems",
    description: ""
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3600);
  };

  // Requisitions list
  const [opportunities, setOpportunities] = useState([
    {
      id: "REQ-8802",
      title: "Distributed Systems Engineering Intern",
      dept: "Core Infrastructure",
      term: "Summer 2025 • 12 Weeks",
      location: "San Francisco, CA (Hybrid)",
      compensation: "$10,400 / mo + Housing",
      status: "Active",
      openings: 3,
      deadline: "May 01, 2025",
      applicants: 628,
      inReview: 214,
      shortlisted: 32,
      interviewing: 14,
      offered: 3,
      tags: ["Go", "Kafka", "PostgreSQL", "Distributed Locks"]
    },
    {
      id: "REQ-8794",
      title: "Product Design & Design Systems Intern",
      dept: "Product Design & UX",
      term: "Summer 2025 • 12 Weeks",
      location: "San Francisco, CA (Hybrid)",
      compensation: "$9,200 / mo + Housing",
      status: "Closing Soon",
      openings: 1,
      deadline: "Apr 20, 2025",
      applicants: 342,
      inReview: 85,
      shortlisted: 18,
      interviewing: 8,
      offered: 1,
      tags: ["Figma Pro", "Design Systems", "Web Accessibility", "Prototyping"]
    },
    {
      id: "REQ-8910",
      title: "AI & Foundation Models Research Fellow",
      dept: "Reasoning & LLM Labs",
      term: "Fall 2025 Co-op • 16 Weeks",
      location: "Seattle, WA (In-Person)",
      compensation: "$12,000 / mo + Relocation",
      status: "Active",
      openings: 2,
      deadline: "Jun 15, 2025",
      applicants: 412,
      inReview: 140,
      shortlisted: 28,
      interviewing: 19,
      offered: 2,
      tags: ["PyTorch", "RLHF", "CUDA", "Transformers"]
    },
    {
      id: "REQ-8650",
      title: "Cloud Infrastructure & SRE Apprentice",
      dept: "Reliability Engineering",
      term: "Summer 2025 • 12 Weeks",
      location: "Remote (US Timezones)",
      compensation: "$8,800 / mo",
      status: "Pending QA",
      openings: 2,
      deadline: "May 10, 2025",
      applicants: 185,
      inReview: 62,
      shortlisted: 12,
      interviewing: 4,
      offered: 0,
      tags: ["Terraform", "Kubernetes", "AWS", "Observability"]
    },
    {
      id: "REQ-8541",
      title: "Developer Relations & Technical Writing Intern",
      dept: "Developer Experience",
      term: "Summer 2025 • 10 Weeks",
      location: "New York, NY (Hybrid)",
      compensation: "$8,000 / mo",
      status: "Draft",
      openings: 1,
      deadline: "May 20, 2025",
      applicants: 0,
      inReview: 0,
      shortlisted: 0,
      interviewing: 0,
      offered: 0,
      tags: ["Technical Docs", "API SDKs", "Next.js", "Open Source"]
    },
    {
      id: "REQ-8219",
      title: "Security Operations & Vulnerability Co-op",
      dept: "Cybersecurity & Governance",
      term: "Spring 2025 Cohort",
      location: "San Francisco, CA",
      compensation: "$9,500 / mo",
      status: "Closed / Filled",
      openings: 2,
      deadline: "Dec 15, 2024",
      applicants: 540,
      inReview: 0,
      shortlisted: 0,
      interviewing: 0,
      offered: 2,
      tags: ["Penetration Testing", "SOC-2", "eBPF", "Threat Modeling"]
    }
  ]);

  // Handle Create Requisition Submit
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const created = {
      id: `REQ-${Math.floor(8920 + Math.random() * 80)}`,
      title: newRequisition.title,
      dept: newRequisition.dept,
      term: newRequisition.term,
      location: newRequisition.location,
      compensation: newRequisition.stipend,
      status: "Active",
      openings: Number(newRequisition.openings) || 1,
      deadline: newRequisition.deadline,
      applicants: 0,
      inReview: 0,
      shortlisted: 0,
      interviewing: 0,
      offered: 0,
      tags: newRequisition.skills.split(",").map((s) => s.trim()).filter(Boolean)
    };

    setOpportunities([created, ...opportunities]);
    setIsCreateModalOpen(false);
    showToast(`Opportunity "${created.title}" published successfully! ID: ${created.id}`);
  };

  // Filtered List
  const filtered = opportunities.filter((item) => {
    if (statusFilter === "active" && item.status !== "Active" && item.status !== "Closing Soon") return false;
    if (statusFilter === "pending" && item.status !== "Pending QA") return false;
    if (statusFilter === "drafts" && item.status !== "Draft") return false;
    if (statusFilter === "closed" && item.status !== "Closed / Filled") return false;
    if (locationFilter !== "all" && !item.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.dept.toLowerCase().includes(q)
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
            <span className="text-gray-300">Opportunities</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Opportunity Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Publish, manage, and monitor company-wide internship, apprenticeship, and university recruitment requisitions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast("Exporting opportunities requisition matrix CSV...")}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs sm:text-sm font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Create Opportunity</span>
          </button>
        </div>
      </section>

      {/* 6 Requisition KPI Metrics */}
      <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { title: "Total Requisitions", val: "24", sub: "Across 8 teams", color: "text-white" },
          { title: "Active Opportunities", val: "9", sub: "Accepting resumes", color: "text-emerald-400" },
          { title: "Pending Approval", val: "3", sub: "Legal & Dean QA", color: "text-amber-400" },
          { title: "Drafts", val: "4", sub: "Unpublished", color: "text-gray-400" },
          { title: "Closed / Filled", val: "8", sub: "Historical cohorts", color: "text-purple-400" },
          { title: "Total Applications", val: "1,482", sub: "+14% this cycle", color: "text-orange-400" }
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

      {/* Filter & Search Bar */}
      <section className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Keyword Search */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role title, requisition ID (#REQ-8802), or department..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Location Dropdown */}
          <div className="md:col-span-3">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-300 focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              <option value="all">All Locations (Any)</option>
              <option value="San Francisco">San Francisco HQ</option>
              <option value="Seattle">Seattle, WA</option>
              <option value="New York">New York, NY</option>
              <option value="Remote">Remote / Hybrid</option>
            </select>
          </div>

          {/* Results Counter */}
          <div className="md:col-span-3 text-right text-xs text-gray-400 pr-2">
            Showing <strong className="text-white">{filtered.length}</strong> of{" "}
            <strong className="text-white">{opportunities.length}</strong> requisitions
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/5 scrollbar-none text-xs">
          {[
            { id: "all", label: "All Requisitions", count: opportunities.length },
            { id: "active", label: "Active & Closing Soon", count: opportunities.filter((o) => o.status === "Active" || o.status === "Closing Soon").length },
            { id: "pending", label: "Pending QA", count: opportunities.filter((o) => o.status === "Pending QA").length },
            { id: "drafts", label: "Drafts", count: opportunities.filter((o) => o.status === "Draft").length },
            { id: "closed", label: "Closed / Filled", count: opportunities.filter((o) => o.status === "Closed / Filled").length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                statusFilter === tab.id
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-black/40 text-gray-400 hover:text-white border border-white/5"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </section>

      {/* Opportunities List Feed */}
      <div className="space-y-4">
        {filtered.map((opp) => (
          <article
            key={opp.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 group"
          >
            {/* Left Content */}
            <div className="space-y-2 min-w-0 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                  {opp.title}
                </h3>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-orange-400 border border-white/10 font-bold">
                  {opp.id}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    opp.status === "Active"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : opp.status === "Closing Soon"
                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                      : opp.status === "Pending QA"
                      ? "bg-sky-500/15 text-sky-400 border border-sky-500/30"
                      : opp.status === "Draft"
                      ? "bg-gray-500/15 text-gray-400 border border-gray-500/30"
                      : "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                  }`}
                >
                  {opp.status}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-400 flex-wrap">
                <span className="text-gray-300 font-semibold">{opp.dept}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-500" />
                  {opp.location}
                </span>
                <span>•</span>
                <span className="font-mono text-emerald-400 font-semibold">{opp.compensation}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  {opp.term}
                </span>
              </div>

              {/* Skills Tags */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {opp.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-gray-400 border border-white/5"
                  >
                    {t}
                  </span>
                ))}
                <span className="text-[11px] text-gray-500 ml-2">
                  Target Deadline: <strong className="text-gray-400">{opp.deadline}</strong>
                </span>
              </div>
            </div>

            {/* Pipeline Funnel Stats & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/5">
              {/* Funnel Numbers */}
              <div className="grid grid-cols-4 gap-3 text-center px-4 py-2.5 rounded-xl bg-black/40 border border-white/5">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-gray-400 block">Applied</span>
                  <span className="font-bold text-white font-mono text-sm">{opp.applicants}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-gray-400 block">Screen</span>
                  <span className="font-bold text-amber-400 font-mono text-sm">{opp.inReview}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-gray-400 block">Interviews</span>
                  <span className="font-bold text-purple-400 font-mono text-sm">{opp.interviewing}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-gray-400 block">Offers</span>
                  <span className="font-bold text-emerald-400 font-mono text-sm">{opp.offered}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <Link
                  href="/employer/applications"
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5"
                >
                  <span>Candidates ({opp.applicants})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => showToast(`Opening edit draft for ${opp.id}...`)}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ================= CREATE REQUISITION MODAL ================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/25 flex items-center justify-center shadow-sm">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Create New Opportunity Requisition</h2>
                  <p className="text-xs text-gray-400">
                    Publish academic-credit accredited internship or co-op opening
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 font-medium mb-1">Opportunity Title *</label>
                <input
                  type="text"
                  required
                  value={newRequisition.title}
                  onChange={(e) => setNewRequisition({ ...newRequisition, title: e.target.value })}
                  placeholder="e.g. Distributed Systems Engineering Intern"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Department / Team</label>
                  <select
                    value={newRequisition.dept}
                    onChange={(e) => setNewRequisition({ ...newRequisition, dept: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="Core Infrastructure">Core Infrastructure</option>
                    <option value="Product Engineering">Product Engineering</option>
                    <option value="AI & Research Labs">AI &amp; Research Labs</option>
                    <option value="Product Design & UX">Product Design &amp; UX</option>
                    <option value="Reliability & SRE">Reliability &amp; SRE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 font-medium mb-1">Academic Term / Cohort</label>
                  <select
                    value={newRequisition.term}
                    onChange={(e) => setNewRequisition({ ...newRequisition, term: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="Summer 2025 • 12 Weeks">Summer 2025 • 12 Weeks</option>
                    <option value="Fall 2025 Co-op • 16 Weeks">Fall 2025 Co-op • 16 Weeks</option>
                    <option value="Spring 2026 Practicum">Spring 2026 Practicum</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Location &amp; Work Model</label>
                  <input
                    type="text"
                    value={newRequisition.location}
                    onChange={(e) => setNewRequisition({ ...newRequisition, location: e.target.value })}
                    placeholder="e.g. San Francisco, CA (Hybrid)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-medium mb-1">Monthly Stipend / Compensation</label>
                  <input
                    type="text"
                    value={newRequisition.stipend}
                    onChange={(e) => setNewRequisition({ ...newRequisition, stipend: e.target.value })}
                    placeholder="e.g. $10,400 / month + Housing"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Target Openings</label>
                  <input
                    type="number"
                    min="1"
                    value={newRequisition.openings}
                    onChange={(e) => setNewRequisition({ ...newRequisition, openings: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-medium mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={newRequisition.deadline}
                    onChange={(e) => setNewRequisition({ ...newRequisition, deadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-medium mb-1">Minimum GPA</label>
                  <input
                    type="text"
                    value={newRequisition.minGpa}
                    onChange={(e) => setNewRequisition({ ...newRequisition, minGpa: e.target.value })}
                    placeholder="e.g. 3.5"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">
                  Required Skills (Comma separated)
                </label>
                <input
                  type="text"
                  value={newRequisition.skills}
                  onChange={(e) => setNewRequisition({ ...newRequisition, skills: e.target.value })}
                  placeholder="e.g. Go, Kafka, PostgreSQL, Distributed Locks"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">
                  Practicum Mandate &amp; Role Overview
                </label>
                <textarea
                  rows={3}
                  value={newRequisition.description}
                  onChange={(e) => setNewRequisition({ ...newRequisition, description: e.target.value })}
                  placeholder="Detail the technical learning objectives, mentorship structure, and deliverable capstone..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/20 transition-all"
                >
                  Publish Requisition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
