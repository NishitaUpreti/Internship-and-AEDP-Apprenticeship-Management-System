"use client";
import DashboardLayout from "../components/DashboardLayout";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Award,
  ShieldAlert,
  FileText,
} from "lucide-react";

const hodLinks = [
  { name: "Dashboard", href: "/hod", icon: LayoutDashboard },
  { name: "Department Students", href: "/hod/students", icon: Users },
  { name: "Faculty Allocation", href: "/hod/faculty", icon: GraduationCap },
  { name: "Credit Sign-Offs", href: "/hod/credits", icon: Award },
  { name: "Compliance Monitor", href: "/hod/compliance", icon: ShieldAlert },
  { name: "Accreditation Reports", href: "/hod/reports", icon: FileText },
];

export default function HodLayout({ children }) {
  return (
    <DashboardLayout linksLayout={hodLinks}>
      {children}
    </DashboardLayout>
  );
}

