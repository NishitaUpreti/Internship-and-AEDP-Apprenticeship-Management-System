"use client";
import { useEffect, useState } from "react";
import { Users, Clock, Award, ClipboardCheck, ArrowRight, ShieldCheck } from "lucide-react";
import StatCard from "../components/StatCard";

export default function FacultyDashboard() {
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
            Faculty Supervisor Workspace
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Welcome back, {user?.name || "Faculty Supervisor"} · Academic Mentorship & Credit Sign-Off Gate
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck size={14} /> Active Academic Term
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Students"
          value="18"
          description="Under faculty academic supervision"
        />
        <StatCard
          title="Hours Verified"
          value="2,140"
          description="By industry mentors"
        />
        <StatCard
          title="Credits to Sign-Off"
          value="6"
          description="Awaiting faculty approval gate"
        />
        <StatCard
          title="Evaluations Reviewed"
          value="15"
          description="Industry rubric submissions"
        />
      </div>

      {/* Assigned Students Summary Table */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Assigned Student Engagements</h3>
          <span className="text-xs text-gray-400">AY 2026-2027</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-800 text-gray-400 text-xs font-semibold">
              <tr>
                <th className="pb-3">Student Name</th>
                <th className="pb-3">Host Employer</th>
                <th className="pb-3">Logged Hours</th>
                <th className="pb-3">Est. Credits</th>
                <th className="pb-3">Industry Evaluation</th>
                <th className="pb-3">Faculty Sign-Off</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-gray-300 text-xs">
              <tr>
                <td className="py-3 font-medium text-white">Bhaskar Vanjarapu</td>
                <td className="py-3">Google India</td>
                <td className="py-3 font-mono">120 hrs</td>
                <td className="py-3 font-mono">4.0 cr</td>
                <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">Submitted (4.8/5)</span></td>
                <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 font-medium">Pending Gate</span></td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Rohan Sharma</td>
                <td className="py-3">Microsoft Hyderabad</td>
                <td className="py-3 font-mono">90 hrs</td>
                <td className="py-3 font-mono">3.0 cr</td>
                <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">Submitted (4.5/5)</span></td>
                <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">Approved</span></td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Priya Patel</td>
                <td className="py-3">Infosys Bengaluru</td>
                <td className="py-3 font-mono">60 hrs</td>
                <td className="py-3 font-mono">2.0 cr</td>
                <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-medium">In Progress</span></td>
                <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-gray-500/10 text-gray-400 font-medium">Awaiting Hours</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
