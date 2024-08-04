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
  const [searchTerm, setSearchTerm] = useState(''); // Состояние для поиска
  const itemsPerPage = 9;

  useEffect(() => {
    const loadLeagues = async () => {
      setLoading(true);
      try {
        const response = await fetchLeagues();
        setLeagues(response.data.competitions);
        setError(null);
      } catch (error) {
        console.error('Ошибка при загрузке данных: ', error);
        setError('Не удалось загрузить данные о лигах. Попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };
    loadLeagues();
  }, []);

  // Функция для фильтрации лиг по ящику поиска
  const filteredLeagues = leagues.filter((league) =>
    league.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLeagues.length / itemsPerPage);

  const currentLeagues = () => {
    const indexOfLastLeague = currentPage * itemsPerPage;
    const indexOfFirstLeague = indexOfLastLeague - itemsPerPage;
    return filteredLeagues.slice(indexOfFirstLeague, indexOfLastLeague);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Функция для обновления состояния поиска
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Сброс текущей страницы при новом поиске
  };

  return (
    <>
      <Breadcrumbs currentLeague={selectedLeague} onBack={onBack} />
      <SearchBar onSearchChange={handleSearchChange} />
      {loading ? (
        <div className="loading-message">Загрузка...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <Leagues 
            leagues={currentLeagues()} 
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
