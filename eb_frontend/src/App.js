import './css/App.css';
import {Routes, Route} from "react-router";
import {BrowserRouter as Router} from 'react-router-dom'
import MainView from "./views/main";
import BookView from "./views/book";
import LoginView from "./views/login";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/book" element={<BookView />} />
          <Route path="/" element={<MainView />} />
          {/*<Route path="/*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
