"use client";
import { useGetEventByIdQuery } from "@/app/redux/EventApi/eventApi";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import SeatSelector from "@/components/seat-selecter";
import { useAppSelector } from "@/app/redux/hooks";
import {
  useReserveSeatsMutation,
  useCreatePaymentIntentMutation,
} from "@/app/redux/bookingApi/bookingApi";
import { useState } from "react";
import { ISeat } from "@/app/redux/types/events";

import { loadStripe } from "@stripe/stripe-js";
import { useAddbookingMutation } from "@/app/redux/bookingApi/bookingApi";

export default function Page() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [loading , setLoading] = useState(false);
  const params = useParams();
  const id = params.id as string;
  const { data } = useGetEventByIdQuery(id);
  const router = useRouter();
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const userId = user?._id as string;

  const [reserveSeats] = useReserveSeatsMutation();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [addbooking] = useAddbookingMutation();

  const selectedSeatObjects: ISeat[] = data?.data?.seatStatus.filter(
    (seat: ISeat) => selectedSeats.includes(seat.seatNumber)
  );

  const subTotal =
    selectedSeatObjects?.reduce((sum, seat) => sum + seat.price, 0) || 0;
  const fess = Math.round(subTotal * 0.1);
  const total = subTotal + fess;

  const handleContinue = async () => {
    if (!isAuthenticated) return alert("Please login first");

    try {
      // 1️⃣ Reserve selected seats
      setLoading(true)
      const reserveRes = await reserveSeats({
        eventId: id,
        seatIds: selectedSeats,
        userId,
      }).unwrap();

      if (!reserveRes.success) {
        alert("Failed to reserve seats");
        return;
      }

      // 2️⃣ Create Stripe Checkout Session (NEW)
      const checkoutRes = await createPaymentIntent({
        amount: total,
        eventId: id,
        seatIds: selectedSeats,
        userId,
      }).unwrap();

      console.log("before payment intent " ,checkoutRes);

      if (!checkoutRes?.data.url) {
        alert("Failed to create payment session");
        return;
      }


      

      // 3️⃣ Redirect user to Stripe Checkout (NEW Flow)
      window.location.href = checkoutRes?.data.url;
    } catch (err) {
      console.log("Error:", err);
      alert("Something went wrong. Try again!");
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {" "}
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary hover:text-accent mb-8 transition-colors font-medium"
        >
          {" "}
          <ArrowLeft className="w-5 h-5" />
          Back to Events{" "}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Info */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <img
                src={data?.data?.image.url || "/placeholder.svg"}
                alt={data?.data?.title}
                className="w-full rounded-lg object-cover h-96 mb-8"
              />
              <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
                {data?.data?.title}
              </h1>

              <div className="grid grid-cols-2 gap-4 mb-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>
                    {new Date(data?.data?.startAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>
                    {new Date(data?.data?.startAt).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{data?.data?.venue.name}</span>
                </div>
              </div>

              <p className="text-foreground leading-relaxed mb-8">
                {data?.data?.description}
              </p>

              {/* Availability Info */}
              <div className="bg-secondary rounded-lg p-4 mb-8">
                <p className="text-secondary-foreground font-medium">
                  {data?.data?.availableSeats} of {data?.data?.totalSeats} seats
                  available
                </p>
              </div>
            </div>

            {/* Seat Selector */}
            <div className="bg-card rounded-lg p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Select Your Seats
              </h2> 
              <SeatSelector
                selectedSeats={selectedSeats}
                seats={data?.data?.seatStatus}
                onSelectSeat={(seatNumber) => {
                  setSelectedSeats((prev) =>
                    prev.includes(seatNumber)
                      ? prev.filter((s) => s !== seatNumber)
                      : [...prev, seatNumber]
                  );
                }}  
              />
              <div className="flex gap-4 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-card border-2 border-border rounded"></div>
                  <span className="text-muted-foreground">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded"></div>
                  <span className="text-muted-foreground">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted rounded"></div>
                  <span className="text-muted-foreground">Sold</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary / Booking Button */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-foreground">
                  <span>{data?.data?.title}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{new Date(data?.data?.startAt).toDateString()}</span>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="flex justify-between text-foreground">
                    <span>Selected Seats:</span>
                    <span className="font-semibold">
                      {selectedSeats.length}
                    </span>
                  </div>
                  {selectedSeats.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                      {selectedSeats.join(", ")}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="text-foreground">{subTotal}</span>
                </div>
                <div className="flex justify-between mb-4 pb-4 border-b border-border">
                  <span className="text-muted-foreground">Fees:</span>
                  <span className="text-foreground">{fess}</span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-foreground">Total:</span>
                  <span className="text-primary">{total}</span>
                </div>
              </div>

            <button
                disabled={selectedSeats.length === 0 || loading}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                onClick={handleContinue}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Continue to Checkout"
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
