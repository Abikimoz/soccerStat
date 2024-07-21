import React from 'react';

const Breadcrumbs = ({ currentLeague, onBack }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <button onClick={onBack} className="btn btn-link text-decoration-none">Лиги</button>
        </li>
        {currentLeague && (
          <li className="breadcrumb-item active" aria-current="page">
            {currentLeague.name}
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
