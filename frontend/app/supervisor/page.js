"use client";
import { useEffect, useState } from "react";
import { Users, Clock, ClipboardCheck, AlertTriangle, ShieldCheck } from "lucide-react";
import StatCard from "../components/StatCard";

export default function SupervisorDashboard() {
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Industry Supervisor Portal
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Welcome, {user?.name || "Industry Supervisor"} · Workplace Hour Verification & Rubric Assessment
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck size={14} /> Scoped External Mentor Access
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Interns"
          value="4"
          description="Direct workplace mentees"
        />
        <StatCard
          title="Pending Log Verifications"
          value="3"
          description="2-tap supervisor approval"
        />
        <StatCard
          title="Hours Verified"
          value="480"
          description="Across active interns"
        />
        <StatCard
          title="Evaluations Due"
          value="1"
          description="Midterm competency rubric"
        />
      </div>

      {/* Hour Verification Queue */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Pending Hour Logs for Verification</h3>
          <span className="text-xs text-gray-400">Mobile-First 2-Tap Verification</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-800 text-gray-400 text-xs font-semibold">
              <tr>
                <th className="pb-3">Intern Name</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Hours</th>
                <th className="pb-3">Work Summary</th>
                <th className="pb-3">Anomaly Check</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-gray-300 text-xs">
              <tr>
                <td className="py-3 font-medium text-white">Bhaskar Vanjarapu</td>
                <td className="py-3">Oct 30, 2026</td>
                <td className="py-3 font-mono">8.0 hrs</td>
                <td className="py-3">Next.js API route implementation & testing</td>
                <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">Passed (&lt;12h)</span></td>
                <td className="py-3">
                  <button className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold">
                    Verify
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Aditi Nair</td>
                <td className="py-3">Oct 30, 2026</td>
                <td className="py-3 font-mono">7.5 hrs</td>
                <td className="py-3">Database schema migration and seeders</td>
                <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">Passed (&lt;12h)</span></td>
                <td className="py-3">
                  <button className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold">
                    Verify
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
