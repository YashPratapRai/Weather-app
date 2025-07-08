import './App.css';
import WeatherPage from './pages/WeatherPage';

function App() {
  return (
    <>
      {/* Weather background elements */}
      <div className="sun"></div>
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
      {/* Main app container */}
      <div className="App">
        <WeatherPage />
      </div>
      {/* Footer */}
      <footer className="footer">
        This project is proudly deployed by <b>Yash Pratap Rai.</b>
      </footer>
    </>
  );
}

export default App;