"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  BriefcaseBusiness,
  Building2,
  MapPin,
  Clock,
  Award,
  Filter,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  FileText,
  Send,
  X,
  GraduationCap,
  ExternalLink,
} from "lucide-react";

export default function StudentOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [user, setUser] = useState(null);

  // Application Modal State
  const [activeModalOpp, setActiveModalOpp] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalFeedback, setModalFeedback] = useState({ type: "", message: "" });
  const [appForm, setAppForm] = useState({
    universityId: "",
    department: "",
    cgpa: "",
    resumeUrl: "",
    coverNote: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setAppForm((prev) => ({
          ...prev,
          universityId: parsed.universityId || "",
          department: parsed.department || "",
        }));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    fetchOpportunities();
  }, [searchQuery, selectedDept, selectedType]);

  const fetchOpportunities = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const queryParams = new URLSearchParams();
      if (searchQuery.trim()) queryParams.set("search", searchQuery.trim());
      if (selectedDept !== "all") queryParams.set("department", selectedDept);
      if (selectedType !== "all") queryParams.set("type", selectedType);

      const res = await fetch(`${apiUrl}/api/opportunities?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.opportunities) {
        setOpportunities(data.opportunities);
      }
    } catch (err) {
      console.error("Failed to fetch opportunities:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const openApplyModal = (opp) => {
    setActiveModalOpp(opp);
    setModalFeedback({ type: "", message: "" });
  };

  const closeApplyModal = () => {
    setActiveModalOpp(null);
    setModalFeedback({ type: "", message: "" });
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!activeModalOpp) return;

    if (!appForm.resumeUrl.trim()) {
      setModalFeedback({
        type: "error",
        message: "Please provide a valid resume or portfolio link.",
      });
      return;
    }

    setIsSubmitting(true);
    setModalFeedback({ type: "", message: "" });

    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          opportunityId: activeModalOpp._id,
          resumeUrl: appForm.resumeUrl.trim(),
          coverNote: appForm.coverNote.trim() || undefined,
          universityId: appForm.universityId?.trim() || undefined,
          department: appForm.department?.trim() || undefined,
          cgpa: appForm.cgpa ? parseFloat(appForm.cgpa) : undefined,
        }),
      });

      const data = await res.json();

      if (res.status === 409) {
        // Week 9 Negative Test: Duplicate Application Prevention
        setModalFeedback({
          type: "error",
          message: data.message || "You have already applied for this opening.",
        });
        // Mark as applied in local state
        setOpportunities((prev) =>
          prev.map((o) =>
            o._id === activeModalOpp._id ? { ...o, hasApplied: true } : o
          )
        );
        return;
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit application.");
      }

      // Success
      setOpportunities((prev) =>
        prev.map((o) =>
          o._id === activeModalOpp._id ? { ...o, hasApplied: true } : o
        )
      );

      setModalFeedback({
        type: "success",
        message: "Application submitted successfully! Redirecting to applications tracker...",
      });

      setTimeout(() => {
        closeApplyModal();
      }, 1500);
    } catch (err) {
      setModalFeedback({
        type: "error",
        message: err.message || "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const departments = [
    { id: "all", label: "All Departments" },
    { id: "Computer Science", label: "Computer Science" },
    { id: "Information Technology", label: "Information Technology" },
    { id: "Electronics", label: "Electronics & Communication" },
    { id: "Mechanical", label: "Mechanical Engineering" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Discover Opportunities
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Browse verified industry internships & apprenticeships eligible for National Credit Framework (NCrF) academic credits.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/student/applications"
            className="flex items-center gap-2 px-4 py-2 bg-[#222222] hover:bg-[#2b2b2b] text-gray-300 hover:text-white rounded-xl text-xs font-semibold border border-gray-700 transition"
          >
            <FileText size={15} />
            <span>My Applications</span>
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles size={14} /> 30 Work Hours = 1 Credit
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role title, company name, or skills (e.g. React, Python)..."
              className="w-full pl-11 pr-4 py-3 bg-[#242424] text-white rounded-xl border border-gray-700 outline-none focus:border-orange-500 text-sm transition"
            />
          </div>

          {/* Type Filter */}
          <div className="w-full md:w-56">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-3 bg-[#242424] text-white rounded-xl border border-gray-700 outline-none focus:border-orange-500 text-sm cursor-pointer"
            >
              <option value="all">All Engagement Types</option>
              <option value="INTERNSHIP">Internships</option>
              <option value="APPRENTICESHIP">AEDP Apprenticeships</option>
            </select>
          </div>
        </div>

        {/* Department Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-gray-500 flex items-center gap-1 font-semibold pr-1">
            <Filter size={14} /> Department:
          </span>
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(dept.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer whitespace-nowrap ${
                selectedDept === dept.id
                  ? "bg-orange-500 text-white font-semibold shadow-sm"
                  : "bg-[#242424] text-gray-400 hover:text-white hover:bg-[#2e2e2e]"
              }`}
            >
              {dept.label}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities List */}
      <div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 animate-pulse space-y-4"
              >
                <div className="h-6 bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                <div className="h-16 bg-gray-800 rounded w-full"></div>
                <div className="h-10 bg-gray-800 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : opportunities.length === 0 ? (
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-16 text-center">
            <div className="w-14 h-14 bg-orange-500/10 text-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
              <BriefcaseBusiness size={28} />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              No Opportunities Found
            </h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              {searchQuery || selectedDept !== "all" || selectedType !== "all"
                ? "No matching openings found for your active filters. Try adjusting your search keywords or department selection."
                : "No opportunities have been posted by verified employers yet. Check back soon!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunities.map((opp) => {
              const employerName =
                opp.employerId?.organisationName || "Partner Employer";
              const isVerified =
                opp.employerId?.verificationStatus === "VERIFIED";

              return (
                <div
                  key={opp._id}
                  className="bg-[#1a1a1a] border border-gray-800 hover:border-gray-700 transition-all rounded-2xl p-6 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    {/* Top Row: Type & Credit Estimate */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 font-mono">
                        {opp.type}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        <Award size={13} />
                        <span>NCrF 4 Credits</span>
                      </span>
                    </div>

                    {/* Title & Organization */}
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {opp.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                        <Building2 size={14} className="text-orange-500" />
                        <span className="font-medium text-gray-300">
                          {employerName}
                        </span>
                        {isVerified && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold">
                            Verified
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Badges: Location, Duration, Stipend */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 pt-1">
                      <div className="flex items-center gap-1">
                        <MapPin size={13} className="text-gray-500" />
                        <span>{opp.location || "Remote"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={13} className="text-gray-500" />
                        <span>{opp.duration || "3 Months"}</span>
                      </div>
                      <div className="font-mono text-emerald-400 font-semibold">
                        ₹{opp.stipend?.amount?.toLocaleString() || "0"} / mo
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed pt-1">
                      {opp.description}
                    </p>

                    {/* Skills */}
                    {opp.skills && opp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {opp.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-lg bg-[#242424] text-gray-300 text-[11px] border border-gray-700 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Section */}
                  <div className="pt-4 border-t border-gray-800 space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        Min CGPA:{" "}
                        <strong className="text-gray-300">
                          {opp.eligibility?.minCgpa || "N/A"}
                        </strong>
                      </span>
                      <span>
                        Open Slots:{" "}
                        <strong className="text-white">
                          {opp.openPositions || 1}
                        </strong>
                      </span>
                    </div>

                    {opp.hasApplied ? (
                      <div className="flex items-center justify-center gap-2 py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-semibold">
                        <CheckCircle2 size={16} />
                        <span>Applied · In Review</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openApplyModal(opp)}
                        className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-orange-600/20 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Send size={14} />
                        <span>Apply for Opportunity</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Structured Application Modal (Captures Student Details & Resume) */}
      {activeModalOpp && (
        <div
          onClick={closeApplyModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1c1c1c] border border-gray-800 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl my-8 space-y-5"
          >
            <div className="flex items-start justify-between border-b border-gray-800 pb-4">
              <div>
                <span className="text-[11px] font-mono uppercase text-orange-400 font-semibold tracking-wider">
                  Internship Application
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {activeModalOpp.title}
                </h3>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                  <Building2 size={12} className="text-orange-500" />
                  <span>{activeModalOpp.employerId?.organisationName || "Partner Employer"}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={closeApplyModal}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Alerts */}
            {modalFeedback.message && (
              <div
                className={`flex items-center gap-2.5 p-3.5 rounded-xl text-xs border ${
                  modalFeedback.type === "success"
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : "bg-red-500/10 border-red-500/20 text-red-400"
                }`}
              >
                {modalFeedback.type === "success" ? (
                  <CheckCircle2 size={16} className="shrink-0" />
                ) : (
                  <AlertCircle size={16} className="shrink-0" />
                )}
                <span>{modalFeedback.message}</span>
              </div>
            )}

            <form onSubmit={handleModalSubmit} className="space-y-4">
              {/* Applicant Name & Email (Auto-filled) */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-[#242424] p-3 rounded-xl border border-gray-800">
                <div>
                  <span className="text-gray-500 block">Candidate:</span>
                  <span className="font-semibold text-white truncate block">
                    {user?.name || "Student"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Email:</span>
                  <span className="text-gray-300 truncate block">
                    {user?.email || ""}
                  </span>
                </div>
              </div>

              {/* University ID & CGPA */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    University Roll / ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={appForm.universityId}
                    onChange={(e) =>
                      setAppForm({ ...appForm, universityId: e.target.value })
                    }
                    placeholder="e.g. 21BCE1001"
                    className="w-full p-2.5 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Current CGPA
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={appForm.cgpa}
                    onChange={(e) =>
                      setAppForm({ ...appForm, cgpa: e.target.value })
                    }
                    placeholder="e.g. 8.45"
                    className="w-full p-2.5 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-xs"
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Academic Department
                </label>
                <input
                  type="text"
                  value={appForm.department}
                  onChange={(e) =>
                    setAppForm({ ...appForm, department: e.target.value })
                  }
                  placeholder="e.g. School of Computer Science & Engineering"
                  className="w-full p-2.5 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-xs"
                />
              </div>

              {/* Resume / Portfolio Link */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Resume or Portfolio Link (Google Drive / GitHub / URL) *
                </label>
                <input
                  type="url"
                  required
                  value={appForm.resumeUrl}
                  onChange={(e) =>
                    setAppForm({ ...appForm, resumeUrl: e.target.value })
                  }
                  placeholder="https://drive.google.com/file/d/... or linkedin/portfolio"
                  className="w-full p-2.5 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-xs"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  Make sure permissions are set so employer reviewers can view the file.
                </p>
              </div>

              {/* Cover Note / Statement */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Statement of Interest / Cover Note
                </label>
                <textarea
                  rows={3}
                  value={appForm.coverNote}
                  onChange={(e) =>
                    setAppForm({ ...appForm, coverNote: e.target.value })
                  }
                  placeholder="Briefly state your relevant skills, projects, and learning goals..."
                  className="w-full p-2.5 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-xs resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={closeApplyModal}
                  className="px-4 py-2 bg-[#252525] hover:bg-[#303030] text-gray-300 hover:text-white rounded-xl text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-5 py-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold transition shadow-lg shadow-orange-600/25 cursor-pointer"
                >
                  <Send size={13} />
                  <span>{isSubmitting ? "Submitting..." : "Confirm & Apply"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
