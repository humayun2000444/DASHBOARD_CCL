// src/components/CallHandler.js
import React, { useEffect, useRef, useState } from "react";
import IncomingCallModal from "./IncomingCallModal";
import CallState from "./CallState.js";
import ringtone from "./static/whatsapp.mp3";

const CallHandler = () => {
  const ringtoneRef = useRef(new Audio(ringtone));
  const [ringtonePlaying, setRingtonePlaying] = useState(false);
  const [callStatus, setCallStatus] = useState(CallState.getIncomingCallStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentStatus = CallState.getIncomingCallStatus();
      setCallStatus(currentStatus);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (callStatus === "incomingcall") {
      ringtoneRef.current
        .play()
        .then(() => setRingtonePlaying(true))
        .catch((error) => console.error("Error playing ringtone:", error));
    } else if (callStatus === "idle" || callStatus === "connected") {
      if (ringtonePlaying) {
        ringtoneRef.current.pause();
        ringtoneRef.current.currentTime = 0;
        setRingtonePlaying(false);
      }
    }
    else {

    }
  }, [callStatus, ringtonePlaying]);

  return (
    <>
      {callStatus === "incomingcall" && <IncomingCallModal open={true} />}
    </>
  );
};

export default CallHandler;
