import React from "react";
import CustomCalendar from "./eventTracker/newPage.jsx";

const mockContests = [
  {
    id: 1,
    date: "2025-06-11",
    time: "8:00 PM - 10:00 PM",
    title: "Starters 190",
    platformIcon: "🥇",
    calendarLink: "#"
  },
  {
    id: 2,
    date: "2025-06-12",
    time: "8:05 PM - 10:05 PM",
    title: "Codeforces Round 1030 (Div. 2)",
    platformIcon: "🏛️",
    calendarLink: "#"
  },
  {
    id: 3,
    date: "2025-06-14",
    time: "5:30 PM - 7:10 PM",
    title: "AtCoder Beginner Contest 410",
    platformIcon: "🤖",
    calendarLink: "#"
  },
  {
    id: 4,
    date: "2025-06-15",
    time: "8:00 AM - 9:30 AM",
    title: "Weekly Contest 454",
    platformIcon: "🧩",
    calendarLink: "#"
  },
  {
    id: 5,
    date: "2025-06-15",
    time: "2:35 PM - 4:35 PM",
    title: "Codeforces Round (Div. 2)",
    platformIcon: "🏛️",
    calendarLink: "#"
  }
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen [background:oklch(20.84%_0.008_17.911)] p-8 flex flex-col items-center justify-center">
      <div className="flex flex-row w-full max-w-7xl gap-8">
        {/* Left: Upcoming Contests */}
        <div className="flex-1 max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-white">Upcoming Contests</h2>
          <p className="mb-4 text-gray-400">Don't miss scheduled events</p>
          {mockContests.map(contest => (
            <div key={contest.id} className="bg-[#23242a] rounded-lg p-4 mb-4 border border-[#23242a]">
              <div className="flex items-center gap-2 mb-1">
                <span>{contest.platformIcon}</span>
                <span className="font-semibold text-white">{contest.title}</span>
              </div>
              <div className="text-gray-400 text-sm mb-2">
                <span className="mr-2">{contest.date}</span>
                <span>{contest.time}</span>
              </div>
              <a href={contest.calendarLink} className="text-blue-400 text-sm flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                </svg>
                Add to Calendar
              </a>
            </div>
          ))}
        </div>
        {/* Right: Calendar */}
        <div className="flex-1 flex justify-end">
          <div className="w-full">
            <CustomCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}
