"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { clearAuth } from "@/app/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleLogout = ()=>{
    dispatch(clearAuth());
    router.push("/login")
  }

  return (
    <nav className="w-full bg-white border-b border-blue-100 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-indigo-800 w-10 h-10 flex justify-center items-center text-white rounded-md">
            <p>E</p>
          </div>
          <h2 className="font-bold text-3xl">EventHub</h2>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <h4 className="hover:text-indigo-700 cursor-pointer">Bookings</h4>
          <h4 className="hover:text-indigo-700 cursor-pointer">Events</h4>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="bg-indigo-900 hover:bg-indigo-500 text-white w-24 h-10 rounded-md font-semibold">
              Logout
            </button>
          ) : (
            <button onClick={()=> router.push("/register") } className="bg-indigo-900 hover:bg-indigo-500 text-white w-24 h-10 rounded-md font-semibold">
              Signup
            </button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          {open ? (
            <X
              size={28}
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            />
          ) : (
            <Menu
              size={28}
              className="cursor-pointer"
              onClick={() => setOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-white shadow-lg p-4 rounded-md">
          <h4 className="hover:text-indigo-700 cursor-pointer">Bookings</h4>
          <h4 className="hover:text-indigo-700 cursor-pointer">Events</h4>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="bg-indigo-900 hover:bg-indigo-500 text-white w-full h-10 rounded-md font-semibold">
              Logout
            </button>
          ) : (
            <button onClick={()=> router.push("/register") } className="bg-indigo-900 hover:bg-indigo-500 text-white w-full h-10 rounded-md font-semibold">
              Signup
            </button>
          )}
       
        </div>
      )}
    </nav>
  );
}


