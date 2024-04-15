import React from 'react'
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


export default function Movies() {
  return (
    <main className="movies">
      <Header isAuth={true} isMain={false} />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </main>
  )
}
