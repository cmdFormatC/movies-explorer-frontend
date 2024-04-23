import React, { useContext } from 'react'
import { useLocation } from "react-router-dom";
import './SearchForm.css';
import arrow from '../../images/send.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { MoviesContext } from '../../context/MoviesContext'
import { SavedMoviesContext } from "../../context/SavedMoviesContext";
import { handleMovieFiltering } from '../../utils/utils'

export default function SearchForm({ onSearch }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchQuerySaved, setSearchQuerySaved] = React.useState("");
  const [queryError, setQueryError] = React.useState("");
  const [isFilterOn, setFilter] = React.useState(false);
  const [isFilterOnSaved, setFilterSaved] = React.useState(false);
  const location = useLocation();

  const { setSavedMovies } = useContext(SavedMoviesContext);
  const { setMoviesList }  = useContext(MoviesContext);
  React.useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setSearchQuery('')
    }
  }, []);
  React.useEffect(() => {
    if (location.pathname === "/movies" && localStorage.getItem("lastSearchQuary")) {
      const savedSearchQuery = localStorage.getItem("lastSearchQuary");
      const filter = JSON.parse(localStorage.getItem('isShortFilterOn')) ? JSON.parse(localStorage.getItem('isShortFilterOn')) : false

      setFilter(filter);
      setSearchQuery(savedSearchQuery);
    } else if (location.pathname === "/saved-movies" && localStorage.getItem("savedMoviesSearchQuery")) {
      const filter = JSON.parse(JSON.parse(localStorage.getItem('isShortFilterOnSaved'))) ? JSON.parse(localStorage.getItem('isShortFilterOnSaved')) : false

      setFilterSaved(filter);
      const savedSearchQuery = localStorage.getItem("savedMoviesSearchQuery");
      setSearchQuerySaved(savedSearchQuery);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    setQueryError("");
  }, [searchQuery, searchQuerySaved]);

  function handleInputChange(e) {
    if (location.pathname === "/movies") {
      setSearchQuery(e.target.value);
    } else if (location.pathname === "/saved-movies") {
      setSearchQuerySaved(e.target.value);
    }
  }

function handleFilterClick(isChecked) {
  if (location.pathname === "/movies") {
    setFilter(isChecked);
    localStorage.setItem('isShortFilterOn', JSON.stringify(isChecked));
    const currentMovies = JSON.parse(localStorage.getItem('movies'));
    setMoviesList(handleMovieFiltering(currentMovies, isChecked));
  }

  if (location.pathname === "/saved-movies") {
    setFilterSaved(isChecked);
    localStorage.setItem('isShortFilterOnSaved', JSON.stringify(isChecked));
    const currentSavedMovies = JSON.parse(localStorage.getItem('AllSavedMovies'));
    setSavedMovies(handleMovieFiltering(currentSavedMovies, isChecked));
  }
}

  const handleInvalid = (event) => {
    if (event) {
      event.preventDefault();
      setQueryError("Нужно ввести ключевое слово");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (location.pathname === "/movies") {
      searchQuery
        ? onSearch(searchQuery, isFilterOn)
        : setQueryError("Нужно ввести ключевое слово");
    } else if (location.pathname === "/saved-movies"){
      onSearch(searchQuerySaved, isFilterOnSaved);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='form wrapper wrapper_movies'>
      <div className='form__input-container'>
        <input onInvalid={handleInvalid} onChange={handleInputChange} 
          id='search' value={location.pathname === "/movies" ? searchQuery : searchQuerySaved}
          required={true} placeholder='Фильм' 
          className='form__input' type="text"
        />
        <button className='form__submit-button' type='submit'>
          <div className='form__submit-circle'>
            <img className='form__icon' src={arrow} alt="Поиск" />
          </div>
        </button>
        <span className="form__error">{queryError}</span>
      </div>
      <div className='form__filter'>
        <FilterCheckbox 
          isFilterOn={location.pathname === "/movies" ? isFilterOn : isFilterOnSaved} 
          setFilter={handleFilterClick} 
        />
        <span className='form__filter-text'>Короткометражки</span>
      </div>
    </form>
  )
}
