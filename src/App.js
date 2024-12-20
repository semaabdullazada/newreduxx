import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Watch from './Components/Watch';
import Stopwatch from './Components/Stopwatch';
import Timer from './Components/Timer';
import Home from './Components/Home';

function App() {
  return (
      <div className="App">
        <div className='menu'>
          <NavLink className='menus' to='/watch'>Saat</NavLink>
          <NavLink className='menus' to='/stopwatch'>Saniyəölçən</NavLink>
          <NavLink className='menus' to='/timer'>Taymer</NavLink>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/watch' element={<Watch />} />
          <Route path='/stopwatch' element={<Stopwatch />} />
          <Route path='/timer' element={<Timer />} />
        </Routes>
      </div>
  );
}

export default App;
