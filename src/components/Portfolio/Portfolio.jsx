import './Portfolio.css';
import arrow from '../../images/arrow.svg';
import React from 'react'

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__wrapper wrapper'>
        <span className='portfolio__title'>Портфолио</span>
        <nav className='portfolio__links'>
          <a target="_blank" rel="noopener noreferrer" className='portfolio__link' href="https://github.com">
            <span className='portfolio__link-text'>Статичный сайт</span>
            <img className='portfolio__link-icon' src={arrow} alt="Перейти" />
          </a>
          <a target="_blank" rel="noopener noreferrer" className='portfolio__link' href="https://github.com">
            <span className='portfolio__link-text'>Адаптивный сайт</span>
            <img className='portfolio__link-icon' src={arrow} alt="Перейти" />
          </a>
          <a target="_blank" rel="noopener noreferrer" className='portfolio__link' href="https://github.com">
            <span className='portfolio__link-text'>Одностраничное приложение</span>
            <img className='portfolio__link-icon' src={arrow} alt="Перейти" />
          </a>
        </nav>
      </div>
    </section>
  )
}
