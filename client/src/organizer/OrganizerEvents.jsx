// src/organizer/OrganizerEvents.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export default function OrganizerEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("fundeaseOrganizer"));

  useEffect(() => {
    if (!user?._id) return;

    const controller = new AbortController();

    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `${API}/events/organizer/${user._id}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

        const data = await res.json();
        setEvents(data || []);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error(err);
        setError(err.message);
      }
    };

    fetchEvents();
    return () => controller.abort();
  }, [user?._id]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">My Events</h2>
        <Link
          to="/organizer/events/create"
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm"
        >
          + Create Event
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        {error && (
          <p className="text-xs text-red-500 mb-2">
            {error}
          </p>
        )}

        {events.length === 0 ? (
          <p className="text-gray-400 text-sm">No events created yet.</p>
        ) : (
          <ul className="space-y-3 text-sm">
            {events.map((ev) => (
              <li
                key={ev._id}
                className="border-b pb-2 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{ev.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(ev.date).toLocaleDateString()}
                  </p>
                </div>

                <Link
                  to={`/organizer/events/${ev._id}/payments`}
                  className="text-primary text-xs underline"
                >
                  View Payments
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
