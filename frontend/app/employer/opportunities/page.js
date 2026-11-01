"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Plus,
  Users,
  Clock,
  MapPin,
  IndianRupee,
  X,
  Check,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Trash2,
  ExternalLink,
} from "lucide-react";
import StatCard from "../../components/StatCard";

export default function EmployerOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(true);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "INTERNSHIP",
    location: "Bengaluru (Hybrid)",
    duration: "6 Months",
    openPositions: 2,
    stipendAmount: 25000,
    skillsInput: "React, Node.js, MongoDB",
    departmentsInput: "Computer Science & Engineering, Information Technology",
    minCgpa: 7.0,
    requirements: "Candidates must have hands-on experience building full-stack web applications.",
  });

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/opportunities/employer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.opportunities) {
        setOpportunities(data.opportunities);
      }

      // Check employer profile completion
      const profileRes = await fetch(`${apiUrl}/api/employers/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const profileData = await profileRes.json();
      if (profileRes.ok && profileData.employer) {
        setIsProfileComplete(profileData.employer.isProfileComplete ?? false);
      }
    } catch (err) {
      console.error("Error fetching employer opportunities:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOpportunity = async (e) => {
    e.preventDefault();
    setFeedback({ type: "", message: "" });

    if (!isProfileComplete) {
      setFeedback({
        type: "error",
        message: "You must complete your Company Profile (Overview & Website) before creating opportunities.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const payload = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        location: formData.location,
        duration: formData.duration,
        openPositions: parseInt(formData.openPositions, 10) || 1,
        stipend: {
          amount: Number(formData.stipendAmount) || 0,
          currency: "INR",
          period: "MONTHLY",
        },
        skills: formData.skillsInput
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        eligibility: {
          departments: formData.departmentsInput
            .split(",")
            .map((d) => d.trim())
            .filter(Boolean),
          minCgpa: parseFloat(formData.minCgpa) || undefined,
          requirements: formData.requirements,
        },
      };

      const res = await fetch(`${apiUrl}/api/opportunities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create opportunity.");
      }

      setFeedback({
        type: "success",
        message: "Opportunity posted successfully!",
      });
      setShowModal(false);
      // Reset form title and description
      setFormData((prev) => ({
        ...prev,
        title: "",
        description: "",
      }));
      // Refresh list
      fetchOpportunities();
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.message || "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "OPEN" ? "CLOSED" : "OPEN";
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/opportunities/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOpportunities((prev) =>
          prev.map((opp) => (opp._id === id ? { ...opp, status: newStatus } : opp))
        );
      }
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this opportunity posting?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/opportunities/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setOpportunities((prev) => prev.filter((opp) => opp._id !== id));
      }
    } catch (err) {
      console.error("Error deleting opportunity:", err);
    }
  };

  // Derived metrics
  const totalCount = opportunities.length;
  const activeCount = opportunities.filter((o) => o.status === "OPEN").length;
  const totalPositions = opportunities.reduce(
    (acc, curr) => acc + (curr.openPositions || 1),
    0
  );
  const totalApplicants = opportunities.reduce(
    (acc, curr) => acc + (curr.applicantCount || 0),
    0
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Opportunity & Opening Registry
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Create, manage, and track AEDP credit-eligible internship openings.
          </p>
        </div>
        {isProfileComplete ? (
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-orange-600/25 cursor-pointer"
          >
            <Plus size={18} />
            <span>Post New Opportunity</span>
          </button>
        ) : (
          <Link
            href="/employer/profile"
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-black rounded-xl text-sm font-semibold transition-all shadow-lg shadow-amber-500/25 cursor-pointer"
          >
            <AlertCircle size={18} />
            <span>Complete Profile to Post</span>
          </Link>
        )}
      </div>

      {/* Profile Incomplete Warning Banner */}
      {!isProfileComplete && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-amber-400 shrink-0" size={20} />
            <div>
              <p className="text-sm font-bold text-amber-300">
                Company Profile Incomplete
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                You must enter your company overview and official website in your Company Profile before you can publish opportunities.
              </p>
            </div>
          </div>
          <Link
            href="/employer/profile"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-xl text-xs transition-colors whitespace-nowrap shadow-sm"
          >
            Go to Company Profile &rarr;
          </Link>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Postings"
          value={totalCount}
          description="Total opportunities created"
        />
        <StatCard
          title="Active Openings"
          value={activeCount}
          description="Open for student applications"
        />
        <StatCard
          title="Open Positions"
          value={totalPositions}
          description="Available talent slots"
        />
        <StatCard
          title="Total Applicants"
          value={totalApplicants}
          description="Candidates awaiting review"
        />
      </div>

      {/* Feedback banner */}
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

      {/* Opportunities List / Table */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Registered Opportunities</h3>
          <span className="text-xs text-gray-400">Real-time database listings</span>
        </div>

        {isLoading ? (
          <div className="py-12 flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : opportunities.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 bg-orange-500/10 text-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
              <BriefcaseBusiness size={28} />
            </div>
            <h4 className="text-lg font-bold text-white mb-1">
              No Opportunities Posted Yet
            </h4>
            <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
              Post your first internship or AEDP apprenticeship position so students can discover and apply for it.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-orange-600/25"
            >
              <Plus size={16} />
              <span>Create First Opportunity</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-800 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                <tr>
                  <th className="pb-3">Title & Type</th>
                  <th className="pb-3">Skills & Eligibility</th>
                  <th className="pb-3">Stipend & Location</th>
                  <th className="pb-3">Slots</th>
                  <th className="pb-3">Applicants</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-gray-300 text-xs">
                {opportunities.map((opp) => (
                  <tr key={opp._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4">
                      <div className="font-semibold text-white text-sm">
                        {opp.title}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 font-mono text-[11px]">
                          {opp.type}
                        </span>
                        <span className="text-gray-500 text-[11px]">
                          {opp.duration || "3 Months"}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 max-w-xs">
                      <div className="flex flex-wrap gap-1 mb-1">
                        {opp.skills && opp.skills.slice(0, 3).map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-[#252525] border border-gray-700 rounded text-gray-300 text-[11px]"
                          >
                            {s}
                          </span>
                        ))}
                        {opp.skills && opp.skills.length > 3 && (
                          <span className="px-1.5 py-0.5 text-gray-500 text-[11px]">
                            +{opp.skills.length - 3}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-[11px] truncate">
                        {opp.eligibility?.departments?.join(", ") || "All Departments"}
                      </p>
                    </td>

                    <td className="py-4">
                      <div className="font-mono text-emerald-400 font-medium">
                        ₹{opp.stipend?.amount?.toLocaleString() || "0"} / mo
                      </div>
                      <div className="text-gray-500 text-[11px] flex items-center gap-1 mt-0.5">
                        <MapPin size={11} />
                        <span>{opp.location || "Remote"}</span>
                      </div>
                    </td>

                    <td className="py-4 font-mono font-medium text-white">
                      {opp.openPositions || 1}
                    </td>

                    <td className="py-4 font-mono font-medium text-orange-400">
                      {opp.applicantCount || 0}
                    </td>

                    <td className="py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          opp.status === "OPEN"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                        }`}
                      >
                        {opp.status}
                      </span>
                    </td>

                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(opp._id, opp.status)}
                          title={
                            opp.status === "OPEN"
                              ? "Close applications"
                              : "Reopen applications"
                          }
                          className="p-1.5 rounded-lg bg-[#252525] hover:bg-[#303030] text-gray-300 hover:text-white transition cursor-pointer"
                        >
                          {opp.status === "OPEN" ? (
                            <ToggleRight size={18} className="text-emerald-400" />
                          ) : (
                            <ToggleLeft size={18} className="text-gray-500" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(opp._id)}
                          title="Delete opportunity"
                          className="p-1.5 rounded-lg bg-[#252525] hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Post Opportunity Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1c1c1c] border border-gray-800 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl my-8 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Post New Opportunity
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Publish an internship or AEDP apprenticeship for university students.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateOpportunity} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Role Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g. Full Stack Software Development Intern"
                  className="w-full p-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Engagement Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm cursor-pointer"
                  >
                    <option value="INTERNSHIP">Internship</option>
                    <option value="APPRENTICESHIP">AEDP Apprenticeship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Location Mode
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g. Remote / Bengaluru (Hybrid)"
                    className="w-full p-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    placeholder="e.g. 6 Months"
                    className="w-full p-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Monthly Stipend (INR)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stipendAmount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stipendAmount: e.target.value,
                      })
                    }
                    placeholder="25000"
                    className="w-full p-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Open Positions
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.openPositions}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        openPositions: e.target.value,
                      })
                    }
                    placeholder="1"
                    className="w-full p-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Required Skills (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.skillsInput}
                  onChange={(e) =>
                    setFormData({ ...formData, skillsInput: e.target.value })
                  }
                  placeholder="e.g. React, Node.js, Express, MongoDB, Tailwind"
                  className="w-full p-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Eligible Departments (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.departmentsInput}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        departmentsInput: e.target.value,
                      })
                    }
                    placeholder="e.g. Computer Science, IT, Electronics"
                    className="w-full p-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Minimum CGPA Requirement
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.minCgpa}
                    onChange={(e) =>
                      setFormData({ ...formData, minCgpa: e.target.value })
                    }
                    placeholder="7.0"
                    className="w-full p-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Role Description & Scope of Work *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Detail the daily responsibilities, learning milestones, and deliverables..."
                  className="w-full p-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 bg-[#252525] hover:bg-[#303030] text-gray-300 hover:text-white rounded-xl text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition shadow-lg shadow-orange-600/25"
                >
                  {isSubmitting ? "Publishing..." : "Publish Opportunity"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

