import './Footer.css';
import React from 'react'

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__wrapper wrapper wrapper_movies'>
        <span className='footer__companies'>Учебный проект Яндекс.Практикум х BeatFilm.</span>
        <div className='footer__row'>
          <span className='footer__copyright'>© 2020</span>
          <div className='footer__links'>
            <a className='footer__link' href="#">Яндекс.Практикум</a>
            <a className='footer__link' href="#">Github</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
