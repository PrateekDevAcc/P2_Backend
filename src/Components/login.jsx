import React, { Component } from 'react';

class Login extends Component {
    state = { 
        username : "",
        password : "",
        user : this.props.gun.user()
     }

     //function for Login the user inside the application
     login = () => {
         let { username, password, user } = this.state

         user.auth(username, password, (res) => {
             if(!res.err){
                console.log("You are successfully Logined", res)
                this.props.updateSignIn(true) 
             } 
         })

         
     }

     //function for checking the User login session in the application
     sessionChecker = () => {
        this.state.user.is ? console.log(this.state.user.is) : console.log("You are not Login")
     }

     //function for the SigningUp the new User
     signUp = () => {
        let { username, password, user } = this.state

        user.create(username, password, (res) => {
            if(!res.err) console.log(`Account is Created`, res)
        })
        
     }


     //Event Handler
    updateUsername = evt => this.setState({ username : evt.target.value })
    updatePassword = evt => this.setState({ password : evt.target.value })

    render() { 
        return ( 
            <div>
                <h2>Login Page</h2>
                <input type="text" onChange={evt => this.updateUsername(evt)} placeholder="username" />
                <input type="text" onChange={evt => this.updatePassword(evt)} />
                <button onClick={this.login}>Login</button>
                <button onClick={this.signUp}>SignUp</button>
                <button onClick={this.sessionChecker}>Session Check</button>
            </div>
         );
    }
}
 
export default Login;