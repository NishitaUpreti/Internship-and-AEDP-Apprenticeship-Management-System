"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UserCheck,
  Building,
  Lock,
  Bell,
  Globe,
  CheckCircle2,
  Save,
  ShieldCheck,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Clock,
  Smartphone,
  Check,
  AlertTriangle,
  MonitorSmartphone,
  Shield
} from "lucide-react";

export default function EmployerSettingsPage() {
  const [activeTab, setActiveTab] = useState("all"); // all | profile | security | notifications | account
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3600);
  };

  // Representative Profile Form State
  const [repProfile, setRepProfile] = useState({
    name: "Sarah Jenkins",
    title: "Lead University Technical Recruiter",
    email: "sarah.jenkins@acme.com",
    phone: "+1 (415) 890-4211",
    dept: "University Talent Acquisition & Academic Relations",
    location: "San Francisco HQ (500 Howard St)",
    signatoryStatus: "Authorized Corporate Signatory"
  });

  // Password state
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmPass: ""
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState({
    applications: true,
    timesheets: true,
    interviews: true,
    coordinator: true,
    email: true,
    inApp: true,
    sms: false
  });

  // System
  const [language, setLanguage] = useState("en-US");
  const [timezone, setTimezone] = useState("America/Los_Angeles");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwords.current) {
      showToast("Please enter your current password.");
      return;
    }
    if (passwords.newPass.length < 8) {
      showToast("New password must be at least 8 characters long.");
      return;
    }
    if (passwords.newPass !== passwords.confirmPass) {
      showToast("New passwords do not match.");
      return;
    }
    setPasswords({ current: "", newPass: "", confirmPass: "" });
    showToast("Password updated successfully!");
  };

  const handleSaveAll = () => {
    showToast("Representative profile & enterprise settings saved!");
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-16">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-orange-600 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Breadcrumbs */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/employer" className="hover:text-orange-400 transition-colors">
              Employer Portal
            </Link>
            <span>/</span>
            <span className="text-gray-300">Settings &amp; Representative Profile</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Representative Profile &amp; Enterprise Settings
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Manage your official corporate representative credentials, institutional contact channels, and system security controls.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </section>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {[
          { id: "all", label: "All Settings" },
          { id: "profile", label: "Representative Profile" },
          { id: "security", label: "Security & 2FA" },
          { id: "notifications", label: "Notification Matrix" },
          { id: "account", label: "System Preferences" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-orange-500 text-white shadow-sm font-bold"
                : "bg-[#1c1c1c] text-gray-400 hover:text-white border border-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {/* ================= 1. REPRESENTATIVE PROFILE ================= */}
        {(activeTab === "all" || activeTab === "profile") && (
          <section className="p-6 sm:p-7 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Employer Representative Profile</h2>
                  <p className="text-xs text-gray-400">Authorized corporate recruiter &amp; tripartite contact</p>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 self-start sm:self-auto flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Single Company Representative • Verified</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-400 font-medium mb-1">Full Representative Name</label>
                <input
                  type="text"
                  value={repProfile.name}
                  onChange={(e) => setRepProfile({ ...repProfile, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Official Corporate Title</label>
                <input
                  type="text"
                  value={repProfile.title}
                  onChange={(e) => setRepProfile({ ...repProfile, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Corporate Work Email</label>
                <input
                  type="email"
                  value={repProfile.email}
                  onChange={(e) => setRepProfile({ ...repProfile, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Direct Phone Number</label>
                <input
                  type="tel"
                  value={repProfile.phone}
                  onChange={(e) => setRepProfile({ ...repProfile, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Department / Business Unit</label>
                <input
                  type="text"
                  value={repProfile.dept}
                  onChange={(e) => setRepProfile({ ...repProfile, dept: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Office Location</label>
                <input
                  type="text"
                  value={repProfile.location}
                  onChange={(e) => setRepProfile({ ...repProfile, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </section>
        )}

        {/* ================= 2. SECURITY & 2FA ================= */}
        {(activeTab === "all" || activeTab === "security") && (
          <section className="p-6 sm:p-7 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Security &amp; Password Management</h2>
                <p className="text-xs text-gray-400">Keep candidate records and corporate access guarded</p>
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrent ? "text" : "password"}
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    >
                      {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={passwords.newPass}
                      onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                      placeholder="At least 8 characters"
                      className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    >
                      {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={passwords.confirmPass}
                      onChange={(e) => setPasswords({ ...passwords, confirmPass: e.target.value })}
                      placeholder="Re-enter password"
                      className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-orange-500 hover:text-white text-gray-300 border border-white/10 text-xs font-semibold transition-all"
              >
                Update Password
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 font-bold text-white text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Two-Factor Authentication (2FA)</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">Enforced across enterprise recruiter organization.</p>
                </div>
                <span className="text-xs text-emerald-400 font-semibold font-mono">Active (TOTP)</span>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 font-bold text-white text-xs">
                    <MonitorSmartphone className="w-4 h-4 text-orange-400" />
                    <span>Active Session</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">MacBook Pro • Chrome 126 (San Francisco, CA)</p>
                </div>
                <span className="text-xs text-emerald-400 font-semibold">Active Now</span>
              </div>
            </div>
          </section>
        )}

        {/* ================= 3. NOTIFICATION PREFERENCES MATRIX ================= */}
        {(activeTab === "all" || activeTab === "notifications") && (
          <section className="p-6 sm:p-7 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Notification Preferences Matrix</h2>
                <p className="text-xs text-gray-400">Configure real-time alerts for application intake and student milestones</p>
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {[
                { key: "applications", title: "New Candidate Applications", desc: "Instant alert when candidates apply to active requisitions." },
                { key: "timesheets", title: "Weekly Intern Timesheets", desc: "Reminder before supervisor sign-off deadline every Friday." },
                { key: "interviews", title: "Candidate Interview Confirmations", desc: "Alerts when students accept or reschedule panel sessions." },
                { key: "coordinator", title: "University Coordinator Communications", desc: "Legal compliance inquiries and annual audit feedback." }
              ].map((item) => (
                <div key={item.key} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-white">{item.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setNotifications((p) => ({ ...p, [item.key]: !p[item.key] }));
                      showToast(`Updated notification for ${item.title}`);
                    }}
                    className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
                      notifications[item.key] ? "bg-orange-500" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                        notifications[item.key] ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Delivery Channels */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                Delivery Channels
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setNotifications((p) => ({ ...p, email: !p.email }))}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    notifications.email ? "bg-orange-500/10 border-orange-500/40 text-white" : "bg-black/40 border-white/5 text-gray-400"
                  }`}
                >
                  <div className="text-left">
                    <div className="text-xs font-bold">Email Alerts</div>
                    <div className="text-[10px] text-gray-400">sarah.jenkins@acme.com</div>
                  </div>
                  <div className={`w-4 h-4 rounded flex items-center justify-center text-white ${notifications.email ? "bg-orange-500" : "border border-gray-600"}`}>
                    {notifications.email && <Check className="w-3 h-3" />}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setNotifications((p) => ({ ...p, inApp: !p.inApp }))}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    notifications.inApp ? "bg-orange-500/10 border-orange-500/40 text-white" : "bg-black/40 border-white/5 text-gray-400"
                  }`}
                >
                  <div className="text-left">
                    <div className="text-xs font-bold">In-App Popups</div>
                    <div className="text-[10px] text-gray-400">Desktop notifications</div>
                  </div>
                  <div className={`w-4 h-4 rounded flex items-center justify-center text-white ${notifications.inApp ? "bg-orange-500" : "border border-gray-600"}`}>
                    {notifications.inApp && <Check className="w-3 h-3" />}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setNotifications((p) => ({ ...p, sms: !p.sms }))}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    notifications.sms ? "bg-orange-500/10 border-orange-500/40 text-white" : "bg-black/40 border-white/5 text-gray-400"
                  }`}
                >
                  <div className="text-left">
                    <div className="text-xs font-bold">SMS Text Alerts</div>
                    <div className="text-[10px] text-gray-400">Urgent offers only</div>
                  </div>
                  <div className={`w-4 h-4 rounded flex items-center justify-center text-white ${notifications.sms ? "bg-orange-500" : "border border-gray-600"}`}>
                    {notifications.sms && <Check className="w-3 h-3" />}
                  </div>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ================= 4. SYSTEM PREFERENCES ================= */}
        {(activeTab === "all" || activeTab === "account") && (
          <section className="p-6 sm:p-7 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">System &amp; Regional Preferences</h2>
                <p className="text-xs text-gray-400">Timezone formatting and student record retention</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-400 font-medium mb-1">Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="America/Los_Angeles">Pacific Time (US &amp; Canada) GMT-07:00</option>
                  <option value="America/New_York">Eastern Time (US &amp; Canada) GMT-04:00</option>
                  <option value="Asia/Kolkata">India Standard Time (IST) GMT+05:30</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">System Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="en-US">English (United States)</option>
                  <option value="en-GB">English (United Kingdom)</option>
                </select>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
