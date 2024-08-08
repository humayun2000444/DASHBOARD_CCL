import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../../../assets/scss/pages/Calls.scss";
import WebSocketClient from "../../pages/authentication/login/WebSocketClient";
import CallsHistory from "./CallsHistory";
import Dialpad from "./Dialpad";

export default function Calls() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callStatus, setCallStatus] = useState("idle"); // idle, calling, connected
  const [callHistory, setCallHistory] = useState([
    {
      id: uuidv4(),
      callerName: "Rizwan",
      number: "8801712069453",
      duration: "0s",
      time: "7/16 12:38 PM",
      callStatus: "outbound",
      isHovered: false,
    },
    {
      id: uuidv4(),
      callerName: "",
      number: "88011670934217",
      duration: "10s",
      time: "7/9 05:35 PM",
      callStatus: "inbound",
      isHovered: false,
    },
    {
      id: uuidv4(),
      callerName: "Munna",
      number: "88011670934217",
      duration: "0s",
      time: "7/9 05:35 PM",
      callStatus: "outbound",
      isHovered: false,
    },
    {
      id: uuidv4(),
      callerName: "Humayun",
      number: "09646400100",
      duration: "44s",
      time: "7/16 11:51 AM",
      callStatus: "outbound",
      isHovered: false,
    },
    {
      id: uuidv4(),
      callerName: "Yasin",
      number: "8801712069453",
      duration: "0s",
      time: "7/11 03:49 PM",
      callStatus: "inbound",
      isHovered: false,
    },
    {
      id: uuidv4(),
      callerName: "Emon",
      number: "8801712069453",
      duration: "3s",
      time: "7/11 03:14 PM",
      callStatus: "outbound",
      isHovered: false,
    },
    {
      id: uuidv4(),
      callerName: "Mikdad",
      number: "88011670934217",
      duration: "0s",
      time: "7/9 05:35 PM",
      callStatus: "outbound",
      isHovered: false,
    },
    {
      id: uuidv4(),
      callerName: "Jubair",
      number: "88011670934217",
      duration: "0s",
      time: "7/10 06:24 PM",
      callStatus: "inbound",
      isHovered: false,
    },
    {
      id: uuidv4(),
      callerName: "Nahid",
      number: "88011670934217",
      duration: "0s",
      time: "7/9 05:38 PM",
      callStatus: "outbound",
      isHovered: false,
    },
    {
      id: uuidv4(),
      callerName: "Apple",
      number: "88011670934217",
      duration: "1min  30s",
      time: "7/9 05:35 PM",
      callStatus: "inbound",
      isHovered: false,
    },
    {
      id: uuidv4(),
      callerName: "",
      number: "88011670934217",
      duration: "0s",
      time: "7/9 05:35 PM",
      callStatus: "inbound",
      isHovered: false,
    },
    {
      id: uuidv4(),
      callerName: "Omi",
      number: "88011670934217",
      duration: "0s",
      time: "7/9 05:35 PM",
      callStatus: "outbound",
      isHovered: false,
    },
    {
      id: uuidv4(),
      callerName: "Omi",
      number: "88011670934217",
      duration: "0s",
      time: "7/9 05:35 PM",
      callStatus: "inbound",
      isHovered: false,
    },
    {
      id: uuidv4(),
      callerName: "Omi",
      number: "88011670934217",
      duration: "0s",
      time: "7/9 05:35 PM",
      callStatus: "outbound",
      isHovered: false,
    },
    {
      id: uuidv4(),
      callerName: "Omi",
      number: "88011670934217",
      duration: "0s",
      time: "7/9 05:35 PM",
      callStatus: "inbound",
      isHovered: false,
    },
    {
      id: uuidv4(),
      callerName: "Omi",
      number: "88011670934217",
      duration: "0s",
      time: "7/9 05:35 PM",
      callStatus: "outbound",
      isHovered: false,
    },
  ]);

  const [webSocketClient, setWebSocketClient] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username && password) {
      const client = new WebSocketClient(
        "wss://103.95.96.100:3000/",
        (message) => handleWebSocketMessage(message),
        "janus-protocol"
      );
      client.connect(username, password);
      setWebSocketClient(client);

      return () => {
        client.disconnect();
      };
    }
  }, []);

  const handleWebSocketMessage = (message) => {
    console.log("WebSocket message:", message);
    // Handle call connected event
    if (
      message.janus === "event" &&
      message.plugindata?.data?.result?.event === "accepted"
    ) {
      setCallStatus("connected");
    }
    // Handle call hangup event
    if (
      message.janus === "event" &&
      message.plugindata?.data?.result?.event === "hangup"
    ) {
      setCallStatus("idle");
    }
  };

  const handleButtonClick = (value) => {
    setPhoneNumber((prev) => prev + value);
  };

  const handleCall = async () => {
    if (phoneNumber && webSocketClient) {
      try {
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        console.log("Microphone access granted");

        // Create an SDP offer
        const offer = await createOffer(stream);

        // Send call request via WebSocket
        webSocketClient.sendCallRequest(phoneNumber, offer.sdp);

        // Handle the call logic (this part depends on your setup)
        setCallStatus("calling");
        console.log(`Calling ${phoneNumber}`);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        alert(
          "Failed to access microphone. Please ensure you have granted permission."
        );
      }
    }
  };

  const createOffer = (stream) => {
    return new Promise((resolve, reject) => {
      const peerConnection = new RTCPeerConnection();
      stream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, stream));

      peerConnection
        .createOffer()
        .then((offer) => {
          return peerConnection.setLocalDescription(offer).then(() => offer);
        })
        .then((offer) => resolve(offer))
        .catch((error) => reject(error));
    });
  };

  const handleBackspace = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const handleKeyPress = (event) => {
    const key = event.key;
    if (/^[0-9]$/.test(key)) {
      setPhoneNumber((prev) => prev + key);
    } else if (key === "Backspace") {
      handleBackspace();
    }
  };

  const handleHangup = () => {
    if (
      webSocketClient &&
      (callStatus === "connected" || callStatus === "calling")
    ) {
      webSocketClient.sendHangupRequest();
      setCallStatus("idle");
      console.log(`Call with ${phoneNumber} ended`);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="calls__container">
      <Dialpad
        phoneNumber={phoneNumber}
        callStatus={callStatus}
        handleButtonClick={handleButtonClick}
        handleBackspace={handleBackspace}
        handleCall={handleCall}
        handleHangup={handleHangup}
      />
      <CallsHistory callHistory={callHistory} setCallHistory={setCallHistory} />
    </div>
  );
}
