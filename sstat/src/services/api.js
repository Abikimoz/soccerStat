import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

// Функция для получения лиг
export const fetchLeagues = () => {
  return axios.get('/api/v4/competitions', {
    headers: {
      'X-Auth-Token': apiKey
    }
  });
};

// Функция для получения календаря
export const fetchStandings = (leagueId) => {
  return axios.get(`/api/v4/competitions/${leagueId}/standings`, {
    headers: {
      'X-Auth-Token': apiKey
    }
  });
};
