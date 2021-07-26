import './Popup.css'
import React from "react";


const Popup = ({content, togglePopup}) => {
  return (
    <div className="popup-box">
      <div className="box">
        <button className="close-icon" onClick={togglePopup}>X</button>
        {content}
      </div>
    </div>
  );
};

export default Popup;