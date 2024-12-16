import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
      <h1>Əsas Səhifə</h1>
      <div className='menu'>
        <NavLink className='menus' to='/watch'>Saat</NavLink>
        <NavLink className='menus' to='/stopwatch'>Saniyəölçən</NavLink>
        <NavLink className='menus' to='/timer'>Taymer</NavLink>
      </div>
    </div>
  );
};

export default Home;
