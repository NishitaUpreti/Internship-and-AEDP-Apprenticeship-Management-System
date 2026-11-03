"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { EllipsisVertical, Ellipsis, Settings, LogOut } from "lucide-react";

// Top-level root paths that should require exact matching so they don't stay highlighted on sub-pages
const ROLE_ROOT_PATHS = [
  "/",
  "/student",
  "/employer",
  "/supervisor",
  "/faculty",
  "/coordinator",
  "/hod",
  "/dean",
  "/admin"
];

export default function Sidebar({ links, onLogoutClick }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
    document.cookie = "user_role=; path=/; max-age=0; SameSite=Lax";
    window.location.href = "/login";
  };

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } h-screen sticky top-0 shrink-0 bg-[#171717] border-r border-white/10 transition-all duration-300 flex flex-col z-30`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3.5 shrink-0">
        <Link href="/" title="Go to WorkLedger Home" className="block focus:outline-none">
          <Image
            src={isCollapsed ? "/sqLogo-v2.png" : "/WorkLedgerLogo-v2.png"}
            alt="WorkLedger"
            width={220}
            height={62}
            className={`object-contain transition-all duration-300 hover:opacity-90 ${
              isCollapsed ? "w-9 h-9" : "w-44 h-auto"
            }`}
            priority
          />
        </Link>
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
        >
          {isCollapsed ? <EllipsisVertical size={20} /> : <Ellipsis size={20} />}
        </button>
      </div>

      {/* Navigation List - scrollable on short viewports */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 min-h-0">
        {links &&
          links.map((obj) => {
            const Icon = obj.icon;
            
            // Fix: Root dashboards (/employer, /student, etc.) must match exactly so they don't stay orange on subpages
            const isRoleRoot = ROLE_ROOT_PATHS.includes(obj.href);
            const isActive = isRoleRoot
              ? pathname === obj.href
              : pathname === obj.href || pathname.startsWith(obj.href + "/");

            return (
              <Link
                key={obj.href}
                href={obj.href}
                title={isCollapsed ? obj.name : ""}
                className={`group relative flex items-center rounded-xl px-3.5 py-2.5 text-sm font-medium border transition-colors duration-150 ease-out select-none ${
                  isCollapsed ? "justify-center" : "gap-3"
                } ${
                  isActive
                    ? "bg-orange-500/15 text-orange-400 border-orange-500/25 shadow-sm"
                    : "border-transparent text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {Icon && (
                  <Icon
                    size={19}
                    className={`shrink-0 transition-colors duration-150 ${
                      isActive ? "text-orange-400" : "text-gray-400 group-hover:text-white"
                    }`}
                  />
                )}
                {!isCollapsed && <span className="truncate">{obj.name}</span>}
              </Link>
            );
          })}
      </nav>

      {/* Pinned Bottom Settings & Logout - Always visible in viewport */}
      <div className="shrink-0 border-t border-white/10 p-3 space-y-1 bg-[#171717]">
        <Link
          title={isCollapsed ? "Settings" : ""}
          href="/settings"
          className={`flex items-center rounded-xl px-3.5 py-2.5 text-sm font-medium border border-transparent text-gray-300 hover:bg-white/5 hover:text-white transition-colors duration-150 select-none ${
            isCollapsed ? "justify-center" : "gap-3"
          }`}
        >
          <Settings size={19} className="shrink-0 text-gray-400" />
          {!isCollapsed && <span>Settings</span>}
        </Link>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onLogoutClick) {
              onLogoutClick();
            } else {
              handleLogout();
            }
          }}
          title={isCollapsed ? "Logout" : ""}
          className={`w-full flex items-center rounded-xl px-3.5 py-2.5 text-sm font-medium border border-transparent text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-150 text-left cursor-pointer select-none ${
            isCollapsed ? "justify-center" : "gap-3"
          }`}
        >
          <LogOut size={19} className="shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
