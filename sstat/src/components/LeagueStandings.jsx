import React from 'react';
import matchStatuses from '../services/matchStatuses.json';

export const LeagueStandings = ({ standings, currentPage, itemsPerPage, filteredMatches }) => {
  if (!standings || !standings.matches) return null;

  const displayedMatches = filteredMatches.length > 0 
    ? filteredMatches 
    : standings.matches; // Если фильтров нет, показываем все матчи

  const indexOfLastMatch = currentPage * itemsPerPage;
  const indexOfFirstMatch = indexOfLastMatch - itemsPerPage;
  const currentMatches = displayedMatches.slice(
    indexOfFirstMatch,
    indexOfLastMatch
  );

  return (
    <div>
      <table className="table">
        <tbody>
          {currentMatches.map((match) => (
            <tr key={match.id}>
              <td>
                {match.utcDate
                  ? new Date(match.utcDate).toLocaleDateString('ru-RU')
                  : '-'}
              </td>
              <td>
                {match.utcDate
                  ? new Date(match.utcDate).toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '-'}
              </td>
              <td>
                {matchStatuses[match.status] || match.status}
              </td>
              <td>{match.homeTeam ? match.homeTeam.name : '-'}</td>
              <td>{match.awayTeam ? match.awayTeam.name : '-'}</td>
              <td>
                {match.score && match.score.fullTime
                  ? `${match.score.fullTime.homeTeam || 0} : ${match.score.fullTime.awayTeam || 0}`
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {displayedMatches.length === 0 && <p>Нет доступных матчей для отображения.</p>} {/* Сообщение при отсутствии матчей */}
    </div>
  );
};
