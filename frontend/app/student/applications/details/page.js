"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileCheck,
  FileText,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  UserCheck,
  XCircle,
  Building,
  Check,
  AlertTriangle,
  ChevronRight,
  Award
} from "lucide-react";

export default function ApplicationDetailsPage() {
  const [toastMessage, setToastMessage] = useState(null);
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [checklist, setChecklist] = useState({
    background: true,
    docusign: false,
    directDeposit: false,
    i9Docs: false
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  const toggleChecklist = (key) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
    showToast("Checklist requirement status updated.");
  };

  const handleAcceptOffer = () => {
    setOfferAccepted(true);
    setChecklist((prev) => ({ ...prev, docusign: true }));
    showToast("🎉 Congratulations! Formal offer accepted. Onboarding team notified.");
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-16">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-orange-600 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation & Breadcrumbs */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/student/applications/all"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Link href="/student" className="hover:text-orange-400 transition-colors">
                Student
              </Link>
              <span>/</span>
              <Link href="/student/applications/all" className="hover:text-orange-400 transition-colors">
                Applications
              </Link>
              <span>/</span>
              <span className="text-gray-300">Stripe - Backend Engineering</span>
              <span className="font-mono text-orange-400 text-[11px]">[#APP-84920]</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              Application Dossier & Offer Review
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast("Downloading official Stripe Offer Letter PDF (Signed)...")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Offer Letter (PDF)</span>
          </button>
        </div>
      </section>

      {/* Hero Header Card */}
      <section className="p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 relative overflow-hidden">
        {/* Amber Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            {/* Stripe Logo */}
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center font-bold text-2xl shrink-0 shadow-lg">
              S
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Backend Engineering &amp; Systems Co-op
                </h2>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    offerAccepted
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  }`}
                >
                  {offerAccepted ? "✓ Offer Accepted" : "★ Official Offer Received"}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-300 flex-wrap">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-orange-400" /> Stripe Inc.
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-gray-400">
                  <MapPin className="w-4 h-4 text-gray-500" /> San Francisco, CA (Hybrid 3d/wk)
                </span>
                <span>•</span>
                <span className="font-mono text-emerald-400 font-bold">$10,400 / month ($65/hr)</span>
                <span>•</span>
                <span className="text-gray-400">Term: Summer 2025 (May 26 – Aug 22)</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 shrink-0">
            {offerAccepted ? (
              <div className="px-4 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Offer Accepted &amp; Verified</span>
              </div>
            ) : (
              <>
                <button
                  onClick={() => showToast("Offer decline dialog requested. Please confirm with your advisor.")}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
                >
                  Decline Offer
                </button>
                <button
                  onClick={handleAcceptOffer}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Accept Offer</span>
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Offer Expiration Banner */}
      <section className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-black/40 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Official Offer Extended by Stripe Engineering</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Action Required
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-1">
              Your written offer is active until <strong className="text-white">May 10, 2025 at 11:59 PM PT</strong> (8 days remaining).
              Signing secures your team placement within Core Payments Ledger.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-center">
            <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Stipend Bonus</div>
            <div className="text-sm font-bold text-emerald-400 font-mono">+$2,500/mo</div>
          </div>
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-center">
            <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Relocation</div>
            <div className="text-sm font-bold text-white font-mono">$4,000 Flat</div>
          </div>
        </div>
      </section>

      {/* Main 2-Col Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Journey Stepper, Position Details, Interview Feedback */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* 1. Application Journey Stepper */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <h3 className="text-base font-bold text-white">Application Journey &amp; Progress Stepper</h3>
              </div>
              <span className="text-xs text-emerald-400 font-medium">Stage 6 of 7 • Offer Phase</span>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: "Application Submitted",
                  date: "Mar 15, 2025",
                  detail: "Submitted via Stanford Co-op Career Portal with tailored cover letter and resume.",
                  status: "completed"
                },
                {
                  step: 2,
                  title: "Resume & Transcripts Screened",
                  date: "Mar 22, 2025",
                  detail: "Candidate verified for CPT eligibility & GPA requirement (3.88 / 4.00).",
                  status: "completed"
                },
                {
                  step: 3,
                  title: "Technical Assessment (Take-home)",
                  date: "Apr 02, 2025",
                  detail: "Scored 96/100 on Distributed Rate Limiter challenge.",
                  status: "completed"
                },
                {
                  step: 4,
                  title: "First Round: Technical Systems Screen",
                  date: "Apr 15, 2025",
                  detail: "Live coding with Elena Rostova (Staff Platform Eng). Recommendation: Strong Hire.",
                  status: "completed"
                },
                {
                  step: 5,
                  title: "Final Round: Architecture & Scalable Queues",
                  date: "Apr 24, 2025",
                  detail: "System design deep dive with Marcus Vance (Principal Architect).",
                  status: "completed"
                },
                {
                  step: 6,
                  title: "Offer Letter Extended",
                  date: "May 02, 2025",
                  detail: "Formal compensation package and signing documents dispatched via DocuSign.",
                  status: offerAccepted ? "completed" : "active"
                },
                {
                  step: 7,
                  title: "Final Onboarding & First Day",
                  date: "May 26, 2025",
                  detail: "Laptop shipment, corporate identity provisioning, and Day 1 orientation.",
                  status: "upcoming"
                }
              ].map((st) => (
                <div key={st.step} className="flex items-start gap-3.5 group">
                  {/* Status Indicator */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        st.status === "completed"
                          ? "bg-emerald-500 text-white"
                          : st.status === "active"
                          ? "bg-orange-500 text-white ring-4 ring-orange-500/20 animate-pulse"
                          : "bg-white/10 text-gray-500"
                      }`}
                    >
                      {st.status === "completed" ? <Check className="w-3.5 h-3.5" /> : st.step}
                    </div>
                    {st.step !== 7 && (
                      <div
                        className={`w-0.5 h-10 my-1 ${
                          st.status === "completed" ? "bg-emerald-500/40" : "bg-white/10"
                        }`}
                      />
                    )}
                  </div>

                  <div className="flex-1 pb-3">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs sm:text-sm font-bold ${
                          st.status === "active"
                            ? "text-orange-400"
                            : st.status === "completed"
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      >
                        {st.title}
                      </h4>
                      <span className="text-[11px] font-mono text-gray-500">{st.date}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{st.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Position Specification & Mandate */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <Briefcase className="w-4 h-4 text-orange-400" />
              <h3 className="text-base font-bold text-white">Position Specification &amp; Team Mandate</h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
              <p>
                As a <strong>Backend Engineering Co-op</strong> on the Core Ledger Infrastructure team,
                you will build fault-tolerant event streaming backends and distributed transactional primitives
                responsible for multi-currency reconciliation across global banking rails.
              </p>

              <div>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  Key Practicum Responsibilities:
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-400">
                  <li>Design idempotency mechanisms and dead-letter queue retry policies in Go and Kafka.</li>
                  <li>Benchmark regional database partition rebalancing under simulated network split conditions.</li>
                  <li>Collaborate with Staff Engineers on automated audit trails compliant with SOC-2 and CPT requirements.</li>
                  <li>Participate in bi-weekly sprint planning, architecture reviews, and engineering demos.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  Technical Stack:
                </h4>
                <div className="flex items-center gap-2 flex-wrap">
                  {["Go (Golang)", "Kafka", "PostgreSQL", "Kubernetes", "gRPC / Protobuf", "Distributed Locks", "AWS"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-orange-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Interview Records & Evaluator Log */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-orange-400" />
                <h3 className="text-base font-bold text-white">Interview Records &amp; Evaluator Log</h3>
              </div>
              <span className="text-xs text-gray-400">2 Rounds Cleared</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Round 1 */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 uppercase">
                    Round 1 • Apr 15
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Cleared (4.8 / 5.0)
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Live Coding &amp; Distributed Concurrency</h4>
                <p className="text-xs text-gray-400">
                  Host: <strong className="text-gray-300">Elena Rostova</strong> (Staff Platform Eng)
                </p>
                <p className="text-xs text-gray-400 italic pt-1">
                  "Candidate demonstrated sharp intuition for race condition mitigation and clean lock granularity."
                </p>
              </div>

              {/* Round 2 */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 uppercase">
                    Round 2 • Apr 24
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Exceptional (5.0 / 5.0)
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Architecture &amp; Scalable Queues</h4>
                <p className="text-xs text-gray-400">
                  Host: <strong className="text-gray-300">Marcus Vance</strong> (Principal Architect)
                </p>
                <p className="text-xs text-gray-400 italic pt-1">
                  "Outstanding mastery of Kafka consumer rebalancing and idempotent state management."
                </p>
              </div>
            </div>

            {/* Committee Remark */}
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold text-orange-400">
                <Sparkles className="w-4 h-4" />
                <span>Official Committee Evaluation Remark:</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                "Unanimous hire recommendation across systems knowledge, communication clarity, and alignment with Stripe's operating principles."
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Quick Stats, Recruiter, Checklist, Dossier */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* 1. Quick Stats */}
          <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 pb-2 border-b border-white/10">
              Application Metadata
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Application ID:</span>
                <span className="font-mono text-white font-semibold">#APP-84920</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Submission Date:</span>
                <span className="text-white">Mar 15, 2025</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Time-to-Offer:</span>
                <span className="font-mono text-emerald-400 font-semibold">42 Days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Academic Term:</span>
                <span className="text-white">Summer 2025</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Practicum Units:</span>
                <span className="text-orange-400 font-bold">4.0 Academic Credits</span>
              </div>
            </div>
          </div>

          {/* 2. Assigned University Recruiter */}
          <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 pb-2 border-b border-white/10">
              Assigned Talent Partner
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                RT
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Rachel Thorne</h4>
                <p className="text-[11px] text-gray-400">Lead University Recruiter • Stripe</p>
                <div className="flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 mt-1 cursor-pointer">
                  <Mail className="w-3.5 h-3.5" />
                  <span>rachel-talent@stripe.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Offer Action Checklist */}
          <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Offer Checklist
              </h3>
              <span className="text-[11px] font-mono text-emerald-400">
                {Object.values(checklist).filter(Boolean).length} / 4 Completed
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <button
                onClick={() => toggleChecklist("background")}
                className="w-full text-left p-2.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center text-white ${
                      checklist.background ? "bg-emerald-500" : "border border-gray-500"
                    }`}
                  >
                    {checklist.background && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <div className="font-semibold text-white">Background Screening</div>
                    <div className="text-[10px] text-gray-400">Submitted via Checkr</div>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold">Done</span>
              </button>

              <button
                onClick={() => toggleChecklist("docusign")}
                className="w-full text-left p-2.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center text-white ${
                      checklist.docusign ? "bg-emerald-500" : "border border-gray-500"
                    }`}
                  >
                    {checklist.docusign && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <div className="font-semibold text-white">Sign Offer via DocuSign</div>
                    <div className="text-[10px] text-amber-400">Due May 10, 2025</div>
                  </div>
                </div>
                <span className="text-[10px] text-orange-400 font-semibold">Action</span>
              </button>

              <button
                onClick={() => toggleChecklist("directDeposit")}
                className="w-full text-left p-2.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center text-white ${
                      checklist.directDeposit ? "bg-emerald-500" : "border border-gray-500"
                    }`}
                  >
                    {checklist.directDeposit && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <div className="font-semibold text-white">Housing Stipend Direct Deposit</div>
                    <div className="text-[10px] text-gray-400">Enter Treasury payout info</div>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400">Pending</span>
              </button>

              <button
                onClick={() => toggleChecklist("i9Docs")}
                className="w-full text-left p-2.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center text-white ${
                      checklist.i9Docs ? "bg-emerald-500" : "border border-gray-500"
                    }`}
                  >
                    {checklist.i9Docs && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <div className="font-semibold text-white">Submit I-9 Work Auth Docs</div>
                    <div className="text-[10px] text-gray-400">Passport &amp; CPT I-20 upload</div>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400">Pending</span>
              </button>
            </div>
          </div>

          {/* 4. Submitted Application Dossier Artifacts */}
          <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 pb-2 border-b border-white/10">
              Submitted Artifacts
            </h3>

            <div className="space-y-2 text-xs">
              {[
                { name: "Nishita_Upreti_Resume_2025.pdf", size: "184 KB" },
                { name: "Stripe_Distributed_Systems_Statement.pdf", size: "92 KB" },
                { name: "Official_Academic_Transcript.pdf", size: "410 KB" },
                { name: "github.com/nishitaupreti", isLink: true }
              ].map((file, i) => (
                <div
                  key={i}
                  onClick={() => showToast(`Opening ${file.name}...`)}
                  className="p-2.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 flex items-center justify-between cursor-pointer group transition-all"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span className="text-white truncate font-medium group-hover:text-orange-400 transition-colors">
                      {file.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono shrink-0 ml-2">
                    {file.size || "External"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
