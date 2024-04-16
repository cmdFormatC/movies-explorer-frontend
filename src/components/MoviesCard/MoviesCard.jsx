import React from 'react'
import './MoviesCard.css';
import pic from '../../images/pic.png';
import deleteIcon from '../../images/delete.svg';
import { useLocation } from 'react-router-dom';


export default function MoviesCard({ id }) {
  const location = useLocation();
  
  return (
    <div className='card'>
      <img className='card__img' src={pic} alt="картинка" />
      <div className='card__content'>
        <div className='card__header'>
          <h4 className='card__title'>33 слова о дизайне</h4>
          {location.pathname === '/saved-movies' ? 
            <button className='card__delete-button' type='bytton'>
              <img className='card__delete-icon' src={deleteIcon} alt="Удалить" />
            </button>
            : 
            <>
              <input className='card__checkbox' id={id} type="checkbox" />
              <label className='card__label' htmlFor={id}></label>
            </>
          }
        </div>
        <span className='card__duration'>1ч42м</span>
      </div>
    </div>
  )
}
