"use client";
import React from "react";
import { useFetchBookingsQuery } from "../redux/bookingApi/bookingApi";
import { useRouter } from "next/navigation";

export default function Booking() {
  const { data } = useFetchBookingsQuery();
  console.log("debugging all the booking of todays " , data);
  const router = useRouter();

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((b: any) => (
          <div
            key={b._id}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-200"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Booking ID: {b._id.slice(0, 6)}...
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  b.status === "booked"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {b.status.toUpperCase()}
              </span>
            </div>

            {/* Amount */}
            <p className="text-gray-700 text-sm mb-1">
              <span className="font-medium">Amount:</span> ₹{b.amount}
            </p>

            {/* Seats */}
            <p className="text-gray-700 text-sm mb-1">
              <span className="font-medium">Seats:</span> {b.seats.join(", ")}
            </p>

            {/* Date */}
            <p className="text-gray-700 text-sm mb-3">
              <span className="font-medium">Booked On:</span>{" "}
              {new Date(b.createdAt).toLocaleDateString()}
            </p>

            {/* QR Button */}
            <button
              onClick={() => router.push(`/booking/${b._id}`)}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-all"
            >
              View QR Code
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
