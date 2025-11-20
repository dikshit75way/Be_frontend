"use client";

import { CheckCircle, Download, Mail } from "lucide-react";
import { useParams } from "next/navigation";
import { useFetchSingleBookingQuery } from "@/app/redux/bookingApi/bookingApi";
import { useFetchUserQuery } from "@/app/redux/authApi/authApi";
import { useRouter } from "next/navigation";



export default function ConfirmationPage({
  
}) {
  const params = useParams();
  const bookingId = params.id as string;
  console.log("bookingId", bookingId);
  const { data, isLoading } = useFetchSingleBookingQuery(bookingId);
  const { data: user } = useFetchUserQuery(data?.data?.userId);
  const router = useRouter();
  console.log("fetching the user from backend", user);
  console.log("single booking data", data);
  const qrCode = data?.data?.qrCode;
  const orderId = data?.data?._id ? `ORD-${data.data._id}` : "N/A";
  const reference = data?.data?.eventId
    ? `EVT-${data.data.eventId.slice(-6).toUpperCase()}`
    : "N/A";
    
  const handleHome= ()=>{
   router.push("/booking");
  }
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-primary/10 rounded-full p-4">
              <CheckCircle className="w-16 h-16 text-primary" />
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Your tickets have been successfully booked
            </p>
            <p className="text-base text-muted-foreground">
              Order ID:{" "}
              <span className="font-semibold text-foreground">{orderId}</span>
            </p>
          </div>

          {/* Ticket Details Card */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <div className="space-y-6">
              {/* Ticket Info */}
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  Ticket Details
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-foreground">Quantity</span>
                    <span className="font-semibold text-foreground">
                      {data?.data?.seats.length} tickets
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Seat Numbers</span>
                    <span className="font-semibold text-foreground">
                      {data?.data?.seats.join(",")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Booking Reference</span>
                    <span className="font-semibold text-primary">
                      {reference}-
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  Attendee Information
                </h2>
                <div className="space-y-2">
                  <p className="text-foreground">{user?.data?.name}</p>
                  <p className="text-foreground">{user?.data?.email}</p>
                  <p className="text-foreground">{user?.phone}</p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  Payment Method
                </h2>
                <p className="text-foreground">
                  Card ending in <span className="font-semibold">upi</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 mb-8 text-center">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Your QR Code
            </h2>

            <div className="bg-background p-6 rounded-lg inline-block mb-4">
              {qrCode ? (
                <img
                  src={`data:image/png;base64,${qrCode}`}
                  alt="QR Code"
                  className="w-40 h-40 rounded"
                />
              ) : (
                <div className="w-40 h-40 bg-foreground/10 rounded flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">QR Code</span>
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              Scan this code at the venue for entry
            </p>
          </div>

          {/* Back to Home */}
          <button
            onClick={handleHome}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-all"
          >
            Back to Home
          </button>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-secondary rounded-lg text-center">
            <p className="text-sm text-secondary-foreground">
              A confirmation email has been sent to{" "}
              <span className="font-semibold">{user?.data?.email}</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
