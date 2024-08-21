import React from "react";

const Dialpad = ({
  phoneNumber,
  callStatus,
  handleButtonClick,
  handleBackspace,
  handleCall,
  handleHangup,
}) => {
  return (
    <div className="dialpad">
      <input
        type="text"
        value={phoneNumber}
        readOnly
        placeholder="Enter name or number"
      />
      <div></div>
      <div className="dialpad__numbers">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((value) => (
          <button key={value} onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}
      </div>
      <div className="dialpad__icons">
        <button onClick={handleBackspace}>⌫</button>
        {callStatus === "idle" ? (
          <button onClick={handleCall}>
            <i className="fas fa-phone"></i>
          </button>
        ) : (
          <button
            onClick={handleHangup}
            className="dial-action-button hangup-button"
          >
            <i className="fas fa-phone-slash"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Dialpad;
