import React from 'react';

const LeagueInfo = ({ league }) => {
  const handleClick = () => {
    fetch(`http://api.football-data.org/v2/competitions/${league.id}/matches`, {
      headers: {
        'X-Auth-Token': '810c2e0f4afa45a2939421c74d689cb9'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Дополнительные действия при получении данных о матчах, например, отображение на экране
      })
      .catch(error => console.error(error));
  };

  return (
    <div onClick={handleClick}>
      <h3>{league.name}</h3>
      <p>Страна: {league.area.name}</p>
    </div>
  );
};

export default LeagueInfo;
