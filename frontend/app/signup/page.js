"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Demo University student integration state
  const [selectedRole, setSelectedRole] = useState("");
  const [demoRegNo, setDemoRegNo] = useState("");
  const [demoVerificationCode, setDemoVerificationCode] = useState("");
  const [demoStudentRecord, setDemoStudentRecord] = useState(null);
  const [isRequestingCode, setIsRequestingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [demoLookupError, setDemoLookupError] = useState("");
  const [demoNotice, setDemoNotice] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");

  // Form field state for auto-populating from demo database
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Step 1: Request simulated verification code
  const handleRequestDemoCode = async () => {
    setDemoLookupError("");
    setDemoNotice("");
    const trimmed = demoRegNo.trim();

    if (!/^124\d{5}$/.test(trimmed)) {
      setDemoLookupError("Registration number must be an 8-digit numeric string starting with 124 (e.g. 12429384).");
      return;
    }

    setIsRequestingCode(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/auth/demo-student/request-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationNumber: trimmed })
      });
      const data = await response.json();

      if (!response.ok) {
        setDemoStudentRecord(null);
        setDemoLookupError(data.message || "Failed to generate simulated verification code.");
        return;
      }

      setMaskedEmail(data.maskedEmail || "");
      // For demonstration convenience, pre-fill the demo verification code
      if (data.demoVerificationCode) {
        setDemoVerificationCode(data.demoVerificationCode);
      }
      setDemoNotice(`Simulated verification code generated for demo student (${data.maskedEmail}). Code: ${data.demoVerificationCode}`);
    } catch (err) {
      console.error("Demo code request error:", err);
      setDemoLookupError("Network error: Could not reach backend to generate demo code.");
    } finally {
      setIsRequestingCode(false);
    }
  };

  // Step 2: Verify code and retrieve full academic record
  const handleVerifyDemoCode = async () => {
    setDemoLookupError("");
    const trimmedReg = demoRegNo.trim();
    const trimmedCode = demoVerificationCode.trim();

    if (!trimmedReg || !trimmedCode) {
      setDemoLookupError("Please enter both registration number and 6-digit demo verification code.");
      return;
    }

    setIsVerifyingCode(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/auth/demo-student/${trimmedReg}?code=${encodeURIComponent(trimmedCode)}`);
      const data = await response.json();

      if (!response.ok) {
        setDemoStudentRecord(null);
        setDemoLookupError(data.message || "Failed to verify simulated student record.");
        return;
      }

      const student = data.student;
      setDemoStudentRecord(student);
      setDemoLookupError("");

      // Auto-populate names and email if available
      if (student.fullName) {
        const parts = student.fullName.split(" ");
        setFirstName(parts[0] || "");
        setLastName(parts.slice(1).join(" ") || "");
      }
      if (student.email) {
        setEmail(student.email);
      }
    } catch (err) {
      console.error("Demo verification error:", err);
      setDemoLookupError("Network error: Could not reach backend to verify demo academic record.");
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const form = event.target;
    const fName = firstName || form.firstName?.value?.trim();
    const lName = lastName || form.lastName?.value?.trim();
    const role = form.role.value;
    const mail = email || form.email?.value?.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

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
      const payload = {
        firstName: fName,
        lastName: lName,
        role,
        email: mail,
        password,
        confirmPassword,
      };

      // Attach demo registration number and verification code if student verified demo data
      if (role === "student" && demoStudentRecord && demoStudentRecord.registrationNumber) {
        payload.demoRegistrationNumber = demoStudentRecord.registrationNumber;
        payload.demoVerificationCode = demoVerificationCode.trim();
      }

      const response = await fetch(`${apiUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to create account. Please try again.");
        return;
      }

      setSuccess("Account created successfully! Redirecting to login...");

      // Store token & user info in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
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
    <div className="bg-[#111111] min-h-screen flex items-center justify-center p-4">
      <div className="bg-[#1c1c1c] p-8 rounded-xl w-full max-w-md my-8 shadow-2xl border border-gray-800">
        <h1 className="text-white text-2xl font-bold text-center">Create Account !</h1>

        <form onSubmit={handleSubmit}>
          {/* Role selection */}
          <div className="mt-6">
            <label className="block text-gray-300 mb-2 font-medium">I am a</label>
            <select
              name="role"
              required
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setDemoStudentRecord(null);
                setDemoLookupError("");
                setDemoNotice("");
              }}
              className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none"
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="student">Student</option>
              <option value="employer">Employer</option>
              <option value="supervisor">Supervisor</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>

          {/* Simulated University Student Integration (Demo Only) */}
          {selectedRole === "student" && (
            <div className="mt-6 p-4 rounded-lg bg-[#20252b] border border-blue-500/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-900/40 px-2 py-1 rounded">
                  DEMO DATABASE INTEGRATION
                </span>
                <span className="text-xs text-amber-400 font-semibold">Simulated Only</span>
              </div>
              <p className="text-xs text-gray-300 mb-3">
                Enter an 8-digit demo university registration number starting with <code>124</code> (e.g. <code>12429384</code>) to simulate academic data retrieval.
              </p>

              {/* Step 1: Registration Number & Code Request */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Demo Reg No (e.g. 12429384)"
                  value={demoRegNo}
                  onChange={(e) => setDemoRegNo(e.target.value.trim())}
                  maxLength={8}
                  className="flex-1 p-2 text-sm rounded bg-[#161a1e] text-white border border-gray-700 outline-none"
                />
                <button
                  type="button"
                  onClick={handleRequestDemoCode}
                  disabled={isRequestingCode}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition disabled:opacity-50"
                >
                  {isRequestingCode ? "Sending..." : "Get Demo Code"}
                </button>
              </div>

              {/* Notice / Instruction */}
              {demoNotice && (
                <div className="mt-2 p-2 bg-blue-950/60 rounded border border-blue-800 text-[11px] text-blue-200">
                  <p>{demoNotice}</p>
                  <p className="text-[10px] text-amber-400 mt-1 italic">
                    ⚠️ DEMO SIMULATION ONLY: This code is a demonstration verification mechanism. Not official university identity verification.
                  </p>
                </div>
              )}

              {/* Step 2: Verification Code Input */}
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="6-digit Demo Code"
                  value={demoVerificationCode}
                  onChange={(e) => setDemoVerificationCode(e.target.value.trim())}
                  maxLength={6}
                  className="w-36 p-2 text-sm rounded bg-[#161a1e] text-white border border-gray-700 outline-none text-center font-mono"
                />
                <button
                  type="button"
                  onClick={handleVerifyDemoCode}
                  disabled={isVerifyingCode || !demoVerificationCode}
                  className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded transition disabled:opacity-50"
                >
                  {isVerifyingCode ? "Verifying..." : "Verify & Auto-Fill"}
                </button>
              </div>

              {demoLookupError && (
                <p className="text-red-400 text-xs mt-2 font-medium">{demoLookupError}</p>
              )}

              {/* Step 3: Verified Academic Record Display */}
              {demoStudentRecord && (
                <div className="mt-3 p-3 bg-[#17202a] rounded border border-emerald-500/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-amber-500 text-black px-2 py-0.5 rounded">
                      DEMO DATA (SIMULATED)
                    </span>
                    <span className="text-xs text-emerald-400">Verified & Locked</span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1">
                    <p><span className="text-gray-400">Student:</span> <strong className="text-white">{demoStudentRecord.fullName}</strong></p>
                    <p><span className="text-gray-400">Branch:</span> <strong className="text-white">{demoStudentRecord.branch}</strong></p>
                    <p><span className="text-gray-400">Semester:</span> {demoStudentRecord.semester} | <span className="text-gray-400">CGPA:</span> <strong className="text-emerald-400">{demoStudentRecord.cgpa}</strong></p>
                    <p><span className="text-gray-400">Status:</span> <span className="text-emerald-300 font-semibold">{demoStudentRecord.academicStatus}</span></p>
                    <p className="text-[10px] text-amber-300/80 italic mt-1">
                      ⚠️ This record is simulated for demonstration purposes and is NOT officially verified by the university.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Name fields */}
          <div className="mt-6">
            <label className="block text-gray-300 mb-2">Name</label>
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none"
              />

              <input
                type="text"
                name="lastName"
                placeholder="Second Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mt-6">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none"
            />
          </div>

          {/* Password */}
          <div className="mt-6">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-6">
            <label className="block text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              name="confirmPassword"
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
