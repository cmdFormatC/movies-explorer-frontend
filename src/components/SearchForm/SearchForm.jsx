import React from 'react'
import { useLocation } from "react-router-dom";
import './SearchForm.css';
import arrow from '../../images/send.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({ onSearch}) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [queryError, setQueryError] = React.useState("");
  const [isFilterOn, setFilter] = React.useState(false);
  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname === "/movies" && localStorage.getItem("lastSearchQuary")) {
      const savedSearchQuery = localStorage.getItem("lastSearchQuary");
      setFilter(JSON.parse(localStorage.getItem('isShortFilterOn')))
      setSearchQuery(savedSearchQuery);
    } else if (location.pathname === "/saved-movies" && localStorage.getItem("savedMoviesSearchQuery")) {
      setFilter(JSON.parse(localStorage.getItem('isShortFilterOnSaved')))
      const savedSearchQuery = localStorage.getItem("savedMoviesSearchQuery");
      setSearchQuery(savedSearchQuery);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    setQueryError("");
  }, [searchQuery]);

  // React.useEffect(() => {
  //   if (location.pathname === "/movies") {
  //     localStorage.setItem('isShortFilterOn', isFilterOn)
  //   }
  //   if (location.pathname === "/saved-movies") {
  //     localStorage.setItem('isShortFilterOnSaved', isFilterOn)
  //   }
  //   onToggle(isFilterOn)
  // }, [isFilterOn]);

  function handleFilterClick(isChecked) {
    console.log('isChecked', isChecked);
    setFilter(isChecked);
    if (location.pathname === "/movies") {
      localStorage.setItem('isShortFilterOn', isChecked);
    }
    if (location.pathname === "/saved-movies") {
      localStorage.setItem('isShortFilterOnSaved', isChecked);
    }
    onSearch(searchQuery, isChecked);
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
    } else {
      onSearch(searchQuery, isFilterOn);
    }
  }
  return (
    <form onSubmit={handleSubmit} className='form wrapper wrapper_movies'>
      <div className='form__input-container'>
        <input onInvalid={handleInvalid} onChange={(e) => {setSearchQuery(e.target.value)}} id='search' value={searchQuery} required={true} placeholder='Фильм' className='form__input' type="text" />
        <button className='form__submit-button' type='submit'>
          <div className='form__submit-circle'>
            <img className='form__icon' src={arrow} alt="Поиск" />
          </div>
        </button>
        <span className="form__error">{queryError}</span>
      </div>
      <div className='form__filter'>
        <FilterCheckbox isFilterOn={isFilterOn} setFilter={handleFilterClick} />
        <span className='form__filter-text'>Короткометражки</span>
      </div>
    </form>
  )
}
