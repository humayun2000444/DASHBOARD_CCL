import React, { useEffect, useState } from "react";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MicIcon from "@mui/icons-material/Mic";

const ToasterOngoing = ({ callerName, phoneNumber, onEndCall}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };


  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "10%",
        zIndex: 999,
        transform: "translate(-50%,-10%)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "10px 20px",
        borderRadius: "10px",
        backgroundColor: "#2c2c38",
        color: "white",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "350px",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <AccountCircleIcon
          style={{
            width: "50px",
            height: "50px",
            color: "#fff",
            marginRight: "10px",
            pointerEvents: "none",
          }}
        />
        <div>
          <p style={{ margin: 0, fontWeight: "bold", fontSize: "16px" }}>
            {callerName}
          </p>
          <p style={{ margin: 0, fontSize: "14px", color: "#ccc" }}>
            {phoneNumber}
          </p>
          <p style={{ margin: 0, fontSize: "14px", color: "#ccc" }}>
            {formatDuration(callDuration)}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexGrow: 1,
          gap: "10px",
        }}
      >
        <button
          style={{
            backgroundColor: isMuted ? "#8e8e8e" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
          }}
          onClick={handleMute}
        >
          <MicIcon style={{ pointerEvents: "none" }} />
        </button>
        <button
          style={{
            backgroundColor: "#ff4b4b",
            color: "white",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
          }}
          onClick={onEndCall}
        >
          <PhoneDisabledIcon style={{ pointerEvents: "none" }} />
        </button>
      </div>
    </div>
  );
};

export default ToasterOngoing;