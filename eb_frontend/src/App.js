import './css/App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Protector from "./protector";

function App() {
  return (
    <Router>
      <div className="App">
        <Protector />
      </div>
    </Router>
  );
}

export default App;
