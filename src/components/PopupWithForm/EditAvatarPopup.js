import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const avatarRef = useRef('');

    useEffect(() => {
		avatarRef.current.value = '';
	}, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
    } 

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="form_avatar"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            textButton={isLoading ? 'Сохранение...' : 'Сохранить'}
        >
            <input 
                type="url" 
                id="avatar-link-to-pic"
                required
                name="avatar"
                placeholder="Ссылка на изображение аватара"
                className="popup__input popup__input_card_link"
                ref={avatarRef}
            />
            <span className="avatar-link-to-pic-error popup__input-error"/>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;