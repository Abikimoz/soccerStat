import React from 'react';
import { LeagueStandings } from '../components/LeagueStandings';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const LinkPage = ({ selectedLeague, onBack }) => {
  return (
    <>
      <Breadcrumbs currentLeague={selectedLeague} onBack={onBack} />
      {selectedLeague ? (
        <LeagueStandings league={selectedLeague} />
      ) : (
        <div>Пожалуйста, выберите лигу для отображения</div>
      )}
    </>
  );
};
