

import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      title: "Meeting with Client",
      start: new Date(2025, 2, 20, 10, 0),
      end: new Date(2025, 2, 20, 11, 30),
    },
    {
      title: "Project Deadline",
      start: new Date(2025, 2, 25),
      end: new Date(2025, 2, 25),
    },
  ]);

  return (
    <div className="h-[450px]  shadow-md p-3 dark:bg-darkCard bg-lightCard text-lightTitle dark:text-darkTitle rounded-md">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default CalendarComponent;

 