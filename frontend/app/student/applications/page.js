"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Building2,
  MapPin,
  Clock,
  ExternalLink,
  Award,
  CheckCircle2,
  AlertCircle,
  BriefcaseBusiness,
  Plus,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import StatCard from "../../components/StatCard";

export default function StudentApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [acceptingId, setAcceptingId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/applications/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.applications) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error("Failed to fetch student applications:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptOffer = async (appId) => {
    try {
      setAcceptingId(appId);
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/applications/${appId}/accept`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Placement Offer Accepted! Your active workspace is ready. You can now log internship hours.");
        setApplications((prev) =>
          prev.map((a) => (a._id === appId ? { ...a, status: "ACCEPTED" } : a))
        );
      } else {
        showToast(data.message || "Failed to accept offer.", "error");
      }
    } catch (err) {
      showToast("Network error accepting offer.", "error");
    } finally {
      setAcceptingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "SHORTLISTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 size={13} /> Shortlisted
          </span>
        );
      case "OFFERED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold animate-pulse">
            <Award size={13} /> Offer Extended!
          </span>
        );
      case "ACCEPTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <ShieldCheck size={13} /> Active Placement (Accepted)
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
            <AlertCircle size={13} /> Not Selected
          </span>
        );
      case "UNDER_REVIEW":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Clock size={13} /> Under Review
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <Clock size={13} /> Application Submitted
          </span>
        );
    }
  };

  // Metrics
  const totalCount = applications.length;
  const shortlistedCount = applications.filter((a) => a.status === "SHORTLISTED").length;
  const offeredCount = applications.filter((a) => a.status === "OFFERED" || a.status === "ACCEPTED").length;
  const inReviewCount = applications.filter((a) => a.status === "SUBMITTED" || a.status === "UNDER_REVIEW").length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200 ${
            toast.type === "error" ? "bg-red-600" : "bg-emerald-600"
          }`}
        >
          {toast.type === "error" ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            My Applications Tracker
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Real-time status updates for all your submitted AEDP internship and apprenticeship applications.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/student/log-hours"
            className="flex items-center gap-2 px-4 py-2 bg-[#222222] hover:bg-[#2b2b2b] text-gray-300 hover:text-white rounded-xl text-xs font-semibold border border-gray-700 transition"
          >
            <Clock size={15} />
            <span>Hour Logging</span>
          </Link>
          <Link
            href="/student/opportunities"
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold transition shadow-lg shadow-orange-600/20"
          >
            <Plus size={15} />
            <span>Browse More Opportunities</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Applications"
          value={totalCount}
          description="Applications on record"
        />
        <StatCard
          title="Under Review"
          value={inReviewCount}
          description="Pending employer review"
        />
        <StatCard
          title="Shortlisted"
          value={shortlistedCount}
          description="Approved for next stage"
        />
        <StatCard
          title="Offers Received"
          value={offeredCount}
          description="Placement offers extended"
        />
      </div>

      {/* Applications List */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Application History</h3>
          <span className="text-xs text-gray-500">Live database sync</span>
        </div>

        {isLoading ? (
          <div className="py-12 flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : applications.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 bg-orange-500/10 text-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
              <FileText size={28} />
            </div>
            <h4 className="text-lg font-bold text-white mb-1">
              No Applications Submitted Yet
            </h4>
            <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
              Explore open internship openings, select your match, and submit your application with your resume.
            </p>
            <Link
              href="/student/opportunities"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-semibold transition shadow-lg shadow-orange-600/25"
            >
              <BriefcaseBusiness size={16} />
              <span>Explore Opportunities</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => {
              const opp = app.opportunityId;
              const employer = opp?.employerId;
              const isOffering = app.status === "OFFERED";
              const isAccepted = app.status === "ACCEPTED";
              const isAccepting = acceptingId === app._id;

              return (
                <div
                  key={app._id}
                  className="bg-[#242424] border border-gray-800 hover:border-gray-700 transition-colors rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-bold text-white">
                        {opp?.title || "Internship Role"}
                      </h4>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400">
                        {opp?.type || "INTERNSHIP"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1 font-medium text-gray-300">
                        <Building2 size={13} className="text-orange-500" />
                        {employer?.organisationName || "Partner Employer"}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-gray-500" />
                        {opp?.location || "Remote"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-gray-500" />
                        Applied:{" "}
                        {new Date(app.appliedAt || app.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      {opp?.stipend?.amount > 0 && (
                        <span className="font-mono text-emerald-400">
                          ₹{opp.stipend.amount.toLocaleString()} / mo
                        </span>
                      )}
                    </div>

                    {/* Resume link & Cover note */}
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                      {app.resumeUrl && (
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 font-medium underline underline-offset-2"
                        >
                          <ExternalLink size={12} />
                          <span>Submitted Resume / Portfolio</span>
                        </a>
                      )}
                      {app.coverNote && (
                        <span className="text-gray-500 italic max-w-md truncate">
                          "{app.coverNote}"
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status and Action Buttons */}
                  <div className="shrink-0 flex flex-col sm:flex-row items-end sm:items-center gap-3">
                    <div>{getStatusBadge(app.status)}</div>

                    {isOffering && (
                      <button
                        onClick={() => handleAcceptOffer(app._id)}
                        disabled={isAccepting}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-600/30 cursor-pointer disabled:opacity-50"
                      >
                        {isAccepting ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Accepting...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={14} />
                            <span>Accept Placement Offer</span>
                          </>
                        )}
                      </button>
                    )}

                    {isAccepted && (
                      <Link
                        href="/student/log-hours"
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 font-semibold text-xs border border-orange-500/30 transition"
                      >
                        <span>Log Hours</span>
                        <ArrowRight size={13} />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
