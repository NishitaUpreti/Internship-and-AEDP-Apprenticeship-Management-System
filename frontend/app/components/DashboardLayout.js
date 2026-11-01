
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
const DashboardLayout = ({linksLayout, children}) => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar links={linksLayout}/>
      <Navbar/>
      <main className="flex-1 min-w-0 bg-[#111111] text-white p-6">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
