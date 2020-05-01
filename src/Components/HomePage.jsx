import React, { Component } from 'react';
import { Grid, Button, CardContent } from '@material-ui/core';
import '../Style/HomePage.scss'

class Home extends Component {
    state = {  }
    
    UNSAFE_componentWillReceiveProps(){
        window.location.reload();
    }
    
    render() { 
        let AboutPageName = "About",
            PortfolioPageName = "Portfolio",
            AchievementPageName = "Achievement";

        return ( 
            <>
                <Grid
                    container
                    direction="row"
                    className="homepage_header"
                >
                    <Grid item container  xs={6}  className="header_sticky">
                        <div item="true" sm={3} id="homepage_logo"></div>
                    </Grid>
                    <Grid item container alignItems="center" justify="flex-end" xs={6} className="header_sticky">
                        <Button
                            item="true"
                            sm={3}
                            variant="contained"
                            color="primary"
                            size="small"
                            id="header_logout_btn"
                            onClick={this.props.logOut}
                        >
                            Logout
                        </Button>   
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className="homepage_body"
                >
                    <Grid 
                        item 
                        container 
                        direction="row"
                        justify="center" 
                        sm={6} 
                        className=""
                    >
                        <div item="true" sm={3} container="true" onClick={() => this.props.updateChosen(1, AboutPageName)} className="homepage_cards" id="about_card">
                            <CardContent className="card_spacing">
                                <div color="textSecondary" className="card_title about_title" id="about_title" >
                                    About
                                </div>
                            </CardContent>
                        </div>
                        <div item="true" sm={3} container="true" onClick={() => this.props.updateChosen(2, PortfolioPageName)} className="homepage_cards" id="portfolio_card"  >
                            <CardContent className="card_spacing">
                                <div color="textSecondary" className="card_title" id="portfolio_title" >
                                    Portfolio
                                </div>
                            </CardContent>
                        </div>
                        <div item="true" sm={3} container="true" onClick={() => this.props.updateChosen(3, AchievementPageName)} className="homepage_cards" id="achievement_card">
                            <CardContent className="card_spacing">
                                <div item="true" color="textSecondary" className="card_title" id="achievement_title" >
                                    Achievement 
                                </div>
                            </CardContent>
                        </div>
                    </Grid>
                    <Grid item container direction="column" justify="center" alignItems="center" sm={4} className="">
                        <div item="true" sm={12} color="textSecondary" className="title_heading" id="homepage_text1" >
                            LETS ADD SOME
                        </div>
                        <div item="true" sm={12} color="textSecondary" className="title_heading" id="homepage_text2" >
                            Creativity
                        </div>
                    </Grid>
                </Grid>
            </>
            // <>
            //     <h1>Home Page</h1>
            //     <button onClick={this.props.logOut}>Logout</button>
            //     <PORTFOLIO gun={this.props.gun} logOut={this.props.logOut} />
            //     <hr />
            //     <ACH gun={this.props.gun} logOut={this.props.logOut} />
            //     <hr />
            //     <ABOUT gun={this.props.gun} logOut={this.props.logOut} />  
            // </>
         );
    }
}
 
export default Home;