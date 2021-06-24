import React from 'react';
import Home from './components/home/Home'
import NavBar from './components/navbar/Navbar'
import UserTable from './components/users/UserLevelTable'
import MemberTable from './components/member/MemberTable'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
      <Switch>
      <Route exact path='/'>
            <Home/>            
          </Route>
          <Route path='/users'>
            <UserTable/>
          </Route>
      <Route path='/members'>
            <MemberTable/>
          </Route>
      </Switch>

      </Router>
    </div>
  );
}

export default App;
