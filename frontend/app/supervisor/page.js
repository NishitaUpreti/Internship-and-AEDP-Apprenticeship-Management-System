"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Clock,
  ClipboardCheck,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Hourglass,
  Check,
  Building2
} from "lucide-react";
import StatCard from "../components/StatCard";

export default function SupervisorDashboard() {
  const [user, setUser] = useState(null);
  const [pendingLogs, setPendingLogs] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [verifiedCount, setVerifiedCount] = useState(0);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchPendingLogs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/hours/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPendingLogs(data.data || []);
        if (data.company) {
          setCompanyInfo(data.company);
        }
      }
    } catch (err) {
      console.error("Failed to load pending logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        if (parsed.employer) {
          setCompanyInfo(parsed.employer);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchPendingLogs();
  }, []);

  const handleVerify = async (logId, studentName) => {
    try {
      setVerifyingId(logId);
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/hours/${logId}/verify`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: "VERIFIED"
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Hour log for ${studentName || "Intern"} verified successfully!`);
        setPendingLogs((prev) => prev.filter((item) => (item._id || item.id) !== logId));
        setVerifiedCount((prev) => prev + 1);
      } else {
        showToast(data.message || "Failed to verify hour log.", "error");
      }
    } catch (err) {
      showToast("Error executing 2-tap verification.", "error");
    } finally {
      setVerifyingId(null);
    }
  };

  const handleReject = async (logId, studentName) => {
    try {
      setVerifyingId(logId);
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/hours/${logId}/verify`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: "REJECTED",
          supervisorNotes: "Hours questioned or require re-submission."
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Hour log for ${studentName || "Intern"} flagged as rejected.`, "error");
        setPendingLogs((prev) => prev.filter((item) => (item._id || item.id) !== logId));
      } else {
        showToast(data.message || "Failed to update hour log.", "error");
      }
    } catch (err) {
      showToast("Error updating status.", "error");
    } finally {
      setVerifyingId(null);
    }
  };

  const uniqueInternsCount = new Set(
    pendingLogs.map((l) => (l.studentId?._id || l.studentId || "").toString()).filter(Boolean)
  ).size;

  const currentCompanyName = companyInfo?.organisationName || user?.employer?.organisationName || "Authorized Host Enterprise";

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Industry Supervisor Portal
            </h1>
            {companyInfo?.organisationName && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30">
                <Building2 size={13} /> {companyInfo.organisationName}
              </span>
            )}
          </div>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Welcome, {user?.name || "Industry Supervisor"} · Workplace Hour Verification for <strong className="text-white">{currentCompanyName}</strong>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck size={14} /> Company Isolated Verification
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Interns"
          value={uniqueInternsCount > 0 ? uniqueInternsCount.toString() : "0"}
          description={`Direct ${currentCompanyName} mentees`}
        />
        <StatCard
          title="Pending Log Verifications"
          value={pendingLogs.length.toString()}
          description="2-tap supervisor approval"
        />
        <StatCard
          title="Hours Verified (This Session)"
          value={verifiedCount.toString()}
          description="Certified for academic credit"
        />
        <StatCard
          title="Competency Evals"
          value="0"
          description="Midterm rubrics pending"
        />
      </div>

      {/* Hour Verification Queue */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
          <div>
            <h3 className="text-lg font-bold text-white">Pending Hour Logs for Verification</h3>
            <p className="text-xs text-gray-400">
              Reviewing logs strictly scoped to <strong className="text-orange-400">{currentCompanyName}</strong>
            </p>
          </div>
          <span className="text-xs font-mono text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
            {pendingLogs.length} Pending
          </span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-400 animate-pulse text-xs">
            Loading pending verification queue for {currentCompanyName}...
          </div>
        ) : pendingLogs.length === 0 ? (
          <div className="py-16 text-center text-gray-400 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <div className="text-sm font-semibold text-gray-200">
              {companyInfo?.organisationName
                ? `No pending hours for ${companyInfo.organisationName} interns!`
                : "All pending hours verified!"}
            </div>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              {companyInfo?.organisationName
                ? `Only hour logs submitted by interns placed at ${companyInfo.organisationName} appear in this queue. When interns submit new work hours, they will appear here.`
                : "There are no student hour logs awaiting supervisor approval at this time. New logs will appear here in real time."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-800 text-gray-400 text-xs font-semibold">
                <tr>
                  <th className="pb-3 px-3">Intern Name</th>
                  <th className="pb-3 px-3">Placement Role &amp; Host</th>
                  <th className="pb-3 px-3">Date</th>
                  <th className="pb-3 px-3">Hours</th>
                  <th className="pb-3 px-3">Work Summary</th>
                  <th className="pb-3 px-3">Anomaly Check</th>
                  <th className="pb-3 px-3 text-right">2-Tap Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-gray-300 text-xs">
                {pendingLogs.map((log) => {
                  const studentName = log.studentId?.name || "Intern Candidate";
                  const studentEmail = log.studentId?.email || "";
                  const companyName = log.employerId?.organisationName || log.employerId?.name || currentCompanyName;
                  const roleTitle = log.opportunityId?.title || "Engineering Intern";
                  const logId = log._id || log.id;
                  const isProcessing = verifyingId === logId;

                  return (
                    <tr key={logId} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-3 font-medium text-white">
                        <div>{studentName}</div>
                        {studentEmail && (
                          <div className="text-[10px] text-gray-500 font-mono">{studentEmail}</div>
                        )}
                      </td>
                      <td className="py-4 px-3">
                        <div className="font-semibold text-white text-xs">{roleTitle}</div>
                        <div className="text-[10px] text-orange-400/90 mt-0.5 font-medium">{companyName}</div>
                      </td>
                      <td className="py-4 px-3 whitespace-nowrap text-gray-400">
                        {new Date(log.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </td>
                      <td className="py-4 px-3 font-mono font-bold text-white whitespace-nowrap">
                        <span className="text-orange-400">{log.hours}</span> hrs
                      </td>
                      <td className="py-4 px-3 max-w-xs text-gray-300 truncate" title={log.description}>
                        {log.description}
                      </td>
                      <td className="py-4 px-3 whitespace-nowrap">
                        {log.hours <= 12 ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <Check size={11} /> Passed (&le;12h)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                            <AlertCircle size={11} /> Anomaly (&gt;12h)
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-3 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleVerify(logId, studentName)}
                            disabled={isProcessing}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                          >
                            <CheckCircle2 size={14} />
                            <span>Verify</span>
                          </button>
                          <button
                            onClick={() => handleReject(logId, studentName)}
                            disabled={isProcessing}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 font-semibold text-xs border border-red-500/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                          >
                            <XCircle size={14} />
                            <span>Reject</span>
                          </button>
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
