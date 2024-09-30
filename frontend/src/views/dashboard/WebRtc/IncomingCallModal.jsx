// import React, {useRef, useState} from "react";
// import WebSocketClient from "./WebSocketClient";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   Avatar,
//   Button,
//   IconButton,
//   Typography,
//   Box,
// } from "@mui/material";
// import { Call, CallEnd, Close } from "@mui/icons-material";
// import CallState from "./CallState";
//
// function IncomingCallModal({ open, caller }) {
//   const [setCallWindow] = useState(null);
//
//   const callerName = CallState.getIncomingUser();
//
//
//   caller = {
//     name: callerName,
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
//     number: callerName,
//   };
//
//   const handleAcceptCall = () => {
//     WebSocketClient.handleAcceptCall();
//     openWindow();
//   }
//
//   const openWindow = () => {
//     const queryParams = new URLSearchParams({
//       name: encodeURIComponent(callerName),
//       number: encodeURIComponent(callerName),
//     }).toString();
//
//     const windowReference = window.open(
//       `/call-screen?${queryParams}`,
//       "_blank",
//       "width=800,height=600"
//     );
//
//     const trackWindowClose = () => {
//       const timer = setInterval(() => {
//         if (windowReference && windowReference.closed) {
//           clearInterval(timer);
//           console.log("The window has been closed.");
//           // Call any additional function or clean-up actions
//           handleWindowClose();
//         }
//       }, 500); // Check every 500ms if the window is closed
//     };
//
//     const handleWindowClose = () => {
//       // Do something, e.g., send hangup request
//       console.log("Hangup request or other action here");
//       WebSocketClient.handleHangup();
//     };
//
//     if (windowReference) {
//       console.log("Popup allowed, closing modal...");
//       setCallWindow(windowReference);
//       // setOpen(false);
//       trackWindowClose();
//
//     } else {
//       console.error("Popup blocked, modal not closed.");
//       alert("Please allow popups for this website to accept the call.");
//     }
//   };
//
//   return (
//     <Dialog
//       open={open}
//       PaperProps={{
//         sx: {
//           backgroundColor: "black",
//           width: 320,
//           borderRadius: 3,
//           color: "white",
//         },
//       }}
//     >
//       {/* Close button */}
//       <IconButton
//         // onClick={onClose}
//         sx={{
//           position: "absolute",
//           top: 8,
//           right: 8,
//           color: "white",
//         }}
//       >
//         <Close />
//       </IconButton>
//
//       {/* Modal content */}
//       <DialogContent
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: "20px 16px",
//         }}
//       >
//          Caller Avatar
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
//
//         {/* Caller Name */}
//         <Typography variant="h6" sx={{ mb: 1, color: "white" }}>
//           {caller.name} is calling you
//         </Typography>
//         <Typography variant="h6" sx={{ mb: 1, color: "white" }}>
//           {caller.number}
//         </Typography>
//         {/* End-to-end encrypted */}
//         <Typography variant="body2" sx={{ color: "grey" }}>
//           End-to-end encrypted
//         </Typography>
//       </DialogContent>
//
//       {/* Decline and Accept Buttons */}
//       <DialogActions
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           padding: "16px",
//         }}
//       >
//         <Button
//           variant="contained"
//           color="error"
//           startIcon={<CallEnd />}
//           onClick={WebSocketClient.handleDecline}
//           sx={{ width: "120px" }}
//         >
//           Decline
//         </Button>
//         <Button
//           variant="contained"
//           color="success"
//           startIcon={<Call />}
//           onClick={handleAcceptCall}
//           sx={{ width: "120px" }}
//         >
//           Accept
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }
//
// export default IncomingCallModal;


import React, { useRef, useState } from "react";
import WebSocketClient from "./WebSocketClient";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Avatar,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Call, CallEnd, Close } from "@mui/icons-material";
import CallState from "./CallState";
import { useContact } from './ContactContext';

function IncomingCallModal({ open }) {
  const [callWindow, setCallWindow] = useState(null);
  const { getDisplayName } = useContact(); // Access the context
  const callerName = CallState.getIncomingUser();
  // Get the display name based on caller number
  const matchedCallerName = getDisplayName(callerName); // Match and get the display name

  const caller = {
    name: matchedCallerName,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
    number: callerName,
  };

  const handleAcceptCall = () => {
    WebSocketClient.handleAcceptCall();
    openWindow(callerName);
  };


  const openWindow = () => {
    const queryParams = new URLSearchParams({
      name: encodeURIComponent(matchedCallerName), // Use matched name
      number: encodeURIComponent(callerName),
    }).toString();

    const windowReference = window.open(
      `/call-screen?${queryParams}`,
      "_blank",
      "width=800,height=600"
    );

    const trackWindowClose = () => {
      const timer = setInterval(() => {
        if (windowReference && windowReference.closed) {
          clearInterval(timer);
          console.log("The window has been closed.");
          // Call any additional function or clean-up actions
          handleWindowClose();
        }
      }, 500); // Check every 500ms if the window is closed
    };

    const handleWindowClose = () => {
      // Do something, e.g., send hangup request
      console.log("Hangup request or other action here");
      WebSocketClient.handleHangup();
    };

    if (windowReference) {
      console.log("Popup allowed, closing modal...");
      setCallWindow(windowReference);
      // setOpen(false);
      trackWindowClose();

    } else {
      console.error("Popup blocked, modal not closed.");
      alert("Please allow popups for this website to accept the call.");
    }
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "black",
          width: 320,
          borderRadius: 3,
          color: "white",
        },
      }}
    >
      {/* Close button */}
      <IconButton
        // onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "white",
        }}
      >
        <Close />
      </IconButton>

      {/* Modal content */}
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 16px",
        }}
      >
        {/* Caller Avatar */}
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

        {/* Caller Name */}
        <Typography variant="h6" sx={{ mb: 1, color: "white" }}>
          {caller.name} is calling you
        </Typography>
        <Typography variant="h6" sx={{ mb: 1, color: "white" }}>
          {caller.number}
        </Typography>
        {/* End-to-end encrypted */}
        <Typography variant="body2" sx={{ color: "grey" }}>
          End-to-end encrypted
        </Typography>
      </DialogContent>

      {/* Decline and Accept Buttons */}
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
        }}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<CallEnd />}
          onClick={WebSocketClient.handleDecline}
          sx={{ width: "120px" }}
        >
          Decline
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<Call />}
          onClick={handleAcceptCall}
          sx={{ width: "120px" }}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default IncomingCallModal;
