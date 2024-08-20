import React, {useEffect, useState} from "react";
import { v4 as uuidv4 } from "uuid";
import "../../../assets/scss/pages/Calls.scss";
import CallsHistory from "./CallsHistory";
import Dialpad from "./Dialpad";
import WebSocketClient from "./WebSocketClient";
import CallState from "./CallState";
import IncomingCallToast from "./IncomingCallToast";
import {  toast } from 'react-hot-toast';
import OngoingCallToast from "./OngoingCallToast";





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
  const [incomingCallStatus, setIncomingCallStatus] = useState(CallState.getIncomingCallStatus());
  // let callStatus = CallState.getCallStatus();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username && password) {
      const client = new WebSocketClient(
        // "wss://103.95.96.100:3000/",
        "wss://pbx.cosmocom.net:3000/",
        "janus-protocol",
        handleCallStateChange,
        handleIncomingCallStateChange
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


  const handleIncomingCallStateChange = (newStatus) => {
    setIncomingCallStatus(newStatus);
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

const incomingCall = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone access granted');

      const peerConnection = CallState.getPeerConnection();
      stream.getTracks().forEach(track => {
        if (track.kind === 'audio') {
          peerConnection.addTrack(track, stream);
        }
      });
      attachIncomingMediaStreams(peerConnection);
      // Create an SDP offer
      const answer = await peerConnection.createAnswer();
      peerConnection.setLocalDescription(answer);
      console.log(answer.sdp.toString());
      webSocketClient.sendAcceptRequest(answer.sdp);


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

      CallState.setIncomingCallStatus("accepted");
      setIncomingCallStatus(CallState.getIncomingCallStatus());
      // console.log(`Calling ${phoneNumber}`);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Failed to access microphone. Please ensure you have granted permission.');
    }
};

  const attachIncomingMediaStreams = (peerConnection) => {
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
          console.log('Remote stream added to audio element', stream);
        }
      });
    };
  };



// testing
  // const handleAcceptCall = () => {
  //   toast.dismiss(); // Dismiss the incoming call toast
  //   toast.custom((t) => (
  //     <OngoingCallToast callerName="Billy Forbes" toastId={t.id} />

  //   ));

  // };

    const handleIncomingCall = () => {
    toast.custom(
      <IncomingCallToast phoneNumber={phoneNumber} onAccept={handleAcceptCall} onHangup={handlePopHangup}/>,
      {
        position: 'top-center',
      }
    );
  };
  const handlePopHangup = () => {
    // <IncomingCallToast onHangup={handleHangup()}
    toast.dismiss(); // Dismiss the incoming call toast
    handleDecline();
  };

  const handleAcceptCall = () => {
    toast.dismiss(); // Dismiss the incoming call toast

      incomingCall(); // Call the incomingCall method on WebSocketClient

    toast.custom((t) => (
      <OngoingCallToast callerName={phoneNumber} toastId={t.id} />
    ));
  };

  useEffect(() => {
    if (incomingCallStatus === "incomingcall") {
      handleIncomingCall();
    }
  }, [incomingCallStatus]);


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
          console.log('Remote stream added to audio element',stream);
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

  const handleDecline = () => {
    if(webSocketClient && (callStatus === "idle" || callStatus === "incomingcall")) {
      webSocketClient.sendDeclineRequest();
      CallState.setCallStatus("idle");
      setCallStatus(CallState.getCallStatus());
      // console.log(`Call with ${phoneNumber} ended`);
    }
  }
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
      {/* <button onClick={handleIncomingCall}>Simulate Incoming Call</button> */}
      <Dialpad
        phoneNumber={phoneNumber}
        callStatus={callStatus}
        handleButtonClick={handleButtonClick}
        handleBackspace={handleBackspace}
        handleCall={handleCall}
        handleHangup={handleHangup}
      />
      {/* {callStatus==="incomingcall" && (
        handleIncomingCall
        // <IncomingCallToast
        // />
      //   <div
      //   style={{
      //     display: 'flex',
      //     alignItems: 'center',
      //     padding: '10px',
      //     borderRadius: '10px',
      //     backgroundColor: '#f0f0f0',
      //     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      //     width: '300px',
      //     justifyContent: 'space-between',
      //   }}
      // >
      //   <div style={{ display: 'flex', alignItems: 'center' }}>
      //     <AccountCircleIcon
      //       style={{
      //         width: '50px',
      //         height: '50px',
      //         color: '#4CAF50',
      //         marginRight: '10px',
      //       }}
      //     />
      //     <div>
      //       <p style={{ margin: 0, fontWeight: 'bold' }}>{phoneNumber}</p>
      //       <p style={{ margin: 0, color: '#666' }}>Incoming call</p>
      //     </div>
      //   </div>
      //   <div style={{display: 'flex', gap: '10px'}}>
      //     <button
      //       style={{
      //         backgroundColor: '#ff4b4b',
      //         color: 'white',
      //         border: 'none',
      //         padding: '10px',
      //         borderRadius: '50%',
      //         cursor: 'pointer',
      //       }}
      //       onClick={(handleHangup) => toast.dismiss() }
      //     >
      //       <PhoneDisabledIcon/>
      //     </button>
      //     <button
      //       style={{
      //         backgroundColor: '#4CAF50',
      //         color: 'white',
      //         border: 'none',
      //         padding: '10px',
      //         borderRadius: '50%',
      //         cursor: 'pointer',
      //       }}
      //       onClick={incomingCall}
      //     >
      //       <PhoneIcon/>
      //     </button>
      //   </div>
      // </div>
      )} */}

      <CallsHistory callHistory={callHistory} setCallHistory={setCallHistory}/>
      <audio id="remoteAudio" autoPlay></audio>
    </div>
  );
}
