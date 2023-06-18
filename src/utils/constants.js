export const nameConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export const templateSelector = '#template-card-element';
export const buttonEditAvatar = document.querySelector('.profile__avatar-icon');
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('#popup-form-edit');
const popupAdd = document.querySelector('#popup-form-add');
const popupAvatar = document.querySelector('#popup-edit-avatar');

export const profileForm = popupEdit.querySelector('.popup__form_edit');
export const cardAddForm = popupAdd.querySelector('.popup__form_add');
export const avatarForm = popupAvatar.querySelector('.popup__form_avatar');

export const popupName = document.querySelector('.popup__input_type_name');
export const popupProfession = document.querySelector('.popup__input_type_profession');