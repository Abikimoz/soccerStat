import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Breadcrumbs = ({ currentLeague }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/league');
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item d-flex mt-2 align-items-center">
          <button
            onClick={handleBack}
            className="btn mb-0 p-0 me-2 text-decoration-none"
          >
            Лиги
          </button>
          {currentLeague && (
            <>
              <span className="ms-0 me-2" aria-hidden="true">
                {' > '}
              </span>
              <span>{currentLeague}</span>
            </>
          )}
        </li>
      </ol>
    </nav>
  );
};
