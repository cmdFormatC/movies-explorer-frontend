
import { SHORT_MOVIE } from "./constants";

export function handleMovieSearch(movies, searchQuery, isSavedMovies) {
  const normalizeSearchQuery = searchQuery ? searchQuery.toLowerCase().trim() : '';
  const result = movies.filter((movie) => {
    const normalizeNameRu = movie.nameRU.toLowerCase().trim();
    const normalizeNameEn = movie.nameEN.toLowerCase().trim();
    return (
      normalizeNameRu.includes(normalizeSearchQuery) ||
      normalizeNameEn.includes(normalizeSearchQuery)
    );
  });

  
  if (!isSavedMovies) {
    localStorage.setItem("foundMovies", JSON.stringify(result));
    localStorage.setItem("lastSearchQuary", normalizeSearchQuery);
  } else {
    localStorage.setItem("savedMoviesSearchQuery", normalizeSearchQuery);
  }

  return result;
}

export function handleMovieFiltering(movies, isFilterOn) {
  if (isFilterOn) {
    const result = movies.filter((movie) => movie.duration <= SHORT_MOVIE);
    return result;
  } else {
    return movies;
  }
}

export function convertDuration(duration) {
  const minutes = duration % 60;
  const hours = (duration - minutes) / 60;
  if (hours < 1) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

export function checkResponse(res) {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}