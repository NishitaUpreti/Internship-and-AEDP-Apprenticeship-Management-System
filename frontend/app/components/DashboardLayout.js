"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const ROLE_ALLOWED_PATHS = {
  "/student": ["STUDENT", "ADMIN"],
  "/faculty": [
    "FACULTY_SUPERVISOR",
    "HOD",
    "DEAN",
    "INTERNSHIP_COORDINATOR",
    "ADMIN",
  ],
  "/employer": ["EMPLOYER_ADMIN", "ADMIN"],
  "/supervisor": ["INDUSTRY_SUPERVISOR", "ADMIN"],
  "/coordinator": ["INTERNSHIP_COORDINATOR", "HOD", "DEAN", "ADMIN"],
  "/admin": ["ADMIN"],
};

const DashboardLayout = ({ linksLayout, children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // 1. If no token or user in storage, immediately redirect to login
    if (!token || !storedUser) {
      router.replace("/login");
      return;
    }

    let user;
    try {
      user = JSON.parse(storedUser);
    } catch (e) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.replace("/login");
      return;
    }

    // 2. Check role authorization for this specific dashboard path
    const currentBase = Object.keys(ROLE_ALLOWED_PATHS).find((base) =>
      pathname.startsWith(base)
    );

    if (currentBase) {
      const allowedRoles = ROLE_ALLOWED_PATHS[currentBase];
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        let target = "/student";
        if (user.role === "FACULTY_SUPERVISOR") target = "/faculty";
        else if (user.role === "EMPLOYER_ADMIN") target = "/employer";
        else if (user.role === "INDUSTRY_SUPERVISOR") target = "/supervisor";
        else if (user.role === "INTERNSHIP_COORDINATOR") target = "/coordinator";
        else if (user.role === "ADMIN") target = "/admin";

        router.replace(target);
        return;
      }
    }

    // 3. Verify token with backend database
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Token invalid or expired");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success && data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setIsAuthorized(true);
        } else {
          throw new Error("User verification failed");
        }
      })
      .catch((err) => {
        console.error("Dashboard auth verification failed:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.replace("/login");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pathname, router]);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
    document.cookie = "user_role=; path=/; max-age=0; SameSite=Lax";
    window.location.href = "/login";
  };

  // Loading screen prevents flashing dashboard content to unauthenticated users
  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen w-full bg-[#111111] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-[#111111]">
      <Sidebar
        links={linksLayout}
        onLogoutClick={() => setShowLogoutModal(true)}
      />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Navbar onLogoutClick={() => setShowLogoutModal(true)} />
        <main className="flex-1 p-6 bg-[#111111] text-white overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Custom Logout Confirmation Popup Modal */}
      {showLogoutModal && (
        <div
          onClick={() => setShowLogoutModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1c1c1c] border border-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center"
          >
            <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
              <LogOut size={26} />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">
              Confirm Logout
            </h3>

            <p className="text-sm text-gray-400 mb-6">
              Do you really want to log out of your account?
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 bg-[#2a2a2a] hover:bg-[#333333] text-gray-300 hover:text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer shadow-lg shadow-red-600/30"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
