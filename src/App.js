import { Login } from "./Components/LoginSignUp/Login";
import { Home, ClientHome, ContractorHome } from "./HomePage/Home"
import { Navbar } from "./Components/Navbar/Navbar";
import { Signup } from "./Components/LoginSignUp/Signup";
import {About} from './Components/BlurbPages/About'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {WorkOrders} from './Components/contractors/WorkOrders';



function App() {
  const [userRole, setUserRole] = useState('');

  useEffect(()=> {
    const role = localStorage.getItem('role');
    setUserRole(role);
  },[]);

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
              <About />
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
              <About />
            </Route>
            <Route path='/orders'>
              <WorkOrders />
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
              <About />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>)
  }
}

export default App;
