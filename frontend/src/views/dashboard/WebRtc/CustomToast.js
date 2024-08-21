import React from "react";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import MicIcon from "@mui/icons-material/Mic";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const CustomToast = ({
  callerName,
  phoneNumber,
  onEndCall,
  onMute,
  isVisible,
  callDuration,
  isMuted,
}) => {
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
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
        zIndex: 1000,
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
          }}
        />
        <div>
          <p style={{ margin: 0, fontWeight: "bold", fontSize: "16px" }}>
            {callerName} WEBRTC
          </p>
          <p style={{ margin: 0, fontSize: "14px", color: "#ccc" }}>
            {phoneNumber} 123424
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
          onClick={onMute}
        >
          <MicIcon />
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
          <PhoneDisabledIcon />
        </button>
      </div>
    </div>
  );
};

export default CustomToast;
