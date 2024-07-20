import React, { useState } from 'react';  // Добавление useState
import LeagueInfo from './LeagueInfo';

function Leagues({ leagues, currentPage, itemsPerPage }) {
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [showLeagueInfo, setShowLeagueInfo] = useState(false);

  const handleClickLeague = (league) => {
    setSelectedLeague(league);
    setShowLeagueInfo(true);
  };

  return (
    <div>
      <div id="LeagueInfo" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {leagues
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((league) => (
            <div key={league.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleClickLeague(league)}>
              <h3>{league.name}</h3>
              <p>{league.area.name}</p>
            </div>
          ))}
      </div>
      {showLeagueInfo && <LeagueInfo league={selectedLeague} />}
    </div>
  );
}

export default Leagues;
