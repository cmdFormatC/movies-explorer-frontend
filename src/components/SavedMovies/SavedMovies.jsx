import React, { useContext, useEffect, useState } from 'react'
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SavedMoviesContext } from "../../context/SavedMoviesContext";

export default function SavedMovies({ handleGetSavedMovies, onSearch, isLoading, searchQuary, searchError, handleDeleteMovie }) {
  const  savedMoviesList  = useContext(SavedMoviesContext);
  const [isFilterOn, setFilter] = useState(false);
  useEffect(() => {
    handleGetSavedMovies()
  }, [])

  return (
    <>
      <Header isAuth={true} isMain={false} />
      <main className="movies">
        <SearchForm 
          onSearch={onSearch}
          isFilterOn={isFilterOn}
          setFilter={setFilter}
        />
        <MoviesCardList
          searchError={searchError}
          searchQuary={searchQuary}
          isSavedMoviesList={true}
          isLoading={isLoading}
          moviesList={savedMoviesList}
          handleDeleteMovie={handleDeleteMovie}
        />
      </main>
      <Footer />
    </>
    )
}


