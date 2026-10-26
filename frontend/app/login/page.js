"use client";
import { useState } from "react";

export default function Login() {

  const handleSubmit = (event) =>{
    event.preventDefault();
    alert("Login form submitted!");
  }


  return (
    <div className="bg-[#111111] min-h-screen flex items-center justify-center">
      <div className="bg-[#1c1c1c] p-8 rounded-xl w-full max-w-md">
        <h1 className="text-white text-2xl font-bold text-center">Welcome Back !</h1>

        <form onSubmit={handleSubmit}>

          <div className="mt-6">
            <label className="block text-gray-300 mb-2">Email</label>
            <input type="email" placeholder="Enter your email" required
                className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none"/>
          </div>

          <div className="mt-6">
            <label className="block text-gray-300 mb-2">Password</label>
            <input type="password" placeholder="Password" required
              className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none"/>
          </div>

          <button type="submit" 
            className="w-full mt-6 p-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition">Login
          </button>

          <p className="text-gray-400 text-center mt-5">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-orange-500 hover:text-orange-400">
              Sign up
            </a>
          </p>

        </form>
      </div>
    </div>
  );
}

