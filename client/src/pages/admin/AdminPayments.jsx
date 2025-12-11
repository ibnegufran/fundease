// src/admin/AdminPayments.jsx
import { useEffect, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        // Example: you can make /api/payments?all=true or dedicated admin route
        const res = await fetch(`${API_BASE_URL}/payments/all`); // adjust backend route
        const data = await res.json();
        setPayments(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadPayments();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">All Payments</h2>

      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="min-w-full text-left text-xs">
          <thead className="border-b bg-secondary/60 text-gray-600">
            <tr>
              <th className="py-2 px-3">Student</th>
              <th className="py-2 px-3 hidden md:table-cell">Event</th>
              <th className="py-2 px-3">Amount</th>
              <th className="py-2 px-3 hidden lg:table-cell">UPI ID</th>
              <th className="py-2 px-3 hidden lg:table-cell">UTR</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td className="py-4 px-3 text-center text-gray-400" colSpan={7}>
                  No payments found.
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p._id} className="border-b last:border-0">
                  <td className="py-2 px-3">
                    <p className="font-semibold text-gray-800">
                      {p.studentName}
                    </p>
                    <p className="text-[11px] text-gray-500">{p.className}</p>
                  </td>
                  <td className="py-2 px-3 hidden md:table-cell text-gray-600">
                    {p.event?.name || "-"}
                  </td>
                  <td className="py-2 px-3 text-gray-800">₹{p.amount}</td>
                  <td className="py-2 px-3 hidden lg:table-cell text-[11px] text-gray-500">
                    {p.upiId || "-"}
                  </td>
                  <td className="py-2 px-3 hidden lg:table-cell text-[11px] text-gray-500">
                    {p.utr}
                  </td>
                  <td className="py-2 px-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="py-2 px-3 text-right space-x-2">
                    <button className="text-[11px] text-emerald-600 hover:underline">
                      Verify
                    </button>
                    <button className="text-[11px] text-red-500 hover:underline">
                      Reject
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
