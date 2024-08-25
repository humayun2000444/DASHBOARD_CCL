import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../../../assets/scss/pages/Calls.scss";
import CallsHistory from "./CallsHistory";
import Dialpad from "./Dialpad";
import WebSocketClient from "./WebSocketClient";
import CallState from "./CallState";
import ToasterIncoming from "./ToasterIncoming";
import ToasterOngoing from "./ToasterOngoing";
import ToasterOngoing2 from "./ToasterOngoing2";

export default function Calls() {
  const [phoneNumber, setPhoneNumber] = useState("");
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
  // const peerConnection = new RTCPeerConnection();
  const [outgoingCallStatus, setOutgoingCallStatus] = useState(CallState.getOutgoingCallStatus());
  const [incomingCallStatus, setIncomingCallStatus] = useState(CallState.getIncomingCallStatus());
  // let callStatus = CallState.getCallStatus();
  const [toasterIncoming, setToasterIncoming] = useState(false);
  const [toasterOngoing, setToasterOngoing] = useState(false);
  const [toasterOngoing2, setToasterOngoing2] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username && password) {
      const client = new WebSocketClient(
        // "wss://103.95.96.100:3000/",
        "wss://pbx.cosmocom.net:3000/",
        "janus-protocol",
        handleOutgoingCallStateChange,
        handleIncomingCallStateChange
      );
      client.connect(username, password);
      setWebSocketClient(client);

      return () => {
        client.disconnect();
      };
    }
  }, []);

  const handleOutgoingCallStateChange = (newStatus) => {
    setOutgoingCallStatus(newStatus);
    if(newStatus === "idle") {
      setToasterOngoing2(false);
    }
  };

  const handleIncomingCallStateChange = (newStatus) => {
    setIncomingCallStatus(newStatus);
    if(newStatus === "idle") {
      setToasterIncoming(false);
      setToasterOngoing(false);
      setToasterOngoing2(false);
    }
  };

  const handleOutgoingCall = async () => {
    if (phoneNumber && webSocketClient) {
      try {
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        console.log("Microphone access granted");

        const iceServers = [
          {
            urls: "stun:stun.l.google.com:19302", // Google STUN server
          },
          {
            urls: "turn:iptsp.cosmocom.net:3478",
            username: "ccl",
            credential: "ccl!pt$p",
          },
        ];

        // Create RTCPeerConnection with STUN servers
        const peerConnection = new RTCPeerConnection({ iceServers });

        // Add only audio tracks to the peer connection
        stream.getTracks().forEach((track) => {
          if (track.kind === "audio") {
            peerConnection.addTrack(track, stream);
          }
        });

        // Create an SDP offer
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        // Attach media streams after setting the local description
        attachMediaStreams(peerConnection);

        // Send the offer via WebSocket
        webSocketClient.sendCallRequest(phoneNumber, offer.sdp);

        // Handle ICE candidates
        await handleIceCandidates(peerConnection);

        // Set the peer connection state
        CallState.setPeerConnection(peerConnection);

        // Update call status
        CallState.setOutgoingCallStatus("calling");
        CallState.setMediaStream(stream);
        setOutgoingCallStatus(CallState.getOutgoingCallStatus());
        console.log(`Calling ${phoneNumber}`);
        setToasterOngoing2(true)
      } catch (error) {
        console.error("Error accessing microphone:", error);
        alert(
          "Failed to access microphone. Please ensure you have granted permission."
        );
      }
    }
  };

  const handleIncomingCall = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted");

      const peerConnection = CallState.getPeerConnection();
      stream.getTracks().forEach((track) => {
        if (track.kind === "audio") {
          peerConnection.addTrack(track, stream);
        }
      });
      attachMediaStreams(peerConnection);
      // Create an SDP offer
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      console.log(answer.sdp.toString());
      webSocketClient.sendAcceptRequest(answer.sdp);

      // Handle ICE candidates
      await handleIceCandidates(peerConnection);
      CallState.setPeerConnection(peerConnection);

      CallState.setIncomingCallStatus("accepted");
      CallState.setMediaStream(stream);
      setIncomingCallStatus(CallState.getIncomingCallStatus());
      // console.log(`Calling ${phoneNumber}`);
    } catch (error) {
      console.error("Error: ", error);
      alert(
        "Error: " + error
      );
    }
  };

  const handleIceCandidates = async (peerConnection) => {
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        const candidate = {
          janus: "trickle",
          candidate: {
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex,
          },
          transaction: WebSocketClient.randomString(12),
          session_id: webSocketClient.sessionId,
          handle_id: webSocketClient.handleId,
        };
        webSocketClient.sendMessage(JSON.stringify(candidate));
      } else {
        const completedCandidate = {
          janus: "trickle",
          candidate: { completed: true },
          transaction: WebSocketClient.randomString(12),
          session_id: webSocketClient.sessionId,
          handle_id: webSocketClient.handleId,
        };
        webSocketClient.sendMessage(JSON.stringify(completedCandidate));
        console.log("Sending ICE candidate completion.");
      }
    };
  }
  const handleIncomingCallToast = () => {
    setToasterIncoming(true);
  };

  const handleAcceptCall = () => {
    console.log("Call accepted from Incoming");
    handleIncomingCall().then(r =>{
      setToasterIncoming(false);
      setToasterOngoing(true);
    });
  };

  useEffect(() => {
    if (incomingCallStatus === "incomingcall") {
      handleIncomingCallToast();
    }
  }, [incomingCallStatus]);
  const attachMediaStreams = (peerConnection) => {
    peerConnection.getReceivers().forEach((receiver) => {
      if (receiver.track.kind === "audio") {
        const remoteAudio = document.getElementById("remoteAudio");
        if (remoteAudio) {
          remoteAudio.srcObject = new MediaStream([receiver.track]);
          console.log("Attached remote audio stream");
        }
      }
    });

    peerConnection.ontrack = (event) => {
      event.streams.forEach((stream) => {
        const remoteAudio = document.getElementById("remoteAudio");
        if (remoteAudio) {
          remoteAudio.srcObject = stream;
          console.log("Remote stream added to audio element", stream);
        }
      });
    };
  };
  const handleDecline = () => {
    if (
      webSocketClient &&
      (incomingCallStatus === "incomingcall")
    ) {
      webSocketClient.sendDeclineRequest();
      CallState.setIncomingCallStatus("idle");
      setIncomingCallStatus(CallState.getIncomingCallStatus());
      // console.log(`Call with ${phoneNumber} ended`);
    }
  };
  const handleHangup = () => {
    webSocketClient.sendHangupRequest();
    CallState.setOutgoingCallStatus("idle");
    setOutgoingCallStatus(CallState.getOutgoingCallStatus());
  };

  const handleBackspace = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };
  const handleButtonClick = (value) => {
    setPhoneNumber((prev) => prev + value);
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

  return (
    <div className="calls__container">
      {toasterIncoming && (
        <ToasterIncoming
          onHangup={handleDecline}
          onAccept={handleAcceptCall}
          phoneNumber={phoneNumber}
        />
      )}
      {toasterOngoing && (
        <ToasterOngoing
          onEndCall={handleHangup}
          callerName={phoneNumber}
          phoneNumber={phoneNumber}
          setToasterOngoing={setToasterOngoing}
        />
      )}
      {toasterOngoing2 && (
        <ToasterOngoing2
          onEndCall={handleHangup}
          callerName={phoneNumber}
          phoneNumber={phoneNumber}
          setToasterOngoing={setToasterOngoing2}
        />
      )}
      {/*<button onClick={handleIncomingCall}>Simulate Incoming Call</button>*/}
      <Dialpad
        phoneNumber={phoneNumber}
        callStatus={outgoingCallStatus}
        handleButtonClick={handleButtonClick}
        handleBackspace={handleBackspace}
        handleCall={handleOutgoingCall}
        handleHangup={handleHangup}
      />
      <CallsHistory callHistory={callHistory} setCallHistory={setCallHistory} />
      <audio id="remoteAudio" autoPlay></audio>
    </div>
  );
}
