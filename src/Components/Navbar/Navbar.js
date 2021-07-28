import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';

export const Navbar = ({userRole, setUserRole}) => {
  const history = useHistory()

  const logOut = () => {
    setUserRole('')
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    history.push('/')
  }
 const isBootActive = true

 if(!isBootActive){
  return (
    <nav className='nav'>
         <Link  to='/' className="nav__link"><h1>TradeJack</h1> </Link>
      <ul className='nav__list'>
        <li className='nav__point'>
          <Link to='/' className="nav__link">Home</Link>
        </li>
        {!userRole && <li className='nav__point'>
          <Link to='/login' className="nav__link">Login</Link>
        </li>}
        {!userRole && <li className='nav__point'>
          <Link to='/join' className="nav__link">Sign up</Link>
        </li>}
        {userRole && <li className='nav__point'>
          <Link to='/orders' className="nav__link">Work Orders</Link>
        </li>}
        <li className='nav__point'>
          <Link to='/about' className="nav__link">About</Link>
        </li>
        <li className='nav__point'>
          <Link to='/contact' className="nav__link">Contact</Link>
        </li>
        <div className='nav__logout'>
        {userRole && <li className='nav__point'>
          <p onClick={logOut}>LogOut</p>
        </li>}
        </div>
      </ul>
    </nav>
  )
 } else {

  return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav">
    <div className='navbar__mobile'>
    <Link  to='/' className="nav__link"><h1>TradeJack</h1> </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    </div>
    <div className="collapse navbar-collapse  nav__list" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto  nav__list__ul">
      <li className='nav__point nav-item'>
          <Link to='/' className="nav__link">Home</Link>
        </li>
        {userRole === 'client' && <li className='nav__point nav-item'>
          <Link to='/orders' className="nav-link nav__link">Work Orders</Link>
        </li>}
        {userRole === 'contractor' && <li className='nav__point nav-item'>
          <Link to='/myorders' className="nav-link nav__link">My offeres</Link>
        </li>}
        <li className='nav__point'>
          <Link to='/about' className="nav-link nav__link nav-item">About</Link>
        </li>
        <li className='nav__point'>
          <Link to='/contact' className="nav-link nav__link nav-item">Contact</Link>
        </li>
        <div className='nav__logout'>
        {!userRole && <li className='nav__point nav-item'>
          <Link to='/login' className=" nav__link nav-link">Login/SignUp</Link>
        </li>}
        </div>
        <div className='nav__logout'>
        {userRole && <li className='nav__point'>
          <p onClick={logOut}>LogOut</p>
        </li>}
        </div>
      </ul>
    </div>
  </nav>
  )

 }
}
