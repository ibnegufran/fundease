// src/admin/AdminEvents.jsx
import { useEffect, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/events`);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadEvents();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-800">All Events</h2>
        <button className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:opacity-90">
          + Create New Event
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="min-w-full text-left text-xs">
          <thead className="border-b bg-secondary/60 text-gray-600">
            <tr>
              <th className="py-2 px-3">Event</th>
              <th className="py-2 px-3 hidden md:table-cell">Date</th>
              <th className="py-2 px-3 hidden md:table-cell">Venue</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Default Amount</th>
              <th className="py-2 px-3 hidden lg:table-cell">UPI ID</th>
              <th className="py-2 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td className="py-4 px-3 text-center text-gray-400" colSpan={7}>
                  No events found.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event._id} className="border-b last:border-0">
                  <td className="py-2 px-3">
                    <p className="font-semibold text-gray-800">
                      {event.name}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {event.category}
                    </p>
                  </td>
                  <td className="py-2 px-3 hidden md:table-cell text-gray-600">
                    {event.date}
                  </td>
                  <td className="py-2 px-3 hidden md:table-cell text-gray-600">
                    {event.venue}
                  </td>
                  <td className="py-2 px-3">
                    <StatusBadge status={event.status} />
                  </td>
                  <td className="py-2 px-3 text-gray-800">
                    ₹{event.defaultAmount}
                  </td>
                  <td className="py-2 px-3 hidden lg:table-cell text-[11px] font-mono text-gray-500">
                    {event.organizerUpiId}
                  </td>
                  <td className="py-2 px-3 text-right">
                    <button className="text-[11px] text-primary hover:underline mr-2">
                      Edit
                    </button>
                    <button className="text-[11px] text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const base =
    "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium";
  if (status === "Ongoing") {
    return (
      <span className={`${base} bg-green-100 text-green-700`}>Ongoing</span>
    );
  }
  if (status === "Upcoming") {
    return (
      <span className={`${base} bg-yellow-100 text-yellow-700`}>Upcoming</span>
    );
  }
  return (
    <span className={`${base} bg-gray-200 text-gray-700`}>Closed</span>
  );
}
