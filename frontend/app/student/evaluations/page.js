"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Star,
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
  UserCheck,
  Send,
  HelpCircle,
  X,
  Sparkles,
  Check,
  MessageSquare,
  FileCheck2,
  ArrowRight
} from "lucide-react";

export default function StudentEvaluationsPage() {
  const [toastMessage, setToastMessage] = useState(null);
  const [isSelfEvalOpen, setIsSelfEvalOpen] = useState(false);
  const [selectedDossier, setSelectedDossier] = useState(null);

  // Self-evaluation submission state
  const [selfEvalSubmitted, setSelfEvalSubmitted] = useState(false);
  const [selfEvalForm, setSelfEvalForm] = useState({
    technicalScore: 5,
    communicationScore: 4,
    problemSolvingScore: 5,
    ownershipScore: 5,
    reflectionText: "During the first 6 weeks at Stripe, I led the distributed event deduplication service in Go and Kafka. I successfully resolved partition rebalance latency and coordinated with host supervisor Marcus Vance.",
    goalsText: "For the remaining 6 weeks, I aim to implement Envoy lua filter rate limiting and conduct an architecture defense with Prof. Elena Rostova."
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelfEvalSubmit = (e) => {
    e.preventDefault();
    setSelfEvalSubmitted(true);
    setIsSelfEvalOpen(false);
    showToast("Self-Evaluation successfully submitted! Sent to Prof. Elena Rostova and Marcus Vance.");
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

      {/* Breadcrumb & Institutional Context */}
      <section className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/student" className="hover:text-orange-400 transition-colors">
            Student Portal
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-gray-200">Performance & Academics</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-orange-400 font-medium">My Evaluations</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="font-medium">Accreditation Audit Cycle · Spring 2025</span>
        </div>
      </section>

      {/* Header */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shadow-inner">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  My Evaluations
                </h1>
                <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-orange-400 border border-white/10 font-bold">
                  Term: Spring 2025
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                Track supervisor reviews, faculty assessments, practicum grading timelines, and submit required student self-evaluations.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => showToast("Exporting comprehensive evaluation dossiers PDF...")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Dossier PDF
          </button>
          {!selfEvalSubmitted && (
            <button
              onClick={() => setIsSelfEvalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium text-xs sm:text-sm shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4" />
              + Complete Self-Evaluation
            </button>
          )}
        </div>
      </section>

      {/* 4 Bento KPI Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Supervisor Evaluation */}
        <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Supervisor Evaluation
            </span>
            <span className="p-1 rounded bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-white tracking-tight">
              Submitted & Released
            </div>
            <p className="text-xs text-emerald-400 mt-1">
              Stripe Mid-term 98% • Datadog Final 100%
            </p>
            <div className="mt-2 text-[11px] text-gray-500 border-t border-white/5 pt-2">
              2 Completed Reports Released
            </div>
          </div>
        </div>

        {/* Metric 2: Faculty Assessment */}
        <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Faculty Assessment
            </span>
            <span className="p-1 rounded bg-amber-500/10 text-amber-400">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-amber-400 tracking-tight">
              In Review
            </div>
            <p className="text-xs text-gray-300 mt-1">
              Prof. Elena Rostova reviewing coursework artifacts
            </p>
            <div className="mt-2 text-[11px] text-gray-500 border-t border-white/5 pt-2">
              Expected Release: July 28, 2025
            </div>
          </div>
        </div>

        {/* Metric 3: Self-Evaluation */}
        <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Self-Evaluation
            </span>
            {selfEvalSubmitted ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Submitted
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 animate-pulse">
                Action Required
              </span>
            )}
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-white tracking-tight">
              {selfEvalSubmitted ? "Completed" : "Action Required"}
            </div>
            <p className="text-xs text-gray-300 mt-1">
              {selfEvalSubmitted
                ? "Self-reflection submitted to faculty committee"
                : "Mid-Term Spring 2025 reflection due in 3 days"}
            </p>
            <div className="mt-2 text-[11px] text-gray-500 border-t border-white/5 pt-2">
              {selfEvalSubmitted ? "Under Committee Review" : "Deadline: Friday 5:00 PM EST"}
            </div>
          </div>
        </div>

        {/* Metric 4: Cumulative Practicum Rating */}
        <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Cumulative Rating
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-white tracking-tight">4.88</span>
              <span className="text-sm font-medium text-gray-400">/ 5.00</span>
            </div>
            <p className="text-xs text-emerald-400 mt-1 font-medium">
              Top 3% percentile in EECS Practicum cohort
            </p>
            <div className="mt-2 text-[11px] text-gray-500 border-t border-white/5 pt-2">
              Based on 3 Certified Evaluation Rubrics
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Action Banner (Self-Evaluation Prompt) */}
      {!selfEvalSubmitted && (
        <section className="p-5 rounded-2xl bg-gradient-to-r from-orange-500/15 via-[#221c17] to-[#1c1c1c] border-l-4 border-l-orange-500 border-y border-r border-orange-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-orange-500 text-black font-bold">
                Action Required
              </span>
              <span className="text-xs text-orange-400 font-medium">Practicum Step 2 of 5</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Pending: Spring 2025 Stripe Co-op Mid-Term Self-Reflection
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              Your supervisor (Marcus Vance) has already recorded your mid-term technical metrics. You must submit your self-appraisal rubric and reflection essay before <strong>Friday 5:00 PM EST</strong> to unlock official course credit.
            </p>
          </div>

          <button
            onClick={() => setIsSelfEvalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-orange-500/25 transition-all whitespace-nowrap self-start md:self-auto flex items-center gap-2"
          >
            Complete Self-Evaluation Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      )}

      {/* Active Evaluation Cycle (5 Checkpoints) */}
      <section className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold text-white">
              Active Evaluation Cycle: Spring 2025 (Stripe, Inc.)
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Progress tracker across required institutional evaluation checkpoints.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Cycle Progress:</span>
            <span className="text-xs font-mono font-bold text-orange-400 px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">
              {selfEvalSubmitted ? "60% Complete" : "40% Complete"}
            </span>
          </div>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {/* Step 1 */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Step 1</span>
              <Check className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-xs font-bold text-white">Work Period Logged</h4>
            <p className="text-[11px] text-gray-400 leading-snug">
              240.0+ verified hours approved by Marcus Vance.
            </p>
            <span className="inline-block text-[10px] text-emerald-400 font-medium">Completed</span>
          </div>

          {/* Step 2 */}
          <div
            className={`p-3.5 rounded-xl border space-y-2 ${
              selfEvalSubmitted
                ? "bg-black/40 border-emerald-500/30"
                : "bg-orange-500/10 border-orange-500/40"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-orange-400 font-bold uppercase">Step 2</span>
              {selfEvalSubmitted ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              )}
            </div>
            <h4 className="text-xs font-bold text-white">Self-Evaluation</h4>
            <p className="text-[11px] text-gray-400 leading-snug">
              {selfEvalSubmitted
                ? "Self-reflection submitted to faculty committee."
                : "Student reflection essay & rubric ratings."}
            </p>
            <span
              className={`inline-block text-[10px] font-semibold ${
                selfEvalSubmitted ? "text-emerald-400" : "text-orange-400"
              }`}
            >
              {selfEvalSubmitted ? "Submitted" : "Action Required"}
            </span>
          </div>

          {/* Step 3 */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Step 3</span>
              <Check className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-xs font-bold text-white">Supervisor Review</h4>
            <p className="text-[11px] text-gray-400 leading-snug">
              Host mentor completed ratings (Midterm Score 98%).
            </p>
            <span className="inline-block text-[10px] text-emerald-400 font-medium">Completed</span>
          </div>

          {/* Step 4 */}
          <div className="p-3.5 rounded-xl bg-black/20 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-gray-500 font-bold uppercase">Step 4</span>
              <Clock className="w-3.5 h-3.5 text-gray-500" />
            </div>
            <h4 className="text-xs font-bold text-gray-300">Faculty Review</h4>
            <p className="text-[11px] text-gray-500 leading-snug">
              Prof. Elena Rostova cross-evaluation & academic grading.
            </p>
            <span className="inline-block text-[10px] text-gray-500">Pending Step 2</span>
          </div>

          {/* Step 5 */}
          <div className="p-3.5 rounded-xl bg-black/20 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-gray-500 font-bold uppercase">Step 5</span>
              <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
            </div>
            <h4 className="text-xs font-bold text-gray-300">Credit Transcripts</h4>
            <p className="text-[11px] text-gray-500 leading-snug">
              4.0 Units deposited into academic transcript.
            </p>
            <span className="inline-block text-[10px] text-gray-500">Final Release</span>
          </div>
        </div>
      </section>

      {/* Official Records & Released Scores Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Official Records & Released Scores</h2>
            <p className="text-xs text-gray-400">
              Certified evaluation dossiers completed by site supervisors and practicum faculty.
            </p>
          </div>
          <span className="text-xs text-orange-400 font-mono">Showing: 3 Records</span>
        </div>

        {/* Dossier 1: Datadog */}
        <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/30 transition-all space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center font-bold">
                DD
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white">
                    Datadog, Inc. — Final Comprehensive Co-op Evaluation
                  </h4>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    Official Release
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Supervisor: David Miller · Term: Fall 2024 · Course: CS-COOP 301
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400" />
                4.9 / 5.0
              </div>
              <button
                onClick={() => showToast("Downloading Datadog Evaluation Report with cryptographic signature...")}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Rubric Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <span className="text-gray-400">Technical Competence</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-base font-bold text-white">5.0</span>
                <span className="text-[10px] text-gray-500">/ 5.0</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full mt-1.5">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "100%" }} />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <span className="text-gray-400">Communication & Collab</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-base font-bold text-white">4.8</span>
                <span className="text-[10px] text-gray-500">/ 5.0</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full mt-1.5">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "96%" }} />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <span className="text-gray-400">Architecture & Problem Solving</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-base font-bold text-white">5.0</span>
                <span className="text-[10px] text-gray-500">/ 5.0</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full mt-1.5">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "100%" }} />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <span className="text-gray-400">Professional Conduct</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-base font-bold text-white">4.9</span>
                <span className="text-[10px] text-gray-500">/ 5.0</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full mt-1.5">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "98%" }} />
              </div>
            </div>
          </div>

          {/* Supervisor Narrative */}
          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1.5 text-xs">
            <span className="font-semibold text-gray-300">Supervisor Qualitative Narrative:</span>
            <p className="text-gray-400 leading-relaxed italic">
              "Alex demonstrated exceptional systems engineering maturity throughout the telemetry pipeline rewrite. His design for partitioned Kafka ingestion saved our team an estimated 15% in infrastructure costs during spike events. His technical writing and standup communication were on par with senior engineering hires."
            </p>
          </div>
        </div>

        {/* Dossier 2: Ember Engineering */}
        <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/30 transition-all space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center font-bold">
                EE
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white">
                    Ember Engineering — Summer 2024 Practicum Assessment
                  </h4>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    Official Release
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Supervisor: Dr. Karen Vance · Term: Summer 2024 · Course: CS-COOP 201
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400" />
                4.8 / 5.0
              </div>
              <button
                onClick={() => showToast("Downloading Ember Engineering Evaluation Report...")}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1.5 text-xs">
            <span className="font-semibold text-gray-300">Supervisor Qualitative Narrative:</span>
            <p className="text-gray-400 leading-relaxed italic">
              "Alex rapidly familiarized himself with our Kubernetes cluster architecture and contributed substantial improvements to our deployment CI/CD manifests. Recommended without reservation for advanced practicum honors."
            </p>
          </div>
        </div>

        {/* Dossier 3: ENGR-490 Ethics */}
        <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-white">
                ENGR-490 Practicum Ethics & Professional Practice Assessment
              </h4>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                Pass (Honors)
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Evaluator: University Engineering Council Committee · Spring 2024 · Final Capstone Defense: 100/100
            </p>
          </div>

          <button
            onClick={() => showToast("Downloading ENGR-490 Faculty Endorsement Certificate...")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-orange-400 hover:text-orange-300 text-xs font-medium border border-white/10 transition-colors self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            Download Endorsement
          </button>
        </div>
      </section>

      {/* Policy & Dispute Footer */}
      <footer className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-orange-400 shrink-0" />
          <span>
            <strong>Evaluation Dispute & Review Policy:</strong> All practicum evaluations remain open for student review and dispute within 14 calendar days of faculty release.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-orange-400 transition-colors">Faculty Handbook</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Rubric Standards</a>
        </div>
      </footer>

      {/* ================= MODAL: Complete Self-Evaluation ================= */}
      {isSelfEvalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Student Mid-Term Self-Evaluation</h2>
                  <p className="text-xs text-gray-400">
                    Spring 2025 Stripe Co-op · Course CS-COOP 401
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSelfEvalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSelfEvalSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
              <p className="text-gray-300 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">
                Evaluate your personal technical and professional performance across the mid-term co-op period. These scores and narratives will be paired with host supervisor Marcus Vance's review and submitted to EECS Faculty Chair Prof. Elena Rostova.
              </p>

              {/* Rubric Rating Rows */}
              <div className="space-y-3">
                <span className="font-semibold text-white block">Self-Appraisal Competency Rubrics (1-5 Scale)</span>

                {/* Rating 1: Technical Execution */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                  <div>
                    <div className="font-medium text-white">Technical Execution & Code Quality</div>
                    <div className="text-[11px] text-gray-400">Design, testing coverage, algorithm efficiency</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setSelfEvalForm({ ...selfEvalForm, technicalScore: star })}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            star <= selfEvalForm.technicalScore
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 font-mono font-bold text-white text-xs">
                      {selfEvalForm.technicalScore}.0
                    </span>
                  </div>
                </div>

                {/* Rating 2: Communication */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                  <div>
                    <div className="font-medium text-white">Communication & Team Collaboration</div>
                    <div className="text-[11px] text-gray-400">Standups, technical documentation, design docs</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setSelfEvalForm({ ...selfEvalForm, communicationScore: star })}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            star <= selfEvalForm.communicationScore
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 font-mono font-bold text-white text-xs">
                      {selfEvalForm.communicationScore}.0
                    </span>
                  </div>
                </div>

                {/* Rating 3: Problem Solving */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                  <div>
                    <div className="font-medium text-white">Problem Solving & Autonomy</div>
                    <div className="text-[11px] text-gray-400">Debugging distributed edge-cases, unblocking tasks</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setSelfEvalForm({ ...selfEvalForm, problemSolvingScore: star })}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            star <= selfEvalForm.problemSolvingScore
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 font-mono font-bold text-white text-xs">
                      {selfEvalForm.problemSolvingScore}.0
                    </span>
                  </div>
                </div>
              </div>

              {/* Textarea 1: Accomplishments */}
              <div>
                <label className="block text-gray-300 font-medium mb-1.5">
                  Mid-Term Deliverables & Key Technical Highlights <span className="text-orange-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={selfEvalForm.reflectionText}
                  onChange={(e) => setSelfEvalForm({ ...selfEvalForm, reflectionText: e.target.value })}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Textarea 2: Second Half Goals */}
              <div>
                <label className="block text-gray-300 font-medium mb-1.5">
                  Objectives & Learning Goals for Second Half <span className="text-orange-400">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={selfEvalForm.goalsText}
                  onChange={(e) => setSelfEvalForm({ ...selfEvalForm, goalsText: e.target.value })}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsSelfEvalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/20"
                >
                  Submit to Faculty Review Committee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
