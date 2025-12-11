// src/components/EventDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PaymentForm from "./PaymentForm";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const STATUS_FILTERS = ["All", "Verified", "Pending", "Rejected"];

export default function EventDetail() {
  const { eventId } = useParams(); // route: /events/:eventId

  const [event, setEvent] = useState(null);
  const [payments, setPayments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [error, setError] = useState("");

  // Event fetch
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoadingEvent(true);
        const res = await fetch(`${API_BASE_URL}/events/${eventId}`);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Failed to load event");
        }
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error("fetchEvent error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoadingEvent(false);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  // Payments fetch
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoadingPayments(true);
        const res = await fetch(`${API_BASE_URL}/payments/event/${eventId}`);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Failed to load payments");
        }
        const data = await res.json();
        setPayments(data);
      } catch (err) {
        console.error("fetchPayments error:", err);
        // payment error show kam priority, event error pehle
      } finally {
        setLoadingPayments(false);
      }
    };

    if (eventId) fetchPayments();
  }, [eventId]);

  const filteredPayments = payments.filter((p) => {
    const matchStatus =
      statusFilter === "All" ? true : p.status === statusFilter;
    const searchText = search.toLowerCase();
    const matchSearch =
      (p.studentName || "").toLowerCase().includes(searchText) ||
      (p.rollNo || "").toLowerCase().includes(searchText) ||
      (p.note || "").toLowerCase().includes(searchText); // note me UPI name
    return matchStatus && matchSearch;
  });

  const totalCollected = payments
    .filter((p) => p.status === "Verified")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loadingEvent) {
    return (
      <main className="bg-secondary min-h-screen py-16 px-4">
        <p className="text-center text-gray-500 text-sm">Loading event...</p>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="bg-secondary min-h-screen py-16 px-4">
        <p className="text-center text-red-500 text-sm">
          {error || "Event not found"}
        </p>
      </main>
    );
  }

  return (
    <main className="bg-secondary min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* TOP HEADER */}
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <button
              onClick={() => window.history.back()}
              className="text-xs text-gray-500 mb-2 hover:text-primary"
            >
              ← Back to Events
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              {event.name}
            </h1>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl">
              {event.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-gray-500">
              <span>📅 {formatDate(event.date)}</span>
              <span>📍 {event.venue}</span>
              <span>🎯 {event.category}</span>
              <span
                className={`px-2 py-1 rounded-full font-medium ${
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
          </div>

          {/* small summary card */}
          <div className="bg-white rounded-2xl shadow-sm px-5 py-3 text-sm text-gray-700 w-full md:w-64">
            <p className="font-semibold text-primary">Payment Summary</p>
            <div className="mt-2 flex justify-between">
              <span>Verified payments</span>
              <span className="font-semibold">
                {payments.filter((p) => p.status === "Verified").length}
              </span>
            </div>
            <div className="mt-1 flex justify-between">
              <span>Pending payments</span>
              <span className="font-semibold">
                {payments.filter((p) => p.status === "Pending").length}
              </span>
            </div>
            <div className="mt-1 flex justify-between">
              <span>Total collected</span>
              <span className="font-semibold">₹{totalCollected}</span>
            </div>
          </div>
        </header>

        {/* MAIN GRID: payments + form */}
        <section className="grid gap-6 md:grid-cols-[3fr,2fr]">
          {/* LEFT: PAYMENT LIST */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Payment Records
              </h2>

              <div className="flex flex-wrap gap-2">
                {STATUS_FILTERS.map((status) => {
                  const active = statusFilter === status;
                  return (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1 rounded-full text-[11px] border transition ${
                        active
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* search bar */}
            <div className="mb-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by student, roll no, or UPI name..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* table */}
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full text-left text-xs">
                <thead>
                  <tr className="border-b text-gray-500">
                    <th className="py-2 pr-4">Student</th>
                    <th className="py-2 pr-4 hidden sm:table-cell">Class</th>
                    <th className="py-2 pr-4">Amount</th>
                    <th className="py-2 pr-4 hidden md:table-cell">
                      UPI Name (note)
                    </th>
                    <th className="py-2 pr-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingPayments ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-4 text-center text-gray-400"
                      >
                        Loading payments...
                      </td>
                    </tr>
                  ) : filteredPayments.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-4 text-center text-gray-400"
                      >
                        No payments found for this filter.
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map((p) => (
                      <tr key={p._id} className="border-b last:border-0">
                        <td className="py-2 pr-4">
                          <p className="font-semibold text-gray-800">
                            {p.studentName}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            {p.rollNo}
                          </p>
                        </td>
                        <td className="py-2 pr-4 hidden sm:table-cell text-gray-600">
                          {p.className}
                        </td>
                        <td className="py-2 pr-4 text-gray-800">
                          ₹{p.amount}
                        </td>
                        <td className="py-2 pr-4 hidden md:table-cell text-gray-500">
                          {p.note || "-"}
                        </td>
                        <td className="py-2 pr-2">
                          <StatusBadge status={p.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT: PAYMENT FORM */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {event.status === "Closed"
                ? "Payments Closed"
                : "Make a Payment"}
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              {event.status === "Closed"
                ? "This event is closed. You can only view existing payments and their status."
                : "Fill your correct details and UPI name. Admin will verify it and update the status."}
            </p>

            {event.status !== "Closed" && (
              <PaymentForm
                organizerUpiId={event.organizerUpiId}
                defaultAmount={event.defaultAmount}
                eventName={event.name}
                eventId={event._id}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

/* ------- small components -------- */

function StatusBadge({ status }) {
  const base =
    "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium";
  if (status === "Verified") {
    return (
      <span className={`${base} bg-green-100 text-green-700`}>Verified</span>
    );
  }
  if (status === "Pending") {
    return (
      <span className={`${base} bg-yellow-100 text-yellow-700`}>Pending</span>
    );
  }
  return (
    <span className={`${base} bg-red-100 text-red-600`}>Rejected</span>
  );
}
