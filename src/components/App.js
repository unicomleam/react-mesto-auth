import React, { useState, useEffect } from 'react';

import Header from "./Header/Header.js";
import Main from "./Main/Main.js";
import Footer from "./Footer/Footer.js";

import EditProfilePopup from "./PopupWithForm/EditProfilePopup.js";
import EditAvatarPopup from './PopupWithForm/EditAvatarPopup.js';
import AddPlacePopup from './PopupWithForm/AddPlacePopup.js';
import DeleteCardPopup from './PopupWithForm/DeleteCardPopup.js';

import ImagePopup from './ImagePopup/ImagePopup.js';
import api from '../utils/Api.js';

import CurrentUserContext from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpened] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpened] = useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpened] = useState(false);

  const [deletePlace, setDeletePlace] = useState(null)
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api.getUserInfo()
      .then((userData) => { setCurrentUser(userData) })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then((arrayCards) => { setCards(arrayCards) })
      .catch(console.error);
  }, []);

  function handleEditProfileClick() {
    setEditProfileOpened(true)
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpened(true);
  };

  function handleEditAvatarClick() {
    setEditAvatarPopupOpened(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card)
  };

  function handleDeleteCardClick(card) {
    setDeletePlace(card);
    setDeleteCardPopupOpened(true);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => { setCards((state) => state.map((c) => c._id === card._id ? newCard : c))})
      .catch(console.error)
    };

  function handleUpdateUser(userData) {
    setIsLoading(true)
		api.patchUserInfo(userData)
			.then(setCurrentUser)
			.then(() => { closeAllPopups() })
			.catch(console.error)
			.finally(() => setIsLoading(false))
  };

  function handleUpdateAvatar(userData) {
		setIsLoading(true)
		api.patchUserAvatar(userData)
			.then(setCurrentUser)
			.then(() => { closeAllPopups() })
			.catch(console.error)
			.finally(() => setIsLoading(false))
	};

  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .then(() => { closeAllPopups() })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  };

  function handleAddPlaceSubmit(userData) {
		setIsLoading(true)
		api.postNewCard(userData)
			.then((newCard) => setCards([newCard, ...cards]))
			.then(() => { closeAllPopups() })
			.catch(console.error)
			.finally(() => setIsLoading(false))
	};

  function closeAllPopups() {
    setEditProfileOpened(false);
    setEditAvatarPopupOpened(false);
	  setAddPlacePopupOpened(false);
    setDeleteCardPopupOpened(false);
    setSelectedCard(null);
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
            <Header />
            <Main
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onDeliteCard={handleDeleteCardClick}
                onLikeCard={handleCardLike}
                onCardClick={handleCardClick}
            />
            <Footer />

            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading}/>

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />

            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading}/>

            <DeleteCardPopup card={deletePlace} isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} isLoading={isLoading}/>

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
