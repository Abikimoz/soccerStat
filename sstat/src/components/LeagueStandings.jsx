import React from 'react';

export const LeagueStandings = ({ standings }) => {
  if (!standings) return null; // Если данных нет, ничего не рендерим
  
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
