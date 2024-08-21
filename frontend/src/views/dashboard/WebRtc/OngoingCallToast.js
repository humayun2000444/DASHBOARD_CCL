import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MicIcon from "@mui/icons-material/Mic";

const OngoingCallToast = ({ callerName, phoneNumber, toastId }) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isToastVisible, setIsToastVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!isToastVisible) return;

    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isToastVisible]);

  const handleEndCall = () => {
    console.log("End Call Clicked - Toast ID:", toastId);
    setIsToastVisible(false);
    toast.remove(toastId);
  };

  const handleMute = () => {
    console.log("Muted - Toast ID:", toastId, "Muted State:", !isMuted);
    setIsMuted((prev) => !prev); // Toggle mute state
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  if (!isToastVisible) return null;

  return (
    <div
      style={{
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
            pointerEvents: "none", // Prevent event interference
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
          gap: "10px", // Reducing the gap between buttons
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
            width: "40px", // Ensures both buttons have the same width
            height: "40px", // Ensures both buttons have the same height
          }}
          onClick={handleMute} // Toggle mute
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
            width: "40px", // Ensures both buttons have the same width
            height: "40px", // Ensures both buttons have the same height
          }}
          onClick={handleEndCall} // End the call
        >
          <PhoneDisabledIcon style={{ pointerEvents: "none" }} />
        </button>
      </div>
    </div>
  );
};

export default OngoingCallToast;

// import React, { useState, useEffect } from "react";
// import CustomToast from "./CustomToast"; // Import the custom toast component

// const OngoingCallToast = () => {
//   const [isToastVisible, setIsToastVisible] = useState(true);
//   const [callDuration, setCallDuration] = useState(0);
//   const [isMuted, setIsMuted] = useState(false);

//   useEffect(() => {
//     if (!isToastVisible) return;

//     const timer = setInterval(() => {
//       setCallDuration((prev) => prev + 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [isToastVisible]);

//   const handleEndCall = () => {
//     setIsToastVisible(false);
//     console.log("Call Ended");
//     // Additional logic to end the call
//   };

//   const handleMute = () => {
//     setIsMuted((prev) => !prev);
//     console.log("Mute Toggled");
//     // Additional logic to mute/unmute
//   };

//   return (
//     <div>
//       {/* Your other components and content here */}

//       <CustomToast
//         callerName="John Doe"
//         phoneNumber="123-456-7890"
//         onEndCall={handleEndCall}
//         onMute={handleMute}
//         isVisible={isToastVisible}
//         callDuration={callDuration}
//         isMuted={isMuted}
//       />
//     </div>
//   );
// };

// export default OngoingCallToast;
