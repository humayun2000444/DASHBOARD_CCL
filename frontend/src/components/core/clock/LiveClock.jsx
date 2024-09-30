import React, { useState, useEffect } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Clock icon
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Calendar icon

const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date()); // Update every second
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  // Format time: HH:MM:SS AM/PM
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Format date: DD MMM, YYYY
  const formattedDate = currentTime.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: "1px solid #D1E4F3",
      borderRadius: '12px',
      marginLeft: "12px",
      overflow: 'hidden',
      width: "100%",
      backgroundColor: "#FFFFFF",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Light shadow
    }}>
      {/* Time section */}
      <div style={{
        borderRight: "1px solid #D1E4F3",
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 16px', // Adjusted padding for better spacing
        backgroundColor: "#FFFFFF",
        color: "#1d94ab", // Primary color for text
        fontSize: "16px", // Responsive font size
        fontFamily: "'Inter', sans-serif",
        fontWeight: "500",
      }}>
        <AccessTimeIcon style={{ fontSize: "20px", marginRight: '8px', color: "#9CA3AF" }} />
        {formattedTime}
      </div>

      {/* Date section */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 16px', // Adjusted padding for better spacing
        backgroundColor: "#FFFFFF",
        color: "#1d94ab", // Primary color for text
        fontSize: "16px", // Responsive font size
        fontFamily: "'Inter', sans-serif",
        fontWeight: "500",
      }}>
        <CalendarTodayIcon style={{ fontSize: "20px", marginRight: '8px', color: "#9CA3AF" }} />
        {formattedDate}
      </div>
    </div>
  );
};

export default LiveClock;
