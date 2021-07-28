import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InfoIcon from '@material-ui/icons/Info';
import './NavbarFooter.css'

const NavbarFooter = ({userRole, setUserRole}) => {
  const history = useHistory()

  const logOut = () => {
    setUserRole('')
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    history.push('/')
  }

  if(!userRole){
    return (
      <footer>
        <div className='footer-container'>
          <Link to='/' className="nav__link">
            <HomeIcon className='footer-icon' fontSize="large"/>
          </Link>
        </div>
        <div className='footer-container'>
          <Link to='/about' className="nav-link nav__link">
            <InfoIcon className='footer-icon' fontSize="large"/>
          </Link>
        </div>
        <div className='footer-container'>
        <Link to='/contact' className="nav-link nav__link">
            <MailOutlineIcon className='footer-icon' fontSize="large"/>
        </Link>
        </div>
        <div className='footer-container'>
          {userRole
          ? <ExitToAppIcon onClick={logOut} className='footer-icon' fontSize="large"/>
          : <Link to='/login' className="nav__link">
              <AccountCircleIcon className='footer-icon' fontSize="large"/>
             </Link>}

        </div>
      </footer>
    )
  }
  if(userRole === 'contractor'){
    return (
      <footer>
        <div className='footer-container'>
          <Link to='/' className="nav__link">
            <HomeIcon className='footer-icon' fontSize="large"/>
          </Link>
        </div>
        <div className='footer-container'>
          <Link to='/myorders' className="nav-link nav__link">
            <WebAssetIcon className='footer-icon' fontSize="large"/>
          </Link>
        </div>
        <div className='footer-container'>
        <Link to='/chats' className="nav-link nav__link">
            <MailOutlineIcon className='footer-icon' fontSize="large"/>
        </Link>
        </div>
        <div className='footer-container'>
          {userRole
          ? <ExitToAppIcon onClick={logOut} className='footer-icon' fontSize="large"/>
          : <Link to='/login' className="nav__link">
              <AccountCircleIcon className='footer-icon' fontSize="large"/>
             </Link>}

        </div>
      </footer>
    )
  }
  if(userRole === 'client'){
    return (
      <footer>
        <div  className='footer-container'>
          <Link to='/' className="nav__link">
            <HomeIcon className='footer-icon' fontSize="large"/>
          </Link>
        </div>
        <div className='footer-container'>
          <Link to='/about' className="nav-link nav__link">
            <InfoIcon className='footer-icon' fontSize="large"/>
          </Link>
        </div>
        <div className='footer-container'>
        <Link to='/chats' className="nav-link nav__link">
            <MailOutlineIcon className='footer-icon' fontSize="large"/>
        </Link>
        </div>
        <div className='footer-container'>
          {userRole
          ? <ExitToAppIcon onClick={logOut} className='footer-icon' fontSize="large"/>
          : <Link to='/login' className="nav__link">
              <AccountCircleIcon className='footer-icon' fontSize="large"/>
             </Link>}
        </div>
      </footer>
    )
  }
}

export default NavbarFooter
