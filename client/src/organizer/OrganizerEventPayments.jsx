// src/organizer/OrganizerEventPayments.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

function formatDateTime(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }) {
  const base = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium";
  if (status === "Verified") return <span className={`${base} bg-green-100 text-green-700`}>Verified</span>;
  if (status === "Pending") return <span className={`${base} bg-yellow-100 text-yellow-700`}>Pending</span>;
  return <span className={`${base} bg-red-100 text-red-700`}>Rejected</span>;
}

export default function OrganizerEventPayments() {
  const { id } = useParams(); // event id
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null); // payment id being updated
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [showOnlyPending, setShowOnlyPending] = useState(false);

  const loadPayments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/payments/event/${id}`);
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || "Failed to load payments");
      }
      const data = await res.json();
      // sort newest first
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPayments(data);
    } catch (err) {
      console.error("loadPayments error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    loadPayments();
  }, [id]);

  // client-side filter with simple debounce-like behavior via useMemo
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return payments.filter((p) => {
      if (showOnlyPending && p.status !== "Pending") return false;
      if (!q) return true;
      return (
        (p.studentName || "").toLowerCase().includes(q) ||
        (p.rollNo || "").toLowerCase().includes(q) ||
        (p.note || "").toLowerCase().includes(q) || // UPI name stored in note
        (p.className || "").toLowerCase().includes(q)
      );
    });
  }, [payments, query, showOnlyPending]);

  const updateStatus = async (pid, newStatus) => {
    const confirmMsg =
      newStatus === "Verified"
        ? "Mark this payment as VERIFIED?"
        : "Mark this payment as REJECTED?";
    if (!window.confirm(confirmMsg)) return;

    try {
      setUpdating(pid);
      // optimistic UI change
      setPayments((prev) => prev.map((p) => (p._id === pid ? { ...p, status: newStatus } : p)));

      const res = await fetch(`${API}/payments/update/${pid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || "Failed to update status");
      }

      // refresh small: update single payment entry from server response if provided,
      // otherwise re-fetch list for consistency
      await loadPayments();
    } catch (err) {
      console.error("updateStatus error:", err);
      alert(err.message || "Could not update status");
      await loadPayments();
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Event Payments</h2>
          <p className="text-xs text-gray-500">Manage and verify student payments for this event.</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, roll no, class or UPI name..."
            className="text-sm px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary w-64"
          />

          <button
            onClick={() => setShowOnlyPending((s) => !s)}
            className={`text-sm px-3 py-2 rounded-lg border ${
              showOnlyPending ? "bg-yellow-50 text-yellow-800 border-yellow-200" : "bg-white text-gray-700 border-gray-200"
            }`}
            title="Toggle show only pending"
          >
            {showOnlyPending ? "Showing: Pending" : "All"}
          </button>

          <button
            onClick={loadPayments}
            className="text-sm px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50"
            title="Refresh"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Content */}
      {/* Content */}
<div className="bg-transparent">
  {loading ? (
    <div className="py-10 text-center text-gray-500">
      Loading payments...
    </div>
  ) : error ? (
    <div className="py-6 text-center text-red-500">{error}</div>
  ) : filtered.length === 0 ? (
    <div className="py-8 text-center text-gray-400">
      No payments found.
    </div>
  ) : (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((p) => (
        <div
          key={p._id}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col justify-between hover:shadow-md transition"
        >
          {/* TOP */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-800 text-base">
                  {p.studentName}
                </p>
                <p className="text-xs text-gray-500">
                  {p.rollNo}
                </p>
              </div>

              <StatusBadge status={p.status} />
            </div>

            {/* DETAILS */}
            <div className="mt-4 space-y-2 text-xs text-gray-600">
              <div>
                <p className="text-[11px] text-gray-500 font-medium">
                  UPI Name
                </p>
                <p className="truncate">{p.note || p.upiId || "-"}</p>
              </div>

              <div>
                <p className="text-[11px] text-gray-500 font-medium">
                  Class
                </p>
                <p>{p.className || "-"}</p>
              </div>

              <div>
                <p className="text-[11px] text-gray-500 font-medium">
                  Paid On
                </p>
                <p>{formatDateTime(p.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="mt-4 pt-4 border-t border-gray-400 flex items-center justify-between">
            <p className="text-lg font-semibold text-primary">
              ₹{p.amount}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(p._id, "Verified")}
                disabled={updating === p._id || p.status === "Verified"}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                  p.status === "Verified"
                    ? "bg-green-50 text-green-700 border border-green-100"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                Verify
              </button>

              <button
                onClick={() => updateStatus(p._id, "Rejected")}
                disabled={updating === p._id || p.status === "Rejected"}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                  p.status === "Rejected"
                    ? "bg-red-50 text-red-700 border border-red-100"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  );
}
