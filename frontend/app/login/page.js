"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff
} from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const form = event.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      setError("Please enter both your email address and password.");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid credentials. Please verify and try again.");
        return;
      }

      setSuccess("Authentication verified! Redirecting to your portal...");

      // Save token and user in localStorage and cookies (for middleware route protection)
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        document.cookie = `token=${data.token}; path=/; max-age=604800; SameSite=Lax`;
        document.cookie = `user_role=${data.user?.role || ""}; path=/; max-age=604800; SameSite=Lax`;
      }

      // Role-based routing for all 8 P15 roles
      const role = data.user?.role;
      let targetRoute = "/";
      if (role === "STUDENT") targetRoute = "/student";
      else if (role === "FACULTY_SUPERVISOR") targetRoute = "/faculty";
      else if (role === "EMPLOYER_ADMIN") targetRoute = "/employer";
      else if (role === "INDUSTRY_SUPERVISOR") targetRoute = "/supervisor";
      else if (role === "INTERNSHIP_COORDINATOR") targetRoute = "/coordinator";
      else if (role === "HOD") targetRoute = "/hod";
      else if (role === "DEAN") targetRoute = "/dean";
      else if (role === "ADMIN") targetRoute = "/admin";

      setTimeout(() => {
        router.push(targetRoute);
      }, 900);
    } catch (err) {
      console.error("Login network error:", err);
      setError("Network error: Could not reach the server. Please ensure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#F5F5F5] font-sans flex flex-col justify-between relative overflow-hidden selection:bg-[#FF6B00] selection:text-white">
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#FF6B00]/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Top Bar with Back Link */}
      <header className="px-6 py-6 max-w-7xl w-full mx-auto flex items-center justify-between relative z-10">
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
        <div className="w-full max-w-md bg-[#171717] border border-[#303030] rounded-2xl p-7 sm:p-9 shadow-2xl space-y-6">
          
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
                Sign In to WorkLedger
              </h1>
              <p className="text-xs text-[#9EB3CD] mt-1">
                Enter your credentials to access your designated workspace
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

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-[#9EB3CD] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78889B]" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@university.edu or company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] outline-none focus:border-[#FF6B00] text-xs transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#9EB3CD] uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78889B]" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] outline-none focus:border-[#FF6B00] text-xs transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#78889B] hover:text-[#F5F5F5] transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#FF6B00] hover:bg-[#FF7D1A] disabled:opacity-50 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-[#FF6B00]/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isLoading ? "Verifying Credentials..." : "Sign In to Portal"}</span>
                <ArrowRight size={15} />
              </button>
            </div>

          </form>

          {/* Bottom Link to Signup */}
          <div className="pt-4 border-t border-[#303030] text-center text-xs text-[#9EB3CD]">
            <span>Don&apos;t have an account? </span>
            <Link
              href="/signup"
              className="text-[#FF6B00] hover:text-[#FF7D1A] font-semibold transition-colors"
            >
              Create Account
            </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-[#78889B] relative z-10">
        <p>&copy; {new Date().getFullYear()} WorkLedger. Verified Work • Earned Credit.</p>
      </footer>

    </div>
  );
}
