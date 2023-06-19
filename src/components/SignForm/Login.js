import {useState} from "react";

function Login({ onLogin }) {
  const [formValue, setFormValue] = useState({
		email: '',
		password: ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValue({
			...formValue,
			[name]: value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		onLogin(formValue);
	};

  return (
    <div className="sign">
      <h2 className="sign__title">Вход</h2>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input
          className="sign__input"
          type="email"
          name="email"
          placeholder="Email"
          value={formValue.email || ""}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={40}
        />
        <input
          className="sign__input sign__input_password"
          type="password"
          name="password"
          placeholder="Пароль"
          value={formValue.password || ""}
          onChange={handleChange}
          autoComplete="off"
          required
          minLength={3}
          maxLength={40}
        />
        <button className="sign__submit-button" type="submit">
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login;