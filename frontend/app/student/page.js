"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Student() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboard = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

            const res = await fetch(`${apiUrl}/api/student/dashboard`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to load dashboard data");
            }

            const result = await res.json();
            if (result.success && result.data) {
                setDashboardData(result.data);
            } else {
                throw new Error("Invalid response format from server");
            }
        } catch (err) {
            console.error("Error fetching student dashboard:", err);
            setError(err.message || "Unable to fetch student dashboard details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    // Skeleton loader while fetching real-time data from MongoDB
    if (loading) {
        return (
            <div className="flex flex-col gap-8 w-full max-w-[1600px] animate-pulse">
                {/* Welcome Skeleton */}
                <div className="flex flex-col gap-2">
                    <div className="h-8 w-64 bg-white/10 rounded-lg"></div>
                    <div className="h-4 w-96 bg-white/5 rounded-lg"></div>
                </div>

                {/* Statistics Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="bg-[#1c1c1c] border border-white/10 rounded-xl p-5 flex flex-col gap-3"
                        >
                            <div className="h-4 w-32 bg-white/10 rounded"></div>
                            <div className="h-9 w-16 bg-white/10 rounded"></div>
                        </div>
                    ))}
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="bg-[#1c1c1c] border border-white/10 rounded-xl p-5 h-64"></div>
                    <div className="bg-[#1c1c1c] border border-white/10 rounded-xl p-5 h-64"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 max-w-md">
                    <p className="font-semibold mb-1">Failed to load dashboard data</p>
                    <p className="text-sm text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={fetchDashboard}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const {
        greeting = "Good Morning, Student!",
        stats = {
            appliedOpportunities: 0,
            ongoingInternships: 0,
            totalHoursLogged: 0,
            creditsEarned: 0,
        },
        recentOpportunities = [],
        upcomingDeadlines = [],
        openOpportunitiesCount = 0,
    } = dashboardData || {};

    const getStatusBadgeStyle = (status) => {
        const s = (status || "").toLowerCase();
        if (s.includes("accepted") || s.includes("offered")) {
            return "bg-green-500/10 text-green-400 border border-green-500/20";
        }
        if (s.includes("reject") || s.includes("withdraw")) {
            return "bg-red-500/10 text-red-400 border border-red-500/20";
        }
        return "bg-orange-500/10 text-orange-400 border border-orange-500/20";
    };

    return (
        <div className="flex flex-col gap-8 w-full max-w-[1600px]">
            {/* Welcome Banner */}
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-white">{greeting}</h2>
                <p className="text-sm text-gray-400">
                    Your efforts today build a strong future tomorrow.
                </p>
            </div>

            {/* Real-Time Statistics from MongoDB */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <div className="bg-[#1c1c1c] border border-white/10 rounded-xl p-5 flex flex-col gap-3">
                    <p className="text-sm text-gray-400">Applied Opportunities</p>
                    <p className="text-3xl font-semibold text-white">
                        {stats.appliedOpportunities ?? 0}
                    </p>
                </div>
                <div className="bg-[#1c1c1c] border border-white/10 rounded-xl p-5 flex flex-col gap-3">
                    <p className="text-sm text-gray-400">Ongoing Internships</p>
                    <p className="text-3xl font-semibold text-white">
                        {stats.ongoingInternships ?? 0}
                    </p>
                </div>
                <div className="bg-[#1c1c1c] border border-white/10 rounded-xl p-5 flex flex-col gap-3">
                    <p className="text-sm text-gray-400">Total Hours Logged</p>
                    <p className="text-3xl font-semibold text-white">
                        {stats.totalHoursLogged ?? 0}
                    </p>
                </div>
                <div className="bg-[#1c1c1c] border border-white/10 rounded-xl p-5 flex flex-col gap-3">
                    <p className="text-sm text-gray-400">Credits Earned</p>
                    <p className="text-3xl font-semibold text-white">
                        {stats.creditsEarned ?? 0}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Recent Opportunities / Applications */}
                <div className="bg-[#1c1c1c] border border-white/10 rounded-xl p-5 flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold text-white">
                            Recent Opportunities
                        </p>
                        <Link
                            href="/student/applications"
                            className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
                        >
                            View All
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2 p-4 rounded-lg bg-[#252525] border border-white/5 min-h-[160px] justify-center">
                        {recentOpportunities && recentOpportunities.length > 0 ? (
                            recentOpportunities.map((obj) => (
                                <div
                                    key={obj.id}
                                    className="flex flex-col gap-3 p-4 rounded-xl bg-[#252525] border border-white/5 hover:border-orange-500/30 transition-colors"
                                >
                                    <p className="text-sm font-semibold text-white">
                                        {obj.jobTitle}
                                    </p>
                                    <div className="flex items-center gap-3 text-sm text-gray-400">
                                        <p>{obj.companyName}</p>
                                        <p>•</p>
                                        <p>{obj.place}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p
                                            className={`text-xs font-medium px-3 py-1 rounded-full w-fit ${getStatusBadgeStyle(
                                                obj.status
                                            )}`}
                                        >
                                            {obj.status}
                                        </p>
                                        <p className="text-xs text-gray-500">{obj.date}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-6 text-center gap-2">
                                <p className="text-sm text-gray-400">
                                    No applications submitted yet.
                                </p>
                                <Link
                                    href="/student/opportunities"
                                    className="text-xs text-orange-400 hover:text-orange-300 font-medium"
                                >
                                    Explore available opportunities &rarr;
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="bg-[#1c1c1c] border border-white/10 rounded-xl p-5 flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold text-white">
                            Upcoming Deadlines
                        </p>
                        <Link
                            href="/student/deadlines"
                            className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
                        >
                            View All
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2 p-4 rounded-lg bg-[#252525] border border-white/5 min-h-[160px] justify-center">
                        {upcomingDeadlines && upcomingDeadlines.length > 0 ? (
                            upcomingDeadlines.map((obj) => (
                                <div
                                    key={obj.id}
                                    className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#252525] border border-white/5 hover:border-orange-500/30 transition-colors"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-white">
                                            {obj.title}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {obj.dueDate}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-orange-400 bg-orange-500/10 px-3 py-2 rounded-lg whitespace-nowrap">
                                            {obj.daysLeft === 0
                                                ? "Due today"
                                                : `Due in ${obj.daysLeft} days`}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-6 text-center">
                                <p className="text-sm text-gray-400">
                                    No upcoming deadlines at this time.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Explore Opportunities Banner */}
            <div className="bg-gradient-to-r from-[#3b2416] to-[#1c1c1c] border border-orange-500/20 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
                <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold text-white">
                        Explore more opportunities
                    </p>
                    <p className="text-sm text-gray-400">
                        Discover{" "}
                        {openOpportunitiesCount > 0
                            ? `${openOpportunitiesCount} open opportunities`
                            : "internships"}
                        , apprenticeships and more tailored for you
                    </p>
                </div>
                <Link
                    href="/student/opportunities"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                >
                    Browse Opportunities
                </Link>
            </div>
        </div>
    );
}
