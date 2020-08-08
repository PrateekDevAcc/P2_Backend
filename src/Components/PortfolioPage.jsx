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

    constructor(props){
        super(props)
        this.portfolioObj = new Portfolio(this.props); 
    }

    state = { 
        open : false,
        openProjectModal : false,
        currentCard : { id : "", name : "", description : "", accessLink : ""},
        isNotEditable_project : true,
        componentMount : false,
        portfolioRecord : [],
        currentImages : null,
        currentProjectName : '',
        projectNameIDHash : {}
    }

    UNSAFE_componentWillMount(){
        this.setState({ portfolioRecord : this.props.PortfolioData.project })

        Object.keys(this.props.PortfolioData.project).map(key => {
            let tempHash = this.state.projectNameIDHash
            tempHash[this.props.PortfolioData.project[key].data.name] = this.props.PortfolioData.project[key].id
            this.setState({ projectNameIDHash : tempHash })
        })
    }
    

     handleClose = () => this.setState({ open : false })
     handleClickOpen = projectName => this.setState({ open : true, currentProjectName : projectName })

     handleProjectPageClose = () => this.setState({ openProjectModal : false })
     handleProjectPageClickOpen = card =>{ this.setState({ openProjectModal : true, currentCard : card, currentImages : null }) ; console.log(card)}

     handleEditProject = () => this.setState({ isNotEditable_project : !this.state.isNotEditable_project })

     //updateCurrentImages = currentImages => this.setState({ currentImages : currentImages })

     handleDeleteProjectImages = (projectName, imageNode, imageArr) => this.portfolioObj.deleteImg(this.state.projectNameIDHash[projectName], imageNode, imageArr)   

     saveProject = async(operation, newProjectData, newProjectImages, newCurrentImages) => {
        //console.log(newProjectData)
        //console.log(newProjectImages)
        let finalImageArr = []
        if(operation == 'save'){
            this.portfolioObj.insertProject(newProjectData, newProjectImages)
        }else if(operation == 'update'){

            if(newProjectImages != undefined){
                newProjectImages = Object.values(newProjectImages)
            }else{
                newProjectImages = []
            }

            if(newCurrentImages.length > 0){
                let imageArr =  await this.portfolioObj.insertImg(newCurrentImages, this.state.projectNameIDHash[newProjectData.name], 'add')
                finalImageArr = [ ...newProjectImages, ...imageArr ]
            }
            
            newProjectData.images = finalImageArr;
            this.portfolioObj.updateProject(newProjectData, this.state.projectNameIDHash[newProjectData.name])
        }
        
        this.handleProjectPageClose()
     }

     handleDeleteProject = () => {
        this.portfolioObj.deleteProject(this.state.projectNameIDHash[this.state.currentProjectName])
        this.handleClose()
        // this.setState({ 
        //     portfolioRecord : this.portfolioObj.getPortfolioRecord()
        // })
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
            data : {
                 name : '',
                 description : '',
                 link : '',
                 images : [],
                 no_of_imgs : ''
             },
             id : ''
         }
        this.setState({ openProjectModal : true, currentCard : defaultCard, currentImages : null })
        this.projectDialogBox()
     }
     
     render() { 
         let projects = this.state.portfolioRecord
        return ( 
            <>
                <Grid container direction="row" justify="center" alignItems="center" className="portfolio_container">
                  {
                      projects.map(card => {
                        return(
                            <div key={card.id} className="flex_container portfolio_card" >
                                <div item="true" sm={2} className="flexy card_logo"></div>
                                <div item="true" sm={9} className="flexy portfolio_card_title">
                                    <div id="project_title">{card.data.name}</div>
                                    <div id="project_desc">{card.data.description}</div>
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
                                        onClick={() => this.handleClickOpen(card.data.name)}
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