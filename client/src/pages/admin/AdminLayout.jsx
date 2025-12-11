// src/admin/AdminLayout.jsx
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // simple auth check (admin or organizer logged in?)
  useEffect(() => {
    const stored = localStorage.getItem("fundeaseOrganizer");
    if (!stored && location.pathname !== "/admin/login") {
      navigate("/admin/login");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen flex bg-secondary">
      {/* Sidebar */}
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <AdminTopbar setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
