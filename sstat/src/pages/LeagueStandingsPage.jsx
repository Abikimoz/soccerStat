import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { LeagueStandings } from '../components/LeagueStandings';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { fetchStandings } from '../services/api';
import { CustomPagination } from '../components/Pagination';
import { Loader } from '../components/Loader';
import { DateFilter } from '../components/DateFilter';

export const LeagueStandingsPage = ({ onBack }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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

  const handleFilter = useCallback(async ({ startDate, endDate }) => {
    if (!startDate && !endDate) {
      // Если даты не заданы, сбросить фильтр
      setFilteredMatches(standings?.matches || []);
      return;
    }

    setLoading(true);
    setError(null);
  
    try {
      const response = await fetchStandings(leagueId, startDate, endDate);
      const matches = response.data.matches || [];
      setFilteredMatches(matches.length > 0 ? matches : standings?.matches || []);
    } catch (err) {
      console.error('Ошибка при фильтрации:', err);
      setError('Ошибка при загрузке отфильтрованных данных');
    } finally {
      setCurrentPage(1); // Сбрасываем текущую страницу при изменении фильтра
      setLoading(false);
    }
  }, [leagueId, standings]);
  

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
          <DateFilter 
            startDate={startDate}
            endDate={endDate}
            onFilter={handleFilter}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            />
          {filteredMatches.length === 0 ? (
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
