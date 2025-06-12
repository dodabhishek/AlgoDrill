import React from 'react';
import { Moon } from 'lucide-react';
import logo from '../assets/cudolio.png';
export default function Navbar() {
  return (
    <nav className="w-full bg-[#18181b] px-6 py-2 flex items-center justify-between shadow-md">
      {/* Logo and Brand */}
      <div className="flex items-center gap-2">
        {/* Logo image */}
        <img src={logo} alt="Cudolio Logo" className="w-10 h-10 object-contain" />
        <span className="text-2xl font-bold text-white">
          Cud<span className="text-orange-500">olio</span>
        </span>
      </div>
      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <a href="#" className="text-gray-200 font-semibold hover:text-white transition">Leaderboard</a>
        <a href="#" className="text-gray-200 font-semibold hover:text-white transition">Question Tracker</a>
        <a href="#" className="text-orange-500 font-semibold transition border-b-2 border-orange-500 pb-1">Event Tracker</a>
        <a href="#" className="text-gray-200 font-semibold hover:text-white transition">Profile Tracker</a>
      </div>
      {/* Right Side: Dark Mode Toggle & Avatar */}
      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 hover:bg-gray-700 transition">
          <Moon className="text-gray-300" size={22} />
        </button>
        {/* Placeholder for user avatar */}
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-8 h-8 rounded-full border-2 border-gray-600 object-cover" />
      </div>
    </nav>
  );
}