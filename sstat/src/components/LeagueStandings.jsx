import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

const LeagueStandings = ({ league }) => {
  const [standings, setStandings] = useState(null);

  useEffect(() => {
    if (league) {
      const fetchStandings = async () => {
        try {
          const response = await axios.get(`/api/v4/competitions/${league.id}/standings`, {
            headers: { 'X-Auth-Token': apiKey },
          });
          setStandings(response.data);
        } catch (error) {
          console.error("Ошибка при загрузке данных:", error);
        }
      };

      fetchStandings();
    }
  }, [league]);

  if (!standings) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>{standings.competition.name} - Календарь</h2>
      {standings.standings.map((standing) => (
        <div key={standing.group}>
          <h3>{standing.group}</h3>
          <ul>
            {standing.table.map((team) => (
              <li key={team.team.id}>{team.team.name} - {team.points} очков</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default LeagueStandings;
