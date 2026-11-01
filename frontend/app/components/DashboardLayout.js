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

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

const DashboardLayout = ({ linksLayout, children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    // 1. Retrieve token and user from localStorage or cookies
    let token = localStorage.getItem("token") || getCookie("token");
    let storedUser = localStorage.getItem("user");
    let userRole = getCookie("user_role");

    // Clear session and redirect cleanly to /login
    const purgeAndRedirectToLogin = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
      document.cookie = "user_role=; path=/; max-age=0; SameSite=Lax";
      window.location.href = `/login?redirect=${encodeURIComponent(pathname)}`;
    };

    // If completely missing credentials, purge and redirect to login
    if (!token) {
      purgeAndRedirectToLogin();
      return;
    }

    // Keep localStorage in sync with cookie token
    localStorage.setItem("token", token);

    let parsedUser = null;
    if (storedUser) {
      try {
        parsedUser = JSON.parse(storedUser);
      } catch (e) {
        parsedUser = null;
      }
    }

    // Role check helper
    const checkRolePermission = (role) => {
      const currentBase = Object.keys(ROLE_ALLOWED_PATHS).find((base) =>
        pathname.startsWith(base)
      );

      if (currentBase && role) {
        const allowed = ROLE_ALLOWED_PATHS[currentBase];
        if (allowed && !allowed.includes(role)) {
          let target = "/student";
          if (role === "FACULTY_SUPERVISOR") target = "/faculty";
          else if (role === "EMPLOYER_ADMIN") target = "/employer";
          else if (role === "INDUSTRY_SUPERVISOR") target = "/supervisor";
          else if (role === "INTERNSHIP_COORDINATOR") target = "/coordinator";
          else if (role === "ADMIN") target = "/admin";

          window.location.href = target;
          return false;
        }
      }
      return true;
    };

    // If user and role already available, authorize immediately
    if (parsedUser && parsedUser.role) {
      if (checkRolePermission(parsedUser.role)) {
        setIsAuthorized(true);
        setIsLoading(false);
      }
    } else if (userRole) {
      if (checkRolePermission(userRole)) {
        setIsAuthorized(true);
        setIsLoading(false);
      }
    }

    // 2. Verify token with backend database
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          purgeAndRedirectToLogin();
          return null;
        }
        if (!res.ok) {
          // If server is restarting or returning 500, don't kill valid session
          setIsAuthorized(true);
          setIsLoading(false);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.success && data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          document.cookie = `user_role=${data.user.role}; path=/; max-age=604800; SameSite=Lax`;
          if (checkRolePermission(data.user.role)) {
            setIsAuthorized(true);
          }
        }
      })
      .catch((err) => {
        // If network request failed (e.g. backend offline or restarting),
        // permit existing session if token is present
        console.warn("Background auth verification deferred:", err?.message || err);
        setIsAuthorized(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Safety timeout: Never stay stuck on spinner for more than 2.5 seconds
    const timeoutTimer = setTimeout(() => {
      setIsLoading(false);
      setIsAuthorized(true);
    }, 2500);

    return () => clearTimeout(timeoutTimer);
  }, [pathname, router]);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
    document.cookie = "user_role=; path=/; max-age=0; SameSite=Lax";
    window.location.href = "/login";
  };

  if (isLoading && !isAuthorized) {
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
