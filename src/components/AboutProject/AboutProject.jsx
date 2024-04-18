import './AboutProject.css';
import React from 'react'

export default function AboutProject() {
  return (
    <section className='about'>
      <div className='wrapper'>
        <h2 className='about__title'>О проекте</h2>
        <div className='about__content'>
          <div className='about__desc'>
            <div className='about__col'>
              <h3 className='about__subtitle'>Дипломный проект включал 5 этапов</h3>
              <p className='about__paragraph'>
                Составление плана, работу над бэкендом, вёрстку, добавление функциональности 
                и финальные доработки.
              </p>
            </div>
            <div className='about__col'>
              <h3 className='about__subtitle'>На выполнение диплома ушло 5 недель</h3>
              <p className='about__paragraph'>
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
                чтобы успешно защититься.
              </p>
            </div>
          </div>
          <div className='about__chart'>
            <div className='about__chart-col'>
              <span className='about__time about__time_back'>1 неделя</span>
              <span className='about__area'>Back-end</span>
            </div>
            <div className='about__chart-col'>
              <span className='about__time about__time_front'>4 недели</span>
              <span className='about__area'>Front-end</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
