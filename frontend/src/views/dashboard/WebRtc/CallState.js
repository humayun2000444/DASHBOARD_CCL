class CallState {
  constructor() {
    if (!CallState.instance) {
      this.peerConnection = new RTCPeerConnection();
      this.callStatus = 'idle';
      CallState.instance = this;
    }
    return CallState.instance;
  }

  setPeerConnection(peerConnection) {
    this.peerConnection = peerConnection;
  }

  getPeerConnection() {
    return this.peerConnection;
  }

  setCallStatus(status) {
    this.callStatus = status;
  }

  getCallStatus() {
    return this.callStatus;
  }
}

const instance = new CallState();
// Object.freeze(instance);

export default instance;
