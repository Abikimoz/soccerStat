import React from 'react';

export const Leagues = ({ leagues, onLeagueSelect }) => {
  if (!leagues.length) {
    return <p className="text-center">Нет доступных лиг.</p>;
  }

  return (
    <div className="row">
      {leagues.map((league) => (
        <div className="col-md-4 mb-4" key={league.id}>
          <div 
            className="card h-100 text-decoration-none" 
            onClick={() => onLeagueSelect(league)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-center">{league.name}</h5>
              <p className="card-text text-center mt-2">{league.area.name}</p>
              <p className="card-text flex-grow-1">{league.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
