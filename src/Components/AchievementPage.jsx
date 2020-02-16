import React, { Component } from 'react';
import { Grid, Button, Fab, Select, MenuItem, TextField} from '@material-ui/core';
import '../Style/AchievementPage.css'
import Done from '@material-ui/icons/Done'
import Create from '@material-ui/icons/Create'
import LockOpen from '@material-ui/icons/LockOpen'
import Delete from '@material-ui/icons/DeleteOutlined'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';



class AchievementPage extends Component {
    
    state = { 
        selectedSkill : "",
        selectedRating : "",
        selectedCertificate : "",
        skills : [
            { 'C++' : 5 },
            { 'JavaScript' : 7 },
            { 'Java'   :  6 },
            { 'Blockchain' : 5 }
         ],
         ratingArr : [1,2,3,4,5,6,7,8,9,10],
         certificates : [
            { id : 1, name : "Front-End Developer", desc : "this is discription.", images : "vbub8vy8dsivhuf,ocnshchcds8chudsnc,dochcshcodshc"},
            { id : 2, name : "Full Stack Developer", desc : "this is discription.", images : "vbub8vy8dsivhuf,ocnshchcds8chudsnc,dochcshcodshc"},
            { id : 3, name : "Blokchain Developer", desc : "this is discription.", images : "vbub8vy8dsivhuf,ocnshchcds8chudsnc,dochcshcodshc"},
            { id : 4, name : "Game Developer", desc : "this is discription.", images : "vbub8vy8dsivhuf,ocnshchcds8chudsnc,dochcshcodshc"},
            { id : 5, name : "Smart India Hackathon", desc : "this is discription.", images : "vbub8vy8dsivhuf,ocnshchcds8chudsnc,dochcshcodshc"},
         ],
         currentCert : null,
         isNotEditable : false
     }

    handleSkillChange = evt => { this.setState({ selectedSkill : evt.target.value }); this.handleRatingChange(null) }
    handleRatingChange = evt => {  
        if(evt == null)  this.setState({ selectedRating : 2 })
        else  this.setState({ selectedRating : evt.target.value }) 
    }
    handleCertificateChange = evt => { this.setState({ selectedCertificate : evt.target.value }) }
    
    handleEdit = () => this.setState({ isNotEditable : !this.state.isNotEditable })


    populateSkills = () => {
        return (
            this.state.skills.map( key =>  <MenuItem key={Object.keys(key)[0]} value={Object.keys(key)[0]}>{Object.keys(key)[0]}</MenuItem> )
        )
    }

    populateRating = () => {
        return (
            this.state.ratingArr.map( val =>  <MenuItem key={val} value={val}>{val}</MenuItem> )
        )
    }

    populateCertificates = () => {
        return (
            this.state.certificates.map( val =>  <MenuItem key={val.id} value={val.name}>{val.name}</MenuItem> )
        )
    }

    addSkill = () => {
        alert("your Skill is added !")
    }

    saveAchievement = () => {
        alert("your record is stored")
    }
    
    render() { 
        return ( 
            <>
                <Grid container justify="center" alignItems="center" className="acheivement_container">
                    <Grid className="achievementFormRow">
                        <Select value={this.state.selectedSkill} onChange={this.handleSkillChange} displayEmpty id="skill_drop_down" className="custom_boxShadow">
                            <MenuItem value="" className="dropdown_placeholder" disabled>
                                Technical Skills
                            </MenuItem>
                            {
                                this.populateSkills()
                            }
                        </Select>
                        <TextField id="skill" type="text" htmlFor="skill_drop_down" value={this.state.selectedSkill} />
                        <Select value={this.state.selectedRating} onChange={this.handleRatingChange} displayEmpty id="rating_drop_down" className="custom_boxShadow">
                            <MenuItem value="" className="dropdown_placeholder" disabled>
                                0
                            </MenuItem>
                            {
                                this.populateRating()
                            }
                        </Select>
                        <Button
                            variant="contained"
                            size="small"
                            color="primary" 
                            id="add_skill_btn"   
                            onClick={this.addSkill}
                        >
                            <Done />
                        </Button>
                    </Grid>
                    <Grid className="achievementFormRow">
                        <Select value={this.state.selectedCertificate} onChange={evt => this.handleCertificateChange(evt)} displayEmpty id="certificate_drop_down" className="custom_boxShadow">
                            <MenuItem value="" className="dropdown_placeholder" disabled>
                                Certificates
                            </MenuItem>
                            {
                                this.populateCertificates()
                            }
                        </Select>
                    </Grid>
                    <Grid className="achievementFormRow">
                        <Grid className="image_container" >
                            <div className="imagePreview_div"></div>
                        </Grid>
                        <Grid className="description_container" >
                            <div className="certDesc1_div">
                                <div htmlFor="certName" className="contact_form_label">Name</div>
                                <TextField className="contact_form_textfield" id="certName" type="text" defaultValue="{this.state.currentCert.name}" disabled={this.state.isNotEditable}/>
                                { 
                                    this.state.isNotEditable ?
                                    <Create className="editIcon" onClick={this.handleEdit}/>
                                    : <LockOpen className="editIcon" onClick={this.handleEdit} />
                                }
                            </div>
                            <div className="certDesc2_div">
                            <div htmlFor="certDesc" className="contact_form_label">Description</div>
                                <TextField className="contact_form_textfield" id="certDesc" type="text" defaultValue="{this.state.currentCert.desc}" multiline rowsMax="4" disabled={this.state.isNotEditable}/>
                                { 
                                    this.state.isNotEditable ?
                                    <Create className="editIcon" onClick={this.handleEdit}/>
                                    : <LockOpen className="editIcon" onClick={this.handleEdit} />
                                }
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-end" alignItems="center" className="stepper_footer">  
                        <Button
                            item="true" 
                            sm={6}
                            variant="contained"
                            size="small"
                            color="primary" 
                            className="stepper_btn"   
                            onClick={this.saveAchievement}
                        >
                            Save
                        </Button>            
                </Grid>
                </Grid>
            </>
         );
    }
}   
 
export default AchievementPage;