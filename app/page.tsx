"use client";

import { Search } from "lucide-react";
import { useGetEventsQuery } from "./redux/EventApi/eventApi";
import EventCard from "@/components/EventCard";
import { IEvent } from "./redux/types/events";

export default function Home() {
  const { data, isLoading } = useGetEventsQuery();
  console.log("debugging the data..", data);

  return (
    <div
      className="min-h-screen w-full 
      bg-gradient-to-b 
      from-[#E8F3FF] 
      via-white/90 
      to-white 
      flex flex-col items-center p-12"
    >
      {/* HERO SECTION */}
      <div className="w-full max-w-4xl flex flex-col items-center mt-20 p-5 gap-4">
        <h1 className="text-5xl font-extrabold font-serif text-center gradient-text">
          Discover Amazing Events
        </h1>

        <p className="text-md text-gray-500 text-center max-w-2xl">
          Find and book tickets for concerts, conferences, and workshops
          happening near you.
        </p>

        {/* Search Input and button */}
        <div className="flex items-center justify-center w-full gap-4 mt-4">
  <div className="relative flex-1">
    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

    <input
      type="text"
      placeholder="Search events by name or location..."
      className="w-full pl-10 pr-4 py-2 bg-white/70 backdrop-blur-sm 
      border border-gray-200 shadow-sm 
      rounded-lg placeholder-gray-500 
      focus:outline-none focus:ring-1 focus:ring-indigo-800  
      focus:border-indigo-900"
    />
  </div>
  
  <button className="w-1/5 bg-gradient-to-br from-primary to-accent rounded-lg text-lg h-10 text-white font-bold">
    Search Event
  </button>
</div>
      </div>

      {/* EVENTS GRID */}
      <div className="w-full max-w-6xl mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((event: IEvent) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
