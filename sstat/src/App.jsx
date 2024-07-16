import 'bootstrap/dist/css/bootstrap.min.css';

import Navbars from './components/navbars';
import SearchBar from './components/searchBar'; // Import компонента SearchBar

function App() {
  return (
    <div className="App">
      <header id="navbar">
        <Navbars />
      </header>
      <SearchBar />
    </div>
  );
}

export default App;
