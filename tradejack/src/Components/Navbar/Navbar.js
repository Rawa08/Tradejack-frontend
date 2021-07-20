import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css'

export const Navbar = ({userRole, setUserRole}) => {
  const history = useHistory()

  const logOut = () => {
    setUserRole('');
    localStorage.removeItem('accessToken');
    history.push('/')
  }

  return (
    <nav className='nav'>
         <h1>Tradejack</h1>
      <ul className='nav__list'>
        <li className='nav__point'>
          <Link to='/'>Home</Link>
        </li>
        {!userRole && <li className='nav__point'>
          <Link to='/login'>Login</Link>
        </li>}
        {!userRole && <li className='nav__point'>
          <Link to='/join'>Sign up</Link>
        </li>}
        <li className='nav__point'>
          <Link to='/about'>About</Link>
        </li>
        <li className='nav__point'>
          <Link to='/contact'>Contact</Link>
        </li>
        {userRole && <li className='nav__point'>
          <button onClick={logOut}>LogOut</button>
        </li>}
      </ul>
    </nav>
  )
}
