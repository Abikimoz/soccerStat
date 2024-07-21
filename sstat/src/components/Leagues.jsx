import React from 'react';  
import 'bootstrap/dist/css/bootstrap.min.css';

function Leagues({ leagues, currentPage, itemsPerPage, onLeagueSelect }) {
  return (
    <div className="container px-3 my-4">
      <div id="LeagueInfo" className="row g-3">
        {leagues
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((league) => (
            <div className="col-md-4" key={league.id} onClick={() => onLeagueSelect(league)}>
              <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                <h3>{league.name}</h3>
                <p>{league.area.name}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Leagues;
