import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useRef, useState } from "react";
import getWebRtcServices from "../../../apiServices/WebRtcServices/getWebRtcServices";
import "../../../assets/scss/pages/Contacts.scss";
import ContactModal from "./ContactModal";
import ContactsCategory from "./ContactsCategory";
import ContactsUser from "./ContactsUser";

import WebSocketClient from "./WebSocketClient";
import CallState from "./CallState";
import ToasterIncoming from "./ToasterIncoming";
import ToasterOngoing from "./ToasterOngoing";
import ToasterOngoing2 from "./ToasterOngoingForDialPad";
import ringtone from "./static/whatsapp.mp3";

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Contacts");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  let [phoneNumber, setPhoneNumber] = useState("");
  const [webSocketClient, setWebSocketClient] = useState(null);
  // const peerConnection = new RTCPeerConnection();
  const [outgoingCallStatus, setOutgoingCallStatus] = useState(
    CallState.getOutgoingCallStatus()
  );
  const [incomingCallStatus, setIncomingCallStatus] = useState(
    CallState.getIncomingCallStatus()
  );
  // let callStatus = CallState.getCallStatus();
  const [toasterIncoming, setToasterIncoming] = useState(false);
  const [toasterOngoing, setToasterOngoing] = useState(false);
  const [toasterOngoing2, setToasterOngoing2] = useState(false);

  const ringtoneRef = useRef(new Audio(ringtone));
  const [ringtonePlaying, setRingtonePlaying] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username && password) {
      const client = new WebSocketClient(
        // "wss://103.95.96.100:3000/",
        "wss://pbx.cosmocom.net:3000/",
        "janus-protocol",
        handleOutgoingCallStateChange,
        handleIncomingCallStateChange
      );
      client.connect(username, password);
      setWebSocketClient(client);

      return () => {
        client.disconnect();
      };
    }
  }, []);

  const handleOutgoingCallStateChange = (newStatus) => {
    setOutgoingCallStatus(newStatus);
    if (newStatus === "idle") {
      setToasterOngoing2(false);
    }
  };

  const handleIncomingCallStateChange = (newStatus) => {
    setIncomingCallStatus(newStatus);
    if (newStatus === "idle") {
      if (ringtonePlaying) {
        ringtoneRef.current.pause();
        ringtoneRef.current.currentTime = 0;
        setRingtonePlaying(false);
      }
      setToasterIncoming(false);
      setToasterOngoing(false);
      setToasterOngoing2(false);
    }
  };

  const handleOutgoingCall = async () => {
    if ((phoneNumber || CallState.getContactPhoneNumber()) && webSocketClient) {
      if (!phoneNumber) phoneNumber = CallState.getContactPhoneNumber();
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
        attachMediaStreams(peerConnection);

        // Send the offer via WebSocket
        webSocketClient.sendCallRequest(phoneNumber, offer.sdp);

        // Handle ICE candidates
        await handleIceCandidates(peerConnection);

        // Set the peer connection state
        CallState.setPeerConnection(peerConnection);

        // Update call status
        CallState.setOutgoingCallStatus("calling");
        CallState.setMediaStream(stream);
        setOutgoingCallStatus(CallState.getOutgoingCallStatus());
        console.log(`Calling ${phoneNumber}`);
        setToasterOngoing2(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        alert(
          "Failed to access microphone. Please ensure you have granted permission."
        );
      }
    }
  };

  const handleIncomingCall = async () => {
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
      attachMediaStreams(peerConnection);
      // Create an SDP offer
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      console.log(answer.sdp.toString());
      webSocketClient.sendAcceptRequest(answer.sdp);

      // Handle ICE candidates
      await handleIceCandidates(peerConnection);
      CallState.setPeerConnection(peerConnection);

      CallState.setIncomingCallStatus("accepted");
      CallState.setMediaStream(stream);
      setIncomingCallStatus(CallState.getIncomingCallStatus());
      // console.log(`Calling ${phoneNumber}`);
    } catch (error) {
      console.error("Error: ", error);
      alert("Error: " + error);
    }
  };

  const handleIceCandidates = async (peerConnection) => {
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        const candidate = {
          janus: "trickle",
          candidate: {
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex,
          },
          transaction: WebSocketClient.randomString(12),
          session_id: webSocketClient.sessionId,
          handle_id: webSocketClient.handleId,
        };
        webSocketClient.sendMessage(JSON.stringify(candidate));
      } else {
        const completedCandidate = {
          janus: "trickle",
          candidate: { completed: true },
          transaction: WebSocketClient.randomString(12),
          session_id: webSocketClient.sessionId,
          handle_id: webSocketClient.handleId,
        };
        webSocketClient.sendMessage(JSON.stringify(completedCandidate));
        console.log("Sending ICE candidate completion.");
      }
    };
  };

  const handleIncomingCallToast = () => {
    setToasterIncoming(true);
    ringtoneRef.current
      .play()
      .then(() => {
        setRingtonePlaying(true);
      })
      .catch((error) => {
        console.error("Error playing ringtone:", error);
      });
  };
  const handleAcceptCall = () => {
    console.log("Call accepted from Incoming");
    handleIncomingCall().then(() => {
      setToasterIncoming(false);
      setToasterOngoing(true);
      if (ringtonePlaying) {
        ringtoneRef.current.pause();
        ringtoneRef.current.currentTime = 0;
        setRingtonePlaying(false);
      }
    });
  };

  useEffect(() => {
    if (incomingCallStatus === "incomingcall") {
      handleIncomingCallToast();
    }
  }, [incomingCallStatus]);
  const attachMediaStreams = (peerConnection) => {
    peerConnection.getReceivers().forEach((receiver) => {
      if (receiver.track.kind === "audio") {
        const remoteAudio = document.getElementById("remoteAudio");
        if (remoteAudio) {
          remoteAudio.srcObject = new MediaStream([receiver.track]);
          console.log("Attached remote audio stream");
        }
      }
    });

    peerConnection.ontrack = (event) => {
      event.streams.forEach((stream) => {
        const remoteAudio = document.getElementById("remoteAudio");
        if (remoteAudio) {
          remoteAudio.srcObject = stream;
          console.log("Remote stream added to audio element", stream);
        }
      });
    };
  };
  const handleDecline = () => {
    if (webSocketClient && incomingCallStatus === "incomingcall") {
      if (ringtonePlaying) {
        ringtoneRef.current.pause();
        ringtoneRef.current.currentTime = 0;
        setRingtonePlaying(false);
      }
      webSocketClient.sendDeclineRequest();
      CallState.setIncomingCallStatus("idle");
      setIncomingCallStatus(CallState.getIncomingCallStatus());
      // console.log(`Call with ${phoneNumber} ended`);
    }
  };
  const handleHangup = () => {
    webSocketClient.sendHangupRequest();
    CallState.setOutgoingCallStatus("idle");
    setOutgoingCallStatus(CallState.getOutgoingCallStatus());
  };

  useEffect(() => {
    if (incomingCallStatus === "incomingcall") {
      handleIncomingCallToast();
    }
    if (incomingCallStatus === "idle") {
      if (ringtonePlaying) {
        ringtoneRef.current.pause();
        ringtoneRef.current.currentTime = 0;
        setRingtonePlaying(false);
      }
    }
  }, [incomingCallStatus]);

  const [showContacts, setShowContacts] = useState(
    JSON.parse(localStorage.getItem("contacts")) ?? []
  );
  const username = localStorage.getItem("username");

  const loadContactsFromLocalStorage = () => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) ?? [];
    setContacts(storedContacts);
    setShowContacts(storedContacts);
  };

  const saveContactsToLocalStorage = (contacts) => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await getWebRtcServices.fetchAllContacts(username);
      const initialContacts = data.map((contact) => ({
        ...contact,
        isHovered: false,
        isFavourite: false,
      }));
      setShowContacts(initialContacts);
      setContacts(initialContacts);
      saveContactsToLocalStorage(initialContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (!storedContacts || storedContacts.length === 0) {
      fetchContacts();
    } else {
      loadContactsFromLocalStorage();
    }
  }, []);

  const handleAddContact = async (formData) => {
    setLoading(true);
    try {
      const newContact = await getWebRtcServices.createContact({
        ...formData,
        username,
      });
      setContacts((prev) => {
        const updatedContacts = [
          ...prev,
          { ...newContact, isFavourite: false },
        ];
        saveContactsToLocalStorage(updatedContacts);
        return updatedContacts;
      });
      setShowContacts((prev) => {
        const updatedContacts = [
          ...prev,
          { ...newContact, isFavourite: false },
        ];
        return updatedContacts;
      });
    } catch (error) {
      console.error("Error adding contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async (id) => {
    setLoading(true);
    try {
      await getWebRtcServices.deleteContact(id);
      setContacts((prev) => {
        const updatedContacts = prev.filter((contact) => contact.id !== id);
        saveContactsToLocalStorage(updatedContacts);
        return updatedContacts;
      });
      setShowContacts((prev) => {
        const updatedContacts = prev.filter((contact) => contact.id !== id);
        return updatedContacts;
      });
    } catch (error) {
      console.error("Error deleting contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavourite = (id) => {
    setContacts((prev) => {
      const updatedContacts = prev.map((contact) =>
        contact.id === id
          ? { ...contact, isFavourite: !contact.isFavourite }
          : contact
      );
      const favouriteContacts = updatedContacts.filter(
        (contact) => contact.isFavourite
      );
      localStorage.setItem(
        "favouriteContacts",
        JSON.stringify(favouriteContacts)
      );
      if (selectedCategory === "Favourites") {
        setShowContacts(favouriteContacts);
      } else {
        setShowContacts(updatedContacts);
      }
      saveContactsToLocalStorage(updatedContacts);
      return updatedContacts;
    });
  };

  const handleChangeCategory = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");

    if (category === "Favourites") {
      const favouriteContacts = JSON.parse(
        localStorage.getItem("favouriteContacts") ?? "[]"
      );
      setShowContacts(favouriteContacts);
    } else {
      setShowContacts(contacts);
    }
  };

  const handleEditContact = async (id, formData) => {
    setLoading(true);
    try {
      await getWebRtcServices.updateContact({ id: id, ...formData });
      setContacts((prev) => {
        const updatedContacts = prev.map((contact) =>
          contact.id === id ? { ...contact, ...formData } : contact
        );
        saveContactsToLocalStorage(updatedContacts);
        return updatedContacts;
      });
      setShowContacts((prev) => {
        const updatedContacts = prev.map((contact) =>
          contact.id === id ? { ...contact, ...formData } : contact
        );
        return updatedContacts;
      });
    } catch (error) {
      console.error("Error Updating contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchText) => {
    setSearchTerm(searchText);
    const value = searchText.toLowerCase();

    let filteredContacts = [...contacts];

    if (selectedCategory === "Favourites") {
      filteredContacts = filteredContacts.filter(
        (contact) => contact.isFavourite
      );
    }

    const results = filteredContacts.filter((contact) =>
      (contact.firstName + contact.lastName).toLowerCase().includes(value)
    );

    setShowContacts(results);
  };

  const handleMouseLeave = () => {
    setShowContacts((prev) =>
      prev.map((contact) => ({ ...contact, isHovered: false }))
    );
  };

  const colors = ["#1D94AB", "#5D0E41", "#070F2B", "#5C469C", "#028391"];

  return (
    <div className="contacts">
      {toasterIncoming && (
        <ToasterIncoming
          onHangup={handleDecline}
          onAccept={handleAcceptCall}
          // phoneNumber={phoneNumber}
        />
      )}
      {toasterOngoing && (
        <ToasterOngoing
          onEndCall={handleHangup}
          // callerName={phoneNumber}
          // phoneNumber={phoneNumber}
          // setToasterOngoing={setToasterOngoing}
        />
      )}
      {toasterOngoing2 && (
        <ToasterOngoing2
          onEndCall={handleHangup}
          // callerName={phoneNumber}
          // phoneNumber={phoneNumber}
          // setToasterOngoing={setToasterOngoing2}
        />
      )}
      <div className="contacts__sidebar">
        <div className="contacts__sidebar--search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <ul className="contacts__sidebar--list">
          {["All Contacts", "Favourites"].map((category) => (
            <ContactsCategory
              key={category}
              selectedCategory={selectedCategory}
              handleChangeCategory={handleChangeCategory}
              category={category}
            />
          ))}
        </ul>
      </div>
      <div className="contacts__list">
        <div>
          <h3>{selectedCategory}</h3>
          <span>{showContacts?.length ?? 0} Contacts</span>
        </div>
        {loading ? (
          <div className="contacts__loading">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <ul onMouseLeave={handleMouseLeave}>
            {showContacts?.map((contact, i) => (
              <ContactsUser
                key={contact.id}
                contact={contact}
                contacts={showContacts}
                handleOutgoingCalls={handleOutgoingCall}
                setContacts={setShowContacts}
                handleFavourite={handleFavourite}
                handleEditContact={handleEditContact}
                handleDeleteContact={handleDeleteContact}
                bgColor={colors[i % colors.length]}
              />
            ))}
          </ul>
        )}
      </div>
      <div className="contacts__add">
        <ContactModal type="Add" handleAddContact={handleAddContact} />
      </div>
      <audio id="remoteAudio" autoPlay></audio>
    </div>
  );
};

export default Contacts;
