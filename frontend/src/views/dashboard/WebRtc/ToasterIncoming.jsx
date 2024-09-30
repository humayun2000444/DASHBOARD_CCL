import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import { useContact } from "./ContactContext";
import CallState from "./CallState";

const ToasterIncoming = ({ phoneNumber, onHangup, onAccept }) => {
  const { contacts } = useContact(); // Get contacts from context
  const [displayName, setDisplayName] = useState(phoneNumber); // Default to phone number

  // Get the callerName from CallState
  const callerName = CallState.getIncomingUser();

  // useEffect(() => {
  //   // Find contact where the phone matches the callerName
  //   const contact = contacts.find(contact => contact.phone === callerName);
  //   if (contact) {
  //     // If the callerName matches a contact's phone, use the firstName + lastName
  //     setDisplayName(`${contact.firstName} ${contact.lastName}`);
  //   } else {
  //     // If no match, use the callerName
  //     setDisplayName(callerName);
  //   }
  // }, [contacts, callerName]);
  useEffect(() => {
    if (Array.isArray(contacts)) {
      const contact = contacts.find(contact => contact.phone === phoneNumber);
      if (contact) {
        setDisplayName(`${contact.firstName} ${contact.lastName}`);
      } else {
        setDisplayName(phoneNumber);
      }
    } else {
      setDisplayName(phoneNumber);
    }
  }, [contacts, phoneNumber]);
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "10%",
        zIndex: 999,
        transform: "translate(-50%,-10%)",
        display: "flex",
        alignItems: "center",
        padding: "10px",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "300px",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <AccountCircleIcon
          style={{
            width: "50px",
            height: "50px",
            color: "#4CAF50",
            marginRight: "10px",
          }}
        />
        <div>
          <p style={{margin: 0, fontWeight: "bold"}}>{displayName}</p>
          <p style={{margin: 0, fontWeight: "bold"}}>{callerName}</p>
          <p style={{margin: 0, color: "#666"}}>Incoming call</p>
        </div>
      </div>
      <div style={{display: "flex", gap: "10px"}}>
        <button
          style={{
            backgroundColor: "#ff4b4b",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
          onClick={onHangup}
        >
          <PhoneDisabledIcon />
        </button>
        <button
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
          onClick={onAccept}
        >
          <PhoneIcon />
        </button>
      </div>
    </div>
  );
};

export default ToasterIncoming;
