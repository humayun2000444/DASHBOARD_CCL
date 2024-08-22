import JanusEvent from "./Responses";
import CallState from "./CallState";

class WebSocketClient {

  constructor(url, protocol = null, onOutgoingCallStateChange, onIncomingCallStateChange) {
    this.url = url;
    // this.onMessage = onMessage;
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
  }

  incomingCallStatus = false;
  connect(username, password) {
    this.username = username;
    this.password = password;

    this.socket = this.protocol ? new WebSocket(this.url, this.protocol) : new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('Connected to the WebSocket server');
      this.sendMessage(JSON.stringify({
        janus: "create",
        transaction: WebSocketClient.randomString(12)
      }));
    };

    this.socket.onmessage = (event) => {
      // console.log(event.data.toString());
      this.handleEvent(JSON.parse(event.data));
    };

    this.socket.onclose = () => {
      console.log('Disconnected from the WebSocket server');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    this.keepaliveInterval = setInterval(() => {
      if (this.sessionId) {
        this.sendKeepalive();
      }
    }, 15000);
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
        transaction: WebSocketClient.randomString(12)
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
            transaction: WebSocketClient.randomString(12),
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
          opaque_id: `siptest-${WebSocketClient.randomString(12)}`,
          transaction: WebSocketClient.randomString(12),
          session_id: this.sessionId
        }));
        this.attached = true;
      }

    }
    else if(json.janus === "hangup") {
      {
        if(!this.incomingCallStatus)
        {
          CallState.setOutgoingCallStatus("idle");
          if (this.onOutgoingCallStateChange) this.onOutgoingCallStateChange("idle");
        }
        else
        {
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
          callState.setIncomingUser(janusEvent.getDisplayname)
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
      transaction: WebSocketClient.randomString(12),
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
      transaction: WebSocketClient.randomString(12),
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
      transaction: WebSocketClient.randomString(12),
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
      transaction: WebSocketClient.randomString(12),
      session_id: this.sessionId,
      handle_id: this.handleId
    }));
  }

  static randomString(len) {
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < len; i++) {
      const randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
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
  };

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
    if (this.keepaliveInterval) {
      clearInterval(this.keepaliveInterval);
    }
  }
}

export default WebSocketClient;
