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

  const handleLogout = () => {
    dispatch(clearAuth());
    router.push("/login");
  };

  return (
    <header className="fixed top-2 w-[98%] p-5  z-50 transition-all ducr ">
      <nav className="w-full bg-transparent bg-opacity-20 border rounded-lg  border-blue-100 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-primary to-accent w-10 h-10 flex justify-center items-center text-white rounded-md">
              <p>E</p>
            </div>
            <h2 className="font-bold text-3xl gradient-text">EventHub</h2>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <h4
              onClick={() => router.push("/booking")}
              className="hover:text-indigo-700 cursor-pointer"
            >
              Bookings
            </h4>
            <h4
              className="hover:text-indigo-700 cursor-pointer"
              onClick={() => router.push("/")}
            >
              Events
            </h4>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-br from-primary to-accent hover:bg-primary/10 transition-all duration-300 cursor-pointer text-white w-24 h-10 rounded-md font-semibold"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => router.push("/register")}
                className="bg-gradient-to-br from-primary to-accent hover:bg-primary/10 transition-all duration-300 cursor-pointer text-white w-24 h-10 rounded-md font-semibold "
              >
                Signup
              </button>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            {open ? (
              <X
                size={28}
                className="cursor-pointer gradient-text"
                onClick={() => setOpen(false)}
              />
            ) : (
              <Menu
                size={28}
                className="cursor-pointer gradient-text"
                onClick={() => setOpen(true)}
              />
            )}
          </div>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <div className="md:hidden mt-4 flex flex-col gap-4 bg-white shadow-lg p-4 rounded-md">
            <h4
              className="hover:text-indigo-700  cursor-pointer"
              onClick={() => router.push("/booking")}
            >
              Bookings
            </h4>
            <h4
              className="hover:text-indigo-700 cursor-pointer"
              onClick={() => router.push("/")}
            >
              Events
            </h4>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-br from-primary to-accent hover:bg-primary/10 transition-all duration-300 text-white w-full h-10 rounded-md font-semibold"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => router.push("/register")}
                className="bg-gradient-to-br from-primary to-accent hover:bg-primary/10 transition-all duration-300 text-white w-full h-10 rounded-md font-semibold"
              >
                Signup
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
