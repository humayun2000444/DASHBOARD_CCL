import React, { useState, useEffect } from "react";
import { Dialog, IconButton, Button, Typography } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import CallEndIcon from "@mui/icons-material/CallEnd";

function CallDialog({ open, onClose }) {
  const [muted, setMuted] = useState(false);
  const [callTime, setCallTime] = useState(0);

  useEffect(() => {
    let timer;
    if (open) {
      timer = setInterval(() => setCallTime((prev) => prev + 1), 1000);
    } else {
      clearInterval(timer);
      setCallTime(0);
    }
    return () => clearInterval(timer);
  }, [open]);

  const toggleMute = () => setMuted(!muted);

  const handleEndCall = () => {
    onClose();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(sec).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <Dialog open={open}>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h6">{formatTime(callTime)}</Typography>
        <div
          style={{
            margin: "20px 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={toggleMute}
            color={muted ? "secondary" : "primary"}
          >
            {muted ? <MicOffIcon /> : <MicIcon />}
          </IconButton>
          <IconButton onClick={handleEndCall} color="error">
            <CallEndIcon />
          </IconButton>
        </div>
      </div>
    </Dialog>
  );
}

export default CallDialog;
