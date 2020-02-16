import React, { Component } from 'react';
import Gun from "gun"
import './App.css';
import Login from './Components/LoginPage';
import Landing from './Components/LandingPage'
require("gun/sea");

class App extends Component {
  
  state = {
    isLogin : true
  }

  constructor(){
    super();
      this.gun=Gun("http://localhost:3000/gun");
      window.gun = this.gun; //To have access to gun object in browser console
  }

  //function for Logout
  logOut = () => {
    this.gun.user().leave()
    this.updateSignIn(false)
    console.log("User LogOut")
  }

  //function for  update the Login Status
  updateSignIn = (val) => {
     this.setState({ isLogin : val })
  } 

  render() { 

    return ( 
      <div className="App">
        {
          !this.state.isLogin ?
            <Login gun={this.gun} updateSignIn={this.updateSignIn}/>
          : <Landing gun={this.gun} logOut={this.logOut} />
        }
      </div>
     );
  }
}
 
export default App;

