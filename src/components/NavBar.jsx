import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur bg-base-100/80 border-b border-base-300"
    >
      <div className="navbar max-w-6xl mx-auto px-4">
        {/* Left: Brand */}
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost text-xl gap-2 px-2 hover:opacity-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 text-primary"
              fill="currentColor"
            >
              <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10.5a1.5 1.5 0 0 1-2.223 1.303L14.5 16.25l-3.277 1.553a1.5 1.5 0 0 1-1.346 0L6 16.25l-1.777.806A1.5 1.5 0 0 1 2 16.5V6Z" />
            </svg>
            InkWave
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {user ? (
            <>
              <Link to="/add-post" className="btn btn-primary btn-sm rounded-xl">
                New Post
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-error btn-sm rounded-xl"
              >
                Logout
              </button>
              <div className="avatar hidden sm:inline-flex">
                <div className="w-8 rounded-xl ring ring-primary/40 ring-offset-base-100 ring-offset-2">
                  <img
                    alt="Profile"
                    src={
                      user?.avatar ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="btn btn-outline btn-sm rounded-xl"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm rounded-xl"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
