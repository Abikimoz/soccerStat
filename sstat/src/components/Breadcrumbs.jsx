import React from 'react';

export const Breadcrumbs = ({ currentLeague, onBack }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item d-flex mt-2 align-items-center"> 
          <button
            onClick={onBack}
            className="btn mb-0 p-0 me-2 text-decoration-none"
          >
            Лиги
          </button>
          {currentLeague && (
            <>
              <span className="ms-0 me-2" aria-hidden="true">{' > '}</span>
              <span>{currentLeague.name}</span>
            </>
          )}
        </li>
      </ol>
    </nav>
  );
};
