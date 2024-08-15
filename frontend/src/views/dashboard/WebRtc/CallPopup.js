import React from "react";
import "../../../assets/scss/CallPopup.scss";

export default function CallPopup({ onAnswer, onReject }) {
  return (
    <div className="call-popup">
      <div className="call-popup__content">
        <h3>Incoming Call</h3>
        <button className="call-popup__button" onClick={onAnswer}>
          Answer
        </button>
        <button className="call-popup__button" onClick={onReject}>
          Reject
        </button>
      </div>
    </div>
  );
}
