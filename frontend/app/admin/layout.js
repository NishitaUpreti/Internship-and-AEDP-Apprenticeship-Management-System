"use client";
import DashboardLayout from "../components/DashboardLayout";
import {
  LayoutDashboard,
  Building2,
  FileCheck,
  Award,
  ClipboardList,
  Users,
  ShieldAlert,
  Settings,
} from "lucide-react";

const adminLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Employer Verification", href: "/admin/employers", icon: Building2 },
  { name: "Agreement Templates", href: "/admin/agreements", icon: FileCheck },
  { name: "Credit Framework", href: "/admin/credit-framework", icon: Award },
  { name: "Rubric Builder", href: "/admin/rubrics", icon: ClipboardList },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Compliance & Incidents", href: "/admin/compliance", icon: ShieldAlert },
  { name: "System Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }) {
  return (
    <DashboardLayout linksLayout={adminLinks}>
      {children}
    </DashboardLayout>
  );
}
