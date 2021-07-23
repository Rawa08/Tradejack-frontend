import React from 'react';
import { LoginForm } from './LoginForm';
import './Login.css'
import { useState } from 'react';

export const Login = ({setUserRole}) => {
  const [roleState, setRoleState] = useState('client');

  const toggleState = () => {
    const newState = roleState === 'client' ? 'contractor' : 'client';
    setRoleState(newState);
  }

  return (
    <div className='form__login'>
      <label className="switch">
        <input type="checkbox" onChange={toggleState}/>
          <span className="slider round"></span>
        </label>
        <h4>{roleState === 'client' ? 'Client' : 'Contractor'} Log in</h4>
        <LoginForm roleState={roleState} setUserRole={setUserRole}/>
    </div>
      )
}