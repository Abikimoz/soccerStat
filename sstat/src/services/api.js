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

export const fetchTeams = () => {
  return axios.get('/api/v4/teams', { // Используйте правильный маршрут
    headers: {
      'X-Auth-Token': apiKey,
    },
  });
};

export const fetchTeamDetails = (teamId) => {
  return axios.get(`/api/v4/teams/${teamId}`, { // Используйте правильный маршрут для команды
    headers: {
      'X-Auth-Token': apiKey,
    },
  });
};

export const fetchTeamMatches = (teamId) => {
  return axios.get(`/api/v4/teams/${teamId}/matches`, { // Используйте правильный маршрут для матчей команды
    headers: {
      'X-Auth-Token': apiKey,
    },
  });
};
