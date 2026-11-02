"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Clock,
  Download,
  Calendar,
  Building,
  GraduationCap,
  CheckCircle2,
  Filter,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

export default function EmployerAnalyticsPage() {
  const [cohortFilter, setCohortFilter] = useState("summer_2025");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3600);
  };

  // Funnel Stage Progression Data
  const funnelStages = [
    { name: "Total Applicants Received", count: 1482, pct: "100%", drop: null, color: "bg-blue-500" },
    { name: "Passed Screening Review", count: 538, pct: "36.3%", drop: "-63.7%", color: "bg-sky-500" },
    { name: "Shortlisted for Hiring Teams", count: 222, pct: "15.0%", drop: "-21.3%", color: "bg-purple-500" },
    { name: "Assigned & Conducted Interviews", count: 86, pct: "5.8%", drop: "-9.2%", color: "bg-orange-500" },
    { name: "Selected by Committee for Offer", count: 32, pct: "2.2%", drop: "-3.6%", color: "bg-amber-500" },
    { name: "Formal Offers Dispatched", count: 24, pct: "1.6%", drop: "-0.6%", color: "bg-emerald-500" },
    { name: "Offers Signed & Accepted", count: 18, pct: "1.2%", drop: "75% Yield", color: "bg-green-400" }
  ];

  // University Feeder Sources
  const universityFeeders = [
    { school: "Stanford University", applicants: 342, interviews: 22, accepted: 5, yieldRate: "83%", topMajor: "MS Computer Science" },
    { school: "MIT", applicants: 288, interviews: 18, accepted: 4, yieldRate: "80%", topMajor: "PhD AI Lab" },
    { school: "Graphic Era University (GEU)", applicants: 264, interviews: 16, accepted: 4, yieldRate: "80%", topMajor: "B.Tech Computer Science" },
    { school: "UC Berkeley", applicants: 218, interviews: 12, accepted: 2, yieldRate: "67%", topMajor: "BS EECS" },
    { school: "Carnegie Mellon University", applicants: 195, interviews: 10, accepted: 2, yieldRate: "67%", topMajor: "B.Des HCI" },
    { school: "University of Waterloo", applicants: 175, interviews: 8, accepted: 1, yieldRate: "50%", topMajor: "Software Engineering Co-op" }
  ];

  // Department Allocation Matrix
  const departmentBreakdown = [
    { dept: "Distributed Systems Engineering", activeInterns: 6, mentors: 3, budgetSpent: "$62,400", avgScore: "4.85 / 5.0" },
    { dept: "AI & Foundation Models Research", activeInterns: 4, mentors: 2, budgetSpent: "$48,000", avgScore: "4.92 / 5.0" },
    { dept: "Product Design & Design Systems", activeInterns: 4, mentors: 2, budgetSpent: "$36,800", avgScore: "4.75 / 5.0" },
    { dept: "Cloud Infrastructure & SRE", activeInterns: 4, mentors: 2, budgetSpent: "$35,200", avgScore: "4.70 / 5.0" }
  ];

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
            <span className="text-gray-300">Analytics &amp; Reports</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Recruitment Yield &amp; Cohort Analytics
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Real-time pipeline velocity, conversion drop-off benchmarks, university talent distribution, and academic compliance audits.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={cohortFilter}
            onChange={(e) => setCohortFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-300 focus:outline-none focus:border-orange-500 cursor-pointer"
          >
            <option value="summer_2025">Cohort: Summer 2025</option>
            <option value="spring_2025">Cohort: Spring 2025</option>
            <option value="fall_2024">Cohort: Fall 2024</option>
          </select>
          <button
            onClick={() => showToast("Exporting comprehensive executive report (PDF & CSV)...")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Analytics Dossier</span>
          </button>
        </div>
      </section>

      {/* 4 Metric Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Offer Acceptance Yield", val: "75.0%", sub: "+4.2% vs. industry baseline", color: "text-emerald-400" },
          { title: "Avg. Time-to-Hire Velocity", val: "18.4 Days", sub: "Fastest quartile across partners", color: "text-orange-400" },
          { title: "Total Candidate Ingestion", val: "1,482", sub: "Across 24 university partners", color: "text-white" },
          { title: "Cohort Completion Rate", val: "100%", sub: "Zero attrition • All credits on-track", color: "text-amber-400" }
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

      {/* Funnel Velocity & Drop-Off Visualization */}
      <section className="p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              <span>Pipeline Stage Progression &amp; Funnel Drop-off</span>
            </h2>
            <p className="text-xs text-gray-400">
              Progression efficiency through intake, panel calibration, and offer execution.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
            High Caliber Calibration
          </span>
        </div>

        <div className="space-y-3.5 pt-2">
          {funnelStages.map((st, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-300">{st.name}</span>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-white font-bold">{st.count.toLocaleString()}</span>
                  <span className="text-gray-400 text-[11px]">({st.pct})</span>
                  {st.drop && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-orange-400 border border-white/10">
                      {st.drop}
                    </span>
                  )}
                </div>
              </div>
              <div className="h-3 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                <div
                  className={`h-full rounded-full ${st.color} transition-all duration-700`}
                  style={{ width: st.pct }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* University Feeders & Department Headcount Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left (7 cols): University Feeder Distribution */}
        <section className="xl:col-span-7 p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-orange-400" />
                <span>Primary University Talent Feeder Distribution</span>
              </h2>
              <p className="text-xs text-gray-400">Institutional intake yields &amp; major alignment</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-3">University Partner</th>
                  <th className="py-2.5 px-3 text-center">Applicants</th>
                  <th className="py-2.5 px-3 text-center">Interviews</th>
                  <th className="py-2.5 px-3 text-center">Hires</th>
                  <th className="py-2.5 px-3 text-right">Yield Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {universityFeeders.map((u, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-white">{u.school}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{u.topMajor}</div>
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-gray-300">{u.applicants}</td>
                    <td className="py-3 px-3 text-center font-mono text-orange-400">{u.interviews}</td>
                    <td className="py-3 px-3 text-center font-mono text-emerald-400 font-bold">
                      {u.accepted}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {u.yieldRate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Right (5 cols): Department Headcount & Stipend Allocation */}
        <section className="xl:col-span-5 p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-orange-400" />
                <span>Department Allocation Matrix</span>
              </h2>
              <p className="text-xs text-gray-400">Headcount, supervisor coverage &amp; stipend budget</p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {departmentBreakdown.map((dept, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2 hover:border-orange-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{dept.dept}</span>
                  <span className="font-mono text-xs font-bold text-emerald-400">{dept.budgetSpent}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-400">
                  <span>
                    {dept.activeInterns} Interns • {dept.mentors} Mentors
                  </span>
                  <span className="text-amber-400 font-mono font-semibold">
                    Avg. Rubric: {dept.avgScore}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Tripartite Accreditation & Compliance Audit Trail */}
      <section className="p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Institutional Accreditation &amp; Audit Log</h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30">
            Fully Compliant
          </span>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed">
          All 18 active internship agreements comply with institutional academic regulations, university credit hour standards (minimum 400 certified hours per semester), and intellectual property protection agreements approved by university legal councils.
        </p>
      </section>
    </div>
  );
}