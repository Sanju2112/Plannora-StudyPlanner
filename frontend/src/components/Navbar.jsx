import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userName = localStorage.getItem("userName") || "U";
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Calendar", path: "/calendar" },
    { name: "Analytics", path: "/analytics" },
    { name: "Quick Notes", path: "/quicknotes" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-purple-700">
          📝 Plannora
        </Link>

        {/* Center links */}
        <ul className="hidden md:flex space-x-10 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`relative text-purple-700 bg-blue-200 rounded-xl font-medium px-2 py-1 transition group ${
                  location.pathname === item.path ? "font-bold bg-blue-300" : ""
                }`}
              >
                {item.name}
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Avatar + Hamburger */}
        <div className="flex items-center space-x-3">
          {/* Avatar and dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-lg font-bold cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {userName.charAt(0).toUpperCase()}
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-amber-100 border rounded shadow-lg z-50 text-md">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden text-purple-600 text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-3 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-purple-700 font-medium ${
                location.pathname === item.path
                  ? "font-bold text-purple-800"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
