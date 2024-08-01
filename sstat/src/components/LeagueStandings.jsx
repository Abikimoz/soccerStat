import React, { useEffect, useState } from 'react';
import { fetchStandings } from '../services/api'; // Импортируем функцию из api.js

export const LeagueStandings = ({ league }) => {
  const [standings, setStandings] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStandings = async () => {
      if (!league) return; // Проверка на наличие лиги
      try {
        const response = await fetchStandings(league.id); // Используем функцию для получения данных
        setStandings(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        setError("Ошибка при загрузке данных");
      }
    };

    loadStandings();
  }, [league]);

  if (error) return <div>{error}</div>;
  if (!standings) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>{standings.competition.name} - Календарь</h2>
      {standings.standings.map(standing => (
        <div key={standing.group}>
          <h3>{standing.group}</h3>
          <ul>
            {standing.table.map(team => (
              <li key={team.team.id}>{team.team.name} - {team.points} очков</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
