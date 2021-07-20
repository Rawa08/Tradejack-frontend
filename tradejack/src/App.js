import { Login } from "./Components/LoginSignUp/Login";
import { Home, ClientHome, ContractorHome } from "./HomePage/Home"
import { Navbar } from "./Components/Navbar/Navbar";
import { Signup } from "./Components/LoginSignUp/Signup";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [userRole, setUserRole] = useState('');

  if (!userRole) {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar userRole={userRole}/>
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/login'>
              <Login setUserRole={setUserRole} />
            </Route>
            <Route path='/join'>
              <Signup />
            </Route>
            <Route path='/about'>
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

  if (userRole === 'client') {
    return (
      <div className="App">
        <BrowserRouter>
        <Navbar userRole={userRole} setUserRole={setUserRole}/>
          <Switch>
            <Route path='/'exact>
              <ClientHome />
            </Route >
            <Route path='/about'>
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>)
  }

  if (userRole === 'contractor') {
    return (
      <div className="App">
        <BrowserRouter>
        <Navbar userRole={userRole} setUserRole={setUserRole}/>
          <Switch>
            <Route path='/' exact >
              <ContractorHome />
            </Route>
            <Route path='/about'>
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>)
  }
}

export default App;
