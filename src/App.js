import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

document.addEventListener('DOMContentLoaded', function() {
  // Send a GET request to the URL
  fetch('https://api.nasa.gov/planetary/apod?api_key=RxdvkBaLfpVSPVF3Q9dYOepXvuBL3LhUeWD1eibG')
  // Put response into json form
  .then(response => response.json())
  .then(data => {
      // Log data to the console
      console.log(data);
  });
});

export default App;
