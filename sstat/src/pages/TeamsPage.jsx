import React, { useEffect, useState } from 'react';
import { TeamCard } from '../components/TeamCard';
import { fetchTeams } from '../services/api';  
import { Loader } from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { CustomPagination } from '../components/Pagination';

export const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const itemsPerPage = 10;  

  useEffect(() => {
    const loadTeams = async () => {
      setLoading(true);
      try {
        const response = await fetchTeams();
        setTeams(response.data.teams);
        setError(null);
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setError('Не удалось загрузить команды. Попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTeams.length / itemsPerPage);

  const currentTeams = () => {
    const indexOfLastTeam = currentPage * itemsPerPage;
    const indexOfFirstTeam = indexOfLastTeam - itemsPerPage;
    return filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    navigate(`/team/${team.id}`);
  };

  return (
    <>
      <SearchBar onSearchChange={handleSearchChange} />
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="row">
            {currentTeams().length > 0 ? (
              currentTeams().map((team) => (
                <div className="col" key={team.id}>
                  <TeamCard team={team} onTeamSelect={handleTeamSelect} />
                </div>
              ))
            ) : (
              <div className="text-center">Нет доступных команд.</div>
            )}
          </div>
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
