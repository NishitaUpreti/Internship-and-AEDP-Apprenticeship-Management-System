"use client";
import DashboardLayout from "../components/DashboardLayout";
import {
  LayoutDashboard,
  Users,
  Clock,
  ClipboardCheck,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

const supervisorLinks = [
  { name: "Dashboard", href: "/supervisor", icon: LayoutDashboard },
  { name: "Assigned Interns", href: "/supervisor/interns", icon: Users },
  { name: "Verify Hours", href: "/supervisor/approvals", icon: Clock },
  { name: "Rubric Evaluations", href: "/supervisor/evaluations", icon: ClipboardCheck },
  { name: "Report Incident", href: "/supervisor/incidents", icon: AlertTriangle },
  { name: "Safety Declarations", href: "/supervisor/safety", icon: ShieldAlert },
];

export default function SupervisorLayout({ children }) {
  return (
    <DashboardLayout linksLayout={supervisorLinks}>
      {children}
    </DashboardLayout>
  );
}
