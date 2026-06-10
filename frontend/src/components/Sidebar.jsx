import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen">

      <div className="text-2xl font-bold p-6">
        PaperVault
      </div>

      <div className="flex flex-col gap-4 px-6">

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/papers">Papers</Link>

        <Link to="/bookmarks">Bookmarks</Link>

        <Link to="/leaderboard">Leaderboard</Link>

        <Link to="/profile">Profile</Link>

      </div>

    </div>
  );
}

export default Sidebar;