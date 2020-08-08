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
  const [project, setProject] = useState(props.card.data)
  const [currentImg, setCurrentImg] = useState([])
  const [projectImages, setProjectImages] = useState(props.card.data.images)

  const handleProjectUpdate = evt => {
     
    let tempProject = {
        name : project.name,
        link : project.link, 
        description : project.description
    }

    if(evt.target.name == 'name'){
        tempProject.name = evt.target.value
    }else if(evt.target.name == 'link'){
        tempProject.link = evt.target.value
    }else if(evt.target.name == 'description'){
        tempProject.description = evt.target.value
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
        
        // props.handleDeleteProjectImages(projectName, imageNode, newCurrentImages)
        // console.log('delete ho gaya hai', newCurrentImages, imageNode)
        
    }else if(imageType == 'new'){
        let newCurrentImages = { ...currentImg }
        delete newCurrentImages[imageNode]
        setCurrentImg(newCurrentImages)
        props.updateCurrentImages(currentImg)
        // console.log('delete ho gaya hai', currentImg, imageNode)
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
            <DialogTitle id="responsive-dialog-Project-Page">{project.name ? project.name : "New Project"}</DialogTitle>
            <div className="custom_dashed"></div>
            <div className="project_inner_container">
                <div className="projectFormRow" id="project_name_row">
                    <div  htmlFor="projectName" className="contact_form_label">Project Name</div>
                    <TextField  name="name" className="contact_form_textfield projectFormField" id="projectName" type="text" onChange={evt => handleProjectUpdate(evt)} value={project.name ? project.name : ""}/>
                </div>
                <div className="projectFormRow">
                    <div  htmlFor="projectAccessLink" className="contact_form_label">Access Link</div>
                    <TextField  name="link" className="contact_form_textfield projectFormField" id="projectAccessLink" type="text" onChange={evt => handleProjectUpdate(evt)} value={project.link ? project.link : ""}/>
                </div>
                <div className="projectFormRow" id="projectFormRow_description">
                    <div  htmlFor="projectDescription" className="contact_form_label" id="projectFormRow_description_label">Description</div>
                    <TextField  name="description" className="contact_form_textfield projectFormField" id="projectDescription" type="text" onChange={evt => handleProjectUpdate(evt)} value={project.description ? project.description : ""}  multiline rowsMax="4"/>
                </div>
                <div className="projectFormRow project_image_label_container ">
                    <div  htmlFor=" " className="contact_form_label">Images</div>         
                </div>
                <div className="project_images_container">
                    <div className="image_parent_container">
                        {   
                            (currentImg != null) &&
                                Object.keys(currentImg).map(image => {
                                    
                                    return (
                                        <div key={image} className="image_child_container">
                                            <div className="project_image">
                                                <img src={URL.createObjectURL(currentImg[image])} className="thumbnail_image" id="currentProjectImagePreview"/>
                                                <Cancel className="cancelIcon" onClick={() => handleDeleteImage('new', null, currentImg[image])}/>
                                            </div>
                                        </div>
                                    ) 
                                })
                        }
                        {
                            (projectImages != null) &&
                                Object.keys(projectImages).map(image => {
                                    return (
                                        <div key={image} className="image_child_container">
                                            <div className="project_image">
                                                <img src={`https://ipfs.infura.io/ipfs/${projectImages[image]}`} className="thumbnail_image" id="projectImagePreview"/>
                                                <Cancel className="cancelIcon" onClick={() => handleDeleteImage('old', project.name, image)}/>
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
                    props.card.data.name ==  '' ?
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
                        onClick={() => props.saveProject('update', project, projectImages, currentImg)}
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