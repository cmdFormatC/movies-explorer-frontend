import React from 'react'
import './Auth.css';
import logo from '../../images/logo.svg';
import FormItem from '../FormItem/FormItem';
import { Link } from 'react-router-dom';
import useForm from "../../CustomHooks/useForm";
import { FormApiErrorsContext } from "../../context/FormApiErrorsContext";


export default function Auth(props) {
  const  formError  = React.useContext(FormApiErrorsContext);
  const { values, errors, isValid, handleChange } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(values);
  }

  return (
    <div className='auth'>
        <img className='auth__logo' alt="Логотип" src={logo} />
        <h1 className='auth__title'>{props.greeten}</h1>
        <form onSubmit={handleSubmit} className='auth__form'>
          {props.formFields.map(field => (
            <FormItem
              key={field.name}
              field={field}
              error={errors}
              onChange={handleChange}
            />
          ))}
          <span className={`auth__form-error ${formError? 'auth__form-error_activ' : ''}`}>
            {formError? formError : ''}
          </span>
          <button disabled={!isValid} className={`auth__submit-button ${isValid? '':'auth__submit-button_disabled'}`} type='submit'>{props.buttonText}</button>
          <div className='auth__another-action'>
            <span className='auth__another-action-text'>{props.anotherActionText}</span>
            <Link to={props.link} className='auth__link'>{props.linkText}</Link>
          </div>
        </form>
    </div>
  )
}
