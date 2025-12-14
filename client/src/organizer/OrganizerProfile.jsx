// src/organizer/OrganizerProfile.jsx
import { useState } from "react";

const API = import.meta.env.VITE_API_BASE_URL;

export default function OrganizerProfile() {
  const user = JSON.parse(localStorage.getItem("fundeaseOrganizer"));

  const [upiId, setUpiId] = useState(user.upiId);

  const save = async () => {
    const res = await fetch(`${API}/organizer/update/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ upiId }),
    });

    if (res.ok) {
      toast.success("Updated!");
      user.upiId = upiId;
      localStorage.setItem("fundeaseOrganizer", JSON.stringify(user));
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow max-w-md">
      <h2 className="font-semibold mb-2">Organizer Profile</h2>

      <label className="text-sm text-gray-600">UPI ID</label>
      <input
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        className="w-full bg-secondary px-3 py-2 rounded-lg text-sm mt-1"
      />

      <button
        className="mt-3 bg-primary text-white w-full py-2 rounded-lg"
        onClick={save}
      >
        Save Changes
      </button>
    </div>
  );
}
