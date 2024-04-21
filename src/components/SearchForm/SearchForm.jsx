import React from 'react'
import { useLocation } from "react-router-dom";
import './SearchForm.css';
import arrow from '../../images/send.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({ setFilter, onToggle, isFilterOn, onSearch}) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [queryError, setQueryError] = React.useState("");
  const location = useLocation();

  React.useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("lastSearchQuary")
    ) {
      const savedSearchQuery = localStorage.getItem("lastSearchQuary");
      setFilter(localStorage.getItem('isShortFilterOn'))
      setSearchQuery(savedSearchQuery);
    } else if (
      location.pathname === "/saved-movies" &&
      localStorage.getItem("savedMoviesSearchQuery")
    ) {
      setFilter(localStorage.getItem('isShortFilterOnSaved'))
      const savedSearchQuery = localStorage.getItem("savedMoviesSearchQuery");
      setSearchQuery(savedSearchQuery);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    setQueryError("");
  }, [searchQuery]);

  React.useEffect(() => {
    if (location.pathname === "/movies") {
      localStorage.setItem('isShortFilterOn', isFilterOn)
    }
    if (location.pathname === "/saved-movies") {
      localStorage.setItem('isShortFilterOnSaved', isFilterOn)
    }
    onToggle(isFilterOn)
  }, [isFilterOn]);

  function handleSubmit(e) {
    e.preventDefault();
    if (location.pathname === "/movies") {
      searchQuery
        ? onSearch(searchQuery)
        : setQueryError("Нужно ввести ключевое слово");
    } else {
      onSearch(searchQuery, isFilterOn);
    }
  }
  return (
    <form onSubmit={handleSubmit} className='form wrapper wrapper_movies'>
      <div className='form__input-container'>
        <input onChange={(e) => {setSearchQuery(e.target.value)}} id='search' value={searchQuery} required={true} placeholder='Фильм' className='form__input' type="text" />
        <label htmlFor='search'></label>
        <button className='form__submit-button' type='submit'>
          <div className='form__submit-circle'>
            <img className='form__icon' src={arrow} alt="Поиск" />
          </div>
        </button>
      </div>
      <div className='form__filter'>
        <FilterCheckbox checked={isFilterOn} setFilter={setFilter} />
        <span className='form__filter-text'>Короткометражки</span>
      </div>
      <span className="form__error">{queryError}</span>
    </form>
  )
}
