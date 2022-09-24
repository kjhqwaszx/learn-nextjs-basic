import React, { useEffect, useRef } from 'react';
import './MovieModal.css';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) => {
  const ref = useRef();

  //모달 밖 영역을 클릭할 경우 모달을 닫아준다.
  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  // 배경 스크롤 방지
  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        {/*선택하려는 Dom을 설정해 주어야 ref.current에 저장된다.*/}
        <div className="modal" ref={ref}>
          <span onClick={() => setModalOpen(false)} className="modal-close">
            X
          </span>
          <img
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal__poster-img"
          ></img>
          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user_prec">100% for you</span>
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview"> 평점: {vote_average}</p>
            <p className="modal__overview"> {overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
