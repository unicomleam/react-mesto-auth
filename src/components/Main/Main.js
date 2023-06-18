import React, { useContext } from 'react';
import Card from '../Card/Card.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onDeliteCard, onLikeCard, onCardClick}) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <img src={currentUser.avatar} alt="Аватар" className="profile__avatar"/>
                <div onClick={onEditAvatar} className="profile__avatar-icon effect"></div>
                <div className="profile__info">
                    <div className="profile__redact-block">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button onClick={onEditProfile} type="button" aria-label="profile edit" className="profile__edit-button effect"></button>
                    </div>
                    <p className="profile__profession">{currentUser.about}</p>
                </div>
                <button onClick={onAddPlace} type="button" aria-label="profile add card" className="profile__add-button effect"></button>
            </section>

            <section className="gallery">
                <ul className="gallery__elements">
                    { cards.map((card) => {
                        return <Card
                                        key={card._id}
                                        card={card}
                                        onDeliteCard={onDeliteCard}
                                        onCardClick={onCardClick}
                                        onLikeCard={onLikeCard}
                                />
                    }) }
                </ul>
            </section>
        </main>
    );
};

export default Main;