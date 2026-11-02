"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Clock,
  Hourglass,
  Star,
  ChevronRight,
  ChevronLeft,
  Compass,
  Award,
  User,
  ArrowRight,
  Sparkles,
  CalendarDays,
  Zap,
  TrendingUp,
  CheckCircle2,
  Calendar as CalendarIcon
} from "lucide-react";

export default function StudentDashboard() {
  const [selectedDate, setSelectedDate] = useState(24);
  const [currentMonth, setCurrentMonth] = useState("October 2025");

  // Recent Opportunities Data matching screenshot
  const recentOpportunities = [
    {
      id: 1,
      jobTitle: "Frontend Developer Intern",
      company: "Google",
      location: "Remote",
      status: "Applied",
      statusColor: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
      date: "Oct 24, 2025",
      logo: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.66-5.17 3.66-9.09z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.1C3.25 21.36 7.34 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.58H1.26C.46 8.16 0 9.98 0 12s.46 3.84 1.26 5.42l4.02-3.1z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.64 1.26 6.58l4.02 3.1c.95-2.83 3.6-4.93 6.72-4.93z"
          />
        </svg>
      )
    },
    {
      id: 2,
      jobTitle: "Software Engineering Intern",
      company: "Microsoft",
      location: "Bengaluru",
      status: "Interview",
      statusColor: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
      date: "Oct 20, 2025",
      logo: (
        <svg className="w-5 h-5" viewBox="0 0 23 23">
          <path fill="#f35325" d="M1 1h10v10H1z" />
          <path fill="#81bc06" d="M12 1h10v10H12z" />
          <path fill="#05a6f0" d="M1 12h10v10H1z" />
          <path fill="#ffba08" d="M12 12h10v10H12z" />
        </svg>
      )
    },
    {
      id: 3,
      jobTitle: "Web Development Intern",
      company: "Meta",
      location: "Remote",
      status: "Applied",
      statusColor: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
      date: "Oct 15, 2025",
      logo: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0081FB">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      )
    },
    {
      id: 4,
      jobTitle: "Data Analyst Intern",
      company: "Amazon",
      location: "Bengaluru",
      status: "Rejected",
      statusColor: "bg-rose-500/15 text-rose-400 border border-rose-500/30",
      date: "Oct 10, 2025",
      logo: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF9900">
          <path d="M13.958 10.09c0 1.272-.047 2.335-.872 3.393-.654.84-1.574 1.34-2.54 1.34-1.332 0-2.11-.99-2.11-2.455 0-2.88 2.534-3.395 5.522-3.395v1.117zm3.176 6.822c-.244-.225-.262-.577-.07-.84.45-.618 1.164-1.874 1.164-2.83 0-.693-.385-1.32-.385-2.222 0-2.13-1.64-3.568-4.04-3.568-2.617 0-4.66 1.41-5.06 3.65-.045.25.105.474.356.517l2.13.27c.22.028.423-.122.476-.34.288-1.18 1.053-1.785 2.1-1.785 1.054 0 1.77.595 1.77 1.536v.478c-2.92.17-5.96.864-5.96 4.093 0 2.298 1.516 3.626 3.498 3.626 1.83 0 3.013-.812 3.673-1.892l.024.015c.16.27.34.544.55.803.22.27.56.323.85.18l2.11-.976c.28-.13.38-.45.26-.736l-.88-1.572-.007-.027zm6.756 3.048c-.287.218-.686.136-.934-.143-2.316-2.62-5.714-3.92-9.167-3.92-3.69 0-7.39 1.51-9.98 4.29-.23.25-.63.26-.88.02l-1.07-.98c-.25-.23-.26-.63-.02-.87 3.04-3.26 7.42-5.04 12.03-5.04 4.07 0 8.08 1.51 10.82 4.61.25.28.18.69-.1.91l-.7.583z" />
        </svg>
      )
    }
  ];

  // Upcoming Deadlines Data matching screenshot
  const upcomingDeadlines = [
    {
      id: 1,
      month: "OCT",
      day: "28",
      title: "Log internship hours",
      dueText: "Due in 4 days",
      href: "/student/log-hours"
    },
    {
      id: 2,
      month: "OCT",
      day: "30",
      title: "Submit evaluation report",
      dueText: "Due in 6 days",
      href: "/student/evaluations"
    },
    {
      id: 3,
      month: "NOV",
      day: "02",
      title: "Apply for Tata Internships",
      dueText: "Due in 10 days",
      href: "/student/opportunities"
    },
    {
      id: 4,
      month: "NOV",
      day: "15",
      title: "Mid-semester review",
      dueText: "Due in 23 days",
      href: "/student/internship"
    }
  ];

  // Calendar dates for October 2025
  const calendarDays = [
    { day: null }, { day: null }, { day: null }, { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 },
    { day: 5 }, { day: 6 }, { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 },
    { day: 12 }, { day: 13 }, { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 },
    { day: 19 }, { day: 20 }, { day: 21 }, { day: 22 }, { day: 23 }, { day: 24, isToday: true }, { day: 25 },
    { day: 26 }, { day: 27 }, { day: 28 }, { day: 29 }, { day: 30 }, { day: 31 }, { day: null }
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-10">
      {/* 1. Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left / Center Section (9 cols on XL - Leaner right sidebar) */}
        <div className="xl:col-span-9 flex flex-col gap-6">
          {/* Top Hero Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#201915] via-[#1c1815] to-[#161514] border border-orange-500/20 p-6 sm:p-8 flex flex-col justify-between min-h-[170px] shadow-lg">
            {/* Ambient glow */}
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute right-16 bottom-0 w-48 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Good morning, Nishita!
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Your efforts today build a stronger tomorrow.
                </p>
                <div className="w-12 h-1 bg-orange-500 rounded-full mt-3" />
              </div>

              <div className="text-left md:text-right max-w-xs">
                <p className="text-xs sm:text-sm text-gray-300 italic">
                  “Small steps every day lead to big results.”
                </p>
                <div className="w-8 h-0.5 bg-orange-500/40 mt-2 md:ml-auto" />
              </div>
            </div>
          </div>

          {/* 4 Metric / Statistics Bento Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1 */}
            <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/25 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-xs text-gray-400 font-medium">Applied Opportunities</span>
              </div>
              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">4</div>
                <div className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
                  <span>↑ 1 this week</span>
                </div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-blue-500/30 transition-all flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/25 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs text-gray-400 font-medium">Ongoing Internships</span>
              </div>
              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">1</div>
                <div className="text-[11px] text-gray-400 font-medium mt-1 flex items-center gap-1">
                  <span>↑ 0 this week</span>
                </div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 flex items-center justify-center shrink-0">
                  <Hourglass className="w-5 h-5" />
                </div>
                <span className="text-xs text-gray-400 font-medium">Total Hours Logged</span>
              </div>
              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">120</div>
                <div className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
                  <span>↑ 20 this week</span>
                </div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-purple-500/30 transition-all flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/25 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5" />
                </div>
                <span className="text-xs text-gray-400 font-medium">Credits Earned</span>
              </div>
              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">3</div>
                <div className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
                  <span>↑ 1 this semester</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inner 2-Col Grid: Recent Opportunities & Upcoming Deadlines */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Col 1: Recent Opportunities */}
            <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/15 text-orange-400 flex items-center justify-center">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <h2 className="text-base font-semibold text-white">Recent Opportunities</h2>
                  </div>
                  <Link
                    href="/student/opportunities"
                    className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
                  >
                    View all →
                  </Link>
                </div>

                {/* List */}
                <div className="mt-3 divide-y divide-white/5">
                  {recentOpportunities.map((item) => (
                    <Link
                      key={item.id}
                      href="/student/opportunities"
                      className="py-3 flex items-center justify-between gap-3 group hover:bg-white/[0.02] px-2 rounded-xl transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          {item.logo}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-orange-400 transition-colors">
                            {item.jobTitle}
                          </h3>
                          <p className="text-[11px] text-gray-400 truncate mt-0.5">
                            {item.company} • {item.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.statusColor}`}>
                          {item.status}
                        </span>
                        <span className="text-[11px] text-gray-500 hidden sm:inline-block font-mono">
                          {item.date}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-300 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Col 2: Upcoming Deadlines */}
            <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/15 text-orange-400 flex items-center justify-center">
                      <CalendarDays className="w-4 h-4" />
                    </div>
                    <h2 className="text-base font-semibold text-white">Upcoming Deadlines</h2>
                  </div>
                  <Link
                    href="/student/internship"
                    className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
                  >
                    View all →
                  </Link>
                </div>

                {/* Deadlines List */}
                <div className="mt-3 divide-y divide-white/5">
                  {upcomingDeadlines.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="py-3 flex items-center justify-between gap-3 group hover:bg-white/[0.02] px-2 rounded-xl transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Date badge */}
                        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center shrink-0">
                          <span className="text-[9px] font-mono font-bold text-gray-400 uppercase">
                            {item.month}
                          </span>
                          <span className="text-sm font-bold text-white -mt-0.5">
                            {item.day}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-orange-400 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-[11px] text-gray-400 truncate mt-0.5">
                            {item.dueText}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-300 transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Explore More Opportunities Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1c1c1c] via-[#221c17] to-[#1c1c1c] border border-orange-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Explore more opportunities
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Discover internships, apprenticeships and more tailored for you.
                </p>
              </div>
            </div>

            <Link
              href="/student/opportunities"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium text-xs sm:text-sm shadow-lg shadow-orange-500/20 transition-all whitespace-nowrap self-start sm:self-auto"
            >
              Browse Opportunities →
            </Link>
          </div>
        </div>

        {/* Right Column Section (3 cols on XL - Leaner sidebar) */}
        <div className="xl:col-span-3 flex flex-col gap-6">
          {/* 1. Welcome Back Card */}
          <Link
            href="/student/profile"
            className="p-4 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-orange-500/30 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-orange-700 text-white font-bold flex items-center justify-center shadow-md">
                NU
              </div>
              <div>
                <span className="text-[11px] text-gray-400">Welcome back,</span>
                <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                  Nishita Upreti
                </h3>
                <span className="text-[11px] text-gray-400">Student</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
          </Link>

          {/* 2. Quick Actions Card */}
          <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <Zap className="w-4 h-4 text-orange-400" />
              <h3 className="text-sm font-bold text-white">Quick Actions</h3>
            </div>

            <div className="space-y-1.5 text-xs">
              <Link
                href="/student/opportunities"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-gray-400 group-hover:text-orange-400" />
                  <span>Find Opportunities</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/student/log-hours"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-gray-400 group-hover:text-orange-400" />
                  <span>Log Hours</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/student/credits"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-gray-400 group-hover:text-orange-400" />
                  <span>View Credits</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/student/profile"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-gray-400 group-hover:text-orange-400" />
                  <span>Update Profile</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </div>

          {/* 3. October 2025 Calendar Widget */}
          <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">{currentMonth}</h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentMonth("September 2025")}
                  className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentMonth("October 2025")}
                  className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-gray-400">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 text-center text-xs gap-y-2">
              {calendarDays.map((item, idx) => {
                if (!item.day) {
                  return <span key={idx} className="p-1.5" />;
                }
                const isSelected = item.day === selectedDate;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(item.day)}
                    className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center font-medium transition-all ${
                      isSelected
                        ? "bg-orange-500 text-white font-bold shadow-md shadow-orange-500/30 scale-105"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Keep Going! Motivation Card */}
          <div className="p-5 rounded-2xl bg-[#1c1c1c] border border-white/10 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <h3 className="text-sm font-bold text-white">Keep going!</h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              You're one step closer to your goals.
            </p>
            {/* Progress Bar */}
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-orange-500 h-full rounded-full transition-all duration-500"
                style={{ width: "35%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
