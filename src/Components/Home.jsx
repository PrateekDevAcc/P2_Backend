import React, { Component } from 'react';
import PORTFOLIO from '../CRUD/Portfolio'
import ABOUT from '../CRUD/About'
import ACH from '../CRUD/Achievement'

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <h1>Home Page</h1>
                <PORTFOLIO gun={this.props.gun} logOut={this.props.logOut} />
                <hr />
                <ACH gun={this.props.gun} logOut={this.props.logOut} />
                <hr />
                <ABOUT gun={this.props.gun} logOut={this.props.logOut} /> 
            </div>
         );
    }
}
 
export default Home;