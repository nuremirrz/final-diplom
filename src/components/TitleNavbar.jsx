import React from 'react'
import ManasLogo from '../img/Manas_logo.png';
import Mpretn from '../img/мпрэтн.png';

const TitleNavbar = () => {
  return (
    <>
    <div className="navbar">
      <div className="container">
        <div className="navbar__sides">
          <div className="navbar__left">
            <img src={ManasLogo} alt="manas_logo" className="navbar__left_img" />
            <span className="navbar__left_title">
              КЫРГЫЗСКО-ТУРЕЦКИЙ
              <br /> УНИВЕРСИТЕТ «МАНАС»
            </span>
          </div>
          <div className="navbar__right">
            <img src={Mpretn} alt="mpretn" className="navbar__right_img" />
            <span className="navbar__right_title">
              МИНИСТЕРСТВО ПРИРОДНЫХ РЕСУРСОВ,
              <br />
              ЭКОЛОГИИ И ТЕХНИЧЕСКОГО НАДЗОРА
              <br /> КЫРГЫЗСКОЙ РЕСПУБЛИКИ
            </span>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default TitleNavbar