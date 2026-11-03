"use client";
import { useEffect, useState } from "react";
import {
  Building2,
  BriefcaseBusiness,
  Users,
  FileCheck,
  ShieldAlert,
  AlertTriangle,
  Clock,
} from "lucide-react";
import StatCard from "../components/StatCard";

export default function CoordinatorDashboard() {
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
            Internship Coordinator Control Hub
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Welcome, {user?.name || "Internship Coordinator"} · AEDP Compliance & Employer Lifecycle Management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Placement Cycle Active
          </span>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Registered Employers"
          value="48"
          description="Verified partner organizations"
        />
        <StatCard
          title="Active Opportunities"
          value="32"
          description="AEDP credit-eligible postings"
        />
        <StatCard
          title="Tripartite Agreements"
          value="118"
          description="Fully executed with e-signature"
        />
        <StatCard
          title="Compliance Gaps"
          value="5"
          description="Require immediate coordinator action"
        />
      </div>

      {/* Coordinator Compliance Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Active Placement Pipelines</h3>
            <span className="text-xs text-gray-400">Real-time status</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-800 text-gray-400 text-xs font-semibold">
                <tr>
                  <th className="pb-3">Organization</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Applicants</th>
                  <th className="pb-3">Offers</th>
                  <th className="pb-3">Agreement Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-gray-300 text-xs">
                <tr>
                  <td className="py-3 font-medium text-white">Google India</td>
                  <td className="py-3">Software Intern</td>
                  <td className="py-3">45</td>
                  <td className="py-3 text-emerald-400 font-semibold">12</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">Executed (12/12)</span></td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-white">Microsoft</td>
                  <td className="py-3">Cloud Engineering Intern</td>
                  <td className="py-3">38</td>
                  <td className="py-3 text-emerald-400 font-semibold">8</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">Executed (8/8)</span></td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-white">Amazon AWS</td>
                  <td className="py-3">Solutions Intern</td>
                  <td className="py-3">52</td>
                  <td className="py-3 text-orange-400 font-semibold">10</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-medium">Signing (7/10)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Compliance Watchlist */}
        <div className="lg:col-span-1 bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <ShieldAlert className="text-orange-400" size={20} />
            Compliance Alert Feed
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-[#242424] rounded-xl border border-red-500/20">
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-red-400">Overdue Hour Approvals</span>
                <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-mono">3 Logs</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">&gt; 14 days without supervisor sign-off.</p>
            </div>
            <div className="p-3 bg-[#242424] rounded-xl border border-amber-500/20">
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-amber-400">Insurance Expiring Soon</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">2 Records</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Student workplace insurance renewal required.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
