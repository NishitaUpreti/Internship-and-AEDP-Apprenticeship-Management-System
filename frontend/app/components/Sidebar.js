"use client"
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// usePathname()tells us which URL the user is currently visiting
import {EllipsisVertical, Ellipsis, Settings, LogOut} from "lucide-react";

export default function Sidebar({ links }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    const firstSegment = pathname.split("/").filter(Boolean)[0];
    const basePath = firstSegment ? `/${firstSegment}` : "";

    const isLinkActive = (href) => {
        // The dashboard link ("/student") must not stay highlighted on subroutes.
        if (href === basePath) return pathname === href;
        return pathname === href || pathname.startsWith(href + "/");
    };

    return (
        <aside className={`${isCollapsed ? "w-20" : "w-64"} h-screen shrink-0 overflow-y-auto bg-[#171717] border-r border-white/10 transition-all duration-300 flex flex-col`}>
            <div className="flex items-center justify-center border-b border-white/10 p-4">
                <Link href={basePath || "/"}>
                    <Image
                        src={isCollapsed ? "/sqLogo.png":"/WorkLedgerLogo.png"}
                        alt="WorkLedger"
                        width={220}
                        height={62}
                        className={`object-contain transition-all duration-300 ${
                                    isCollapsed ? "w-10 h-10" : "w-52 h-auto"
                                    }`}
                        priority
                    />
                </Link>
                <button onClick={() => setIsCollapsed(!isCollapsed)} >
                    {isCollapsed ? <EllipsisVertical /> : <Ellipsis />}
                </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-2">

                {links.map((obj) => {
                    const Icon = obj.icon;
                    return (
                        <Link title={isCollapsed ? obj.name : ""}
                            className={`flex items-center rounded-xl px-4 py-3 transition-all ${
                                isCollapsed ? "justify-center" : "gap-3"
                            } ${
                                isLinkActive(obj.href)
                                    ? "bg-orange-500/15 text-orange-400"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                            }`
                            } key={obj.href} href={obj.href}
                        >

                            <Icon/>
                            {!isCollapsed && <span>{obj.name}</span>}

                        </Link>
                    )
                })}
            </nav>
            <div className="mt-auto border-t border-white/10 p-3 space-y-2">
                <Link
                    title={isCollapsed ? "Settings" : ""}
                    href={`${basePath}/settings`}
                    className={`flex items-center rounded-xl px-4 py-3 transition-all ${
                        isCollapsed ? "justify-center" : "gap-3"
                    } ${
                        isLinkActive(`${basePath}/settings`)
                            ? "bg-orange-500/15 text-orange-400"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                    <Settings size={23} /> {!isCollapsed && <span>Settings</span>}
                </Link>

                <Link
                    title={isCollapsed ? "Logout" : ""}
                    href="/login"
                    className={`flex items-center rounded-xl px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white transition-all ${
                        isCollapsed ? "justify-center" : "gap-3"
                    }`}
                >
                    <LogOut size={23}/>  {!isCollapsed && <span>LogOut</span>}
                </Link>

            </div>
        </aside>
    );
}
