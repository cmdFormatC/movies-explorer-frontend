import './Header.css';
import React from 'react'
import logo from '../../images/logo.svg';
import account from '../../images/account.svg';
import menu from '../../images/menu.svg';
import { Link } from "react-router-dom";
import Navigation from '../Navigation/Navigation';



export default function Header({ isAuth, isMain }) {
  const [ isOpen, setIsOpen ] = React.useState(false);
  
  const handleMenuOpen = () => {
    if (isAuth) {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    }
  }

  const handleMenuClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "visible";
  }

  return (
    <header className='header'>
      <div className='header__row'>
        <Link to="/" className='header__col header__col_logo'>
          <img className='header__logo' alt="Логотип" src={logo} />
        </Link>
        {
          isAuth ?  
            <menu className='header__col header__col_menu'>
              <Link to="/movies" className='header__link'>{'Фильмы'}</Link>
              <Link to="/saved-movies" className='header__link'>{'Сохранённые фильмы'}</Link>
            </menu> 
          : ''
        }
        <div className='header__col header__col_authentication'>
          {isAuth ?
            <>
              <Link to="/profile" className='header__profile profile'>
                <span className='profile__text'>Аккаунт</span>
                <div className={`profile__overlay ${isMain ? 'profile__overlay_blue' : 'profile__overlay_dark'}`}>
                  <img className='profile__icon' src={account} alt="аккаунт" />
                </div>
              </Link>
              <button onClick={handleMenuOpen} className='header__profile-menu' type='button'>
                <img className='header__icon' src={menu} alt="Меню" />
              </button>
            </>
            :
            <>
              <Link to="/signup" className='header__button'>{'Регистрация'}</Link>
              <Link to="/signin" className='header__button header__button_flooded'>{'Войти'}</Link>
            </>
          }
        </div>
      </div>
      {isOpen ? <Navigation onClose={handleMenuClose} /> : ''}
    </header>
  )
}
