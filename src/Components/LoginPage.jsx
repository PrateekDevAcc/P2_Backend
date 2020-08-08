import React, { Component } from 'react';
import {Grid, TextField, Button} from '@material-ui/core';
import '../Style/loginPage.css'

class Login extends Component {
    state = { 
        username : "",
        password : ""
     }

     //function for Login the user inside the application
     login = () => {
         let { username, password, user } = this.state

         user.auth(username, password, function(at){
             if(!at.err){
                console.log("You are successfully Logined", at)
             }else if(at.err){
                //console.log(at)
                alert(at.err)
             }
             
         })         
     }

     //function for checking the User login session in the application
     sessionChecker = () => {
        this.state.user.is ? console.log(this.state.user.is) : console.log("You are not Login")
     }

     logoutUser = () => {
         this.state.user.leave()
         console.log("User is loged out")
     }

     deleteUser = () => {
         let {username, password, user} = this.state
         user.delete(username, password, (res) => {
             console.log(res)
         })
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
                            {/* <Button
                                item="true"
                                sm={12}
                                variant="contained"
                                color="primary"
                                className="spacer"
                                id="login_btn"
                                onClick={this.signUp}
                            >
                                SignUp
                            </Button> */}
                            {/* <button onClick={this.sessionChecker}>Session Check</button>
                            <button onClick={this.logoutUser}>Logout</button>
                            <button onClick={this.deleteUser}>Delete User</button> */}
                        </Grid>
                    </Grid>
                    <Grid item sm={4} >
                        <div id="right_login_pattern" className="side_pattern"></div>
                    </Grid>
                </Grid>
            </>
         );
    }
}
 
export default Login;