import React from 'react';

export const LeagueStandings = ({ standings, currentPage, itemsPerPage }) => {
  if (!standings || !standings.matches) return null;

  const indexOfLastMatch = currentPage * itemsPerPage;
  const indexOfFirstMatch = indexOfLastMatch - itemsPerPage;
  const currentMatches = standings.matches.slice(indexOfFirstMatch, indexOfLastMatch);

  return (
    <div>
      <h2>Матчи</h2>
      <table className="table">
        <tbody>
          {currentMatches.map((match) => (
            <tr key={match.id}>
              <td>
                {match.utcDate ? new Date(match.utcDate).toLocaleDateString('ru-RU') : '-'}
              </td>
              <td>
                {match.utcDate ? new Date(match.utcDate).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : '-'}
              </td>
              <td>
                {match.status === 'SCHEDULED' && 'Запланирован'}
                {match.status === 'LIVE' && 'В прямом эфире'}
                {match.status === 'IN_PLAY' && 'В игре'}
                {match.status === 'PAUSED' && 'Пауза'}
                {match.status === 'FINISHED' && 'Завершен'}
                {match.status === 'POSTPONED' && 'Отложен'}
                {match.status === 'SUSPENDED' && 'Приостановлен'}
                {match.status === 'CANCELED' && 'Отменен'}
              </td>
              <td>{match.homeTeam ? match.homeTeam.name : '-'}</td>
              <td>{match.awayTeam ? match.awayTeam.name : '-'}</td>
              <td>
                {match.score && match.score.fullTime ? 
                  `${match.score.fullTime.homeTeam || 0} : ${match.score.fullTime.awayTeam || 0}` : 
                  '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
