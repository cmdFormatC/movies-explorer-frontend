import { MOVIES_API_URL } from "./constants";


export default function getMovies () {
  return fetch(MOVIES_API_URL, {
    headers: {
      'Content-Type': 'application/json'
    }
    })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

