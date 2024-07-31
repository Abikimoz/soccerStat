import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import Leagues from '../components/Leagues';
import SearchBar from '../components/SearchBar';
import CustomPagination from '../components/Pagination';
import Breadcrumbs from '../components/Breadcrumbs';

const apiKey = process.env.REACT_APP_API_KEY;

const LeaguesPage = ({ onLeagueSelect, selectedLeague, onBack }) => {
  const [leagues, setLeagues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  return (
    <>
      <Breadcrumbs currentLeague={selectedLeague} onBack={onBack} />
      <SearchBar />
      <Leagues 
        leagues={leagues} 
        currentPage={currentPage} 
        itemsPerPage={itemsPerPage} 
        onLeagueSelect={onLeagueSelect} 
      />
      <CustomPagination
        totalPages={totalPages}
        activePage={currentPage}
        onPageChange={paginate}
      />
    </>
  );
};

export default LeaguesPage;
