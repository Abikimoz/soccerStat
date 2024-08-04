import React, { useEffect, useState } from 'react';
import { LeagueStandings } from '../components/LeagueStandings';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { fetchStandings } from '../services/api'; 
import { CustomPagination } from '../components/Pagination';

export const LeagueStandingsPage = ({ league, onBack }) => {
  const [standings, setStandings] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 7;

  useEffect(() => {
    const loadStandings = async () => {
      if (!league) return;
      setLoading(true);
      try {
        const response = await fetchStandings(league.id);
        setStandings(response.data);
        setError(null);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        setError("Ошибка при загрузке данных");
      } finally {
        setLoading(false);
      }
    };

    loadStandings();
  }, [league]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Breadcrumbs currentLeague={league} onBack={onBack} />
      {loading ? (
        <div>Загрузка...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <LeagueStandings standings={standings} currentPage={currentPage} itemsPerPage={itemsPerPage} />
          {standings && standings.matches && (
            <CustomPagination
              totalPages={Math.ceil(standings.matches.length / itemsPerPage)}
              activePage={currentPage}
              onPageChange={paginate}
            />
          )}
        </>
      )}
    </>
  );
};
