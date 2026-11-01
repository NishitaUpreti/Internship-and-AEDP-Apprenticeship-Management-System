"use client"
import DashboardLayout from "../components/DashboardLayout";
import {
    LayoutDashboard, Users, ClipboardCheck,
    GraduationCap, FileText, Settings
} from "lucide-react";

const facultyLinks = [
    { name: "Dashboard", href: "/faculty", icon: LayoutDashboard },
    { name: "My Students", href: "/faculty/students", icon: Users },
    { name: "Internship Reviews", href: "/faculty/reviews", icon: ClipboardCheck },
    { name: "Credit Approvals", href: "/faculty/credits", icon: GraduationCap },
    { name: "Reports", href: "/faculty/reports", icon: FileText },
    { name: "Settings", href: "/faculty/settings", icon: Settings }
];

export default function FacultyLayout({ children }) {
    return (
        <DashboardLayout linksLayout={facultyLinks}>
                {children}
            </DashboardLayout>

    )
}