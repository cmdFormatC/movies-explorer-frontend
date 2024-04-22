import React, { useContext } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {MoviesContext} from '../../context/MoviesContext'

export default function Movies({ onSearch, isLoading, searchQuary, searchError, handleDeleteMovie, handleSaveMovie }) {
  const moviesList = useContext(MoviesContext);

  return (
    <>
      <Header isAuth={true} isMain={false} />
      <main className="movies">
        <SearchForm
          onSearch={onSearch}
        />
        <MoviesCardList
          searchError={searchError}
          searchQuary={searchQuary}
          isLoading={isLoading}
          moviesList={moviesList}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
        />
      </main>
      <Footer />
    </>
  );
}
