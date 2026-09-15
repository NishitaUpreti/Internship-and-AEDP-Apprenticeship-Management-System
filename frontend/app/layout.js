import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Navbar/>
        {/* <Sidebar/> */}
        {children}

      </body>
    </html>
  );
}
