import React, { useEffect, useState } from 'react';
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
  const [filteredMatches, setFilteredMatches] = useState([]); // Доступные матчи после фильтрации
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const loadStandings = async () => {
      console.log('Загрузка данных для лиги с ID:', leagueId);
      if (!leagueId) return;

      setLoading(true);
      try {
        const response = await fetchStandings(leagueId);
        console.log('Данные лиги:', response.data);
        setStandings(response.data);
        setFilteredMatches(response.data.matches || []); // Сохраняем все матчи для фильтрации
        setError(null);
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    loadStandings();
  }, [leagueId]);

  const handleFilter = ({ startDate, endDate }) => {
    if (standings && standings.matches) {
      const filtered = standings.matches.filter(match => {
        const matchDate = new Date(match.date); // Предполагается, что match.date - строка
        const isAfterStartDate = startDate ? matchDate >= new Date(startDate) : true;
        const isBeforeEndDate = endDate ? matchDate <= new Date(endDate) : true;
        return isAfterStartDate && isBeforeEndDate;
      });
      setFilteredMatches(filtered);
      setCurrentPage(1); // Сброс текущей страницы после фильтрации
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const leagueName = standings?.competition?.name;
  console.log('Сюда я пишу название лиги!:', leagueName);

  return (
    <>
      <Breadcrumbs currentLeague={leagueName} onBack={onBack} />
      {loading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <DateFilter onFilter={handleFilter} /> {/* Добавим фильтр */}
          <LeagueStandings
            standings={standings}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            filteredMatches={filteredMatches} // Передаем отфильтрованные матчи
          />
          {filteredMatches.length > 0 && (
            <CustomPagination
              totalPages={Math.ceil(filteredMatches.length / itemsPerPage)}
              activePage={currentPage}
              onPageChange={paginate}
            />
          )}
        </>
      )}
    </>
  );
};
