// src/organizer/OrganizerCreateEvent.jsx
import { useState } from "react";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export default function OrganizerCreateEvent() {
  const user = JSON.parse(localStorage.getItem("fundeaseOrganizer"));

  const [form, setForm] = useState({
    name: "",
    date: "",
    venue: "",
    category: "",
    description: "",
    minAmount: "",
    requiredAmount: "",
    upiId: user?.upiId || "",   // prefill from organizer profile
  });

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.date || !form.venue || !form.minAmount) {
      toast.success("Please fill Event Name, Date, Venue and Minimum Amount.");
      return;
    }

    try {
      const res = await fetch(`${API}/events/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          date: form.date,
          venue: form.venue,
          category: form.category,
          description: form.description,
          defaultAmount: Number(form.minAmount),
          requiredAmount: form.requiredAmount
            ? Number(form.requiredAmount)
            : undefined,
         organizerUpiId: form.upiId,        // event UPI (can override organizer)
          organizerId: user._id,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create event");
      }

      toast.success("Event created!");
      // optional: form reset
      setForm({
        name: "",
        date: "",
        venue: "",
        category: "",
        description: "",
        minAmount: "",
        requiredAmount: "",
        upiId: user?.upiId || "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <form
      className="bg-white p-5 rounded-xl shadow space-y-4 max-w-full"
      onSubmit={submit}
    >
      <h2 className="text-lg font-semibold mb-2">Create New Event</h2>

      {/* Event basic info */}
      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="inp"
          name="name"
          placeholder="Event Name"
          value={form.name}
          onChange={handle}
        />
        <input
          className="inp"
          name="date"
          type="date"
          value={form.date}
          onChange={handle}
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="inp"
          name="venue"
          placeholder="Venue"
          value={form.venue}
          onChange={handle}
        />
        <input
          className="inp"
          name="category"
          placeholder="Category (e.g. Technical, Cultural)"
          value={form.category}
          onChange={handle}
        />
      </div>

      {/* Amounts */}
      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="inp"
          name="minAmount"
          type="number"
          placeholder="Minimum Amount (₹)"
          value={form.minAmount}
          onChange={handle}
        />
        <input
          className="inp"
          name="requiredAmount"
          type="number"
          placeholder="Required Amount (₹) - optional"
          value={form.requiredAmount}
          onChange={handle}
        />
      </div>

      {/* UPI + description */}
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="text-xs text-gray-600 mb-1 block">
            UPI ID for this event
          </label>
          <input
            className="inp"
            name="upiId"
            placeholder="yourupi@bank"
            value={form.upiId}
            onChange={handle}
          />
          <p className="mt-1 text-[11px] text-gray-500">
            By default your profile UPI is used. Change only if this event uses
            a different UPI ID.
          </p>
        </div>

        <div>
          <label className="text-xs text-gray-600 mb-1 block">
            Description (optional)
          </label>
          <textarea
            name="description"
            rows="3"
            className="w-full bg-secondary px-3 py-2 rounded-lg text-sm outline-none border border-transparent focus:border-primary"
            placeholder="Short details about the event"
            value={form.description}
            onChange={handle}
          />
        </div>
      </div>

      <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:opacity-90">
        Create Event
      </button>
    </form>
  );
}
