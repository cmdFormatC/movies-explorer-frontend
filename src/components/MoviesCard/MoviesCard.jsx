import React from 'react'
import './MoviesCard.css';
import deleteIcon from '../../images/delete.svg';
import { useLocation } from 'react-router-dom';
import { MOVIES_API_MAIN } from '../../utils/constants'
import { convertDuration } from '../../utils/utils'


export default function MoviesCard({ movie, handleSaveMovie, handleDeleteMovie, isSaved }) {
  const location = useLocation();
  const onCheckboxClick = (movie) => {
    if (isSaved) {
      handleDeleteMovie(movie)
    } else {
      handleSaveMovie(movie)
    } 
  }
  return (
    <div className='card'>
      <a target="_blank" rel="noopener noreferrer" className='card__link' href={movie.trailerLink}></a>
      <div className='card__img-container'>
        <img className='card__img' src={!movie.image.url ? movie.image : MOVIES_API_MAIN + '/' + movie.image.url} alt="картинка" />
      </div>
      <div className='card__content'>
        <div className='card__header'>
          <h4 className='card__title'>{movie.nameRU}</h4>
          {location.pathname === '/saved-movies' ? 
            <button onClick={() => handleDeleteMovie(movie)} className='card__delete-button' type='button'>
              <img className='card__delete-icon' src={deleteIcon} alt="Удалить" />
            </button>
            : 
            <>
              <input onChange={() => onCheckboxClick(movie)} checked={isSaved} className='card__checkbox' id={movie.id} type="checkbox" />
              <label className='card__label' htmlFor={movie.id}></label>
            </>
          }
        </div>
        <span className='card__duration'>{convertDuration(movie.duration)}</span>
      </div>
    </div>
  )
}
