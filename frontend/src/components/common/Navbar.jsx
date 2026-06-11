import { Link } from "react-router-dom";
import { FaSearch, FaMoon, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-lg border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl">📚</span>
          <span className="text-2xl font-black text-white">
            PaperVault
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8 text-slate-300 font-medium">

          <Link
            to="/"
            className="hover:text-blue-400 transition"
          >
            Home
          </Link>

          <Link
            to="/papers"
            className="hover:text-blue-400 transition"
          >
            Papers
          </Link>

          <Link
            to="/leaderboard"
            className="hover:text-blue-400 transition"
          >
            Leaderboard
          </Link>

          <Link
            to="/ai"
            className="hover:text-blue-400 transition"
          >
            AI Assistant
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Search */}
          <button className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white">
            <FaSearch />
          </button>

          {/* Dark Mode */}
          <button className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white">
            <FaMoon />
          </button>

          {/* Login */}
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Login
          </Link>

          {/* Profile */}
          <button className="text-3xl text-slate-300 hover:text-white">
            <FaUserCircle />
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;