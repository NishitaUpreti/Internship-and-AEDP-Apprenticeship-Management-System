"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Clock,
  ChevronRight,
  FileText,
  Download,
  AlertCircle,
  ShieldCheck,
  Building2,
  Calendar,
  ExternalLink,
  BookOpen,
  Check,
  FileCheck,
  Send,
  HelpCircle,
  X
} from "lucide-react";

export default function StudentCreditsPage() {
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedDossier, setSelectedDossier] = useState(null);

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

      {/* Breadcrumb & Registrar Certification */}
      <section className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/student" className="hover:text-orange-400 transition-colors">
            Student Portal
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-orange-400 font-medium">Academic Credits & Practicum Tracker</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="font-medium">Registrar Ledger Verified · Fall 2025 Audit Cycle</span>
        </div>
      </section>

      {/* Header */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shadow-inner">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Academic Practicum & Co-op Credits
                </h1>
                <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-orange-400 border border-white/10 font-bold">
                  BS CS Co-op Honors
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                Track undergraduate academic credit units accrued through verified internship placements, co-ops, and practicum seminars.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => showToast("Generating Official Transcript Proof PDF with Registrar Digital Seal...")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Audit PDF
          </button>
          <button
            onClick={() => showToast("Credit petition workflow initiated. Routing to Academic Advisory Committee.")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium text-xs sm:text-sm shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
          >
            <Send className="w-4 h-4" />
            Request Credit Transfer
          </button>
        </div>
      </section>

      {/* 4 Bento KPI Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Metric 1: Total Credits Earned */}
        <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Total Credits Earned
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              75% Complete
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white tracking-tight">18.0</span>
              <span className="text-sm font-medium text-gray-400">/ 24.0 Units</span>
            </div>
            <p className="text-xs text-emerald-400/90 mt-1.5 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified by University Registrar
            </p>
          </div>
        </div>

        {/* Metric 2: Credits Required */}
        <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Credits Required
            </span>
            <Award className="w-4 h-4 text-gray-400" />
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white tracking-tight">24.0</span>
              <span className="text-sm font-medium text-gray-400">Units</span>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              Degree Honor Co-op Track Target
            </p>
          </div>
        </div>

        {/* Metric 3: Remaining Credits */}
        <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Remaining Credits
            </span>
            <Clock className="w-4 h-4 text-orange-400" />
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-orange-400 tracking-tight">6.0</span>
              <span className="text-sm font-medium text-gray-400">Units</span>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              Target completion: Fall 2025 semester
            </p>
          </div>
        </div>

        {/* Metric 4: Pending In Review */}
        <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Pending In Review
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
              Under Review
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-amber-400 tracking-tight">4.0</span>
              <span className="text-sm font-medium text-gray-400">Units</span>
            </div>
            <p className="text-xs text-gray-400 mt-1.5 truncate">
              Spring 2025 Stripe Co-op Dossier
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Completion Horizon (Segmented Multi-Color Bar) */}
      <section className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white">Curriculum Completion Horizon</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Visual distribution across practicum, domain electives, pending reviews, and remaining balance.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-500" />
              <span className="text-gray-300">14.0 Approved Practicum</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-orange-500" />
              <span className="text-gray-300">4.0 Specialization</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-amber-400" />
              <span className="text-gray-300">4.0 Pending Review</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-white/15" />
              <span className="text-gray-500">2.0 Unfulfilled</span>
            </div>
          </div>
        </div>

        {/* The Multi-Segment Bar */}
        <div className="w-full bg-white/5 h-4 rounded-xl overflow-hidden flex p-0.5 gap-0.5">
          <div
            className="bg-emerald-500 h-full rounded-l-lg transition-all duration-500 hover:brightness-110 cursor-pointer"
            style={{ width: "58.3%" }}
            title="14.0 Approved Practicum Units (58.3%)"
          />
          <div
            className="bg-orange-500 h-full transition-all duration-500 hover:brightness-110 cursor-pointer"
            style={{ width: "16.7%" }}
            title="4.0 Specialization Elective Units (16.7%)"
          />
          <div
            className="bg-amber-400 h-full transition-all duration-500 hover:brightness-110 cursor-pointer"
            style={{ width: "16.7%" }}
            title="4.0 Units Pending Faculty Committee Review (16.7%)"
          />
          <div
            className="bg-white/15 h-full rounded-r-lg transition-all duration-500"
            style={{ width: "8.3%" }}
            title="2.0 Units Remaining Unfulfilled (8.3%)"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 font-mono pt-1">
          <span>0.0 Units</span>
          <span>6.0 Units</span>
          <span>12.0 Units</span>
          <span>18.0 Units (Current Approved)</span>
          <span className="text-orange-400 font-bold">24.0 Units Target</span>
        </div>
      </section>

      {/* Credit Breakdown by Category (4 Verticals) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Credit Breakdown by Category</h2>
            <p className="text-xs text-gray-400">
              Accreditation buckets mandated for the BS Computer Science experiential track.
            </p>
          </div>
          <span className="text-xs text-orange-400 font-mono">4 Core Verticals</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Vertical 1: Engineering Practicum */}
          <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Requirement Fulfilled
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">100%</span>
              </div>
              <h3 className="text-sm font-bold text-white mt-3">Engineering Practicum (Core Co-op)</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Verified full-time technical software immersion via Stripe & Datadog co-ops.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Progress:</span>
                <span className="text-white font-mono font-medium">12.0 / 12.0 Units</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "100%" }} />
              </div>
            </div>
          </div>

          {/* Vertical 2: Technical Domain Specialization */}
          <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  In Progress
                </span>
                <span className="text-xs font-mono text-orange-400 font-bold">66%</span>
              </div>
              <h3 className="text-sm font-bold text-white mt-3">Technical Domain Specialization</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Distributed systems elective track. 2.0 units currently being fulfilled.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Progress:</span>
                <span className="text-white font-mono font-medium">4.0 / 6.0 Units</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: "66.6%" }} />
              </div>
            </div>
          </div>

          {/* Vertical 3: Professional Practice & Seminar */}
          <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Requirement Fulfilled
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">100%</span>
              </div>
              <h3 className="text-sm font-bold text-white mt-3">Professional Practice & Seminar</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                ENGR-490 Engineering Ethics, Technical Communication, and Legal Frameworks.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Progress:</span>
                <span className="text-white font-mono font-medium">2.0 / 2.0 Units</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "100%" }} />
              </div>
            </div>
          </div>

          {/* Vertical 4: Capstone Applied Research */}
          <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Pending Review
                </span>
                <span className="text-xs font-mono text-amber-400 font-bold">0%</span>
              </div>
              <h3 className="text-sm font-bold text-white mt-3">Capstone Applied Research</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Industrial thesis project. 4.0 units submitted for faculty committee appraisal.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Progress:</span>
                <span className="text-white font-mono font-medium">0.0 / 4.0 Units</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: "0%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pending Credit Approvals Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Pending Credit Approvals</h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
                2 Actions In Flight
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Awaiting Dean, Registrar, or Faculty Sponsor sign-off
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Card 1: Stripe Backend Engineering Practicum */}
          <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold">
                    CS-COOP 401
                  </span>
                  <h3 className="text-base font-bold text-white mt-2">
                    Stripe, Inc. — Backend Engineering Practicum
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Distributed Infrastructure & Event Relays (Summer 2025)
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-orange-400">4.0 Units</div>
                  <span className="text-[11px] text-gray-500">480 verified work hours</span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
                <div className="flex justify-between items-center text-gray-400">
                  <span>Faculty Verifier:</span>
                  <span className="text-white font-medium">Prof. Elena Rostova & Marcus Vance</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>Submission Date:</span>
                  <span className="text-gray-300 font-mono">July 20, 2025</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>Current Review Stage:</span>
                  <span className="text-amber-400 font-medium">Faculty Committee Review (Step 3 of 4)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <button
                onClick={() => {
                  setSelectedDossier({
                    title: "Stripe, Inc. — Backend Engineering Practicum (CS-COOP 401)",
                    units: "4.0 Academic Units",
                    hours: "480 Billable Hours",
                    sponsors: "Prof. Elena Rostova (EECS Chair), Marcus Vance (Host Supervisor)",
                    submitted: "July 20, 2025",
                    deliverables: [
                      "Distributed Kafka Event Ingestion System architecture document",
                      "Midterm Technical Defense presentation slide deck (Satisfactory)",
                      "SEVIS DSO Compliant Bi-Weekly Timesheet logs (Weeks 1-6)"
                    ]
                  });
                }}
                className="text-xs font-semibold text-orange-400 hover:text-orange-300 hover:underline flex items-center gap-1"
              >
                View Submission Dossier →
              </button>
              <button
                onClick={() => showToast("Request to amend submission submitted to Faculty Sponsor.")}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs transition-colors"
              >
                Withdraw & Resubmit
              </button>
            </div>
          </div>

          {/* Card 2: Prior Learning & Open Source Contribution Credit */}
          <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                    EECS-SPEC 395
                  </span>
                  <h3 className="text-base font-bold text-white mt-2">
                    Prior Learning & Open Source Contribution Credit
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Apache Kafka / Envoy Core Contributor Credit Petition
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-amber-400">2.0 Units</div>
                  <span className="text-[11px] text-gray-500">Peer Reviewed</span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
                <div className="flex justify-between items-center text-gray-400">
                  <span>Verifier:</span>
                  <span className="text-white font-medium">Academic Standards Registrar</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>Submission Date:</span>
                  <span className="text-gray-300 font-mono">July 12, 2025</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>Current Review Stage:</span>
                  <span className="text-amber-400 font-medium">Registrar Stage 2 Sign-off</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <button
                onClick={() => {
                  setSelectedDossier({
                    title: "Prior Learning & OSS Contribution (EECS-SPEC 395)",
                    units: "2.0 Academic Units",
                    hours: "240 Research Hours equivalent",
                    sponsors: "Academic Standards Registrar Committee",
                    submitted: "July 12, 2025",
                    deliverables: [
                      "Merged pull requests in Apache Kafka (KIP-890)",
                      "Letter of recommendation from Apache Software Foundation PMC member",
                      "Course equivalency syllabus map approved by CS Dept."
                    ]
                  });
                }}
                className="text-xs font-semibold text-orange-400 hover:text-orange-300 hover:underline flex items-center gap-1"
              >
                View Submission Dossier →
              </button>
              <button
                onClick={() => showToast("Connecting with Academic Advisor Dr. Lisa Wong...")}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs transition-colors"
              >
                Contact Advisor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Completed Credit Ledger Section */}
      <section className="rounded-2xl bg-[#1c1c1c] border border-white/10 overflow-hidden">
        <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white">Completed Credit Ledger</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                18.0 Total Verified
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Certified practicum logs endorsed by the Registrar Office and Faculty Council.
            </p>
          </div>

          <button
            onClick={() => showToast("Downloading complete historical transcripts with cryptographic signatures...")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium border border-white/10 transition-colors self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" /> Export Certified Ledger CSV
          </button>
        </div>

        <div className="divide-y divide-white/5">
          {/* Record 1: Datadog */}
          <div className="p-5 hover:bg-white/[0.02] transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h4 className="text-sm font-bold text-white">
                  Datadog, Inc. — Distributed Systems Co-op (Fall 2024)
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  6.0 Credits Earned
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400">
                  Grade: Satisfactory (Honors)
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Course: CS-COOP 301 · High-throughput telemetry pipeline instrumentation · 480 verified hours
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500 pt-1 font-mono">
                <span>Certified on Dec 18, 2024</span>
                <span>Registrar Seal: #REG-88219</span>
                <span>Verified by: Prof. David K. Miller</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => showToast("Downloading Transcript Proof PDF for Datadog Co-op...")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-orange-400 hover:text-orange-300 text-xs font-medium border border-white/10 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download Transcript Proof
              </button>
            </div>
          </div>

          {/* Record 2: Ember Engineering */}
          <div className="p-5 hover:bg-white/[0.02] transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h4 className="text-sm font-bold text-white">
                  Ember Engineering — Infrastructure Practicum (Summer 2024)
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  6.0 Credits Earned
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400">
                  Grade: Satisfactory
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Course: CS-COOP 201 · Cloud-native orchestration & Kubernetes autoscaling · 480 verified hours
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500 pt-1 font-mono">
                <span>Certified on Aug 25, 2024</span>
                <span>Registrar Seal: #REG-74012</span>
                <span>Supervisor: Dr. Karen Vance</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => showToast("Downloading Transcript Proof PDF for Ember Engineering Practicum...")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-orange-400 hover:text-orange-300 text-xs font-medium border border-white/10 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download Transcript Proof
              </button>
            </div>
          </div>

          {/* Record 3: ENGR-490 */}
          <div className="p-5 hover:bg-white/[0.02] transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h4 className="text-sm font-bold text-white">
                  ENGR-490 — Professional Engineering Ethics & Seminar
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  2.0 Credits Earned
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400">
                  Grade: Pass
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Experiential learning curriculum requirement · Software engineering safety, IP, and whistleblower policies
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500 pt-1 font-mono">
                <span>Certified on May 10, 2024</span>
                <span>Registrar Seal: #REG-61904</span>
                <span>Dept: Engineering Council</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => showToast("Downloading Transcript Proof PDF for ENGR-490 Ethics Seminar...")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-orange-400 hover:text-orange-300 text-xs font-medium border border-white/10 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download Transcript Proof
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Experiential Practicum Accreditation Guidelines Callout */}
      <section className="p-5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-transparent to-amber-500/10 border border-orange-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 shrink-0 mt-0.5">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              ABET Criterion 5 Experiential Accreditation Standards
            </h4>
            <p className="text-xs text-gray-400 mt-1 max-w-3xl leading-relaxed">
              Every 120 verified work hours conducted during an approved industrial practicum equals 1.0 degree academic unit. A maximum of 24.0 practicum credits may count toward total graduation unit fulfillment.
            </p>
          </div>
        </div>

        <a
          href="#"
          className="text-xs font-semibold text-orange-400 hover:text-orange-300 whitespace-nowrap flex items-center gap-1 self-start sm:self-auto"
        >
          View ABET Syllabus Guide <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </section>

      {/* ================= MODAL: View Submission Dossier ================= */}
      {selectedDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-xs font-mono uppercase text-orange-400 font-bold">Credit Dossier</span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedDossier.title}</h3>
              </div>
              <button
                onClick={() => setSelectedDossier(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-gray-400">Claimed Credit</span>
                <div className="text-white font-bold mt-1">{selectedDossier.units}</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-gray-400">Verified Work Hours</span>
                <div className="text-white font-bold mt-1">{selectedDossier.hours}</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 col-span-2">
                <span className="text-gray-400">Review Committee & Sponsors</span>
                <div className="text-white font-medium mt-1">{selectedDossier.sponsors}</div>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-gray-300">Submitted Deliverables</span>
              <ul className="mt-2 space-y-2 text-xs text-gray-400">
                {selectedDossier.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-black/30 border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button
                onClick={() => setSelectedDossier(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium"
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  setSelectedDossier(null);
                  showToast("Downloading full submission package ZIP...");
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium shadow"
              >
                Download Package ZIP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
