import JanusEvent from "./Responses";
import CallState from "./CallState";
import IncomingCallModal from "./IncomingCallModal";
import React, {useState} from "react";

class WebSocketClient {
  constructor(url, protocol = null, onOutgoingCallStateChange, onIncomingCallStateChange) {
    this.url = url;
    this.protocol = protocol;
    this.socket = null;
    this.sessionId = null;
    this.handleId = null;
    this.attached = false;
    this.username = null;
    this.password = null;
    this.transactions = {};
    this.onOutgoingCallStateChange = onOutgoingCallStateChange;
    this.onIncomingCallStateChange = onIncomingCallStateChange;
    this.pluginHandles = {};
    this.keepaliveInterval = null;
  }

  connect(username, password) {
    this.username = username;
    this.password = password;
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.socket = this.protocol ? new WebSocket(this.url, this.protocol) : new WebSocket(this.url);

      this.socket.onopen = () => {
        console.log('Connected to WebSocket server');
        this.sendMessage(JSON.stringify({
          janus: "create",
          transaction: this.getRandomString(12)
        }));
      };

      this.socket.onmessage = (event) => {
        this.handleEvent(JSON.parse(event.data));
      };

      this.socket.onclose = () => {
        console.log('Disconnected from WebSocket server');
        this.reconnect();
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.keepaliveInterval = setInterval(() => {
        if (this.sessionId) {
          this.sendKeepalive();
        }
      }, 15000);
    }
  }

  reconnect() {
    console.log('Reconnecting to WebSocket server...');
    setTimeout(() => {
      this.connect(this.username, this.password);
    }, 5000); // Reconnect after 5 seconds
  }
  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      // console.log(message.toString());
      this.socket.send(message);
    }
  }

  sendKeepalive() {
    if (this.sessionId) {
      this.sendMessage(JSON.stringify({
        janus: "keepalive",
        session_id: this.sessionId,
        transaction: this.getRandomString(12)
      }));
    }
  }


  handleEvent(json) {
    const janusEvent = new JanusEvent(json);
    const callState = CallState; // Access singleton instance
    if (json.janus === "server_info") {
      const transaction = json.transaction;
      if (transaction) {
        const reportSuccess = this.transactions[transaction]; // Use this.transactions
        if (reportSuccess) reportSuccess(json);
        delete this.transactions[transaction]; // Use this.transactions
      }
      return;
    }
    else if (json.janus === "ack") {
      return;
    }
    else if (json.janus === "success") {
      if (!json.session_id) {
        this.sessionId = json.data.id;
      }
     else {
        this.handleId = json.data.id;
        if (this.sessionId && this.handleId) {
          this.sendMessage(JSON.stringify({
            janus: "message",
            body: {
              request: "register",
              username: `sip:${this.username}@103.95.96.100`,
              // authuser: this.username,
              // display_name: "Humayun",
              secret: this.password,
              // proxy: "sip:103.95.96.100:5060"
            },
            transaction: this.getRandomString(12),
            session_id: this.sessionId,
            handle_id: this.handleId
          }));
        } else {
          console.error("sessionId or handleId is not set");
        }
        return;
      }
      if (!this.attached) {
        this.sendMessage(JSON.stringify({
          janus: "attach",
          plugin: "janus.plugin.sip",
          opaque_id: `siptest-${this.getRandomString(12)}`,
          transaction: this.getRandomString(12),
          session_id: this.sessionId
        }));
        this.attached = true;
      }

    }
    else if(json.janus === "hangup") {
      {
        if(!this.incomingCallStatus)
        {
          CallState.setWindowStatus("hangup");
          CallState.setOutgoingCallStatus("idle");
          if (this.onOutgoingCallStateChange) this.onOutgoingCallStateChange("idle");
        }
        else
        {
          CallState.setWindowStatus("hangup");
          CallState.setIncomingCallStatus("idle");
          if (this.onIncomingCallStateChange) this.onIncomingCallStateChange("idle");
        }
      }
      this.sendHangupRequest();
      this.cleanup(callState.peerConnection, callState.getMediaStream());
    }
    else if (json.janus === "event") {
      const event = janusEvent.getEvent();
      if (event === "accepted") {
        if(!this.incomingCallStatus)
        {
          callState.setOutgoingCallStatus("connected");
          if (this.onOutgoingCallStateChange) this.onOutgoingCallStateChange("connected");
        }
        else
        {
          CallState.setIncomingCallStatus("connected");
          if (this.onIncomingCallStateChange) this.onIncomingCallStateChange("connected");
        }
      }
      else if (event === "hangup") {
        if(!this.incomingCallStatus)
        {
          callState.setOutgoingCallStatus("idle");
          if (this.onOutgoingCallStateChange) this.onOutgoingCallStateChange("idle");
        }
        else
        {
          CallState.setIncomingCallStatus("idle");
          if (this.onIncomingCallStateChange) this.onIncomingCallStateChange("idle");
        }
        this.cleanup(callState.peerConnection, callState.getMediaStream());
      }
      else if (janusEvent.getPlugin() === "janus.plugin.sip") {
        const peerConnection = callState.getPeerConnection();
        const jsep = janusEvent.getJsep();
        if (jsep && janusEvent.getJsepType() === "answer") {
          peerConnection.setRemoteDescription(new RTCSessionDescription(jsep))
            .then(() => console.log('Remote description set with SDP answer'))
            .catch(error => console.error('Error setting remote description:', error));
          if (event === "progress") {
            console.log(`Call is in progress with ${janusEvent.getUsername()}`);
          }
          if(!this.incomingCallStatus)
          {
            callState.setOutgoingCallStatus("in_call");
            if (this.onOutgoingCallStateChange) this.onOutgoingCallStateChange("in_call");
          }
          else
          {
            CallState.setIncomingCallStatus("in_call");
            if (this.onIncomingCallStateChange) this.onIncomingCallStateChange("in_call");
          }
          callState.setPeerConnection(peerConnection);
        }
        else if (jsep && janusEvent.getJsepType() === "offer") {
          this.incomingCallStatus = true;
          const iceServers = [
            {
              urls: "stun:stun.l.google.com:19302"
            },
            {
              urls: 'turn:iptsp.cosmocom.net:3478',
              username: 'ccl',
              credential: 'ccl!pt$p'
            }
          ];


          // Create RTCPeerConnection with STUN servers
          const peerConnection = new RTCPeerConnection({ iceServers });
          peerConnection.setRemoteDescription(new RTCSessionDescription(jsep))
            .catch(error => console.error('Error setting remote description:', error));
          callState.setPeerConnection(peerConnection);
          callState.setIncomingCallStatus("incomingcall");
          callState.setIncomingUser(janusEvent.getDisplayname());


          if (this.onIncomingCallStateChange) this.onIncomingCallStateChange("incomingcall");
        }
      }
    }

    else if(janusEvent.getEvent === "accepted") {
      if(!this.incomingCallStatus)
      {
        callState.setOutgoingCallStatus("accepted");
        if (this.onOutgoingCallStateChange) this.onOutgoingCallStateChange("accepted");
      }
      else
      {
        CallState.setIncomingCallStatus("accepted");
        if (this.onIncomingCallStateChange) this.onIncomingCallStateChange("accepted");
      }
    }
    else if(json.janus === "media") {
      console.log("media received");
    }
    else if(json.janus === "webrtcup") {
      console.log("webrtcup");
    }
    else {
      console.log(json);
      console.warn(`Unknown message/event '${json.janus}' on session ${this.sessionId}`);
      console.debug(json);
    }
  }



  sendCallRequest(uri, sdp) {
    this.sendMessage(JSON.stringify({
      janus: "message",
      body: {
        request: "call",
        uri: `sip:${uri}@103.95.96.100`,
        autoaccept_reinvites: false
      },
      transaction: this.getRandomString(12),
      jsep: {
        type: "offer",
        sdp: sdp
      },
      session_id: this.sessionId,
      handle_id: this.handleId
    }));

  }

  sendAcceptRequest(sdp) {
    this.sendMessage(JSON.stringify({
      janus: "message",
      body: {
        request: "accept"
      },
      transaction: this.getRandomString(12),
      jsep: {
        type: "answer",
        sdp: sdp
      },
      session_id: this.sessionId,
      handle_id: this.handleId
    }));
}
  sendDeclineRequest() {
    this.sendMessage(JSON.stringify({
      janus: "message",
      body: {
        request: "decline"
      },
      transaction: this.getRandomString(12),
      session_id: this.sessionId,
      handle_id: this.handleId
    }));
  }

  sendHangupRequest() {
    this.sendMessage(JSON.stringify({
      janus: "message",
      body: {
        request: "hangup"
      },
      transaction: this.getRandomString(12),
      session_id: this.sessionId,
      handle_id: this.handleId
    }));
  }

  getRandomString(len) {
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let getRandomString = '';
    for (let i = 0; i < len; i++) {
      const randomPoz = Math.floor(Math.random() * charSet.length);
      getRandomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return getRandomString;
  }

  cleanup = (peerConnection, mediaStream) => {
    // Close the peer connection
    if (peerConnection) {
      peerConnection.close();
      peerConnection = null;
    }

    // Stop all media tracks
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }

    // Reset the call status and peer connection state
    CallState.setIncomingCallStatus("idle");
    CallState.setOutgoingCallStatus("idle");
    CallState.setPeerConnection(null);

    console.log("Call has been cleaned up.");
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
    if (this.keepaliveInterval) {
      clearInterval(this.keepaliveInterval);
    }
  }

  attachMediaStreams = (peerConnection) => {
    peerConnection.getReceivers().forEach((receiver) => {
      if (receiver.track.kind === "audio") {
        const remoteAudio = document.getElementById("remoteAudio");
        if (remoteAudio) {
          remoteAudio.srcObject = new MediaStream([receiver.track]);
          console.log("Attached remote audio stream");
        }
      }
    });
  }

  handleIceCandidates = async (peerConnection) => {
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        const candidate = {
          janus: "trickle",
          candidate: {
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex,
          },
          transaction: this.getRandomString(12),
          session_id: this.sessionId,
          handle_id: this.handleId,
        };
        this.sendMessage(JSON.stringify(candidate));
      } else {
        const completedCandidate = {
          janus: "trickle",
          candidate: { completed: true },
          transaction: this.getRandomString(12),
          session_id: this.sessionId,
          handle_id: this.handleId,
        };
        this.sendMessage(JSON.stringify(completedCandidate));
        console.log("Sending ICE candidate completion.");
      }
    };
  }
  handleOutgoingCall = async (phoneNumber) => {
    if ((phoneNumber || CallState.getPhoneNumber()) && WebSocketClient) {
      if (!phoneNumber) phoneNumber = CallState.getPhoneNumber();
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
        this.attachMediaStreams(peerConnection);

        // Send the offer via WebSocket
        this.sendCallRequest(phoneNumber, offer.sdp);

        // Handle ICE candidates
        await this.handleIceCandidates(peerConnection);

        // Set the peer connection state
        CallState.setPeerConnection(peerConnection);

        // Update call status
        CallState.setOutgoingCallStatus("calling");
        CallState.setMediaStream(stream);
        console.log(`Calling ${phoneNumber}`);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        alert(
          "Failed to access microphone. Please ensure you have granted permission."
        );
      }
    }
  }

  handleIncomingCall = async () => {
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
      peerConnection.getSenders().forEach(sender => {
        console.log(`Sender track kind: ${sender.track.kind}, readyState: ${sender.track.readyState}`);
      });
      this.attachMediaStreams(peerConnection);
      // Create an SDP offer
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      this.sendAcceptRequest(answer.sdp);

      // Handle ICE candidates
      await this.handleIceCandidates(peerConnection);
      CallState.setPeerConnection(peerConnection);
      CallState.setIncomingCallStatus("accepted");
      CallState.setMediaStream(stream);
      console.log("Incoming call accepted. Peer connection state:", peerConnection.connectionState);
console.log("Local media stream:", stream);
    } catch (error) {
      console.error("Error: ", error);
      alert("Error: " + error);
    }
  }

  handleHangup = () => {
    this.sendHangupRequest();
    CallState.setOutgoingCallStatus("idle");
    CallState.setOutgoingCallStatus(CallState.getOutgoingCallStatus());
  }


  handleAcceptCall = () => {
    console.log("Call accepted from Incoming");
    this.handleIncomingCall().then(() => {
      // setToasterIncoming(false);
      // setToasterOngoing(true);
      // if (ringtonePlaying) {
      //   ringtoneRef.current.pause();
      //   ringtoneRef.current.currentTime = 0;
      //   setRingtonePlaying(false);
      // }
    });
  }
handleDecline = () => {
    if (WebSocketClient && CallState.getIncomingCallStatus() === "incomingcall") {
      this.sendDeclineRequest();
      CallState.setIncomingCallStatus("idle");
      CallState.setIncomingCallStatus(CallState.getIncomingCallStatus());
    }
  }
}

const instance = new WebSocketClient(
  "wss://pbx.cosmocom.net:3000/",
  "janus-protocol"
);

export default instance;
