"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Award,
  Download,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Mail,
  FileText,
  DollarSign,
  ChevronRight,
  AlertTriangle,
  XCircle,
  Building,
  Check,
  X,
  ExternalLink,
  Sparkles,
  Star,
  ArrowRight
} from "lucide-react";

function EmployerOffersContent() {
  const searchParams = useSearchParams();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3600);
  };

  // Selected Finalists Awaiting Formal Offer
  const [selectedAwaitingOffer, setSelectedAwaitingOffer] = useState([
    {
      id: "SEL-8803",
      name: "Nishita Upreti",
      email: "nishita.upreti@university.edu",
      school: "Graphic Era University (GEU) • B.Tech CSE",
      role: "Distributed Systems Engineering Intern",
      reqId: "REQ-8802",
      score: "4.8 / 5.0 (Strong Hire)",
      interviewStatus: "Cleared Technical Concurrency & Queues Panel",
      suggestedStipend: 10400,
      suggestedHousing: 2500,
      suggestedReloc: 4000
    },
    {
      id: "SEL-8802",
      name: "Maya Chen",
      email: "m.chen@mit.edu",
      school: "MIT • PhD AI Lab",
      role: "AI & Foundation Models Research Fellow",
      reqId: "REQ-8910",
      score: "4.9 / 5.0 (Strong Hire)",
      interviewStatus: "Cleared LLM Reasoning & RLHF Panel",
      suggestedStipend: 12000,
      suggestedHousing: 2500,
      suggestedReloc: 5000
    },
    {
      id: "SEL-8805",
      name: "Sarah Lindqvist",
      email: "slindqvist@uwaterloo.ca",
      school: "University of Waterloo • B.SE",
      role: "Cloud Infrastructure & SRE Apprentice",
      reqId: "REQ-8650",
      score: "4.7 / 5.0 (Strong Hire)",
      interviewStatus: "Cleared Kubernetes Live Cluster Runbook",
      suggestedStipend: 9200,
      suggestedHousing: 2000,
      suggestedReloc: 3000
    }
  ]);

  // Create Offer Form State
  const [newOffer, setNewOffer] = useState({
    candidate: "Nishita Upreti",
    email: "nishita.upreti@university.edu",
    role: "Distributed Systems Engineering Intern",
    stipend: 10400,
    housing: 2500,
    relocation: 4000,
    term: "Summer 2025 (May 26 – Aug 22)",
    deadline: "2025-05-15"
  });

  const handleOpenOfferForSelected = (candidate) => {
    setNewOffer({
      candidate: candidate.name,
      email: candidate.email,
      role: candidate.role,
      stipend: candidate.suggestedStipend,
      housing: candidate.suggestedHousing,
      relocation: candidate.suggestedReloc,
      term: "Summer 2025 (May 26 – Aug 22)",
      deadline: "2025-05-15"
    });
    setIsCreateModalOpen(true);
  };

  // Pre-fill if navigated from Interviews page with ?candidate=...
  useEffect(() => {
    const candidateQuery = searchParams.get("candidate");
    if (candidateQuery) {
      const match = selectedAwaitingOffer.find(
        (c) => c.name.toLowerCase() === candidateQuery.toLowerCase()
      );
      if (match) {
        handleOpenOfferForSelected(match);
      } else {
        setNewOffer((prev) => ({
          ...prev,
          candidate: candidateQuery,
          email: `${candidateQuery.toLowerCase().replace(/\s+/g, ".")}@university.edu`
        }));
        setIsCreateModalOpen(true);
      }
    }
  }, [searchParams]);

  // Offers Roster
  const [offers, setOffers] = useState([
    {
      id: "OFF-7801",
      candidate: "Alex Chen",
      email: "alex.chen@stanford.edu",
      school: "Stanford University • MS CS '25",
      role: "Distributed Systems Engineering Intern",
      reqId: "REQ-8802",
      stipend: "$10,400 / mo",
      housing: "$2,500 / mo",
      relocation: "$4,000",
      totalComp: "$12,900 / mo",
      sentDate: "May 02, 2025",
      expiresDate: "May 10, 2025",
      status: "Accepted",
      signedAt: "May 03, 2025 via DocuSign",
      cptStatus: "Tripartite Agreement Certified"
    },
    {
      id: "OFF-7802",
      candidate: "Nishita Upreti",
      email: "nishita.upreti@university.edu",
      school: "Graphic Era University (GEU) • B.Tech CSE",
      role: "Distributed Systems Engineering Intern",
      reqId: "REQ-8802",
      stipend: "$10,400 / mo",
      housing: "$2,500 / mo",
      relocation: "$4,000",
      totalComp: "$12,900 / mo",
      sentDate: "Apr 28, 2025",
      expiresDate: "May 10, 2025 (8 days left)",
      status: "Sent / Pending",
      signedAt: null,
      cptStatus: "Awaiting Student Signature"
    },
    {
      id: "OFF-7798",
      candidate: "Maya Chen",
      email: "m.chen@mit.edu",
      school: "MIT • PhD AI Lab",
      role: "AI & Foundation Models Research Fellow",
      reqId: "REQ-8910",
      stipend: "$12,000 / mo",
      housing: "$2,500 / mo",
      relocation: "$5,000",
      totalComp: "$14,500 / mo",
      sentDate: "Apr 22, 2025",
      expiresDate: "May 05, 2025",
      status: "Accepted",
      signedAt: "Apr 25, 2025 via DocuSign",
      cptStatus: "Tripartite Agreement Certified"
    },
    {
      id: "OFF-7789",
      candidate: "Marcus Vance",
      email: "marcus.v@cmu.edu",
      school: "Carnegie Mellon • B.Des",
      role: "Product Design & Design Systems Intern",
      reqId: "REQ-8794",
      stipend: "$9,200 / mo",
      housing: "$2,000 / mo",
      relocation: "$3,000",
      totalComp: "$11,200 / mo",
      sentDate: "Apr 15, 2025",
      expiresDate: "Apr 25, 2025",
      status: "Declined",
      signedAt: null,
      cptStatus: "Candidate Accepted Competing Bay Area Offer"
    },
    {
      id: "OFF-7815",
      candidate: "Sarah Lindqvist",
      email: "slindqvist@uwaterloo.ca",
      school: "University of Waterloo • B.SE",
      role: "Cloud Infrastructure & SRE Apprentice",
      reqId: "REQ-8650",
      stipend: "$8,800 / mo",
      housing: "$2,000 / mo",
      relocation: "$3,000",
      totalComp: "$10,800 / mo",
      sentDate: "Draft",
      expiresDate: "May 15, 2025",
      status: "Draft",
      signedAt: null,
      cptStatus: "Awaiting Hiring Manager Approval"
    }
  ]);

  // Handle Create Offer Submit
  const handleCreateOffer = (e) => {
    e.preventDefault();
    const created = {
      id: `OFF-${Math.floor(7820 + Math.random() * 80)}`,
      candidate: newOffer.candidate,
      email: newOffer.email,
      school: "Selected University Finalist",
      role: newOffer.role,
      reqId: "REQ-8802",
      stipend: `$${Number(newOffer.stipend).toLocaleString()} / mo`,
      housing: `$${Number(newOffer.housing).toLocaleString()} / mo`,
      relocation: `$${Number(newOffer.relocation).toLocaleString()}`,
      totalComp: `$${(Number(newOffer.stipend) + Number(newOffer.housing)).toLocaleString()} / mo`,
      sentDate: "Today",
      expiresDate: newOffer.deadline,
      status: "Sent / Pending",
      signedAt: null,
      cptStatus: "Dispatched via DocuSign • Awaiting Candidate Signature"
    };

    setOffers([created, ...offers]);
    setSelectedAwaitingOffer((prev) => prev.filter((c) => c.name !== newOffer.candidate));
    setIsCreateModalOpen(false);
    showToast(`Formal offer dispatched to ${created.candidate} via DocuSign! Ref: ${created.id}`);
  };

  const filtered = offers.filter((item) => {
    if (statusFilter === "accepted" && item.status !== "Accepted") return false;
    if (statusFilter === "pending" && item.status !== "Sent / Pending") return false;
    if (statusFilter === "declined" && item.status !== "Declined") return false;
    if (statusFilter === "draft" && item.status !== "Draft") return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.candidate.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
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
            <span className="text-gray-300">Offers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Offers Management &amp; Yield Tracking
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Cohort: Summer 2025 • Formal contract dispatch, compensation terms, and student acceptance verification.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast("Exporting offer registry & yield reports CSV...")}
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
            <span>+ Create Formal Offer</span>
          </button>
        </div>
      </section>

      {/* 5 Metric Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        {[
          { title: "Total Offers Issued", val: "24", sub: "Across 6 active requisitions", color: "text-white" },
          { title: "Accepted Offers", val: "14", sub: "78% yield (+4 this week)", color: "text-emerald-400" },
          { title: "Pending / Sent", val: "6", sub: "2 expiring < 48 hours", color: "text-amber-400" },
          { title: "Declined", val: "3", sub: "12.5% rate • Competing offers", color: "text-rose-400" },
          { title: "Draft Offers", val: "1", sub: "Legal & Dean QA check", color: "text-gray-400" }
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
            { id: "all", label: "All Offers (24)" },
            { id: "accepted", label: "Accepted (14)" },
            { id: "pending", label: "Pending (6)" },
            { id: "declined", label: "Declined (3)" },
            { id: "draft", label: "Draft (1)" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
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
            placeholder="Search candidate name or offer ID..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
          />
        </div>
      </section>

      {/* Offers Table / Cards */}
      <section className="rounded-2xl bg-[#1c1c1c] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-5">Finalist Candidate</th>
                <th className="py-3 px-5">Position Mandate</th>
                <th className="py-3 px-5">Total Compensation</th>
                <th className="py-3 px-5">Offer Expiration</th>
                <th className="py-3 px-5">Decision Status</th>
                <th className="py-3 px-5 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-4 px-5">
                    <div className="font-bold text-white text-xs group-hover:text-orange-400 transition-colors">
                      {item.candidate}
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{item.school}</div>
                    <div className="font-mono text-[10px] text-orange-400">{item.id}</div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="font-semibold text-white text-xs">{item.role}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">Ref: {item.reqId}</div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="font-bold font-mono text-emerald-400 text-xs">{item.totalComp}</div>
                    <div className="text-[10px] text-gray-400">
                      {item.stipend} + {item.housing}
                    </div>
                  </td>

                  <td className="py-4 px-5 text-gray-300">
                    <div>{item.expiresDate}</div>
                    <div className="text-[10px] text-gray-500">Sent: {item.sentDate}</div>
                  </td>

                  <td className="py-4 px-5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                        item.status === "Accepted"
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : item.status === "Sent / Pending"
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                          : item.status === "Declined"
                          ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                          : "bg-gray-500/15 text-gray-400 border border-gray-500/30"
                      }`}
                    >
                      {item.status}
                    </span>
                    <div className="text-[10px] text-gray-500 mt-1">{item.cptStatus}</div>
                  </td>

                  <td className="py-4 px-5 text-right pr-6">
                    <button
                      onClick={() => setSelectedOffer(item)}
                      className="px-3 py-1.5 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-400 text-xs font-semibold transition-colors"
                    >
                      View Terms
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= OFFER DETAILS MODAL ================= */}
      {selectedOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Formal Offer Terms: {selectedOffer.candidate}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-orange-400 border border-white/10">
                    {selectedOffer.id}
                  </span>
                </h3>
                <p className="text-xs text-gray-400">{selectedOffer.role}</p>
              </div>
              <button
                onClick={() => setSelectedOffer(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              {/* Compensation Breakdown Cards */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[10px] uppercase font-semibold text-gray-400 block">
                    Base Stipend
                  </span>
                  <div className="font-mono text-emerald-400 font-bold text-base mt-1">
                    {selectedOffer.stipend}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[10px] uppercase font-semibold text-gray-400 block">
                    Housing Stipend
                  </span>
                  <div className="font-mono text-white font-bold text-base mt-1">
                    {selectedOffer.housing}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[10px] uppercase font-semibold text-gray-400 block">
                    Relocation Bonus
                  </span>
                  <div className="font-mono text-white font-bold text-base mt-1">
                    {selectedOffer.relocation}
                  </div>
                </div>
              </div>

              {/* Status and Signature Timeline */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-medium">Signature Status:</span>
                  <span className="font-semibold text-white">
                    {selectedOffer.signedAt || "Awaiting Candidate Action"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-medium">Offer Expiration:</span>
                  <span className="font-mono text-orange-400 font-semibold">{selectedOffer.expiresDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-medium">Institutional Compliance:</span>
                  <span className="text-emerald-400">{selectedOffer.cptStatus}</span>
                </div>
              </div>

              {/* Offer Letter Document Preview */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-orange-400" />
                  <div>
                    <div className="font-semibold text-white">
                      {selectedOffer.candidate.replace(/\s+/g, "_")}_Offer_Letter_Summer2025.pdf
                    </div>
                    <div className="text-[10px] text-gray-500">DocuSign Envelope ID: #DS-8849204</div>
                  </div>
                </div>
                <button
                  onClick={() => showToast("Downloading executed Offer Contract PDF...")}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
                >
                  Download PDF
                </button>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex items-center justify-between">
              <button
                onClick={() => setSelectedOffer(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showToast(`Reminder nudge dispatched to ${selectedOffer.candidate} (${selectedOffer.email}).`);
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md shadow-orange-500/20 transition-all"
              >
                Send Reminder Nudge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CREATE FORMAL OFFER MODAL ================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/25 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Create New Formal Offer</h2>
                  <p className="text-xs text-gray-400">Generate legally binding tripartite offer package</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOffer} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Finalist Candidate *</label>
                  <input
                    type="text"
                    required
                    value={newOffer.candidate}
                    onChange={(e) => setNewOffer({ ...newOffer, candidate: e.target.value })}
                    placeholder="e.g. Nishita Upreti"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Candidate Email (.edu)</label>
                  <input
                    type="email"
                    required
                    value={newOffer.email}
                    onChange={(e) => setNewOffer({ ...newOffer, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Position Requisition</label>
                <select
                  value={newOffer.role}
                  onChange={(e) => setNewOffer({ ...newOffer, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="Distributed Systems Engineering Intern">Distributed Systems Engineering Intern</option>
                  <option value="Product Design & Design Systems Intern">Product Design &amp; Design Systems Intern</option>
                  <option value="AI & Foundation Models Research Fellow">AI &amp; Foundation Models Research Fellow</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Monthly Base ($)</label>
                  <input
                    type="number"
                    value={newOffer.stipend}
                    onChange={(e) => setNewOffer({ ...newOffer, stipend: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Housing Stipend ($)</label>
                  <input
                    type="number"
                    value={newOffer.housing}
                    onChange={(e) => setNewOffer({ ...newOffer, housing: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Relocation ($)</label>
                  <input
                    type="number"
                    value={newOffer.relocation}
                    onChange={(e) => setNewOffer({ ...newOffer, relocation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Offer Expiration Deadline</label>
                <input
                  type="date"
                  value={newOffer.deadline}
                  onChange={(e) => setNewOffer({ ...newOffer, deadline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
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
                  Generate &amp; Dispatch via DocuSign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EmployerOffersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <EmployerOffersContent />
    </Suspense>
  );
}
