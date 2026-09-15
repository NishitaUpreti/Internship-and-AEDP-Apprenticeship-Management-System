import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}