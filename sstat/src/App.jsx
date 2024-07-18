import 'bootstrap/dist/css/bootstrap.min.css';

import Navbars from './components/Navbars';
import SearchBar from './components/SearchBar';
import Leagues from './components/Leagues';

function App() {
  return (
    <div className="App">
      <header id="navbar">
        <Navbars />
      </header>
      <main>
        <SearchBar />
        <Leagues />
      </main>
    </div>
  );
}

export default App;
