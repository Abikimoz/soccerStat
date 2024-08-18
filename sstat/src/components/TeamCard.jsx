import React from 'react';

export const TeamCard = ({ team, onTeamSelect }) => {
  return (
    <div className="col mb-4 col-md-2"> {/* col-md-2 для 5 карточек в ряд */}
      <div className="card" onClick={() => onTeamSelect(team)} style={{ cursor: 'pointer' }}>
        <img
          src={team.crest}
          alt={team.name}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title text-center">{team.name}</h5>
        </div>
      </div>
    </div>
  );
};
