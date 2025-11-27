"use client";
import { CheckCircle } from "lucide-react";
import { motion, useScroll } from "motion/react";
import { useFetchSingleBookingQuery } from "@/app/redux/bookingApi/bookingApi";
import { useFetchUserQuery } from "@/app/redux/authApi/authApi";
import { useRouter, useParams } from "next/navigation";

export default function ConfirmationPage() {
  const params = useParams();
  const bookingId = params.id as string;

  const router = useRouter();

  const { scrollYProgress } = useScroll();

  const { data, isLoading } = useFetchSingleBookingQuery(bookingId);
  const { data: user } = useFetchUserQuery(data?.data?.userId);

  const qrCode = data?.data?.qrCode;
  const orderId = data?.data?._id ? `ORD-${data.data._id}` : "N/A";
  const reference = data?.data?.eventId
    ? `EVT-${data.data.eventId.slice(-6).toUpperCase()}`
    : "N/A";

  const handleHome = () => router.push("/booking");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left"
      />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">

          {/* Success Icon */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-primary/10 rounded-full p-4">
              <CheckCircle className="w-16 h-16 text-primary" />
            </div>
          </motion.div>

          {/* Confirmation Text */}
          <motion.div
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-4xl font-bold">Booking Confirmed!</h1>
            <p className="text-muted-foreground mt-2">
              Your tickets have been successfully booked.
            </p>

            <p className="mt-2 text-base text-muted-foreground">
              Order ID: <span className="font-semibold">{orderId}</span>
            </p>
          </motion.div>

          {/* Ticket Details */}
          <motion.div
            className="bg-card border border-border rounded-lg p-8 mb-8 shadow-sm"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  Ticket Details
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Quantity</span>
                    <span className="font-semibold">
                      {data?.data?.seats.length} tickets
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Seat Numbers</span>
                    <span className="font-semibold">
                      {data?.data?.seats.join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Booking Reference</span>
                    <span className="font-semibold text-primary">
                      {reference}
                    </span>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="border-t border-border pt-6">
                <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  Attendee Information
                </h2>
                <div className="space-y-1">
                  <p>{user?.data?.name}</p>
                  <p>{user?.data?.email}</p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="border-t border-border pt-6">
                <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  Payment Method
                </h2>
                <p>
                  Paid via <span className="font-semibold">UPI</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* QR Code Section */}
          <motion.div
            className="bg-card border border-border rounded-lg p-8 mb-8 text-center shadow-sm"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h2 className="text-lg font-bold mb-4">Your QR Code</h2>

            <div className="bg-background p-6 rounded-lg inline-block mb-4">
              {qrCode ? (
                <img
                  src={`data:image/png;base64,${qrCode}`}
                  alt="QR Code"
                  className="w-40 h-40"
                />
              ) : (
                <div className="w-40 h-40 bg-muted rounded flex items-center justify-center">
                  <span className="text-muted-foreground">QR Code</span>
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              Scan this at the venue for entry.
            </p>
          </motion.div>

          {/* Back Button */}
          <motion.button
            onClick={handleHome}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Back to My Bookings
          </motion.button>
        </div>
      </main>
    </motion.div>
  );
}
