import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react'; 
import Navbars from './components/Navbars';
import SearchBar from './components/SearchBar';
import Leagues from './components/Leagues';
import CustomPagination from './components/Pagination';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  const [leagues, setLeagues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Количество лиг на странице

  useEffect(() => {
    axios.get('/api/v4/competitions', {
      headers: {
        'X-Auth-Token': apiKey
      }
    })
      .then(response => {
        setLeagues(response.data.competitions);
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных: ', error);
      });
  }, []);

  const totalPages = Math.ceil(leagues.length / itemsPerPage); // Общее количество страниц

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      <header id="navbar">
        <Navbars />
      </header>
      <main>
        <SearchBar />
        <Leagues leagues={leagues} currentPage={currentPage} itemsPerPage={itemsPerPage} />
        <CustomPagination
          totalPages={totalPages}
          activePage={currentPage}
          onPageChange={paginate}
        />
      </main>
    </div>
  );
}

export default App;
