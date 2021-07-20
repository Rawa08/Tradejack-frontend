import { useState } from "react";
import { useHistory } from "react-router-dom";
import './clientSign.css'

export const SignupFormClient = () => {
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
    if(data.message){
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
    return history.push('/login');}

  }
  return (
    <form onSubmit={handleSubmit} className='form__client'>
      {error && <h3>{error}</h3>}
      <label htmlFor="usernameInput">Username:
        <input type="text" name="usernameInput" value={formData.username} required
          onChange={e => setFormData(prevstate => ({ ...prevstate, username: e.target.value }))} />
      </label>
      <label htmlFor="fNameInput">First Name:
        <input type="text" name="fNameInput" value={formData.f_name} required
          onChange={e => setFormData(prevstate => ({ ...prevstate, f_name: e.target.value }))} />
      </label>
      <label htmlFor="lNameInput">Last Name:
        <input type="text" name="lNameInput" value={formData.l_name} required
          onChange={e => setFormData(prevstate => ({ ...prevstate, l_name: e.target.value }))} />
      </label>
      <label htmlFor="emailInput">Email:
        <input type="email" name="emailInput" value={formData.email} required
          onChange={e => setFormData(prevstate => ({ ...prevstate, email: e.target.value }))} />
      </label>
      <label htmlFor="phoneNumInput">Phone Number:
        <input type="tel" name="phoneNumInput" value={formData.phone_num} required
          onChange={e => setFormData(prevstate => ({ ...prevstate, phone_num: e.target.value }))} />
      </label>
      <h4>Adress:</h4>
      <label htmlFor="streetInput">Street:
        <input type="text" name="streetInput" value={formData.street} required
          onChange={e => setFormData(prevstate => ({ ...prevstate, street: e.target.value }))} />
      </label>
      <label htmlFor="postalcodeInput">Postal Code:
        <input type="number" name="postalcodeInput" value={formData.postal_code} required
          onChange={e => setFormData(prevstate => ({ ...prevstate, postal_code: e.target.value }))} />
      </label>
      <label htmlFor="cityInput">City:
        <input type="text" name="cityInput" value={formData.city} required
          onChange={e => setFormData(prevstate => ({ ...prevstate, city: e.target.value }))} />
      </label>
      <label htmlFor="passwordInput">Password:
        <input type="password" name="passwordInput" value={formData.password} required
          onChange={e => setFormData(prevstate => ({ ...prevstate, password: e.target.value }))} />
      </label>
      <label htmlFor="passwordRepeatInput">Repeat Password:
        <input type="password" name="passwordRepeatInput" value={formData.passwordRepeat} required
          onChange={e => setFormData(prevstate => ({ ...prevstate, passwordRepeat: e.target.value }))} />
      </label>
      <input type="submit"></input>
    </form>
  )
}
