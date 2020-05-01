import React, { Component } from 'react';
import Gun from "gun"
import './App.css';
import Login from './Components/LoginPage';
import Landing from './Components/LandingPage'
require("gun/sea");

class App extends Component {
  
  state = {
    isLogin : true,
    gun : null
  }

  

  constructor(){
    super();
      this.gun=Gun(window.location.origin+'/gun');
      window.gun = this.gun; //To have access to gun object in browser console
      
  }

  //function for Logout
  logOut = () => {
    this.gun.user().leave()
    this.updateSignIn(false)
    console.log("User LogOut")
    alert("You are Logging Out")
  }

  //function for  update the Login Status
  updateSignIn = (val, userGun) => {
     this.setState({ isLogin : val, gun : userGun })
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

