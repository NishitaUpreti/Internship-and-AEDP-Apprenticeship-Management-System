"use client";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Building2,
  FileCheck,
  Award,
  Users,
  AlertTriangle,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import StatCard from "../components/StatCard";

export default function AdminDashboard() {
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
            System Administration & Governance
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Logged in as {user?.name || "System Admin"} · P15 Platform Architecture & NCrF Regulatory Control
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={14} /> Production Healthy
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value="1,480"
          description="8 role types active"
        />
        <StatCard
          title="Pending Employer Approvals"
          value="3"
          description="Verification queue requiring check"
        />
        <StatCard
          title="Credit Framework"
          value="30h / 1cr"
          description="NCrF standard rule enforced"
        />
        <StatCard
          title="Active Rubrics"
          value="4"
          description="Engagement evaluation templates"
        />
      </div>

      {/* Admin Action Boards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employer Verification Queue */}
        <div className="lg:col-span-2 bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Employer Verification Queue</h3>
            <span className="text-xs text-orange-400 font-medium">3 Pending Verification</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-800 text-gray-400 text-xs font-semibold">
                <tr>
                  <th className="pb-3">Company Name</th>
                  <th className="pb-3">Domain</th>
                  <th className="pb-3">Registered By</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-gray-300 text-xs">
                <tr>
                  <td className="py-3 font-medium text-white">Google India Pvt Ltd</td>
                  <td className="py-3 font-mono">google.com</td>
                  <td className="py-3">HR Placement Team</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">Verified</span></td>
                  <td className="py-3"><span className="text-xs text-gray-400">Approved</span></td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-white">Tata Consultancy Services</td>
                  <td className="py-3 font-mono">tcs.com</td>
                  <td className="py-3">Campus Recruitment</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-medium">Pending Review</span></td>
                  <td className="py-3">
                    <button className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold">
                      Verify
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-white">Zomato Media Ltd</td>
                  <td className="py-3 font-mono">zomato.com</td>
                  <td className="py-3">Talent Acquisition</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-medium">Pending Review</span></td>
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

        {/* NCrF Rules Configuration Overview */}
        <div className="lg:col-span-1 bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
              <Sliders size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">NCrF Policy Parameters</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Current institutional framework settings applied to all hours-to-credit computation pipelines.
            </p>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-gray-800">
                <span className="text-gray-400">Hours per Credit:</span>
                <span className="text-white font-mono font-semibold">30 Hours</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-800">
                <span className="text-gray-400">Semester Credit Cap:</span>
                <span className="text-white font-mono font-semibold">16 Credits</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-800">
                <span className="text-gray-400">Max Daily Logged Hours:</span>
                <span className="text-white font-mono font-semibold">12 Hours (anomaly flag)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-800">
                <span className="text-gray-400">Agreement Immutability:</span>
                <span className="text-emerald-400 font-semibold">Enforced on Sign</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
