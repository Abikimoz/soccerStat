import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

export const fetchLeagues = () => {
  return axios.get('/api/v4/competitions', {
    headers: {
      'X-Auth-Token': apiKey,
    },
  });
};

export const fetchStandings = (leagueId) => {
  return axios.get(`/api/v4/competitions/${leagueId}/matches`, {
    headers: {
      'X-Auth-Token': apiKey,
    },
  });
};
