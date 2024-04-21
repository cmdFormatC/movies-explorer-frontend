import React from 'react'
import './Register.css';
import { REGISTER_FIELDS } from '../../utils/constants';
import Auth from '../Auth/Auth';

export default function Register({ onRegistr }) {
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
       />
    </main>
  )
}
