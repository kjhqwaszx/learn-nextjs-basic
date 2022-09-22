import React, { useEffect, useState } from 'react';
import './Nav.css';
import netflix_logo from '../assets/img/netflix_logo.svg';
import react_logo from '../assets/img/react_logo.png';

const Nav = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    //scroll 이벤트가 발생했을때 실행
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []); // dependency 변수설정

  return (
    <nav className={`nav ${show && 'nav__black'}`}>
      <img
        alt="Netflix logo"
        src={netflix_logo}
        className="nav__logo"
        onClick={() => window.location.reload()}
      />
      <img alt="User logged" src={react_logo} className="nav__avatar" />
    </nav>
  );
};

export default Nav;
