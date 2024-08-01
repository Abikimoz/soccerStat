import React from 'react';

export const Leagues = ({ leagues, onLeagueSelect }) => {
  return (
    <div className="row">
      {leagues.map((league) => (
        <div className="col-md-4 mb-4" key={league.id}>
          <div 
            className="card h-100 cursor-pointer" 
            onClick={() => onLeagueSelect(league)} 
          >
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{league.name}</h5>
              <p className="card-text">{league.country}</p>
              <p className="card-text flex-grow-1">{league.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
