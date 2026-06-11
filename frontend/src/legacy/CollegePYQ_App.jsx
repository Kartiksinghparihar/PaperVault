import { useState, useEffect, createContext, useContext } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
// Palette: Deep navy + electric indigo accent + warm white
// Typography: Inter for UI, Playfair Display for display headings
// Signature: Animated paper-stack card reveal on the library page
const COLORS = {
  navy:    "#0B1426",
  navyMid: "#132040",
  navyLt:  "#1E3060",
  indigo:  "#5B6EF5",
  indigoLt:"#7B8EFF",
  violet:  "#9B59F0",
  teal:    "#2DD4BF",
  amber:   "#F59E0B",
  rose:    "#F43F5E",
  white:   "#F8FAFF",
  muted:   "#8899BB",
  border:  "#1E3060",
  glass:   "rgba(30,48,96,0.55)",
  success: "#10B981",
};

// ─── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700;900&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', sans-serif;
      background: #0B1426;
      color: #F8FAFF;
      min-height: 100vh;
      overflow-x: hidden;
    }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0B1426; }
    ::-webkit-scrollbar-thumb { background: #5B6EF5; border-radius: 3px; }

    /* Glassmorphism card */
    .glass {
      background: rgba(30,48,96,0.45);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(91,110,245,0.2);
      border-radius: 16px;
    }

    .glass-sm {
      background: rgba(30,48,96,0.35);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(91,110,245,0.15);
      border-radius: 10px;
    }

    /* Gradient text */
    .grad-text {
      background: linear-gradient(135deg, #5B6EF5, #9B59F0, #2DD4BF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Glow button */
    .btn-primary {
      background: linear-gradient(135deg, #5B6EF5, #9B59F0);
      border: none;
      border-radius: 10px;
      color: #F8FAFF;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 600;
      padding: 10px 22px;
      transition: all 0.25s;
      box-shadow: 0 4px 15px rgba(91,110,245,0.35);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(91,110,245,0.55);
    }

    .btn-ghost {
      background: transparent;
      border: 1px solid rgba(91,110,245,0.4);
      border-radius: 10px;
      color: #F8FAFF;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 500;
      padding: 10px 22px;
      transition: all 0.25s;
    }
    .btn-ghost:hover {
      border-color: #5B6EF5;
      background: rgba(91,110,245,0.1);
    }

    .btn-danger {
      background: linear-gradient(135deg, #F43F5E, #e53e6e);
      border: none;
      border-radius: 8px;
      color: white;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      padding: 7px 16px;
      transition: all 0.2s;
    }
    .btn-danger:hover { opacity: 0.85; }

    .btn-sm {
      padding: 6px 14px !important;
      font-size: 12px !important;
      border-radius: 8px !important;
    }

    /* Input */
    .input {
      background: rgba(11,20,38,0.7);
      border: 1px solid rgba(91,110,245,0.25);
      border-radius: 10px;
      color: #F8FAFF;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      outline: none;
      padding: 10px 14px;
      transition: border-color 0.2s;
      width: 100%;
    }
    .input:focus { border-color: #5B6EF5; box-shadow: 0 0 0 3px rgba(91,110,245,0.15); }
    .input::placeholder { color: #8899BB; }

    select.input option { background: #132040; }

    /* Badge */
    .badge {
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.5px;
      padding: 3px 10px;
      text-transform: uppercase;
    }
    .badge-indigo { background: rgba(91,110,245,0.18); color: #7B8EFF; border: 1px solid rgba(91,110,245,0.3); }
    .badge-teal   { background: rgba(45,212,191,0.15); color: #2DD4BF; border: 1px solid rgba(45,212,191,0.3); }
    .badge-amber  { background: rgba(245,158,11,0.15); color: #F59E0B; border: 1px solid rgba(245,158,11,0.3); }
    .badge-rose   { background: rgba(244,63,94,0.15);  color: #F43F5E; border: 1px solid rgba(244,63,94,0.3); }
    .badge-green  { background: rgba(16,185,129,0.15); color: #10B981; border: 1px solid rgba(16,185,129,0.3); }

    /* Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-ring {
      0%,100% { transform: scale(1); opacity: 0.6; }
      50%      { transform: scale(1.08); opacity: 1; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes floatY {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-8px); }
    }
    .fade-up { animation: fadeUp 0.45s ease both; }

    /* Sidebar */
    .sidebar-link {
      align-items: center;
      border-radius: 10px;
      color: #8899BB;
      cursor: pointer;
      display: flex;
      font-size: 14px;
      font-weight: 500;
      gap: 10px;
      padding: 10px 14px;
      text-decoration: none;
      transition: all 0.2s;
    }
    .sidebar-link:hover   { background: rgba(91,110,245,0.1); color: #F8FAFF; }
    .sidebar-link.active  { background: rgba(91,110,245,0.18); color: #F8FAFF; border-left: 3px solid #5B6EF5; padding-left: 11px; }

    /* Table */
    .table { width: 100%; border-collapse: collapse; }
    .table th {
      background: rgba(30,48,96,0.7);
      color: #8899BB;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.8px;
      padding: 12px 16px;
      text-align: left;
      text-transform: uppercase;
    }
    .table td {
      border-top: 1px solid rgba(91,110,245,0.08);
      color: #F8FAFF;
      font-size: 13px;
      padding: 12px 16px;
    }
    .table tr:hover td { background: rgba(91,110,245,0.05); }

    /* Star rating */
    .star { color: #F59E0B; font-size: 14px; }

    /* Progress bar */
    .progress-bar {
      background: rgba(30,48,96,0.8);
      border-radius: 4px;
      height: 6px;
      overflow: hidden;
      width: 100%;
    }
    .progress-fill {
      border-radius: 4px;
      height: 100%;
      transition: width 0.8s ease;
    }

    /* Notification dot */
    .notif-dot {
      background: #F43F5E;
      border-radius: 50%;
      height: 8px;
      position: absolute;
      right: -2px;
      top: -2px;
      width: 8px;
    }

    /* Modal overlay */
    .modal-overlay {
      align-items: center;
      background: rgba(11,20,38,0.85);
      backdrop-filter: blur(6px);
      bottom: 0;
      display: flex;
      justify-content: center;
      left: 0;
      position: fixed;
      right: 0;
      top: 0;
      z-index: 1000;
    }

    /* Tooltip */
    .tooltip-wrap { position: relative; display: inline-block; }
    .tooltip-box {
      background: #132040;
      border: 1px solid rgba(91,110,245,0.3);
      border-radius: 6px;
      bottom: 130%;
      color: #F8FAFF;
      font-size: 11px;
      left: 50%;
      padding: 4px 10px;
      pointer-events: none;
      position: absolute;
      transform: translateX(-50%);
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .tooltip-wrap:hover .tooltip-box { opacity: 1; }

    /* Orbit decoration */
    .orbit-ring {
      border: 1px dashed rgba(91,110,245,0.2);
      border-radius: 50%;
      position: absolute;
      pointer-events: none;
    }
  `}</style>
);

// ─── CONTEXT ───────────────────────────────────────────────────────────────────
const AppCtx = createContext(null);
const useApp = () => useContext(AppCtx);

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
const MOCK_STUDENTS = [
  { id: 1, name: "Arjun Sharma",    enroll: "22CS001", email: "arjun@college.edu",   branch: "CSE", year: 3, downloads: 142, points: 1820, avatar: "AS", active: true  },
  { id: 2, name: "Priya Patel",     enroll: "22EC002", email: "priya@college.edu",   branch: "ECE", year: 3, downloads: 118, points: 1540, avatar: "PP", active: true  },
  { id: 3, name: "Ravi Kumar",      enroll: "21ME003", email: "ravi@college.edu",    branch: "ME",  year: 4, downloads: 95,  points: 1280, avatar: "RK", active: true  },
  { id: 4, name: "Sneha Gupta",     enroll: "23CS004", email: "sneha@college.edu",   branch: "CSE", year: 2, downloads: 76,  points: 1010, avatar: "SG", active: false },
  { id: 5, name: "Mohit Singh",     enroll: "22CE005", email: "mohit@college.edu",   branch: "CE",  year: 3, downloads: 63,  points:  890, avatar: "MS", active: true  },
  { id: 6, name: "Isha Verma",      enroll: "23EC006", email: "isha@college.edu",    branch: "ECE", year: 2, downloads: 54,  points:  740, avatar: "IV", active: true  },
  { id: 7, name: "Dev Agarwal",     enroll: "21CS007", email: "dev@college.edu",     branch: "CSE", year: 4, downloads: 189, points: 2340, avatar: "DA", active: true  },
  { id: 8, name: "Kavya Nair",      enroll: "22IT008", email: "kavya@college.edu",   branch: "IT",  year: 3, downloads: 101, points: 1360, avatar: "KN", active: true  },
];

const MOCK_PAPERS = [
  { id: 1,  title: "Data Structures & Algorithms",       subject: "DSA",      branch: "CSE", year: 2023, semester: "5th", type: "End-Term", pages: 8,  size: "2.4 MB", downloads: 412, rating: 4.8, tags: ["important","solved"],  uploadedBy: "Admin",  date: "2024-01-15" },
  { id: 2,  title: "Operating Systems",                  subject: "OS",       branch: "CSE", year: 2023, semester: "5th", type: "Mid-Term", pages: 4,  size: "1.1 MB", downloads: 287, rating: 4.5, tags: ["previous"],             uploadedBy: "Admin",  date: "2024-01-18" },
  { id: 3,  title: "Digital Electronics",                subject: "DE",       branch: "ECE", year: 2023, semester: "3rd", type: "End-Term", pages: 6,  size: "1.8 MB", downloads: 198, rating: 4.3, tags: ["important"],            uploadedBy: "Admin",  date: "2024-01-20" },
  { id: 4,  title: "Engineering Mathematics – III",      subject: "M3",       branch: "ALL", year: 2022, semester: "4th", type: "End-Term", pages: 7,  size: "2.0 MB", downloads: 534, rating: 4.9, tags: ["important","solved"],  uploadedBy: "Admin",  date: "2023-12-10" },
  { id: 5,  title: "Computer Networks",                  subject: "CN",       branch: "CSE", year: 2023, semester: "6th", type: "End-Term", pages: 9,  size: "2.7 MB", downloads: 321, rating: 4.6, tags: ["solved"],               uploadedBy: "Admin",  date: "2024-02-01" },
  { id: 6,  title: "Thermodynamics",                     subject: "TD",       branch: "ME",  year: 2022, semester: "4th", type: "Mid-Term", pages: 5,  size: "1.5 MB", downloads: 156, rating: 4.2, tags: [],                       uploadedBy: "Admin",  date: "2023-11-20" },
  { id: 7,  title: "Database Management Systems",        subject: "DBMS",     branch: "CSE", year: 2023, semester: "5th", type: "End-Term", pages: 8,  size: "2.2 MB", downloads: 398, rating: 4.7, tags: ["important","solved"],  uploadedBy: "Admin",  date: "2024-02-10" },
  { id: 8,  title: "Analog Circuits",                    subject: "AC",       branch: "ECE", year: 2022, semester: "4th", type: "End-Term", pages: 6,  size: "1.9 MB", downloads: 134, rating: 4.1, tags: ["previous"],             uploadedBy: "Admin",  date: "2023-10-15" },
  { id: 9,  title: "Structural Analysis",                subject: "SA",       branch: "CE",  year: 2023, semester: "5th", type: "End-Term", pages: 7,  size: "2.1 MB", downloads: 112, rating: 4.0, tags: [],                       uploadedBy: "Admin",  date: "2024-01-25" },
  { id: 10, title: "Machine Learning Fundamentals",      subject: "ML",       branch: "CSE", year: 2023, semester: "7th", type: "End-Term", pages: 10, size: "3.0 MB", downloads: 487, rating: 4.9, tags: ["important","solved"],  uploadedBy: "Admin",  date: "2024-03-01" },
];

const BRANCHES = ["ALL", "CSE", "ECE", "ME", "CE", "IT"];
const SEMESTERS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const EXAM_TYPES = ["End-Term", "Mid-Term", "Sessional", "Practical"];

// ─── ICONS (inline SVG) ────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color = "currentColor" }) => {
  const icons = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    papers: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    bookmark: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
    bookmarkFill: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
    download: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    chart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    trophy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 7 4 7 4 3 8 3"/><polyline points="16 7 20 7 20 3 16 3"/><path d="M4 7a8 8 0 0 0 16 0"/><path d="M12 15v4"/><path d="M8 19h8"/><path d="M9 3H4"/><path d="M20 3h-5"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 0 0 12 2a10 10 0 0 0-7.07 2.93"/><path d="M4.93 19.07A10 10 0 0 0 12 22a10 10 0 0 0 7.07-2.93"/><path d="M3 12a9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9 9 9 0 0 0-9 9z"/></svg>,
    logout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    edit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    trash: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
    eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    starEmpty: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    compare: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3l18 18M10.5 6H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4.5M20 4v4h-4M14 14H3"/></svg>,
    ai: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    filter: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    admin: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    upload: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
    lock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    book: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    tag: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    comment: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    grid: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    list: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    share: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  };
  return icons[name] || null;
};

// ─── AVATAR ────────────────────────────────────────────────────────────────────
const Avatar = ({ initials, size = 36, color = "#5B6EF5" }) => (
  <div style={{
    alignItems: "center",
    background: `linear-gradient(135deg, ${color}33, ${color}55)`,
    border: `1.5px solid ${color}55`,
    borderRadius: "50%",
    color,
    display: "flex",
    flexShrink: 0,
    fontSize: size * 0.35,
    fontWeight: 700,
    height: size,
    justifyContent: "center",
    letterSpacing: 1,
    width: size,
  }}>{initials}</div>
);

// ─── STAR RATING ───────────────────────────────────────────────────────────────
const StarRating = ({ rating }) => (
  <div style={{ alignItems: "center", display: "flex", gap: 2 }}>
    {[1,2,3,4,5].map(i => (
      <Icon key={i} name={i <= Math.round(rating) ? "star" : "starEmpty"} size={12} color="#F59E0B" />
    ))}
    <span style={{ color: "#8899BB", fontSize: 11, marginLeft: 4 }}>{rating.toFixed(1)}</span>
  </div>
);

// ─── STAT CARD ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, trend, color = "#5B6EF5" }) => (
  <div className="glass" style={{ padding: "20px 24px" }}>
    <div style={{ alignItems: "flex-start", display: "flex", justifyContent: "space-between" }}>
      <div>
        <p style={{ color: "#8899BB", fontSize: 12, fontWeight: 500, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</p>
        <p style={{ color: "#F8FAFF", fontSize: 28, fontWeight: 700 }}>{value}</p>
        {trend && <p style={{ color: COLORS.teal, fontSize: 12, marginTop: 6 }}>↑ {trend} this week</p>}
      </div>
      <div style={{ background: `${color}22`, borderRadius: 12, color, padding: 12 }}>
        <Icon name={icon} size={22} color={color} />
      </div>
    </div>
  </div>
);

// ─── PAPER CARD ────────────────────────────────────────────────────────────────
const PaperCard = ({ paper, bookmarks, onBookmark, onView, compact = false }) => {
  const isBookmarked = bookmarks?.includes(paper.id);
  const tagColors = { important: "badge-rose", solved: "badge-green", previous: "badge-amber" };

  return (
    <div className="glass" style={{
      cursor: "default",
      padding: compact ? "16px" : "20px",
      transition: "transform 0.2s, box-shadow 0.2s",
      animation: "fadeUp 0.4s ease both",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(91,110,245,0.25)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = ""; }}
    >
      {/* Header */}
      <div style={{ alignItems: "flex-start", display: "flex", gap: 12, marginBottom: 12 }}>
        <div style={{ background: "rgba(91,110,245,0.15)", borderRadius: 10, flexShrink: 0, padding: "10px 12px" }}>
          <Icon name="papers" size={20} color="#7B8EFF" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4 style={{ color: "#F8FAFF", fontSize: 14, fontWeight: 600, lineHeight: 1.3, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{paper.title}</h4>
          <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: 6 }}>
            <span className="badge badge-indigo">{paper.subject}</span>
            <span className="badge badge-teal">{paper.semester} Sem</span>
            <span className="badge badge-amber">{paper.type}</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      {paper.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
          {paper.tags.map(t => <span key={t} className={`badge ${tagColors[t] || "badge-indigo"}`}>{t}</span>)}
        </div>
      )}

      {/* Meta */}
      <div style={{ borderTop: "1px solid rgba(91,110,245,0.1)", display: "grid", gap: 6, gridTemplateColumns: "1fr 1fr", paddingTop: 12 }}>
        <div style={{ color: "#8899BB", fontSize: 11 }}>📅 {paper.year} • {paper.branch}</div>
        <div style={{ color: "#8899BB", fontSize: 11, textAlign: "right" }}>📄 {paper.pages}p • {paper.size}</div>
        <StarRating rating={paper.rating} />
        <div style={{ color: "#8899BB", fontSize: 11, textAlign: "right" }}>⬇ {paper.downloads} downloads</div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <button className="btn-primary btn-sm" style={{ flex: 1 }} onClick={() => onView?.(paper)}>
          <span style={{ alignItems: "center", display: "flex", gap: 6, justifyContent: "center" }}>
            <Icon name="eye" size={13} /> View
          </span>
        </button>
        <button className="btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => alert(`Downloading "${paper.title}"...`)}>
          <span style={{ alignItems: "center", display: "flex", gap: 6, justifyContent: "center" }}>
            <Icon name="download" size={13} /> Download
          </span>
        </button>
        <button
          onClick={() => onBookmark?.(paper.id)}
          style={{ background: isBookmarked ? "rgba(91,110,245,0.2)" : "transparent", border: `1px solid rgba(91,110,245,${isBookmarked ? 0.5 : 0.25})`, borderRadius: 8, color: isBookmarked ? "#7B8EFF" : "#8899BB", cursor: "pointer", padding: "6px 10px", transition: "all 0.2s" }}
        >
          <Icon name={isBookmarked ? "bookmarkFill" : "bookmark"} size={14} />
        </button>
        <button
          onClick={() => alert("Share link copied!")}
          style={{ background: "transparent", border: "1px solid rgba(91,110,245,0.2)", borderRadius: 8, color: "#8899BB", cursor: "pointer", padding: "6px 10px", transition: "all 0.2s" }}
        >
          <Icon name="share" size={14} />
        </button>
      </div>
    </div>
  );
};

// ─── SEARCH + FILTER BAR ───────────────────────────────────────────────────────
const FilterBar = ({ filters, setFilters, showBranch = true }) => (
  <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
    <div style={{ flex: "1 1 220px", position: "relative" }}>
      <span style={{ left: 12, position: "absolute", top: "50%", transform: "translateY(-50%)" }}>
        <Icon name="search" size={15} color="#8899BB" />
      </span>
      <input className="input" placeholder="Search papers, subjects…" style={{ paddingLeft: 38 }}
        value={filters.q} onChange={e => setFilters(p => ({ ...p, q: e.target.value }))} />
    </div>
    {showBranch && (
      <select className="input" style={{ width: 120 }} value={filters.branch} onChange={e => setFilters(p => ({ ...p, branch: e.target.value }))}>
        {BRANCHES.map(b => <option key={b}>{b}</option>)}
      </select>
    )}
    <select className="input" style={{ width: 110 }} value={filters.sem} onChange={e => setFilters(p => ({ ...p, sem: e.target.value }))}>
      <option value="">All Sems</option>
      {SEMESTERS.map(s => <option key={s}>{s}</option>)}
    </select>
    <select className="input" style={{ width: 130 }} value={filters.type} onChange={e => setFilters(p => ({ ...p, type: e.target.value }))}>
      <option value="">All Types</option>
      {EXAM_TYPES.map(t => <option key={t}>{t}</option>)}
    </select>
    <select className="input" style={{ width: 110 }} value={filters.year} onChange={e => setFilters(p => ({ ...p, year: e.target.value }))}>
      <option value="">All Years</option>
      {[2024,2023,2022,2021].map(y => <option key={y}>{y}</option>)}
    </select>
    <button className="btn-ghost btn-sm" onClick={() => setFilters({ q: "", branch: "ALL", sem: "", type: "", year: "" })}>Clear</button>
  </div>
);

// ─── MODAL ─────────────────────────────────────────────────────────────────────
const Modal = ({ open, onClose, title, children, width = 520 }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass" style={{ maxHeight: "90vh", overflowY: "auto", padding: 28, width: "min(96vw, " + width + "px)" }} onClick={e => e.stopPropagation()}>
        <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#8899BB", cursor: "pointer" }}>
            <Icon name="x" size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// ─── TOAST ─────────────────────────────────────────────────────────────────────
const Toast = ({ msg, onClose }) => (
  <div style={{
    alignItems: "center",
    animation: "fadeUp 0.3s ease",
    background: "rgba(16,185,129,0.15)",
    border: "1px solid rgba(16,185,129,0.4)",
    borderRadius: 10,
    bottom: 24,
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    color: "#10B981",
    display: "flex",
    fontSize: 14,
    fontWeight: 500,
    gap: 10,
    left: "50%",
    padding: "12px 20px",
    position: "fixed",
    transform: "translateX(-50%)",
    zIndex: 9999,
  }}>
    <Icon name="check" size={16} color="#10B981" />
    {msg}
    <button onClick={onClose} style={{ background: "none", border: "none", color: "#10B981", cursor: "pointer", marginLeft: 8 }}>
      <Icon name="x" size={14} />
    </button>
  </div>
);

// ─── PAPER DETAIL MODAL ────────────────────────────────────────────────────────
const PaperDetailModal = ({ paper, open, onClose, bookmarks, onBookmark }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "Arjun", text: "Great paper, well structured questions.", time: "2 days ago" },
    { id: 2, user: "Priya", text: "Unit 3 questions are repeated every year!", time: "5 days ago" },
  ]);

  const addComment = () => {
    if (!comment.trim()) return;
    setComments(p => [...p, { id: Date.now(), user: "You", text: comment, time: "Just now" }]);
    setComment("");
  };

  if (!paper) return null;
  return (
    <Modal open={open} onClose={onClose} title="" width={640}>
      {/* Paper Header */}
      <div style={{ background: "linear-gradient(135deg, rgba(91,110,245,0.15), rgba(155,89,240,0.1))", borderRadius: 12, marginBottom: 20, padding: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{paper.title}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          <span className="badge badge-indigo">{paper.subject}</span>
          <span className="badge badge-teal">{paper.semester} Sem</span>
          <span className="badge badge-amber">{paper.type}</span>
          <span className="badge badge-indigo">{paper.year}</span>
          <span className="badge badge-indigo">{paper.branch}</span>
        </div>
      </div>

      {/* Info Grid */}
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr 1fr", marginBottom: 20 }}>
        {[["Pages", paper.pages], ["Size", paper.size], ["Downloads", paper.downloads]].map(([k,v]) => (
          <div key={k} className="glass-sm" style={{ padding: "12px 16px", textAlign: "center" }}>
            <p style={{ color: "#8899BB", fontSize: 11, marginBottom: 4 }}>{k}</p>
            <p style={{ color: "#F8FAFF", fontWeight: 700 }}>{v}</p>
          </div>
        ))}
      </div>

      {/* Rating */}
      <div style={{ alignItems: "center", display: "flex", gap: 8, marginBottom: 20 }}>
        <StarRating rating={paper.rating} />
        <span style={{ color: "#8899BB", fontSize: 12 }}>Based on student ratings</span>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        <button className="btn-primary" style={{ flex: 1 }} onClick={() => alert("Downloading…")}>
          <span style={{ alignItems: "center", display: "flex", gap: 8, justifyContent: "center" }}>
            <Icon name="download" size={15} /> Download PDF
          </span>
        </button>
        <button className="btn-ghost" onClick={() => { onBookmark?.(paper.id); }}>
          <Icon name={bookmarks?.includes(paper.id) ? "bookmarkFill" : "bookmark"} size={15} />
        </button>
        <button className="btn-ghost" onClick={() => alert("Share link copied!")}>
          <Icon name="share" size={15} />
        </button>
      </div>

      {/* Comments */}
      <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: "#8899BB", letterSpacing: 0.6, textTransform: "uppercase" }}>Discussion</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
        {comments.map(c => (
          <div key={c.id} className="glass-sm" style={{ padding: "10px 14px" }}>
            <div style={{ alignItems: "center", display: "flex", gap: 8, marginBottom: 4 }}>
              <Avatar initials={c.user.slice(0,2).toUpperCase()} size={24} />
              <strong style={{ fontSize: 13 }}>{c.user}</strong>
              <span style={{ color: "#8899BB", fontSize: 11, marginLeft: "auto" }}>{c.time}</span>
            </div>
            <p style={{ color: "#CDD5EE", fontSize: 13 }}>{c.text}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input className="input" value={comment} onChange={e => setComment(e.target.value)}
          placeholder="Add a comment…" onKeyDown={e => e.key === "Enter" && addComment()} style={{ flex: 1 }} />
        <button className="btn-primary btn-sm" onClick={addComment}>Post</button>
      </div>
    </Modal>
  );
};

// ─── LAYOUT WRAPPER ────────────────────────────────────────────────────────────
const Layout = ({ children, sidebar }) => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    {sidebar}
    <main style={{ flex: 1, minWidth: 0, overflowX: "hidden" }}>{children}</main>
  </div>
);

// ─── STUDENT SIDEBAR ───────────────────────────────────────────────────────────
const StudentSidebar = ({ page, setPage, student, onLogout }) => {
  const nav = [
    { id: "dashboard", icon: "home", label: "Dashboard" },
    { id: "papers", icon: "papers", label: "Papers" },
    { id: "bookmarks", icon: "bookmark", label: "Bookmarks" },
    { id: "compare", icon: "compare", label: "Compare Papers" },
    { id: "leaderboard", icon: "trophy", label: "Leaderboard" },
    { id: "ai", icon: "ai", label: "AI Assistant" },
    { id: "profile", icon: "user", label: "Profile" },
  ];

  return (
    <aside style={{
      background: "rgba(11,20,38,0.95)",
      borderRight: "1px solid rgba(91,110,245,0.12)",
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      padding: "20px 12px",
      position: "sticky",
      top: 0,
      width: 220,
    }}>
      {/* Logo */}
      <div style={{ alignItems: "center", display: "flex", gap: 10, marginBottom: 28, padding: "0 6px" }}>
        <div style={{ alignItems: "center", background: "linear-gradient(135deg,#5B6EF5,#9B59F0)", borderRadius: 10, display: "flex", height: 34, justifyContent: "center", width: 34 }}>
          <Icon name="book" size={18} color="white" />
        </div>
        <div>
          <p style={{ color: "#F8FAFF", fontSize: 14, fontWeight: 700 }}>PaperVault</p>
          <p style={{ color: "#8899BB", fontSize: 10 }}>Student Portal</p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", flex: 1, gap: 2 }}>
        {nav.map(n => (
          <div key={n.id} className={`sidebar-link ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
            <Icon name={n.icon} size={16} />{n.label}
          </div>
        ))}
      </nav>

      {/* User */}
      <div style={{ borderTop: "1px solid rgba(91,110,245,0.1)", paddingTop: 14 }}>
        <div style={{ alignItems: "center", display: "flex", gap: 10, padding: "0 6px", marginBottom: 10 }}>
          <Avatar initials={student.avatar} size={32} />
          <div style={{ minWidth: 0 }}>
            <p style={{ color: "#F8FAFF", fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{student.name.split(" ")[0]}</p>
            <p style={{ color: "#8899BB", fontSize: 11 }}>{student.enroll}</p>
          </div>
        </div>
        <div className="sidebar-link" onClick={onLogout} style={{ color: "#F43F5E" }}>
          <Icon name="logout" size={16} color="#F43F5E" /> Sign Out
        </div>
      </div>
    </aside>
  );
};

// ─── ADMIN SIDEBAR ─────────────────────────────────────────────────────────────
const AdminSidebar = ({ page, setPage, onLogout }) => {
  const nav = [
    { id: "admindash", icon: "home", label: "Dashboard" },
    { id: "managepapers", icon: "papers", label: "Manage Papers" },
    { id: "managestudents", icon: "users", label: "Manage Students" },
    { id: "analytics", icon: "chart", label: "Analytics" },
    { id: "settings", icon: "settings", label: "Settings" },
  ];
  return (
    <aside style={{ background: "rgba(11,20,38,0.95)", borderRight: "1px solid rgba(244,63,94,0.12)", display: "flex", flexDirection: "column", minHeight: "100vh", padding: "20px 12px", position: "sticky", top: 0, width: 220 }}>
      <div style={{ alignItems: "center", display: "flex", gap: 10, marginBottom: 28, padding: "0 6px" }}>
        <div style={{ alignItems: "center", background: "linear-gradient(135deg,#F43F5E,#F59E0B)", borderRadius: 10, display: "flex", height: 34, justifyContent: "center", width: 34 }}>
          <Icon name="admin" size={18} color="white" />
        </div>
        <div>
          <p style={{ color: "#F8FAFF", fontSize: 14, fontWeight: 700 }}>PaperVault</p>
          <p style={{ color: "#8899BB", fontSize: 10 }}>Admin Panel</p>
        </div>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", flex: 1, gap: 2 }}>
        {nav.map(n => (
          <div key={n.id} className={`sidebar-link ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}
            style={page === n.id ? { borderLeftColor: "#F43F5E", color: "#F8FAFF" } : {}}>
            <Icon name={n.icon} size={16} />{n.label}
          </div>
        ))}
      </nav>
      <div style={{ borderTop: "1px solid rgba(244,63,94,0.1)", paddingTop: 14 }}>
        <div style={{ alignItems: "center", display: "flex", gap: 8, padding: "0 6px 10px" }}>
          <div style={{ alignItems: "center", background: "rgba(244,63,94,0.15)", borderRadius: "50%", display: "flex", fontSize: 12, fontWeight: 700, height: 32, justifyContent: "center", width: 32, color: "#F43F5E" }}>AD</div>
          <div>
            <p style={{ color: "#F8FAFF", fontSize: 13, fontWeight: 600 }}>Admin</p>
            <p style={{ color: "#8899BB", fontSize: 11 }}>Super Admin</p>
          </div>
        </div>
        <div className="sidebar-link" onClick={onLogout} style={{ color: "#F43F5E" }}>
          <Icon name="logout" size={16} color="#F43F5E" /> Sign Out
        </div>
      </div>
    </aside>
  );
};

// ─── PAGE HEADER ───────────────────────────────────────────────────────────────
const PageHeader = ({ title, sub, action }) => (
  <div style={{ alignItems: "center", borderBottom: "1px solid rgba(91,110,245,0.1)", display: "flex", justifyContent: "space-between", marginBottom: 28, paddingBottom: 20 }}>
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{title}</h1>
      {sub && <p style={{ color: "#8899BB", fontSize: 14 }}>{sub}</p>}
    </div>
    {action}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// STUDENT PAGES
// ═══════════════════════════════════════════════════════════════════════════════

const StudentDashboard = ({ student, setPage }) => {
  const recentPapers = MOCK_PAPERS.slice(0, 3);
  const stats = [
    { label: "Papers Available", value: MOCK_PAPERS.length, icon: "papers", color: "#5B6EF5", trend: "+3" },
    { label: "My Downloads",     value: student.downloads,   icon: "download", color: "#2DD4BF", trend: "+12" },
    { label: "My Points",        value: student.points,      icon: "trophy",   color: "#F59E0B", trend: "+80" },
    { label: "Bookmarked",       value: 4,                   icon: "bookmark", color: "#9B59F0", trend: null },
  ];

  return (
    <div style={{ padding: "32px 32px" }}>
      {/* Welcome */}
      <div className="glass" style={{ marginBottom: 28, overflow: "hidden", padding: "28px 32px", position: "relative" }}>
        <div className="orbit-ring" style={{ height: 220, right: -60, top: -60, width: 220 }} />
        <div className="orbit-ring" style={{ height: 140, right: 20, top: 20, width: 140 }} />
        <p style={{ color: "#8899BB", fontSize: 14, marginBottom: 6 }}>Welcome back,</p>
        <h2 style={{ fontSize: 30, fontWeight: 900, fontFamily: "'Playfair Display', serif", marginBottom: 8 }} className="grad-text">{student.name} 👋</h2>
        <p style={{ color: "#8899BB", fontSize: 14, marginBottom: 20 }}>{student.branch} • Year {student.year} • {student.enroll}</p>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-primary" onClick={() => setPage("papers")}>Browse Papers</button>
          <button className="btn-ghost" onClick={() => setPage("bookmarks")}>My Bookmarks</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", marginBottom: 32 }}>
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Recent + Activity */}
      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr 340px" }}>
        {/* Recent Papers */}
        <div>
          <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Recently Added</h3>
            <button className="btn-ghost btn-sm" onClick={() => setPage("papers")}>View All →</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {recentPapers.map(p => (
              <div key={p.id} className="glass-sm" style={{ alignItems: "center", display: "flex", gap: 14, padding: "14px 16px" }}>
                <div style={{ background: "rgba(91,110,245,0.15)", borderRadius: 8, padding: "8px 10px" }}>
                  <Icon name="papers" size={18} color="#7B8EFF" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: "#F8FAFF", fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</p>
                  <p style={{ color: "#8899BB", fontSize: 11, marginTop: 2 }}>{p.branch} • {p.semester} Sem • {p.year}</p>
                </div>
                <button className="btn-primary btn-sm" onClick={() => alert("Downloading…")}><Icon name="download" size={12} /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Activity / Tips */}
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Activity & Tips</h3>
          <div className="glass" style={{ marginBottom: 16, padding: "16px 18px" }}>
            <p style={{ color: "#7B8EFF", fontSize: 11, fontWeight: 600, letterSpacing: 0.8, marginBottom: 10, textTransform: "uppercase" }}>🔥 Your Streak</p>
            <p style={{ color: "#F8FAFF", fontSize: 26, fontWeight: 700 }}>7 days</p>
            <div className="progress-bar" style={{ marginTop: 10 }}>
              <div className="progress-fill" style={{ background: "linear-gradient(90deg, #5B6EF5, #9B59F0)", width: "70%" }} />
            </div>
            <p style={{ color: "#8899BB", fontSize: 11, marginTop: 6 }}>7 / 10 days to next badge</p>
          </div>
          <div className="glass" style={{ padding: "16px 18px" }}>
            <p style={{ color: "#2DD4BF", fontSize: 11, fontWeight: 600, letterSpacing: 0.8, marginBottom: 12, textTransform: "uppercase" }}>💡 Smart Tip</p>
            <p style={{ color: "#CDD5EE", fontSize: 13, lineHeight: 1.6 }}>Your semester exams are likely to repeat Unit 3 of DSA. Focus on tree traversal algorithms!</p>
            <button className="btn-ghost btn-sm" style={{ marginTop: 12, width: "100%" }} onClick={() => setPage("ai")}>Ask AI Assistant →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── PAPERS PAGE ───────────────────────────────────────────────────────────────
const PapersPage = ({ bookmarks, setBookmarks }) => {
  const [filters, setFilters] = useState({ q: "", branch: "ALL", sem: "", type: "", year: "" });
  const [view, setView] = useState("grid");
  const [selected, setSelected] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [toast, setToast] = useState("");

  const filtered = MOCK_PAPERS.filter(p => {
    const q = filters.q.toLowerCase();
    return (
      (!q || p.title.toLowerCase().includes(q) || p.subject.toLowerCase().includes(q)) &&
      (filters.branch === "ALL" || p.branch === filters.branch || p.branch === "ALL") &&
      (!filters.sem || p.semester === filters.sem) &&
      (!filters.type || p.type === filters.type) &&
      (!filters.year || String(p.year) === filters.year)
    );
  });

  const handleBookmark = (id) => {
    setBookmarks(p => {
      const next = p.includes(id) ? p.filter(x => x !== id) : [...p, id];
      setToast(next.includes(id) ? "Bookmarked!" : "Removed from bookmarks");
      setTimeout(() => setToast(""), 2200);
      return next;
    });
  };

  return (
    <div style={{ padding: "32px 32px" }}>
      <PageHeader title="Paper Library" sub={`${filtered.length} papers found`}
        action={
          <div style={{ display: "flex", gap: 8 }}>
            <button className={`btn-ghost btn-sm ${view === "grid" ? "btn-primary" : ""}`} onClick={() => setView("grid")}><Icon name="grid" size={14} /></button>
            <button className={`btn-ghost btn-sm ${view === "list" ? "btn-primary" : ""}`} onClick={() => setView("list")}><Icon name="list" size={14} /></button>
          </div>
        }
      />
      <FilterBar filters={filters} setFilters={setFilters} />
      {filtered.length === 0 ? (
        <div style={{ color: "#8899BB", padding: "48px 0", textAlign: "center" }}>
          <Icon name="search" size={40} color="#8899BB" />
          <p style={{ fontSize: 16, marginTop: 12 }}>No papers match your filters.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: view === "grid" ? "repeat(auto-fill,minmax(300px,1fr))" : "1fr" }}>
          {filtered.map(p => (
            <PaperCard key={p.id} paper={p} bookmarks={bookmarks} onBookmark={handleBookmark}
              onView={p => { setSelected(p); setDetailOpen(true); }} />
          ))}
        </div>
      )}
      <PaperDetailModal paper={selected} open={detailOpen} onClose={() => setDetailOpen(false)} bookmarks={bookmarks} onBookmark={handleBookmark} />
      {toast && <Toast msg={toast} onClose={() => setToast("")} />}
    </div>
  );
};

// ─── BOOKMARKS PAGE ────────────────────────────────────────────────────────────
const BookmarksPage = ({ bookmarks, setBookmarks }) => {
  const saved = MOCK_PAPERS.filter(p => bookmarks.includes(p.id));
  const [toast, setToast] = useState("");
  const [selected, setSelected] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleBookmark = (id) => {
    setBookmarks(p => p.filter(x => x !== id));
    setToast("Removed from bookmarks");
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div style={{ padding: "32px 32px" }}>
      <PageHeader title="My Bookmarks" sub={`${saved.length} saved papers`} />
      {saved.length === 0 ? (
        <div className="glass" style={{ color: "#8899BB", padding: "56px 0", textAlign: "center" }}>
          <Icon name="bookmark" size={48} color="#8899BB" />
          <p style={{ fontSize: 16, marginTop: 16 }}>No bookmarks yet.</p>
          <p style={{ fontSize: 13, marginTop: 6 }}>Save papers from the library to access them quickly.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))" }}>
          {saved.map(p => (
            <PaperCard key={p.id} paper={p} bookmarks={bookmarks} onBookmark={handleBookmark}
              onView={p => { setSelected(p); setDetailOpen(true); }} />
          ))}
        </div>
      )}
      <PaperDetailModal paper={selected} open={detailOpen} onClose={() => setDetailOpen(false)} bookmarks={bookmarks} onBookmark={handleBookmark} />
      {toast && <Toast msg={toast} onClose={() => setToast("")} />}
    </div>
  );
};

// ─── COMPARE PAGE ──────────────────────────────────────────────────────────────
const ComparePage = () => {
  const [a, setA] = useState(MOCK_PAPERS[0]);
  const [b, setB] = useState(MOCK_PAPERS[1]);

  const fields = [
    ["Subject",    p => p.subject],
    ["Branch",     p => p.branch],
    ["Year",       p => p.year],
    ["Semester",   p => p.semester],
    ["Type",       p => p.type],
    ["Pages",      p => p.pages],
    ["Size",       p => p.size],
    ["Downloads",  p => p.downloads],
    ["Rating",     p => p.rating.toFixed(1)],
    ["Tags",       p => p.tags.join(", ") || "—"],
  ];

  return (
    <div style={{ padding: "32px 32px" }}>
      <PageHeader title="Compare Papers" sub="Side-by-side comparison of any two papers" />

      {/* Pickers */}
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr", marginBottom: 28 }}>
        {[[a, setA, "Paper A"], [b, setB, "Paper B"]].map(([val, setter, label]) => (
          <div key={label} className="glass" style={{ padding: 18 }}>
            <p style={{ color: "#8899BB", fontSize: 12, fontWeight: 600, letterSpacing: 0.8, marginBottom: 10, textTransform: "uppercase" }}>{label}</p>
            <select className="input" value={val.id} onChange={e => setter(MOCK_PAPERS.find(p => p.id === Number(e.target.value)))}>
              {MOCK_PAPERS.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="glass" style={{ overflow: "hidden" }}>
        <table className="table" style={{ tableLayout: "fixed", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: "28%" }}>Attribute</th>
              <th style={{ background: "rgba(91,110,245,0.12)", width: "36%" }}>{a.title.length > 30 ? a.title.slice(0,30)+"…" : a.title}</th>
              <th style={{ background: "rgba(155,89,240,0.1)", width: "36%" }}>{b.title.length > 30 ? b.title.slice(0,30)+"…" : b.title}</th>
            </tr>
          </thead>
          <tbody>
            {fields.map(([lbl, fn]) => {
              const va = fn(a), vb = fn(b);
              const highlight = (v, other) => typeof v === "number" && v > other ? { color: "#2DD4BF", fontWeight: 700 } : {};
              return (
                <tr key={lbl}>
                  <td style={{ color: "#8899BB" }}>{lbl}</td>
                  <td style={{ ...highlight(va, vb) }}>{va}</td>
                  <td style={{ ...highlight(vb, va) }}>{vb}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Visual Bars */}
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr", marginTop: 24 }}>
        {[["Downloads", a.downloads, b.downloads, 600], ["Rating", a.rating, b.rating, 5]].map(([lbl, va, vb, max]) => (
          <div key={lbl} className="glass" style={{ padding: 18 }}>
            <p style={{ color: "#8899BB", fontSize: 12, fontWeight: 600, letterSpacing: 0.8, marginBottom: 14, textTransform: "uppercase" }}>{lbl}</p>
            {[[a.title, va, "#5B6EF5"], [b.title, vb, "#9B59F0"]].map(([t, v, c]) => (
              <div key={t} style={{ marginBottom: 10 }}>
                <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ color: "#CDD5EE", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "70%" }}>{t.length > 24 ? t.slice(0,24)+"…" : t}</span>
                  <span style={{ color: c, fontWeight: 700, fontSize: 13 }}>{v}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ background: c, width: `${(v / max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── LEADERBOARD PAGE ──────────────────────────────────────────────────────────
const LeaderboardPage = ({ currentStudent }) => {
  const [tab, setTab] = useState("points");
  const sorted = [...MOCK_STUDENTS].sort((a, b) =>
    tab === "points" ? b.points - a.points : b.downloads - a.downloads
  );
  const medalColors = ["#F59E0B", "#9BA3B5", "#CD7F32"];
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div style={{ padding: "32px 32px" }}>
      <PageHeader title="Leaderboard" sub="Top students by activity this semester" />

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {[["points", "By Points"], ["downloads", "By Downloads"]].map(([k, v]) => (
          <button key={k} className={tab === k ? "btn-primary btn-sm" : "btn-ghost btn-sm"} onClick={() => setTab(k)}>{v}</button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr 1fr", marginBottom: 28 }}>
        {sorted.slice(0, 3).map((s, i) => (
          <div key={s.id} className="glass" style={{
            border: i === 0 ? "1px solid rgba(245,158,11,0.4)" : "1px solid rgba(91,110,245,0.15)",
            padding: "20px 16px",
            textAlign: "center",
            transform: i === 0 ? "scale(1.04)" : "scale(1)",
            boxShadow: i === 0 ? "0 8px 32px rgba(245,158,11,0.2)" : "",
          }}>
            <p style={{ fontSize: 28, marginBottom: 8 }}>{medals[i]}</p>
            <Avatar initials={s.avatar} size={44} color={medalColors[i]} />
            <p style={{ color: "#F8FAFF", fontSize: 14, fontWeight: 700, marginTop: 10 }}>{s.name.split(" ")[0]}</p>
            <p style={{ color: "#8899BB", fontSize: 11, marginBottom: 8 }}>{s.branch} • Yr {s.year}</p>
            <p style={{ color: medalColors[i], fontSize: 20, fontWeight: 800 }}>
              {tab === "points" ? s.points.toLocaleString() : s.downloads}
            </p>
            <p style={{ color: "#8899BB", fontSize: 11 }}>{tab === "points" ? "pts" : "downloads"}</p>
          </div>
        ))}
      </div>

      {/* Full Table */}
      <div className="glass" style={{ overflow: "hidden" }}>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Branch</th>
              <th>Year</th>
              <th>{tab === "points" ? "Points" : "Downloads"}</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s, i) => (
              <tr key={s.id} style={s.id === currentStudent.id ? { background: "rgba(91,110,245,0.1)" } : {}}>
                <td>
                  <span style={{ alignItems: "center", color: i < 3 ? medalColors[i] : "#8899BB", display: "flex", fontSize: 14, fontWeight: 700, gap: 4 }}>
                    {i < 3 ? medals[i] : `#${i + 1}`}
                  </span>
                </td>
                <td>
                  <div style={{ alignItems: "center", display: "flex", gap: 10 }}>
                    <Avatar initials={s.avatar} size={30} color={i < 3 ? medalColors[i] : "#5B6EF5"} />
                    <div>
                      <p style={{ color: "#F8FAFF", fontSize: 13, fontWeight: 600 }}>{s.name}{s.id === currentStudent.id && <span style={{ color: "#5B6EF5", fontSize: 11, marginLeft: 6 }}>(You)</span>}</p>
                      <p style={{ color: "#8899BB", fontSize: 11 }}>{s.enroll}</p>
                    </div>
                  </div>
                </td>
                <td><span className="badge badge-indigo">{s.branch}</span></td>
                <td style={{ color: "#CDD5EE" }}>Year {s.year}</td>
                <td>
                  <div style={{ alignItems: "center", display: "flex", gap: 8 }}>
                    <div className="progress-bar" style={{ width: 80 }}>
                      <div className="progress-fill" style={{
                        background: `linear-gradient(90deg, #5B6EF5, #9B59F0)`,
                        width: `${((tab === "points" ? s.points : s.downloads) / (tab === "points" ? sorted[0].points : sorted[0].downloads)) * 100}%`
                      }} />
                    </div>
                    <span style={{ color: "#F8FAFF", fontWeight: 700, fontSize: 13 }}>
                      {tab === "points" ? s.points.toLocaleString() : s.downloads}
                    </span>
                  </div>
                </td>
                <td><span className={`badge ${s.active ? "badge-green" : "badge-rose"}`}>{s.active ? "Active" : "Inactive"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── AI ASSISTANT PAGE ─────────────────────────────────────────────────────────
const AIAssistantPage = () => {
  const [msgs, setMsgs] = useState([
    { role: "ai", text: "Hi! I'm your PaperVault AI assistant. Ask me about exam patterns, which chapters are important, or get a study plan based on previous year papers!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "Which topics repeat most in DSA?",
    "Give me a 2-week exam study plan",
    "Compare difficulty: 2022 vs 2023 OS paper",
    "Which papers have solved answers?",
  ];

  const send = async (text) => {
    const q = text || input.trim();
    if (!q) return;
    setInput("");
    setMsgs(p => [...p, { role: "user", text: q }]);
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are PaperVault AI, a helpful assistant for college students preparing for exams. 
You have knowledge about previous year question papers, exam patterns, and study strategies. 
The platform has papers for CSE, ECE, ME, CE, IT branches. Keep answers concise, helpful, and encouraging.
Format responses cleanly without excessive markdown.`,
          messages: [{ role: "user", content: q }],
        }),
      });
      const data = await res.json();
      const reply = data.content?.map(c => c.text || "").join("\n") || "Sorry, I couldn't process that.";
      setMsgs(p => [...p, { role: "ai", text: reply }]);
    } catch {
      setMsgs(p => [...p, { role: "ai", text: "I'm having trouble connecting right now. Try asking about exam tips, study plans, or paper analysis!" }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", padding: "32px 32px 0" }}>
      <PageHeader title="AI Study Assistant" sub="Powered by Claude AI • Ask anything about your exams" />

      {/* Suggestions */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {suggestions.map(s => (
          <button key={s} className="btn-ghost btn-sm" onClick={() => send(s)} style={{ fontSize: 12 }}>{s}</button>
        ))}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14, paddingBottom: 16 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
            animation: "fadeUp 0.3s ease",
            maxWidth: "78%",
          }}>
            {m.role === "ai" && (
              <div style={{ alignItems: "center", display: "flex", gap: 8, marginBottom: 6 }}>
                <div style={{ alignItems: "center", background: "linear-gradient(135deg,#5B6EF5,#9B59F0)", borderRadius: "50%", display: "flex", height: 26, justifyContent: "center", width: 26 }}>
                  <Icon name="ai" size={13} color="white" />
                </div>
                <span style={{ color: "#8899BB", fontSize: 11, fontWeight: 600 }}>PaperVault AI</span>
              </div>
            )}
            <div style={{
              background: m.role === "user"
                ? "linear-gradient(135deg, #5B6EF5, #9B59F0)"
                : "rgba(30,48,96,0.55)",
              border: m.role === "ai" ? "1px solid rgba(91,110,245,0.2)" : "none",
              borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
              color: "#F8FAFF",
              fontSize: 14,
              lineHeight: 1.65,
              padding: "12px 18px",
              whiteSpace: "pre-wrap",
            }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: "flex-start", display: "flex", gap: 6, padding: "12px 18px" }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                animation: `pulse-ring 1.2s ${i * 0.2}s infinite`,
                background: "#5B6EF5",
                borderRadius: "50%",
                height: 8,
                width: 8,
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ borderTop: "1px solid rgba(91,110,245,0.1)", display: "flex", gap: 10, padding: "16px 0 24px" }}>
        <input className="input" value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Ask about papers, study plans, exam patterns…" style={{ flex: 1 }} />
        <button className="btn-primary" onClick={() => send()} style={{ flexShrink: 0 }}>
          <Icon name="share" size={15} />
        </button>
      </div>
    </div>
  );
};

// ─── STUDENT PROFILE PAGE ──────────────────────────────────────────────────────
const ProfilePage = ({ student }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const achievements = [
    { icon: "🏆", label: "Top 10 Leaderboard", earned: true },
    { icon: "📥", label: "100+ Downloads", earned: true },
    { icon: "🔥", label: "7-Day Streak", earned: true },
    { icon: "⭐", label: "5-Star Reviewer", earned: false },
    { icon: "📚", label: "50 Bookmarks", earned: false },
    { icon: "🤖", label: "AI Power User", earned: false },
  ];

  return (
    <div style={{ padding: "32px 32px" }}>
      <PageHeader title="My Profile" />
      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "300px 1fr" }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="glass" style={{ padding: 24, textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
              <Avatar initials={student.avatar} size={72} color="#5B6EF5" />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{student.name}</h3>
            <p style={{ color: "#8899BB", fontSize: 13, marginBottom: 16 }}>{student.enroll}</p>
            <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
              {[["Branch", student.branch], ["Year", student.year], ["Points", student.points.toLocaleString()], ["Downloads", student.downloads]].map(([k,v]) => (
                <div key={k} className="glass-sm" style={{ padding: "10px 12px", textAlign: "center" }}>
                  <p style={{ color: "#8899BB", fontSize: 10, textTransform: "uppercase" }}>{k}</p>
                  <p style={{ color: "#F8FAFF", fontWeight: 700, fontSize: 16, marginTop: 2 }}>{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="glass" style={{ padding: 20 }}>
            <p style={{ color: "#8899BB", fontSize: 11, fontWeight: 600, letterSpacing: 0.8, marginBottom: 14, textTransform: "uppercase" }}>Achievements</p>
            <div style={{ display: "grid", gap: 8 }}>
              {achievements.map(a => (
                <div key={a.label} style={{ alignItems: "center", display: "flex", gap: 10, opacity: a.earned ? 1 : 0.4 }}>
                  <span style={{ fontSize: 18 }}>{a.icon}</span>
                  <span style={{ color: a.earned ? "#F8FAFF" : "#8899BB", fontSize: 13 }}>{a.label}</span>
                  {a.earned && <Icon name="check" size={14} color="#10B981" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="glass" style={{ padding: 28 }}>
          <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Account Details</h3>
            <button className={editing ? "btn-primary btn-sm" : "btn-ghost btn-sm"} onClick={() => setEditing(e => !e)}>
              {editing ? "Save Changes" : <><Icon name="edit" size={13} /> Edit</>}
            </button>
          </div>
          <div style={{ display: "grid", gap: 18 }}>
            {[
              ["Full Name", name, setName],
              ["Email", email, setEmail],
            ].map(([lbl, val, setter]) => (
              <div key={lbl}>
                <label style={{ color: "#8899BB", display: "block", fontSize: 12, fontWeight: 600, letterSpacing: 0.6, marginBottom: 6, textTransform: "uppercase" }}>{lbl}</label>
                {editing
                  ? <input className="input" value={val} onChange={e => setter(e.target.value)} />
                  : <p style={{ color: "#F8FAFF", fontSize: 14, padding: "10px 14px", background: "rgba(11,20,38,0.4)", borderRadius: 10 }}>{val}</p>}
              </div>
            ))}
            {[["Enrollment ID", student.enroll], ["Branch", student.branch], ["Year", student.year]].map(([lbl, val]) => (
              <div key={lbl}>
                <label style={{ color: "#8899BB", display: "block", fontSize: 12, fontWeight: 600, letterSpacing: 0.6, marginBottom: 6, textTransform: "uppercase" }}>{lbl}</label>
                <p style={{ color: "#F8FAFF", fontSize: 14, padding: "10px 14px", background: "rgba(11,20,38,0.4)", borderRadius: 10 }}>{val}</p>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(91,110,245,0.1)", marginTop: 28, paddingTop: 24 }}>
            <h4 style={{ color: "#8899BB", fontSize: 12, fontWeight: 600, letterSpacing: 0.8, marginBottom: 16, textTransform: "uppercase" }}>Change Password</h4>
            <div style={{ display: "grid", gap: 12 }}>
              <input className="input" type="password" placeholder="Current password" />
              <input className="input" type="password" placeholder="New password" />
              <input className="input" type="password" placeholder="Confirm new password" />
              <button className="btn-primary" style={{ width: "fit-content" }}>Update Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN PAGES
// ═══════════════════════════════════════════════════════════════════════════════

const AdminDashboard = ({ setPage }) => {
  const stats = [
    { label: "Total Papers",    value: MOCK_PAPERS.length,   icon: "papers",  color: "#5B6EF5", trend: "+2" },
    { label: "Total Students",  value: MOCK_STUDENTS.length, icon: "users",   color: "#2DD4BF", trend: "+1" },
    { label: "Total Downloads", value: "2.8K",               icon: "download",color: "#F59E0B", trend: "+340" },
    { label: "Active Today",    value: 24,                   icon: "chart",   color: "#10B981", trend: null },
  ];

  const recentActivity = [
    { icon: "📥", text: "Arjun downloaded DSA End-Term 2023",     time: "2m ago" },
    { icon: "📌", text: "New paper uploaded: ML Fundamentals",    time: "1h ago" },
    { icon: "👤", text: "New student registered: Rahul Verma",    time: "3h ago" },
    { icon: "⭐", text: "OS paper rated 4.8 by Priya",           time: "5h ago" },
    { icon: "📋", text: "Kavya bookmarked DBMS 2023",             time: "6h ago" },
  ];

  return (
    <div style={{ padding: "32px 32px" }}>
      <PageHeader title="Admin Dashboard" sub="Overview of platform activity"
        action={
          <button className="btn-primary" onClick={() => setPage("managepapers")}>
            <span style={{ alignItems: "center", display: "flex", gap: 6 }}><Icon name="upload" size={15} /> Upload Paper</span>
          </button>
        }
      />

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", marginBottom: 32 }}>
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr 340px" }}>
        {/* Recent Papers */}
        <div>
          <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Recent Papers</h3>
            <button className="btn-ghost btn-sm" onClick={() => setPage("managepapers")}>Manage →</button>
          </div>
          <div className="glass" style={{ overflow: "hidden" }}>
            <table className="table">
              <thead><tr><th>Title</th><th>Branch</th><th>Downloads</th><th>Rating</th></tr></thead>
              <tbody>
                {MOCK_PAPERS.slice(0,6).map(p => (
                  <tr key={p.id}>
                    <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</td>
                    <td><span className="badge badge-indigo">{p.branch}</span></td>
                    <td style={{ color: "#2DD4BF", fontWeight: 600 }}>{p.downloads}</td>
                    <td><StarRating rating={p.rating} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Live Activity</h3>
          <div className="glass" style={{ padding: 0, overflow: "hidden" }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{ alignItems: "center", borderBottom: i < recentActivity.length-1 ? "1px solid rgba(91,110,245,0.08)" : "none", display: "flex", gap: 12, padding: "13px 16px" }}>
                <span style={{ fontSize: 18 }}>{a.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#F8FAFF", fontSize: 12, lineHeight: 1.4 }}>{a.text}</p>
                  <p style={{ color: "#8899BB", fontSize: 11, marginTop: 2 }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MANAGE PAPERS ─────────────────────────────────────────────────────────────
const ManagePapersPage = () => {
  const [papers, setPapers] = useState(MOCK_PAPERS);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ title: "", subject: "", branch: "CSE", semester: "5th", type: "End-Term", year: "2024", pages: "", size: "" });

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2200); };

  const filtered = papers.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) || p.subject.toLowerCase().includes(search.toLowerCase())
  );

  const addPaper = () => {
    if (!form.title || !form.subject) return;
    const newP = { ...form, id: Date.now(), pages: Number(form.pages) || 6, size: form.size || "2.0 MB", downloads: 0, rating: 0, tags: [], uploadedBy: "Admin", date: new Date().toISOString().slice(0,10), year: Number(form.year) };
    setPapers(p => [newP, ...p]);
    setShowAdd(false);
    setForm({ title: "", subject: "", branch: "CSE", semester: "5th", type: "End-Term", year: "2024", pages: "", size: "" });
    showToast("Paper uploaded successfully!");
  };

  const deletePaper = (id) => {
    setPapers(p => p.filter(x => x.id !== id));
    showToast("Paper deleted.");
  };

  return (
    <div style={{ padding: "32px 32px" }}>
      <PageHeader title="Manage Papers" sub={`${papers.length} papers in library`}
        action={
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            <span style={{ alignItems: "center", display: "flex", gap: 6 }}><Icon name="plus" size={15} /> Upload Paper</span>
          </button>
        }
      />

      {/* Search */}
      <div style={{ marginBottom: 20, position: "relative", maxWidth: 360 }}>
        <span style={{ left: 12, position: "absolute", top: "50%", transform: "translateY(-50%)" }}>
          <Icon name="search" size={15} color="#8899BB" />
        </span>
        <input className="input" placeholder="Search papers…" style={{ paddingLeft: 38 }}
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="glass" style={{ overflow: "hidden" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Subject</th>
              <th>Branch</th>
              <th>Year</th>
              <th>Type</th>
              <th>Downloads</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 500 }}>{p.title}</td>
                <td><span className="badge badge-indigo">{p.subject}</span></td>
                <td><span className="badge badge-teal">{p.branch}</span></td>
                <td style={{ color: "#CDD5EE" }}>{p.year}</td>
                <td><span className="badge badge-amber">{p.type}</span></td>
                <td style={{ color: "#2DD4BF", fontWeight: 600 }}>{p.downloads}</td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn-ghost btn-sm" style={{ padding: "5px 10px" }} onClick={() => alert(`Editing: ${p.title}`)}><Icon name="edit" size={13} /></button>
                    <button className="btn-danger btn-sm" onClick={() => deletePaper(p.id)}><Icon name="trash" size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Paper Modal */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Upload New Paper" width={540}>
        <div style={{ display: "grid", gap: 14 }}>
          {[["Paper Title", "title", "text", "e.g. Data Structures & Algorithms"], ["Subject Code", "subject", "text", "e.g. DSA"], ["Pages", "pages", "number", "e.g. 8"], ["File Size", "size", "text", "e.g. 2.4 MB"]].map(([lbl, key, type, ph]) => (
            <div key={key}>
              <label style={{ color: "#8899BB", display: "block", fontSize: 12, fontWeight: 600, letterSpacing: 0.6, marginBottom: 6, textTransform: "uppercase" }}>{lbl}</label>
              <input className="input" type={type} placeholder={ph} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} />
            </div>
          ))}
          {[["Branch", "branch", BRANCHES.slice(1)], ["Semester", "semester", SEMESTERS], ["Type", "type", EXAM_TYPES], ["Year", "year", ["2024","2023","2022","2021"]]].map(([lbl, key, opts]) => (
            <div key={key}>
              <label style={{ color: "#8899BB", display: "block", fontSize: 12, fontWeight: 600, letterSpacing: 0.6, marginBottom: 6, textTransform: "uppercase" }}>{lbl}</label>
              <select className="input" value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}>
                {opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}

          {/* Upload Area */}
          <div style={{ border: "2px dashed rgba(91,110,245,0.3)", borderRadius: 12, cursor: "pointer", padding: "24px", textAlign: "center" }}>
            <Icon name="upload" size={28} color="#5B6EF5" />
            <p style={{ color: "#8899BB", fontSize: 13, marginTop: 8 }}>Click to upload PDF or drag & drop</p>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button className="btn-primary" style={{ flex: 1 }} onClick={addPaper}>Upload Paper</button>
            <button className="btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      </Modal>

      {toast && <Toast msg={toast} onClose={() => setToast("")} />}
    </div>
  );
};

// ─── MANAGE STUDENTS ───────────────────────────────────────────────────────────
const ManageStudentsPage = () => {
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ name: "", enroll: "", email: "", branch: "CSE", year: "2" });

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2200); };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.enroll.includes(search)
  );

  const addStudent = () => {
    if (!form.name || !form.enroll) return;
    const s = { ...form, id: Date.now(), downloads: 0, points: 0, avatar: form.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase(), active: true, year: Number(form.year) };
    setStudents(p => [s, ...p]);
    setShowAdd(false);
    setForm({ name: "", enroll: "", email: "", branch: "CSE", year: "2" });
    showToast("Student added!");
  };

  const toggleStatus = (id) => {
    setStudents(p => p.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const deleteStudent = (id) => {
    setStudents(p => p.filter(s => s.id !== id));
    showToast("Student removed.");
  };

  return (
    <div style={{ padding: "32px 32px" }}>
      <PageHeader title="Manage Students" sub={`${students.length} registered students`}
        action={
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            <span style={{ alignItems: "center", display: "flex", gap: 6 }}><Icon name="plus" size={15} /> Add Student</span>
          </button>
        }
      />

      <div style={{ marginBottom: 20, position: "relative", maxWidth: 360 }}>
        <span style={{ left: 12, position: "absolute", top: "50%", transform: "translateY(-50%)" }}>
          <Icon name="search" size={15} color="#8899BB" />
        </span>
        <input className="input" placeholder="Search by name or enrollment…" style={{ paddingLeft: 38 }}
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="glass" style={{ overflow: "hidden" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Enrollment</th>
              <th>Branch</th>
              <th>Year</th>
              <th>Downloads</th>
              <th>Points</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td>
                  <div style={{ alignItems: "center", display: "flex", gap: 10 }}>
                    <Avatar initials={s.avatar} size={30} />
                    <span style={{ fontWeight: 500 }}>{s.name}</span>
                  </div>
                </td>
                <td style={{ color: "#8899BB", fontFamily: "monospace", fontSize: 12 }}>{s.enroll}</td>
                <td><span className="badge badge-indigo">{s.branch}</span></td>
                <td style={{ color: "#CDD5EE" }}>Year {s.year}</td>
                <td style={{ color: "#2DD4BF", fontWeight: 600 }}>{s.downloads}</td>
                <td style={{ color: "#F59E0B", fontWeight: 600 }}>{s.points.toLocaleString()}</td>
                <td>
                  <button onClick={() => toggleStatus(s.id)} className={`badge ${s.active ? "badge-green" : "badge-rose"}`} style={{ cursor: "pointer", border: "none" }}>
                    {s.active ? "Active" : "Blocked"}
                  </button>
                </td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn-ghost btn-sm" style={{ padding: "5px 10px" }} onClick={() => alert(`Editing ${s.name}`)}><Icon name="edit" size={13} /></button>
                    <button className="btn-danger btn-sm" onClick={() => deleteStudent(s.id)}><Icon name="trash" size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add New Student" width={480}>
        <div style={{ display: "grid", gap: 14 }}>
          {[["Full Name", "name", "text", "e.g. Rahul Verma"], ["Enrollment ID", "enroll", "text", "e.g. 23CS009"], ["College Email", "email", "email", "e.g. rahul@college.edu"]].map(([lbl, key, type, ph]) => (
            <div key={key}>
              <label style={{ color: "#8899BB", display: "block", fontSize: 12, fontWeight: 600, letterSpacing: 0.6, marginBottom: 6, textTransform: "uppercase" }}>{lbl}</label>
              <input className="input" type={type} placeholder={ph} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} />
            </div>
          ))}
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <label style={{ color: "#8899BB", display: "block", fontSize: 12, fontWeight: 600, letterSpacing: 0.6, marginBottom: 6, textTransform: "uppercase" }}>Branch</label>
              <select className="input" value={form.branch} onChange={e => setForm(p => ({ ...p, branch: e.target.value }))}>
                {BRANCHES.slice(1).map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: "#8899BB", display: "block", fontSize: 12, fontWeight: 600, letterSpacing: 0.6, marginBottom: 6, textTransform: "uppercase" }}>Year</label>
              <select className="input" value={form.year} onChange={e => setForm(p => ({ ...p, year: e.target.value }))}>
                {["1","2","3","4"].map(y => <option key={y}>Year {y}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={{ color: "#8899BB", display: "block", fontSize: 12, fontWeight: 600, letterSpacing: 0.6, marginBottom: 6, textTransform: "uppercase" }}>Temporary Password</label>
            <input className="input" type="password" placeholder="Set initial password" />
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button className="btn-primary" style={{ flex: 1 }} onClick={addStudent}>Add Student</button>
            <button className="btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      </Modal>
      {toast && <Toast msg={toast} onClose={() => setToast("")} />}
    </div>
  );
};

// ─── ADMIN ANALYTICS ───────────────────────────────────────────────────────────
const AnalyticsPage = () => {
  const branchDownloads = [
    { branch: "CSE", count: 1460, pct: 92 },
    { branch: "ECE", count: 332,  pct: 54 },
    { branch: "ME",  count: 156,  pct: 32 },
    { branch: "CE",  count: 112,  pct: 24 },
    { branch: "IT",  count: 101,  pct: 21 },
  ];
  const topPapers = [...MOCK_PAPERS].sort((a,b) => b.downloads - a.downloads).slice(0,5);

  return (
    <div style={{ padding: "32px 32px" }}>
      <PageHeader title="Analytics" sub="Platform usage statistics" />
      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr 1fr" }}>

        {/* Downloads by Branch */}
        <div className="glass" style={{ padding: 24 }}>
          <p style={{ color: "#8899BB", fontSize: 12, fontWeight: 600, letterSpacing: 0.8, marginBottom: 20, textTransform: "uppercase" }}>Downloads by Branch</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {branchDownloads.map(b => (
              <div key={b.branch}>
                <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span className="badge badge-indigo">{b.branch}</span>
                  <span style={{ color: "#F8FAFF", fontWeight: 700 }}>{b.count.toLocaleString()}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ background: "linear-gradient(90deg,#5B6EF5,#9B59F0)", width: `${b.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Rated */}
        <div className="glass" style={{ padding: 24 }}>
          <p style={{ color: "#8899BB", fontSize: 12, fontWeight: 600, letterSpacing: 0.8, marginBottom: 20, textTransform: "uppercase" }}>Most Downloaded Papers</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {topPapers.map((p, i) => (
              <div key={p.id} style={{ alignItems: "center", display: "flex", gap: 12 }}>
                <span style={{ color: i === 0 ? "#F59E0B" : "#8899BB", fontWeight: 700, fontSize: 14, minWidth: 24 }}>#{i+1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: "#F8FAFF", fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</p>
                  <p style={{ color: "#8899BB", fontSize: 11 }}>{p.branch} • {p.year}</p>
                </div>
                <span style={{ color: "#2DD4BF", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{p.downloads}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trend (simple) */}
        <div className="glass" style={{ gridColumn: "1/-1", padding: 24 }}>
          <p style={{ color: "#8899BB", fontSize: 12, fontWeight: 600, letterSpacing: 0.8, marginBottom: 20, textTransform: "uppercase" }}>Monthly Download Trend</p>
          <div style={{ alignItems: "flex-end", display: "flex", gap: 12, height: 120 }}>
            {[45,60,40,75,90,110,95,130,145,160,140,180].map((v,i) => (
              <div key={i} style={{ alignItems: "center", display: "flex", flex: 1, flexDirection: "column", gap: 6 }}>
                <div style={{ background: "linear-gradient(180deg, #5B6EF5, #9B59F0)", borderRadius: "4px 4px 0 0", width: "100%", height: `${(v/180)*100}px`, transition: "height 0.8s ease" }} />
                <span style={{ color: "#8899BB", fontSize: 9 }}>M{i+1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SETTINGS PAGE ─────────────────────────────────────────────────────────────
const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    siteName: "PaperVault",
    allowRegistration: true,
    requireApproval: false,
    maxDownloads: 50,
    maintenanceMode: false,
    emailNotifs: true,
  });
  const [toast, setToast] = useState("");

  const Toggle = ({ value, onChange }) => (
    <div onClick={onChange} style={{ background: value ? "#5B6EF5" : "rgba(30,48,96,0.8)", border: `1px solid ${value ? "#5B6EF5" : "rgba(91,110,245,0.25)"}`, borderRadius: 20, cursor: "pointer", height: 24, padding: "3px 4px", position: "relative", transition: "all 0.2s", width: 44 }}>
      <div style={{ background: "white", borderRadius: "50%", height: 16, position: "absolute", top: 3, left: value ? "calc(100% - 22px)" : 4, transition: "left 0.2s", width: 16 }} />
    </div>
  );

  return (
    <div style={{ padding: "32px 32px" }}>
      <PageHeader title="Settings" sub="Platform configuration" />
      <div style={{ display: "grid", gap: 20, maxWidth: 640 }}>
        <div className="glass" style={{ padding: 24 }}>
          <h4 style={{ color: "#8899BB", fontSize: 12, fontWeight: 600, letterSpacing: 0.8, marginBottom: 20, textTransform: "uppercase" }}>General</h4>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ color: "#8899BB", display: "block", fontSize: 12, fontWeight: 600, letterSpacing: 0.6, marginBottom: 6, textTransform: "uppercase" }}>Platform Name</label>
              <input className="input" value={settings.siteName} onChange={e => setSettings(p => ({ ...p, siteName: e.target.value }))} />
            </div>
            <div>
              <label style={{ color: "#8899BB", display: "block", fontSize: 12, fontWeight: 600, letterSpacing: 0.6, marginBottom: 6, textTransform: "uppercase" }}>Max Downloads per Student</label>
              <input className="input" type="number" value={settings.maxDownloads} onChange={e => setSettings(p => ({ ...p, maxDownloads: Number(e.target.value) }))} />
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: 24 }}>
          <h4 style={{ color: "#8899BB", fontSize: 12, fontWeight: 600, letterSpacing: 0.8, marginBottom: 20, textTransform: "uppercase" }}>Access Controls</h4>
          {[
            ["Allow New Registrations", "allowRegistration"],
            ["Require Admin Approval for New Students", "requireApproval"],
            ["Maintenance Mode", "maintenanceMode"],
            ["Email Notifications", "emailNotifs"],
          ].map(([lbl, key]) => (
            <div key={key} style={{ alignItems: "center", display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ color: "#F8FAFF", fontSize: 14 }}>{lbl}</span>
              <Toggle value={settings[key]} onChange={() => setSettings(p => ({ ...p, [key]: !p[key] }))} />
            </div>
          ))}
        </div>

        <button className="btn-primary" style={{ width: "fit-content" }} onClick={() => { setToast("Settings saved!"); setTimeout(() => setToast(""), 2000); }}>Save Settings</button>
      </div>
      {toast && <Toast msg={toast} onClose={() => setToast("")} />}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// LOGIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════
const LoginPage = ({ onLogin }) => {
  const [role, setRole] = useState("student");
  const [loginType, setLoginType] = useState("enroll"); // enroll | email
  const [enroll, setEnroll] = useState("");
  const [email, setEmail]   = useState("");
  const [pass, setPass]     = useState("");
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);

    if (role === "admin") {
      if (email === "admin@college.edu" && pass === "admin123") return onLogin("admin", null);
      return setError("Invalid admin credentials. Try admin@college.edu / admin123");
    }

    if (loginType === "enroll") {
      const student = MOCK_STUDENTS.find(s => s.enroll === enroll);
      if (!student) return setError("Enrollment ID not found.");
      if (pass !== "password") return setError("Wrong password. (Hint: 'password')");
      if (!student.active) return setError("Your account is blocked. Contact admin.");
      return onLogin("student", student);
    } else {
      const student = MOCK_STUDENTS.find(s => s.email === email);
      if (!student) return setError("Email not found.");
      if (pass !== "password") return setError("Wrong password. (Hint: 'password')");
      return onLogin("student", student);
    }
  };

  return (
    <div style={{ alignItems: "center", display: "flex", justifyContent: "center", minHeight: "100vh", padding: 24, position: "relative" }}>
      {/* Background decoration */}
      <div style={{ filter: "blur(80px)", height: 400, left: "10%", opacity: 0.15, position: "fixed", top: "10%", width: 400, background: "radial-gradient(circle, #5B6EF5, transparent)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ filter: "blur(80px)", height: 300, opacity: 0.1, position: "fixed", right: "10%", bottom: "15%", width: 300, background: "radial-gradient(circle, #9B59F0, transparent)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ animation: "fadeUp 0.5s ease", maxWidth: 440, width: "100%" }}>
        {/* Logo */}
        <div style={{ marginBottom: 36, textAlign: "center" }}>
          <div style={{ alignItems: "center", background: "linear-gradient(135deg,#5B6EF5,#9B59F0)", borderRadius: 18, display: "inline-flex", height: 64, justifyContent: "center", marginBottom: 16, width: 64, boxShadow: "0 8px 32px rgba(91,110,245,0.4)" }}>
            <Icon name="book" size={32} color="white" />
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 900, marginBottom: 6 }} className="grad-text">PaperVault</h1>
          <p style={{ color: "#8899BB", fontSize: 14 }}>Your college exam paper library</p>
        </div>

        <div className="glass" style={{ padding: 32 }}>
          {/* Role Switch */}
          <div style={{ background: "rgba(11,20,38,0.6)", borderRadius: 10, display: "flex", marginBottom: 24, padding: 4 }}>
            {[["student", "Student"], ["admin", "Administrator"]].map(([k, v]) => (
              <button key={k} onClick={() => { setRole(k); setError(""); }}
                style={{ background: role === k ? "linear-gradient(135deg,#5B6EF5,#9B59F0)" : "transparent", border: "none", borderRadius: 8, color: role === k ? "white" : "#8899BB", cursor: "pointer", flex: 1, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, padding: "9px 0", transition: "all 0.2s" }}>
                {k === "admin" ? <><Icon name="admin" size={13} /> </> : <><Icon name="user" size={13} /> </>}{v}
              </button>
            ))}
          </div>

          {role === "student" && (
            <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
              {[["enroll", "Enrollment ID"], ["email", "College Email"]].map(([k, v]) => (
                <button key={k} onClick={() => setLoginType(k)}
                  className={loginType === k ? "btn-primary btn-sm" : "btn-ghost btn-sm"}
                  style={{ flex: 1 }}>{v}</button>
              ))}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {role === "student" && loginType === "enroll" ? (
              <div>
                <label style={{ color: "#8899BB", display: "block", fontSize: 11, fontWeight: 600, letterSpacing: 0.8, marginBottom: 6, textTransform: "uppercase" }}>Enrollment ID</label>
                <div style={{ position: "relative" }}>
                  <span style={{ left: 12, position: "absolute", top: "50%", transform: "translateY(-50%)" }}><Icon name="user" size={15} color="#8899BB" /></span>
                  <input className="input" value={enroll} onChange={e => setEnroll(e.target.value)}
                    placeholder="e.g. 22CS001" style={{ paddingLeft: 38 }}
                    onKeyDown={e => e.key === "Enter" && handleLogin()} />
                </div>
                <p style={{ color: "#8899BB", fontSize: 11, marginTop: 5 }}>Try: 22CS001 or 22EC002</p>
              </div>
            ) : (
              <div>
                <label style={{ color: "#8899BB", display: "block", fontSize: 11, fontWeight: 600, letterSpacing: 0.8, marginBottom: 6, textTransform: "uppercase" }}>
                  {role === "admin" ? "Admin Email" : "College Email"}
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{ left: 12, position: "absolute", top: "50%", transform: "translateY(-50%)" }}><Icon name="mail" size={15} color="#8899BB" /></span>
                  <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder={role === "admin" ? "admin@college.edu" : "you@college.edu"}
                    style={{ paddingLeft: 38 }}
                    onKeyDown={e => e.key === "Enter" && handleLogin()} />
                </div>
              </div>
            )}

            <div>
              <label style={{ color: "#8899BB", display: "block", fontSize: 11, fontWeight: 600, letterSpacing: 0.8, marginBottom: 6, textTransform: "uppercase" }}>Password</label>
              <div style={{ position: "relative" }}>
                <span style={{ left: 12, position: "absolute", top: "50%", transform: "translateY(-50%)" }}><Icon name="lock" size={15} color="#8899BB" /></span>
                <input className="input" type="password" value={pass} onChange={e => setPass(e.target.value)}
                  placeholder="Enter password" style={{ paddingLeft: 38 }}
                  onKeyDown={e => e.key === "Enter" && handleLogin()} />
              </div>
              {role === "student" && <p style={{ color: "#8899BB", fontSize: 11, marginTop: 5 }}>Hint: password</p>}
              {role === "admin" && <p style={{ color: "#8899BB", fontSize: 11, marginTop: 5 }}>Hint: admin123</p>}
            </div>

            {error && (
              <div style={{ alignItems: "center", background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)", borderRadius: 8, color: "#F43F5E", display: "flex", fontSize: 13, gap: 8, padding: "10px 12px" }}>
                <Icon name="x" size={14} color="#F43F5E" /> {error}
              </div>
            )}

            <button className="btn-primary" style={{ marginTop: 4, padding: "12px 0", fontSize: 15 }} onClick={handleLogin} disabled={loading}>
              {loading ? "Signing in…" : `Sign In as ${role === "admin" ? "Administrator" : "Student"}`}
            </button>
          </div>

          {role === "student" && (
            <p style={{ color: "#8899BB", fontSize: 12, marginTop: 20, textAlign: "center" }}>
              No account? Contact your college admin to register.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [auth, setAuth]       = useState(null); // { role, student }
  const [page, setPage]       = useState("dashboard");
  const [bookmarks, setBookmarks] = useState([3, 7]); // default bookmarked

  const handleLogin = (role, student) => {
    setAuth({ role, student });
    setPage(role === "admin" ? "admindash" : "dashboard");
  };

  const handleLogout = () => {
    setAuth(null);
    setPage("dashboard");
  };

  if (!auth) return (
    <>
      <GlobalStyle />
      <LoginPage onLogin={handleLogin} />
    </>
  );

  if (auth.role === "admin") {
    const pages = {
      admindash:       <AdminDashboard setPage={setPage} />,
      managepapers:    <ManagePapersPage />,
      managestudents:  <ManageStudentsPage />,
      analytics:       <AnalyticsPage />,
      settings:        <AdminSettingsPage />,
    };
    return (
      <>
        <GlobalStyle />
        <Layout sidebar={<AdminSidebar page={page} setPage={setPage} onLogout={handleLogout} />}>
          {pages[page] || pages.admindash}
        </Layout>
      </>
    );
  }

  // Student
  const student = auth.student;
  const pages = {
    dashboard:  <StudentDashboard student={student} setPage={setPage} />,
    papers:     <PapersPage bookmarks={bookmarks} setBookmarks={setBookmarks} />,
    bookmarks:  <BookmarksPage bookmarks={bookmarks} setBookmarks={setBookmarks} />,
    compare:    <ComparePage />,
    leaderboard:<LeaderboardPage currentStudent={student} />,
    ai:         <AIAssistantPage />,
    profile:    <ProfilePage student={student} />,
  };

  return (
    <>
      <GlobalStyle />
      <Layout sidebar={<StudentSidebar page={page} setPage={setPage} student={student} onLogout={handleLogout} />}>
        {pages[page] || pages.dashboard}
      </Layout>
    </>
  );
}
