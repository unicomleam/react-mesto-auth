import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header/Header.js";
import Main from "./Main/Main.js";
import Footer from "./Footer/Footer.js";

import EditProfilePopup from "./PopupWithForm/EditProfilePopup.js";
import EditAvatarPopup from './PopupWithForm/EditAvatarPopup.js';
import AddPlacePopup from './PopupWithForm/AddPlacePopup.js';
import DeleteCardPopup from './PopupWithForm/DeleteCardPopup.js';
import ImagePopup from './ImagePopup/ImagePopup.js';

import Login from './SignForm/Login.js';
import Register from './SignForm/Register.js';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.js';
import InfoTooltip from './InfoTooltip/InfoTooltip.js';

import api from '../utils/Api.js';
import auth from '../utils/Auth.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import success from '../images/ok.svg';
import fail from '../images/fail.svg';

function App() {
  const navigate = useNavigate();

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpened] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpened] = useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpened] = useState(false);

  const [deletePlace, setDeletePlace] = useState(null)
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [infoTooltipText, setInfoTooltipText] = useState("");
  const [infoTooltipPopup, setInfoTooltipPopup] = useState(false);

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

  useEffect(() => {
    if (loggedIn) {
      api.getDataArray()
        .then(([userInfo, dataInitialCards]) => {
          setCurrentUser(userInfo);
          setCards(dataInitialCards);
        })
        .catch(console.error);
    }
  }, [loggedIn]);

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
    setInfoTooltipPopup(false);
  };

  function handleRegister({ password, email }) {
    auth.signUp({ password, email })
      .then(() => {
        setRegistered(true);
        setInfoTooltipText("Вы успешно зарегистрировались!");
        navigate("/sign-in");
      })
      .catch((err) => {
        setRegistered(false);
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err);
      })
      .finally(() => setInfoTooltipPopup(true));
  }

  function handleLogin({ password, email }) {
    auth.signIn({ password, email })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        setEmail(email);
        navigate("/");
      })
      .catch((err) => {
        setRegistered(false);
        setInfoTooltipPopup(true);
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err);
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/");
        })
        .catch(console.error);
    }
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
  }

  useEffect(() => { tokenCheck() }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
            <Routes >
                <Route
                    path="*"
                    element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
                />
                <Route
                    path="/"
                    element={
                        <>
                            <ProtectedRoute
                                component={Header}
                                email={email}
                                link="/sign-in"
                                text="Выйти"
                                onSignOut={handleSignOut}
                                loggedIn={loggedIn}
                            />

                            <ProtectedRoute
                                component={Main}
                                cards={cards}
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onDeliteCard={handleDeleteCardClick}
                                onLikeCard={handleCardLike}
                                onCardClick={handleCardClick}
                                loggedIn={loggedIn}
                            />

                            <ProtectedRoute component={Footer} loggedIn={loggedIn} />
                        </>
                    }
                />
                <Route
                    path="/sign-up" 
                    element={
                        <>
                            <Header text="Войти" email="" link="/sign-in" />
                            <Register onRegister={handleRegister} />
                        </>
                    }
                />
                <Route
                    path="/sign-in"
                    element={
                        <>
                            <Header text="Регистрация" email="" link="/sign-up" />
                            <Login onLogin={handleLogin} />
                        </>
                    }
                />


            </Routes>

            <InfoTooltip
                isOpen={infoTooltipPopup}
                image={registered ? success : fail}
                text={infoTooltipText}
                onClose={closeAllPopups}
            />

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
