import React, { Component } from 'react';

import { BrowserRouter } from 'react-router-dom';
//import AppBar from './Components/Navigation/AppBar';
import Login from './Components/AuthReg/Login'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">  
          <Login/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
