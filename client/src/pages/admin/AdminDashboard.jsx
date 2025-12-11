// src/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalPayments: 0,
    verifiedPayments: 0,
    pendingPayments: 0,
  });

  // TODO: backend se real stats lao. Abhi dummy set:
  useEffect(() => {
    // Example: future fetch: /api/admin/stats
    setStats({
      totalEvents: 5,
      totalPayments: 120,
      verifiedPayments: 90,
      pendingPayments: 25,
    });
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Welcome to FundEase Admin Dashboard
      </h2>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total Events" value={stats.totalEvents} />
        <StatCard label="Total Payments" value={stats.totalPayments} />
        <StatCard
          label="Verified Payments"
          value={stats.verifiedPayments}
          accent="green"
        />
        <StatCard
          label="Pending Payments"
          value={stats.pendingPayments}
          accent="yellow"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white rounded-2xl shadow-sm p-4 text-sm text-gray-700">
          <h3 className="font-semibold mb-2">Recent Events (demo)</h3>
          <ul className="space-y-1 text-xs">
            <li>• Tech Fest 2025 - Ongoing</li>
            <li>• Cultural Night - Upcoming</li>
            <li>• Sports Week - Upcoming</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 text-sm text-gray-700">
          <h3 className="font-semibold mb-2">Quick Tips</h3>
          <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
            <li>Create events with correct UPI ID.</li>
            <li>Check pending payments daily.</li>
            <li>Export data before final submission to accounts.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }) {
  const color =
    accent === "green"
      ? "text-emerald-600 bg-emerald-50"
      : accent === "yellow"
      ? "text-amber-600 bg-amber-50"
      : "text-primary bg-primary/5";

  return (
    <div className={`rounded-2xl bg-white shadow-sm p-4 text-sm ${color}`}>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
