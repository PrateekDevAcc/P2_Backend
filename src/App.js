import React, { Component } from 'react';
import './App.css';
import Login from './Components/LoginPage';
import Landing from './Components/LandingPage'
import firebase from './utility/firebase'


class App extends Component {
  
  

  constructor(props){
    super(props);     
    this.state = { 
      user : null 
    } 
  }

  componentDidMount(){
    this.authListner()
  }

  authListner = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({user})
      }else{
        this.setState({user : null})
      }
    })
  }

  //function for Logout
  logOut = () => {
    firebase.auth().signOut().then(user => {
      console.log("User logged out successfully")
    }).catch(err => {
      console.error("Auth "+err)
    })
    this.updateSignIn(null)
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

