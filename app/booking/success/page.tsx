"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const sessionId = params.get("session_id");

  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          router.push("/booking");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white p-10 rounded-xl shadow-xl max-w-md w-full text-center animate-fade-in">
        
        <div className="flex justify-center mb-4">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-5xl">✅</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">
          Your booking has been confirmed.  
        </p>

        {sessionId && (
          <p className="text-gray-400 text-sm mt-2">Session ID: {sessionId}</p>
        )}

        <p className="mt-5 text-gray-700">
          Redirecting to your bookings in <strong>{countdown}</strong> seconds...
        </p>

        <button
          onClick={() => router.push("/booking")}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Go to My Bookings Now
        </button>
      </div>
    </div>
  );
}
