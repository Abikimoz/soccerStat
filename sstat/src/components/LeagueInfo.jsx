import React from 'react';

const apiKey = process.env.REACT_APP_API_KEY;

const LeagueInfo = ({ league }) => {
  const handleClick = () => {
    fetch(`http://api.football-data.org/v2/competitions/${league.id}/matches`, {
      headers: {
        'X-Auth-Token': apiKey
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
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
