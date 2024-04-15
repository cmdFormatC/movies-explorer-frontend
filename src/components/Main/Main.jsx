import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

export default function Main() {
  return (
    <main className="main">
      <Header isAuth={false} isMain={true} />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio/>
      <Footer />
    </main>
  )
}
