import React from 'react';
import LeagueStandings from '../components/LeagueStandings';
import Breadcrumbs from '../components/Breadcrumbs';

const LeagueStandingsPage = ({ league, onBack }) => {
  return (
    <>
      <Breadcrumbs currentLeague={league} onBack={onBack} />
      <LeagueStandings league={league} />
    </>
  );
};

export default LeagueStandingsPage;
