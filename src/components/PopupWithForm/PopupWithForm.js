import React from 'react';

function PopupWithForm({ title, name, isOpen, onClose, onSubmit, textButton, ...props }) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id={`popup-${name}`} >
            <div className="popup__container">

                <button onClick={onClose} type="button" id="btn-close-edit" className="popup__close effect" />

                <div className="popup__wrapper">

                    <form name={name} id={name} onSubmit={onSubmit} className={`popup__form popup__${name}`}>
                        <h3 className="popup__title">{title}</h3>

                        {props.children}

                        <button type="submit" className="popup__button effect">{textButton}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PopupWithForm;