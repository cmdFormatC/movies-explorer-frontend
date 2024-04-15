import './AboutMe.css';
import student from '../../images/student.png';
import React from 'react'

export default function AboutMe() {
  return (
    <section className='about-me'>
      <div className='about-me__wrapper wrapper'>
        <h2 className='about-me__title'>Студент</h2>
        <div className='about-me__content'>
          <div className='about-me__desc'>
            <h3 className='about-me__subtitle'>Виталий</h3>
            <span className='about-me__bio'>Фронтенд-разработчик, 30 лет</span>
            <p className='about-me__paragraph'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
              После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a className='about-me__github-link' href="https://github.com">Github</a>
          </div>
          <img className='about-me__photo' src={student} alt="Фото" />
        </div>
      </div>
    </section>
  )
}
