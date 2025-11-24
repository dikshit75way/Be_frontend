"use client";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">Payment Successful 🎉</h1>
      <p>Your booking is confirmed.</p>
      <p className="mt-4 text-gray-500">Session ID: {sessionId}</p>
    </div>
  );
}
