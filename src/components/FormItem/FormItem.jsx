import React from 'react'
import './FormItem.css';

export default function FormItem({ field, onChange, error}) {
  const handleInvalid = (event) => {
    event.preventDefault();
  };
  const inputParams = {
    onInvalid: handleInvalid,
    onChange: onChange,
    autoComplete: field.autocomplete || "off",
    name: field.name,
    className: `form-item__input ${error[field.name] ? 'form-item__input_error' : ''}`,
    type: field.type,
    id: field.name,
    required: true
  }

  if (field.pattern) {
    inputParams.pattern = field.pattern;
  }
  if (field.isRequired) {
    inputParams.required = true;
  }
  if (field.minLength && field.maxLength) {
    inputParams.minLength = field.minLength;
    inputParams.maxLength = field.maxLength;
  }

  return (
    <div className='form-item'>
      <label  className='form-item__plaseholder'>{field.placeholder}</label>
      <input {...inputParams} />
      <span className={`form-item__error-msg ${error[field.name] ? 'form-item__error-msg_activ' : ''}`}>
        {error[field.name] ? error[field.name] : ''}
      </span>
    </div>
  )
}
