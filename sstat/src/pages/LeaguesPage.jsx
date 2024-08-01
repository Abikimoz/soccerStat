import React, { useState, useEffect } from 'react'; 
import { Leagues } from '../components/Leagues';
import { SearchBar } from '../components/SearchBar';
import { CustomPagination } from '../components/Pagination';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { fetchLeagues } from '../services/api';

export const LeaguesPage = ({ onLeagueSelect, selectedLeague, onBack }) => {
  const [leagues, setLeagues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9;

  useEffect(() => {
    setLoading(true);
    fetchLeagues()
      .then(response => {
        setLeagues(response.data.competitions);
        setError(null);
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных: ', error);
        setError('Не удалось загрузить данные о лигах. Попробуйте позже.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(leagues.length / itemsPerPage);

  const currentLeagues = () => {
    const indexOfLastLeague = currentPage * itemsPerPage;
    const indexOfFirstLeague = indexOfLastLeague - itemsPerPage;
    return leagues.slice(indexOfFirstLeague, indexOfLastLeague);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Breadcrumbs currentLeague={selectedLeague} onBack={onBack} />
      <SearchBar />
      {loading ? (
        <div className="loading-message">
          Загрузка...
        </div>
      ) : error ? (
        <div className="error-message">
          {error}
        </div>
      ) : (
        <>
          <Leagues 
            leagues={currentLeagues()} 
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
      )}
    </>
  );
};
