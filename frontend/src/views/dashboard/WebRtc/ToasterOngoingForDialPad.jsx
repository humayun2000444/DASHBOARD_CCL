// import React, { useEffect, useState } from "react";
// import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import MicIcon from "@mui/icons-material/Mic";
// import CallState from "./CallState";
//
// const ToasterOngoing = ({ callerName, phoneNumber, onEndCall}) => {
//   const [isMuted, setIsMuted] = useState(false);
//   const [callDuration, setCallDuration] = useState(0);
//
//   const handleMute = () => {
//     setIsMuted(!isMuted);
//   };
//
//   useEffect(() => {
//     if(CallState.getOutgoingCallStatus() === "connected"){
//       const timer = setInterval(() => {
//         setCallDuration((prev) => prev + 1);
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//
//   }, []);
//
//   const formatDuration = (seconds) => {
//     if(CallState.getOutgoingCallStatus() === "connected")
//     {
//
//       const minutes = Math.floor(seconds / 60);
//       const remainingSeconds = seconds % 60;
//       return `${minutes < 10 ? "0" : ""}${minutes}:${
//         remainingSeconds < 10 ? "0" : ""
//       }${remainingSeconds}`;
//     }
//     else return "Dialing...";
//   };
//
//
//   return (
//     <div
//       style={{
//         position: "absolute",
//         left: "50%",
//         top: "10%",
//         zIndex: 999,
//         transform: "translate(-50%,-10%)",
//         display: "flex",
//         flexDirection: "row",
//         alignItems: "center",
//         padding: "10px 20px",
//         borderRadius: "10px",
//         backgroundColor: "#2c2c38",
//         color: "white",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//         width: "350px",
//         justifyContent: "space-between",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           flexGrow: 1,
//         }}
//       >
//         <AccountCircleIcon
//           style={{
//             width: "50px",
//             height: "50px",
//             color: "#fff",
//             marginRight: "10px",
//             pointerEvents: "none",
//           }}
//         />
//         <div>
//           <p style={{ margin: 0, fontWeight: "bold", fontSize: "16px" }}>
//             {callerName}
//           </p>
//           <p style={{ margin: 0, fontSize: "14px", color: "#ccc" }}>
//             {phoneNumber}
//           </p>
//           <p style={{ margin: 0, fontSize: "14px", color: "#ccc" }}>
//             {formatDuration(callDuration)}
//           </p>
//         </div>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexGrow: 1,
//           gap: "10px",
//         }}
//       >
//         <button
//           style={{
//             backgroundColor: isMuted ? "#8e8e8e" : "#4CAF50",
//             color: "white",
//             border: "none",
//             borderRadius: "50%",
//             cursor: "pointer",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             width: "40px",
//             height: "40px",
//           }}
//           onClick={handleMute}
//         >
//           <MicIcon style={{ pointerEvents: "none" }} />
//         </button>
//         <button
//           style={{
//             backgroundColor: "#ff4b4b",
//             color: "white",
//             border: "none",
//             borderRadius: "50%",
//             cursor: "pointer",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             width: "40px",
//             height: "40px",
//           }}
//           onClick={onEndCall}
//         >
//           <PhoneDisabledIcon style={{ pointerEvents: "none" }} />
//         </button>
//       </div>
//     </div>
//   );
// };
//
// export default ToasterOngoing;


import React, { useEffect, useState } from "react";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MicIcon from "@mui/icons-material/Mic";
import CallState from "./CallState";
import {useContact} from "./ContactContext";

const ToasterOngoing = ({ phoneNumber, onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState(CallState.getOutgoingCallStatus());

  const { contacts } = useContact();
  const [displayName, setDisplayName] = useState(phoneNumber);

  // Get the callerName from CallState
  const callerName = CallState.getIncomingUser();
  if(!phoneNumber) phoneNumber = CallState.getPhoneNumber();
  // useEffect(() => {
  //   // Find contact where the phone matches the callerName
  //   const contact = contacts.find(contact => contact.phone === phoneNumber);
  //   if (contact) {
  //     // If the callerName matches a contact's phone, use the firstName + lastName
  //     setDisplayName(`${contact.firstName} ${contact.lastName}`);
  //   } else {
  //     // If no match, use the callerName
  //     setDisplayName(phoneNumber);
  //   }
  // }, [contacts, phoneNumber]);
  useEffect(() => {
    // Check if contacts is an array before using find
    if (Array.isArray(contacts)) {
      const contact = contacts.find(contact => contact.phone === phoneNumber);
      if (contact) {
        // If the callerName matches a contact's phone, use the firstName + lastName
        setDisplayName(`${contact.firstName} ${contact.lastName}`);
      } else {
        // If no match, use the phone number as displayName
        setDisplayName(phoneNumber);
      }
    } else {
      // If contacts is not available, use phone number
      setDisplayName(phoneNumber);
    }
  }, [contacts, phoneNumber]);
  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const updateCallStatus = () => {
      setCallStatus(CallState.getOutgoingCallStatus());
    };

    // Set up a timer to check the call status periodically
    const statusInterval = setInterval(updateCallStatus, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(statusInterval);
  }, []);

  useEffect(() => {
    let timer;

    if (callStatus === "connected") {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0); // Reset duration when not connected
    }

    return () => clearInterval(timer);
  }, [callStatus]);

  // const formatDuration = (seconds) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${minutes < 10 ? "0" : ""}${minutes}:${
  //     remainingSeconds < 10 ? "0" : ""
  //   }${remainingSeconds}`;
  // };
  const formatDuration = (seconds) => {
    if(CallState.getOutgoingCallStatus() === "connected")
    {

      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes < 10 ? "0" : ""}${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`;
    }
    else return "Dialing...";
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
            {displayName}
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
