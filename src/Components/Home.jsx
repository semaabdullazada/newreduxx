import React from 'react'
import { HashRouter as Routes, Route, Link, NavLink } from 'react-router-dom';
import './Home.css';
import Watch from './Watch';
import Stopwatch from './Stopwatch';
import Timer from './Timer';
const Home = () => {
  return (
    <div>
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
  )
}

export default Home
