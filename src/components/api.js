// api.js
class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  // Método para obter os cartões
  getInitialCards(token) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: token, // Passando o token para autenticação
      },
    }).then((res) => {
      if (res.ok) {
        return res.json(); // Se a resposta for ok, converte para JSON
      }
      return Promise.reject(`Error: ${res.status}`); // Se houver erro, rejeita a promessa
    });
  }

  getProfileBio(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: token, // Passando o token para autenticação
      },
    }).then((res) => {
      if (res.ok) {
        return res.json(); // Se a resposta for ok, converte para JSON
      }
      return Promise.reject(`Error: ${res.status}`); // Se houver erro, rejeita a promessa
    });
  }

  updateUserProfile(token, nome, biografia) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: token,
        "Content-Type": "application/json", //
      },
      body: JSON.stringify({
        name: nome,
        about: biografia,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json(); // Se a resposta for ok, converte para JSON
      }
      return Promise.reject(`Error: ${res.status}`); // Se houver erro, rejeita a promessa
    });
  }

  insertCard(token, titulo, link) {
    return fetch(`${this.baseUrl}/cards/`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json", //
      },
      body: JSON.stringify({
        name: titulo,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        window.location.reload(); // Se a resposta for ok, converte para JSON
      }
      return Promise.reject(`Error: ${res.status}`); // Se houver erro, rejeita a promessa
    });
  }

  deleteCard(token, cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: token,
        "Content-Type": "application/json", //
      },
    }).then((res) => {
      if (res.ok) {
        window.location.reload();
      }
      return Promise.reject(`Error: ${res.status}`); // Se houver erro, rejeita a promessa
    });
  }

  like(token, cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: token,
        "Content-Type": "application/json", //
      },
    }).then((res) => {
      if (res.ok) {
        window.location.reload(); // Se a resposta for ok, converte para JSON
      }
      return Promise.reject(`Error: ${res.status}`); // Se houver erro, rejeita a promessa
    });
  }

  disLike(token, cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: token,
        "Content-Type": "application/json", //
      },
    }).then((res) => {
      if (res.ok) {
        window.location.reload(); // Se a resposta for ok, converte para JSON
      }
      return Promise.reject(`Error: ${res.status}`); // Se houver erro, rejeita a promessa
    });
  }

  updateUserProfileImage(token, link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      if (res.ok) {
        window.location.reload(); // Se a resposta for ok, converte para JSON
      }
      console.log(res);
      return Promise.reject(`Error: ${res.status}`); // Se houver erro, rejeita a promessa
    });
  }
}

// Instanciando a classe Api
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    "Content-Type": "application/json", // Definindo o tipo de conteúdo
  },
});

// Exportando a instância da classe Api para uso em outros arquivos
export { api };
