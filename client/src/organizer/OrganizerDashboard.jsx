// src/organizer/OrganizerDashboard.jsx
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_BASE_URL;

export default function OrganizerDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("fundeaseOrganizer"));

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/organizer/stats/${user._id}`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Dashboard fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading || !stats) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-10">
      
      {/* ================= TOP SUMMARY CARDS ================= */}
      <div className="grid gap-4 md:grid-cols-4">
        <DashCard label="Total Events" val={stats.totalEvents} />
        <DashCard label="Total Payments" val={stats.totalPayments} />
        <DashCard label="Verified Payments" val={stats.verifiedPayments} />
        <DashCard label="Total Collected" val={`₹${stats.totalAmount}`} />
      </div>

      {/* ================= PAYMENTS BY CLASS ================= */}
      <Section title="Top Classes by Payments">
        <ListTable
          cols={["Class", "Payments", "Total Amount", "Avg. Amount"]}
          rows={
            stats.paymentsByClass.map((c) => [
              c.className || "Unknown",
              c.count,
              `₹${c.totalAmount}`,
              `₹${c.avgAmount}`,
            ])
          }
        />
      </Section>

      {/* ================= PAYMENTS BY EVENT ================= */}
      <Section title="Payments by Events">
        <ListTable
          cols={["Event", "Payments", "Total Amount"]}
          rows={
            stats.paymentsByEvent.map((e) => [
              e.eventName,
              e.count,
              `₹${e.totalAmount}`,
            ])
          }
        />
      </Section>

      {/* ================= TOP STUDENTS ================= */}
      <Section title="Top Paying Students">
        <ListTable
          cols={["Student", "Payments", "Total Amount"]}
          rows={
            stats.topStudents.map((s) => [
              s.studentName,
              s.count,
              `₹${s.totalAmount}`,
            ])
          }
        />
      </Section>

      {/* ================= RECENT PAYMENTS ================= */}
      <Section title="Recent Payments">
        <ListTable
          cols={["Student", "Class", "Amount", "Event", "Status"]}
          rows={
            stats.recentPayments.map((p) => [
              p.studentName,
              p.className,
              `₹${p.amount}`,
              p.eventName,
              p.status,
            ])
          }
        />
      </Section>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function DashCard({ label, val }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow text-center">
      <p className="text-xs text-gray-600">{label}</p>
      <p className="mt-1 text-2xl font-bold text-primary">{val}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>
      <div className="bg-white rounded-xl shadow p-4">{children}</div>
    </div>
  );
}

function ListTable({ cols, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-xs">
        <thead>
          <tr className="border-b text-gray-500">
            {cols.map((c) => (
              <th key={c} className="py-2 text-left">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={cols.length} className="py-3 text-center text-gray-400">
                No data available
              </td>
            </tr>
          ) : (
            rows.map((r, idx) => (
              <tr key={idx} className="border-b last:border-none">
                {r.map((v, i) => (
                  <td key={i} className="py-2 pr-4 text-gray-700">
                    {v}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
