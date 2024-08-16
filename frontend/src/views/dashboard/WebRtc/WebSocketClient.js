import JanusEvent from "./Responses";
import CallState from "./CallState";

class WebSocketClient {

  constructor(url, protocol = null, onCallStateChange) {
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
    this.onCallStateChange = onCallStateChange;
    this.pluginHandles = {};
  }

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
      console.log(event.data.toString());
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
      console.log(message.toString());
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
    const peerConnection = callState.getPeerConnection();
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
      CallState.setCallStatus("idle");
      if (this.onCallStateChange) this.onCallStateChange("idle");
      this.sendHangupRequest();
    }
    else if (json.janus === "event")
    {
      const event = janusEvent.getEvent();
      if (event === "accepted") {
        callState.setCallStatus("connected");
        if (this.onCallStateChange) this.onCallStateChange("connected");
      } else if (event === "hangup") {
        callState.setCallStatus("idle");
        if (this.onCallStateChange) this.onCallStateChange("idle");
      }
      else if (janusEvent.getPlugin() === "janus.plugin.sip") {
        // console.log(janusEvent.getPlugin());
        const jsep = janusEvent.getJsep();
        if (jsep && janusEvent.getJsepType() === "answer") {
          peerConnection.setRemoteDescription(new RTCSessionDescription(jsep))
            .then(() => console.log('Remote description set with SDP answer'))
            .catch(error => console.error('Error setting remote description:', error));
          if (event === "progress") {
            console.log(`Call is in progress with ${janusEvent.getUsername()}`);
          }
          callState.setCallStatus("in_call");
          if (this.onCallStateChange) this.onCallStateChange("in_call");
          callState.setPeerConnection(peerConnection);
        }
        else if (jsep && janusEvent.getJsepType() === "offer") {
          peerConnection.setRemoteDescription(new RTCSessionDescription(jsep))
            .then(() => console.log('Remote description set with SDP answer'))
            .catch(error => console.error('Error setting remote description:', error));
          if (event === "incomingcall") {
            // console.log(`Call is in progress with ${janusEvent.getUsername()}`);
          }
          callState.setCallStatus("incomingcall");
          callState.setIncomingUser(janusEvent.getDisplayname)
          if (this.onCallStateChange) this.onCallStateChange("incomingcall");
          callState.setPeerConnection(peerConnection);
        }
      }
    }
    else if(janusEvent.getEvent === "accepted")
    {
        callState.setCallStatus("accepted");
        if (this.onCallStateChange) this.onCallStateChange("accepted");
    }
    else if(json.janus === "media")
    {
      console.log("media received");
    }
    else if(json.janus === "webrtcup")
    {
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
