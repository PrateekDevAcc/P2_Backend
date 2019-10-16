import React, { Component } from 'react';
import Gun from "gun"
import PORTFOLIO from './CRUD/Portfolio'
import ABOUT from './CRUD/About'
import './App.css';
// import Login from './login';
// import AllProject from './AllProject';
require("gun/sea");

class App extends Component {
  
  state = {
    isLogin : false
  }

  constructor(props){
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
        <PORTFOLIO gun={this.gun} logOut={this.logOut} />
        <br />
        <hr />
        <br />
        <ABOUT gun={this.gun} logOut={this.logOut} />
        {/* <AllProject gun={this.gun} /> */}
        {/* {
          !this.state.isLogin ?
            <Login gun={this.gun} updateSignIn={this.updateSignIn}/>
          : <CRUD gun={this.gun} logOut={this.logOut} />
        } */}
      </div>
     );
  }
}
 
export default App;

