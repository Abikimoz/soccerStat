import React, { useState, useEffect } from 'react';
import LeagueInfo from './LeagueInfo';
import axios from 'axios'; // Импортируем axios

const apiKey = process.env.REACT_APP_API_KEY;

function Leagues() {
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [showLeagueInfo, setShowLeagueInfo] = useState(false);

  useEffect(() => {
    axios.get('/api/v4/competitions', { // Обращаемся к прокси-серверу через axios
      headers: {
        'X-Auth-Token': apiKey
      }
    })
      .then(response => {
        setLeagues(response.data.competitions);
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных: ', error);
      });
  }, []);

  const handleClickLeague = (league) => {
    setSelectedLeague(league);
    setShowLeagueInfo(true);
  };

  return (
    <div id="LeagueInfo" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
      {leagues.map((league) => (
        <div key={league.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleClickLeague(league)}>
          <h3>{league.name}</h3>
          <p>{league.area.name}</p>
        </div>
      ))}
      {showLeagueInfo && <LeagueInfo league={selectedLeague} />}
    </div>
  );
}

export default Leagues;
