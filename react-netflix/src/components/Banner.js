import React, { useEffect, useState } from 'react';
import requests from '../api/requests';
import axios from '../api/axios';
import './Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //현재 상황중인 영화 정보 가져오기
    const request = await axios.get(requests.fetchNowPlaying);

    //영화 하나 선택하기
    const movieId =
      request.data.results[Math.floor(Math.random() * request.data.results.length)].id;

    //특정 영화의 상세 정보 가져오기
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: 'videos' },
    });

    setMovie(movieDetail);
  };

  const truncate = (str, limit) => {
    return str?.length > limit ? str.substr(0, limit - 1) + '...' : str;
  };

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
          <button className="banner__button play"> Play</button>
          <button className="banner__button info"> More Information</button>
        </div>
        <h1 className="banner__description">{truncate(movie.overview, 100)}</h1>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export default Banner;
