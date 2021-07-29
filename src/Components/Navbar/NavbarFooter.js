import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InfoIcon from '@material-ui/icons/Info';
import './NavbarFooter.css'

const NavbarFooter = ({ userRole, setUserRole }) => {
  const history = useHistory()
  const [active, setActive] = useState(false);
  const logOut = () => {
    setUserRole('')
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    history.push('/')
  }

  if (!userRole) {
    return (
      <footer>
        <div className='footer-container'>
          <Link to='/' className="nav__link">
            <div className='footer__info'>
              <HomeIcon className='footer-icon' fontSize="large" />
              <p className='icon__text'>Home</p>
            </div>
          </Link>
        </div>
        <div className='footer-container'>
          <Link to='/about' className="nav-link nav__link">
            <div className='footer__info'><InfoIcon className='footer-icon' fontSize="large" />
              <p className='icon__text'>About</p>
            </div>
          </Link>
        </div>
        <div className='footer-container'>
          <Link to='/contact' className="nav-link nav__link">
            <div className='footer__info'>
              <MailOutlineIcon className='footer-icon' fontSize="large" />
              <p className='icon__text'>Contact us</p>
            </div>
          </Link>
        </div>
        <div className='footer-container'>
          <Link to='/login' className="nav__link">
            <div className='footer__info'>
              <AccountCircleIcon className='footer-icon' fontSize="large" />
              <p className='icon__text'>Login</p>
            </div>
          </Link>
        </div>
      </footer>
    )
  }
  if (userRole === 'contractor') {
    return (
      <footer>
        <div className='footer-container'>
          <Link to='/' className="nav__link">
            <div className='footer__info'>
              <HomeIcon className='footer-icon' fontSize="large" />
              <p className='icon__text'>W. Orders</p>
            </div>
          </Link>
        </div>
        <div className='footer-container'>
          <Link to='/myorders' className="nav-link nav__link">
            <div className='footer__info'>
              <WebAssetIcon className='footer-icon' fontSize="large" />
              <p className='icon__text'>My Orders</p>
            </div>
          </Link>
        </div>
        <div className='footer-container'>

          <Link to='/chats' className="nav-link nav__link" onClick={e => setActive(true)}>
            <div className='footer__info'>
              {active ? <MailOutlineIcon className='footer-icon' fontSize="large" /> : <MailOutlineIcon className='footer-icon chat-icon' fontSize="large" />}
              <p className='icon__text'>Chat</p>
            </div>
          </Link>
        </div>
        <div className='footer-container'>
          <div className='footer__info'>
            <ExitToAppIcon onClick={logOut} className='footer-icon' fontSize="large" />
            <p className='icon__text'>LogOut</p>
          </div>
        </div>
      </footer>
    )
  }
  if (userRole === 'client') {
    return (
      <footer>
        <div className='footer-container'>
          <Link to='/' className="nav__link">
            <div className='footer__info'>
              <HomeIcon className='footer-icon' fontSize="large" />
              <p className='icon__text'>My orders</p>
            </div>
          </Link>
        </div>
        <div className='footer-container'>
          <Link to='/about' className="nav-link nav__link">
            <div className='footer__info'>
              <InfoIcon className='footer-icon' fontSize="large" />
              <p className='icon__text'>About</p>
            </div>
          </Link>
        </div>
        <div className='footer-container'>
            <Link to='/chats' className="nav-link nav__link" onClick={e => setActive(true)}>
              <div className='footer__info'>
                {active ? <MailOutlineIcon className='footer-icon' fontSize="large" /> : <MailOutlineIcon className='footer-icon chat-icon' fontSize="large" />}
                <p className='icon__text'>Chats</p>
              </div>
            </Link>
          </div>
          <div className='footer-container'>
            <div className='footer__info'>
              <ExitToAppIcon onClick={logOut} className='footer-icon' fontSize="large" />
              <p className='icon__text'>LogOut</p>
            </div>
          </div>
      </footer>
        )
  }
}

export default NavbarFooter
