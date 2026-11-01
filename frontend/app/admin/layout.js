"use client"
import DashboardLayout from "../components/DashboardLayout";
import {
    LayoutDashboard, Users, Building2,
    ShieldCheck, Settings, FileText
} from "lucide-react";

const adminLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Employer Verification", href: "/admin/employers", icon: Building2 },
    { name: "Role Management", href: "/admin/roles", icon: ShieldCheck },
    { name: "System Settings", href: "/admin/settings", icon: Settings },
    { name: "Reports", href: "/admin/reports", icon: FileText }
];

export default function AdminLayout({ children }) {
    return(
        <DashboardLayout linksLayout={adminLinks}>
                {children}
            </DashboardLayout>

    )
}