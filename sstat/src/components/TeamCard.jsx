import React from 'react';

export const TeamCard = ({ team, onTeamSelect }) => {
  return (
    <div className="col-sm-6 col-md-4 mb-3">
      <div
        className="card text-decoration-none"
        onClick={() => onTeamSelect(team)}
        style={{
          cursor: 'pointer',
          width: '200px', // Размер карточки
          height: '200px',
          margin: '15px', // Интервал между карточками
          overflow: 'hidden', // Скрыть лишнее
        }}
      >
        <div className="card-body d-flex flex-column" style={{ height: '30%' }}>
          <h5 className="card-title text-center">{team.name}</h5>
        </div>
        <img
          src={team.crest}
          alt={team.name}
          className="card-img-top"
          style={{
            width: '100%',
            height: '70%',
            objectFit: 'cover', // Позволяет изображению заполнять пространство
          }}
        />
      </div>
    </div>
  );
};
