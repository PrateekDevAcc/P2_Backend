import React, { Component } from 'react';
import Gun from "gun"
import './App.css';
import Login from './Components/LoginPage';
import Landing from './Components/LandingPage'
require("gun/sea");


class App extends Component {
  
  state = { 
    isLogin : true,
  }

  constructor(){
    super();      
  }

  //function for Logout
  logOut = () => {
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
            <Login updateSignIn={this.updateSignIn}/>
          : <Landing logOut={this.logOut} />
        }
      </div>
     );
  }
}
 
export default App;

