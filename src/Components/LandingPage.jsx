import React, { Component }  from 'react';
import { Box } from '@material-ui/core';
import Home from './HomePage';
import backdropImage from '../asserts/Intersection1.svg';
import Template from './ContentTemplate';

class Landing extends Component {

    state = {
        chosen : 3,
        pageName : "Acheievement"
    }

    backdrop = {
        width: '100%',
        height: '100vh',
        background: `url(${backdropImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'bottom'
    };

    updateChosen = (val, page) => {
        this.setState({ chosen : val, pageName : page })
    }

    back = () => {
        this.setState({ chosen : 0 })
    }

    render() {
        return ( 
            <>
                <Box style={this.backdrop}> 
                    {
                        this.state.chosen ?
                            <Template gun={this.props.gun} landingState={this.state}  back={this.back}/>
                            : <Home gun={this.props.gun} logOut={this.props.logOut} updateChosen={this.updateChosen} />       
                    }
                </Box>
            </>
            );
    }
        
}
 
export default Landing;