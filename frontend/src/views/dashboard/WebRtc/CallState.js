class CallState {
  constructor() {
    if (!CallState.instance) {
      this.peerConnection = new RTCPeerConnection();
      this.outgoingCallStatus = "idle";
      this.incomingCallStatus = "idle";
      this.incomingUser = null;
      this.mediaStream = null;
      this.phoneNumber = null;
      this.windowStatus = null;
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

  setPhoneNumber(number) {
    this.phoneNumber = number;
  }
  getPhoneNumber() {
    return this.phoneNumber;
  }

  setContactPhoneNumber(number) {
    this.phoneNumber = number;
  }
  getContactPhoneNumber() {
    return this.phoneNumber;
  }

  setIncomingCallStatus(status) {
    this.incomingCallStatus = status;
  }
  getIncomingCallStatus() {
    return this.incomingCallStatus;
  }
  setWindowStatus(status) {
    this.windowStatus = status;
  }
  getWindowStatus() {
    return this.windowStatus;
  }
  getOutgoingCallStatus() {
    return this.outgoingCallStatus;
  }

  setIncomingUser(number) {
    this.incomingUser = number;
  }

  getIncomingUser(){
    return this.incomingUser?.slice(1, -1);
  }
}

const instance = new CallState();
// Object.freeze(instance);

export default instance;
