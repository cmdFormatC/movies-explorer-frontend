import { MAIN_API_URL } from "./constants";

export const register = (values) => {
  return fetch(`${MAIN_API_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
  .then((response) => {
    return response.json().then(data => {
      if (!response.ok) {
        return Promise.reject({ message: data.message, status: response.status });
      }
      return data;
    });
  })
};

export const authorize = (values) => {
  return fetch(`${MAIN_API_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        try {
          const jsonData = JSON.parse(text);
          return Promise.reject(jsonData.message || 'Неизвестная ошибка');
        } catch (e) {
          return Promise.reject('Ошибка в ответе сервера, возможно, проблема с сетью или сервером');
        }
      });
    }
    return response;
  });
};

export const checkToken = () => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const logout = () => {
  return fetch(`${MAIN_API_URL}/users/logout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        try {
          const jsonData = JSON.parse(text);
          return Promise.reject(jsonData.message || 'Неизвестная ошибка');
        } catch (e) {
          return Promise.reject('Ошибка в ответе сервера, возможно, проблема с сетью или сервером');
        }
      });
    }
    return response;
  });
};