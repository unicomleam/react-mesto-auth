import { useContext } from "react";
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Card({ card, onDeliteCard, onLikeCard, onCardClick }) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
		`element__like-button ${isLiked && "element__like-button_active"}`
	);

    function deleteCard(e) {
        e.stopPropagation();
        onDeliteCard(card);
    }

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onLikeCard(card);
    };

    return (
        <li className="element">
            {isOwn && <button type="button" className="element__delete effect" onClick={deleteCard} />}
            <img alt={card.name} src={card.link} onClick={handleClick} className="element__image"/>
            <div className="element__bottom-group">
                <h2 className="element__appellation">{card.name}</h2>
                <div className="element__like-column">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
                    <span className="element__like-counter">{card.likes.length}</span>
                </div>
            </div>
        </li>
    );
};

export default Card;