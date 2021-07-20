import { useState } from "react";
import { useHistory } from "react-router-dom";


export const SignupFormClient = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('')

  const signUpfetch = async (roleState, username, password) => {
    const loged = await fetch(`http://localhost:3000/api/users/clients`,{
      method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
    return loged
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const status = await signUpfetch();
    const data = await status.json();
    if(data.role) {
      localStorage.setItem('accessToken',data.accessToken);
      history.push('/login');
    } else {
      setError(data.message);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  }

  return(
    <form onSubmit={handleSubmit}>
      {error && <h3>{error}</h3>}
      <label htmlFor="usernameInput">Username:
        <input type="text" name="usernameInput" value={usernameSt}
        onChange={e=> setUsername(e.target.value)}/>
      </label>
      <label htmlFor="passwordInput">Password:
        <input type="password" name="passwordInput" value={passwordSt}
        onChange={e=> setPassword(e.target.value)}/>
      </label>
      <input type="submit"></input>
    </form>
  )
}