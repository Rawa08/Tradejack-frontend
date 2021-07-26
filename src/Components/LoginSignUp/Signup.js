import React from 'react';
import { SignupFormClient } from './SignupFormClient';
import { SignupFormContractor } from './SignupFormContractor';
import './Signup.css'
import { useState } from 'react';

export const Signup = ({ togglePopup }) => {
  const [roleState, setRoleState] = useState('client');

  const toggleState = () => {
    const newState = roleState === 'client' ? 'contractor' : 'client';
    setRoleState(newState);
  }

  return (
    <div>
      <label className="switch">
        <input type="checkbox" onChange={toggleState} />
        <span className="slider round"></span>
      </label>
      <h4>{roleState === 'client' ? 'Client' : 'Contractor'} Sign Up</h4>
      {roleState === 'client' ? <SignupFormClient togglePopup={togglePopup} />
        : <SignupFormContractor togglePopup={togglePopup} />}
    </div>
  )
}