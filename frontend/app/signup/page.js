"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      setError("Please select your role.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
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

      setSuccess("Account created successfully! Redirecting to login...");

      // Store token & user info in localStorage and cookies for route protection
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        document.cookie = `token=${data.token}; path=/; max-age=604800; SameSite=Lax`;
        document.cookie = `user_role=${data.user?.role || ""}; path=/; max-age=604800; SameSite=Lax`;
      }

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      console.error("Signup network error:", err);
      setError("Network error: Could not reach the server. Please ensure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#111111] min-h-screen flex items-center justify-center py-10">
      <div className="bg-[#1c1c1c] p-8 rounded-xl w-full max-w-md border border-gray-800">
        <h1 className="text-white text-2xl font-bold text-center">Create Account !</h1>

        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <label className="block text-gray-300 mb-2">Name</label>
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                name="lastName"
                placeholder="Second Name"
                required
                className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-gray-300 mb-2">I am a</label>
            <select
              name="role"
              required
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none cursor-pointer focus:border-orange-500"
            >
              <option value="" disabled className="bg-[#2a2a2a] text-gray-400">
                Select your role
              </option>
              <option value="student" className="bg-[#2a2a2a] text-white">
                Student
              </option>
              <option value="faculty" className="bg-[#2a2a2a] text-white">
                Faculty
              </option>
              <option value="employer" className="bg-[#2a2a2a] text-white">
                Employer
              </option>
              <option value="supervisor" className="bg-[#2a2a2a] text-white">
                Supervisor
              </option>
              <option value="coordinator" className="bg-[#2a2a2a] text-white">
                Coordinator
              </option>
              <option value="admin" className="bg-[#2a2a2a] text-white">
                Admin
              </option>
            </select>
          </div>

          {/* Role-specific optional fields */}
          {selectedRole === "student" && (
            <div className="mt-6">
              <label className="block text-gray-300 mb-2">University Roll or ID Number</label>
              <input
                type="text"
                name="universityId"
                placeholder="e.g. 21BCE1001"
                className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none focus:border-orange-500"
              />
            </div>
          )}

          {selectedRole === "faculty" && (
            <div className="mt-6">
              <label className="block text-gray-300 mb-2">Department</label>
              <input
                type="text"
                name="department"
                placeholder="e.g. Computer Science & Engineering"
                className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none focus:border-orange-500"
              />
            </div>
          )}

          <div className="mt-6">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none focus:border-orange-500"
            />
          </div>

          <div className="mt-6">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none focus:border-orange-500"
            />
          </div>

          <div className="mt-6">
            <label className="block text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="confirmPassword"
              className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none focus:border-orange-500"
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
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="text-gray-400 text-center mt-5">
            Already have an account?{" "}
            <a href="/login" className="text-orange-500 hover:text-orange-400">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
