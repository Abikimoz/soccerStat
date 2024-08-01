import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'; 
import { Navbars }  from './components/Navbars';
import { LeaguesPage } from './pages/LeaguesPage';
import { LeagueStandingsPage } from './pages/LeagueStandingsPage';
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
    <div className="App">
      <header id="navbar">
        <Navbars />
      </header>
      <main className="container">
        <Layout>
          {!selectedLeague ? (
            <LeaguesPage 
              onLeagueSelect={handleLeagueSelect} 
              selectedLeague={selectedLeague} 
              onBack={handleBack} 
            />
          ) : (
            <LeagueStandingsPage 
              league={selectedLeague} 
              onBack={handleBack} 
            />
          )}
        </Layout>
      </main>
    </div>
  );
}

export default App;
