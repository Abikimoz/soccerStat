import React, { useEffect, useState } from 'react';
import { LeagueStandings } from '../components/LeagueStandings';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { fetchStandings } from '../services/api'; // Импорт функции для получения данных

export const LeagueStandingsPage = ({ league, onBack }) => {
  const [standings, setStandings] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStandings = async () => {
      if (!league) return; // Проверка на наличие лиги
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

  return (
    <>
      <Breadcrumbs currentLeague={league} onBack={onBack} />
      {loading ? (
        <div>Загрузка...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <LeagueStandings standings={standings} />
      )}
    </>
  );
};
