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

    // Calculate previous and next month info
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;

    // 6 rows for max coverage
    for (let week = 0; week < 6; week++) {
      const row = [];

      for (let day = 0; day < 7; day++) {
        const cellIndex = week * 7 + day;
        // First row: fill with previous month's days before the 1st
        if (week === 0 && day < startingDay) {
          const prevDay = daysInPrevMonth - (startingDay - day - 1);
          row.push(
            <div
              key={`prev-${cellIndex}`}
              className="w-[120px] h-[120px] border border-gray-700 text-gray-500 bg-gray-900 flex flex-col items-center justify-start p-1 rounded-xl"
            >
              <span className="font-bold text-lg drop-shadow">{prevDay}</span>
            </div>
          );
        } else if (dayCounter > daysInMonth) {
          // Last row: fill with next month's days after the last day
          if (week === 5 || (week < 5 && dayCounter > daysInMonth && row.length < 7)) {
            const nextDay = dayCounter - daysInMonth;
            row.push(
              <div
                key={`next-${cellIndex}`}
                className="w-[120px] h-[120px] border border-gray-700 text-gray-500 bg-gray-900 flex flex-col items-center justify-start p-1 rounded-xl"
              >
                <span className="font-bold text-lg drop-shadow">{nextDay}</span>
              </div>
            );
            dayCounter++;
          }
        } else {
          const isToday =
            dayCounter === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          row.push(
            <div
              key={cellIndex}
              className={`
                relative w-[120px] h-[120px] border border-gray-700 rounded-xl flex flex-col items-center justify-start p-1
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
        }
      }
      calendar.push(...row); // Flatten: push all day cells directly
    }

    return calendar;
  };

  const changeMonth = (offset) => {
    const newDate = new Date(year, month + offset, 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="w-[888px] h-[760px] mx-auto rounded-2xl shadow-2xl p-6">
      <div className="flex items-center justify-between mb-2">
        <button onClick={() => changeMonth(-1)} className="text-blue-600">&lt;</button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString('default', { month: 'long' })} {year}
        </h2>
        <button onClick={() => changeMonth(1)} className="text-blue-600">&gt;</button>
      </div>

      <div>
        {/* Weekdays Header */}
        <div className="grid grid-cols-7 gap-6 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-gray-400 font-semibold">{day}</div>
          ))}
        </div>
        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-x-10 gap-y-4">
          {generateCalendarDays()}
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
