import { MAIN_API_URL } from "./constants";
import { checkResponse } from './utils'

const headers = {
  'Content-Type': 'application/json'
}

export const editUser = (values) => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify(values)
  })
  .then(checkResponse)
}


export const getSavedFilms = () => {
  return fetch(`${MAIN_API_URL}/movies`, {
    method: 'GET',
    credentials: 'include',
    headers: headers
  })
  .then(checkResponse)
}

export const saveFilm = (values) => {
  return fetch(`${MAIN_API_URL}/movies`, {
    method: 'POST',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify(values)
  })
  .then(checkResponse)
};

export const deleteFilm = (movieId) => {
  return fetch(`${MAIN_API_URL}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: headers
  })
  .then(checkResponse)
}

