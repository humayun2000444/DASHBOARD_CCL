class CallState {
  constructor() {
    if (!CallState.instance) {
      this.peerConnection = new RTCPeerConnection();
      this.outgoingCallStatus = "idle";
      this.incomingCallStatus = "idle";
      this.incomingUser = null;
      this.mediaStream = null;
      CallState.instance = this;
    }
    return CallState.instance;
  }

  setMediaStream(stream){
    this.mediaStream = stream;
  }

  getMediaStream(){
    return this.mediaStream;
  }

  setPeerConnection(peerConnection) {
    this.peerConnection = peerConnection;
  }

  getPeerConnection() {
    return this.peerConnection;
  }

  setOutgoingCallStatus(status) {
    this.outgoingCallStatus = status;
  }

  setIncomingCallStatus(status) {
    this.incomingCallStatus = status;
  }
  getIncomingCallStatus() {
    return this.incomingCallStatus;
  }

  getOutgoingCallStatus() {
    return this.outgoingCallStatus;
  }

  setIncomingUser(number) {
    this.incomingUser = number;
  }

  getIncomingUser(){
    const number = this.incomingUser.slice(2, -2);
    return number;
  }
}

const instance = new CallState();
// Object.freeze(instance);

export default instance;
