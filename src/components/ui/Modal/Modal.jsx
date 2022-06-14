import React from "react";

import "./modal.css";

const Modal = ({ setShowModal }) => {
  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h4 className="text-center text-light">Place your offer</h4>
        <p className="text-center text-light" style={{ fontSize: 15}}>
          You will be the owner of this dApp if the current owner accepts your offer.
        </p>

        <div className="input__item mb-4">
          <input type="number" placeholder="NEAR" />
        </div>

        <button className="place__bid-btn" onClick={() => setShowModal(false)}>Offer</button>
      </div>
    </div>
  );
};

export default Modal;
