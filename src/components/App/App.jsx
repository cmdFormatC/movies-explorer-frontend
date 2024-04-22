import './App.css';
import 'normalize.css';
import Main from '../Main/Main';
import React, { useState, useCallback } from 'react'
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import getMovies from '../../utils/MoviesApi'
import { handleMovieSearch, handleMovieFiltering } from '../../utils/utils'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { FormApiErrorsContext } from "../../context/FormApiErrorsContext";
import { MOVIES_API_MAIN } from '../../utils/constants'
import * as auth from '../../utils/Auth'
import * as mainApi from '../../utils/MainApi'

import Preloader from '../Preloader/Preloader';
import { MoviesContext } from '../../context/MoviesContext';
import { SavedMoviesContext } from '../../context/SavedMoviesContext'


function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [formError, setFormError] = useState('');
  const [searchError, setSearchError] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isMoviesLoading, setMoviesLoading] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuary, setSearchQuary] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);

  React.useEffect(() => {
    handleTokenCheck();
    handleGetSavedMovies();
    let isOnlyShort = JSON.parse(localStorage.getItem('isShortFilterOn'));

    if (!isOnlyShort) {
      isOnlyShort = false;
    }
    
    handleGetAllMovies(searchQuary, isOnlyShort);
  }, []);
  
  React.useEffect(() => {
    setFormError('');
  }, [location]);

  async function handleGetAllMovies(searchQuary, isOnlyShort) {
    setMoviesLoading(true);
    console.log(isOnlyShort);
  
    if (!searchQuary) {
      searchQuary = localStorage.getItem('lastSearchQuary');
    }
    setSearchQuary(searchQuary);
  
    let moviesData = localStorage.getItem('movies');
    if (!moviesData) {
      try {
        moviesData = await getMovies();
        localStorage.setItem('movies', JSON.stringify(moviesData));
      } catch (error) {
        setSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        console.error(error);
      }
    } else {
      moviesData = JSON.parse(moviesData);
    }
  
    if (moviesData) {
      const searchedMovies = handleMovieSearch(moviesData, searchQuary, isOnlyShort);
      const filteredMovies = handleMovieFiltering(searchedMovies, isOnlyShort);
      if(!searchQuary) {
        setMoviesList([]);
      } else {
        setMoviesList(filteredMovies);
      }
  
      if (filteredMovies.length < 1) {
        setSearchError('Ничего не найдено');
      }
    } else {
      setSearchError('Ничего не найдено');
    }
  
    setMoviesLoading(false);
  }

  async function handleGetSavedMovies(searchQuery, isOnlyShort) {
    setMoviesLoading(true);
    
    if (!searchQuery) {
      searchQuery = localStorage.getItem('savedMoviesSearchQuery');
    }
    setSearchQuary(searchQuery);
      let savedMoviesData = localStorage.getItem('savedMovies');
    if (savedMoviesData) {
      savedMoviesData = JSON.parse(savedMoviesData);
    } else {
      try {
        savedMoviesData = await mainApi.getSavedFilms();
        localStorage.setItem('savedMovies', JSON.stringify(savedMoviesData));
      } catch (err) {
        console.error(err);
        setSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        setMoviesLoading(false);
        return;
      }
    }
      if (searchQuery) {
      const searchedMovies = handleMovieSearch(savedMoviesData, searchQuery, true);
      const filteredMovies = handleMovieFiltering(searchedMovies, isOnlyShort);
      if (filteredMovies.length < 1) {
        setSearchError('Ничего не найдено');
      }
      setSavedMovies(filteredMovies);
    } else {
      setSavedMovies(savedMoviesData);
    }
  
    setMoviesLoading(false);
  };

  async function handleSaveMovie(movie) {
    try {
      const movieData = await mainApi.saveFilm({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${MOVIES_API_MAIN}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${MOVIES_API_MAIN}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      });
      if (movieData) {
        setSavedMovies([movieData, ...savedMovies]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteMovie(movie) {
    const savedMovie = savedMovies.find(
      (savedMovie) => savedMovie.movieId === movie.id || savedMovie.movieId === movie.movieId
    );
    try {
      const data = await mainApi.deleteFilm(savedMovie._id);
      if (data) {
        setSavedMovies((state) =>
          state.filter((movie) => movie._id !== savedMovie._id)
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleRegistration = (values) => {
    setLoading(true);
    auth.register(values)
    .then(() => {
      setFormError('');
      handleLogin(values);
    })
    .catch((res) => {
      if (res && res.status === 409) {
        setFormError('Пользователь с таким email уже существует.');
      } else {
        setFormError('При регистрации пользователя произошла ошибка.');
      }
    })
    .finally(() =>{
      setLoading(false);
    });
  }

  const handleProfileEdit = (values) => {
    setLoading(true);
    mainApi.editUser(values)
    .then((res) => {
      setCurrentUser(res);
      setFormError('Данные сохранены.');
    })
    .catch((err) => {
      setIsEditingProfile(true)
      setFormError(err);
    })
    .finally(() =>{
      setLoading(false);
    });
  }

  const handleUserLogout = () => {
    setLoading(true);
    auth.logout()
    .then(() => {
      setFormError('');
      setLoggedIn(false);
      setCurrentUser({});
      document.cookie = 'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
      localStorage.clear();
      navigate("/", { replace: true });
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() =>{
      setLoading(false);
    });
  }

  const handleLogin =  (values) => {
    setLoading(true);
    auth.authorize(values)
    .then(() => {
      setFormError('');
      setLoggedIn(true);
      navigate('/movies');
    })
    .then(() => {
      handleTokenCheck();
    })
    .catch((err) => {
      setFormError(err);
    })
    .finally(() =>{
      setLoading(false);
    });
  }

  const handleTokenCheck = () => {
    setLoading(true);
    auth.checkToken()
    .then((res) => {
      if (res) {
        setCurrentUser(res);
        setLoggedIn(true);
      }
    })
    .catch(() => {
      setLoggedIn(false);
    })
    .finally(() =>{
      setLoading(false);
    });
  }

  return (
    <>
      {isLoading ? (
        <Preloader />
        ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <FormApiErrorsContext.Provider value={formError}>
            <MoviesContext.Provider value={moviesList}>
              <SavedMoviesContext.Provider value={savedMovies}>
                <Routes>
                  <Route path="/" element={<Main isAuth={loggedIn} />}  />
                  <Route path="/saved-movies"
                    element={<ProtectedRoute element={SavedMovies}
                    loggedIn={loggedIn}
                    isLoading={isMoviesLoading}
                    searchQuary={searchQuary}
                    searchError={searchError}
                    handleGetSavedMovies={handleGetSavedMovies}
                    handleDeleteMovie={handleDeleteMovie}
                    onSearch={handleGetSavedMovies}
                    
                  />}  />
                  <Route path="/movies"
                    element={<ProtectedRoute element={Movies}
                    onSearch={handleGetAllMovies}
                    loggedIn={loggedIn}
                    isLoading={isMoviesLoading}
                    searchQuary={searchQuary}
                    searchError={searchError}
                    handleSaveMovie={handleSaveMovie}
                    handleDeleteMovie={handleDeleteMovie}
                  />}  />
                  <Route path="/profile" 
                    element={<ProtectedRoute element={Profile}
                    loggedIn={loggedIn}
                    onLogout={handleUserLogout}
                    onSubmit={handleProfileEdit}
                    setIsEditing={setIsEditingProfile}
                    isEditing={isEditingProfile}
                  />}  />
                    <Route path="/signup" element={<Register
                      onRegistr={handleRegistration}
                      onError={formError}
                      isAuth={loggedIn}
                    />}  />
                    <Route path="/signin" element={<Login
                      onLogin={handleLogin}
                      isAuth={loggedIn}
                    />}  />
                  <Route path="*" element={<NotFound />}  />
                </Routes>
              </SavedMoviesContext.Provider>
            </MoviesContext.Provider>
          </FormApiErrorsContext.Provider>
        </CurrentUserContext.Provider>
      )}
    </>
  );
}

export default App;
