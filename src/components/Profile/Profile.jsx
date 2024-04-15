import './Profile.css';
import React from 'react'
import Header from '../Header/Header';


export default function Profile() {
  return (
    <main className="profile-page">
      <Header isAuth={true} isMain={false} />
      <h2 className='profile-page__greeting'>Привет, Виталий!</h2>
      <div className='profile-page__user'>
        <div className='profile-page__user-data'>
          <span className='profile-page__params'>Имя</span>
          <span className='profile-page__params profile-page__params_value'>Виталий</span>
        </div>
        <div className='profile-page__user-data'>
          <span className='profile-page__params'>E-mail</span>
          <span className='profile-page__params profile-page__params_value'>pochta@yandex.ru</span>
        </div>
      </div>
      <div className='profile-page__buttons'>
        <button className='profile-page__button profile-page__button_edit'>Редактировать</button>
        <button className='profile-page__button profile-page__button_logout'>Выйти из аккаунта</button>
      </div>
    </main>
  )
}
