"use client";
import { useEffect, useState } from "react";
import {
  Users,
  GraduationCap,
  Award,
  Clock,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import StatCard from "../components/StatCard";

export default function HodDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome, {user?.name || "Head of Department"}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Department of {user?.department || "Computer Science & Engineering"} · AEDP Apprenticeship & Credit Governance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck size={14} /> UGC AEDP Compliant
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
            NCrF 30h:1cr Rule
          </span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Department Students"
          value="142"
          description="Enrolled in AEDP internships"
        />
        <StatCard
          title="Active Placements"
          value="88"
          description="In verified partner companies"
        />
        <StatCard
          title="Verified Work Hours"
          value="8,420"
          description="30 hrs = 1 academic credit"
        />
        <StatCard
          title="Credits Recommended"
          value="280"
          description="Awaiting dean sign-off"
        />
      </div>

      {/* Department AEDP Health & Compliance Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Alerts */}
        <div className="lg:col-span-1 bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="text-amber-400" size={20} />
            Compliance Watchlist
          </h3>
          <p className="text-xs text-gray-400 mb-4">
            Items requiring HoD attention before academic council review.
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-[#242424] rounded-xl border border-amber-500/20">
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-amber-400">Missing Tripartite Agreements</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">4 Students</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Pending employer seal & student sign-off.</p>
            </div>

            <div className="p-3 bg-[#242424] rounded-xl border border-orange-500/20">
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-orange-400">Unallocated Faculty Mentors</span>
                <span className="text-xs px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-mono">2 Students</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Students placed but faculty supervisor unassigned.</p>
            </div>

            <div className="p-3 bg-[#242424] rounded-xl border border-emerald-500/20">
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-emerald-400">Rubric Evaluations Complete</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">92%</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Industry supervisor midterm reviews submitted.</p>
            </div>
          </div>
        </div>

        {/* Programme-wise Participation */}
        <div className="lg:col-span-2 bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Programme Participation & Credit Mapping</h3>
            <span className="text-xs text-gray-400">AY 2026-2027</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-800 text-gray-400 text-xs font-semibold">
                <tr>
                  <th className="pb-3">Programme</th>
                  <th className="pb-3">Eligible</th>
                  <th className="pb-3">Placed</th>
                  <th className="pb-3">Avg Hours</th>
                  <th className="pb-3">Credit Gate Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-gray-300 text-xs">
                <tr>
                  <td className="py-3 font-medium text-white">B.Tech CSE (Core)</td>
                  <td className="py-3">80</td>
                  <td className="py-3 text-emerald-400 font-semibold">68 (85%)</td>
                  <td className="py-3">360 hrs</td>
                  <td className="py-3"><span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">On Track</span></td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-white">B.Tech CSE (AI & ML)</td>
                  <td className="py-3">45</td>
                  <td className="py-3 text-emerald-400 font-semibold">40 (88%)</td>
                  <td className="py-3">390 hrs</td>
                  <td className="py-3"><span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">On Track</span></td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-white">B.Tech CSE (Data Science)</td>
                  <td className="py-3">30</td>
                  <td className="py-3 text-orange-400 font-semibold">22 (73%)</td>
                  <td className="py-3">280 hrs</td>
                  <td className="py-3"><span className="px-2 py-1 rounded-full bg-orange-500/10 text-orange-400 font-medium">Review Needed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

