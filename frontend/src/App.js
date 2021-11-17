import './App.css';
import Formulary from './components/Formulary';
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App">
      <Routes>
        <Route exact path="/authenticate" element={<Formulary/>}/>
        <Route exact path="/" element={<Home/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
