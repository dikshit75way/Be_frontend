"use client";

import { Search } from "lucide-react";
import { useGetEventsQuery } from "./redux/EventApi/eventApi";
import EventCard from "@/components/EventCard";
import { IEvent } from "./redux/types/events";

export default function Home() {
  const { data, isLoading } = useGetEventsQuery();
  console.log("debbugin the data..", data);

  return (
    <div className="flex flex-col p-12 justify-center w-screen">
      <div className="flex flex-col justify-start p-5 gap-6">
        <h1 className="text-5xl font-extrabold font-serif">
          Discover Amazing Events
        </h1>

        <p className="text-md text-gray-500">
          Find and book tickets for concerts, conferences, and workshops
          happening near you
        </p>

        {/* Input with Search Icon */}
        <div className="relative w-full">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

          <input
            type="text"
            placeholder="Search events by name or location..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 
            rounded-lg placeholder-gray-500 
            focus:outline-none focus:ring-1 focus:ring-indigo-800  
            focus:border-indigo-900"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((event :IEvent) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
