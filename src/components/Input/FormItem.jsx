import React from 'react'
import './FormItem.css';

export default function FormItem(props) {
  return (
    <div className='form-item'>
      <label for={props.id} className='form-item__plaseholder'>{props.plaseholder}</label>
      <input className={`form-item__input ${props.error ? 'form-item__input_error' : ''}`}
      type={props.type} id={props.id} />
      <label for={props.id} className='form-item__error-msg'>{props.error && props.error}</label>
    </div>
  )
}
