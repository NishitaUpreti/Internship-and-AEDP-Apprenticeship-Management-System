"use client";
import DashboardLayout from "../components/DashboardLayout";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  ClipboardCheck,
  GraduationCap,
  FileText,
} from "lucide-react";

const facultyLinks = [
  { name: "Dashboard", href: "/faculty", icon: LayoutDashboard },
  { name: "Assigned Students", href: "/faculty/students", icon: Users },
  { name: "Work Plans & Tasks", href: "/faculty/tasks", icon: CheckSquare },
  { name: "Review & Moderation", href: "/faculty/reviews", icon: ClipboardCheck },
  { name: "Credit Approvals", href: "/faculty/credits", icon: GraduationCap },
  { name: "Academic Reports", href: "/faculty/reports", icon: FileText },
];

export default function FacultyLayout({ children }) {
  return (
    <DashboardLayout linksLayout={facultyLinks}>
      {children}
    </DashboardLayout>
  );
}
