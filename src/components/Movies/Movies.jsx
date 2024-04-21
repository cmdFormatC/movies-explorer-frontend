import React, { useState, useEffect, useContext } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { handleMovieSearch, handleMovieFiltering } from '../../utils/utils';
import {MoviesContext} from '../../context/MoviesContext'

export default function Movies({ onSearch, isLoading, searchQuary, searchError, handleDeleteMovie, handleSaveMovie }) {
  const [isFilterOn, setFilter] = useState(false);
  const moviesList = useContext(MoviesContext);
  const handleOnFilterClick = (condition) => {
    onSearch(searchQuary, condition)
  }
  return (
    <>
      <Header isAuth={true} isMain={false} />
      <main className="movies">
        <SearchForm
          onSearch={onSearch}
          onToggle={handleOnFilterClick}
          setFilter={setFilter}
          isFilterOn={isFilterOn}
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
