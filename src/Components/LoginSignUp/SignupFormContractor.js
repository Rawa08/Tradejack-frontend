import { useState } from "react";
import { useHistory } from "react-router-dom";

export const SignupFormContractor = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username:'',
    orgnumber:'',
    companyname:'',
    password:'',
    fName:'',
    lName:'',
    email:'',
    phonenum:'',
    street:'',
    postalcode:'',
    city:'',
    passwordRepeat:''
  });
  const [error, setError] = useState('')

  const signUpfetch = async (credentials) => {
    const loged = await fetch(`http://localhost:3000/api/users/contractors`,{
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
    const answer = await signUpfetch(formData);
    const data = await answer.json();
    if (data.message) {
      setError('Username Already Taken');
      setTimeout(() => {
        setError('Username Already Taken');
      }, 2000);
      return;
    }
      setFormData({
        username:'',
        orgnumber:'',
        companyname:'',
        password:'',
        fName:'',
        lName:'',
        email:'',
        phonenum:'',
        street:'',
        postalcode:'',
        city:'',
        passwordRepeat:''
      })
     return history.push('/login');
  }


  return(
    <form onSubmit={handleSubmit} className='form__client'>
      {error && <h3>{error}</h3>}
      <label htmlFor="usernameInput">Username:
        <input type="text" name="usernameInput" value={formData.username} required
        onChange={e=> setFormData(prevstate => ({...prevstate, username:e.target.value}))}/>
      </label>
      <label htmlFor="orgNumberInput">Org Number:
        <input type="text" name="orgNumberInput" value={formData.orgnumber} required
        onChange={e=> setFormData(prevstate => ({...prevstate, orgnumber:e.target.value}))}/>
      </label>
      <label htmlFor="companynameInput">Company Name:
        <input type="text" name="companynameInput" value={formData.companyname} required
        onChange={e=> setFormData(prevstate => ({...prevstate, companyname:e.target.value}))}/>
      </label>
      <label htmlFor="fNameInput">First Name:
        <input type="text" name="fNameInput" value={formData.fName} required
        onChange={e=> setFormData(prevstate => ({...prevstate, fName:e.target.value}))}/>
      </label>
      <label htmlFor="lNameInput">Last Name:
        <input type="text" name="lNameInput" value={formData.lName} required
        onChange={e=> setFormData(prevstate => ({...prevstate, lName:e.target.value}))}/>
      </label>
      <label htmlFor="emailInput">Email:
        <input type="text" name="emailInput" value={formData.email} required
        onChange={e=> setFormData(prevstate => ({...prevstate, email:e.target.value}))}/>
      </label>
      <label htmlFor="phoneNumInput">Phone Number:
        <input type="tel" name="phoneNumInput" value={formData.phonenum} required
        onChange={e=> setFormData(prevstate => ({...prevstate, phonenum:e.target.value}))}/>
      </label>
      <h4>Adress:</h4>
      <label htmlFor="streetInput">Street:
        <input type="text" name="streetInput" value={formData.street} required
        onChange={e=> setFormData(prevstate => ({...prevstate, street:e.target.value}))}/>
      </label>
      <label htmlFor="postalcodeInput">Postal Code:
        <input type="number" name="postalcodeInput" value={formData.postalcode} required
        onChange={e=> setFormData(prevstate => ({...prevstate, postalcode:e.target.value}))}/>
      </label>
      <label htmlFor="cityInput">City:
        <input type="text" name="cityInput" value={formData.city} required
        onChange={e=> setFormData(prevstate => ({...prevstate, city:e.target.value}))}/>
      </label>
      <label htmlFor="passwordInput">Password:
        <input type="password" name="passwordInput" value={formData.password} required
        onChange={e=> setFormData(prevstate => ({...prevstate, password:e.target.value}))}/>
      </label>
      <label htmlFor="passwordRepeatInput">Repeat Password:
        <input type="password" name="passwordRepeatInput" value={formData.passwordRepeat} required
        onChange={e=> setFormData(prevstate => ({...prevstate, passwordRepeat:e.target.value}))}/>
      </label>
      <input type="submit"></input>
    </form>
  )
}
