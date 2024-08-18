import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Navbars } from './components/Navbars';
import { LeaguesPage } from './pages/LeaguesPage';
import { LeagueStandingsPage } from './pages/LeagueStandingsPage';
import { TeamsPage } from './pages/TeamsPage'; // Импорт страницы команд
import { TeamDetailsPage } from './pages/TeamDetailsPage'; // Импорт страницы деталей команды
import { Layout } from './components/Layout';

function App() {
  const [selectedLeague, setSelectedLeague] = useState(null);

  const handleLeagueSelect = (league) => {
    setSelectedLeague(league);
  };

  const handleBack = () => {
    setSelectedLeague(null);
  };

  return (
    <Router>
      <div className="App">
        <header id="navbar">
          <Navbars />
        </header>
        <main className="container">
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/league" replace />} />
              <Route
                path="/league"
                element={
                  <LeaguesPage
                    onLeagueSelect={handleLeagueSelect}
                    selectedLeague={selectedLeague}
                    onBack={handleBack}
                  />
                }
              />
              <Route
                path="/league/:id"
                element={<LeagueStandingsPage onBack={handleBack} />}
              />
              <Route path="/teams" element={<TeamsPage />} /> {/* Новый маршрут для TeamsPage */}
              <Route path="/team/:id" element={<TeamDetailsPage />} /> {/* Новый маршрут для TeamDetailsPage */}
            </Routes>
          </Layout>
        </main>
      </div>
    </Router>
  );
}

export default App;
