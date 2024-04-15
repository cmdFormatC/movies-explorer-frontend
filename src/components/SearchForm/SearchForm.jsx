import React from 'react'
import './SearchForm.css';
import arrow from '../../images/send.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm() {
  return (
    <form className='form wrapper wrapper_movies'>
      <div className='form__input-container'>
        <input placeholder='Фильм' className='form__input' type="text" />
        <button className='form__submit-button' type='submit'>
          <div className='form__submit-circle'>
            <img className='form__icon' src={arrow} alt="Поиск" />
          </div>
        </button>
      </div>
      <div className='form__filter'>
        <FilterCheckbox />
        <span className='form__filter-text'>Короткометражки</span>
      </div>
    </form>
  )
}
