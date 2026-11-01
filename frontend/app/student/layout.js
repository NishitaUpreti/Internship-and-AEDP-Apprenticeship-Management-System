"use client"
import DashboardLayout from "../components/DashboardLayout";
import {
    LayoutDashboard, BriefcaseBusiness, FileText,
    GraduationCap, Clock, Award
} from "lucide-react";

const studentLinks = [
    {name:"Dashboard", href:"/student",icon:LayoutDashboard},
    {name:"Opportunities",href:"/student/opportunities",icon:BriefcaseBusiness},
    {name:"My Applications",href:"/student/applications",icon:FileText},
    {name:"My Internship",href:"/student/internship",icon:GraduationCap},
    {name:"Log Hours",href:"/student/log-hours",icon:Clock},
    {name:"My Credits", href:"/student/credits",icon:Award}
]

export default function StudentLayout({children}){
  return (
        <DashboardLayout linksLayout={studentLinks}>
            {children}
        </DashboardLayout>
    );
}


