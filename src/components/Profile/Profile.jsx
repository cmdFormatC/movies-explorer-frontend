import './Profile.css';
import React, { useState, useContext, useEffect, useMemo } from 'react'
import Header from '../Header/Header';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import useForm from "../../CustomHooks/useForm";
import { FormApiErrorsContext } from "../../context/FormApiErrorsContext";
import { USER_NAME_REG } from "../../utils/constants";


export default function Profile({ onSubmit, onLogout, isEditing, setIsEditing}) {
  const  currentUser  = useContext(CurrentUserContext);
  const  formError  = React.useContext(FormApiErrorsContext);
  const { values, errors, isValid, handleChange } = useForm();
  const [isCurrentUser, setUserDifference] = useState(true);
  
  const canSubmit = useMemo(() => {
    return isValid && !isCurrentUser;
  }, [isValid, isCurrentUser]);

  useEffect(() => {
    values.email = currentUser.email;
    values.name = currentUser.name;
  }, []);

  useEffect(() => {
    currentUser.name !== values.name || currentUser.email !== values.email
      ? setUserDifference(false)
      : setUserDifference(true);
  }, [currentUser, values]);

  function toggleEdit(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(!isEditing);
  }

  function handleLogoutClick() {
    onLogout();
  }

  function handleChangeSubmit(e) {
    e.preventDefault();
    onSubmit(values);
    setIsEditing(false);
  }
  return (
    <>
      <Header isAuth={true} isMain={false} />
      <main className="profile-page">
        <h2 className='profile-page__greeting'>{`Привет, ${currentUser.name}!`}</h2>
        <form onSubmit={handleChangeSubmit} className='profile-page__user'>
          <div className='profile-page__user-data'>
            <span className='profile-page__params'>Имя</span>
            {isEditing ? (
              <input 
                type="text" 
                name="name" 
                value={values.name}
                pattern={USER_NAME_REG}
                onChange={handleChange}
                className='profile-page__input'
              />
            ) : (
              <span className='profile-page__params profile-page__params_value'>{currentUser.name}</span>
            )}
            <span className={`profile-page__input-error ${errors.name ? 'profile-page__input-error_activ' :''}`}>{errors.name ? errors.name : ''}</span>
          </div>
          <div className='profile-page__user-data'>
            <span className='profile-page__params'>E-mail</span>
            {isEditing ? (
              <input 
                type="email" 
                name="email" 
                value={values.email} 
                onChange={handleChange}
                className='profile-page__input'
              />
            ) : (
              <span className='profile-page__params profile-page__params_value'>{currentUser.email}</span>
            )}
            <span className={`profile-page__input-error ${errors.email ? 'profile-page__input-error_activ' :''}`}>{errors.email ? errors.email : ''}</span>
          </div>
          <div className='profile-page__buttons'>
            <span className={`profile-page__error ${formError? 'profile-page__error_activ' : ''}`}>
              {formError? formError : ''}
            </span>
            {isEditing ? (
              <>
                <button 
                  disabled={!canSubmit}
                  className={`profile-page__button profile-page__button_save ${!canSubmit ? 'profile-page__button_save_disabled' : ''}`}
                  type='submit'
                >
                  Сохранить
                </button>
                <button 
                  className='profile-page__button profile-page__button_edit' 
                  onClick={toggleEdit}
                  type='button'
                >
                  Отменить
                </button>
              </>
            ) : (
              <>
                <button 
                  className='profile-page__button profile-page__button_edit' 
                  onClick={toggleEdit}
                  type='button'
                >
                  Редактировать
                </button>
                <button
                  className='profile-page__button profile-page__button_logout'
                  type='button'
                  onClick={handleLogoutClick}
                >
                  Выйти из аккаунта
                </button>
              </>
            )}
          </div>
        </form>
      </main>
    </>
  );
}
