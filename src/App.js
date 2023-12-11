import './App.css';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="">
      <Home />
      <Dashboard />
    </div>
  );
}

export default App;
