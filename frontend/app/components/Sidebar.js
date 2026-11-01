"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { EllipsisVertical, Ellipsis, Settings, LogOut } from "lucide-react";

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

  // Determine base dashboard path (e.g., /student, /faculty, /employer, etc.)
  const basePath = links && links.length > 0 ? links[0].href : "/";

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } min-h-screen bg-[#171717] border-r border-white/10 transition-all duration-300 flex flex-col`}
    >
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <Link href={basePath}>
          <Image
            src={isCollapsed ? "/sqLogo-v2.png" : "/WorkLedgerLogo-v2.png"}
            alt="WorkLedger"
            width={220}
            height={62}
            className={`object-contain transition-all duration-300 ${
              isCollapsed ? "w-10 h-10" : "w-44 h-auto"
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

      <nav className="p-3 space-y-1">
        {links &&
          links.map((obj) => {
            const Icon = obj.icon;
            const isActive =
              pathname === obj.href || pathname.startsWith(obj.href + "/");

            return (
              <Link
                key={obj.href}
                href={obj.href}
                title={isCollapsed ? obj.name : ""}
                className={`flex items-center rounded-xl px-4 py-3 transition-all ${
                  isCollapsed ? "justify-center" : "gap-3"
                } ${
                  isActive
                    ? "bg-orange-500/15 text-orange-400 font-medium"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {Icon && <Icon size={20} />}
                {!isCollapsed && <span>{obj.name}</span>}
              </Link>
            );
          })}
      </nav>

      <div className="mt-auto border-t border-white/10 p-3 space-y-2">
        <Link
          title={isCollapsed ? "Settings" : ""}
          href="/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white transition-all"
        >
          <Settings size={20} />
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
          className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-left cursor-pointer"
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
