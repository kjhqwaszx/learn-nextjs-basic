import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './SearchPage.css';
import { UseDebounce } from '../../hooks/useDebounce';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  // const searchItem = query.get('q');

  const debouncedSearchItem = UseDebounce(query.get('q'), 500);

  useEffect(() => {
    if (debouncedSearchItem) {
      fetchSearchMovie(debouncedSearchItem);
    }
  }, [debouncedSearchItem]);

  const fetchSearchMovie = async (debouncedSearchItem) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${debouncedSearchItem}`,
      );
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
              <div className="movie" key={movie.id}>
                <div className="movie__column-poster" onClick={() => navigate(`/${movie.id}`)}>
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
          <p> 찾고자하는 검색어 "{debouncedSearchItem}"에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    );
  };
  return renderSearchResults();
};

export default SearchPage;
