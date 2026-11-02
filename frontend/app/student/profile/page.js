"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Download,
  ExternalLink,
  FileCheck,
  FileText,
  FileUp,
  GraduationCap,
  Link2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Share2,
  Sparkles,
  Star,
  Trash2,
  UploadCloud,
  User,
  UserCheck,
  X,
  AlertCircle
} from "lucide-react";

export default function StudentProfilePage() {
  // Empty profile initial state as requested: "in beginning all the sections will be empty and updated after edit"
  const emptyProfile = {
    fullName: "",
    preferredName: "",
    headline: "",
    bio: "",
    pronouns: "",
    institutionalEmail: "",
    personalEmail: "",
    phone: "",
    address: "",
    university: "",
    department: "",
    degree: "",
    rollNumber: "",
    currentTerm: "",
    cgpa: "",
    linkedIn: "",
    github: "",
    portfolio: "",
    technicalSkills: [],
    toolsFrameworks: [],
    documents: []
  };

  // Demo profile template for instant testing
  const sampleProfile = {
    fullName: "Nishita Upreti",
    preferredName: "Nishita",
    headline: "B.Tech Computer Science | Backend & Distributed Systems Co-op",
    bio: "Undergraduate Computer Science researcher passionate about scalable distributed systems, consensus protocols, and low-latency storage engines.",
    pronouns: "she/her",
    institutionalEmail: "nishita.upreti@university.edu",
    personalEmail: "nishita.upreti.dev@gmail.com",
    phone: "+91 98765 43210",
    address: "Dehradun, Uttarakhand, India",
    university: "Graphic Era University (GEU)",
    department: "School of Computer Science & Engineering",
    degree: "Bachelor of Technology in Computer Science",
    rollNumber: "GEU2023CSE0148",
    currentTerm: "Semester 6 (Spring 2025)",
    cgpa: "8.9 / 10.0",
    linkedIn: "https://linkedin.com/in/nishitaupreti",
    github: "https://github.com/nishitaupreti",
    portfolio: "https://nishitaupreti.dev",
    technicalSkills: ["Go (Golang)", "Python", "Java", "C++", "PostgreSQL", "Kafka", "Redis", "Distributed Systems"],
    toolsFrameworks: ["Docker", "Kubernetes", "AWS", "Git", "Terraform", "GitHub Actions", "Linux Kernel / eBPF"],
    documents: [
      {
        id: "doc-1",
        name: "Nishita_Upreti_Resume_2025.pdf",
        tag: "Primary Resume",
        size: "184 KB",
        date: "Oct 24, 2025"
      },
      {
        id: "doc-2",
        name: "Official_Semester_6_Transcript.pdf",
        tag: "Academic Transcript",
        size: "420 KB",
        date: "Sep 15, 2025"
      }
    ]
  };

  const [profile, setProfile] = useState(emptyProfile);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTab, setEditTab] = useState("personal"); // personal | academic | skills | links
  const [formData, setFormData] = useState(emptyProfile);
  const [toastMessage, setToastMessage] = useState(null);

  // Load from localStorage or leave empty initially
  useEffect(() => {
    try {
      const saved = localStorage.getItem("student_profile_data");
      if (saved) {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
        setFormData(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3600);
  };

  // Profile completion calculation
  const completionStats = () => {
    const fields = [
      profile.fullName,
      profile.headline,
      profile.institutionalEmail,
      profile.phone,
      profile.address,
      profile.university,
      profile.degree,
      profile.department,
      profile.rollNumber,
      profile.cgpa,
      profile.technicalSkills.length > 0,
      profile.documents.length > 0
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  };

  const completionPercent = completionStats();

  const handleOpenEdit = (tab = "personal") => {
    setFormData({ ...profile });
    setEditTab(tab);
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile(formData);
    try {
      localStorage.setItem("student_profile_data", JSON.stringify(formData));
    } catch {
      // ignore
    }
    setIsEditModalOpen(false);
    showToast("Profile updated successfully!");
  };

  const handleLoadSample = () => {
    setProfile(sampleProfile);
    setFormData(sampleProfile);
    try {
      localStorage.setItem("student_profile_data", JSON.stringify(sampleProfile));
    } catch {
      // ignore
    }
    showToast("Loaded verified profile sample!");
  };

  const handleClearProfile = () => {
    setProfile(emptyProfile);
    setFormData(emptyProfile);
    try {
      localStorage.removeItem("student_profile_data");
    } catch {
      // ignore
    }
    showToast("Profile reset to empty state.");
  };

  // Helper for comma-separated skills input
  const [techSkillInput, setTechSkillInput] = useState("");
  const [toolInput, setToolInput] = useState("");

  const addTechSkill = () => {
    if (!techSkillInput.trim()) return;
    const items = techSkillInput.split(",").map((s) => s.trim()).filter(Boolean);
    setFormData((prev) => ({
      ...prev,
      technicalSkills: [...new Set([...prev.technicalSkills, ...items])]
    }));
    setTechSkillInput("");
  };

  const removeTechSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      technicalSkills: prev.technicalSkills.filter((s) => s !== skill)
    }));
  };

  const addTool = () => {
    if (!toolInput.trim()) return;
    const items = toolInput.split(",").map((s) => s.trim()).filter(Boolean);
    setFormData((prev) => ({
      ...prev,
      toolsFrameworks: [...new Set([...prev.toolsFrameworks, ...items])]
    }));
    setToolInput("");
  };

  const removeTool = (tool) => {
    setFormData((prev) => ({
      ...prev,
      toolsFrameworks: prev.toolsFrameworks.filter((t) => t !== tool)
    }));
  };

  const handleUploadResumeMock = () => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: `${(profile.fullName || "Student").replace(/\s+/g, "_")}_Resume.pdf`,
      tag: "Uploaded Resume",
      size: "210 KB",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };
    const updated = {
      ...profile,
      documents: [newDoc, ...profile.documents]
    };
    setProfile(updated);
    try {
      localStorage.setItem("student_profile_data", JSON.stringify(updated));
    } catch {}
    showToast("Resume PDF uploaded and attached to profile!");
  };

  const isProfileEmpty =
    !profile.fullName &&
    !profile.university &&
    profile.technicalSkills.length === 0 &&
    profile.documents.length === 0;

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-16">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-orange-600 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Breadcrumb */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/student" className="hover:text-orange-400 transition-colors">
              Student
            </Link>
            <span>/</span>
            <span className="text-gray-300">Profile</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Student Profile Dossier
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Manage your verified academic credentials, technical skills, and co-op resume.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {isProfileEmpty ? (
            <button
              onClick={handleLoadSample}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors"
            >
              Pre-fill Demo Data
            </button>
          ) : (
            <button
              onClick={handleClearProfile}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-white/10 text-xs font-semibold transition-colors"
            >
              Reset to Empty
            </button>
          )}

          <button
            onClick={() => handleOpenEdit("personal")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all"
          >
            <Pencil className="w-4 h-4" />
            <span>{isProfileEmpty ? "Complete Profile" : "Edit Profile"}</span>
          </button>
        </div>
      </section>

      {/* Profile Hero Card */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#1c1c1c] border border-white/10 relative overflow-hidden">
        {/* Amber Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-600 to-amber-700 text-white font-bold text-2xl flex items-center justify-center shrink-0 shadow-xl border border-white/10">
              {profile.fullName ? (
                profile.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)
              ) : (
                <User className="w-8 h-8 text-white/80" />
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {profile.fullName || "Your Name (Not Set)"}
                </h2>
                {profile.pronouns && (
                  <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">
                    {profile.pronouns}
                  </span>
                )}
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                    completionPercent >= 80
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                  }`}
                >
                  {completionPercent >= 80 ? "Verified Profile" : "Profile Incomplete"}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                {profile.headline || (
                  <span className="text-gray-500 italic">
                    No professional headline added. Click "Edit Profile" to define your career mandate and goals.
                  </span>
                )}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-400 pt-1 flex-wrap">
                {profile.university ? (
                  <span className="flex items-center gap-1.5 text-gray-300">
                    <Building2 className="w-3.5 h-3.5 text-orange-400" />
                    {profile.university}
                  </span>
                ) : (
                  <span className="text-gray-500">Institution: Not set</span>
                )}
                <span>•</span>
                {profile.currentTerm ? (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    {profile.currentTerm}
                  </span>
                ) : (
                  <span className="text-gray-500">Term: Not set</span>
                )}
                <span>•</span>
                {profile.rollNumber ? (
                  <span className="font-mono text-orange-400 font-semibold">
                    ID: {profile.rollNumber}
                  </span>
                ) : (
                  <span className="text-gray-500">Student ID: None</span>
                )}
              </div>
            </div>
          </div>

          {/* Profile Completion Bar */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 md:w-64 shrink-0 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400 font-medium">Profile Completeness</span>
              <span className="font-bold text-orange-400 font-mono">{completionPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-gray-500 leading-tight">
              {completionPercent < 80
                ? "Complete all fields to unlock partner employer discovery."
                : "Profile meets requirements for CPT practicum certification."}
            </p>
          </div>
        </div>
      </section>

      {/* Main 2-Column Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Personal Info, Academic Info, Bio */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* 1. Personal & Contact Information */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-orange-400" />
                <h3 className="text-base font-bold text-white">Personal &amp; Contact Information</h3>
              </div>
              <button
                onClick={() => handleOpenEdit("personal")}
                className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 hover:underline"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>

            {/* Check if contact info is empty */}
            {!profile.fullName && !profile.institutionalEmail && !profile.phone ? (
              <div className="p-8 text-center rounded-xl bg-black/20 border border-dashed border-white/10 space-y-3">
                <AlertCircle className="w-8 h-8 text-gray-500 mx-auto" />
                <div>
                  <h4 className="text-sm font-semibold text-white">No Contact Details Recorded</h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                    Your contact information will be provided to verified internship hosts upon interview scheduling.
                  </p>
                </div>
                <button
                  onClick={() => handleOpenEdit("personal")}
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors"
                >
                  + Add Contact Details
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">
                    Full Legal Name
                  </span>
                  <div className="text-white font-medium text-sm">
                    {profile.fullName || <span className="text-gray-500 italic">Not set</span>}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">
                    Preferred Name
                  </span>
                  <div className="text-white font-medium text-sm">
                    {profile.preferredName || <span className="text-gray-500 italic">Not set</span>}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">
                    Institutional Email (.edu)
                  </span>
                  <div className="text-orange-400 font-medium text-sm flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{profile.institutionalEmail || <span className="text-gray-500 italic">Not set</span>}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">
                    Personal Email
                  </span>
                  <div className="text-gray-300 font-medium text-sm">
                    {profile.personalEmail || <span className="text-gray-500 italic">Not set</span>}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">
                    Phone Number
                  </span>
                  <div className="text-gray-300 font-medium text-sm flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>{profile.phone || <span className="text-gray-500 italic">Not set</span>}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">
                    Location / Permanent Address
                  </span>
                  <div className="text-gray-300 font-medium text-sm flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{profile.address || <span className="text-gray-500 italic">Not set</span>}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. University & Academic Information */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-orange-400" />
                <h3 className="text-base font-bold text-white">University &amp; Academic Information</h3>
              </div>
              <button
                onClick={() => handleOpenEdit("academic")}
                className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 hover:underline"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>

            {!profile.university && !profile.degree ? (
              <div className="p-8 text-center rounded-xl bg-black/20 border border-dashed border-white/10 space-y-3">
                <GraduationCap className="w-8 h-8 text-gray-500 mx-auto" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Academic Details Not Entered</h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                    Please provide your university, degree program, and current CGPA for credit approval.
                  </p>
                </div>
                <button
                  onClick={() => handleOpenEdit("academic")}
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors"
                >
                  + Add Academic Details
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1 sm:col-span-2">
                  <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">
                    University / Institution
                  </span>
                  <div className="text-white font-bold text-sm">
                    {profile.university || <span className="text-gray-500 italic">Not set</span>}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">
                    Degree Program
                  </span>
                  <div className="text-white font-medium text-sm">
                    {profile.degree || <span className="text-gray-500 italic">Not set</span>}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">
                    Department / Specialization
                  </span>
                  <div className="text-white font-medium text-sm">
                    {profile.department || <span className="text-gray-500 italic">Not set</span>}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">
                    Student ID / Roll Number
                  </span>
                  <div className="text-orange-400 font-mono font-semibold text-sm">
                    {profile.rollNumber || <span className="text-gray-500 italic">Not set</span>}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">
                    Current Term / Standing
                  </span>
                  <div className="text-gray-200 font-medium text-sm">
                    {profile.currentTerm || <span className="text-gray-500 italic">Not set</span>}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1 sm:col-span-2">
                  <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">
                    Cumulative Grade Point Average (CGPA)
                  </span>
                  <div className="text-emerald-400 font-bold font-mono text-base flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span>{profile.cgpa || <span className="text-gray-500 italic text-sm">Not set</span>}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Bio & Career Mandate */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-orange-400" />
                <h3 className="text-base font-bold text-white">About &amp; Career Objective</h3>
              </div>
              <button
                onClick={() => handleOpenEdit("personal")}
                className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 hover:underline"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>

            {profile.bio ? (
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed p-4 rounded-xl bg-black/40 border border-white/5">
                {profile.bio}
              </p>
            ) : (
              <div className="p-6 text-center rounded-xl bg-black/20 border border-dashed border-white/10 text-xs text-gray-500">
                No bio provided yet. Add a short summary of your background, engineering interests, and practicum goals.
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Skills, Resume & Artifacts, External Links */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* 1. Skills & Competencies */}
          <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <h3 className="text-base font-bold text-white">Skills &amp; Competencies</h3>
              </div>
              <button
                onClick={() => handleOpenEdit("skills")}
                className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {profile.technicalSkills.length === 0 && profile.toolsFrameworks.length === 0 ? (
              <div className="p-6 text-center rounded-xl bg-black/20 border border-dashed border-white/10 space-y-2">
                <p className="text-xs text-gray-400">No skills added yet.</p>
                <button
                  onClick={() => handleOpenEdit("skills")}
                  className="px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-semibold"
                >
                  + Add Skills
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {profile.technicalSkills.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Technical Skills
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.technicalSkills.map((sk) => (
                        <span
                          key={sk}
                          className="px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-300 border border-orange-500/20 text-xs font-mono font-medium"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {profile.toolsFrameworks.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Tools &amp; Frameworks
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.toolsFrameworks.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 rounded-lg bg-black/40 text-gray-300 border border-white/10 text-xs font-mono"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. Resume & Documents */}
          <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-400" />
                <h3 className="text-base font-bold text-white">Resume &amp; Documents</h3>
              </div>
              <button
                onClick={handleUploadResumeMock}
                className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 hover:underline"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload</span>
              </button>
            </div>

            {profile.documents.length === 0 ? (
              <div className="p-6 text-center rounded-xl bg-black/20 border border-dashed border-white/10 space-y-2">
                <FileUp className="w-6 h-6 text-gray-500 mx-auto" />
                <p className="text-xs text-gray-400">No documents uploaded yet.</p>
                <button
                  onClick={handleUploadResumeMock}
                  className="px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-semibold"
                >
                  Upload Primary Resume
                </button>
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                {profile.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 flex items-center justify-between gap-3 group transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileCheck className="w-4 h-4 text-orange-400 shrink-0" />
                      <div className="min-w-0">
                        <div className="font-semibold text-white truncate group-hover:text-orange-400 transition-colors">
                          {doc.name}
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">
                          {doc.tag} • {doc.size} • {doc.date}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => showToast(`Downloading ${doc.name}...`)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Links & Portfolios */}
          <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Online Profiles
              </h3>
              <button
                onClick={() => handleOpenEdit("links")}
                className="text-xs text-orange-400 hover:text-orange-300 font-semibold"
              >
                Edit
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <span className="text-gray-400">LinkedIn</span>
                {profile.linkedIn ? (
                  <a
                    href={profile.linkedIn}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-gray-500 italic">Not provided</span>
                )}
              </div>

              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <span className="text-gray-400">GitHub</span>
                {profile.github ? (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                  >
                    <span>View Code</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-gray-500 italic">Not provided</span>
                )}
              </div>

              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <span className="text-gray-400">Portfolio</span>
                {profile.portfolio ? (
                  <a
                    href={profile.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                  >
                    <span>Visit Site</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-gray-500 italic">Not provided</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= EDIT PROFILE MODAL FORM ================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-[#1c1c1c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
                  <Pencil className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Edit Student Profile Dossier</h3>
                  <p className="text-xs text-gray-400">Update verified records for internship applications</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="px-6 py-2.5 border-b border-white/10 bg-black/20 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
              {[
                { id: "personal", label: "Personal & Contact" },
                { id: "academic", label: "Academic Info" },
                { id: "skills", label: "Skills & Tech" },
                { id: "links", label: "Bio & Social Links" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setEditTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    editTab === tab.id
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Fields Body */}
            <form onSubmit={handleSaveProfile} className="p-6 overflow-y-auto space-y-4 text-xs">
              {/* TAB 1: PERSONAL & CONTACT */}
              {editTab === "personal" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-medium mb-1">Full Legal Name *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Nishita Upreti"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-medium mb-1">Preferred First Name</label>
                      <input
                        type="text"
                        value={formData.preferredName}
                        onChange={(e) => setFormData({ ...formData, preferredName: e.target.value })}
                        placeholder="e.g. Nishita"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-medium mb-1">Institutional Email (.edu) *</label>
                      <input
                        type="email"
                        value={formData.institutionalEmail}
                        onChange={(e) => setFormData({ ...formData, institutionalEmail: e.target.value })}
                        placeholder="e.g. nishita.upreti@university.edu"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-medium mb-1">Personal Email</label>
                      <input
                        type="email"
                        value={formData.personalEmail}
                        onChange={(e) => setFormData({ ...formData, personalEmail: e.target.value })}
                        placeholder="e.g. nishita.upreti.dev@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-medium mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-medium mb-1">Location / Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="e.g. Dehradun, Uttarakhand, India"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 font-medium mb-1">Pronouns (Optional)</label>
                    <input
                      type="text"
                      value={formData.pronouns}
                      onChange={(e) => setFormData({ ...formData, pronouns: e.target.value })}
                      placeholder="e.g. she/her or they/them"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: ACADEMIC INFO */}
              {editTab === "academic" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 font-medium mb-1">University / College Name *</label>
                    <input
                      type="text"
                      value={formData.university}
                      onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                      placeholder="e.g. Graphic Era University (GEU)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-medium mb-1">Degree Program</label>
                      <input
                        type="text"
                        value={formData.degree}
                        onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                        placeholder="e.g. B.Tech Computer Science & Engineering"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-medium mb-1">Department / Branch</label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        placeholder="e.g. School of Computer Science & Engineering"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-400 font-medium mb-1">Student / Roll Number</label>
                      <input
                        type="text"
                        value={formData.rollNumber}
                        onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                        placeholder="e.g. GEU2023CSE0148"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-medium mb-1">Current Term / Year</label>
                      <input
                        type="text"
                        value={formData.currentTerm}
                        onChange={(e) => setFormData({ ...formData, currentTerm: e.target.value })}
                        placeholder="e.g. Semester 6 (3rd Year)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-medium mb-1">Cumulative GPA / CGPA</label>
                      <input
                        type="text"
                        value={formData.cgpa}
                        onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                        placeholder="e.g. 8.9 / 10.0"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SKILLS */}
              {editTab === "skills" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 font-medium mb-1">
                      Technical Skills (Languages &amp; Core Systems)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={techSkillInput}
                        onChange={(e) => setTechSkillInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTechSkill())}
                        placeholder="Type skill and press Add (e.g. Go, Python, Kafka)"
                        className="flex-1 px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                      />
                      <button
                        type="button"
                        onClick={addTechSkill}
                        className="px-4 py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {formData.technicalSkills.map((sk) => (
                        <span
                          key={sk}
                          className="px-2.5 py-1 rounded-lg bg-orange-500/15 text-orange-300 border border-orange-500/30 flex items-center gap-1.5"
                        >
                          <span>{sk}</span>
                          <button
                            type="button"
                            onClick={() => removeTechSkill(sk)}
                            className="text-orange-400 hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <label className="block text-gray-400 font-medium mb-1">
                      Tools, DevOps &amp; Cloud Frameworks
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={toolInput}
                        onChange={(e) => setToolInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTool())}
                        placeholder="Type tool and press Add (e.g. Docker, Kubernetes, AWS)"
                        className="flex-1 px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                      />
                      <button
                        type="button"
                        onClick={addTool}
                        className="px-4 py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {formData.toolsFrameworks.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 rounded-lg bg-black/40 text-gray-300 border border-white/10 flex items-center gap-1.5"
                        >
                          <span>{tool}</span>
                          <button
                            type="button"
                            onClick={() => removeTool(tool)}
                            className="text-gray-400 hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: BIO & SOCIAL LINKS */}
              {editTab === "links" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 font-medium mb-1">Professional Headline</label>
                    <input
                      type="text"
                      value={formData.headline}
                      onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                      placeholder="e.g. B.Tech Computer Science | Backend & Distributed Systems Co-op"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 font-medium mb-1">About Me / Bio Statement</label>
                    <textarea
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Describe your technical background, research interests, and co-op aspirations..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div>
                      <label className="block text-gray-400 font-medium mb-1">LinkedIn Profile</label>
                      <input
                        type="url"
                        value={formData.linkedIn}
                        onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-medium mb-1">GitHub Profile</label>
                      <input
                        type="url"
                        value={formData.github}
                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-medium mb-1">Portfolio Site</label>
                      <input
                        type="url"
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                        placeholder="https://mysite.dev"
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Form Modal Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/20 transition-all"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
