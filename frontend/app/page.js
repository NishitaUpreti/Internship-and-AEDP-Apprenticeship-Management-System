"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Building2,
  Users,
  Award,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileText,
  Sparkles,
  BarChart3,
  ChevronRight,
  Lock,
  Scale,
  FileCheck,
  HelpCircle,
  AlertCircle,
  ExternalLink,
  Briefcase,
  Layers,
  Search,
  Sliders,
  Check,
  BookOpen,
  BadgeCheck,
  QrCode,
  Calendar,
  DollarSign,
  TrendingUp,
  Fingerprint,
  CheckCheck,
  X,
  Menu,
  FileSpreadsheet,
  Workflow,
  AlertTriangle,
  FolderCheck,
  UserCheck,
  Eye,
  Mail,
  Building,
  Send
} from "lucide-react";

export default function Home() {
  // Mobile navigation drawer toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Request a Demo Modal State
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoForm, setDemoForm] = useState({
    name: "",
    email: "",
    institution: "",
    role: "Dean / Academic Leadership",
    cohortSize: "500 - 2,000 Students",
    message: ""
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  // Interactive Credit Mapping Sandbox State
  const [creditHours, setCreditHours] = useState(120);

  // Active Stakeholder Tab State
  const [activeStakeholder, setActiveStakeholder] = useState("students");

  // Handle Demo Form Submit
  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (!demoForm.name || !demoForm.email || !demoForm.institution) return;
    setDemoSubmitted(true);
  };

  const resetDemoModal = () => {
    setDemoModalOpen(false);
    setTimeout(() => {
      setDemoSubmitted(false);
      setDemoForm({
        name: "",
        email: "",
        institution: "",
        role: "Dean / Academic Leadership",
        cohortSize: "500 - 2,000 Students",
        message: ""
      });
    }, 300);
  };

  // Credit calculation logic (Configurable rule: 30 verified hours = 1 academic credit)
  const computedCredits = Math.floor(creditHours / 30);
  const remainingHoursToNextCredit = 30 - (creditHours % 30);

  // Stakeholder Content Map
  const stakeholderData = {
    students: {
      id: "students",
      role: "Students & Apprentices",
      tagline: "Transparent work logging and verified credit progression.",
      icon: GraduationCap,
      description: "Students gain an intuitive workspace to discover verified opportunities, track working hours daily, monitor their academic credit accrual, and preserve verified completion records.",
      capabilities: [
        "Discover pre-screened internships and apprenticeships with credit weightings",
        "Sign legally structured tripartite agreements electronically with university and employer",
        "Log daily tasks, shifts, and working hours with timestamp integrity",
        "Real-time visual tracker mapping 30 verified hours to 1 academic credit",
        "Access digital completion credentials with verifiable institutional seals"
      ],
      portalRoute: "/student",
      portalLabel: "Launch Student Portal"
    },
    supervisors: {
      id: "supervisors",
      role: "Industry Supervisors",
      tagline: "Two-tap mobile hour verification and rubric-based competency evaluations.",
      icon: Building2,
      description: "External workplace mentors operate within a secure, dedicated environment to verify daily student hours, monitor attendance, and submit structured milestone assessments.",
      capabilities: [
        "Scoped external access restricted strictly to assigned apprentices",
        "Two-tap shift verification for daily student work logs on mobile or desktop",
        "Flag attendance anomalies, excessive hours (>12h/day), or unverified shifts",
        "Complete standardized mid-term and final performance evaluations against academic rubrics",
        "Direct communication channel for workplace safety or incident reporting"
      ],
      portalRoute: "/supervisor",
      portalLabel: "Industry Supervisor Portal"
    },
    faculty: {
      id: "faculty",
      role: "Faculty Supervisors & Mentors",
      tagline: "Academic oversight, evaluation moderation, and formal credit sign-off.",
      icon: Users,
      description: "Faculty mentors maintain continuous academic supervision over placed students, moderate industry evaluations against university rubrics, and authorize final credit awards.",
      capabilities: [
        "Continuous oversight of assigned student cohorts across registered employers",
        "Audit daily student hour logs with automated flags for timetable class conflicts",
        "Moderate and calibrate external industry evaluation scores against institutional grading",
        "Mandatory faculty sign-off gate before any computed credit is awarded to student transcripts",
        "Review periodic student deliverable submissions and workplace learning reports"
      ],
      portalRoute: "/faculty",
      portalLabel: "Faculty Supervisor Console"
    },
    coordinators: {
      id: "coordinators",
      role: "Internship Coordinators",
      tagline: "Institutional partner management, documentation tracking, and compliance.",
      icon: Award,
      description: "Coordinators manage the institutional employer registry, monitor legal tripartite execution timelines, and resolve documentation bottlenecks across departments.",
      capabilities: [
        "Centralized employer directory with organizational verification workflows",
        "Automated tripartite agreement generation, status tracking, and template versioning",
        "Institutional compliance dashboard flagging missing documents, inactive logs, or delays",
        "Cohort-wide analytics tracking placement status, stipend distributions, and hours",
        "Manage confidential safety declarations and escalate workplace concerns"
      ],
      portalRoute: "/coordinator",
      portalLabel: "Internship Coordinator Hub"
    },
    leadership: {
      id: "leadership",
      role: "Deans & Academic Leadership",
      tagline: "Accreditation readiness, credit governance, and institutional reporting.",
      icon: Scale,
      description: "Academic leadership and Deans gain strategic oversight into work-based learning across all departments with audit-ready documentation for institutional accreditation.",
      capabilities: [
        "Incorporate experiential work-based learning directly into curriculum degree credit structures",
        "Generate comprehensive audit dossiers for NAAC Criteria 1.3 and NBA Tier-1 compliance",
        "Macro-level analytics on partner companies, student placement rates, and average stipends",
        "Ensure institutional adherence to UGC Apprenticeship-Embedded Degree Programme norms",
        "Department-level comparison of completed credits and industry engagement metrics"
      ],
      portalRoute: "/dean",
      portalLabel: "Academic Office & Dean Console"
    }
  };

  const activeStakeholderInfo = stakeholderData[activeStakeholder];
  const StakeholderIcon = activeStakeholderInfo.icon;

  return (
    <div className="min-h-screen bg-[#111111] text-[#F5F5F5] font-sans selection:bg-[#FF6B00] selection:text-white flex flex-col">
      
      {/* ========================================================================= */}
      {/* SECTION 1 — NAVIGATION BAR                                                */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#111111]/90 backdrop-blur-md border-b border-[#303030] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left: WorkLedger Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <Image
              src="/WorkLedgerLogo-v2.png"
              alt="WorkLedger Logo"
              width={220}
              height={60}
              className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#9EB3CD]">
            <a href="#platform" className="hover:text-white transition-colors">Platform</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#credit-engine" className="hover:text-white transition-colors">Credit Mapping</a>
            <a href="#stakeholders" className="hover:text-white transition-colors">Solutions</a>
            <a href="#governance" className="hover:text-white transition-colors">Accountability</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-[#9EB3CD] hover:text-white px-3 py-2 rounded-lg hover:bg-[#1D1D1D] transition-colors"
            >
              Login
            </Link>
            <button
              type="button"
              onClick={() => setDemoModalOpen(true)}
              className="text-sm font-semibold bg-[#FF6B00] hover:bg-[#FF7D1A] text-white px-5 py-2.5 rounded-xl shadow-sm transition-all hover:shadow-[#FF6B00]/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              Request a Demo
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#9EB3CD] hover:text-white hover:bg-[#1D1D1D] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-[#303030] bg-[#171717] px-4 pt-4 pb-6 space-y-3 animate-in fade-in duration-200">
            <a
              href="#platform"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#9EB3CD] hover:text-white hover:bg-[#1D1D1D] rounded-lg"
            >
              Platform
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#9EB3CD] hover:text-white hover:bg-[#1D1D1D] rounded-lg"
            >
              How It Works
            </a>
            <a
              href="#credit-engine"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#9EB3CD] hover:text-white hover:bg-[#1D1D1D] rounded-lg"
            >
              Credit Mapping
            </a>
            <a
              href="#stakeholders"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#9EB3CD] hover:text-white hover:bg-[#1D1D1D] rounded-lg"
            >
              Solutions
            </a>
            <a
              href="#governance"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#9EB3CD] hover:text-white hover:bg-[#1D1D1D] rounded-lg"
            >
              Accountability
            </a>
            <div className="pt-3 border-t border-[#303030] flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold text-[#F5F5F5] bg-[#242424] hover:bg-[#303030] rounded-xl"
              >
                Login to Portal
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDemoModalOpen(true);
                }}
                className="w-full text-center py-2.5 text-sm font-semibold bg-[#FF6B00] hover:bg-[#FF7D1A] text-white rounded-xl"
              >
                Request a Demo
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* SECTION 2 — HERO SECTION                                                  */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#303030]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Clear Value Proposition */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              {/* Institutional Framework Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#1D1D1D] border border-[#303030] text-xs font-semibold text-[#9EB3CD]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                <span>Work-Based Learning & Academic Credit Management</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F5F5] tracking-tight leading-[1.12]">
                Turn Every Internship Into Verified Academic Credit.
              </h1>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-[#9EB3CD] leading-relaxed max-w-xl">
                One connected platform to discover opportunities, manage tripartite agreements, verify working hours, assess outcomes, and map work-based learning to academic credits.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={() => setDemoModalOpen(true)}
                  className="px-6 py-3.5 bg-[#FF6B00] hover:bg-[#FF7D1A] text-white rounded-xl text-sm font-semibold shadow-md shadow-[#FF6B00]/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request a Demo</span>
                  <ArrowRight size={16} />
                </button>

                <a
                  href="#platform"
                  className="px-6 py-3.5 bg-[#171717] hover:bg-[#242424] text-[#F5F5F5] border border-[#303030] rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Explore the Platform</span>
                </a>
              </div>

              {/* Supporting Anchor Statement */}
              <p className="text-xs text-[#78889B] pt-1">
                Built for institutions. Designed for students. Connected to industry.
              </p>

            </div>

            {/* Right Column: Realistic Product Preview (Matching WorkLedger Dashboard) */}
            <div className="lg:col-span-6">
              <div className="bg-[#171717] border border-[#303030] rounded-2xl p-5 shadow-2xl relative">
                
                {/* Product Header Bar */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#303030]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#303030]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#303030]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#303030]"></div>
                    <span className="text-xs font-mono text-[#78889B] ml-2">WorkLedger Portal • Illustrative Preview</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#00D6A0]/10 text-[#00D6A0] border border-[#00D6A0]/20 font-medium">
                    Active Placement
                  </span>
                </div>

                {/* Placement Details Card */}
                <div className="mt-4 bg-[#1D1D1D] border border-[#303030] rounded-xl p-4 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#FF6B00]">Internship Role</span>
                      <h3 className="text-base font-bold text-[#F5F5F5] mt-0.5">Full Stack Cloud Intern</h3>
                      <p className="text-xs text-[#9EB3CD] mt-0.5">Apex Cloud Solutions · Bengaluru (Hybrid)</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-[#78889B] block">Earned Academic Credit</span>
                      <span className="text-lg font-mono font-bold text-[#00D6A0]">4.00 NCrF Credits</span>
                    </div>
                  </div>

                  {/* Credit & Hours Progress Indicator */}
                  <div className="pt-3 border-t border-[#303030] space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#9EB3CD] font-mono">120 / 120 Verified Hours</span>
                      <span className="text-[#F5F5F5] font-semibold">100% Completed</span>
                    </div>
                    <div className="w-full bg-[#242424] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#00D6A0] h-full w-full rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Supervisor Verification & Shift Status Preview */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  
                  {/* Item 1: Supervisor Verification */}
                  <div className="bg-[#1D1D1D] border border-[#303030] p-3.5 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between text-[#78889B]">
                      <span>Supervisor Sign-Off</span>
                      <CheckCircle2 size={14} className="text-[#00D6A0]" />
                    </div>
                    <p className="font-semibold text-[#F5F5F5]">Vikram Mehta</p>
                    <p className="text-[11px] text-[#9EB3CD]">Director of Engineering · 2-Tap Approved</p>
                  </div>

                  {/* Item 2: Faculty Moderation */}
                  <div className="bg-[#1D1D1D] border border-[#303030] p-3.5 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between text-[#78889B]">
                      <span>Faculty Approval Gate</span>
                      <BadgeCheck size={14} className="text-[#FF6B00]" />
                    </div>
                    <p className="font-semibold text-[#F5F5F5]">Prof. Ananya Sharma</p>
                    <p className="text-[11px] text-[#9EB3CD]">Academic Mentor · Formally Moderated</p>
                  </div>

                </div>

                {/* Tripartite Agreement Badge */}
                <div className="mt-3 bg-[#242424] border border-[#303030] p-3 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileCheck size={15} className="text-[#FF6B00]" />
                    <span className="text-[#F5F5F5] font-medium">Tripartite Agreement Executed</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#9EB3CD]">Student • Institution • Employer</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — THE PROBLEM / PRODUCT VALUE                                   */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#171717] border-b border-[#303030]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider mb-2">
              The Administrative Bottleneck
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#F5F5F5] tracking-tight">
              Work-based learning deserves better than spreadsheets.
            </p>
            <p className="mt-4 text-base text-[#9EB3CD] leading-relaxed">
              When institutions manage internships across multiple employers, disconnected spreadsheets, paper evaluation forms, and unverified letters create compliance risks, lost documentation, and delayed graduation credits.
            </p>
          </div>

          {/* Editorial Comparison: Without vs. With WorkLedger */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Column A: Without WorkLedger */}
            <div className="bg-[#1D1D1D] border border-[#303030] rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-[#303030]">
                <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                  <FileSpreadsheet size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F5F5F5]">Without WorkLedger</h3>
                  <p className="text-xs text-[#78889B]">Disconnected manual procedures</p>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-[#9EB3CD]">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>Scattered documents:</strong> Agreement forms and offer letters buried across emails and physical office files.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>Unverified hour reporting:</strong> Retrospective paper logbooks filled at semester end without daily supervisor confirmation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>Disconnected evaluations:</strong> Workplace mentors evaluate using incompatible formats, disconnected from academic rubrics.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>Arbitrary credit awards:</strong> Academic credits assigned subjectively without mathematical hour audit trails.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>Accreditation audit panic:</strong> Weeks spent reconstructing records for institutional regulatory review.</span>
                </li>
              </ul>
            </div>

            {/* Column B: With WorkLedger */}
            <div className="bg-[#1D1D1D] border border-[#FF6B00]/30 rounded-2xl p-6 sm:p-8 space-y-5 shadow-lg shadow-[#FF6B00]/5">
              <div className="flex items-center gap-3 pb-4 border-b border-[#303030]">
                <div className="w-9 h-9 rounded-xl bg-[#00D6A0]/10 text-[#00D6A0] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F5F5F5]">With WorkLedger</h3>
                  <p className="text-xs text-[#00D6A0]">One structured, connected platform</p>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-[#9EB3CD]">
                <li className="flex items-start gap-3">
                  <span className="text-[#00D6A0] font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>Centralized institutional registry:</strong> All vetted employers, opportunities, and digital offers managed in one database.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00D6A0] font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>Verified working-hour records:</strong> Daily student task logs confirmed via 2-tap supervisor approval with anomaly detection.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00D6A0] font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>Connected evaluation workflows:</strong> Industry supervisor rubric scoring seamlessly moderated by assigned faculty mentors.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00D6A0] font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>Configurable credit mapping:</strong> Structured mathematical conversion (30h = 1 Credit) with mandatory faculty approval gates.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00D6A0] font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>Instant compliance dossiers:</strong> One-click comprehensive reporting ready for institutional accreditation reviews.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — HOW WORKLEDGER WORKS                                          */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-20 border-b border-[#303030]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider mb-2">
              The Work-Based Learning Lifecycle
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#F5F5F5] tracking-tight">
              From opportunity to academic credit.
            </p>
            <p className="mt-4 text-base text-[#9EB3CD]">
              A continuous, transparent workflow connecting student effort, employer supervision, and faculty academic oversight.
            </p>
          </div>

          {/* 7-Stage Structured Workflow (Desktop Grid & Mobile Stack) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            
            {[
              {
                step: "01",
                title: "Discover Opportunities",
                actor: "Student & Employer",
                desc: "Employers register openings with skill requirements, stipend, and department eligibility."
              },
              {
                step: "02",
                title: "Apply & Get Selected",
                actor: "Student & Coordinator",
                desc: "Students submit verified credentials; employers review resumes and dispatch digital offers."
              },
              {
                step: "03",
                title: "Sign Tripartite Contract",
                actor: "Student, Industry, Dean",
                desc: "Legally structured 3-way agreement signed electronically before placement commences."
              },
              {
                step: "04",
                title: "Log Working Hours",
                actor: "Student",
                desc: "Student logs daily tasks and hours on mobile with automated timetable collision checks."
              },
              {
                step: "05",
                title: "Verify & Evaluate",
                actor: "Industry Supervisor",
                desc: "Workplace mentor conducts 2-tap shift verification and submits rubric-based performance appraisals."
              },
              {
                step: "06",
                title: "Approve Academic Credit",
                actor: "Faculty Mentor",
                desc: "System computes credit eligibility (30h = 1 Credit); faculty formally approves credit awards."
              },
              {
                step: "07",
                title: "Generate Completion Records",
                actor: "Academic Office",
                desc: "Verifiable digital completion records and accreditation-ready institutional transcripts emitted."
              }
            ].map((stage, idx) => (
              <div
                key={idx}
                className="bg-[#171717] border border-[#303030] hover:border-[#FF6B00]/40 rounded-xl p-4 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#FF6B00]">{stage.step}</span>
                    <span className="text-[10px] font-mono text-[#78889B]">{stage.actor}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#F5F5F5] mb-1.5">{stage.title}</h4>
                  <p className="text-xs text-[#9EB3CD] leading-relaxed">{stage.desc}</p>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 — PLATFORM FEATURES                                             */}
      {/* ========================================================================= */}
      <section id="platform" className="py-20 bg-[#171717] border-b border-[#303030]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider mb-2">
              Comprehensive Capability Matrix
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#F5F5F5] tracking-tight">
              Everything your work-based learning ecosystem needs.
            </p>
            <p className="mt-4 text-base text-[#9EB3CD]">
              Engineered around the operational requirements of university placement departments, academic committees, and corporate partners.
            </p>
          </div>

          {/* Grouped Feature Layouts with Varied Structures */}
          <div className="space-y-8">
            
            {/* Feature Group 1: Opportunities & Employer Management (2-Col Card) */}
            <div className="bg-[#1D1D1D] border border-[#303030] rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#303030]">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FF6B00] font-semibold">Module 01</span>
                  <h3 className="text-xl font-bold text-[#F5F5F5] mt-1">Opportunities & Employer Management</h3>
                </div>
                <span className="text-xs text-[#9EB3CD] font-medium bg-[#242424] px-3 py-1.5 rounded-lg border border-[#303030] self-start md:self-auto">
                  Vetted Registry & Application Pipeline
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs sm:text-sm text-[#9EB3CD]">
                <div className="space-y-1.5">
                  <h4 className="font-semibold text-[#F5F5F5]">Employer Verification</h4>
                  <p className="text-xs text-[#78889B] leading-relaxed">
                    Corporate registration with mandatory tax ID, website, and company contact vetting before posting permissions are granted.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-semibold text-[#F5F5F5]">Credit-Mapped Postings</h4>
                  <p className="text-xs text-[#78889B] leading-relaxed">
                    Internship and apprenticeship listings tagged with department eligibility, CGPA thresholds, stipend, and academic credit weight.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-semibold text-[#F5F5F5]">Application & Offer Dispatch</h4>
                  <p className="text-xs text-[#78889B] leading-relaxed">
                    Prevent duplicate applications, screen candidate resumes, manage shortlists, and issue formal digital placement offers.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Group 2: Tripartite Contracts & Daily Shift Tracking (Side-by-Side) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Agreements & Documentation */}
              <div className="bg-[#1D1D1D] border border-[#303030] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FF6B00] font-semibold">Module 02</span>
                  <h3 className="text-lg font-bold text-[#F5F5F5] mt-1 mb-4">Agreements & Legal Documentation</h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-[#9EB3CD]">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#00D6A0] font-bold">✓</span>
                      <span><strong>Automated Tripartite Generation:</strong> Pre-filled contracts incorporating institutional terms, employer obligations, and student learning goals.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#00D6A0] font-bold">✓</span>
                      <span><strong>3-Party Electronic Signatures:</strong> Sequential digital sign-off from Student, Corporate Director, and University Dean.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#00D6A0] font-bold">✓</span>
                      <span><strong>Template Versioning:</strong> Maintain institutional legal template compliance across academic years.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Work Tracking & Verification */}
              <div className="bg-[#1D1D1D] border border-[#303030] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FF6B00] font-semibold">Module 03</span>
                  <h3 className="text-lg font-bold text-[#F5F5F5] mt-1 mb-4">Work Tracking & Supervisor Verification</h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-[#9EB3CD]">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#00D6A0] font-bold">✓</span>
                      <span><strong>Daily Shift Logging:</strong> Students record task narratives, working hours, and milestones directly from any device.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#00D6A0] font-bold">✓</span>
                      <span><strong>2-Tap Supervisor Confirmation:</strong> Designated industry mentors review and approve shift submissions with zero friction.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#00D6A0] font-bold">✓</span>
                      <span><strong>Automated Anomaly Detection:</strong> Automatic flags for excessive daily hours (&gt;12h) and university timetable class overlaps.</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Feature Group 3: Evaluation & Institutional Oversight (2-Col Card) */}
            <div className="bg-[#1D1D1D] border border-[#303030] rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#303030]">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FF6B00] font-semibold">Modules 04 & 05</span>
                  <h3 className="text-xl font-bold text-[#F5F5F5] mt-1">Evaluations, Academic Credits & Institutional Oversight</h3>
                </div>
                <span className="text-xs text-[#9EB3CD] font-medium bg-[#242424] px-3 py-1.5 rounded-lg border border-[#303030] self-start md:self-auto">
                  Faculty Moderation & Accreditation Dossiers
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs sm:text-sm text-[#9EB3CD]">
                <div className="space-y-1.5">
                  <h4 className="font-semibold text-[#F5F5F5]">Standardized Rubrics</h4>
                  <p className="text-xs text-[#78889B] leading-relaxed">
                    Workplace mentors evaluate apprentice competencies against university-defined rubrics across technical, communication, and ethical dimensions.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-semibold text-[#F5F5F5]">Faculty Credit Approval Gate</h4>
                  <p className="text-xs text-[#78889B] leading-relaxed">
                    The platform computes eligible credits from verified hours, requiring affirmative faculty sign-off before credits can be committed to records.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-semibold text-[#F5F5F5]">Institutional Compliance Dashboard</h4>
                  <p className="text-xs text-[#78889B] leading-relaxed">
                    Identify missing documentation, inactive student logs, and export comprehensive accreditation dossiers for NAAC and NBA reviews.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 — CREDIT MAPPING VISUALIZATION                                  */}
      {/* ========================================================================= */}
      <section id="credit-engine" className="py-20 border-b border-[#303030]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider mb-2">
              The NCrF Credit Engine
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#F5F5F5] tracking-tight">
              Every verified hour moves learning forward.
            </p>
            <p className="mt-4 text-base text-[#9EB3CD]">
              In accordance with work-based learning frameworks, <strong className="text-white">30 verified working hours equal 1 academic credit</strong>. This configurable rule ensures that academic credits represent tangible, supervised industry experience.
            </p>
          </div>

          {/* Interactive Visual Progression Sandbox */}
          <div className="max-w-4xl mx-auto bg-[#171717] border border-[#303030] rounded-2xl p-6 sm:p-10 space-y-8">
            
            {/* Step-by-Step Flow Visualization */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs text-center">
              <div className="p-3 bg-[#1D1D1D] border border-[#303030] rounded-xl">
                <span className="text-[10px] text-[#78889B] font-mono block">Stage 1</span>
                <span className="font-semibold text-[#F5F5F5] block mt-1">Student Logs Hours</span>
                <span className="text-[11px] text-[#9EB3CD]">Daily shift narrative</span>
              </div>
              <div className="p-3 bg-[#1D1D1D] border border-[#303030] rounded-xl">
                <span className="text-[10px] text-[#78889B] font-mono block">Stage 2</span>
                <span className="font-semibold text-[#00D6A0] block mt-1">Supervisor Verifies</span>
                <span className="text-[11px] text-[#9EB3CD]">2-Tap confirmation</span>
              </div>
              <div className="p-3 bg-[#1D1D1D] border border-[#303030] rounded-xl">
                <span className="text-[10px] text-[#78889B] font-mono block">Stage 3</span>
                <span className="font-semibold text-[#FF6B00] block mt-1">System Computes</span>
                <span className="text-[11px] text-[#9EB3CD]">30h = 1 Cr formula</span>
              </div>
              <div className="p-3 bg-[#1D1D1D] border border-[#FF6B00]/40 rounded-xl bg-[#FF6B00]/5">
                <span className="text-[10px] text-[#FF6B00] font-mono block font-bold">Stage 4 · Required</span>
                <span className="font-bold text-[#F5F5F5] block mt-1">Faculty Approves</span>
                <span className="text-[11px] text-[#9EB3CD]">Official grade lock</span>
              </div>
            </div>

            {/* Interactive Slider Simulation */}
            <div className="bg-[#1D1D1D] border border-[#303030] rounded-xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#9EB3CD]">
                    Simulate Verified Working Hours
                  </label>
                  <p className="text-xs text-[#78889B]">Drag slider to calculate eligible credits under the 30h rule</p>
                </div>
                <span className="font-mono text-xl font-bold text-[#FF6B00] self-start sm:self-auto">
                  {creditHours} Verified Hours
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="240"
                step="15"
                value={creditHours}
                onChange={(e) => setCreditHours(Number(e.target.value))}
                className="w-full accent-[#FF6B00] h-2 bg-[#242424] rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-[#78889B] font-mono">
                <span>0h (Start)</span>
                <span>60h (2 Credits)</span>
                <span>120h (4 Credits)</span>
                <span>180h (6 Credits)</span>
                <span>240h (8 Credits)</span>
              </div>
            </div>

            {/* Output Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#242424] border border-[#303030] p-4 rounded-xl text-center">
                <span className="text-xs text-[#9EB3CD] block">Computed Academic Credits</span>
                <span className="text-3xl font-mono font-bold text-[#00D6A0] mt-1 block">
                  {computedCredits} Credits
                </span>
                <span className="text-[11px] text-[#78889B] font-mono">Math: Math.floor({creditHours} / 30)</span>
              </div>

              <div className="bg-[#242424] border border-[#303030] p-4 rounded-xl text-center">
                <span className="text-xs text-[#9EB3CD] block">Hours to Next Credit</span>
                <span className="text-3xl font-mono font-bold text-[#F5F5F5] mt-1 block">
                  {remainingHoursToNextCredit} Hours
                </span>
                <span className="text-[11px] text-[#78889B]">Until next credit threshold</span>
              </div>

              <div className="bg-[#242424] border border-[#303030] p-4 rounded-xl text-center flex flex-col justify-center">
                <span className="text-xs text-[#9EB3CD] block">Governance Status</span>
                <span className="text-xs font-semibold text-[#FF6B00] mt-1.5 flex items-center justify-center gap-1.5">
                  <BadgeCheck size={16} />
                  <span>Faculty Approval Gate Required</span>
                </span>
                <span className="text-[11px] text-[#78889B] mt-1">Never automatically awarded without sign-off</span>
              </div>
            </div>

            {/* Institutional Compliance Notice */}
            <p className="text-xs text-[#78889B] text-center border-t border-[#303030] pt-4 leading-relaxed">
              Note: The 30 hours = 1 credit formula is a configurable institutional parameter aligned with the National Credit Framework (NCrF) and UGC Apprenticeship Embedded Degree Programme guidelines.
            </p>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7 — BUILT FOR EVERY STAKEHOLDER                                   */}
      {/* ========================================================================= */}
      <section id="stakeholders" className="py-20 bg-[#171717] border-b border-[#303030]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider mb-2">
              Role-Based Governance
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#F5F5F5] tracking-tight">
              One platform. Every stakeholder connected.
            </p>
            <p className="mt-4 text-base text-[#9EB3CD]">
              Isolated, purpose-built interfaces designed for each participant in the work-based learning ecosystem.
            </p>
          </div>

          {/* Stakeholder Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto">
            {Object.keys(stakeholderData).map((key) => {
              const item = stakeholderData[key];
              const Icon = item.icon;
              const isActive = activeStakeholder === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveStakeholder(key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#FF6B00] text-white shadow-sm"
                      : "bg-[#1D1D1D] text-[#9EB3CD] hover:text-white border border-[#303030] hover:bg-[#242424]"
                  }`}
                >
                  <Icon size={15} />
                  <span>{item.role}</span>
                </button>
              );
            })}
          </div>

          {/* Active Stakeholder Presentation Card */}
          <div className="max-w-4xl mx-auto bg-[#1D1D1D] border border-[#303030] rounded-2xl p-6 sm:p-10 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#303030]">
              <div>
                <span className="text-xs font-mono text-[#FF6B00] font-semibold uppercase tracking-wider">Stakeholder Workspace</span>
                <h3 className="text-2xl font-bold text-[#F5F5F5] mt-1">{activeStakeholderInfo.role}</h3>
                <p className="text-sm text-[#9EB3CD] mt-1">{activeStakeholderInfo.tagline}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#242424] text-[#FF6B00] border border-[#303030] flex items-center justify-center shrink-0">
                <StakeholderIcon size={24} />
              </div>
            </div>

            <p className="text-sm text-[#F5F5F5] my-6 leading-relaxed">
              {activeStakeholderInfo.description}
            </p>

            <div className="space-y-3 pb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#78889B] block">Key Platform Capabilities</span>
              {activeStakeholderInfo.capabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#9EB3CD]">
                  <CheckCircle2 size={16} className="text-[#00D6A0] shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-[#303030] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#78889B]">
                Access protected by strict role-based authentication middleware.
              </span>
              <Link
                href={activeStakeholderInfo.portalRoute}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#242424] hover:bg-[#303030] text-[#F5F5F5] text-xs font-semibold rounded-xl border border-[#303030] transition-colors flex items-center justify-center gap-2"
              >
                <span>{activeStakeholderInfo.portalLabel}</span>
                <ChevronRight size={14} />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8 — INSTITUTIONAL VISIBILITY & REPORTING                          */}
      {/* ========================================================================= */}
      <section className="py-20 border-b border-[#303030]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider mb-2">
              Strategic Intelligence
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#F5F5F5] tracking-tight">
              Turn work-based learning into measurable institutional records.
            </p>
            <p className="mt-4 text-base text-[#9EB3CD]">
              Gain comprehensive oversight into student participation, employer partnerships, verified hours, and earned academic credits across every department.
            </p>
          </div>

          {/* Institutional Metrics & Reporting Preview */}
          <div className="max-w-5xl mx-auto bg-[#171717] border border-[#303030] rounded-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#303030]">
              <div>
                <span className="text-xs text-[#78889B] font-mono">Institutional Analytics · Illustrative Preview</span>
                <h3 className="text-base font-bold text-[#F5F5F5] mt-0.5">Annual Work-Based Learning Dossier</h3>
              </div>
              <span className="text-xs font-mono text-[#00D6A0] bg-[#00D6A0]/10 border border-[#00D6A0]/20 px-2.5 py-1 rounded-md font-semibold">
                NAAC Criteria 1.3 Audit Ready
              </span>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#1D1D1D] border border-[#303030] p-4 rounded-xl">
                <span className="text-xs text-[#78889B] block">Registered Placements</span>
                <span className="text-2xl font-mono font-bold text-[#F5F5F5] mt-1 block">428</span>
                <span className="text-[11px] text-[#00D6A0] font-medium">100% Tripartite Executed</span>
              </div>
              <div className="bg-[#1D1D1D] border border-[#303030] p-4 rounded-xl">
                <span className="text-xs text-[#78889B] block">Total Logged Hours</span>
                <span className="text-2xl font-mono font-bold text-[#F5F5F5] mt-1 block">51,360</span>
                <span className="text-[11px] text-[#9EB3CD]">Supervisor Verified</span>
              </div>
              <div className="bg-[#1D1D1D] border border-[#303030] p-4 rounded-xl">
                <span className="text-xs text-[#78889B] block">Academic Credits Awarded</span>
                <span className="text-2xl font-mono font-bold text-[#00D6A0] mt-1 block">1,712</span>
                <span className="text-[11px] text-[#78889B]">Faculty Approved</span>
              </div>
              <div className="bg-[#1D1D1D] border border-[#303030] p-4 rounded-xl">
                <span className="text-xs text-[#78889B] block">Corporate Partners</span>
                <span className="text-2xl font-mono font-bold text-[#FF6B00] mt-1 block">84</span>
                <span className="text-[11px] text-[#9EB3CD]">Vetted Organizations</span>
              </div>
            </div>

            {/* Reporting Breakdown List */}
            <div className="bg-[#1D1D1D] border border-[#303030] rounded-xl p-5 space-y-3 text-xs">
              <span className="font-semibold text-[#F5F5F5] uppercase tracking-wider text-[11px] block">
                Accreditation Data Points Automatically Maintained
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#9EB3CD]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#00D6A0] shrink-0" />
                  <span>Student matriculation numbers matched to verified workplace hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#00D6A0] shrink-0" />
                  <span>Partner organization tax IDs and legal signatory records</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#00D6A0] shrink-0" />
                  <span>Industry supervisor designations and shift verification stamps</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#00D6A0] shrink-0" />
                  <span>Faculty mentor evaluation moderation notes and grade lock logs</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9 — TRUST, ACCESS CONTROL & ACCOUNTABILITY                        */}
      {/* ========================================================================= */}
      <section id="governance" className="py-20 bg-[#171717] border-b border-[#303030]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider mb-2">
              Security & Data Governance
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#F5F5F5] tracking-tight">
              Built around accountability.
            </p>
            <p className="mt-4 text-base text-[#9EB3CD]">
              WorkLedger incorporates strict architectural boundaries to guarantee data integrity, participant privacy, and tamper-proof academic audit records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-xs sm:text-sm">
            
            <div className="bg-[#1D1D1D] border border-[#303030] rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#242424] text-[#FF6B00] border border-[#303030] flex items-center justify-center">
                <Lock size={18} />
              </div>
              <h3 className="text-base font-bold text-[#F5F5F5]">Scoped External Access</h3>
              <p className="text-xs text-[#9EB3CD] leading-relaxed">
                Corporate supervisors operate within an isolated external boundary, accessing only their assigned apprentices without visibility into internal university records or other cohorts.
              </p>
            </div>

            <div className="bg-[#1D1D1D] border border-[#303030] rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#242424] text-[#00D6A0] border border-[#303030] flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <h3 className="text-base font-bold text-[#F5F5F5]">Multi-Tier Approval Gates</h3>
              <p className="text-xs text-[#9EB3CD] leading-relaxed">
                Academic credit calculations cannot be self-awarded or directly updated by employers. Every credit milestone requires formal affirmative faculty moderation and sign-off.
              </p>
            </div>

            <div className="bg-[#1D1D1D] border border-[#303030] rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#242424] text-[#9EB3CD] border border-[#303030] flex items-center justify-center">
                <Fingerprint size={18} />
              </div>
              <h3 className="text-base font-bold text-[#F5F5F5]">Tamper-Proof Audit Trails</h3>
              <p className="text-xs text-[#9EB3CD] leading-relaxed">
                Every tripartite agreement signature, shift approval, and evaluation submission is permanently logged with timestamps and participant identifiers to prevent retrospective manipulation.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10 — FINAL CALL TO ACTION                                         */}
      {/* ========================================================================= */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] tracking-tight">
            Bring every work experience into one academic record.
          </h2>

          <p className="text-base sm:text-lg text-[#9EB3CD] max-w-2xl mx-auto leading-relaxed">
            Discover how WorkLedger can connect your students, employers, faculty, and institutional teams through one structured work-based learning platform.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setDemoModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FF6B00] hover:bg-[#FF7D1A] text-white rounded-xl text-sm font-semibold shadow-md shadow-[#FF6B00]/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request a Demo</span>
              <ArrowRight size={16} />
            </button>

            <a
              href="#platform"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#171717] hover:bg-[#242424] text-[#F5F5F5] border border-[#303030] rounded-xl text-sm font-semibold transition-colors"
            >
              <span>Explore WorkLedger</span>
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11 — FOOTER                                                       */}
      {/* ========================================================================= */}
      <footer className="bg-[#111111] border-t border-[#303030] pt-16 pb-12 text-xs text-[#9EB3CD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-[#303030]">
            
            {/* Col 1: Brand & Tagline */}
            <div className="space-y-3 md:col-span-2">
              <Link href="/" className="inline-block focus:outline-none">
                <Image
                  src="/WorkLedgerLogo-v2.png"
                  alt="WorkLedger Logo"
                  width={190}
                  height={52}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <p className="font-semibold text-white text-xs">
                Verified Work • Earned Credit
              </p>
              <p className="text-xs text-[#78889B] leading-relaxed max-w-sm">
                The institutional work-based learning management system connecting opportunities, tripartite agreements, verified hours, evaluations, academic credits, and compliance records.
              </p>
            </div>

            {/* Col 2: Platform Capabilities */}
            <div>
              <h4 className="text-xs font-bold text-[#F5F5F5] uppercase tracking-wider mb-3">Platform</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#platform" className="hover:text-white transition-colors">Opportunities Registry</a></li>
                <li><a href="#platform" className="hover:text-white transition-colors">Applications & Selection</a></li>
                <li><a href="#platform" className="hover:text-white transition-colors">Tripartite Agreements</a></li>
                <li><a href="#platform" className="hover:text-white transition-colors">Hour Tracking & Shift Logs</a></li>
                <li><a href="#platform" className="hover:text-white transition-colors">Supervisor Evaluations</a></li>
                <li><a href="#credit-engine" className="hover:text-white transition-colors">Academic Credit Engine</a></li>
              </ul>
            </div>

            {/* Col 3: Solutions by Stakeholder */}
            <div>
              <h4 className="text-xs font-bold text-[#F5F5F5] uppercase tracking-wider mb-3">Solutions</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/dean" className="hover:text-white transition-colors">Universities & Colleges</Link></li>
                <li><Link href="/student" className="hover:text-white transition-colors">Students & Apprentices</Link></li>
                <li><Link href="/faculty" className="hover:text-white transition-colors">Faculty Supervisors</Link></li>
                <li><Link href="/supervisor" className="hover:text-white transition-colors">Industry Supervisors</Link></li>
                <li><Link href="/coordinator" className="hover:text-white transition-colors">Internship Coordinators</Link></li>
              </ul>
            </div>

            {/* Col 4: Account & Access */}
            <div>
              <h4 className="text-xs font-bold text-[#F5F5F5] uppercase tracking-wider mb-3">Account</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/login" className="hover:text-white transition-colors">Login to Portal</Link></li>
                <li><Link href="/signup" className="hover:text-white transition-colors">Create Account</Link></li>
                <li>
                  <button
                    type="button"
                    onClick={() => setDemoModalOpen(true)}
                    className="hover:text-[#FF6B00] transition-colors text-left"
                  >
                    Request a Demo
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright Strip */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78889B]">
            <p>&copy; {new Date().getFullYear()} WorkLedger. All rights reserved.</p>
            <p className="flex items-center gap-3">
              <span>National Credit Framework (NCrF) Workflow Aligned</span>
              <span>•</span>
              <span>UGC AEDP Guidelines Support</span>
            </p>
          </div>

        </div>
      </footer>

      {/* ========================================================================= */}
      {/* REQUEST A DEMO MODAL                                                      */}
      {/* ========================================================================= */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#171717] border border-[#303030] rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={resetDemoModal}
              className="absolute top-5 right-5 text-[#78889B] hover:text-[#F5F5F5] p-1 rounded-lg hover:bg-[#242424] transition-colors"
              aria-label="Close Modal"
            >
              <X size={20} />
            </button>

            {!demoSubmitted ? (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FF6B00] font-semibold">
                    Institutional Consultation
                  </span>
                  <h3 className="text-2xl font-bold text-[#F5F5F5] mt-1">
                    Request an Institutional Demo
                  </h3>
                  <p className="text-xs text-[#9EB3CD] mt-1.5 leading-relaxed">
                    Schedule a tailored demonstration of WorkLedger for your university, academic department, or corporate apprenticeship programme.
                  </p>
                </div>

                <form onSubmit={handleDemoSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#F5F5F5] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={demoForm.name}
                      onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                      placeholder="e.g. Dr. Rajesh Sundaram"
                      className="w-full p-2.5 rounded-xl bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] outline-none focus:border-[#FF6B00] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#F5F5F5] mb-1">
                        Institutional Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={demoForm.email}
                        onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                        placeholder="e.g. dean@university.edu"
                        className="w-full p-2.5 rounded-xl bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] outline-none focus:border-[#FF6B00] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#F5F5F5] mb-1">
                        Institution / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={demoForm.institution}
                        onChange={(e) => setDemoForm({ ...demoForm, institution: e.target.value })}
                        placeholder="e.g. National Institute of Tech"
                        className="w-full p-2.5 rounded-xl bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] outline-none focus:border-[#FF6B00] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#F5F5F5] mb-1">
                        Your Role
                      </label>
                      <select
                        value={demoForm.role}
                        onChange={(e) => setDemoForm({ ...demoForm, role: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] outline-none focus:border-[#FF6B00] cursor-pointer"
                      >
                        <option>Dean / Academic Leadership</option>
                        <option>Internship / Placement Coordinator</option>
                        <option>Head of Department (HoD)</option>
                        <option>Faculty Mentor</option>
                        <option>Corporate Employer / HR</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#F5F5F5] mb-1">
                        Approx. Student Cohort
                      </label>
                      <select
                        value={demoForm.cohortSize}
                        onChange={(e) => setDemoForm({ ...demoForm, cohortSize: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] outline-none focus:border-[#FF6B00] cursor-pointer"
                      >
                        <option>Under 200 Students</option>
                        <option>200 - 500 Students</option>
                        <option>500 - 2,000 Students</option>
                        <option>2,000+ Students</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#F5F5F5] mb-1">
                      Notes or Specific Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={demoForm.message}
                      onChange={(e) => setDemoForm({ ...demoForm, message: e.target.value })}
                      placeholder="Tell us about your institution's current internship or AEDP workflow..."
                      className="w-full p-2.5 rounded-xl bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] outline-none focus:border-[#FF6B00] resize-none transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#FF6B00] hover:bg-[#FF7D1A] text-white font-semibold rounded-xl transition-all shadow-md shadow-[#FF6B00]/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send size={14} />
                      <span>Submit Request</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#00D6A0]/10 text-[#00D6A0] border border-[#00D6A0]/20 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={28} />
                </div>
                <h4 className="text-xl font-bold text-[#F5F5F5]">
                  Demo Request Received
                </h4>
                <p className="text-xs text-[#9EB3CD] max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{demoForm.name}</strong>. Our institutional implementation team will contact you at <strong className="text-white">{demoForm.email}</strong> to coordinate a personalized platform demonstration for <strong className="text-white">{demoForm.institution}</strong>.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={resetDemoModal}
                    className="px-6 py-2.5 bg-[#242424] hover:bg-[#303030] text-[#F5F5F5] rounded-xl text-xs font-semibold border border-[#303030] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
