import './Techs.css';
import React from 'react'

export default function Techs() {
  return (
    <section className='techs'>
      <div className='techs__content wrapper'>
        <h2 className='techs__title'>Технологии</h2>
        <h3 className='techs__subtitle'>7 технологий</h3>
        <p className='techs__paragraph'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className='techs__list'>
          <li className='techs__item techs__item_html'>HTML</li>
          <li className='techs__item techs__item_css'>CSS</li>
          <li className='techs__item techs__item_js'>JS</li>
          <li className='techs__item techs__item_react'>React</li>
          <li className='techs__item techs__item_git'>Git</li>
          <li className='techs__item techs__item_express'>Express.js</li>
          <li className='techs__item techs__item_mongo'>mongoDB</li>
        </ul>
      </div>
    </section>
  )
}
