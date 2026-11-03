"use client";
import { useState, useEffect } from "react";
import {
  Users,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Award,
  Clock,
  BriefcaseBusiness,
  UserCheck,
  XCircle,
  GraduationCap,
} from "lucide-react";
import StatCard from "../../components/StatCard";

export default function EmployerApplicantsPage() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState({});
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/applications/employer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.applications) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error("Failed to fetch employer applicants:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (appId, newStatus) => {
    setActionLoading((prev) => ({ ...prev, [appId]: true }));
    setFeedback({ type: "", message: "" });

    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/applications/${appId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update status.");
      }

      // Optimistically update status in table
      setApplications((prev) =>
        prev.map((app) =>
          app._id === appId ? { ...app, status: newStatus } : app
        )
      );

      const statusLabels = {
        SHORTLISTED: "Candidate Shortlisted!",
        OFFERED: "Formal Offer Extended!",
        REJECTED: "Application marked as Rejected.",
      };

      setFeedback({
        type: "success",
        message: statusLabels[newStatus] || "Status updated successfully.",
      });
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.message || "Failed to update applicant status.",
      });
    } finally {
      setActionLoading((prev) => ({ ...prev, [appId]: false }));
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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold">
            <Award size={13} /> Offer Extended
          </span>
        );
      case "ACCEPTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 size={13} /> Offer Accepted
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
            <XCircle size={13} /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <Clock size={13} /> In Review
          </span>
        );
    }
  };

  // Metrics
  const totalCount = applications.length;
  const inReviewCount = applications.filter(
    (a) => a.status === "SUBMITTED" || a.status === "UNDER_REVIEW"
  ).length;
  const shortlistedCount = applications.filter(
    (a) => a.status === "SHORTLISTED"
  ).length;
  const offeredCount = applications.filter(
    (a) => a.status === "OFFERED" || a.status === "ACCEPTED"
  ).length;

  // Filtered list
  const filteredApplications = applications.filter((app) => {
    const student = app.studentId;
    const opp = app.opportunityId;

    const matchesSearch =
      !searchFilter.trim() ||
      student?.name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      student?.universityId?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      opp?.title?.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Candidate Applications & Talent Pipeline
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Review student candidate resumes, shortlist qualified profiles, and issue digital offers.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Candidates"
          value={totalCount}
          description="Received across all postings"
        />
        <StatCard
          title="Pending Review"
          value={inReviewCount}
          description="Awaiting employer evaluation"
        />
        <StatCard
          title="Shortlisted"
          value={shortlistedCount}
          description="Qualified for next round"
        />
        <StatCard
          title="Offers Extended"
          value={offeredCount}
          description="Official placement offers"
        />
      </div>

      {/* Feedback Banner */}
      {feedback.message && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl text-sm border ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search candidates by name, roll number, or role title..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#242424] text-white rounded-xl border border-gray-700 outline-none focus:border-orange-500 text-sm"
          />
        </div>

        <div className="w-full md:w-52">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2.5 bg-[#242424] text-white rounded-xl border border-gray-700 outline-none focus:border-orange-500 text-sm cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="SUBMITTED">In Review</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="OFFERED">Offered</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">
              Applicant Review Queue
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Showing {filteredApplications.length} candidates from MongoDB
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="py-12 flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 bg-orange-500/10 text-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
              <Users size={28} />
            </div>
            <h4 className="text-lg font-bold text-white mb-1">
              No Applications Found
            </h4>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              {searchFilter || statusFilter !== "all"
                ? "No candidates match the selected filters. Try clearing your search query."
                : "No student applications have been received yet for your postings."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-800 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                <tr>
                  <th className="pb-3">Candidate</th>
                  <th className="pb-3">Role Applied</th>
                  <th className="pb-3">Resume & Details</th>
                  <th className="pb-3">Applied Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Review Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-gray-300 text-xs">
                {filteredApplications.map((app) => {
                  const student = app.studentId;
                  const opp = app.opportunityId;
                  const isBusy = actionLoading[app._id];

                  return (
                    <tr
                      key={app._id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      {/* Candidate */}
                      <td className="py-4">
                        <div className="font-semibold text-white text-sm">
                          {student?.name || "Student"}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {student?.email || ""}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500">
                          {student?.universityId && (
                            <span className="font-mono text-orange-400">
                              {student.universityId}
                            </span>
                          )}
                          {student?.department && (
                            <span>· {student.department}</span>
                          )}
                          {app.cgpa && (
                            <span className="text-emerald-400 font-semibold">
                              · CGPA: {app.cgpa}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Role Applied */}
                      <td className="py-4">
                        <div className="font-medium text-white">
                          {opp?.title || "Opportunity"}
                        </div>
                        <span className="text-[11px] font-mono text-gray-500">
                          {opp?.type || "INTERNSHIP"}
                        </span>
                      </td>

                      {/* Resume & Cover Note */}
                      <td className="py-4 max-w-xs">
                        {app.resumeUrl ? (
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border border-orange-500/20 text-xs font-semibold transition"
                          >
                            <ExternalLink size={13} />
                            <span>View Resume</span>
                          </a>
                        ) : (
                          <span className="text-gray-500 text-xs">
                            No resume URL
                          </span>
                        )}
                        {app.coverNote && (
                          <p className="text-[11px] text-gray-400 italic line-clamp-2 mt-1.5">
                            "{app.coverNote}"
                          </p>
                        )}
                      </td>

                      {/* Applied Date */}
                      <td className="py-4 text-gray-400 text-xs">
                        {new Date(
                          app.appliedAt || app.createdAt
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Status */}
                      <td className="py-4">{getStatusBadge(app.status)}</td>

                      {/* Actions */}
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {app.status !== "SHORTLISTED" &&
                            app.status !== "OFFERED" && (
                              <button
                                type="button"
                                disabled={isBusy}
                                onClick={() =>
                                  handleUpdateStatus(app._id, "SHORTLISTED")
                                }
                                className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold transition cursor-pointer disabled:opacity-50"
                              >
                                Shortlist
                              </button>
                            )}

                          {app.status !== "OFFERED" && (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() =>
                                handleUpdateStatus(app._id, "OFFERED")
                              }
                              className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer disabled:opacity-50 shadow-md shadow-orange-600/20"
                            >
                              Make Offer
                            </button>
                          )}

                          {app.status !== "REJECTED" && (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() =>
                                handleUpdateStatus(app._id, "REJECTED")
                              }
                              className="px-2.5 py-1.5 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-semibold transition cursor-pointer disabled:opacity-50"
                            >
                              Reject
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
