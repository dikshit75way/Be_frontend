"use client";

import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation';
import { useGetEventByIdQuery } from '../redux/EventApi/eventApi';
export default function OrderSummary() {
    const router = useRouter();
    const params = useSearchParams()
    const id = params.get("eventId") as string ;
    const fess = params.get("fess");
    const total = params.get("total")

    const {data} = useGetEventByIdQuery(id)
  return (
   
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-foreground mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-foreground">
                  <span className="font-semibold">{data?.data?.title}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  { new Date(data?.data?.startAt).toLocaleDateString()} at {new Date(data?.data?.startAt).toLocaleTimeString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  {data?.data?.venue}
                </div>
              </div>

              <div className="space-y-2 mb-6 pb-6 border-b border-border">
                {/* <div className="flex justify-between text-foreground">
                  <span>2 Tickets x ${event.price}</span>
                  <span>${event.price * 2}</span>
                </div> */}
                <div className="flex justify-between text-foreground">
                  <span>Fees & Tax</span>
                  <span>${fess}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-primary mb-6">
                <span>Total</span>
                <span>${total}</span>
              </div>

              <div className="text-xs text-muted-foreground">
                ✓ Secure payment processing
              </div>
            </div>
          </div>
  )
}
