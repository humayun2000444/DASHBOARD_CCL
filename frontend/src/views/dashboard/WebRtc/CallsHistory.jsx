import React from "react";

const CallsHistory = ({ callHistory, setCallHistory }) => {
  const redColor = {
    color: "#F23557",
  };
  const colors = ["#164677", "#5D0E41", "#070F2B", "#5C469C", "#028391"];

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
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = String(date.getFullYear()).slice(2); // Get last two digits of the year
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 24-hour to 12-hour format

    return `${day}/${month}/${year} ${hours}:${minutes}${ampm}`;
  };

  return (
    <div className="calls__history" onMouseLeave={handleMouseLeave}>
      {callHistory?.map((singleCall, i) => (
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
                {singleCall.destinationNumber}
              </p>
              <p style={singleCall.duration === null ? redColor : null}>
                {singleCall.destinationNumber}
              </p>
            </div>
          </div>
          <div className="calls__history--status">
            <div>
              {singleCall.duration === null &&
              singleCall.direction !== "local" ? (
                <i className="fa-solid fa-phone-slash"></i>
              ) : (
                <i className="fa-solid fa-phone"></i>
              )}

              {singleCall.direction !== "local" &&
                singleCall.duration !== null && (
                  <i
                    className="fa-solid fa-arrow-right"
                    style={
                      singleCall.direction === "inbound"
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
                : singleCall.duration + "s"}
            </p>
          </div>
          <div className="calls__history--time">
            {singleCall.isHovered ? (
              <button>
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
