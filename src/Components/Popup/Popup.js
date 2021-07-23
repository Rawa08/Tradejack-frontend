import './Popup.css'
import React from "react";

const Popup = ({content, togglePopup}) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={togglePopup}>x</span>
        {content}
      </div>
    </div>
  );
};

export default Popup;