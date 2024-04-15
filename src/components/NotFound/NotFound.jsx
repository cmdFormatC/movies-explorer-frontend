import React from 'react'
import './NotFound.css';


export default function NotFound() {
  return (
    <main className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <p className='not-found__dsc'>Страница не найдена</p>
      <button className='not-found__back'>Назад</button>
    </main>
  )
}
