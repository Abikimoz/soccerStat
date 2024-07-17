import React from 'react';

const LeagueInfo = ({ league }) => {
  const handleClick = () => {
    // Выполнение GET-запроса к API при нажатии на блок
    // Подставьте в `{id}` идентификатор лиги
    fetch(`http://api.football-data.org/v2/competitions/${league.id}/matches`)
      .then(response => response.json())
      .then(data => {
        // Обработка данных о матчах
        console.log(data);
        // Перенаправление на страницу календаря лиги или другие действия
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
