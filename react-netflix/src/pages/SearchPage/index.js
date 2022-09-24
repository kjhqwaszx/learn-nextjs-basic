import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import './SearchPage.css';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchItem = query.get('q');

  useEffect(() => {
    if (searchItem) {
      fetchSearchMovie(searchItem);
    }
  }, [searchItem]);

  const fetchSearchMovie = async (searchItem) => {
    try {
      const request = await axios.get(`/search/multi?include_adult=false&query=${searchItem}`);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== 'person') {
            const movieImageUrl = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
            return (
              <div className="movie">
                <div className="movie__column-poster">
                  <img src={movieImageUrl} alt="movie" className="movie__poster" />
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p> 찾고자하는 검색어 "{searchItem}"에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    );
  };
  return renderSearchResults();
};

export default SearchPage;
