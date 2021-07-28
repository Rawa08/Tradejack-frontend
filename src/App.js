import { Login } from "./Components/LoginSignUp/Login";
import { Home, ClientHome, ContractorHome } from "./HomePage/Home"
import { Navbar } from "./Components/Navbar/Navbar";
import NavbarFooter from "./Components/Navbar/NavbarFooter";
import { Signup } from "./Components/LoginSignUp/Signup";
import {About} from './Components/BlurbPages/About'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {WorkOrders} from './Components/contractors/WorkOrders';
import {WorkOrdersAssigned} from './Components/contractors/WorkOrdersAssigned'
import Order from './Components/order/Order'
import ChatHolder from './Components/Chats/ChatHolder';


function App() {
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');
  useEffect(()=> {
    const role = localStorage.getItem('role');
    setUserRole(role);
    const username = localStorage.getItem('username');
    setUsername(username);
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
            <Route path='/order/:id'>
              <Order />
            </Route>
          </Switch>
          <NavbarFooter />
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
            <Route path='/order/:id'>
              <Order />
            </Route>
            <Route path='/chats'>
              <ChatHolder username={username} />
            </Route>
          </Switch>
          <NavbarFooter userRole={userRole} setUserRole={setUserRole}/>
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
            <Route path='/myorders' exact >
              <WorkOrdersAssigned />
            </Route>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/order/:id'>
              <Order />
            </Route>
            <Route path='/chats'>
              <ChatHolder username={username} />
            </Route>
          </Switch>
          <NavbarFooter userRole={userRole} setUserRole={setUserRole}/>
        </BrowserRouter>
      </div>)
  }
}

export default App;
