import { Link } from "react-router-dom";
import {
  FaHome,
  FaFilePdf,
  FaBookmark,
  FaTrophy,
  FaUser,
  FaRobot,
  FaCog
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 p-6">

      <h1 className="text-3xl font-black text-blue-500 mb-12">
        📚 PaperVault
      </h1>

      <nav className="space-y-5">

        <Link to="/dashboard" className="block text-slate-300 hover:text-blue-400">
          <FaHome className="inline mr-3" />
          Dashboard
        </Link>

        <Link to="/papers" className="block text-slate-300 hover:text-blue-400">
          <FaFilePdf className="inline mr-3" />
          Papers
        </Link>

        <Link to="/bookmarks" className="block text-slate-300 hover:text-blue-400">
          <FaBookmark className="inline mr-3" />
          Bookmarks
        </Link>

        <Link to="/leaderboard" className="block text-slate-300 hover:text-blue-400">
          <FaTrophy className="inline mr-3" />
          Leaderboard
        </Link>

        <Link to="/ai" className="block text-slate-300 hover:text-blue-400">
          <FaRobot className="inline mr-3" />
          AI Assistant
        </Link>

        <Link to="/profile" className="block text-slate-300 hover:text-blue-400">
          <FaUser className="inline mr-3" />
          Profile
        </Link>

        <Link to="/admin" className="block text-slate-300 hover:text-blue-400">
          <FaCog className="inline mr-3" />
          Admin
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;