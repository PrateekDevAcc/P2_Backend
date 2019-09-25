import React, { Component } from 'react';
import Gun from "gun"
import GunTest from './gunTest'
import './App.css';

class App extends Component {
  
  constructor(props){
    super();
      this.gun=Gun("http://localhost:3000/gun");
      window.gun = this.gun; //To have access to gun object in browser console
      
  }

  render() { 
    return ( 
        <div className="App">
        <GunTest gun={this.gun}/>
      </div>
     );
  }
}
 
export default App;

