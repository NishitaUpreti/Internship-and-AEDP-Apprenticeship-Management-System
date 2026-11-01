"use client";
import DashboardLayout from "../components/DashboardLayout";
import {
  LayoutDashboard,
  BarChart3,
  Building2,
  Award,
  FileCheck,
  ShieldCheck,
} from "lucide-react";

const deanLinks = [
  { name: "Dashboard", href: "/dean", icon: LayoutDashboard },
  { name: "Institutional Analytics", href: "/dean/analytics", icon: BarChart3 },
  { name: "Department Oversight", href: "/dean/departments", icon: Building2 },
  { name: "AEDP Credit Governance", href: "/dean/governance", icon: Award },
  { name: "Accreditation Dossier", href: "/dean/accreditation", icon: FileCheck },
  { name: "Compliance & Audit Trail", href: "/dean/audit", icon: ShieldCheck },
];

export default function DeanLayout({ children }) {
  return (
    <DashboardLayout linksLayout={deanLinks}>
      {children}
    </DashboardLayout>
  );
}

