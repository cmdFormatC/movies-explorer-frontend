import React, { useState, useEffect, useContext } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { SavedMoviesContext } from "../../context/SavedMoviesContext";

export default function MoviesCardList({ moviesList, isLoading, searchError, handleDeleteMovie, handleSaveMovie }) {
  const [visibleCards, setVisibleCards] = useState(16);
  const [cardsPerLoad, setCardsPerLoad] = useState(4);
  const savedMoviesList = useContext(SavedMoviesContext);

  const updateCardCount = () => {
    clearTimeout(window.updateCardCountTimeout);
    window.updateCardCountTimeout = setTimeout(() => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setCardsPerLoad(4);
        setVisibleCards(16);
      } else if (width < 1280 && width >= 768) {
        setCardsPerLoad(2);
        setVisibleCards(8);
      } else if (width < 768) {
        setCardsPerLoad(2);
        setVisibleCards(5);
      } else {
        setCardsPerLoad(4);
        setVisibleCards(16);
      }

      console.log('resize data', { width, visibleCards, cardsPerLoad });
    }, 100);
  }

  useEffect(() => {
    window.addEventListener('resize', updateCardCount);
    return () => {
      window.removeEventListener('resize', updateCardCount);
      clearTimeout(window.updateCardCountTimeout);
    };
  }, []);

  useEffect(() => {
    updateCardCount();
  }, [moviesList]);

  const checkIsMovieSaved = (movieId) => {
    const savedMoviesIds = savedMoviesList.map(movie => movie.movieId);
    return savedMoviesIds.includes(movieId);
  }

  const loadMoreCards = () => {
    setVisibleCards(prev => prev + cardsPerLoad);
  };

  const hasMoreCards = visibleCards < moviesList.length;

  return (
    <section className='movies-list wrapper wrapper_movies'>
      {moviesList.length !== 0 && (
        isLoading ? (
          <Preloader />
        ) : (
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
            
            {searchError && <p className='movies-list__error'>{searchError}</p>}
          </div>
        )
      )}
      {hasMoreCards && (
        <button className='movies-list__button' type='button' onClick={loadMoreCards}>Ещё</button>
      )}
    </section>
  );
}
