import React from "react";

const UsageData = ({ color, text }) => {
  return (
    <div>
      <div
        style={{
          backgroundColor: color,
          height: "20px",
          width: "20px",
          borderRadius: "3px",
        }}
      ></div>
      <p>{text}</p>
    </div>
  );
};

export default UsageData;
