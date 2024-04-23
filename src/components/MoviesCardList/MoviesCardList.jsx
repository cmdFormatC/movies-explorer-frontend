import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { SavedMoviesContext } from "../../context/SavedMoviesContext";

export default function MoviesCardList({ moviesList, isLoading, searchError, handleDeleteMovie, handleSaveMovie }) {
  const [visibleCards, setVisibleCards] = useState(16);
  const [cardsPerLoad, setCardsPerLoad] = useState(4);
  const { savedMovies } = useContext(SavedMoviesContext);
  const location = useLocation();

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
    const savedMoviesIds = savedMovies.map(movie => movie.movieId);
    return savedMoviesIds.includes(movieId);
  }

  const loadMoreCards = () => {
    setVisibleCards(prev => prev + cardsPerLoad);
  };

  const hasMoreCards = visibleCards < moviesList.length;

  return (
    <section className='movies-list wrapper wrapper_movies'>
        { 
          isLoading ? 
            <Preloader />
          : 
          (moviesList.length !== 0 && (
              <div className='movies-list__container'>
                {moviesList.slice(0, (location.pathname === '/saved-movies' ? moviesList.length : visibleCards)).map((movie, index) => (
                  <MoviesCard
                    key={index}
                    movie={movie}
                    handleSaveMovie={handleSaveMovie}
                    handleDeleteMovie={handleDeleteMovie}
                    isSaved={checkIsMovieSaved(movie.id)}
                  />
                ))}
              </div>
          ))
        }
      {
        searchError
        ? 
        <p className='movies-list__error'>{searchError}</p>
        :
        ''
      }
      {(hasMoreCards && location.pathname !== '/saved-movies')
        ? 
        <button className='movies-list__button' type='button' onClick={loadMoreCards}>Ещё</button>
        :
        ''
      }
    </section>
  );
}
