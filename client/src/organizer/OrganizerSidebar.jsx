// src/organizer/OrganizerSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";

const items = [
  { to: "/organizer/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/organizer/events", label: "My Events", icon: "🎫" },
  { to: "/organizer/events/create", label: "Create Event", icon: "➕" },
  { to: "/organizer/profile", label: "Profile", icon: "👤" },
];

export default function OrganizerSidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("fundeaseOrganizer");
    navigate("/auth");
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
        fixed md:static z-30 min-h-screen bg-white w-64 shadow-md
        transform transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div className="h-16 flex items-center px-4 border-b border-gray-200">
          <h1 className="font-bold text-primary text-xl">Organizer</h1>
        </div>

        <nav className="mt-4 px-3 space-y-1">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
               end={item.to === "/organizer/events"} 
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm
              ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-secondary"
              }`
              }
            >
              <span>{item.icon}</span> {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={logout}
          className="absolute bottom-4 left-4 right-4 py-2 text-sm border border-red-300 text-red-600 rounded-xl hover:bg-red-50"
        >
          Logout
        </button>
      </aside>
    </>
  );
}
