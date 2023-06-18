import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
	const [description, setDescription] = useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
		setDescription(e.target.value)
	}

    function handleSubmit(e) {
		e.preventDefault();

		onUpdateUser({
			name,
			about: description,
	    })
    }

    useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, isOpen]);

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="form_edit"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            textButton={isLoading ? 'Сохранение...' : 'Сохранить'}
        >
            <input 
                    type="text" 
                    id="username" 
                    required 
                    name="name" 
                    placeholder="Введите ваше имя" 
                    className="popup__input popup__input_type_name"
                    value={name || ''}
                    onChange={handleChangeName}
            />
            <span className="username-error popup__input-error"/>
    
            <input 
                    type="text" 
                    id="user-profession" 
                    required 
                    name="about"
                    placeholder="Род деятельности" 
                    className="popup__input popup__input_type_profession"
                    value={description || ''}
				    onChange={handleChangeDescription}
            />
            <span className="user-profession-error popup__input-error"/>
        </PopupWithForm>
    );
}

export default EditProfilePopup;