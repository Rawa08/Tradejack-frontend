import { useState } from "react";
import { useHistory } from "react-router-dom";
import './SignupForm.css'

export const SignupFormClient = ({ togglePopup }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordRepeat: '',
    f_name: '',
    l_name: '',
    email: '',
    phone_num: '',
    street: '',
    postal_code: '',
    city: ''

  });
  const [error, setError] = useState('')

  const signUpfetch = async (credentials) => {
    const loged = await fetch(`http://localhost:3000/api/users/clients`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    return loged
  }
  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.password !== formData.passwordRepeat) {
      setError('Your two passwords must match')
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }
    const status = await signUpfetch(formData);
    const data = await status.json();
    if (data.message) {
      setError('Bad luck, Username Already Taken, please choose a new one')
      return;
    }
    else {
      setFormData({
        username: '',
        password: '',
        passwordRepeat: '',
        f_name: '',
        l_name: '',
        email: '',
        phone_num: '',
        street: '',
        postal_code: '',
        city: ''
      })
      togglePopup();
      return history.push('/login');
    }

  }
  return (
    <form onSubmit={handleSubmit} className='form__client'>
      {error && <h3>{error}</h3>}
      <input type="text" name="usernameInput" value={formData.username} required
        className='signup__input' placeholder='username' onChange={e => setFormData(prevstate => ({ ...prevstate, username: e.target.value }))} />
      <input type="text" name="fNameInput" value={formData.f_name} required
        className='signup__input' placeholder='First Name' onChange={e => setFormData(prevstate => ({ ...prevstate, f_name: e.target.value }))} />
      <input type="text" name="lNameInput" value={formData.l_name} required
        className='signup__input' placeholder='Last Name' onChange={e => setFormData(prevstate => ({ ...prevstate, l_name: e.target.value }))} />
      <input type="email" name="emailInput" value={formData.email} required
        className='signup__input' placeholder='Email' onChange={e => setFormData(prevstate => ({ ...prevstate, email: e.target.value }))} />
      <input type="tel" name="phoneNumInput" value={formData.phone_num} required
        className='signup__input' placeholder='Phone Number' onChange={e => setFormData(prevstate => ({ ...prevstate, phone_num: e.target.value }))} />
      <h4>Adress:</h4>
      <input type="text" name="streetInput" value={formData.street} required
        className='signup__input' placeholder='Street' onChange={e => setFormData(prevstate => ({ ...prevstate, street: e.target.value }))} />
      <input type="number" name="postalcodeInput" value={formData.postal_code} required
        className='signup__input' placeholder='Postal Code' onChange={e => setFormData(prevstate => ({ ...prevstate, postal_code: e.target.value }))} />
      <input type="text" name="cityInput" value={formData.city} required
        className='signup__input' placeholder='City' onChange={e => setFormData(prevstate => ({ ...prevstate, city: e.target.value }))} />
      <input type="password" name="passwordInput" value={formData.password} required
        className='signup__input' placeholder='Password' onChange={e => setFormData(prevstate => ({ ...prevstate, password: e.target.value }))} />
      <input type="password" name="passwordRepeatInput" value={formData.passwordRepeat} required
        className='signup__input' placeholder='Retype Password' onChange={e => setFormData(prevstate => ({ ...prevstate, passwordRepeat: e.target.value }))} />
      <input type="submit" value='Create User'></input>
    </form>
  )
}
