import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home/index.jsx'
import EventsPage from './pages/events/index.jsx'
import AboutPage from './pages/about/index.jsx'
import OrganizerAuth from './pages/auth/index.jsx'
import EventDetail from './pages/events/EventDetail.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminEvents from './pages/admin/AdminEvents.jsx'
import AdminPayments from './pages/admin/AdminPayments.jsx'
import OrganizerLayout from './organizer/OrganizerLayout.jsx'
import OrganizerDashboard from './organizer/OrganizerDashboard.jsx'
import OrganizerEvents from './organizer/OrganizerEvents.jsx'
import OrganizerCreateEvent from './organizer/OrganizerCreateEvent.jsx'
import OrganizerEventPayments from './organizer/OrganizerEventPayments.jsx'
import OrganizerProfile from './organizer/OrganizerProfile.jsx'



// Admin pages


const router = createBrowserRouter([
  
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "events", element: <EventsPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "auth", element: <OrganizerAuth /> },
      {
  path: "/events/:eventId",
  element: <EventDetail />,
}
    ],
  },

  // ================= ADMIN ROUTES =================
  {
    path: "/admin",
    element: <AdminLayout />, // layout wrapper (sidebar + navbar)
    children: [
           // /admin/login
      { path: "dashboard", element: <AdminDashboard /> }, // /admin/dashboard
      { path: "events", element: <AdminEvents /> }, 
       
      { path: "payments", element: <AdminPayments /> },   // /admin/payments
    ],
  },
  {
  path: "/organizer",
  element: <OrganizerLayout />,
  children: [
    { path: "dashboard", element: <OrganizerDashboard /> },
    { path: "events", element: <OrganizerEvents /> },
    { path: "events/create", element: <OrganizerCreateEvent /> },
    { path: "events/:id/payments", element: <OrganizerEventPayments /> },
    { path: "profile", element: <OrganizerProfile /> }
  ],
}

]);

export default router;




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
