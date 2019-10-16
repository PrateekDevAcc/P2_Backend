import React, { Component } from 'react';
import PORTFOLIOo from './CRUD/Portfolio';

class AllProject extends Component {
    state = {  }

    DisplayAll =() => {
        PORTFOLIOo.viewData(this.props.gun, "Prolite")
        console.log("Dispaly All")
    }


    render() { 
        return ( 
            <div>
                <h1>The All Project</h1>
                <button onClick={this.DisplayAll}>Click</button>
            </div>
         );
    }
}
 
export default AllProject;