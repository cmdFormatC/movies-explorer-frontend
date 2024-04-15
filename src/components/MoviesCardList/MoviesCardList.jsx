import React from 'react'
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';


export default function MoviesCardList() {
  return (
    <section className='movies-list wrapper wrapper_movies'>
      <div className='movies-list__container'>
        <MoviesCard id='card1' />
        <MoviesCard id='card2' />
        <MoviesCard id='card3' />
        <MoviesCard id='card4' />
        <MoviesCard id='card5' />
        <MoviesCard id='card6' />
        <MoviesCard id='card7' />
        <MoviesCard id='card8' />
        <MoviesCard id='card9' />
        <MoviesCard id='card10' />
        <MoviesCard id='card11' />
        <MoviesCard id='card12' />
        <MoviesCard id='card13' />
        <MoviesCard id='card14' />
        <MoviesCard id='card15' />
        <MoviesCard id='card16' />
      </div>
      <button className='movies-list__button' type='button'>Ещё</button>
    </section>
  )
}
