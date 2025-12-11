import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const STATUS_TABS = ["All", "Ongoing", "Upcoming", "Closed"];

const EventsPage = () => {
  const [events, setEvents] = useState([]);        // 👈 backend se aayenge
  const [activeStatus, setActiveStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 page load par events fetch karo
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE_URL}/events`);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Failed to fetch events");
        }

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("fetch events error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchStatus =
      activeStatus === "All" ? true : event.status === activeStatus;

    const name = (event.name || "").toLowerCase();
    const category = (event.category || "").toLowerCase();
    const searchText = search.toLowerCase();

    const matchSearch =
      name.includes(searchText) || category.includes(searchText);

    return matchStatus && matchSearch;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr; // agar string hi store hai to as-it-is dikhao
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="bg-secondary min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              Events on FundEase
            </h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base max-w-xl">
              Browse college events and submit your payments safely through
              FundEase. Use filters to quickly find your event.
            </p>
          </div>

          {/* Search box */}
          <div className="w-full md:w-72">
            <div className="relative">
              <input
                type="text"
                placeholder="Search event or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="absolute right-3 top-2.5 text-gray-400 text-sm">
                🔍
              </span>
            </div>
          </div>
        </header>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
          {STATUS_TABS.map((status) => {
            const isActive = activeStatus === status;
            return (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`px-4 py-1.5 rounded-full text-xs md:text-sm border transition 
                  ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                  }`}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* Loading / Error states */}
        {loading && (
          <p className="text-center text-gray-500 text-sm mt-10">
            Loading events...
          </p>
        )}

        {error && !loading && (
          <p className="text-center text-red-500 text-sm mt-10">
            {error}
          </p>
        )}

        {/* Events Grid */}
        {!loading && !error && (
          <>
            {filteredEvents.length === 0 ? (
              <p className="text-center text-gray-500 text-sm mt-10">
                No events found. Try a different filter or search.
              </p>
            ) : (
              <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map((event) => (
                  <article
                    key={event._id} // 👈 MongoDB id use karo
                    className="bg-white rounded-2xl shadow-sm p-5 flex flex-col justify-between"
                  >
                    {/* Top row: name + badge */}
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="font-semibold text-base md:text-lg text-gray-800">
                          {event.name}
                        </h2>
                        <span
                          className={`text-[11px] px-2 py-1 rounded-full font-medium
                            ${
                              event.status === "Ongoing"
                                ? "bg-green-100 text-green-700"
                                : event.status === "Upcoming"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-200 text-gray-700"
                            }`}
                        >
                          {event.status}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-gray-500">
                        {event.category}
                      </p>

                      {/* Date & Venue */}
                      <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-gray-500">
                        <span>📅 {formatDate(event.date)}</span>
                        <span>📍 {event.venue}</span>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                        {event.description}
                      </p>
                    </div>

                    {/* Bottom row: amount + button */}
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="text-xs text-gray-500">
                        <p className="font-semibold text-gray-700">
                          Starting from ₹
                          {event.defaultAmount ?? event.minAmount ?? "-"}
                        </p>
                        <p>Per registration</p>
                      </div>

                      <Link
                        to={`/events/${event._id}`} // 👈 ab id-wise detail page
                        className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold shadow cursor-pointer
                          ${
                            event.status === "Closed"
                              ? "bg-gray-200 text-gray-500"
                              : "bg-primary text-white hover:opacity-90"
                          }`}
                      >
                        {event.status === "Closed" ? "View" : "View & Pay"}
                      </Link>
                    </div>
                  </article>
                ))}
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default EventsPage;
