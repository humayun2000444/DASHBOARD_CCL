class WebSocketClient {
  constructor(url, onMessage, protocol = null) {
    this.url = url;
    this.onMessage = onMessage;
    this.protocol = protocol;
    this.socket = null;
    this.sessionId = null;
    this.handleId = null;
    this.attached = false;
    this.username = null;
    this.password = null;
    this.transactions = {}; // Add transactions definition here
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
      console.log(event);
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
    }, 10000);
  }

  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
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
    if (json.janus === "keepalive") {
      return;
    } else if (json.janus === "server_info") {
      const transaction = json.transaction;
      if (transaction) {
        const reportSuccess = this.transactions[transaction]; // Use this.transactions
        if (reportSuccess) reportSuccess(json);
        delete this.transactions[transaction]; // Use this.transactions
      }
      return;
    } else if (json.janus === "ack") {
      return;
    } else if (json.janus === "success") {
      if (!this.sessionId) {
        this.sessionId = json.data.id;
      }
      if (json.data && json.data.id) {
        this.handleId = json.data.id;
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
      if (this.sessionId && this.handleId) {
        this.sendMessage(JSON.stringify({
          janus: "message",
          body: {
            request: "register",
            username: `sip:${this.username}@103.95.96.100`,
            authuser: this.username,
            display_name: "Humayun",
            secret: this.password,
            proxy: "sip:103.95.96.100:5060"
          },
          transaction: WebSocketClient.randomString(12),
          session_id: this.sessionId,
          handle_id: this.handleId
        }));
      } else {
        console.error("sessionId or handleId is not set");
      }
      return;
    } else {
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
