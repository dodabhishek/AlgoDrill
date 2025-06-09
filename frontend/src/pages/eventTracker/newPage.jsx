import React, { useState } from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CustomCalendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startingDay = firstDayOfMonth.getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const generateCalendarDays = () => {
    const calendar = [];
    let dayCounter = 1;

    // 6 rows for max coverage
    for (let week = 0; week < 6; week++) {
      const row = [];

      for (let day = 0; day < 7; day++) {
        const cellIndex = week * 7 + day;
        if (cellIndex >= startingDay && dayCounter <= daysInMonth) {
          const isToday =
            dayCounter === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          row.push(
            <div
              key={cellIndex}
              className={`
                relative h-16 rounded-xl flex flex-col items-center justify-start p-1
                border border-gray-700
                bg-gray-800 text-white
                shadow-lg
                transition-all duration-200
                cursor-pointer
                group
                ${isToday ? "ring-2 ring-green-400 shadow-green-500/40" : ""}
                hover:bg-green-500 hover:text-white hover:scale-105 hover:shadow-2xl
                active:scale-95
              `}
              style={{
                perspective: "400px",
              }}
              onClick={() => alert(`You clicked ${dayCounter}/${month + 1}/${year}`)}
            >
              <span className="font-bold text-lg drop-shadow">{dayCounter}</span>
              <div className="flex flex-col items-center mt-1 w-full">
                {/* Add event badges here */}
              </div>
            </div>
          );
          dayCounter++;
        } else {
          row.push(<div key={cellIndex} className="h-16"></div>);
        }
      }
      calendar.push(<div key={week}>{row}</div>);
    }

    return calendar;
  };

  const changeMonth = (offset) => {
    const newDate = new Date(year, month + offset, 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="max-w-xl mx-auto [background:oklch(20.84%_0.008_17.911)] rounded-2xl shadow-2xl p-6">
      <div className="flex items-center justify-between mb-2">
        <button onClick={() => changeMonth(-1)} className="text-blue-600">&lt;</button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString('default', { month: 'long' })} {year}
        </h2>
        <button onClick={() => changeMonth(1)} className="text-blue-600">&gt;</button>
      </div>

      <div>
        {/* Weekdays Header */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-gray-400 font-semibold">{day}</div>
          ))}
        </div>
        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {generateCalendarDays()}
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
