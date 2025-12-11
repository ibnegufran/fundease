// src/admin/AdminSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: "📊" },
  { label: "Events", to: "/admin/events", icon: "🎫" },
  { label: "Payments", to: "/admin/payments", icon: "💰" },
];

export default function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("fundeaseOrganizer");
    navigate("/auth");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static z-30 min-h-screen
          h-full w-64 bg-white shadow-md md:shadow-none
          transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="h-16 flex items-center px-4 border-b border-gray-100">
          <span className="text-xl font-bold text-primary">FundEase Admin</span>
        </div>

        <nav className="mt-4 px-2 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-secondary hover:text-primary"
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            onClick={handleLogout}
            className="w-full text-sm font-semibold rounded-xl border border-red-200 text-red-600 py-2 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
