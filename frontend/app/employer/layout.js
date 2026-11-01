"use client";
import DashboardLayout from "../components/DashboardLayout";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  ClipboardCheck,
  UserCheck,
  Users,
  FileCheck,
  Building2,
} from "lucide-react";

const employerLinks = [
  { name: "Dashboard", href: "/employer", icon: LayoutDashboard },
  { name: "Opportunities", href: "/employer/opportunities", icon: BriefcaseBusiness },
  { name: "Applications & Offers", href: "/employer/applicants", icon: ClipboardCheck },
  { name: "Industry Supervisors", href: "/employer/supervisors", icon: UserCheck },
  { name: "Active Interns", href: "/employer/interns", icon: Users },
  { name: "Tripartite Agreements", href: "/employer/agreements", icon: FileCheck },
  { name: "Company Profile", href: "/employer/profile", icon: Building2 },
];

export default function EmployerLayout({ children }) {
  return (
    <DashboardLayout linksLayout={employerLinks}>
      {children}
    </DashboardLayout>
  );
}
