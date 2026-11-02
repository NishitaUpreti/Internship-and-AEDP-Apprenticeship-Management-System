"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Award,
  Send,
  ShieldCheck,
  Hourglass,
  XCircle,
  FileText,
  Building2,
  Briefcase,
  ArrowRight
} from "lucide-react";

export default function StudentLogHoursPage() {
  const [logs, setLogs] = useState([]);
  const [activePlacement, setActivePlacement] = useState(null);
  const [stats, setStats] = useState({
    totalHoursLogged: 0,
    verifiedHours: 0,
    pendingHours: 0,
    rejectedHours: 0,
    creditsEarned: 0,
    hoursUntilNextCredit: 30
  });

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [hours, setHours] = useState("8.0");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [formError, setFormError] = useState("");

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchHours = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/hours/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setLogs(data.data || []);
        setActivePlacement(data.activePlacement || null);
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error("Failed to fetch hour logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHours();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!activePlacement) {
      setFormError("Cannot log hours without an active internship placement.");
      return;
    }

    const hoursNum = parseFloat(hours);
    if (isNaN(hoursNum) || hoursNum <= 0) {
      setFormError("Hours worked must be greater than 0.");
      return;
    }

    if (hoursNum > 12) {
      setFormError("Daily logged hours cannot exceed 12 hours under regulatory AEDP guidelines.");
      return;
    }

    if (!description.trim()) {
      setFormError("Please provide a brief description of the work and tasks completed.");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/hours`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date,
          hours: hoursNum,
          description: description.trim()
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Workplace hours logged successfully and submitted for supervisor verification!");
        setDescription("");
        setHours("8.0");
        fetchHours();
      } else {
        setFormError(data.message || "Failed to log hours.");
      }
    } catch (err) {
      setFormError("Network error occurred while submitting log.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-12">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200 ${
            toast.type === "error" ? "bg-red-600" : "bg-orange-600"
          }`}
        >
          {toast.type === "error" ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/student" className="hover:text-orange-400 transition-colors">
              Student Portal
            </Link>
            <span>/</span>
            <span className="text-gray-300">Hour Logging</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Workplace Hour Logging &amp; Credit Tracking
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Log daily workplace engagement for industry supervisor verification and NCrF academic credit mapping.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" /> NCrF: 30 Verified Hours = 1 Academic Credit
          </span>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400 animate-pulse text-xs">
          Loading active placement and hour logs...
        </div>
      ) : !activePlacement ? (
        /* Gate Card: When student has not accepted any offer */
        <div className="bg-[#1c1c1c] border border-amber-500/20 rounded-2xl p-10 sm:p-14 text-center max-w-2xl mx-auto space-y-4 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
            <Building2 className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-white">No Active Internship Placement Found</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              Workplace hours can only be recorded for a verified internship with an accepted offer. 
              Once an employer extends an offer and you accept it, your company workspace and supervisor verification channel will activate here.
            </p>
          </div>
          <div className="pt-3">
            <Link
              href="/student/opportunities"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs transition-all shadow-lg shadow-orange-500/20"
            >
              <Briefcase className="w-4 h-4" />
              <span>Browse Open Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Active Placement Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-950/40 via-[#1c1815] to-[#171717] border border-orange-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold text-base shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-white text-sm sm:text-base">{activePlacement.employerName}</h3>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                    Active Placement Verified
                  </span>
                </div>
                <p className="text-xs text-orange-300/90 font-medium mt-0.5">
                  {activePlacement.opportunityTitle} {activePlacement.reqId ? `• Ref: #${activePlacement.reqId}` : ""}
                </p>
              </div>
            </div>

            <Link
              href="/student/applications"
              className="text-xs text-gray-400 hover:text-white underline self-start sm:self-center transition-colors"
            >
              View Application Details
            </Link>
          </div>

          {/* KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Hours Logged</span>
              <div className="text-3xl font-extrabold text-white mt-2 font-mono">{stats.totalHoursLogged} hrs</div>
              <span className="text-[11px] text-gray-500 mt-1">Cumulative student submissions</span>
            </div>

            <div className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Verified by Supervisor</span>
              <div className="text-3xl font-extrabold text-emerald-400 mt-2 font-mono">{stats.verifiedHours} hrs</div>
              <span className="text-[11px] text-gray-500 mt-1">Officially certified workplace hours</span>
            </div>

            <div className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Pending Approval</span>
              <div className="text-3xl font-extrabold text-amber-400 mt-2 font-mono">{stats.pendingHours} hrs</div>
              <span className="text-[11px] text-gray-500 mt-1">Awaiting supervisor 2-tap sign-off</span>
            </div>

            <div className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">Academic Credits Earned</span>
              <div className="text-3xl font-extrabold text-orange-400 mt-2 font-mono">
                {stats.creditsEarned} <span className="text-base font-normal text-gray-300">Credits</span>
              </div>
              <span className="text-[11px] text-gray-500 mt-1">
                {stats.hoursUntilNextCredit} verified hrs until next credit
              </span>
            </div>
          </div>

          {/* Main Grid: Logging Form (5 cols) & History Table (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Log Hours Form */}
            <div className="lg:col-span-5 bg-[#1c1c1c] border border-white/10 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/25 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Log Daily Workplace Hours</h2>
                  <p className="text-xs text-gray-400">
                    Host: <strong className="text-gray-200">{activePlacement.employerName}</strong>
                  </p>
                </div>
              </div>

              {formError && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1.5">Date of Engagement</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-gray-300 font-semibold">Hours Worked</label>
                    <span className="text-[11px] text-gray-500 font-mono">Max 12.0 hrs / day</span>
                  </div>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="12"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    required
                    placeholder="e.g. 8.0"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1.5">
                    Task &amp; Activity Summary
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Describe your engineering contributions, client meetings, codebase features, or deliverables completed today..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all text-xs cursor-pointer"
                >
                  {submitting ? (
                    <span>Submitting Log...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Workplace Log</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Hour Logs History Roster */}
            <div className="lg:col-span-7 bg-[#1c1c1c] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h2 className="text-base font-bold text-white">Submitted Hour History</h2>
                  <p className="text-xs text-gray-400">Audit-ready verification records</p>
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  Total Entries: <strong className="text-white">{logs.length}</strong>
                </span>
              </div>

              {logs.length === 0 ? (
                <div className="py-16 text-center text-gray-400 space-y-3">
                  <Hourglass className="w-10 h-10 text-gray-600 mx-auto" />
                  <div className="text-sm font-semibold text-gray-300">No workplace hours logged yet</div>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Use the form on the left to record your daily work hours for {activePlacement.employerName}.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider text-[10px]">
                        <th className="pb-3 px-2">Date</th>
                        <th className="pb-3 px-2">Hours</th>
                        <th className="pb-3 px-2">Work Summary</th>
                        <th className="pb-3 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {logs.map((log) => {
                        const isVerified = log.status === "VERIFIED";
                        const isRejected = log.status === "REJECTED";
                        return (
                          <tr key={log._id || log.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3.5 px-2 whitespace-nowrap font-medium text-white">
                              {new Date(log.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                              })}
                            </td>
                            <td className="py-3.5 px-2 font-mono font-bold text-orange-400 whitespace-nowrap">
                              {log.hours} hrs
                            </td>
                            <td className="py-3.5 px-2 text-gray-300 max-w-xs pr-4">
                              <p className="line-clamp-2 leading-relaxed">{log.description}</p>
                              {log.supervisorNotes && (
                                <span className="text-[10px] text-amber-400/90 block mt-0.5">
                                  Supervisor Note: &quot;{log.supervisorNotes}&quot;
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-2 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                                  isVerified
                                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                    : isRejected
                                    ? "bg-red-500/15 text-red-400 border-red-500/30"
                                    : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                                }`}
                              >
                                {isVerified && <CheckCircle2 className="w-3 h-3" />}
                                {isRejected && <XCircle className="w-3 h-3" />}
                                {!isVerified && !isRejected && <Hourglass className="w-3 h-3" />}
                                <span>{log.status}</span>
                              </span>
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
        </>
      )}
    </div>
  );
}
