import React, { useState } from "react";

const eventMap = {
  "2025-06-01": [
    { id: 1, label: "Weekly Contest", color: "bg-gray-700" },
    { id: 2, label: "AtCoder Reg", color: "bg-gray-700" },
    { id: 3, label: "GFG Weekly", color: "bg-green-700" }
  ],
  "2025-06-03": [
    { id: 4, label: "Educational C", color: "bg-gray-700" }
  ],
  "2025-06-04": [
    { id: 5, label: "Starters 189", color: "bg-gray-700" }
  ]
};

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay(); // 0 = Sun, 6 = Sat
}

export default function CustomCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)); // June 2025

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Prepare grid
  const calendar = [];
  let week = [];

  // Leading blanks
  for (let i = 0; i < firstDay; i++) week.push(null);

  for (let d = 1; d <= daysInMonth; d++) {
    week.push(new Date(year, month, d));
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }

  // Fill remaining days
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    calendar.push(week);
  }

  const today = new Date();
  const isToday = (date) =>
    date &&
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#181A20] rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="text-white text-2xl px-3 hover:text-gray-400">&lt;</button>
        <h2 className="text-2xl font-bold text-white">
          {monthNames[month]} {year}
        </h2>
        <button onClick={nextMonth} className="text-white text-2xl px-3 hover:text-gray-400">&gt;</button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 bg-gray-800 rounded-t-md">
        {daysShort.map((day) => (
          <div key={day} className="text-center py-2 text-gray-400 font-medium bg-[#23242a]">
            {day}
          </div>
        ))}
      </div>

      {/* Dynamic week-wise rows */}
      <div className="flex flex-col">
        {calendar.map((week, wIdx) => (
          <div key={wIdx} className="grid grid-cols-7 gap-px">
            {week.map((date, idx) => {
              if (!date) return <div key={idx} className="bg-[#23242a] h-24"></div>;
              const dateStr = date.toISOString().split("T")[0];
              const events = eventMap[dateStr] || [];

              return (
                <div
                  key={idx}
                  className={`
                    bg-[#23242a] h-24 p-1 flex flex-col border border-gray-800
                    ${isToday(date) ? "border-2 border-green-400" : ""}
                  `}
                >
                  <span className={`text-sm font-semibold mb-1 ${isToday(date) ? "text-green-400" : "text-white"}`}>
                    {date.getDate()}
                  </span>
                  <div className="flex flex-col gap-1 overflow-y-auto scrollbar-hide">
                    {events.map((e) => (
                      <span
                        key={e.id}
                        className={`text-xs px-2 py-0.5 rounded-md truncate ${e.color} text-white`}
                        title={e.label}
                      >
                        {e.label}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
