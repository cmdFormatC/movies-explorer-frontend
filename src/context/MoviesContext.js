import {createContext} from 'react';

export const MoviesContext = createContext({
  moviesList: [],
  setMoviesList: () => {}
});