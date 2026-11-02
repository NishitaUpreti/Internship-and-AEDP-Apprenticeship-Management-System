"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Bookmark,
  BookmarkCheck,
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  List,
  CheckCircle2,
  X,
  Timer,
  Zap,
  Building2,
  ExternalLink
} from "lucide-react";

const INITIAL_OPPORTUNITIES = [
  {
    id: 1,
    title: "Product Design Intern",
    company: "Stripe",
    cohort: "Summer 2025 Cohort",
    logoText: "S",
    logoBg: "bg-indigo-600/20 text-indigo-400 border-indigo-500/40",
    stipend: "$42/hr Stipend",
    location: "San Francisco, CA • Hybrid",
    duration: "12 Weeks",
    eligibility: "Class of '25/'26",
    roleType: "Internship",
    description: "Own high-impact checkout flows, build design systems component primitives, and partner with core billing engineering pods.",
    skills: ["Figma", "Design Systems", "Prototyping"],
    deadline: "April 28 (5 days left)",
    daysLeft: 5,
    matchRate: "98% Match",
    saved: false,
    featured: true
  },
  {
    id: 2,
    title: "Software Engineering Apprenticeship",
    company: "Datadog",
    cohort: "Distributed Systems Track",
    logoText: "DD",
    logoBg: "bg-purple-950/60 text-purple-300 border-purple-800/40",
    stipend: "$6,200/mo ($39/hr)",
    location: "New York, NY • Hybrid",
    duration: "6 Months",
    eligibility: "Class of '25/'26",
    roleType: "Apprenticeship",
    description: "Scale hyper-throughput telemetry pipelines processing petabytes daily. Mentored by senior infrastructure and SRE architects.",
    skills: ["Go", "Kubernetes", "APIs"],
    deadline: "May 5 (12 days left)",
    daysLeft: 12,
    matchRate: "95% Match",
    saved: false,
    featured: false
  },
  {
    id: 3,
    title: "Campus AI Fellow (Part-time)",
    company: "Cohere",
    cohort: "LLM Evaluation & Alignment",
    logoText: "CO",
    logoBg: "bg-emerald-950/60 text-emerald-400 border-emerald-800/40",
    stipend: "$38/hr Stipend",
    location: "Global • 100% Remote",
    duration: "20 hrs/week",
    eligibility: "Master's & PhD",
    roleType: "Part-time Fellow",
    description: "Curate synthetic benchmarks, conduct red-teaming safety evaluations, and experiment with fine-tuning workflows for next-gen models.",
    skills: ["Python", "PyTorch", "Transformers"],
    deadline: "Rolling Admissions",
    daysLeft: 30,
    matchRate: "99% Match",
    saved: true,
    featured: false,
    fastTrack: "Fast-Track Review (48 hrs)"
  },
  {
    id: 4,
    title: "AI Alignment Research Fellow",
    company: "Anthropic",
    cohort: "Safety & Interpretability",
    logoText: "AN",
    logoBg: "bg-amber-950/40 text-amber-200 border-amber-800/30",
    stipend: "$60/hr Stipend",
    location: "San Francisco, CA • On-site",
    duration: "12 Weeks",
    eligibility: "All Students",
    roleType: "Fellowship",
    description: "Perform mechanistic interpretability analysis on multi-billion parameter foundation models and author safety research preprints.",
    skills: ["Python", "Interpretability", "Deep Learning"],
    deadline: "May 10 (17 days left)",
    daysLeft: 17,
    matchRate: "97% Match",
    saved: false,
    featured: false
  },
  {
    id: 5,
    title: "Systems Software Engineer Intern",
    company: "Figma",
    cohort: "Browser Engine Pod",
    logoText: "FG",
    logoBg: "bg-rose-950/50 text-rose-300 border-rose-800/40",
    stipend: "$58/hr + Relocation",
    location: "San Francisco, CA • Remote",
    duration: "12 Weeks",
    eligibility: "Class of '25/'26",
    roleType: "Internship",
    description: "Optimize web-based rendering canvases, WebAssembly compilation pipelines, and multi-user collaborative scene synchronization.",
    skills: ["WebAssembly", "C++", "Rust", "Graphics"],
    deadline: "May 15 (22 days left)",
    daysLeft: 22,
    matchRate: "94% Match",
    saved: false,
    featured: false
  },
  {
    id: 6,
    title: "Growth Engineering Intern",
    company: "Scale AI",
    cohort: "Enterprise Core",
    logoText: "SC",
    logoBg: "bg-neutral-900 text-white border-neutral-700",
    stipend: "$42/hr Stipend",
    location: "San Francisco, CA • Hybrid",
    duration: "10-12 Weeks",
    eligibility: "Class of '26",
    roleType: "Internship",
    description: "Build self-service analytics onboarding flows, instrument conversion telemetry, and run A/B growth experiments with data teams.",
    skills: ["Next.js", "TypeScript", "SQL", "Tailwind"],
    deadline: "May 20 (27 days left)",
    daysLeft: 27,
    matchRate: "92% Match",
    saved: false,
    featured: false
  }
];

const TRENDING_TAGS = [
  "React",
  "Distributed Systems",
  "Machine Learning",
  "Data Analytics",
  "Figma",
  "Python",
  "Kubernetes"
];

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState(INITIAL_OPPORTUNITIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [stipendFloor, setStipendFloor] = useState(30);
  const [activeTrendingTag, setActiveTrendingTag] = useState("Distributed Systems");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [sortBy, setSortBy] = useState("deadline");
  const [appliedRoles, setAppliedRoles] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleSave = (id) => {
    setOpportunities((prev) =>
      prev.map((opp) => {
        if (opp.id === id) {
          const nextSaved = !opp.saved;
          showToast(nextSaved ? `Saved "${opp.title}" to matches` : `Removed "${opp.title}" from saved`);
          return { ...opp, saved: nextSaved };
        }
        return opp;
      })
    );
  };

  const handleApply = (opp) => {
    setAppliedRoles((prev) => ({ ...prev, [opp.id]: true }));
    showToast(`Application submitted to ${opp.company} for ${opp.title}!`);
  };

  // Filtered & Sorted list
  const filteredOpportunities = useMemo(() => {
    return opportunities
      .filter((opp) => {
        const matchesQuery =
          opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesType =
          selectedType === "All" ||
          opp.roleType.toLowerCase().includes(selectedType.toLowerCase());

        const matchesLocation =
          selectedLocation === "All" ||
          (selectedLocation === "Remote" && opp.location.toLowerCase().includes("remote")) ||
          (selectedLocation === "SF" && opp.location.toLowerCase().includes("san francisco")) ||
          (selectedLocation === "NY" && opp.location.toLowerCase().includes("new york"));

        return matchesQuery && matchesType && matchesLocation;
      })
      .sort((a, b) => {
        if (sortBy === "deadline") return a.daysLeft - b.daysLeft;
        if (sortBy === "match") return parseInt(b.matchRate) - parseInt(a.matchRate);
        return a.title.localeCompare(b.title);
      });
  }, [opportunities, searchQuery, selectedType, selectedLocation, sortBy]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-orange-600 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumbs & Header Section */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/student" className="hover:text-orange-400 transition-colors">
            Student
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-gray-200 font-medium">Opportunities</span>
          <span className="inline-flex items-center gap-1.5 ml-3 px-2 py-0.5 rounded-full text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Verified Stipends Live
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-1">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Find Opportunities
            </h1>
            <p className="text-sm text-gray-400 mt-1 max-w-2xl">
              Explore curated internships, apprenticeships & part-time roles with transparent stipends and direct university credits.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-4 bg-[#1c1c1c] border border-white/10 rounded-xl p-3 px-4 shrink-0">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-orange-400 leading-tight">
                {opportunities.length}
              </span>
              <span className="text-[11px] text-gray-400">Active Roles</span>
            </div>
            <div className="w-[1px] h-7 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-emerald-400 leading-tight">
                $46/hr
              </span>
              <span className="text-[11px] text-gray-400">Avg Stipend</span>
            </div>
            <div className="w-[1px] h-7 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-purple-400 leading-tight">
                100%
              </span>
              <span className="text-[11px] text-gray-400">Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Search Bar & Quick Filters */}
      <section className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-4 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          {/* Text Search Field */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, company, or skills (e.g. Distributed Systems, Figma, Python)..."
              className="w-full bg-[#252525] text-white border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder:text-gray-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Selectors */}
          <div className="flex items-center gap-2.5 w-full lg:w-auto">
            {/* Role Type */}
            <div className="relative flex-1 lg:w-44">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#252525] text-gray-200 border border-white/10 rounded-xl px-3 py-2.5 text-xs appearance-none focus:outline-none focus:border-orange-500 cursor-pointer pr-8"
              >
                <option value="All">Role Type: All</option>
                <option value="Internship">Internship</option>
                <option value="Apprenticeship">Apprenticeship</option>
                <option value="Fellow">Fellowship</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Location */}
            <div className="relative flex-1 lg:w-44">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-[#252525] text-gray-200 border border-white/10 rounded-xl px-3 py-2.5 text-xs appearance-none focus:outline-none focus:border-orange-500 cursor-pointer pr-8"
              >
                <option value="All">Location: All</option>
                <option value="Remote">100% Remote</option>
                <option value="SF">San Francisco, CA</option>
                <option value="NY">New York, NY</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Filter Reset / Trigger */}
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedType("All");
                setSelectedLocation("All");
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm shrink-0"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Trending Tags Bar */}
        <div className="flex items-center flex-wrap gap-2 pt-3 border-t border-white/5 text-xs">
          <span className="text-gray-400 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            Trending:
          </span>
          {TRENDING_TAGS.map((tag) => {
            const isActive = activeTrendingTag === tag;
            return (
              <button
                key={tag}
                onClick={() => {
                  if (isActive) {
                    setActiveTrendingTag("");
                    setSearchQuery("");
                  } else {
                    setActiveTrendingTag(tag);
                    setSearchQuery(tag);
                  }
                }}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  isActive
                    ? "bg-orange-500/15 border-orange-500/50 text-orange-400 font-semibold"
                    : "bg-[#252525] border-white/5 text-gray-300 hover:border-white/20 hover:text-white"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </section>

      {/* Results Header with View Mode and Sort */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">
            Showing {filteredOpportunities.length} of {opportunities.length} opportunities
          </span>
          <span className="text-xs text-gray-400">
            • Curated for Computer Science & Design
          </span>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#1c1c1c] text-gray-200 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              <option value="deadline">Deadline Soonest</option>
              <option value="match">Highest Profile Match</option>
              <option value="name">Company Name</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#1c1c1c] border border-white/10 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${
                viewMode === "grid"
                  ? "bg-[#252525] text-orange-400 shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded ${
                viewMode === "list"
                  ? "bg-[#252525] text-orange-400 shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Opportunity Cards (Grid vs List Layout) */}
      <section
        className={`grid gap-4 ${
          viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {filteredOpportunities.map((opp) => {
          const isApplied = appliedRoles[opp.id];

          return (
            <article
              key={opp.id}
              className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-orange-500/40 transition-all duration-200 group hover:-translate-y-0.5 shadow-sm relative"
            >
              {/* Top Row: Company Monogram, Title, Bookmark */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl border flex items-center justify-center font-bold text-sm shrink-0 ${opp.logoBg}`}
                    >
                      {opp.logoText}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                        {opp.title}
                      </h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                        <span className="font-semibold text-gray-200">
                          {opp.company}
                        </span>
                        <span>•</span>
                        <span>{opp.cohort}</span>
                      </p>
                    </div>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleSave(opp.id)}
                    className="text-gray-400 hover:text-orange-400 transition-colors p-1.5 rounded-lg hover:bg-white/5"
                    title={opp.saved ? "Remove Bookmark" : "Save Opportunity"}
                  >
                    {opp.saved ? (
                      <BookmarkCheck className="w-5 h-5 text-orange-400 fill-orange-400/20" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Metadata Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    {opp.stipend}
                  </span>
                  <span className="bg-[#252525] text-gray-300 text-xs px-2.5 py-0.5 rounded-full border border-white/5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {opp.location}
                  </span>
                  <span className="bg-[#252525] text-gray-300 text-xs px-2.5 py-0.5 rounded-full border border-white/5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {opp.duration}
                  </span>
                  <span className="bg-purple-500/10 text-purple-300 text-xs px-2.5 py-0.5 rounded-full border border-purple-500/20">
                    {opp.matchRate}
                  </span>
                </div>

                {/* Role Description */}
                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-4">
                  {opp.description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {opp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-[#252525] text-gray-400 text-[11px] font-medium px-2 py-0.5 rounded-md border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                  {opp.fastTrack && (
                    <span className="bg-orange-500/10 text-orange-400 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-orange-500/20 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {opp.fastTrack}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-orange-400 font-medium">
                  <Timer className="w-4 h-4 shrink-0" />
                  <span>Apply by {opp.deadline}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => showToast(`Opening dossier preview for ${opp.company}`)}
                    className="bg-[#252525] hover:bg-[#2d2d2d] text-gray-200 text-xs font-medium px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handleApply(opp)}
                    disabled={isApplied}
                    className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all ${
                      isApplied
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                        : "bg-orange-500 hover:bg-orange-600 text-white shadow-sm active:scale-95"
                    }`}
                  >
                    {isApplied ? "Applied ✓" : "Easy Apply"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Empty State if filter yields zero */}
      {filteredOpportunities.length === 0 && (
        <div className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3">
          <Search className="w-10 h-10 text-gray-500" />
          <h3 className="text-base font-semibold text-white">No opportunities matched your criteria</h3>
          <p className="text-xs text-gray-400 max-w-md">
            Try loosening your keyword search or resetting the role type and location filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedType("All");
              setSelectedLocation("All");
            }}
            className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-xl text-xs font-semibold hover:bg-orange-600 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
