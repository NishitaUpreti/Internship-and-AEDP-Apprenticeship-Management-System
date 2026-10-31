"use client"
import { useState } from "react"
import {Search, Bell, ChevronDown, User} from "lucide-react";
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <nav className="w-full h-20 flex items-center justify-between px-6 border-b border-[#2a2a2a] bg-[#111111]">
      <div className="flex items-center w-[60%] max-w-2xl bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl px-4 py-3">
        <div className="w-5 h-5 text-gray-400">
          <Search/>
        </div>
        <input type="text" placeholder="Search anything..." className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-500 ml-3"></input>
      </div>

      <div className="flex items-center gap-5 relative">
        <div className="w-5 h-5 text-gray-400 hover:text-white transition-colors relative cursor-pointer">
          <Bell/>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E58A50] rounded-full"></span>
        </div>

        <div onClick={()=>{setIsDropdownOpen(!isDropdownOpen)}} className="flex items-center gap-3 cursor-pointer rounded-lg p-2 hover:bg-[#252525] transition-colors">
          <div className="w-10 h-10 rounded-full bg-[#75452f] flex items-center justify-center text-white font-semibold">
            NU
          </div>

          <div className="flex flex-col ">
            <p className="text-sm font-semibold text-white">Full Name</p>
            <p className="text-xs text-gray-400">Roll</p>
          </div>

          <div className="w-4 h-4 text-gray-400 cursor-pointer">
            <ChevronDown/>
          </div>

          {isDropdownOpen && 
            (<div className="absolute right-0 top-full mt-2 w-48 bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl shadow-lg p-2 z-50">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-300 rounded-lg hover:bg-[#2a2a2a] hover:text-white transition-colors">My Profile</button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-300 rounded-lg hover:bg-[#2a2a2a] hover:text-white transition-colors">Settings</button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-300 rounded-lg hover:bg-[#2a2a2a] hover:text-white transition-colors">Logout</button>
            </div>
          )}
        </div>
        
      </div>
    </nav>
  )
}

export default Navbar