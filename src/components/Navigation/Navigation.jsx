import './Navigation.css';
import React from 'react'
import { Link, useLocation } from "react-router-dom";

import account from '../../images/account.svg';
import close from '../../images/close.svg';


export default function Navigation(props) {
  const location = useLocation();
  return (
    <div className='navigation'>
      <menu className='navigation__menu'>
        <Link to="/" className='navigation__link'>
          <span className={`navigation__link-text ${location.pathname === "/" ? 'navigation__link-text_activ ' : ''}`}>Главная</span>
        </Link>
        <Link to="/movies" className='navigation__link'>
          <span className={`navigation__link-text ${location.pathname === "/movies" ? 'navigation__link-text_activ ' : ''}`}>Фильмы</span>
        </Link>
        <Link to="/saved-movies" className='navigation__link'>
          <span className={`navigation__link-text ${location.pathname === "/saved-movies" ? 'navigation__link-text_activ ' : ''}`}>Сохранённые фильмы</span>
        </Link>
        <Link to="/profile" className='navigation__profile profile'>
          <span className='profile__text'>Аккаунт</span>
          <div className='profile__overlay profile__overlay_dark'>
            <img className='profile__icon' src={account} alt="аккаунт" />
          </div>
        </Link>
      </menu> 
      <button onClick={props.onClose} className='navigation__close-button' type='button'>
        <img className='navigation__close-icon' src={close} alt="Закрыть" />
      </button>
    </div>
  )
}
