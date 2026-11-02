
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
const DashboardLayout = ({linksLayout, children}) => {
  return (
    <div className="flex h-screen w-full bg-[#111111] overflow-hidden">
      <Sidebar links={linksLayout}/>
      <div className="flex flex-1 min-w-0 flex-col h-screen overflow-hidden">
        <Navbar/>
        <main className="flex-1 min-w-0 bg-[#111111] text-white p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
