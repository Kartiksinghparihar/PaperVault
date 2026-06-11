import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

import Dashboard from "../pages/student/Dashboard";
import Papers from "../pages/student/Papers";
import Bookmarks from "../pages/student/Bookmarks";
import Leaderboard from "../pages/student/Leaderboard";
import Profile from "../pages/student/Profile";
import AIAssistant from "../pages/student/AIAssistant";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import AdminDashboard from "../pages/admin/AdminDashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/papers" element={<Papers />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/ai" element={<AIAssistant />} />
    </Routes>
  );
}

export default AppRoutes;