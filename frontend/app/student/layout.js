"use client";
import DashboardLayout from "../components/DashboardLayout";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  FileCheck,
  Clock,
  CheckSquare,
  ClipboardCheck,
  Award,
} from "lucide-react";

const studentLinks = [
  { name: "Dashboard", href: "/student", icon: LayoutDashboard },
  { name: "Opportunities", href: "/student/opportunities", icon: BriefcaseBusiness },
  { name: "My Applications", href: "/student/applications", icon: FileText },
  { name: "Tripartite Agreement", href: "/student/agreement", icon: FileCheck },
  { name: "Log Hours", href: "/student/log-hours", icon: Clock },
  { name: "Tasks & Milestones", href: "/student/tasks", icon: CheckSquare },
  { name: "Evaluations", href: "/student/evaluations", icon: ClipboardCheck },
  { name: "My Credits & Certs", href: "/student/credits", icon: Award },
];

export default function StudentLayout({ children }) {
  return (
    <DashboardLayout linksLayout={studentLinks}>
      {children}
    </DashboardLayout>
  );
}
