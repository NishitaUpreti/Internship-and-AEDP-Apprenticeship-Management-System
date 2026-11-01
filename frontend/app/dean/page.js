"use client";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Building2,
  Award,
  Users,
  FileCheck2,
  DownloadCloud,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import StatCard from "../components/StatCard";

export default function DeanDashboard() {
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
      {/* Executive Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Institutional AEDP Governance
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Office of the Dean · Academic Affairs & UGC AEDP Regulatory Compliance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold transition-colors">
            <DownloadCloud size={16} /> Export NAAC / UGC Dossier
          </button>
        </div>
      </div>

      {/* High-Level Institutional KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total AEDP Cohort"
          value="1,240"
          description="Active across 6 departments"
        />
        <StatCard
          title="Industry Partners"
          value="94"
          description="Verified employer registry"
        />
        <StatCard
          title="Credit Hours Logged"
          value="74,500"
          description="National Credit Framework mapped"
        />
        <StatCard
          title="Tripartite Compliance"
          value="98.4%"
          description="Legally executed agreements"
        />
      </div>

      {/* Department Breakdown & Audit Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Departmental Work-Based Learning Progress</h3>
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
              <CheckCircle2 size={14} /> Audit Ready
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-800 text-gray-400 text-xs font-semibold">
                <tr>
                  <th className="pb-3">Academic Department</th>
                  <th className="pb-3">Students</th>
                  <th className="pb-3">Placement %</th>
                  <th className="pb-3">Credits Granted</th>
                  <th className="pb-3">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-gray-300 text-xs">
                <tr>
                  <td className="py-3 font-medium text-white">School of Computer Science & Eng.</td>
                  <td className="py-3">142</td>
                  <td className="py-3 text-emerald-400 font-semibold">92%</td>
                  <td className="py-3 font-mono">1,136 cr</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">99.1%</span></td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-white">Electronics & Communication</td>
                  <td className="py-3">98</td>
                  <td className="py-3 text-emerald-400 font-semibold">86%</td>
                  <td className="py-3 font-mono">784 cr</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">97.4%</span></td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-white">Mechanical & Automation</td>
                  <td className="py-3">75</td>
                  <td className="py-3 text-orange-400 font-semibold">78%</td>
                  <td className="py-3 font-mono">600 cr</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">96.0%</span></td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-white">Management Studies (BBA/MBA)</td>
                  <td className="py-3">110</td>
                  <td className="py-3 text-emerald-400 font-semibold">94%</td>
                  <td className="py-3 font-mono">880 cr</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">98.8%</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* NCrF Governance Card */}
        <div className="lg:col-span-1 bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
              <Award size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">National Credit Framework (NCrF) Gate</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              UGC Mandate: 30 hours of verified, assessed industry workplace learning converts to 1 academic credit. Maximum semester cap: 16 credits.
            </p>

            <div className="mt-5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Total Credits Mapped</span>
                <span className="text-white font-mono font-semibold">3,400 credits</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: "88%" }}></div>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Verified hours mapped</span>
                <span>88% of target</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-800">
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck size={16} /> Framework v2.4 Active & Sealed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

