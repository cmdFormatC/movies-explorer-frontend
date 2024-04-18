import './App.css';
import 'normalize.css';
import Main from '../Main/Main';
import React from 'react'
import {  Routes, Route, } from "react-router-dom";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}  />
      <Route path="/saved-movies" element={<SavedMovies />}  />
      <Route path="/movies" element={<Movies />}  />
      <Route path="/profile" element={<Profile />}  />
      <Route path="/signup" element={<Register />}  />
      <Route path="/signin" element={<Login />}  />
      <Route path="*" element={<NotFound />}  />

    </Routes>
  );
}

export default App;
