"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Building,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff
} from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const form = event.target;
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const role = selectedRole || form.role?.value;
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const universityId = form.universityId?.value?.trim() || undefined;
    const department = form.department?.value?.trim() || undefined;

    if (!role) {
      setError("Please select your institutional or corporate role.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          role,
          email,
          password,
          confirmPassword,
          universityId,
          department,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to create account. Please try again.");
        return;
      }

      const isEmployer = data.user?.role === "EMPLOYER_ADMIN" || role === "employer";
      setSuccess(
        isEmployer
          ? "Account registered! Redirecting to complete your Company Profile..."
          : "Account created successfully! Redirecting to login..."
      );

      // Store token & user info in localStorage and cookies for route protection
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        document.cookie = `token=${data.token}; path=/; max-age=604800; SameSite=Lax`;
        document.cookie = `user_role=${data.user?.role || ""}; path=/; max-age=604800; SameSite=Lax`;
      }

      setTimeout(() => {
        if (isEmployer) {
          router.push("/employer/profile");
        } else {
          router.push("/login");
        }
      }, 1100);
    } catch (err) {
      console.error("Signup network error:", err);
      setError("Network error: Could not reach the server. Please ensure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#F5F5F5] font-sans flex flex-col justify-between relative overflow-hidden selection:bg-[#FF6B00] selection:text-white py-8">
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#FF6B00]/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Top Bar with Back Link */}
      <header className="px-6 pb-4 max-w-7xl w-full mx-auto flex items-center justify-between relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#9EB3CD] hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
        <span className="text-[11px] font-mono text-[#78889B] hidden sm:inline">
          Institutional Work-Based Learning System
        </span>
      </header>

      {/* Center Auth Card */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-lg bg-[#171717] border border-[#303030] rounded-2xl p-7 sm:p-9 shadow-2xl space-y-6">
          
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <Link href="/" className="inline-block focus:outline-none">
              <Image
                src="/WorkLedgerLogo-v2.png"
                alt="WorkLedger Logo"
                width={200}
                height={55}
                className="h-11 w-auto mx-auto object-contain transition-transform hover:scale-[1.02]"
                priority
              />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#F5F5F5] tracking-tight">
                Create WorkLedger Account
              </h1>
              <p className="text-xs text-[#9EB3CD] mt-1">
                Select your role to register your university or corporate portal
              </p>
            </div>
          </div>

          {/* Feedback Alerts */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 rounded-xl bg-[#00D6A0]/10 border border-[#00D6A0]/20 text-[#00D6A0] text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#9EB3CD] uppercase tracking-wider mb-1.5">
                  First Name *
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78889B]" />
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="e.g. Aakash"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] outline-none focus:border-[#FF6B00] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#9EB3CD] uppercase tracking-wider mb-1.5">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="e.g. Verma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] outline-none focus:border-[#FF6B00] transition-colors"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block font-semibold text-[#9EB3CD] uppercase tracking-wider mb-1.5">
                Institutional / Corporate Role *
              </label>
              <select
                name="role"
                required
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] outline-none focus:border-[#FF6B00] cursor-pointer transition-colors"
              >
                <option value="" disabled className="bg-[#1D1D1D] text-gray-500">
                  Select your role in the ecosystem
                </option>
                <option value="student" className="bg-[#1D1D1D] text-white">
                  Student (AEDP Apprentice / Intern)
                </option>
                <option value="employer" className="bg-[#1D1D1D] text-white">
                  Employer Admin (Host Organisation)
                </option>
                <option value="supervisor" className="bg-[#1D1D1D] text-white">
                  Industry Supervisor (Workplace Mentor)
                </option>
                <option value="faculty" className="bg-[#1D1D1D] text-white">
                  Faculty Supervisor / Academic Mentor
                </option>
                <option value="coordinator" className="bg-[#1D1D1D] text-white">
                  Internship Coordinator
                </option>
                <option value="hod" className="bg-[#1D1D1D] text-white">
                  Head of Department (HoD)
                </option>
                <option value="dean" className="bg-[#1D1D1D] text-white">
                  Dean & Academic Office
                </option>
                <option value="admin" className="bg-[#1D1D1D] text-white">
                  Institutional Administrator
                </option>
              </select>
            </div>

            {/* Role-Specific Contextual Fields */}
            {selectedRole === "student" && (
              <div className="animate-in fade-in duration-200">
                <label className="block font-semibold text-[#9EB3CD] uppercase tracking-wider mb-1.5">
                  University Roll or Matriculation Number
                </label>
                <div className="relative">
                  <GraduationCap size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78889B]" />
                  <input
                    type="text"
                    name="universityId"
                    placeholder="e.g. 21BCE1001"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] outline-none focus:border-[#FF6B00] transition-colors"
                  />
                </div>
              </div>
            )}

            {(selectedRole === "faculty" || selectedRole === "hod") && (
              <div className="animate-in fade-in duration-200">
                <label className="block font-semibold text-[#9EB3CD] uppercase tracking-wider mb-1.5">
                  Academic Department
                </label>
                <input
                  type="text"
                  name="department"
                  placeholder="e.g. School of Computer Science & Engineering"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] outline-none focus:border-[#FF6B00] transition-colors"
                />
              </div>
            )}

            {selectedRole === "dean" && (
              <div className="animate-in fade-in duration-200">
                <label className="block font-semibold text-[#9EB3CD] uppercase tracking-wider mb-1.5">
                  Academic Division / Office
                </label>
                <input
                  type="text"
                  name="department"
                  placeholder="e.g. Office of the Dean of Academic Affairs"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] outline-none focus:border-[#FF6B00] transition-colors"
                />
              </div>
            )}

            {(selectedRole === "employer" || selectedRole === "supervisor") && (
              <div className="animate-in fade-in duration-200">
                <label className="block font-semibold text-[#9EB3CD] uppercase tracking-wider mb-1.5">
                  Company / Organisation Name
                </label>
                <div className="relative">
                  <Building size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78889B]" />
                  <input
                    type="text"
                    name="department"
                    placeholder="e.g. Apex Cloud Solutions Pvt Ltd"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] outline-none focus:border-[#FF6B00] transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block font-semibold text-[#9EB3CD] uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78889B]" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@university.edu or corporate.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] outline-none focus:border-[#FF6B00] transition-colors"
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#9EB3CD] uppercase tracking-wider mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78889B]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] outline-none focus:border-[#FF6B00] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78889B] hover:text-[#F5F5F5] transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#9EB3CD] uppercase tracking-wider mb-1.5">
                  Confirm Password *
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] outline-none focus:border-[#FF6B00] transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#FF6B00] hover:bg-[#FF7D1A] disabled:opacity-50 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-[#FF6B00]/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isLoading ? "Creating Account..." : "Complete Registration"}</span>
                <ArrowRight size={15} />
              </button>
            </div>

          </form>

          {/* Bottom Link to Login */}
          <div className="pt-4 border-t border-[#303030] text-center text-xs text-[#9EB3CD]">
            <span>Already have an account? </span>
            <Link
              href="/login"
              className="text-[#FF6B00] hover:text-[#FF7D1A] font-semibold transition-colors"
            >
              Sign In
            </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-[#78889B] relative z-10">
        <p>&copy; {new Date().getFullYear()} WorkLedger. Verified Work • Earned Credit.</p>
      </footer>

    </div>
  );
}
