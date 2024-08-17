import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

export const fetchLeagues = () => {
  return axios.get('/api/v4/competitions', {
    headers: {
      'X-Auth-Token': apiKey,
    },
  });
};

export const fetchStandings = (leagueId, dateFrom, dateTo) => {
  // Создаем строку параметров запроса для фильтрации по дате
  const params = {
    dateFrom,
    dateTo,
  };

  return axios.get(`/api/v4/competitions/${leagueId}/matches`, {
    headers: {
      'X-Auth-Token': apiKey,
    },
    params, // передаем параметры в запрос
  });
};
