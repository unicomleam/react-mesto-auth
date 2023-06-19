class Auth{
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
      }

    signUp({ password, email }) {
        return this._sendRequest(`${this._url}/signup`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify({ password, email }),
        });
    }

    signIn({ password, email }) {
        return this._sendRequest(`${this._url}/signin`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify({ password, email }),
        });
    }

    getContent(jwt) {
        return this._sendRequest(`${this._url}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        });
    }
  
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else { return Promise.reject(`Ошибка ${res.status}`) }
    }

    _sendRequest(url, options) {
        return fetch(url, options).then(this._checkResponse);
    }
}

const auth = new Auth({
    url: "https://auth.nomoreparties.co",
    headers: {
      "Content-Type": "application/json",
    }
});

export default auth;