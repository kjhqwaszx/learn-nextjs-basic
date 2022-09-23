import './App.css';
import Nav from './components/Nav';
import Banner from './components/Banner';
import requests from './api/requests';
import Row from './components/Row';

const App = () => {
  return (
    <div className="App">
      <Nav></Nav>
      <Banner></Banner>

      <Row
        title="Netflix Original"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      ></Row>
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending}></Row>
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated}></Row>
      <Row title="Action Movies" id="AM" fetchUrl={requests.fetchActionMovies}></Row>
      <Row title="Comedy Movies" id="CM" fetchUrl={requests.fetchComedyMovies}></Row>
    </div>
  );
};

export default App;
