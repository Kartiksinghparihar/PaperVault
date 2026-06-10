import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="
      fixed
      top-0
      w-full
      backdrop-blur-md
      bg-black/30
      border-b
      border-white/10
      z-50
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        flex
        justify-between
        items-center
        px-6
        py-4
        "
      >

        <h1 className="text-white text-2xl font-bold">
          📚 PaperVault
        </h1>

        <div className="flex gap-8 text-white">

          <Link to="/">Home</Link>

          <Link to="/papers">Papers</Link>

          <Link to="/leaderboard">Leaderboard</Link>

          <Link to="/login">Login</Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;