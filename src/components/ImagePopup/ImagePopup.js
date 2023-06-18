function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_background ${card ? "popup_opened" : ""}`}>
            <div className="popup__image-container">
                <button type="button" id="btn-close-img" onClick={onClose} className="popup__close effect" />
                <img className="popup__image" alt={card?.name} src={card?.link} />
                <figcaption className="popup__figcaption">{card?.name}</figcaption>
            </div>
        </div>
    );
};

export default ImagePopup;