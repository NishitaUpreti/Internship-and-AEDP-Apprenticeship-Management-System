"use client"
import DashboardLayout from "../components/DashboardLayout";
import {
    LayoutDashboard, Users, Clock,
    ClipboardCheck, FileText, Settings
} from "lucide-react";

const supervisorLinks = [
    { name: "Dashboard", href: "/supervisor", icon: LayoutDashboard },
    { name: "My Interns", href: "/supervisor/interns", icon: Users },
    { name: "Log Approvals", href: "/supervisor/approvals", icon: Clock },
    { name: "Evaluations", href: "/supervisor/evaluations", icon: ClipboardCheck },
    { name: "Reports", href: "/supervisor/reports", icon: FileText },
    { name: "Settings", href: "/supervisor/settings", icon: Settings }
];

export default function SupervisorLayout({ children }) {
    return (
        <DashboardLayout linksLayout={supervisorLinks}>
                {children}
            </DashboardLayout>

    )
}