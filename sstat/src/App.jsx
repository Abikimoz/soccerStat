import 'bootstrap/dist/css/bootstrap.min.css';

import Navbars from './components/Navbars';
import SearchBar from './components/SearchBar'; // Import компонента SearchBar

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
