import React, {useEffect, useState} from "react";
import { v4 as uuidv4 } from "uuid";
import "../../../assets/scss/pages/Calls.scss";
import CallsHistory from "./CallsHistory";
import Dialpad from "./Dialpad";
import WebSocketClient from "./WebSocketClient";
import CallState from "./CallState";
export default function Calls() {
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [callStatus, setCallStatus] =  useState("idle"); // idle, calling, connected
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
  const [callStatus, setCallStatus] = useState(CallState.getCallStatus());
  // let callStatus = CallState.getCallStatus();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username && password) {
      const client = new WebSocketClient(
        // "wss://103.95.96.100:3000/",
        "wss://pbx.cosmocom.net:3000/",
        "janus-protocol",
        handleCallStateChange
      );
      client.connect(username, password);
      setWebSocketClient(client);

      return () => {
        client.disconnect();
      };
    }
  }, []);

  const handleCallStateChange = (newStatus) => {
    setCallStatus(newStatus);
  };

  // Handle network changes to restart ICE
  // useEffect(() => {
  //   const handleNetworkChange = () => {
  //     console.log('Network changed, restarting ICE...');
  //     restartIce();
  //   };
  //
  //   window.addEventListener("offline", handleNetworkChange);
  //   window.addEventListener("online", handleNetworkChange);
  //
  //   return () => {
  //     window.removeEventListener("offline", handleNetworkChange);
  //     window.removeEventListener("online", handleNetworkChange);
  //   };
  // }, [webSocketClient]);
  //
  // const restartIce = async () => {
  //   if (webSocketClient && callStatus === "connected") {
  //     const peerConnection = CallState.getPeerConnection();
  //     if (peerConnection) {
  //       try {
  //         const offer = await peerConnection.createOffer({ iceRestart: true });
  //         await peerConnection.setLocalDescription(offer);
  //         webSocketClient.sendCallRequest(phoneNumber, offer.sdp);
  //         console.log('ICE restarted and new offer sent.');
  //       } catch (error) {
  //         console.error('Error restarting ICE:', error);
  //       }
  //     }
  //   }
  // };

  const handleButtonClick = (value) => {
    setPhoneNumber((prev) => prev + value);
  };

  // this.socket.onmessage = (event) => {
  //   console.log(event.data.toString());
  //   this.handleWebSocketMessage(JSON.parse(event.data));
  // };

  const handleCall = async () => {
    if (phoneNumber && webSocketClient) {
      try {
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Microphone access granted');

        const iceServers = [
          {
            urls: "stun:stun.l.google.com:19302" // Google STUN server
          }
        ];

        // Create RTCPeerConnection with STUN servers
        const peerConnection = new RTCPeerConnection({ iceServers });

        // Create an SDP offer
        const offer = await createOffer(stream, peerConnection);
        webSocketClient.sendCallRequest(phoneNumber, offer.sdp);


        // Handle ICE candidates
        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            const candidate = {
              janus: "trickle",
              candidate: {
                candidate: event.candidate.candidate,
                sdpMid: event.candidate.sdpMid,
                sdpMLineIndex: event.candidate.sdpMLineIndex
              },
              transaction: WebSocketClient.randomString(12),
              session_id: webSocketClient.sessionId,
              handle_id: webSocketClient.handleId
            };
            webSocketClient.sendMessage(JSON.stringify(candidate));
            // console.log("Sending ICE candidate:", candidate);
          } else {
            const completedCandidate = {
              janus: "trickle",
              candidate: { completed: true },
              transaction: WebSocketClient.randomString(12),
              session_id: webSocketClient.sessionId,
              handle_id: webSocketClient.handleId
            };
            webSocketClient.sendMessage(JSON.stringify(completedCandidate));
            console.log("Sending ICE candidate completion.");
          }
        };
        CallState.setPeerConnection(peerConnection);

        CallState.setCallStatus("calling");
        setCallStatus(CallState.getCallStatus());
        console.log(`Calling ${phoneNumber}`);
      } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Failed to access microphone. Please ensure you have granted permission.');
      }
    }
  };

  const createOffer = (stream, peerConnection) => {
    return new Promise((resolve, reject) => {
      // Add only audio tracks to the peer connection
      stream.getTracks().forEach(track => {
        if (track.kind === 'audio') {
          peerConnection.addTrack(track, stream);
        }
      });
      peerConnection.createOffer()
        .then(offer => peerConnection.setLocalDescription(offer).then(() => offer))
        .then(offer => {
          attachMediaStreams(peerConnection); // Attach media streams after setting local description
          resolve(offer);
        })
        .catch(error => reject(error));

      CallState.setPeerConnection(peerConnection);
    });
  };

  const attachMediaStreams = (peerConnection) => {
    peerConnection.getReceivers().forEach(receiver => {
      if (receiver.track.kind === 'audio') {
        const remoteAudio = document.getElementById('remoteAudio');
        if (remoteAudio) {
          remoteAudio.srcObject = new MediaStream([receiver.track]);
          console.log('Attached remote audio stream');
        }
      }
    });

    peerConnection.ontrack = (event) => {
      event.streams.forEach(stream => {
        const remoteAudio = document.getElementById('remoteAudio');
        if (remoteAudio) {
          remoteAudio.srcObject = stream;
          console.log('Remote stream added to audio element');
        }
      });
    };
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
      CallState.setCallStatus("idle");
      setCallStatus(CallState.getCallStatus());
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
      <CallsHistory callHistory={callHistory} setCallHistory={setCallHistory}/>
      <audio id="remoteAudio" autoPlay></audio>
    </div>
  );
}
