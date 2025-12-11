// src/organizer/OrganizerLayout.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import OrganizerSidebar from "./OrganizerSidebar";
import OrganizerTopbar from "./OrganizerTopbar";

export default function OrganizerLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Auth check
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("fundeaseOrganizer"));
    if (!user) navigate("/auth");
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex bg-secondary">
      <OrganizerSidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col">
        <OrganizerTopbar setOpen={setOpen} />
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
