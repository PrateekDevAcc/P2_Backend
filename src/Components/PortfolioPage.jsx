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
import Portfolio from '../CRUD/Portfolio';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class PortfolioPage extends Component {    

    UNSAFE_componentWillMount(){
        this.portfolioObj = new Portfolio(this.props);
        this.portfolioRecord = this.portfolioObj.getPortfolioRecord(); 
        this.setState({ 
            portfolioRecord : this.portfolioRecord
        }) 
        console.log(this.portfolioRecord)
    }

    state = { 
        open : false,
        openProjectModal : false,
        currentCard : { id : "", name : "", desc : "", accessLink : ""},
        isNotEditable_project : true,
        componentMount : false,
        portfolioRecord : '',
        currentImages : null,
        currentProjectName : ''
    }

    

     handleClose = () => this.setState({ open : false })
     handleClickOpen = projectName => this.setState({ open : true, currentProjectName : projectName })

     handleProjectPageClose = () => this.setState({ openProjectModal : false })
     handleProjectPageClickOpen = card =>{ this.setState({ openProjectModal : true, currentCard : card, currentImages : null }) ; console.log(card)}

     handleEditProject = () => this.setState({ isNotEditable_project : !this.state.isNotEditable_project })

     //updateCurrentImages = currentImages => this.setState({ currentImages : currentImages })

     handleDeleteProjectImages = (projectName, imageNode) => this.portfolioObj.deleteImg(projectName, imageNode)   

     saveProject = (operation, newProjectData, newProjectImages) => {
        //console.log(newProjectData)
        //console.log(newProjectImages)
        if(operation == 'save'){
            this.portfolioObj.insertProject(newProjectData, newProjectImages)
        }else if(operation == 'update'){
            this.portfolioObj.updateProject(newProjectData)
            if(newProjectImages) this.portfolioObj.addImages(newProjectImages, newProjectData.name)
        }
        this.handleProjectPageClose()
     }

     handleDeleteProject = () => {
        this.portfolioObj.deleteProject(this.state.currentProjectName)
        this.handleClose()
        this.setState({ 
            portfolioRecord : this.portfolioObj.getPortfolioRecord()
        })
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
                    currentImages={this.state.currentImages}
                    updateCurrentImages={this.updateCurrentImages}
                    handleDeleteProjectImages={this.handleDeleteProjectImages}
                /> 
         )
     }

     triggerProjectForm = () => {
         let defaultCard = {
            Data : {
                 name : '',
                 desc : '',
                 link : '',
                 no_of_imgs : ''
             },
             Images : {}
         }
        this.setState({ openProjectModal : true, currentCard : defaultCard, currentImages : null })
        this.projectDialogBox()
     }
     
     render() { 
         let project = this.state.portfolioRecord
        return ( 
            <>
                <Grid container direction="row" justify="center" alignItems="center" className="portfolio_container">
                  {
                      Object.keys(this.state.portfolioRecord).map(card => {
                        return(
                            <div key={project[card].Data.name} className="flex_container portfolio_card" >
                                <div item="true" sm={2} className="flexy card_logo"></div>
                                <div item="true" sm={9} className="flexy portfolio_card_title">
                                    <div id="project_title">{project[card].Data.name}</div>
                                    <div id="project_desc">{project[card].Data.desc}</div>
                                </div>
                                <div item="true" sm={1} className="flexy card_action_div">
                                    <Fab 
                                        color="primary" 
                                        aria-label="add" 
                                        id="edit_card_btn" 
                                        onClick={() => this.handleProjectPageClickOpen(project[card])}
                                        size="small"
                                        className="header_sticky"
                                    >
                                        <Create />
                                    </Fab>
                                    <Fab 
                                        color="primary" 
                                        aria-label="add" 
                                        id="delete_card_btn" 
                                        onClick={() => this.handleClickOpen(project[card].Data.name)}
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
                    <Button onClick={this.handleDeleteProject} color="secondary">
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