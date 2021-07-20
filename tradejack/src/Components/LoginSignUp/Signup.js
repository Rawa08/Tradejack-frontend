import React from 'react';
import { LoginForm } from './LoginForm';
import './Signup.css'
import { useState } from 'react';

export const Signup = () => {
  const [roleState, setRoleState] = useState('client');

  const toggleState = () => {
    const newState = roleState === 'client' ? 'contractor' : 'client';
    setRoleState(newState);
  }

  return (
    <div>
      <label className="switch">
        <input type="checkbox" onChange={toggleState}/>
          <span className="slider round"></span>
        </label>
        <h4>{roleState} Sign Up</h4>
        {roleState === 'client' ? <SignupFormClient />
          : <SignupFormContractor/> }
    </div>
      )
}