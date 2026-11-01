"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Users,
  UserCheck,
  Building2,
  Plus,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
} from "lucide-react";
import StatCard from "../components/StatCard";

export default function EmployerDashboard() {
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error(e);
      }
    }
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/employers/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setDashboardData(data);
      }
    } catch (err) {
      console.error("Failed to load employer dashboard:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const isProfileComplete = dashboardData?.employer?.isProfileComplete ?? true;
  const stats = dashboardData?.stats || {
    activePostings: 0,
    totalPostings: 0,
    totalApplicants: 0,
    activeInterns: 0,
    industrySupervisors: 0,
  };
  const recentOpportunities = dashboardData?.recentOpportunities || [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Employer Enterprise Portal
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Welcome, {user?.name || "Employer Admin"} ·{" "}
            {dashboardData?.employer?.organisationName || user?.department || "Partner Enterprise"}{" "}
            · AEDP Talent & Internship Management
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={isProfileComplete ? "/employer/opportunities" : "/employer/profile"}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-lg shadow-orange-600/20"
          >
            <Plus size={16} /> Post New Opportunity
          </Link>
        </div>
      </div>

      {/* Profile Incomplete Warning Banner */}
      {!isProfileComplete && (
        <div className="p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 mt-0.5">
              <AlertCircle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-300">
                Action Required: Complete Company Profile
              </h4>
              <p className="text-xs text-gray-400 mt-0.5 max-w-2xl">
                Please enter your official company description, website, and office address. You must complete your company profile before posting opportunities.
              </p>
            </div>
          </div>
          <Link
            href="/employer/profile"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-xl text-xs transition-colors whitespace-nowrap shadow-sm"
          >
            <span>Complete Profile Now</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Real-time KPI Cards (Zero Mock Data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Postings"
          value={isLoading ? "..." : stats.activePostings}
          description="AEDP credit-mapped openings"
        />
        <StatCard
          title="Total Applicants"
          value={isLoading ? "..." : stats.totalApplicants}
          description="University candidate profiles"
        />
        <StatCard
          title="Active Interns"
          value={isLoading ? "..." : stats.activeInterns}
          description="Currently placed and logging hours"
        />
        <StatCard
          title="Industry Supervisors"
          value={isLoading ? "..." : stats.industrySupervisors}
          description="Designated workplace mentors"
        />
      </div>

      {/* Active Engagement Openings Table (Zero Mock Data) */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Active Engagement Openings</h3>
            <p className="text-xs text-gray-500 mt-0.5">Live database listings for your organization</p>
          </div>
          <Link
            href="/employer/opportunities"
            className="text-xs text-orange-400 hover:text-orange-300 font-semibold transition"
          >
            View All Openings &rarr;
          </Link>
        </div>

        {isLoading ? (
          <div className="py-12 flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : recentOpportunities.length === 0 ? (
          <div className="py-12 text-center bg-[#202020] rounded-xl border border-gray-800/80 my-2">
            <div className="w-12 h-12 bg-orange-500/10 text-orange-400 rounded-xl flex items-center justify-center mx-auto mb-3 border border-orange-500/20">
              <BriefcaseBusiness size={24} />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              No Opportunities Posted Yet
            </h4>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">
              {isProfileComplete
                ? "Start posting internships and apprenticeships so students can discover and apply."
                : "Complete your company profile first to publish opportunities."}
            </p>
            <Link
              href={isProfileComplete ? "/employer/opportunities" : "/employer/profile"}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold transition shadow-md shadow-orange-600/20"
            >
              <Plus size={14} />
              <span>{isProfileComplete ? "Post First Opportunity" : "Complete Profile First"}</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-800 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                <tr>
                  <th className="pb-3">Title & Type</th>
                  <th className="pb-3">Department Target</th>
                  <th className="pb-3">Stipend</th>
                  <th className="pb-3">Applicants</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-gray-300 text-xs">
                {recentOpportunities.map((opp) => (
                  <tr key={opp.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4">
                      <div className="font-semibold text-white">{opp.title}</div>
                      <div className="text-[11px] font-mono text-orange-400 mt-0.5">
                        {opp.type}
                      </div>
                    </td>
                    <td className="py-4 text-gray-400">{opp.departments}</td>
                    <td className="py-4 font-mono text-emerald-400">{opp.stipend}</td>
                    <td className="py-4 font-mono font-medium text-orange-400">
                      {opp.applicants}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                          opp.status === "OPEN"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                        }`}
                      >
                        {opp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
