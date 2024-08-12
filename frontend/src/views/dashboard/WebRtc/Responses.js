// JanusEvent.js
export default class JanusEvent {
  constructor(data) {
    this.data = data;
  }

  getJanus() {
    return this.data.janus;
  }

  getSessionId() {
    return this.data.session_id;
  }

  getTransaction() {
    return this.data.transaction;
  }

  getSender() {
    return this.data.sender;
  }

  getPluginData() {
    return this.data.plugindata;
  }

  getPlugin() {
    return this.data.plugindata.plugin;
  }

  getResult() {
    return this.data.plugindata.data.result;
  }

  getEvent() {
    return this.data.plugindata.data.result.event;
  }

  getUsername() {
    return this.data.plugindata.data.result.username;
  }

  getCallId() {
    return this.data.plugindata.data.call_id;
  }

  getJsep() {
    return this.data.jsep;
  }

  getJsepType() {
    return this.data.jsep.type;
  }

  getJsepSdp() {
    return this.data.jsep.sdp;
  }
}
