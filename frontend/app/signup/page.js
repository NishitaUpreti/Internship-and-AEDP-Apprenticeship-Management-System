"use client"
import { useState } from "react";
export default function Signup(){
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    
    const handleSubmit = (event) =>{
        event.preventDefault();

        const form = event.target;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if(password===confirmPassword){
            setError("");
            setSuccess("Welcome! Your signup details are valid.");
        }else{
            setError("Passwords do not match!");
            setSuccess("");
            return;
        }
    }
    
 return (
    <div className="bg-[#111111] min-h-screen flex items-center justify-center">
      <div className="bg-[#1c1c1c] p-8 rounded-xl w-full max-w-md">
        <h1 className="text-white text-2xl font-bold text-center">Create Account !</h1>

        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <label className="block text-gray-300 mb-2">Name</label>
            <div className="flex gap-4">
                <input type="text" placeholder="First Name" required
                    className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none"/>
        
                <input type="text" placeholder="Second Name" required
                    className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none"/>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-gray-300 mb-2">Email</label>
            <input type="email" placeholder="Enter your email" required
                className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none"/>
          </div>

          <div className="mt-6">
            <label className="block text-gray-300 mb-2">Password</label>
            <input type="password" placeholder="Password" required name="password"
              className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none"/>
          </div>

          <div className="mt-6">
            <label className="block text-gray-300 mb-2">Confirm Password</label>
            <input type="password" placeholder="Password" required name="confirmPassword"
              className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none"/>
          </div>

          {/* error */}
          {error && (
            <p className="text-red-500 text-sm mt-3">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-sm mt-3">{success}</p>
            )

            }

          <button type="submit" 
            className="w-full mt-6 p-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition">Sign Up
          </button>

          <p className="text-gray-400 text-center mt-5">
            Already have an account?{" "}
            <a href="/login" className="text-orange-500 hover:text-orange-400">
              Login
            </a>
          </p>

        </form>
      </div>
    </div>
    );
}