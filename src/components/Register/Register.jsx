import React from 'react'
import './Register.css';
import { REGISTER_FIELDS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

import Auth from '../Auth/Auth';

export default function Register({ onRegistr, isAuth }) {

  return (
    <main className='register'>
      <Auth
        formFields={REGISTER_FIELDS}
        buttonText='Зарегистрироваться'
        anotherActionText='Уже зарегистрированы?'
        linkText='Войти'
        link="/signin"
        greeten="Добро пожаловать!"
        onSubmit={onRegistr}
        isAuth={isAuth}
       />
    </main>
  )
}
