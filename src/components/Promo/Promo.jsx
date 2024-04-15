import './Promo.css';
import React from 'react'
import erth from '../../images/erth.svg';


export default function Promo() {
  return (
    <section className='promo'>
      <div className='promo__container wrapper'>
        <div className='promo__content'>
          <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
          <p className='promo__desc'>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <button className='promo__button'>Узнать больше</button>
        </div>
        <img className='promo__img' alt="Планета" src={erth} />
      </div>
    </section>
  )
}
