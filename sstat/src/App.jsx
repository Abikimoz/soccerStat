import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react'; 
import Navbars from './components/Navbars';
import SearchBar from './components/SearchBar';
import Leagues from './components/Leagues';
import CustomPagination from './components/Pagination';
import LeagueStandings from './components/LeagueStandings';
import Breadcrumbs from './components/Breadcrumbs'; // Импорт Breadcrumbs
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  const [leagues, setLeagues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const itemsPerPage = 9;

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

  const totalPages = Math.ceil(leagues.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLeagueSelect = (league) => {
    setSelectedLeague(league);
  };

  const handleBack = () => {
    setSelectedLeague(null);
  };

  return (
    <div className="App">
      <header id="navbar">
        <Navbars />
      </header>
      <main className="container">
        <Breadcrumbs currentLeague={selectedLeague} onBack={handleBack} />
        {!selectedLeague ? (
          <>
            <SearchBar />
            <Leagues 
              leagues={leagues} 
              currentPage={currentPage} 
              itemsPerPage={itemsPerPage} 
              onLeagueSelect={handleLeagueSelect} 
            />
            <CustomPagination
              totalPages={totalPages}
              activePage={currentPage}
              onPageChange={paginate}
            />
          </>
        ) : (
          <LeagueStandings league={selectedLeague} />
        )}
      </main>
    </div>
  );
}

export default App;
