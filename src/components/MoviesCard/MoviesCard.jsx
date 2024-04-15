import React from 'react'
import './MoviesCard.css';
import pic from '../../images/pic.png';


export default function MoviesCard({ id }) {
  return (
    <div className='card'>
      <img className='card__img' src={pic} alt="картинка" />
      <div className='card__content'>
        <div className='card__header'>
          <h4 className='card__title'>33 слова о дизайне</h4>
          <input className='card__checkbox' id={id} type="checkbox" />
          <label className='card__label' htmlFor={id}></label>
        </div>
        <span className='card__duration'>1ч42м</span>
      </div>
    </div>
  )
}
