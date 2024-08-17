import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { LeagueStandings } from '../components/LeagueStandings';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { fetchStandings } from '../services/api';
import { CustomPagination } from '../components/Pagination';
import { Loader } from '../components/Loader';
import { DateFilter } from '../components/DateFilter';

export const LeagueStandingsPage = ({ onBack }) => {
  const { id: leagueId } = useParams();
  const [standings, setStandings] = useState(null);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const loadStandings = async () => {
      if (!leagueId) return;

      setLoading(true);
      try {
        const response = await fetchStandings(leagueId);
        setStandings(response.data);
        setFilteredMatches(response.data.matches || []);
        setError(null);
      } catch (err) {
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    loadStandings();
  }, [leagueId]);

  const handleFilter = useCallback(({ startDate, endDate }) => {
    if (standings && standings.matches) {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                // Обработка ошибок с некорректными датами
                console.error('Некорректные даты');
                return;
            }

            const filtered = standings.matches.filter(match => {
                const matchDate = new Date(match.utcDate);
                // Является ли дата матча в диапазоне
                return matchDate >= start && matchDate <= end;
            });
            setFilteredMatches(filtered);
        } else {
            // Если даты не заданы, показываем все матчи
            setFilteredMatches(standings.matches);
        }
        setCurrentPage(1); // Сбрасываем текущую страницу при изменении фильтра
    }
}, [standings]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const leagueName = standings?.competition?.name;

  return (
    <>
      <Breadcrumbs currentLeague={leagueName} onBack={onBack} />
      {loading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <DateFilter onFilter={handleFilter} />
          {filteredMatches.length === 0 ? ( // Проверка на наличие отфильтрованных матчей
            <div>Нет матчей за выбранный период</div>
          ) : (
            <>
              <LeagueStandings
                standings={standings}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                filteredMatches={filteredMatches}
              />
              <CustomPagination
                totalPages={Math.ceil(filteredMatches.length / itemsPerPage)}
                activePage={currentPage}
                onPageChange={paginate}
              />
            </>
          )}
        </>
      )}
    </>
  );  
};
