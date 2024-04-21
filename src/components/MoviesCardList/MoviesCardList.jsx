import React, { useState, useEffect, useContext } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { SavedMoviesContext } from "../../context/SavedMoviesContext";

export default function MoviesCardList({ moviesList, isLoading, searchQuary, isSavedMoviesList, searchError, handleDeleteMovie, handleSaveMovie }) {
  const [visibleCards, setVisibleCards] = useState(16);
  const [cardsPerLoad, setCardsPerLoad] = useState(4);
  const savedMoviesList = useContext(SavedMoviesContext);
  useEffect(() => {
    let timeoutId = null;

    function updateCardCount() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        if (width >= 1280) {
          setCardsPerLoad(4);
          setVisibleCards(Math.floor(visibleCards / 4) * 4)
        } else if (width < 1280) {
          setCardsPerLoad(2);
        }
      }, 100);
    }
    window.addEventListener('resize', updateCardCount);

    return () => {
      window.removeEventListener('resize', updateCardCount);
      clearTimeout(timeoutId);
    };
  }, []);

  
  const checkIsMovieSaved = (movieId) => {
    const savedMoviesIds = savedMoviesList.map(movie => movie.movieId);
    if (savedMoviesIds.includes(movieId)) {
      return true
    } else {
      return false
    }
  }
  const loadMoreCards = () => {
    setVisibleCards(prev => prev + cardsPerLoad);
  };

  
  const hasMoreCards = visibleCards < moviesList.length

  return (
    <section className='movies-list wrapper wrapper_movies'>
      {
        (moviesList.length !== 0) ? (
          isLoading ? (
            <Preloader />
          ) : moviesList.length > 0 ? (
            <div className='movies-list__container'>
              {moviesList.slice(0, visibleCards).map((movie, index) => (
                <MoviesCard
                  key={index}
                  movie={movie}
                  handleSaveMovie={handleSaveMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  isSaved={checkIsMovieSaved(movie.id)}
                />
              ))}
            </div>
          ) : (
            <p className='movies-list__error'>{searchError ? searchError :''}</p>
          )
        ) : ''
      }
      {hasMoreCards && (
        <button className='movies-list__button' type='button' onClick={loadMoreCards}>Ещё</button>
      )}
    </section>
  );
}
