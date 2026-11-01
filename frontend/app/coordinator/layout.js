"use client";
import DashboardLayout from "../components/DashboardLayout";
import {
  LayoutDashboard,
  Building2,
  BriefcaseBusiness,
  Users,
  FileCheck,
  ShieldAlert,
  AlertTriangle,
  FileText,
} from "lucide-react";

const coordinatorLinks = [
  { name: "Dashboard", href: "/coordinator", icon: LayoutDashboard },
  { name: "Employer Registry", href: "/coordinator/employers", icon: Building2 },
  { name: "Opportunities", href: "/coordinator/opportunities", icon: BriefcaseBusiness },
  { name: "Applications", href: "/coordinator/applications", icon: Users },
  { name: "Tripartite Agreements", href: "/coordinator/agreements", icon: FileCheck },
  { name: "Compliance Board", href: "/coordinator/compliance", icon: ShieldAlert },
  { name: "Incident Escalations", href: "/coordinator/incidents", icon: AlertTriangle },
  { name: "Reports & Audits", href: "/coordinator/reports", icon: FileText },
];

export default function CoordinatorLayout({ children }) {
  return (
    <DashboardLayout linksLayout={coordinatorLinks}>
      {children}
    </DashboardLayout>
  );
}
