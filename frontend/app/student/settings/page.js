"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Check,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  Globe,
  Info,
  KeyRound,
  Languages,
  Lock,
  Mail,
  MapPin,
  MonitorSmartphone,
  Save,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Trash2,
  UserCheck,
  CheckCircle2,
  Building,
  AlertTriangle,
  Clock,
  Sparkles
} from "lucide-react";

export default function StudentSettingsPage() {
  const [activeTab, setActiveTab] = useState("all"); // all | security | notifications | privacy | account
  const [toastMessage, setToastMessage] = useState(null);

  // Security State
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmPass: ""
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Notification Preferences
  const [notifications, setNotifications] = useState({
    appUpdates: true,
    timesheets: true,
    credits: true,
    messages: true,
    emailChannel: true,
    inAppChannel: true,
    smsChannel: false
  });

  // Privacy Preferences
  const [profileVisibility, setProfileVisibility] = useState("public"); // public | applied_only | private
  const [resumeAccess, setResumeAccess] = useState(true);
  const [maskContact, setMaskContact] = useState(true);

  // Account Settings
  const [language, setLanguage] = useState("en-US");
  const [timezone, setTimezone] = useState("America/Los_Angeles");
  const [ssoConnected, setSsoConnected] = useState(true);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3600);
  };

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
    showToast("Password updated successfully across all active sessions.");
  };

  const handleSaveAll = () => {
    showToast("Settings and preferences saved successfully.");
  };

  // Password requirements validation
  const hasMinLength = passwords.newPass.length >= 8;
  const hasNumber = /\d/.test(passwords.newPass);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(passwords.newPass);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-16">
      {/* Toast */}
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
            <Link href="/student" className="hover:text-orange-400 transition-colors">
              Student
            </Link>
            <span>/</span>
            <span className="text-gray-300">Settings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Student Settings &amp; Preferences
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Configure security, multi-channel notification alerts, and institutional data privacy.
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

      {/* Section Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {[
          { id: "all", label: "All Settings" },
          { id: "security", label: "Password & Security" },
          { id: "notifications", label: "Notifications" },
          { id: "privacy", label: "Privacy & FERPA" },
          { id: "account", label: "Account & Affiliation" }
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

      {/* Settings Grid */}
      <div className="space-y-6">
        {/* ================= 1. CHANGE PASSWORD & SECURITY ================= */}
        {(activeTab === "all" || activeTab === "security") && (
          <section className="p-6 sm:p-7 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Change Password &amp; Security</h2>
                  <p className="text-xs text-gray-400">Keep your academic and career credentials protected</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>2FA Active</span>
              </span>
            </div>

            {/* Password Form */}
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Current Password */}
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

                {/* New Password */}
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

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={passwords.confirmPass}
                      onChange={(e) => setPasswords({ ...passwords, confirmPass: e.target.value })}
                      placeholder="Re-enter new password"
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

              {/* Password Requirements Checklist */}
              <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                <span className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">
                  Requirements:
                </span>
                <span className={`flex items-center gap-1 ${hasMinLength ? "text-emerald-400" : "text-gray-500"}`}>
                  <Check className="w-3.5 h-3.5" /> Minimum 8 characters
                </span>
                <span className={`flex items-center gap-1 ${hasNumber ? "text-emerald-400" : "text-gray-500"}`}>
                  <Check className="w-3.5 h-3.5" /> At least 1 number
                </span>
                <span className={`flex items-center gap-1 ${hasSpecial ? "text-emerald-400" : "text-gray-500"}`}>
                  <Check className="w-3.5 h-3.5" /> At least 1 symbol
                </span>
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-orange-500 hover:text-white text-gray-300 border border-white/10 text-xs font-semibold transition-all"
              >
                Update Password
              </button>
            </form>

            {/* 2FA & Active Sessions Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* 2FA Configuration */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-xs font-bold text-white">Two-Factor Authentication (2FA)</h3>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Protect your login with an authenticator app (e.g. Google Authenticator or 1Password).
                  </p>
                  <span className="inline-block text-[10px] font-mono text-emerald-400 mt-1">
                    Status: Enforced by University Admin
                  </span>
                </div>
                <button
                  onClick={() => showToast("Opening 2FA authenticator enrollment dialog...")}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-medium shrink-0 transition-colors"
                >
                  Configure
                </button>
              </div>

              {/* Active Sessions */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MonitorSmartphone className="w-4 h-4 text-orange-400" />
                    <h3 className="text-xs font-bold text-white">Active Device Session</h3>
                  </div>
                  <p className="text-xs text-gray-300">
                    MacBook Pro • Chrome 126
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Dehradun / San Francisco • Active now (This device)
                  </p>
                </div>
                <button
                  onClick={() => showToast("Terminated all other active browser sessions.")}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/10 text-xs font-medium shrink-0 transition-colors"
                >
                  Log out others
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ================= 2. NOTIFICATION PREFERENCES ================= */}
        {(activeTab === "all" || activeTab === "notifications") && (
          <section className="p-6 sm:p-7 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Notification Preferences</h2>
                <p className="text-xs text-gray-400">Configure what alerts you receive and delivery methods</p>
              </div>
            </div>

            {/* Notification Toggles */}
            <div className="divide-y divide-white/5">
              {[
                {
                  key: "appUpdates",
                  title: "Application Status Updates",
                  desc: "Receive real-time alerts when recruiters review, advance, or update your applications."
                },
                {
                  key: "timesheets",
                  title: "Timesheet & Hours Reminders",
                  desc: "Weekly notifications before the Friday 11:59 PM deadline to log practicum shifts."
                },
                {
                  key: "credits",
                  title: "Credit & Academic Practicum Milestones",
                  desc: "Instant notice when faculty advisors certify semester academic credit units."
                },
                {
                  key: "messages",
                  title: "Supervisor & Advisor Communications",
                  desc: "Direct messages and mid-term / final evaluation feedback notes from industry host mentors."
                }
              ].map((item) => (
                <div key={item.key} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-white">{item.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }));
                      showToast(`Updated preference for ${item.title}`);
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

            {/* Preferred Delivery Channels */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Preferred Delivery Channels
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setNotifications((p) => ({ ...p, emailChannel: !p.emailChannel }));
                    showToast("Email notifications preference updated.");
                  }}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    notifications.emailChannel
                      ? "bg-orange-500/10 border-orange-500/40 text-white"
                      : "bg-black/40 border-white/5 text-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-orange-400" />
                    <div className="text-left">
                      <div className="text-xs font-bold">Email Digest</div>
                      <div className="text-[10px] text-gray-400">Primary .edu address</div>
                    </div>
                  </div>
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center text-white ${
                      notifications.emailChannel ? "bg-orange-500" : "border border-gray-600"
                    }`}
                  >
                    {notifications.emailChannel && <Check className="w-3 h-3" />}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setNotifications((p) => ({ ...p, inAppChannel: !p.inAppChannel }));
                    showToast("In-app notifications preference updated.");
                  }}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    notifications.inAppChannel
                      ? "bg-orange-500/10 border-orange-500/40 text-white"
                      : "bg-black/40 border-white/5 text-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Bell className="w-4 h-4 text-orange-400" />
                    <div className="text-left">
                      <div className="text-xs font-bold">In-App Popups</div>
                      <div className="text-[10px] text-gray-400">Browser toast alerts</div>
                    </div>
                  </div>
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center text-white ${
                      notifications.inAppChannel ? "bg-orange-500" : "border border-gray-600"
                    }`}
                  >
                    {notifications.inAppChannel && <Check className="w-3 h-3" />}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setNotifications((p) => ({ ...p, smsChannel: !p.smsChannel }));
                    showToast("SMS notifications preference updated.");
                  }}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    notifications.smsChannel
                      ? "bg-orange-500/10 border-orange-500/40 text-white"
                      : "bg-black/40 border-white/5 text-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Smartphone className="w-4 h-4 text-orange-400" />
                    <div className="text-left">
                      <div className="text-xs font-bold">SMS Text Alerts</div>
                      <div className="text-[10px] text-gray-400">Urgent interview requests</div>
                    </div>
                  </div>
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center text-white ${
                      notifications.smsChannel ? "bg-orange-500" : "border border-gray-600"
                    }`}
                  >
                    {notifications.smsChannel && <Check className="w-3 h-3" />}
                  </div>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ================= 3. PRIVACY PREFERENCES & FERPA ================= */}
        {(activeTab === "all" || activeTab === "privacy") && (
          <section className="p-6 sm:p-7 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Privacy Preferences &amp; FERPA</h2>
                <p className="text-xs text-gray-400">Control profile visibility, resume discoverability, and data export</p>
              </div>
            </div>

            {/* Profile Visibility Options */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Profile Visibility
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  {
                    id: "public",
                    title: "Public to Partner Employers",
                    desc: "Visible to verified co-op hiring partners and university career directors."
                  },
                  {
                    id: "applied_only",
                    title: "Applied Companies Only",
                    desc: "Mask contact and identity from external searches until you apply."
                  },
                  {
                    id: "private",
                    title: "Private Mode",
                    desc: "Completely hidden from external search. Used for faculty research only."
                  }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setProfileVisibility(opt.id);
                      showToast(`Visibility set to: ${opt.title}`);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      profileVisibility === opt.id
                        ? "bg-orange-500/10 border-orange-500/40 text-white shadow-sm"
                        : "bg-black/40 border-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{opt.title}</span>
                      <div
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          profileVisibility === opt.id ? "border-orange-500 bg-orange-500" : "border-gray-500"
                        }`}
                      >
                        {profileVisibility === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-snug">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Privacy Checkboxes */}
            <div className="divide-y divide-white/5 pt-2">
              <div className="py-3 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Resume Access Permissions</h4>
                  <p className="text-xs text-gray-400">Allow verified partner companies to index and search resume keywords.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setResumeAccess(!resumeAccess)}
                  className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
                    resumeAccess ? "bg-orange-500" : "bg-white/10"
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                      resumeAccess ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="py-3 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Mask Phone &amp; Personal Email</h4>
                  <p className="text-xs text-gray-400">Only disclose phone number after mutual interview confirmation.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMaskContact(!maskContact)}
                  className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
                    maskContact ? "bg-orange-500" : "bg-white/10"
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                      maskContact ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Data & Export Card */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-orange-400" />
                  <h4 className="text-xs sm:text-sm font-bold text-white">Export Full Practicum Records</h4>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Download an official archive of all logged hours, supervisor sign-offs, and evaluation PDFs.
                </p>
              </div>
              <button
                onClick={() => showToast("Preparing full timesheet & evaluation ZIP archive...")}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold shrink-0 transition-colors"
              >
                Download Export (ZIP)
              </button>
            </div>
          </section>
        )}

        {/* ================= 4. ACCOUNT SETTINGS & AFFILIATION ================= */}
        {(activeTab === "all" || activeTab === "account") && (
          <section className="p-6 sm:p-7 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Account Settings &amp; Affiliations</h2>
                <p className="text-xs text-gray-400">Institutional Single Sign-On, locale, and identity preferences</p>
              </div>
            </div>

            {/* University SSO Connection Card */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/25 shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">Graphic Era University (GEU)</h3>
                    {ssoConnected && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <Check className="w-3 h-3" /> SSO Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Account authenticated via Shibboleth / SAML 2.0 University Gateway.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSsoConnected(!ssoConnected);
                  showToast(ssoConnected ? "SSO disconnected." : "SSO reconnected successfully.");
                }}
                className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold shrink-0 transition-colors self-start sm:self-auto"
              >
                {ssoConnected ? "Disconnect" : "Connect SSO"}
              </button>
            </div>

            {/* Language & Timezone Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1.5">
                  <Languages className="w-4 h-4 text-orange-400" />
                  <span>Interface Language</span>
                </label>
                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    showToast(`Language set to ${e.target.value}`);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="en-US">English (United States)</option>
                  <option value="en-GB">English (United Kingdom)</option>
                  <option value="hi-IN">Hindi (India)</option>
                  <option value="es-ES">Español (Spanish)</option>
                  <option value="fr-FR">Français (French)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span>Practicum Timezone</span>
                </label>
                <select
                  value={timezone}
                  onChange={(e) => {
                    setTimezone(e.target.value);
                    showToast(`Timezone updated to ${e.target.value}`);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="America/Los_Angeles">Pacific Time (US &amp; Canada) GMT-07:00</option>
                  <option value="America/New_York">Eastern Time (US &amp; Canada) GMT-04:00</option>
                  <option value="Asia/Kolkata">India Standard Time (IST) GMT+05:30</option>
                  <option value="Europe/London">Greenwich Mean Time (London) GMT+01:00</option>
                </select>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="pt-4 border-t border-red-500/20">
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Danger Zone: Account Deactivation</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Deactivating your student profile revokes pending CPT applications and stops internship hour tracking.
                  </p>
                </div>
                <button
                  onClick={() => showToast("Account deactivation requires university coordinator confirmation.")}
                  className="px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600 border border-red-500/40 text-red-300 hover:text-white text-xs font-semibold shrink-0 transition-colors self-start sm:self-auto"
                >
                  Deactivate Account
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
