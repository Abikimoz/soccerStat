import React from 'react';

export const Leagues = ({ leagues, currentPage, itemsPerPage, onLeagueSelect }) => {
  const indexOfLastLeague = currentPage * itemsPerPage;
  const indexOfFirstLeague = indexOfLastLeague - itemsPerPage;
  const currentLeagues = leagues.slice(indexOfFirstLeague, indexOfLastLeague);

  return (
    <div className="row">
      {currentLeagues.map((league) => (
        <div className="col-md-4 mb-4" key={league.id}>
          <div 
            className="card h-100 cursor-pointer" 
            onClick={() => onLeagueSelect(league)} // Обработка клика по всей карточке
          >
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{league.name}</h5>
              <p className="card-text">{league.country}</p> {/* Добавлено отображение страны */}
              <p className="card-text flex-grow-1">{league.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
