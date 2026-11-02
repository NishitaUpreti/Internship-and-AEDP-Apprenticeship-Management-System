"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Download,
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  Award,
  Lock,
  Calendar,
  Building2,
  DollarSign,
  FileCheck2,
  Stars,
  Key,
  X,
  FileCode,
  UploadCloud,
  Check,
  HelpCircle
} from "lucide-react";

export default function StudentDocumentsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [termFilter, setTermFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState(null);
  const [verifiedModalDoc, setVerifiedModalDoc] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-orange-600 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb & Vault Seal Status */}
      <section className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/student" className="hover:text-orange-400 transition-colors">
            Student Portal
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-gray-200">Academic Dossier</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-orange-400 font-medium">Certificates & Documents</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <Lock className="w-3.5 h-3.5" />
          <span className="font-semibold">Vault Sealed · SHA-256 Ledger Locked</span>
        </div>
      </section>

      {/* Header */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shadow-inner">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Certificates & Documents
                </h1>
                <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  FERPA Protected
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                Centralized repository for verified internship offer letters, bilateral practicum agreements, completion credentials, official transcripts, and evaluation reports.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => showToast("Exporting encrypted cryptographic ZIP package with all 14 records...")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Download className="w-4 h-4" />
            Batch Export Vault ZIP
          </button>
          <button
            onClick={() => showToast("Upload external credential drawer opened.")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium text-xs sm:text-sm shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
          >
            <UploadCloud className="w-4 h-4" />
            + Upload External Credential
          </button>
        </div>
      </section>

      {/* FERPA-Compliant Cryptographic Vault Banner */}
      <section className="p-5 rounded-2xl bg-gradient-to-r from-[#1c1c1c] via-[#241c16] to-[#1c1c1c] border border-orange-500/25 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white">
                FERPA-Compliant Cryptographic Vault
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30 font-bold uppercase">
                SHA-256 Root Hash
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-1 max-w-3xl leading-relaxed">
              All records conform to 34 CFR § 99.31 educational registrar compliance. Cryptographically anchored with institutional root hash <code className="px-1.5 py-0.5 rounded bg-black/60 text-orange-400 font-mono text-[11px]">0x89f4b16c87a24e98...38e1</code>. Third-party background checkers and graduate admissions can verify validity directly.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setVerifiedModalDoc({
              title: "Institutional Ledger Root Seal",
              id: "#ROOT-VAULT-2025",
              hash: "sha256:89f4b16c87a24e98a3b5c67d8e901f23456789abcdef0123456789abcdef38e1",
              status: "Valid & Endorsed",
              issuedBy: "Pacific Coast Institute of Technology · Office of the Registrar",
              timestamp: "2025-07-23 09:14:22 UTC",
              signer: "Dr. Ronald Vance, University Registrar"
            });
          }}
          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors whitespace-nowrap self-start md:self-auto"
        >
          Verify Vault Root Proof
        </button>
      </section>

      {/* Document Category Filter Tabs */}
      <section className="flex items-center gap-2 overflow-x-auto border-b border-white/10 pb-3 scrollbar-none text-xs">
        {[
          { id: "all", label: "All Documents", count: 14 },
          { id: "offers", label: "Offer Letters", count: 3 },
          { id: "agreements", label: "Signed Agreements", count: 3 },
          { id: "certificates", label: "Completion Certificates", count: 2 },
          { id: "evaluations", label: "Evaluation Reports", count: 4 },
          { id: "credits", label: "Credit Records", count: 2 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20 font-bold"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === tab.id ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </section>

      {/* Filter and Search Bar */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center p-3 rounded-2xl bg-[#1c1c1c] border border-white/10">
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by company, document title, certificate hash, or course ID..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="md:col-span-3">
          <select
            value={termFilter}
            onChange={(e) => setTermFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-300 focus:outline-none focus:border-orange-500"
          >
            <option value="all">All Academic Terms</option>
            <option value="spring-2025">Spring 2025 (Current)</option>
            <option value="fall-2024">Fall 2024 (Datadog)</option>
            <option value="summer-2024">Summer 2024 (Ember)</option>
          </select>
        </div>

        <div className="md:col-span-3 flex justify-end">
          <span className="text-xs text-gray-400">
            Showing verified vault records
          </span>
        </div>
      </section>

      {/* ================= SECTION A: Completion Certificates & Credentials ================= */}
      {(activeTab === "all" || activeTab === "certificates") && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">
                Section A: Official Internship Completion Certificates & Credentials
              </h2>
              <span className="text-xs text-gray-500 font-mono">(2 items)</span>
            </div>
            <button
              onClick={() => showToast("Cryptographically verifying all 2 certificate seals on registrar blockchain...")}
              className="text-xs text-orange-400 hover:underline font-semibold"
            >
              Verify All Certificates
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cert 1: Datadog */}
            <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between gap-4 group">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
                      DD
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm">Datadog, Inc.</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                          <Stars className="w-3 h-3" /> Pass with Honors
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white mt-1">
                        Distributed Systems Co-op Completion Certificate
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Credential ID:</span>
                    <span className="font-mono text-orange-400">#CERT-DD-9821</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Accredited Practicum:</span>
                    <span className="text-white font-medium">480.0 Hours Completed</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Date Certified:</span>
                    <span className="text-gray-300">December 18, 2024</span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-mono text-[11px] pt-1 border-t border-white/5">
                    <span>Signature Hash:</span>
                    <span className="text-emerald-400 truncate max-w-[200px]">sha256:7b91...8c4a</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <button
                  onClick={() => {
                    setVerifiedModalDoc({
                      title: "Datadog Distributed Systems Co-op Certificate",
                      id: "#CERT-DD-9821",
                      hash: "sha256:7b91d4e28c4a110998fbe321156a0094b8e2178229c1b489028df1904a8c4a",
                      status: "Registrar Verified & Sealed",
                      issuedBy: "Datadog Engineering Education & PCIT EECS Council",
                      timestamp: "2024-12-18 16:45:00 UTC",
                      signer: "Marcus Vance, Principal Architect & Prof. Elena Rostova"
                    });
                  }}
                  className="text-xs font-semibold text-orange-400 hover:text-orange-300 hover:underline flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Verify Digital Seal
                </button>
                <button
                  onClick={() => showToast("Downloading Datadog Completion Certificate PDF with high-res gold seal...")}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
              </div>
            </div>

            {/* Cert 2: Ember Engineering */}
            <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between gap-4 group">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm">
                      EE
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm">Ember Engineering</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Satisfactory
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white mt-1">
                        Infrastructure Practicum Completion Credential
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Credential ID:</span>
                    <span className="font-mono text-orange-400">#CERT-EE-4109</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Accredited Practicum:</span>
                    <span className="text-white font-medium">480.0 Hours Completed</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Date Certified:</span>
                    <span className="text-gray-300">August 25, 2024</span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-mono text-[11px] pt-1 border-t border-white/5">
                    <span>Signature Hash:</span>
                    <span className="text-emerald-400 truncate max-w-[200px]">sha256:3a18...42ff</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <button
                  onClick={() => {
                    setVerifiedModalDoc({
                      title: "Ember Engineering Practicum Certificate",
                      id: "#CERT-EE-4109",
                      hash: "sha256:3a18e001c22ff78a94610283c7149021e84739281a02938472910482019442ff",
                      status: "Registrar Verified & Sealed",
                      issuedBy: "Ember Engineering Cloud Infrastructure & PCIT Council",
                      timestamp: "2024-08-25 11:20:10 UTC",
                      signer: "Dr. Karen Vance, VP Engineering"
                    });
                  }}
                  className="text-xs font-semibold text-orange-400 hover:text-orange-300 hover:underline flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Verify Digital Seal
                </button>
                <button
                  onClick={() => showToast("Downloading Ember Engineering Credential PDF...")}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= SECTION B: Offer Letters & Bilateral Agreements ================= */}
      {(activeTab === "all" || activeTab === "offers" || activeTab === "agreements") && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">
                Section B: Offer Letters & Bilateral Agreements
              </h2>
              <span className="text-xs text-gray-500 font-mono">(3 items)</span>
            </div>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Bilateral Institution Sign-off Completed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Agreement 1: Stripe Offer Letter */}
            <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      Accepted · Spring 2025
                    </span>
                    <h3 className="text-base font-bold text-white mt-2">Stripe, Inc.</h3>
                    <p className="text-xs text-gray-400">Software Engineering Internship Offer Letter</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold text-xs">
                    S
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Stipend Rate:</span>
                    <span className="text-white font-bold font-mono">$58.00 / hr</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Executed Date:</span>
                    <span className="text-gray-300">Jan 14, 2025</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Doc ID:</span>
                    <span className="text-orange-400 font-mono">#OFF-STRIPE-8910</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">Counter-signed</span>
                <button
                  onClick={() => showToast("Downloading Stripe Signed Offer Letter PDF...")}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 hover:underline"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
              </div>
            </div>

            {/* Agreement 2: Datadog Tripartite */}
            <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      Fully Executed · Fall 2024
                    </span>
                    <h3 className="text-base font-bold text-white mt-2">Datadog, Inc.</h3>
                    <p className="text-xs text-gray-400">Tripartite Internship & IP Agreement</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xs">
                    DD
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Stipend Rate:</span>
                    <span className="text-white font-bold font-mono">$54.00 / hr</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Executed Date:</span>
                    <span className="text-gray-300">Aug 10, 2024</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Doc ID:</span>
                    <span className="text-orange-400 font-mono">#AGR-DD-4412</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">Dean & Host Signed</span>
                <button
                  onClick={() => showToast("Downloading Datadog Tripartite Agreement PDF...")}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 hover:underline"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
              </div>
            </div>

            {/* Agreement 3: CPT Practicum Cooperative Agreement */}
            <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      SEVIS DSO Certified
                    </span>
                    <h3 className="text-base font-bold text-white mt-2">Pacific Coast Inst.</h3>
                    <p className="text-xs text-gray-400">F-1 CPT Practicum Cooperative Agreement</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    CPT
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Weekly Limit:</span>
                    <span className="text-white font-bold font-mono">40.0 hrs / week</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Executed Date:</span>
                    <span className="text-gray-300">Aug 15, 2024</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Doc ID:</span>
                    <span className="text-orange-400 font-mono">#CPT-MOU-2024-991</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">DSO Verified</span>
                <button
                  onClick={() => showToast("Downloading CPT Practicum MOU...")}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 hover:underline"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= SECTION C: Evaluation Reports & Registrar Records ================= */}
      {(activeTab === "all" || activeTab === "evaluations" || activeTab === "credits") && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Section C: Evaluation Reports & Dossiers (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-orange-400" />
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Section C: Evaluation Reports & Dossiers
                </h2>
              </div>
              <span className="text-xs text-gray-500 font-mono">4 Total Dossiers</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-3">
              {[
                {
                  title: "Mid-Term Industry Supervisor Review Dossier",
                  score: "4.9 / 5.0",
                  org: "Datadog, Inc. · Supervisor: Marcus Vance (Principal Architect)",
                  verified: true,
                  term: "Fall 2024"
                },
                {
                  title: "Final Comprehensive Practicum Appraisal",
                  score: "5.0 / 5.0",
                  org: "Datadog, Inc. · Co-signed by EECS Practicum Director",
                  verified: true,
                  term: "Fall 2024"
                },
                {
                  title: "Summer 2024 Practicum Supervisor Endorsement",
                  score: "4.8 / 5.0",
                  org: "Ember Engineering · Dr. Karen Vance",
                  verified: true,
                  term: "Summer 2024"
                },
                {
                  title: "ENGR-490 Academic Ethics Endorsement Dossier",
                  score: "Pass / 100%",
                  org: "University Engineering Council Committee",
                  verified: true,
                  term: "Spring 2024"
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-orange-500/30 transition-all flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">
                        {item.score}
                      </span>
                    </div>
                    <p className="text-gray-400">{item.org}</p>
                  </div>

                  <button
                    onClick={() => showToast(`Downloading ${item.title} PDF...`)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-orange-400 hover:text-orange-300 transition-colors shrink-0"
                    title="Download Report"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section D: Registrar Audit Records (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Section D: Registrar Audit Records
                </h2>
              </div>
              <span className="text-xs text-gray-500 font-mono">2 Sealed Records</span>
            </div>

            <div className="space-y-3">
              {/* Record 1 */}
              <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-3 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                      Seal #REG-88219
                    </span>
                    <h3 className="font-bold text-white mt-1.5">Official CPT Practicum Credit Transcript</h3>
                    <p className="text-gray-400 text-[11px]">2024 Academic Year · 18.0 Verified Units Transferred</p>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between text-gray-400">
                    <span>Audit Registration:</span>
                    <span className="text-white">SEVIS / DSO Certified</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Transferred To:</span>
                    <span className="text-white">Major CS Electives (18 Units)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-500">Vault ID: 08-2024-TR</span>
                  <button
                    onClick={() => showToast("Downloading Official CPT Practicum Transcript PDF...")}
                    className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" /> Official Transcript PDF
                  </button>
                </div>
              </div>

              {/* Record 2 */}
              <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-3 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20 font-bold">
                      ABET Accredited Framework
                    </span>
                    <h3 className="font-bold text-white mt-1.5">ABET Experiential Learning Certificate</h3>
                    <p className="text-gray-400 text-[11px]">Criterion 5 Compliance & Engineering Practicum Standard</p>
                  </div>
                  <Award className="w-5 h-5 text-orange-400 shrink-0" />
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-500">Cycle: 2022 - 2028</span>
                  <button
                    onClick={() => showToast("Downloading ABET Accreditation Proof PDF...")}
                    className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Seal Proof
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Vault Footer */}
      <footer className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          <span>EmberOps Academic Credential Ledger v3.4.1 · Encrypted with SHA-256 Public Key Infrastructure</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-orange-400 transition-colors">Audit Integrity Policy</a>
          <a href="#" className="hover:text-orange-400 transition-colors">FERPA Disclosures</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Registrar API</a>
        </div>
      </footer>

      {/* ================= MODAL: Digital Seal & Cryptographic Verification ================= */}
      {verifiedModalDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-orange-400 font-bold">{verifiedModalDoc.id}</span>
                  <h3 className="text-base font-bold text-white">{verifiedModalDoc.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setVerifiedModalDoc(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Verification Status:</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {verifiedModalDoc.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Issuing Authority:</span>
                  <span className="text-white font-medium">{verifiedModalDoc.issuedBy}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Timestamp:</span>
                  <span className="text-gray-300 font-mono">{verifiedModalDoc.timestamp}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Authorized Signer:</span>
                  <span className="text-white font-medium">{verifiedModalDoc.signer}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-gray-400">Cryptographic SHA-256 Digest</span>
                <div className="mt-1 p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-orange-400 break-all select-all">
                  {verifiedModalDoc.hash}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button
                onClick={() => setVerifiedModalDoc(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium"
              >
                Close Proof
              </button>
              <button
                onClick={() => {
                  showToast("Cryptographic proof certificate copied to clipboard.");
                  setVerifiedModalDoc(null);
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold"
              >
                Copy Proof Hash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
