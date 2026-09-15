import Sidebar from "../components/Sidebar";
export default function EmployerLayout({ children }) {
    return (
         <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar />
        
            <main className="flex-1 p-4 md:p-8">
                {children}
            </main>
        </div>
    );
}