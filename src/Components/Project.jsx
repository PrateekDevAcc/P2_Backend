import React from 'react';
import { Grid, Button, TextField, IconButton } from '@material-ui/core';
import '../Style/PortfolioPage.css';
import Create from '@material-ui/icons/Create'
import LockOpen from '@material-ui/icons/LockOpen'
import AddAPhoto from '@material-ui/icons/AddAPhoto'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function Project(props) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Dialog
            fullScreen={fullScreen}
            open={true}
            onClose={props.handleClose}
            aria-labelledby="responsive-dialog-Project-Page"
            id="project_dialog"
        >
            <DialogTitle id="responsive-dialog-Project-Page">{props.card.name ? props.card.name : "New Project"}</DialogTitle>
            <div className="custom_dashed"></div>
            <div className="project_inner_container">
                <div className="projectFormRow" id="project_name_row">
                    <div  htmlFor="" className="contact_form_label">Project Name</div>
                    <TextField  className="contact_form_textfield projectFormField" id="projectName" type="text" defaultValue={props.card.name ? props.card.name : " "} disabled={props.isNotEditable_project}/>
                    { 
                        props.isNotEditable_project ?
                        <Create className="editIcon" onClick={() => props.handleEditProject()}/>
                        : <LockOpen className="editIcon" onClick={() => props.handleEditProject()} />
                    }
                </div>
                <div className="projectFormRow">
                    <div  htmlFor="" className="contact_form_label">Access Link</div>
                    <TextField  className="contact_form_textfield projectFormField" id="projectAccessLink" type="text" defaultValue={props.card.accessLink ? props.card.accessLink : " "} disabled={props.isNotEditable_project}/>
                    { 
                        props.isNotEditable_project ?
                        <Create className="editIcon" onClick={() => props.handleEditProject()}/>
                        : <LockOpen className="editIcon" onClick={() => props.handleEditProject()} />
                    }
                </div>
                <div className="projectFormRow" id="projectFormRow_description">
                    <div  htmlFor="contactLink" className="contact_form_label" id="projectFormRow_description_label">Description</div>
                    <TextField  className="contact_form_textfield projectFormField" id="projectDescription" type="text" defaultValue={props.card.desc ? props.card.desc : " "}  multiline rowsMax="4" disabled={props.isNotEditable_project}/>
                    { 
                        props.isNotEditable_project ?
                        <Create className="editIcon" onClick={() => props.handleEditProject()}/>
                        : <LockOpen className="editIcon" onClick={() => props.handleEditProject()} />
                    }
                </div>
                <div className="projectFormRow project_image_label_container ">
                    <div  htmlFor="contactLink" className="contact_form_label">Images</div>         
                </div>
                <div className="project_images_container">
                    <div  htmlFor="contactLink" className="project_image"></div>  
                    <div  htmlFor="contactLink" className="project_image"></div>  
                    <input
                        accept="image/*"
                        type="file" 
                        id="add_project_image_btn"   
                        onChange={props.addImages}
                    /> 
                    <label htmlFor="add_project_image_btn">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <AddAPhoto />
                        </IconButton>
                    </label>    
                </div>
            </div>
            <DialogActions id="project_page_footer_icons">
                <Button
                    autoFocus
                    variant="contained"
                    size="small"
                    color="primary" 
                    className="stepper_btn"   
                    onClick={props.saveProject}
                >
                    Save
                </Button>
                <Button
                    autoFocus
                    size="small"
                    className="stepper_back_btn" 
                    onClick={props.handleClose}   
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}