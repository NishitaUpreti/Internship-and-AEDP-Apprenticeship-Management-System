import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./globals.css";
export const metadata = {
    title: "WorkLedger",
    description: "Internship and Apprenticeship Management Platform",
    icons: {
        icon: "/sqLogo.png",
    },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        {/* <Navbar/> */}
        {children}

      </body>
    </html>
  );
}
