import React from 'react'
import './Register.css';
import logo from '../../images/logo.svg';
import FormItem from '../FormItem/FormItem';
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <main className='register'>
      <div className='register__wrapper'>
        <img className='register__logo logo' alt="Логотип" src={logo} />
        <h1 className='register__title form-title'>Добро пожаловать!</h1>
        <form className='register__form'>
          <FormItem isReqired={true} id="name" plaseholder="Имя" type="text" />
          <FormItem isReqired={true} id="email" plaseholder="E-mail" type="email" />
          <FormItem isReqired={true} id="password" plaseholder="Пароль" type="password" error="Что-то пошло не так..." />
          <button className='register__submit-button form-button' type='submit'>Зарегистрироваться</button>
          <div className='register__login another-action'>
            <span className='another-action__text'>Уже зарегистрированы?</span>
            <Link to="/signin" className='another-action__link'>{'Войти'}</Link>
          </div>
        </form>
      </div>
    </main>
  )
}
