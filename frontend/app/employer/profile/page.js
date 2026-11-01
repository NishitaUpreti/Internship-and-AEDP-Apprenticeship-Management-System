"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Globe,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Clock,
  Save,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function EmployerProfilePage() {
  const [profile, setProfile] = useState({
    organisationName: "",
    description: "",
    website: "",
    contactEmail: "",
    contactPhone: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "India",
      postalCode: "",
    },
    verificationStatus: "PENDING",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/employers/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to load company profile.");
      }

      if (data.employer) {
        setProfile({
          organisationName: data.employer.organisationName || "",
          description: data.employer.description || "",
          website: data.employer.website || "",
          contactEmail: data.employer.contactEmail || "",
          contactPhone: data.employer.contactPhone || "",
          address: {
            street: data.employer.address?.street || "",
            city: data.employer.address?.city || "",
            state: data.employer.address?.state || "",
            country: data.employer.address?.country || "India",
            postalCode: data.employer.address?.postalCode || "",
          },
          verificationStatus: data.employer.verificationStatus || "PENDING",
        });
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Network error loading profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/employers/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile.");
      }

      setSuccessMsg("Company profile updated successfully!");
      if (data.employer) {
        setProfile((prev) => ({
          ...prev,
          ...data.employer,
        }));
      }
    } catch (err) {
      setErrorMsg(err.message || "Failed to save company profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === "VERIFIED") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <ShieldCheck size={14} /> Verified Partner Organization
        </span>
      );
    }
    if (status === "REJECTED") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
          <AlertCircle size={14} /> Verification Rejected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
        <Clock size={14} /> Verification Pending Admin Review
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm">Loading company profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Company Organization Profile
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your company identity, office location, and institutional verification status.
          </p>
        </div>
        <div>{getStatusBadge(profile.verificationStatus)}</div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
          <Link
            href="/employer/opportunities"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-black font-semibold rounded-lg text-xs hover:bg-emerald-400 transition"
          >
            <span>Proceed to Post Opportunities &rarr;</span>
          </Link>
        </div>
      )}
      {errorMsg && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Identity Card */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Building2 className="text-orange-500" size={20} />
            Organization Identity
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Organisation Name *
              </label>
              <input
                type="text"
                required
                value={profile.organisationName}
                onChange={(e) =>
                  setProfile({ ...profile, organisationName: e.target.value })
                }
                placeholder="e.g. Microsoft India Pvt Ltd"
                className="w-full p-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Official Website
              </label>
              <div className="relative">
                <Globe
                  size={16}
                  className="absolute left-3.5 top-3.5 text-gray-500"
                />
                <input
                  type="url"
                  value={profile.website}
                  onChange={(e) =>
                    setProfile({ ...profile, website: e.target.value })
                  }
                  placeholder="https://company.com"
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Company Overview & Work-Based Learning Culture
            </label>
            <textarea
              rows={4}
              value={profile.description}
              onChange={(e) =>
                setProfile({ ...profile, description: e.target.value })
              }
              placeholder="Describe your company, industries served, and mentorship opportunities for AEDP apprentices..."
              className="w-full p-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm resize-none"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="text-orange-500" size={20} />
            HR & Internship Point of Contact
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Official Contact Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-3.5 text-gray-500"
                />
                <input
                  type="email"
                  value={profile.contactEmail}
                  onChange={(e) =>
                    setProfile({ ...profile, contactEmail: e.target.value })
                  }
                  placeholder="internships@company.com"
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Official Phone Number
              </label>
              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-3.5 top-3.5 text-gray-500"
                />
                <input
                  type="tel"
                  value={profile.contactPhone}
                  onChange={(e) =>
                    setProfile({ ...profile, contactPhone: e.target.value })
                  }
                  placeholder="+91 9876543210"
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Physical Address */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MapPin className="text-orange-500" size={20} />
            Office Location & Workplace Facility
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Street Address
              </label>
              <input
                type="text"
                value={profile.address.street}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    address: { ...profile.address, street: e.target.value },
                  })
                }
                placeholder="e.g. Cyber City, Phase III"
                className="w-full p-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                City
              </label>
              <input
                type="text"
                value={profile.address.city}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    address: { ...profile.address, city: e.target.value },
                  })
                }
                placeholder="e.g. Gurugram / Bengaluru"
                className="w-full p-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                State
              </label>
              <input
                type="text"
                value={profile.address.state}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    address: { ...profile.address, state: e.target.value },
                  })
                }
                placeholder="e.g. Haryana / Karnataka"
                className="w-full p-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                PIN Code
              </label>
              <input
                type="text"
                value={profile.address.postalCode}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    address: { ...profile.address, postalCode: e.target.value },
                  })
                }
                placeholder="e.g. 560100"
                className="w-full p-3 rounded-xl bg-[#242424] text-white border border-gray-700 outline-none focus:border-orange-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-orange-600/25 cursor-pointer"
          >
            <Save size={16} />
            <span>{isSaving ? "Saving Changes..." : "Save Profile"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

