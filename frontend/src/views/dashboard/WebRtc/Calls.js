import React, { useState, useEffect } from "react";
import "./Calls.css"; // Ensure to create this CSS file for styling
import WebSocketClient from "../../pages/authentication/login/WebSocketClient";

export default function Calls() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callStatus, setCallStatus] = useState("idle"); // idle, calling, connected
  const [callHistory, setCallHistory] = useState([
    { number: "8801712069453", status: "Missed call", time: "7/16 12:38 PM" },
    { number: "09646400100", status: "Missed call", time: "7/16 11:51 AM" },
    { number: "8801712069453", status: "Missed call", time: "7/11 03:49 PM" },
    { number: "8801712069453", status: "Missed call", time: "7/11 03:14 PM" },
    { number: "88011670934217", status: "Missed call", time: "7/10 06:24 PM" },
    { number: "88011670934217", status: "Missed call", time: "7/9 05:38 PM" },
    { number: "88011670934217", status: "Missed call", time: "7/9 05:35 PM" },
    { number: "88011670934217", status: "Missed call", time: "7/9 05:35 PM" },
    { number: "88011670934217", status: "Missed call", time: "7/9 05:35 PM" },
    { number: "88011670934217", status: "Missed call", time: "7/9 05:35 PM" },
    { number: "88011670934217", status: "Missed call", time: "7/9 05:35 PM" },
    { number: "88011670934217", status: "Missed call", time: "7/9 05:35 PM" },
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
    if (message.janus === "event" && message.plugindata?.data?.result?.event === "accepted") {
      setCallStatus("connected");
    }
    // Handle call hangup event
    if (message.janus === "event" && message.plugindata?.data?.result?.event === "hangup") {
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
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Microphone access granted');

        // Create an SDP offer
        const offer = await createOffer(stream);

        // Send call request via WebSocket
        webSocketClient.sendCallRequest(phoneNumber, offer.sdp);

        // Handle the call logic (this part depends on your setup)
        setCallStatus("calling");
        console.log(`Calling ${phoneNumber}`);
      } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Failed to access microphone. Please ensure you have granted permission.');
      }
    }
  };

  const createOffer = (stream) => {
    return new Promise((resolve, reject) => {
      const peerConnection = new RTCPeerConnection();
      stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

      peerConnection.createOffer()
        .then(offer => {
          return peerConnection.setLocalDescription(offer).then(() => offer);
        })
        .then(offer => resolve(offer))
        .catch(error => reject(error));
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
    if (webSocketClient && (callStatus === "connected" || callStatus === "calling")) {
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
    <div className="calls-container">
      <div className="dial-pad">
        <div></div>
        <input
          type="text"
          value={phoneNumber}
          readOnly
          placeholder="Enter name or number"
          className="phone-input"
        />
        <div className="dial-buttons">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((value) => (
            <button
              key={value}
              onClick={() => handleButtonClick(value)}
              className="dial-button"
            >
              {value}
            </button>
          ))}
        </div>
        <div className="dial-actions">
          <button
            onClick={handleBackspace}
            className="dial-action-button backspace-button"
          >
            ⌫
          </button>
          {callStatus === "idle" ? (
            <button
              onClick={handleCall}
              className="dial-action-button call-button"
            >
              <i className="fas fa-phone"></i>
            </button>
          ) : (
            <button
              onClick={handleHangup}
              className="dial-action-button hangup-button"
            >
              <i className="fas fa-phone-slash"></i>
            </button>
          )}
        </div>
      </div>
      <div className="call-history">
        {callHistory.map((call, index) => (
          <div key={index} className="call-item">
            <div className="call-number">{call.number}</div>
            <div className="call-status">{call.status}</div>
            <div className="call-time">{call.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
