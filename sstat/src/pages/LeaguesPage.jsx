import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leagues } from '../components/Leagues';
import { SearchBar } from '../components/SearchBar';
import { CustomPagination } from '../components/Pagination';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { fetchLeagues } from '../services/api';

export const LeaguesPage = ({ onBack }) => {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleLeagueSelect = (league) => {
    console.log('Выбрана лига: ', league);
    setSelectedLeague(league);
    navigate(`/league/${league.id}`);
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
            onLeagueSelect={handleLeagueSelect}
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
