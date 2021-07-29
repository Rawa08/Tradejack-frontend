import React from 'react';
import { LoginForm } from './LoginForm';
import './Login.css'
import { useState } from 'react';
import Popup from '../Popup/Popup';
import { Signup } from './Signup';

export const Login = ({setUserRole}) => {
  const [roleState, setRoleState] = useState('client');
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
}

  return (
    <div className='formthing'>
      <div className='form__login'>

        {/* <label className="switch">
          <input type="checkbox" onChange={toggleState}/>
            <span className="slider round"></span>

          </label> */}

          <h4>{roleState === 'client' ? 'Client' : 'Contractor'} Log in</h4>
          <LoginForm roleState={roleState} setUserRole={setUserRole}/>
          {isOpen && <Popup content={<Signup togglePopup={togglePopup} />} togglePopup={togglePopup} />}

          {roleState === 'client' ? <button className='signbtn' onClick={()=>setRoleState('contractor')}>Sign in as Contractor</button>
          : <button className='signbtn' onClick={()=>setRoleState('client')}>Sign in as Client</button>}
          <input
                  type="button"
                  value="Sign up!"
                  onClick={togglePopup}
                  className='SignUp'
              />
      </div>
    </div>
      )
}