// src/organizer/OrganizerTopbar.jsx
import { useLocation } from "react-router-dom";

export default function OrganizerTopbar({ setOpen }) {
  const location = useLocation();

  const title = {
    "/organizer/dashboard": "Dashboard",
    "/organizer/events": "My Events",
    "/organizer/events/create": "Create Event",
    "/organizer/profile": "Profile",
  }[location.pathname] || "Organizer";

  return (
    <header className="h-16 bg-white  flex items-center px-4 gap-4">
      <button
        onClick={() => setOpen((p) => !p)}
        className="md:hidden p-2 rounded-lg hover:bg-secondary"
      >
        ☰
      </button>
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
    </header>
  );
}
