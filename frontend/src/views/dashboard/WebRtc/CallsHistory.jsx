import React from "react";

const CallsHistory = ({ callHistory, setCallHistory }) => {
  // {
  //   callerName: "Rizwan",
  //   number: "8801712069453",
  //   status: "Missed call",
  //   time: "7/16 12:38 PM",
  // },

  const redColor = {
    color: "#F23557",
  };
  const colors = ["#164677", "#5D0E41", "#070F2B", "#5C469C", "#028391"];

  const handleMouseHover = (id) => {
    const mappedArray = callHistory.map((call) => {
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

  return (
    <div className="calls__history">
      {callHistory.map((singleCall, i) => (
        <div
          key={singleCall.id}
          onMouseOver={() => handleMouseHover(singleCall.id)}
        >
          <div class="calls__history--users">
            <div style={{ backgroundColor: colors[i % colors.length] }}>
              <i class="fa-solid fa-user"></i>
            </div>
            <div>
              <p style={singleCall.duration === "0s" ? redColor : null}>
                {singleCall.callerName.length !== 0
                  ? singleCall.callerName
                  : singleCall.number}
              </p>
              <p style={singleCall.duration === "0s" ? redColor : null}>
                {singleCall.number}
              </p>
            </div>
          </div>
          <div className="calls__history--status">
            <div>
              {singleCall.duration !== "0s" && (
                <i
                  class="fa-solid fa-arrow-right"
                  style={
                    singleCall.callStatus === "inbound"
                      ? { transform: "rotate(-45deg)" }
                      : { transform: "rotate(135deg)" }
                  }
                ></i>
              )}
              {singleCall.duration === "0s" ? (
                <i class="fa-solid fa-phone-slash"></i>
              ) : (
                <i class="fa-solid fa-phone"></i>
              )}
            </div>
            <p style={singleCall.duration === "0s" ? redColor : null}>
              {singleCall.duration === "0s"
                ? "Missed call"
                : singleCall.duration}
            </p>
          </div>
          <div className="calls__history--time">
            {singleCall.isHovered ? (
              <i class="fa-solid fa-phone-flip"></i>
            ) : (
              <p style={singleCall.duration === "0s" ? redColor : null}>
                {singleCall.time}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CallsHistory;
