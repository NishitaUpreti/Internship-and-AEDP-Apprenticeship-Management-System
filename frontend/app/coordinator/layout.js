"use client"
import DashboardLayout from "../components/DashboardLayout";
import {
    LayoutDashboard, Users, BriefcaseBusiness,
    ClipboardCheck, Award, FileText
} from "lucide-react";

const coordinatorLinks = [
    { name: "Dashboard", href: "/coordinator", icon: LayoutDashboard },
    { name: "Students", href: "/coordinator/students", icon: Users },
    { name: "Employers", href: "/coordinator/employers", icon: BriefcaseBusiness },
    { name: "Applications", href: "/coordinator/applications", icon: ClipboardCheck },
    { name: "Credit Management", href: "/coordinator/credits", icon: Award },
    { name: "Reports", href: "/coordinator/reports", icon: FileText }
];

export default function CoordinatorLayout({ children }) {
    return(
        <DashboardLayout linksLayout={coordinatorLinks}>
                {children}
            </DashboardLayout>

    )
}