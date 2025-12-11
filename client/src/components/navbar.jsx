// src/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // nav items (order matters)
  const navItems = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Events", to: "/events" },
  ];

  // container ref + refs per item
  const containerRef = useRef(null);
  const linkRefs = useRef(navItems.map(() => null));

  // indicator style state
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });

  // find active index based on current location
  const findActiveIndex = () => {
    const path = location.pathname;
    const idx = navItems.findIndex((it) => {
      // exact match or startsWith for nested routes
      const itemPath = it.to;
      if (itemPath === "/") return path === "/";
      return path === itemPath || path.startsWith(itemPath + "/") || path.startsWith(itemPath + "?");
    });
    return idx === -1 ? 0 : idx;
  };

  // update indicator position
  useEffect(() => {
    const update = () => {
      const idx = findActiveIndex();
      const linkEl = linkRefs.current[idx];
      const containerEl = containerRef.current;
      if (linkEl && containerEl) {
        const linkRect = linkEl.getBoundingClientRect();
        const contRect = containerEl.getBoundingClientRect();

        setIndicator({
          left: linkRect.left - contRect.left,
          width: linkRect.width,
          visible: true,
        });
      } else {
        setIndicator((s) => ({ ...s, visible: false }));
      }
    };

    // initial update and on resize
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // nav link base class
  const navLinkClass = "py-1 block transition font-medium";

  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between w-full h-14">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            FundEase
          </Link>

          {/* Desktop Menu + indicator container */}
          <div className="hidden md:flex items-center flex-1 mx-6 relative justify-end" ref={containerRef}>
            <div className="flex items-center gap-12 text-sm font-medium text-gray-700">
              {navItems.map((item, i) => (
                // wrapper div receives ref so we can measure position
                <div
                  key={item.to}
                  ref={(el) => (linkRefs.current[i] = el)}
                  className="relative"
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `${navLinkClass} ${isActive ? "text-primary font-semibold" : "text-gray-700"}`
                    }
                  >
                    {item.name}
                  </NavLink>
                </div>
              ))}
            </div>

            {/* sliding indicator (bottom tab) */}
            <div
              aria-hidden
              className="absolute bottom-0 right-0 left-0 h-[3px] bg-primary rounded transition-all"
              style={{
                transform: `translateX(${indicator.left}px)`,
                width: indicator.visible ? indicator.width : 0,
                transition: "transform 280ms cubic-bezier(.2,.9,.2,1), width 280ms cubic-bezier(.2,.9,.2,1)",
              }}
            />
          </div>

          {/* Right side / Login (desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/auth"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 text-sm font-medium"
            >
              Login
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              className="text-2xl text-primary"
              onClick={() => setOpen((s) => !s)}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4 text-gray-700 text-sm font-medium border-t border-gray-100">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? "text-primary font-semibold" : "text-gray-700"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? "text-primary font-semibold" : "text-gray-700"}`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/events"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? "text-primary font-semibold" : "text-gray-700"}`
            }
          >
            Events
          </NavLink>

          <NavLink
            to="/auth"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block w-full text-center px-4 py-2 rounded-lg ${
                isActive ? "bg-primary text-white shadow" : "bg-primary text-white hover:opacity-90"
              }`
            }
          >
            Login
          </NavLink>
        </div>
      )}
    </nav>
  );
}
