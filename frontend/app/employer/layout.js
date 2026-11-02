"use client";

import DashboardLayout from "../components/DashboardLayout";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  Award,
  GraduationCap,
  FileCheck,
  ShieldCheck,
  BarChart3,
  Building2,
  Settings
} from "lucide-react";

const employerLinks = [
  { name: "Dashboard", href: "/employer", icon: LayoutDashboard },
  { name: "Opportunities", href: "/employer/opportunities", icon: Briefcase },
  { name: "Applications", href: "/employer/applications", icon: Users },
  { name: "Interviews", href: "/employer/interviews", icon: Calendar },
  { name: "Offers", href: "/employer/offers", icon: Award },
  { name: "Active Interns", href: "/employer/interns", icon: GraduationCap },
  { name: "Evaluations", href: "/employer/evaluations", icon: FileCheck },
  { name: "Supervisors", href: "/employer/supervisors", icon: ShieldCheck },
  { name: "Analytics", href: "/employer/analytics", icon: BarChart3 },
  { name: "Company Profile", href: "/employer/company", icon: Building2 },
  { name: "Settings", href: "/employer/settings", icon: Settings }
];

export default function EmployerLayout({ children }) {
  return (
    <DashboardLayout linksLayout={employerLinks}>
      {children}
    </DashboardLayout>
  );
}
