import React, { useEffect, useState } from 'react';
import './Nav.css';
import netflix_logo from '../assets/img/netflix_logo.svg';
import react_logo from '../assets/img/react_logo.png';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };
  return (
    <nav className={`nav ${show && 'nav__black'}`}>
      <img
        alt="Netflix logo"
        src={netflix_logo}
        className="nav__logo"
        onClick={() => navigate('/')}
      />
      <input
        value={searchValue}
        onChange={handleChange}
        className="nav__input"
        type="text"
        placeholder="영화를 입력해 주세요"
      />
      <img alt="User logged" src={react_logo} className="nav__avatar" />
    </nav>
  );
};

export default Nav;
