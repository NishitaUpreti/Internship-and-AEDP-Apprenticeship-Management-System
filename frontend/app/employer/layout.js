"use client"
import DashboardLayout from "../components/DashboardLayout";

import {
    LayoutDashboard, BriefcaseBusiness, Users,
    FileText, Building2, Settings
} from "lucide-react";

const employerLinks = [
    { name: "Dashboard", href: "/employer", icon: LayoutDashboard },
    { name: "My Opportunities", href: "/employer/opportunities", icon: BriefcaseBusiness },
    { name: "Applicants", href: "/employer/applicants", icon: Users },
    { name: "Interns", href: "/employer/interns", icon: FileText },
    { name: "Company Profile", href: "/employer/profile", icon: Building2 },
    { name: "Settings", href: "/employer/settings", icon: Settings }
];


export default function EmployerLayout({ children }) {
    return (
        <DashboardLayout linksLayout={employerLinks}>
                {children}
            </DashboardLayout>

    )
}