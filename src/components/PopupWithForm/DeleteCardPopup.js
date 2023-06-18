import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ card, isOpen, onClose, onCardDelete, isLoading }) {
    function handleSubmit(e) {
		e.preventDefault();

		onCardDelete(card);
	};

    return (
        <PopupWithForm
                title="Вы уверены?"
                name="form_del"
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={handleSubmit}
                textButton={isLoading ? 'Удаление...' : 'Да'}
        />
    );
}

export default DeleteCardPopup;