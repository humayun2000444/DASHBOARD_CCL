// import React, { useEffect } from "react";

// import "./components/core/rippleButton/RippleButton";
// import Router from "./Router";
// import "react-perfect-scrollbar/dist/css/styles.css";
// import "prismjs/themes/prism-tomorrow.css";

// import "./components/core/rippleButton/RippleButton";

// import "react-perfect-scrollbar/dist/css/styles.css";
// import "prismjs/themes/prism-tomorrow.css";
// import toast, { Toaster } from "react-hot-toast";
// import { Notifications } from "react-push-notification";

// const App = (props) => {
//   return (
//     <>
//       <Notifications />
//       <Router />
//       <Toaster />
//     </>
//   );
// };

// export default App;

//
// import React, {useEffect, useRef, useState} from "react";
//
// import "./components/core/rippleButton/RippleButton";
// import Router from "./Router";
// import "react-perfect-scrollbar/dist/css/styles.css";
// import "prismjs/themes/prism-tomorrow.css";
//
// import "./components/core/rippleButton/RippleButton";
//
// import "react-perfect-scrollbar/dist/css/styles.css";
// import "prismjs/themes/prism-tomorrow.css";
// import toast, { Toaster } from "react-hot-toast";
// import { Notifications } from "react-push-notification";
// import IncomingCallModal from "./views/dashboard/WebRtc/IncomingCallModal";
// import CallState from "./views/dashboard/WebRtc/CallState.js";
// import ringtone from "./views/dashboard/WebRtc/static/whatsapp.mp3";
// import WebSocketClient from "./views/dashboard/WebRtc/WebSocketClient";
//
// const App = (props) => {
//   const ringtoneRef = useRef(new Audio(ringtone));
//   const [ringtonePlaying, setRingtonePlaying] = useState(false);
//   const [callStatus, setCallStatus] = useState(CallState.getIncomingCallStatus());  // Initialize callStatus
//   const [webSocketClient, setWebSocketClient] = useState(null);
//   useEffect(() => {
//     const username = localStorage.getItem("username");
//     const password = localStorage.getItem("password");
//
//     if (username && password) {
//       const client = WebSocketClient;
//       client.connect(username, password);
//       setWebSocketClient(client);
//       return () => {
//         client.disconnect();
//       };
//     }
//
//     const interval = setInterval(() => {
//       const currentStatus = CallState.getIncomingCallStatus();
//       setCallStatus(currentStatus);
//     }, 1);
//     return () => clearInterval(interval);
//   }, []);
//
//   if(callStatus === "incomingcall")
//   {
//     ringtoneRef.current
//       .play()
//       .then(() => {
//         setRingtonePlaying(true);
//       })
//       .catch((error) => {
//         console.error("Error playing ringtone:", error);
//       });
//   }
//   if(callStatus === "idle" || callStatus === "connected")
//   {
//     if (ringtonePlaying) {
//       ringtoneRef.current.pause();
//       ringtoneRef.current.currentTime = 0;
//       setRingtonePlaying(false);
//     }
//   }
//
//   return (
//     <>
//     {callStatus==="incomingcall"&&<IncomingCallModal
//     open = "true"
//     />}
//       <Notifications />
//       <Router />
//       <Toaster />
//     </>
//   );
// };
//
// export default App;


// src/App.js
import React from "react";
import "./components/core/rippleButton/RippleButton";
import Router from "./Router";
import "react-perfect-scrollbar/dist/css/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { Toaster } from "react-hot-toast";
import { Notifications } from "react-push-notification";

import CallHandler from "./views/dashboard/WebRtc/CallHandler";
import WebSocketManager from "./views/dashboard/WebRtc/WebSocketManager";
import { CCLContextProvider } from "./context/CClContext";

const App = (props) => {
  return (
    <CCLContextProvider>
      <WebSocketManager /> {/* Handles WebSocket connection */}
      <CallHandler /> {/* Handles call status and ringtone */}
      <Notifications />
      <Router />
      <Toaster />
    </CCLContextProvider>
  );
};

export default App;
