import React from 'react'
import './FilterCheckbox.css';


export default function FilterCheckbox({ setFilter, isFilterOn }) {
  const handleFilterCheck = (e) => {
    setFilter(e.target.checked);
  }

  return (
    <div className='filter'>
      <input checked={isFilterOn} onChange={handleFilterCheck} className='filter__input' id='filter' type="checkbox" />
      <label className='filter__label' htmlFor="filter"></label>
    </div>
  )
}
