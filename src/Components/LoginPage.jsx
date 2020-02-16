import React, { Component } from 'react';
import {Grid, TextField, Button} from '@material-ui/core';
import '../Style/loginPage.css'

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
            <>
                <Grid  
                    className="background_container"
                    container 
                    direction="row" 
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item sm={4} >
                        <div id="left_login_pattern" className="side_pattern"></div>
                    </Grid>
                    <Grid 
                        item
                        sm={4}
                        container 
                        direction="row" 
                        className="center_section"
                    >
                        <Grid item sm={12} id="my_logo"></Grid>
                        <Grid 
                            item 
                            container
                            direction="column"
                            sm={12}     
                            justify="center"
                            alignItems="center" 
                            id="login_form"
                        >
                            <TextField
                                item
                                sm={12}
                                label="Username"
                                className="outlined-size-small spacer"
                                variant="outlined"
                                onChange={evt => this.updateUsername(evt)}
                            />
                            <TextField
                                item
                                sm={12}
                                type="password"
                                label="Password"
                                className="outlined-size-small spacer"
                                variant="outlined"
                                onChange={evt => this.updatePassword(evt)}
                            />
                            <Button
                                item
                                sm={12}
                                variant="contained"
                                color="primary"
                                className="spacer"
                                id="login_btn"
                                onClick={this.login}
                            >
                                Login
                            </Button>
                            <Button
                                item
                                sm={12}
                                variant="contained"
                                color="primary"
                                className="spacer"
                                id="login_btn"
                                onClick={this.signUp}
                            >
                                SignUp
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} >
                        <div id="right_login_pattern" className="side_pattern"></div>
                    </Grid>
                </Grid>
                {/* <h2>Login Page</h2>
                <input type="text" onChange={evt => this.updateUsername(evt)} placeholder="username" />
                <input type="text" onChange={evt => this.updatePassword(evt)} />
                <button onClick={this.login}>Login</button>
                <button onClick={this.signUp}>SignUp</button>
                <button onClick={this.sessionChecker}>Session Check</button> */}
            </>
         );
    }
}
 
export default Login;