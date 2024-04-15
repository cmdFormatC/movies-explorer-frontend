import React from 'react'
import './FilterCheckbox.css';


export default function FilterCheckbox() {
  return (
    <div className='filter'>
      <input className='filter__input' id='filter' type="checkbox" />
      <label className='filter__label' htmlFor="filter"></label>
    </div>
  )
}
