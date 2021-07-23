import { useState } from "react";
import { useHistory } from "react-router-dom";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';


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
      setUserRole(data.role);
      localStorage.setItem('accessToken',data.accessToken);
      localStorage.setItem('role',data.role);
      history.push('/');
    } else {
      setError(data.message);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  }

  return(
      <form onSubmit={handleSubmit} className="loginForm">
        {error && <h3>{error}</h3>}
        <label htmlFor="usernameInput"><PersonIcon color="disabled" />
          <input type="text" name="usernameInput" value={usernameSt}
          className='input-field'
          onChange={e=> setUsername(e.target.value)} required placeholder="Username"/>
        </label>
        <label htmlFor="passwordInput"><VpnKeyIcon color="disabled"/>
          <input type="password" name="passwordInput" value={passwordSt}
          className='input-field'
          onChange={e=> setPassword(e.target.value)} required placeholder="Password"/>
        </label>
        <p></p>
        <input className='ninja-button' type="submit"></input>
      </form>
  )
}