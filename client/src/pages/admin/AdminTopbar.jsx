// src/admin/AdminTopbar.jsx
import { useLocation } from "react-router-dom";

export default function AdminTopbar({ setSidebarOpen }) {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.startsWith("/admin/events")) return "Events";
    if (location.pathname.startsWith("/admin/payments")) return "Payments";
    if (location.pathname.startsWith("/admin/dashboard")) return "Dashboard";
    if (location.pathname.startsWith("/admin/login")) return "Admin Login";
    return "Admin";
  };

  return (
    <header className="h-16 flex items-center justify-between bg-white border-b border-gray-100 px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded-lg hover:bg-secondary"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          ☰
        </button>
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          {getTitle()}
        </h1>
      </div>

      <div className="text-xs md:text-sm text-gray-500">
        FundEase • Admin Panel
      </div>
    </header>
  );
}
