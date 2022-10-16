import React from 'react';
import netflix_logo from '../assets/img/netflix_logo.svg';
import react_logo from '../assets/img/react_logo.png';

const Nav = () => {
  return (
    <nav>
      <img alt="Netflix logo" src={netflix_logo} className="nav__logo" />
      <img alt="User logged" src={react_logo} className="nav__avatar" />
    </nav>
  );
};

export default Nav;
