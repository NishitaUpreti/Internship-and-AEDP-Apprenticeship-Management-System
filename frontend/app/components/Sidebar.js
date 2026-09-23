import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r p-4 md:p-6">
            <h2 className="text-xl font-bold mb-4 md:mb-8">
                AppName
            </h2>

            <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto">
                <Link
                    href="/student"
                    className="px-4 py-2 rounded hover:bg-orange-300 hover:text-white whitespace-nowrap"
                >
                    Dashboard
                </Link>

                <Link
                    href="/student/applications"
                    className="px-4 py-2 rounded hover:bg-orange-300 hover:text-white whitespace-nowrap"
                >
                    Applications
                </Link>

                <Link
                    href="/student/internship"
                    className="px-4 py-2 rounded hover:bg-orange-300 hover:text-white whitespace-nowrap"
                >
                    My Internship
                </Link>

                <Link
                    href="/student/hours"
                    className="px-4 py-2 rounded hover:bg-orange-300 hover:text-white whitespace-nowrap"
                >
                    Hours & Credits
                </Link>
            </nav>
        </aside>
    );
}