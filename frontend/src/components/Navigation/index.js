import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import logo from './solo-project-2-logo.png'

function Navigation({ isLoaded }){
  const [searchTerm, setSearchTerm] = useState('');
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div id='modal-links'>
          <LoginFormModal />
          <SignupFormModal />
        </div>
      </>
    );
  }

  function handleSearch(event) {
    event.preventDefault();
  }

  return (
    <ul id='navbar'>
      <li >
        <NavLink exact to="/"><img src={logo} alt={logo} id='logo'/></NavLink>
      </li>
      <div id='search-bar'>
        <form onSubmit={handleSearch} id='search-bar'>
          <input type='search' 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)} 
          placeholder='Search...'
          id='search-bar-input'
          />
          <button id='submit-search-button' type='submit'><i className="fa fa-search icon" id='search-icon' aria-hidden="true"></i></button>
        </form>
      </div>
      <div id='not-home-links'>
        {isLoaded && sessionLinks}
      </div>
    </ul>
  );
}

export default Navigation;