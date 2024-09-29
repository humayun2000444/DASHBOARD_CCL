// import React, { useState, useEffect } from "react";
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
import React, { useEffect, useState } from "react";
import CallState from "./CallState";
import JanusEvent from "./Responses";

export default function CallScreen({ onEndCall }) {
  const [micEnabled, setMicEnabled] = useState(true);
  const [caller, setCaller] = useState(null);
  const [callStartTime, setCallStartTime] = useState(null);
  const [callDuration, setCallDuration] = useState("00:00:00");
  const callerName = CallState.getIncomingUser();





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

      const startTime = new Date();
      setCallStartTime(startTime);

      const intervalId = setInterval(() => {
        setCallDuration(getCallDuration(startTime));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, []);
  const getCallDuration = (startTime) => {
    if (!startTime) return "00:00:00";
    const now = new Date();
    const duration = Math.floor((now - startTime) / 1000);
    const hours = String(Math.floor(duration / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((duration % 3600) / 60)).padStart(2, "0");
    const seconds = String(duration % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
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
          {callDuration}
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
        </IconButton>

        <IconButton
          onClick={window.close}
          sx={{
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            padding: "20px",
            "&:hover": {
              backgroundColor: "red",
            },
          }}
        >
          <PhoneDisabledIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

// export default CallScreen;
