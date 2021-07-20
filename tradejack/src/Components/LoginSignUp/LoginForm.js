import { useState } from "react";
import { useHistory } from "react-router-dom";


export const LoginForm = ({roleState, setUserRole}) => {
  const history = useHistory();
  const [usernameSt, setUsername] = useState('');
  const [passwordSt, setPassword] = useState('');
  const [error, setError] = useState('')

  const loginfetch = async (roleState, username, password) => {
    const endpoint = roleState === 'client' ? '/clients/login'
      : '/contractors/login';
    const credentials = {username, password};
    console.log(JSON.stringify(credentials))
    const loged = await fetch(`http://localhost:3000/api/users${endpoint}`,{
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
    console.log(usernameSt, passwordSt)
    const status = await loginfetch(roleState, usernameSt, passwordSt);
    const data = await status.json();
    setUsername('');
    setPassword('');
    if(data.role) {
      localStorage.setItem('accessToken',data.accessToken);
      setUserRole(data.role);
      history.push('/home');
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