class CallState {
  constructor() {
    if (!CallState.instance) {
      this.peerConnection = new RTCPeerConnection();
      this.callStatus = 'idle';
      this.incomingCallStatus = "idle";
      this.incomingUser = null;
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

  setIncomingCallStatus(status) {
    this.incomingCallStatus = status;
  }
  getIncomingCallStatus() {
    return this.incomingCallStatus;
  }

  getCallStatus() {
    return this.callStatus;
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
