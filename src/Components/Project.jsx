import React, {useState} from 'react';
import { Button, TextField, IconButton } from '@material-ui/core';
import '../Style/PortfolioPage.css';
import Create from '@material-ui/icons/Create'
import LockOpen from '@material-ui/icons/LockOpen'
import AddAPhoto from '@material-ui/icons/AddAPhoto'
import Cancel from '@material-ui/icons/Cancel'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function Project(props) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [project, setProject] = useState(props.card.Data)
  const [currentImg, setCurrentImg] = useState()
  const [projectImages, setProjectImages] = useState(props.card.Images)

  const handleProjectUpdate = evt => {
     
    let tempProject = {
        name : project.name,
        link : project.link, 
        desc : project.desc
    }

    if(evt.target.name == 'name'){
        tempProject.name = evt.target.value
    }else if(evt.target.name == 'link'){
        tempProject.link = evt.target.value
    }else if(evt.target.name == 'desc'){
        tempProject.desc = evt.target.value
    }
      
    setProject(tempProject)
  }

  const addImages = evt => {
    setCurrentImg(evt.target.files)
  }

  const handleDeleteImage = (imageType, projectName, imageNode) => {

    if(imageType == 'old'){
        let newCurrentImages = { ...projectImages }
        delete newCurrentImages[imageNode]
        setProjectImages(newCurrentImages)
        props.handleDeleteProjectImages(projectName, imageNode)
        
    }else if(imageType == 'new'){
        let newCurrentImages = { ...currentImg }
        delete newCurrentImages[imageNode]
        setCurrentImg(newCurrentImages)
    }
    
 }

  return (
    <div>
      <Dialog
            fullScreen={fullScreen}
            open={true}
            onClose={props.handleClose}
            aria-labelledby="responsive-dialog-Project-Page"
            id="project_dialog"
        >
            <DialogTitle id="responsive-dialog-Project-Page">{props.card.Data.name ? props.card.Data.name : "New Project"}</DialogTitle>
            <div className="custom_dashed"></div>
            <div className="project_inner_container">
                <div className="projectFormRow" id="project_name_row">
                    <div  htmlFor="" className="contact_form_label">Project Name</div>
                    <TextField  name="name" className="contact_form_textfield projectFormField" id="projectName" type="text" onChange={evt => handleProjectUpdate(evt)} value={project.name ? project.name : " "} disabled={props.isNotEditable_project}/>
                    { 
                        props.isNotEditable_project ?
                        <Create className="editIcon" onClick={() => props.handleEditProject()}/>
                        : <LockOpen className="editIcon" onClick={() => props.handleEditProject()} />
                    }
                </div>
                <div className="projectFormRow">
                    <div  htmlFor="" className="contact_form_label">Access Link</div>
                    <TextField  name="link" className="contact_form_textfield projectFormField" id="projectAccessLink" type="text" onChange={evt => handleProjectUpdate(evt)} value={project.link ? project.link : " "} disabled={props.isNotEditable_project}/>
                    { 
                        props.isNotEditable_project ?
                        <Create className="editIcon" onClick={() => props.handleEditProject()}/>
                        : <LockOpen className="editIcon" onClick={() => props.handleEditProject()} />
                    }
                </div>
                <div className="projectFormRow" id="projectFormRow_description">
                    <div  htmlFor="contactLink" className="contact_form_label" id="projectFormRow_description_label">Description</div>
                    <TextField  name="desc" className="contact_form_textfield projectFormField" id="projectDescription" type="text" onChange={evt => handleProjectUpdate(evt)} value={project.desc ? project.desc : " "}  multiline rowsMax="4" disabled={props.isNotEditable_project}/>
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
                    <div className="image_parent_container">
                        {
                            (currentImg != null) &&
                                Object.keys(currentImg).map(key => {
                                    return (
                                        <div key={key} className="image_child_container">
                                            <div className="project_image">
                                                <img src={URL.createObjectURL(currentImg[key])} className="thumbnail_image" id="currentProjectImagePreview"/>
                                                <Cancel className="cancelIcon" onClick={() => handleDeleteImage('new', null, key)}/>
                                            </div>
                                        </div>
                                    ) 
                                })
                        }
                        {
                            (projectImages != null) &&
                                Object.keys(projectImages).map(key => {
                                    if(key != '_') 
                                    return (
                                        <div key={key} className="image_child_container">
                                            <div className="project_image">
                                                <img src={`https://ipfs.infura.io/ipfs/${projectImages[key]}`} className="thumbnail_image" id="projectImagePreview"/>
                                                <Cancel className="cancelIcon" onClick={() => handleDeleteImage('old', props.card.Data.name, key)}/>
                                            </div>
                                        </div>
                                    )
                                }) 
                        }
                    </div> 
                    <input
                        accept="image/*"
                        type="file" 
                        id="add_project_image_btn"   
                        onChange={evt => addImages(evt)}
                        multiple
                    /> 
                    <label htmlFor="add_project_image_btn">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <AddAPhoto />
                        </IconButton>
                    </label>    
                </div>
            </div>
            <DialogActions id="project_page_footer_icons">
                {
                    props.card.Data.name ==  '' ?
                    <Button
                        autoFocus
                        variant="contained"
                        size="small"
                        color="primary" 
                        className="stepper_btn"   
                        onClick={() => props.saveProject('save', project, currentImg)}
                    >
                        Save
                    </Button>
                    :<Button
                        autoFocus
                        variant="contained"
                        size="small"
                        color="primary" 
                        className="stepper_btn"   
                        onClick={() => props.saveProject('update', project, currentImg)}
                    >
                        Update
                    </Button>
                }
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