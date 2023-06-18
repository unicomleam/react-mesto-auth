import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
    const [name, setName] = useState('');
	const [link, setLink] = useState('');

	function handleChangeName(e) {
		setName(e.target.value)
	};

	function handleChangeLink(e) {
		setLink(e.target.value)
	};

	function handleSubmit(e) {
		e.preventDefault();

		onAddPlace({
			name,
			link
		});
	};

    useEffect(() => {
		setName('');
		setLink('');
	}, [isOpen]);

    return (
        <PopupWithForm
            name="form_add"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            textButton={isLoading ? 'Сохранение...' : 'Сохранить'}
        >
            <input 
                type="text"
                id="card-name"
                required
                name="name"
                placeholder="Название"
                className="popup__input popup__input_card_name"
                onChange={handleChangeName}
                value={name || ''}
            />
            <span className="card-name-error popup__input-error"/>
    
            <input
                type="url"
                id="card-link-to-pic"
                required name="link"
                placeholder="Ссылка на картинку"
                className="popup__input popup__input_card_link"
                onChange={handleChangeLink}
                value={link || ''}
            />
            <span className="card-link-to-pic-error popup__input-error"/> 
        </PopupWithForm>
    )
};

export default AddPlacePopup;