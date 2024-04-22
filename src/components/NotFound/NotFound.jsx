import React from 'react'
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <main className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <p className='not-found__dsc'>Страница не найдена</p>
      <button onClick={handleGoBack} className='not-found__back'>Назад</button>
    </main>
  )
}
