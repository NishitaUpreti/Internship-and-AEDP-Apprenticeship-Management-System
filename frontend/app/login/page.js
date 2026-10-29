"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const form = event.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      setError("Please enter both email and password.");
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
        setError(data.message || "Invalid credentials. Please try again.");
        return;
      }

      setSuccess("Login successful! Redirecting...");

      // Save token and user in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Role-based routing
      const role = data.user?.role;
      let targetRoute = "/";
      if (role === "STUDENT") targetRoute = "/student";
      else if (role === "FACULTY_SUPERVISOR") targetRoute = "/faculty";
      else if (role === "EMPLOYER_ADMIN") targetRoute = "/employer";
      else if (role === "INDUSTRY_SUPERVISOR") targetRoute = "/supervisor";
      else if (role === "INTERNSHIP_COORDINATOR") targetRoute = "/coordinator";
      else if (role === "ADMIN") targetRoute = "/admin";

      setTimeout(() => {
        router.push(targetRoute);
      }, 1000);
    } catch (err) {
      console.error("Login network error:", err);
      setError("Network error: Could not reach the server. Please ensure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#111111] min-h-screen flex items-center justify-center">
      <div className="bg-[#1c1c1c] p-8 rounded-xl w-full max-w-md">
        <h1 className="text-white text-2xl font-bold text-center">Welcome Back !</h1>

        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none"
            />
          </div>

          <div className="mt-6">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none"
            />
          </div>

          {/* Feedback messages */}
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-3">{success}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-6 p-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>

          <p className="text-gray-400 text-center mt-5">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-orange-500 hover:text-orange-400">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
