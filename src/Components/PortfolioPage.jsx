import React, { Component } from 'react';
import { Grid, Button, Fab} from '@material-ui/core';
import '../Style/PortfolioPage.css'
import Create from '@material-ui/icons/Create'
import Delete from '@material-ui/icons/DeleteOutlined'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Project from './Project';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class PortfolioPage extends Component {    

    state = { 
        portfolioCards : [
            { id : 1, name : "Test Project 1", desc : "This is test description", accessLink : "https://testproject.com"},
            { id : 2, name : "Test Project 2", desc : "This is test description", accessLink : "https://testproject.com"},
            { id : 3, name : "Test Project 3", desc : "This is test description", accessLink : "https://testproject.com"},
            { id : 4, name : "Test Project 4", desc : "This is test description", accessLink : "https://testproject.com"},
            { id : 5, name : "Test Project 5", desc : "This is test description", accessLink : "https://testproject.com"},
        ],
        open : false,
        openProjectModal : false,
        currentCard : { id : "", name : "", desc : "", accessLink : ""},
        isNotEditable_project : true,
        componentMount : false
     }

     handleClose = () => this.setState({ open : false })
     handleClickOpen = () => this.setState({ open : true })

     handleProjectPageClose = () => this.setState({ openProjectModal : false })
     handleProjectPageClickOpen = card => this.setState({ openProjectModal : true, currentCard : card })

     handleEditProject = () => this.setState({ isNotEditable_project : !this.state.isNotEditable_project })

     saveProject = () => {
        alert("Project is saved")
        this.handleProjectPageClose()
     }

     addImages = evt => {
        alert("Your Image is added." + evt.target.files[0])
     }

     projectDialogBox = () => { 
         return ( 
                <Project  
                    handleClose={this.handleProjectPageClose} 
                    saveProject={this.saveProject}
                    card={this.state.currentCard} 
                    openProjectModal={this.state.openProjectModal}
                    handleEditProject={this.handleEditProject}
                    isNotEditable_project={this.state.isNotEditable_project}
                    addImages={this.addImages}
                /> 
         )
     }

     triggerProjectForm = () => {
        this.setState({ openProjectModal : true, currentCard : { id : "", name : "", desc : "", accessLink : ""} })
        this.projectDialogBox()
     }
     
     render() { 
        return ( 
            <>
                <Grid container direction="row" justify="center" alignItems="center" className="portfolio_container">
                  {
                      this.state.portfolioCards.map(card => {
                        return(
                            <div key={card.id} className="flex_container portfolio_card" >
                                <div item="true" sm={2} className="flexy card_logo"></div>
                                <div item="true" sm={9} className="flexy portfolio_card_title">
                                    <div id="project_title">{card.name}</div>
                                    <div id="project_desc">{card.desc}</div>
                                </div>
                                <div item="true" sm={1} className="flexy card_action_div">
                                    <Fab 
                                        color="primary" 
                                        aria-label="add" 
                                        id="edit_card_btn" 
                                        onClick={() => this.handleProjectPageClickOpen(card)}
                                        size="small"
                                        className="header_sticky"
                                    >
                                        <Create />
                                    </Fab>
                                    <Fab 
                                        color="primary" 
                                        aria-label="add" 
                                        id="delete_card_btn" 
                                        onClick={this.handleClickOpen}
                                        size="small"
                                        className="header_sticky"
                                    >
                                        <Delete />
                                    </Fab>
                                </div>
                            </div> 
                        ) 
                      })
                  } 
                  <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-for-delete-card"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-for-delete-card">{"Are you sure, You want to Remove?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        The Project will be Removed from the DataBase.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} color="secondary">
                        Remove
                    </Button>
                    </DialogActions>
                </Dialog> 
                  {
                      this.state.openProjectModal &&
                        this.projectDialogBox()
                  }
                </Grid>
                <Fab 
                    color="primary" 
                    aria-label="add" 
                    id="add_new_btn" 
                    onClick={this.triggerProjectForm}
                >
                    <AddRoundedIcon />
                </Fab>
            </>
            );
    }
}
 
export default PortfolioPage;