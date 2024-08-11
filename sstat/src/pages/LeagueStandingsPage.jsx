import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import { LeagueStandings } from '../components/LeagueStandings';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { fetchStandings } from '../services/api'; 
import { CustomPagination } from '../components/Pagination';

export const LeagueStandingsPage = ({ onBack }) => {
  const { id: leagueId } = useParams();
  const [standings, setStandings] = useState(null);
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
        setError(null);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        setError("Ошибка при загрузке данных");
      } finally {
        setLoading(false);
      }
    };

    loadStandings();
  }, [leagueId]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const leagueName = standings?.competition?.name;
  console.log("Сюда я пишу название лиги!:", leagueName);

  return (
    <>
      <Breadcrumbs currentLeague={leagueName} onBack={onBack} />
      {loading ? (
        <div>Загрузка...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <LeagueStandings standings={standings} currentPage={currentPage} itemsPerPage={itemsPerPage} />
          {standings?.matches && (
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
