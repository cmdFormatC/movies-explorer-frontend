export const MOVIES_API_MAIN = "https://api.nomoreparties.co";
export const MOVIES_API_URL = `${MOVIES_API_MAIN}/beatfilm-movies`;

export const MAIN_API_URL = "https://braginfd.nomoredomainswork.ru";
export const SHORT_MOVIE = 40;
export const USER_NAME_REG = "^[A-Za-zА-Яа-яЁё\\-\\s]+$";

export const REGISTER_FIELDS = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Имя',
    autocomplete: 'username',
    pattern: USER_NAME_REG,
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'E-mail',
    autocomplete: 'email',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Пароль',
    autocomplete: 'new-password',
    required: true,
  }
]

export const LOGIN_FIELDS = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'E-mail',
    autocomplete: 'email',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Пароль',
    autocomplete: 'current-password',
    required: true,
  }
]