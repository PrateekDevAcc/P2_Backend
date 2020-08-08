import React, { Component, createContext }  from 'react';
import { Box } from '@material-ui/core';
import Home from './HomePage';
import backdropImage from '../asserts/Intersection1.svg';
import Template from './ContentTemplate';
import About from '../CRUD/About'
import Achievements from '../CRUD/Achievement'
import Portfolio from '../CRUD/Portfolio';

class Landing extends Component {

    state = {
        chosen : 0,
        pageName : "",
        AboutData : {},
        AchievementsData : {},
        PortfolioData : {}
    }

    backdrop = {
        width: '100%',
        height: '100vh',
        background: `url(${backdropImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'bottom'
    };

    UNSAFE_componentWillMount(){
        const AboutObj = new About();
        const AchievementObj = new Achievements();
        const PortfolioObj = new Portfolio();
       
        //fetching the PersonalRecord
        AboutObj.getPersonalRecord.then(personal => {     
            this.setState({ AboutData : { ...this.state.AboutData, personal}})
        },error => {
            console.log(error)
        });

        //fetching the ContactRecord
        AboutObj.getContactRecord.then(contact => {     
            this.setState({ AboutData : { ...this.state.AboutData, contact} })
        },error => {
            console.log(error)
        });

        //fetching the SocialRecord
        AboutObj.getSocialRecord.then(social => {     
            this.setState({ AboutData : { ...this.state.AboutData, social} })
        },error => {
            console.log(error)
        });   
        
        //fetching the SkilllsRecord
        AchievementObj.getSkillsRecord.then(skills => {     
            this.setState({ AchievementsData : { ...this.state.AchievementsData, skills} })
        },error => {
            console.log(error)
        });   

        //fetching the CertificatesRecord
        AchievementObj.getCertRecord.then(cert => {     
            this.setState({ AchievementsData : { ...this.state.AchievementsData, cert} })
        },error => {
            console.log(error)
        });

        //fetching the PortfolioRecord
        PortfolioObj.getPortfolioRecord.then(project => {     
            this.setState({ PortfolioData : { ...this.state.PortfolioData, project} })
        },error => {
            console.log(error)
        });
    }

    updateChosen = (val, page) => {
        this.setState({ chosen : val, pageName : page })
    }

    back = () => {
        this.setState({ chosen : 0 })
    }

    render() {
        console.log(this.state.PortfolioData)
        return ( 
            <>
                <Box style={this.backdrop}> 
                    {
                        this.state.chosen ?
                            <Template  AboutData={this.state.AboutData} AchievementsData={this.state.AchievementsData} PortfolioData={this.state.PortfolioData} landingState={this.state}  back={this.back}/>
                            : <Home  logOut={this.props.logOut} updateChosen={this.updateChosen} />       
                    }
                </Box>
            </>
            );
    }
        
}
 
export default Landing;