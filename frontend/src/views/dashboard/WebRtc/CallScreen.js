// // import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Avatar,
//   CircularProgress,
// } from "@mui/material";
// import {
//   Mic as MicIcon,
//   PhoneDisabled as PhoneDisabledIcon,
//   MicOff as MicOffIcon,
// } from "@mui/icons-material";
// import React, { useEffect, useState } from "react";
// import CallState from "./CallState";
// import JanusEvent from "./Responses";
// import CloseIcon from "@mui/icons-material/Close";
//
// export default function CallScreen({ onEndCall }) {
//   const [micEnabled, setMicEnabled] = useState(true);
//   const [caller, setCaller] = useState(null);
//   const [callStartTime, setCallStartTime] = useState(null);
//   const [callDuration, setCallDuration] = useState("00:00:00");
//   const [callstatus, setCallstatus] = useState(null);
//   const callerName = CallState.getIncomingUser();
//
//
//   useEffect(() => {
//     const interval = setInterval(() => {
//         console.log(window.callstatus);
//       setCallstatus(window.callstatus);
//     }, 1000);
//
//     return () => clearInterval(interval);
//   }, []);
//
//   useEffect(() => {
//     let timer;
//
//     if (callstatus === "connected") {
//       timer = setInterval(() => {
//         setCallDuration(prev => prev + 1);
//       }, 1000);
//     } else {
//       setCallDuration(0); // Reset duration when not connected
//     }
//
//     return () => clearInterval(timer);
//   }, [callstatus]);
//
//
//   useEffect(() => {
//     // Read and decode URL parameters
//     const urlParams = new URLSearchParams(window.location.search);
//     const name = urlParams.get("name");
//     const number = urlParams.get("number");
//
//     if (name) {
//       setCaller({
//         name: decodeURIComponent(name),
//         number: decodeURIComponent(number),
//         image: null,
//       });
//
//     }
//   }, []);
//
//   const formatDuration = (seconds) => {
//     if(callstatus === "connected")
//     {
//
//       const minutes = Math.floor(seconds / 60);
//       const remainingSeconds = seconds % 60;
//       return `${minutes < 10 ? "0" : ""}${minutes}:${
//         remainingSeconds < 10 ? "0" : ""
//       }${remainingSeconds}`;
//     }
//     // else return "Dialing...";
//   };
//
//   if (!caller) {
//     return (
//       <Box
//         sx={{
//           width: "100%",
//           height: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "lightgray",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }
//
//
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "100vh",
//         backgroundColor: "lightgray",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100%",
//           flexDirection: "column",
//         }}
//       >
//         <Avatar
//           src={caller.image}
//           alt={caller.name}
//           sx={{
//             width: 80,
//             height: 80,
//             mb: 2,
//             border: "3px solid gray",
//           }}
//         />
//         <Typography variant="h4">{caller.name}</Typography>
//         <Typography variant="h5">{caller.number}</Typography>
//
//         <Typography variant="h6" sx={{ color: "grey" }}>
//           {formatDuration(callDuration)}
//         </Typography>
//         <Typography variant="h6" sx={{ color: "grey" }}>
//           {callstatus === "idle"?"call ended":callstatus}
//         </Typography>
//       </Box>
//
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           gap: 4,
//           paddingBottom: 4,
//         }}
//       >
//         {/*{callstatus !== "idle" &&*/}
//         {/*(*/}
//           <IconButton
//           onClick={() => setMicEnabled((prev) => !prev)}
//           sx={{
//             backgroundColor: micEnabled ? "green" : "gray",
//             color: "white",
//             borderRadius: "50%",
//             padding: "20px",
//             "&:hover": {
//               backgroundColor: micEnabled ? "#006400" : "gray",
//             },
//           }}
//         >
//           {micEnabled ? <MicIcon /> : <MicOffIcon />}
//         </IconButton>
//         {/*)}*/}
//
//         <IconButton
//           onClick={window.close}
//           sx={{
//             backgroundColor: "red",
//             color: "white",
//             borderRadius: "50%",
//             padding: "20px",
//             "&:hover": {
//               backgroundColor: "red",
//             },
//           }}
//         >
//           <PhoneDisabledIcon />
//         </IconButton>
//         {/*<IconButton*/}
//         {/*  onClick={callstatus === "idle" ? window.close : onEndCall}*/}
//         {/*  sx={{*/}
//         {/*    backgroundColor: callstatus === "idle" ? "red" : "red",*/}
//         {/*    color: "white",*/}
//         {/*    borderRadius: "50%",*/}
//         {/*    padding: "20px",*/}
//         {/*    "&:hover": {*/}
//         {/*      backgroundColor: callstatus === "idle" ? "red" : "red",*/}
//         {/*    },*/}
//         {/*  }}*/}
//         {/*>*/}
//         {/*  {callstatus === "idle" ? <CloseIcon /> : <PhoneDisabledIcon />}*/}
//         {/*</IconButton>*/}
//
//       </Box>
//     </Box>
//   );
// }
//
// // export default CallScreen;


import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  CircularProgress,
} from "@mui/material";
import {
  Mic as MicIcon,
  PhoneDisabled as PhoneDisabledIcon,
  MicOff as MicOffIcon,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import CallState from "./CallState";

export default function CallScreen({ onEndCall }) {
  const [micEnabled, setMicEnabled] = useState(true);
  const [caller, setCaller] = useState(null);
  const [callStartTime, setCallStartTime] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [callstatus, setCallstatus] = useState(null);
  const [callstatusCount, setCallstatusCount] = useState(0); // New state variable
  const callerName = CallState.getIncomingUser();

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(window.callstatus);
      setCallstatus(window.callstatus);

      // Increment callstatusCount when callstatus is "idle"
      if (window.callstatus === "idle") {
        setCallstatusCount((prevCount) => prevCount + 1);
      } else {
        setCallstatusCount(0); // Reset the count if not idle
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timer;

    if (callstatus === "connected") {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [callstatus]);
console.log(callstatusCount);
  useEffect(() => {
    // Read and decode URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    const number = urlParams.get("number");

    if (name) {
      setCaller({
        name: decodeURIComponent(name),
        number: decodeURIComponent(number),
        image: null,
      });
    }
  }, []);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  if (!caller) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "lightgray",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "lightgray",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={caller.image}
          alt={caller.name}
          sx={{
            width: 80,
            height: 80,
            mb: 2,
            border: "3px solid gray",
          }}
        />
        <Typography variant="h4">{caller.name}</Typography>
        <Typography variant="h5">{caller.number}</Typography>

        <Typography variant="h6" sx={{ color: "grey" }}>
          {formatDuration(callDuration)}
        </Typography>

        <Typography variant="h6" sx={{ color: "grey" }}>
          {callstatusCount >2 && "call ended" }
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          paddingBottom: 4,
        }}
      >
        {callstatusCount < 2 && (
        <IconButton
          onClick={() => setMicEnabled((prev) => !prev)}
          sx={{
            backgroundColor: micEnabled ? "green" : "gray",
            color: "white",
            borderRadius: "50%",
            padding: "20px",
            "&:hover": {
              backgroundColor: micEnabled ? "#006400" : "gray",
            },
          }}
        >
          {micEnabled ? <MicIcon /> : <MicOffIcon />}
        </IconButton>)}

        <IconButton
          onClick={window.close }
          sx={{
            backgroundColor: callstatus === "idle" ? "red" : "red",
            color: "white",
            borderRadius: "50%",
            padding: "20px",
            "&:hover": {
              backgroundColor: callstatusCount >2 ? "red" : "red",
            },
          }}
        >
          {callstatusCount >2 ? <CloseIcon /> : <PhoneDisabledIcon />}
        </IconButton>
        {/*<IconButton*/}
        {/*  onClick={window.close}*/}
        {/*  sx={{*/}
        {/*    backgroundColor: "red",*/}
        {/*    color: "white",*/}
        {/*    borderRadius: "50%",*/}
        {/*    padding: "20px",*/}
        {/*    "&:hover": {*/}
        {/*      backgroundColor: "red",*/}
        {/*    },*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <PhoneDisabledIcon />*/}
        {/*</IconButton>*/}
      </Box>
    </Box>
  );
}
