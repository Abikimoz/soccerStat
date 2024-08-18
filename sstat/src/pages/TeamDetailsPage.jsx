import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTeamDetails, fetchTeamMatches } from '../services/api'; // Предполагается, что функции реализованы
import { Loader } from '../components/Loader';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const TeamDetailsPage = ({ onBack }) => {
  const { id } = useParams();
  const [standings, setStandings] = useState(null);
  const [team, setTeam] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeamDetails = async () => {
      setLoading(true);
      try {
        const teamDetails = await fetchTeamDetails(id);
        setTeam(teamDetails.data);
        
        const teamMatches = await fetchTeamMatches(id);
        setMatches(teamMatches.data.matches);
        
        setError(null);
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setError('Не удалось загрузить данные команды.');
      } finally {
        setLoading(false);
      }
    };

    loadTeamDetails();
  }, [id]);

  const leagueName = standings?.competition?.name;

  return (
    <>
      <Breadcrumbs currentLeague={leagueName} onBack={onBack} />
      {loading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <h1>{team.name}</h1>
          <img src={team.crest} alt={team.name} />
          <h2>Матчи:</h2>
          <ul>
            {matches.map((match) => (
              <li key={match.id}>
                {match.utcDate}: {match.homeTeam.name} vs {match.awayTeam.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
