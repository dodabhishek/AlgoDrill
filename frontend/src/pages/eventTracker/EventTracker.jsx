import React, { useState, useEffect } from "react";
import CustomCalendar from "./newPage.jsx";
import axios from 'axios';
import leetcodeLogo from '../assets/leetcode.png';
import atcoderLogo from '../assets/atcoder.webp';
import codechefLogo from '../assets/codechef.png';
import codeforcesLogo from '../assets/codeforces.png';
import gfgLogo from '../assets/gfg.png';

const platformIcons = {
  "leetcode.com": leetcodeLogo,
  "atcoder.jp": atcoderLogo,
  "codechef.com": codechefLogo,
  "codeforces.com": codeforcesLogo,
  "geeksforgeeks.org": gfgLogo,
};

function formatDateTime(dt) {
  const date = new Date(dt);
  return date.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function EventTracker() {
  const [mockContests, setMockContests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/auth/calender');
        const formatted = res.data.map(contest => ({
          id: contest.id || contest.pk || contest.href,
          event: contest.event,
          start: contest.start,
          end: contest.end,
          startFormatted: formatDateTime(contest.start),
          endFormatted: formatDateTime(contest.end),
          href: contest.href,
          host: contest.host,
          platformIcon: platformIcons[contest.host] || null,
        }));
        setMockContests(formatted);
      } catch (error) {
        console.error("Error fetching contests:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  const filteredContests = filter === "all"
    ? mockContests
    : mockContests.filter(c => c.host === filter);

  return (
    <div className="min-h-screen [background:oklch(20.84%_0.008_17.911)] p-8 flex flex-col items-center justify-center">
      <div className="flex flex-row w-full max-w-7xl gap-8 h-[800px]">
        {/* Left: Upcoming Contests */}
        <div className="flex-1 max-w-md h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-2 text-white">Upcoming Contests</h2>
          <p className="mb-4 text-gray-400">Don't miss scheduled events</p>
          <select
            className="mb-4 p-2 rounded"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="all">All Platforms</option>
            <option value="leetcode.com">LeetCode</option>
            <option value="atcoder.jp">AtCoder</option>
            <option value="codechef.com">CodeChef</option>
            <option value="codeforces.com">Codeforces</option>
            <option value="geeksforgeeks.org">GeeksforGeeks</option>
          </select>
          <div className="flex-1 overflow-y-auto pr-2">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            ) : filteredContests.length === 0 ? (
              <div className="text-gray-400 text-center mt-8">No upcoming contests found.</div>
            ) : (
              filteredContests.map(contest => {
                const now = new Date();
                const isOngoing = new Date(contest.start) <= now && now <= new Date(contest.end);
                const duration = Math.round((new Date(contest.end) - new Date(contest.start)) / 60000);
                return (
                  <div
                    key={contest.id}
                    className={`bg-[#23242a] rounded-lg p-4 mb-4 border ${isOngoing ? "border-green-500 border-2" : "border-[#23242a]"}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {contest.platformIcon && (
                        <img
                          src={contest.platformIcon}
                          alt={contest.host}
                          className="w-6 h-6 inline-block mr-2"
                        />
                      )}
                      <span className="font-semibold text-white">{contest.event}</span>
                      {isOngoing && <span className="text-green-400 ml-2">Ongoing</span>}
                    </div>
                    <div className="text-gray-400 text-sm mb-2">
                      <span className="mr-2">{contest.startFormatted}</span>
                      <span> - {contest.endFormatted}</span>
                    </div>
                    <div className="text-gray-400 text-xs mb-2">
                      Duration: {duration} min
                    </div>
                    <a href={contest.href} className="text-blue-400 text-sm flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                      </svg>
                      Add to Calendar
                    </a>
                  </div>
                );
              })
            )}
          </div>
        </div>
        {/* Right: Calendar */}
        <div className="flex-1 flex justify-end h-full">
          <div className="w-full h-full flex flex-col">
            <CustomCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}