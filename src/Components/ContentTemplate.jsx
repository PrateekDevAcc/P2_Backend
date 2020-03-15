import React, { Component } from 'react';
import "../Style/HomePage.scss";
import "../Style/Template.css";
import { Grid, Fab } from '@material-ui/core';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import AboutPage from './AboutPage';
import PortfolioPage from './PortfolioPage';
import AchievementPage from './AchievementPage';

class Template extends Component {
 
    state = {
        pageName : "",
        projectFromFlag : false,
        obj : new PortfolioPage()
    }

    foo = () => {
        const obj = new PortfolioPage();
        //obj.handleProjectPageClickOpen();
        obj.projectDialogBox();
    }

    triggerProjectDBox = () => this.setState({ projectFromFlag : true })

    changePageName = name => this.setState({ pageName : name })

    render() { 
        return ( 
          <>
            <Grid
                container
                direction="row"
                justify="center"
                className="room_header"
            >
                <Fab 
                    color="primary" 
                    aria-label="back" 
                    id="header_back_btn" 
                    onClick={this.props.back}
                    size="small"
                    className="header_sticky"
                >
                    <ChevronLeftOutlinedIcon />
                </Fab>
                <Grid item container alignItems="center" justify="center" xs={12} className="header_sticky">
                    <div id="page_title">{this.props.landingState.pageName}</div>   
                </Grid>
            </Grid>
            <Grid   
                container
                direction="row"
                justify="center"
                alignItems="center"
                className="page_container"
            >
                <div className="page_container_div">
                    <Grid container  direction="row" justify="center" alignItems="center">
                        <Grid item sm={12} container  direction="row" justify="center" alignItems="center" >
                            <div item="true" xs={6}  className="container_title">{this.props.landingState.pageName}</div>
                        </Grid>
                        <div item="true" sm={12} className="custom_dashed"></div>
                    </Grid>
                    {(() => {
                        switch(this.props.landingState.chosen){
                            case 1 : 
                                return <AboutPage gun={this.props.gun} changePageName={this.changePageName}/>;
                                break;
                            case 2 : 
                                return <PortfolioPage gun={this.props.gun} changePageName={this.changePageName}/>;
                                break;
                            case 3 :
                                return <AchievementPage gun={this.props.gun} changePageName={this.changePageName}/>;
                                break;
                            default :
                                return <div>default</div>;
                        }
                    }
                    )()}
                    {
                        this.state.projectFromFlag &&
                          this.state.obj.projectDialogBox()
                    }
                </div>
            </Grid>
          </> 
         );
    }
}
 
export default Template;