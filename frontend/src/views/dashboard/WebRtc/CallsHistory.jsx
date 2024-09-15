import React, { useEffect, useState } from "react";
import CallState from "./CallState";
import { useContact } from "./ContactContext";
const CallsHistory = ({ callHistory, setCallHistory, handleOutgoingCalls }) => {
  const redColor = {
    color: "#F23557",
  };
  const colors = ["#164677", "#5D0E41", "#070F2B", "#5C469C", "#028391"];

  const { contacts } = useContact(); // Get contacts from context

  const [outBoundDisplayNames, setOutBoundDisplayNames] = useState({});
  const [inBoundDisplayNames, setInBoundDisplayNames] = useState({});

  useEffect(() => {
    const mapOutBoundDisplayNames = callHistory.reduce((acc, singleCall) => {
      const contact = contacts.find(
        (contact) => contact.phone === singleCall.callerDestination
      );
      acc[singleCall.id] = contact
        ? `${contact.firstName} ${contact.lastName}`
        : singleCall.callerDestination;
      return acc;
    }, {});
    setOutBoundDisplayNames(mapOutBoundDisplayNames);
  }, [callHistory, contacts]);

  useEffect(() => {
    const mapInBoundDisplayNames = callHistory.reduce((acc, singleCall) => {
      const contact = contacts.find(
        (contact) => contact.phone === singleCall.callerIdNumber
      );
      acc[singleCall.id] = contact
        ? `${contact.firstName} ${contact.lastName}`
        : singleCall.callerIdNumber;
      return acc;
    }, {});
    setInBoundDisplayNames(mapInBoundDisplayNames);
  }, [callHistory, contacts]);

  const handleMouseHover = (id) => {
    const mappedArray = callHistory?.map((call) => {
      if (call.id === id) {
        return {
          ...call,
          isHovered: true,
        };
      } else {
        return {
          ...call,
          isHovered: false,
        };
      }
    });
    setCallHistory(mappedArray);
  };

  const handleCall = (singleCall) => {
    if (singleCall.direction === "outbound") {
      CallState.setPhoneNumber(singleCall.callerDestination);
    } else CallState.setPhoneNumber(singleCall.callerIdNumber);

    handleOutgoingCalls();
  };

  const handleMouseLeave = () => {
    const mappedArray = callHistory?.map((call) => {
      return {
        ...call,
        isHovered: false,
      };
    });
    setCallHistory(mappedArray);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${day}/${month}/${year} ${hours}:${minutes}${ampm}`;
  };

  const formatDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    let formattedDuration = "";
    if (hours > 0) {
      formattedDuration += `${hours}h `;
    }
    if (minutes > 0) {
      formattedDuration += `${minutes}min `;
    }
    if (seconds > 0 || (hours === 0 && minutes === 0)) {
      formattedDuration += `${seconds}s`;
    }
    return formattedDuration.trim();
  };

  const sortedCallHistory = [...callHistory].sort(
    (a, b) => new Date(b.startStamp) - new Date(a.startStamp)
  );

  return (
    <div className="calls__history" onMouseLeave={handleMouseLeave}>
      {sortedCallHistory?.map((singleCall, i) => (
        <div
          key={singleCall.id}
          onMouseOver={() => handleMouseHover(singleCall.id)}
        >
          <div className="calls__history--users">
            <div style={{ backgroundColor: colors[i % colors.length] }}>
              <i className="fa-solid fa-user"></i>
            </div>
            <div>
              <p style={singleCall.duration === null ? redColor : null}>
                {singleCall.direction === "outbound"
                  ? outBoundDisplayNames[singleCall.id]
                  : inBoundDisplayNames[singleCall.id]}
              </p>
              <p style={singleCall.duration === null ? redColor : null}>
                {singleCall.direction === "outbound"
                  ? singleCall.callerDestination
                  : singleCall.callerIdNumber}
              </p>
            </div>
          </div>
          <div className="calls__history--status">
            <div>
              {singleCall.duration === null
                ? singleCall.direction !== "local" && (
                    <i className="fa-solid fa-phone-slash"></i>
                  )
                : singleCall.direction !== "local" && (
                    <i className="fa-solid fa-phone"></i>
                  )}

              {singleCall.direction !== "local" &&
                singleCall.duration !== null && (
                  <i
                    className="fa-solid fa-arrow-right"
                    style={
                      singleCall.direction === "outbound"
                        ? { transform: "rotate(-45deg)" }
                        : { transform: "rotate(135deg)" }
                    }
                  ></i>
                )}

              {singleCall.direction === "local" && (
                <i className="fa-solid fa-arrow-right-arrow-left"></i>
              )}
            </div>
            <p
              style={
                singleCall.duration === null
                  ? { ...redColor, textTransform: "capitalize" }
                  : { textTransform: "capitalize" }
              }
            >
              {singleCall.duration === null
                ? singleCall.status
                : formatDuration(singleCall.duration)}
            </p>
          </div>
          <div className="calls__history--time">
            {singleCall.isHovered ? (
              <button onClick={() => handleCall(singleCall)}>
                <i className="fa-solid fa-phone"></i>
              </button>
            ) : (
              <p style={singleCall.duration === null ? redColor : null}>
                {formatDate(singleCall.startStamp)}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CallsHistory;
