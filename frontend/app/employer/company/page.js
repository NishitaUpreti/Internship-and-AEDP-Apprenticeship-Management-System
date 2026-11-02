"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  FileText,
  UploadCloud,
  Pencil,
  Clock,
  ExternalLink,
  MapPin,
  Globe,
  Users,
  Mail,
  UserCheck,
  Award,
  AlertCircle,
  Download,
  X,
  Check
} from "lucide-react";

export default function EmployerCompanyProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3600);
  };

  const [company, setCompany] = useState({
    name: "Acme Technologies Inc.",
    legalName: "Acme Technologies Corporation (Delaware C-Corp)",
    ein: "XX-XXXX892",
    industry: "Enterprise Cloud, FinTech & Distributed Systems",
    website: "https://acmetech.internal",
    hq: "500 Howard Street, Suite 400, San Francisco, CA 94105",
    size: "2,500+ Employees",
    founded: "2018",
    mission:
      "Building resilient distributed primitives and high-throughput transactional infrastructure for next-generation global financial rails, with an uncompromising commitment to undergraduate mentorship and academic co-op excellence."
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setIsEditModalOpen(false);
    showToast("Corporate profile information updated successfully!");
  };

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
            <span className="text-gray-300">Company Profile</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Company Profile &amp; Verification
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Official corporate entity profile, verified registry, and institutional compliance records.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast("Opening verification documents upload dialog...")}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs sm:text-sm font-semibold transition-colors"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Documents</span>
          </button>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      </section>

      {/* Verification & Coordinator Audit Banner */}
      <section className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-[#1c1815] to-black/40 border border-amber-500/30 space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Under Review by University Coordinator</span>
            </span>
            <span className="text-xs text-gray-400">
              Last Submitted: <strong className="text-gray-300">Jan 14, 2025</strong> • Audit Cycle: Spring 2025
            </span>
          </div>

          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> 4/4 Core Legal Certifications Active
          </span>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed pt-1">
          <strong className="text-orange-400 font-semibold">Coordinator Feedback: </strong>
          "Certificate of Good Standing and Delaware incorporation confirmed. Please ensure the latest 2024–2025 Student Safety &amp; Health protocol is uploaded before Summer cohort intake."
        </p>
      </section>

      {/* Company Hero Card */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#1c1c1c] border border-white/10 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-600 to-amber-700 text-white font-bold text-2xl flex items-center justify-center shrink-0 shadow-xl border border-white/10">
              AT
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {company.name}
                </h2>
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Audited &amp; Verified Employer</span>
                </span>
              </div>

              <p className="text-xs text-gray-400 font-mono">
                Legal Entity: {company.legalName} • EIN: {company.ein}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-300 flex-wrap pt-1">
                <span className="flex items-center gap-1 text-gray-400">
                  <Building2 className="w-3.5 h-3.5 text-orange-400" />
                  {company.industry}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-gray-500" />
                  {company.hq}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-gray-400">
                  <Users className="w-3.5 h-3.5 text-gray-500" />
                  {company.size}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors"
            >
              <Globe className="w-4 h-4 text-orange-400" />
              <span>Visit Corporate Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
            </a>
          </div>
        </div>
      </section>

      {/* Main 2-Column Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Mission, Compliance, Representatives */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* 1. Corporate Mission Statement */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 pb-2 border-b border-white/10">
              Corporate Mission &amp; Systems Philosophy
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed p-4 rounded-xl bg-black/40 border border-white/5">
              "{company.mission}"
            </p>
          </div>

          {/* 2. Institutional Compliance & Records */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Institutional Compliance &amp; Records</h3>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> 100% Up to Date
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              {[
                { title: "Employer Identification Number (EIN)", val: company.ein, sub: "IRS Form SS-4 on file", status: "Verified" },
                { title: "Tripartite Master University Agreement", val: "Active (2024–2026)", sub: "Signed by General Counsel", status: "Executed" },
                { title: "Commercial General Liability Insurance", val: "$2,000,000 Policy", sub: "Travelers Casualty Co.", status: "Active" },
                { title: "Student Workplace Safety & Health Protocol", val: "OSHA & State Certified", sub: "Annual audit passed Nov 2024", status: "Compliant" }
              ].map((rec, i) => (
                <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">
                      {rec.title}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {rec.status}
                    </span>
                  </div>
                  <div className="text-white font-bold text-sm mt-1">{rec.val}</div>
                  <div className="text-[11px] text-gray-400">{rec.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Authorized Corporate Representatives */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white pb-3 border-b border-white/10">
              Authorized Representatives &amp; Signatories
            </h3>

            <div className="space-y-3">
              {[
                {
                  name: "Sarah Jenkins",
                  role: "Lead University Technical Recruiter",
                  email: "sarah.jenkins@acme.com",
                  badge: "Primary Recruiter Contact",
                  initials: "SJ"
                },
                {
                  name: "David Ross",
                  role: "Vice President & General Counsel",
                  email: "d.ross-legal@acme.com",
                  badge: "Authorized Legal Signatory",
                  initials: "DR"
                },
                {
                  name: "Marcus Vance",
                  role: "Principal Distributed Systems Architect",
                  email: "marcus.vance@acme.com",
                  badge: "Lead Industry Mentor",
                  initials: "MV"
                }
              ].map((rep, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                      {rep.initials}
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">{rep.name}</div>
                      <div className="text-[11px] text-gray-400">{rep.role}</div>
                      <div className="text-[10px] text-gray-500 font-mono">{rep.email}</div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-semibold whitespace-nowrap">
                    {rep.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Coordinator Audit Timeline & Compliance Files */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Coordinator Audit History */}
          <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 pb-2 border-b border-white/10">
              Coordinator Audit History
            </h3>

            <div className="space-y-3.5 text-xs">
              {[
                {
                  date: "Jan 14, 2025",
                  title: "Annual Recertification Submitted",
                  desc: "Delaware certificate & liability schedule dispatched for review.",
                  status: "Completed"
                },
                {
                  date: "Nov 20, 2024",
                  title: "OSHA Workplace Safety Audit Passed",
                  desc: "Emergency procedures and ergonomics guidelines verified.",
                  status: "Passed"
                },
                {
                  date: "Aug 15, 2024",
                  title: "Tripartite Framework Executed",
                  desc: "Full 2-year university placement agreement renewed.",
                  status: "Certified"
                }
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                  <div>
                    <span className="font-mono text-[10px] text-gray-500">{log.date}</span>
                    <div className="font-semibold text-white mt-0.5">{log.title}</div>
                    <p className="text-gray-400 text-[11px] mt-0.5 leading-snug">{log.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Artifacts */}
          <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 pb-2 border-b border-white/10">
              Verified Documents
            </h3>

            <div className="space-y-2 text-xs">
              {[
                { name: "Acme_Delaware_Certificate_Good_Standing.pdf", size: "310 KB" },
                { name: "Tripartite_Master_CoOp_Agreement_2025.pdf", size: "840 KB" },
                { name: "Commercial_General_Liability_Policy.pdf", size: "1.2 MB" },
                { name: "Student_Safety_Protocol_Handbook.pdf", size: "480 KB" }
              ].map((doc, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 flex items-center justify-between cursor-pointer group transition-all"
                  onClick={() => showToast(`Downloading ${doc.name}...`)}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-4 h-4 text-orange-400 shrink-0" />
                    <span className="text-white truncate font-medium group-hover:text-orange-400 transition-colors">
                      {doc.name}
                    </span>
                  </div>
                  <Download className="w-3.5 h-3.5 text-gray-500 group-hover:text-white shrink-0 ml-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= EDIT COMPANY MODAL ================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/25 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Edit Corporate Entity Details</h2>
                  <p className="text-xs text-gray-400">Update company directory information</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 font-medium mb-1">Company Display Name</label>
                <input
                  type="text"
                  value={company.name}
                  onChange={(e) => setCompany({ ...company, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Full Legal Entity Name</label>
                <input
                  type="text"
                  value={company.legalName}
                  onChange={(e) => setCompany({ ...company, legalName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Industry Sector</label>
                  <input
                    type="text"
                    value={company.industry}
                    onChange={(e) => setCompany({ ...company, industry: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-medium mb-1">Website URL</label>
                  <input
                    type="url"
                    value={company.website}
                    onChange={(e) => setCompany({ ...company, website: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Headquarters Address</label>
                <input
                  type="text"
                  value={company.hq}
                  onChange={(e) => setCompany({ ...company, hq: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Mission &amp; Mentorship Philosophy</label>
                <textarea
                  rows={3}
                  value={company.mission}
                  onChange={(e) => setCompany({ ...company, mission: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/20 transition-all"
                >
                  Save Corporate Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
