import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import './Banner.css';
import requests from '../api/requests';
import styled from 'styled-components';

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //현재 상황중인 영화 정보 가져오기
    const request = await axios.get(requests.fetchNowPlaying);

    //영화 하나 선택하기
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    //특정 영화의 상세 정보 가져오기
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: 'videos' },
    });

    setMovie(movieDetail);
  };

  const truncate = (str, limit) => {
    return str?.length > limit ? str.substr(0, limit - 1) + '...' : str;
  };

  const clickedPlay = () => {
    if (movie.videos.results.length > 0) {
      setIsClicked(true);
    } else {
      alert('동영상이 없습니다.');
    }
  };

  if (!isClicked) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
        }}
      >
        <div className="banner__contents">
          <h1> {movie.title || movie.name || movie.orgininal_name}</h1>
          <div className="banner__buttons">
            <button className="banner__button play" onClick={clickedPlay}>
              {' '}
              Play
            </button>
            <button className="banner__button info"> More Information</button>
          </div>
          <h1 className="banner__description">
            {truncate(movie.overview, 100)}
          </h1>
        </div>
        <div className="banner--fadeBottom"></div>
      </header>
    );
  } else {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; fullscreen;"
            allowFullScreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  }
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
export default Banner;
