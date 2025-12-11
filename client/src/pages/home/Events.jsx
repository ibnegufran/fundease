// src/components/Events.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

function formatDate(d) {
  if (!d) return "-";
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/events`);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Failed to load events");
        }
        const data = await res.json();
        if (mounted) setEvents(data);
      } catch (err) {
        console.error("fetch events error:", err);
        if (mounted) setError(err.message || "Something went wrong");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchEvents();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-16 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Events on FundEase
            </h2>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Handle multiple college events, all under one digital fund
              management platform.
            </p>
          </div>

          <Link
            to="/events"
            className="mt-3 md:mt-0 px-4 py-2 bg-primary text-white text-sm rounded-lg shadow hover:opacity-90"
          >
            View All Events
          </Link>
        </div>

        <div className="mt-8">
          {loading ? (
            <p className="text-center text-gray-500 py-8">Loading events...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-8">{error}</p>
          ) : events.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No events available.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {events.map((event,i) => (
                i % 3 === 0 ? (
                  <div
                  key={event._id}
                  className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {event.name}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          event.status === "Ongoing"
                            ? "bg-green-100 text-green-700"
                            : event.status === "Upcoming"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {event.status || "Unknown"}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-gray-600">
                      {event.description || event.desc || "No description provided."}
                    </p>

                    <div className="mt-3 text-[13px] text-gray-500 flex flex-wrap gap-3">
                      <span>📅 {formatDate(event.date)}</span>
                      {event.venue && <span>📍 {event.venue}</span>}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="text-xs text-gray-500">
                      <p className="font-semibold text-gray-700">
                        Starting from ₹{event.defaultAmount ?? "-"}
                      </p>
                      <p>Per registration</p>
                    </div>

                    <Link
                      to={`/events/${event._id}`}
                      className="mt-0 text-sm text-primary font-semibold hover:underline"
                    >
                      View payment details
                    </Link>
                  </div>
                </div>) : null
                
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
