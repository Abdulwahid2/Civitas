import React from 'react';
import SingupForm from './components/SignUp/SignUpForm';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <SingupForm />

      </Router>
    </div>
  );
}

export default App;
