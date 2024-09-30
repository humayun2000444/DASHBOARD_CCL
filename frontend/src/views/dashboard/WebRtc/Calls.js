import React, { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import getWebRtcServices from "../../../apiServices/WebRtcServices/getWebRtcServices";
import "../../../assets/scss/pages/Calls.scss";
import CallState from "./CallState";
import CallsHistory from "./CallsHistory";
import Dialpad from "./Dialpad";

import WebSocketClient from "./WebSocketClient";
import ringtone from "./static/whatsapp.mp3";
import {useContact} from "./ContactContext";
export default function Calls() {
  let [phoneNumber, setPhoneNumber] = useState("");
  const [callHistory, setCallHistory] = useState([]);
  const [webSocketClient, setWebSocketClient] = useState(null);
  const [outgoingCallStatus, setOutgoingCallStatus] = useState(
    CallState.getOutgoingCallStatus()
  );
  const [incomingCallStatus, setIncomingCallStatus] = useState(
    CallState.getIncomingCallStatus()
  );

  const ringtoneRef = useRef(new Audio(ringtone));
  const [ringtonePlaying, setRingtonePlaying] = useState(false);
  const [callWindow, setCallWindow] = useState(null);
  const username = localStorage.getItem("username");
  const [open, setOpen] = useState(false);
  const callerName = CallState.getIncomingUser();
  useEffect(() => {
    const fetchCallsHistory = async () => {
      try {
        let data = await getWebRtcServices.getCallsHistory({
          callerIdNumber: username,
          domainName: "103.95.96.100",
        });
        setCallHistory(
          data.map((singleCall) => {
            return {
              ...singleCall,
              isHovered: false,
              id: uuidv4(),
            };
          })
        );
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchCallsHistory();
  }, [username]);

  const handleOutgoingCall = async () => {
    await WebSocketClient.handleOutgoingCall(phoneNumber);
    openWindow();
  };

  const handleIncomingCall = async () => {
    await WebSocketClient.handleIncomingCall();
  };



  const handleKeyPress = (event) => {
    const key = event.key;
    if (/^[0-9]$/.test(key)) {
      setPhoneNumber((prev) => prev + key);
    } else if (key === "Backspace") {
      handleBackspace();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);


  const { getDisplayName } = useContact(); // Access the context

  // Get the display name based on caller number
  const matchedCallerName = getDisplayName(callerName); // Match and get the display name



  const openWindow = () => {
    const queryParams = new URLSearchParams({
      name: encodeURIComponent(matchedCallerName),
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

// Function to handle what happens when the window is closed
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






  const handleBackspace = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };
  const handleButtonClick = (value) => {
    setPhoneNumber((prev) => prev + value);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && open) {
        console.log("Enter key pressed, handling accept");
        event.preventDefault();
        event.stopPropagation();
        // handleAccept();
      }
    };

    if (open) {
      console.log("Adding keydown event listener");
      window.addEventListener("keydown", handleKeyPress);
    } else {
      console.log("Removing keydown event listener");
      window.removeEventListener("keydown", handleKeyPress);
    }

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [open]);


  return (
    <div className="calls__container">

      {/* <button onClick={handleModalOpen}>Incoming Call</button> */}
      <Dialpad
        phoneNumber={phoneNumber}
        callStatus={outgoingCallStatus}
        handleButtonClick={handleButtonClick}
        handleBackspace={handleBackspace}
        handleCall={handleOutgoingCall}
        handleHangup={WebSocketClient.handleHangup}
      />
      <CallsHistory
        callHistory={callHistory}
        setCallHistory={setCallHistory}
        handleOutgoingCalls={handleOutgoingCall}
      />
      <audio id="remoteAudio" autoPlay></audio>
    </div>
  );
}
