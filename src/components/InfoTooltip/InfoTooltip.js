import React from "react";

function InfoTooltip({ image, text, isOpen, onClose }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
	    <div className="popup__container">
				<button className="popup__close effect" type="button" onClick={onClose} />
        <div className="popup__wrapper">
          <img className="tooltip__image" src={image} alt={text} />
				  <h2 className="tooltip__title">{text}</h2>
        </div>
			</div>
		</div>
  )
}

export default InfoTooltip;