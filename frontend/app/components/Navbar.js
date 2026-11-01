"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, ChevronDown, User, LogOut } from "lucide-react";

const Navbar = ({ onLogoutClick }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showInternalModal, setShowInternalModal] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // 1. Initial quick load from localStorage so UI doesn't flicker
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing stored user:", err);
      }
    }

    // 2. Fetch fresh user data from database via backend API
    const token = localStorage.getItem("token");
    if (!token) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success && data.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      })
      .catch((err) => {
        console.error("Error fetching user profile from database:", err);
      });
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const formatRole = (role) => {
    if (!role) return "User";
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleLogoutClick = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(false);
    if (onLogoutClick) {
      onLogoutClick();
    } else {
      setShowInternalModal(true);
    }
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
    document.cookie = "user_role=; path=/; max-age=0; SameSite=Lax";
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="w-full h-20 flex items-center justify-between px-6 border-b border-[#2a2a2a] bg-[#111111]">
        <div className="flex items-center w-[60%] max-w-2xl bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl px-4 py-3">
          <div className="w-5 h-5 text-gray-400">
            <Search />
          </div>
          <input
            type="text"
            placeholder="Search anything..."
            className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-500 ml-3"
          />
        </div>

        <div className="flex items-center gap-5 relative">
          <div className="w-5 h-5 text-gray-400 hover:text-white transition-colors relative cursor-pointer">
            <Bell />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E58A50] rounded-full"></span>
          </div>

          <div
            ref={dropdownRef}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 cursor-pointer rounded-lg p-2 hover:bg-[#252525] transition-colors relative"
          >
            <div className="w-10 h-10 rounded-full bg-[#75452f] flex items-center justify-center text-white font-semibold">
              {getInitials(user?.name)}
            </div>

            <div className="flex flex-col">
              <p className="text-sm font-semibold text-white">
                {user?.name || "Loading..."}
              </p>
              <p className="text-xs text-gray-400">
                {formatRole(user?.role)}
              </p>
            </div>

            <div className="w-4 h-4 text-gray-400 cursor-pointer">
              <ChevronDown />
            </div>

            {isDropdownOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-full mt-2 w-52 bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl shadow-lg p-2 z-50"
              >
                {user?.email && (
                  <div className="px-3 py-2 border-b border-[#2a2a2a] mb-1">
                    <p className="text-[11px] text-gray-400">Signed in as</p>
                    <p className="text-xs font-medium text-white truncate">
                      {user.email}
                    </p>
                  </div>
                )}
                <button
                  type="button"
                  className="w-full text-left px-3 py-2 text-sm text-gray-300 rounded-lg hover:bg-[#2a2a2a] hover:text-white transition-colors cursor-pointer"
                >
                  My Profile
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3 py-2 text-sm text-gray-300 rounded-lg hover:bg-[#2a2a2a] hover:text-white transition-colors cursor-pointer"
                >
                  Settings
                </button>
                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="w-full text-left px-3 py-2 text-sm text-red-400 rounded-lg hover:bg-[#2a2a2a] hover:text-red-300 transition-colors cursor-pointer font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Internal Modal fallback if used standalone */}
      {showInternalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#1c1c1c] border border-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
              <LogOut size={26} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Confirm Logout</h3>
            <p className="text-sm text-gray-400 mb-6">
              Do you really want to log out of your account?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowInternalModal(false)}
                className="flex-1 px-4 py-2.5 bg-[#2a2a2a] hover:bg-[#333333] text-gray-300 hover:text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
