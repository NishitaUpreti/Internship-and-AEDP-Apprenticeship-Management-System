"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LifeBuoy,
  LogOut,
} from "lucide-react"

const MENU_ITEMS = [
  { label: "My Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Help Desk", href: "/help", icon: LifeBuoy },
]

// Demo identities until authentication is wired up.
const USERS = {
  student: {
    name: "Nishita Upreti",
    subtitle: "B.Tech CSE \u2022 3rd Year",
    initials: "NU",
    email: "nishita.upreti@university.edu",
  },
  employer: {
    name: "Arjun Kapoor",
    subtitle: "Employer Admin",
    initials: "AK",
    email: "arjun@techcorp.com",
  },
  supervisor: {
    name: "Rahul Mehta",
    subtitle: "Industry Supervisor",
    initials: "RM",
    email: "rahul.mehta@techcorp.com",
  },
  faculty: {
    name: "Ananya Rao",
    subtitle: "Faculty Supervisor",
    initials: "AR",
    email: "ananya.rao@university.edu",
  },
  coordinator: {
    name: "Priya Nair",
    subtitle: "Internship Coordinator",
    initials: "PN",
    email: "priya.nair@university.edu",
  },
  admin: {
    name: "System Admin",
    subtitle: "Administrator",
    initials: "SA",
    email: "admin@university.edu",
  },
}

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const pathname = usePathname()

  // "/student/profile" -> "/student" so the same navbar works for every role.
  const firstSegment = pathname.split("/").filter(Boolean)[0]
  const basePath = firstSegment ? `/${firstSegment}` : ""
  const user = USERS[firstSegment] ?? USERS.student

  useEffect(() => {
    function handlePointerDown(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") setIsDropdownOpen(false)
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <nav className="w-full h-20 shrink-0 flex items-center justify-between gap-4 px-6 border-b border-[#2a2a2a] bg-[#111111] z-20">
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

        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen((open) => !open)}
            aria-haspopup="menu"
            aria-expanded={isDropdownOpen}
            className="flex items-center gap-3 cursor-pointer rounded-lg p-2 hover:bg-[#252525] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#75452f] flex items-center justify-center text-white font-semibold">
              {user.initials}
            </div>

            <div className="flex flex-col text-left">
              <p className="text-sm font-semibold text-white">{user.name}</p>
              <p className="text-xs text-gray-400">{user.subtitle}</p>
            </div>

            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-2 w-56 bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl shadow-lg p-2 z-50"
            >
              <div className="px-3 py-2 border-b border-white/10 mb-1">
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <p className="truncate text-xs text-gray-500">{user.email}</p>
              </div>

              {MENU_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.label}
                    href={`${basePath}${item.href}`}
                    role="menuitem"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-300 rounded-lg hover:bg-[#2a2a2a] hover:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}

              <div className="my-1 border-t border-white/10" />

              <Link
                href="/login"
                role="menuitem"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-400 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
