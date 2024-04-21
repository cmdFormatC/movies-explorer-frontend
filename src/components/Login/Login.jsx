import React from 'react'
import './Login.css';
import { LOGIN_FIELDS } from '../../utils/constants';
import Auth from '../Auth/Auth';

export default function Login({ onLogin }) {
  return (
    <main className='login'>
      <Auth
        formFields={LOGIN_FIELDS}
        buttonText='Войти'
        anotherActionText='Ещё не зарегистрированы?'
        linkText='Регистрация'
        link="/signup"
        greeten="Рады видеть!"
        onSubmit={onLogin}
       />
    </main>
  )
}
