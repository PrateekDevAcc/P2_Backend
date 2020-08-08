import React, { Component } from 'react';
import { Grid, Button, Select, MenuItem, TextField, IconButton, Fab} from '@material-ui/core';
import '../Style/AchievementPage.css'
import Done from '@material-ui/icons/Done'
import Create from '@material-ui/icons/Create'
import LockOpen from '@material-ui/icons/LockOpen'
import Achievements from '../CRUD/Achievement';
import AddAPhoto from '@material-ui/icons/AddAPhoto'
import Delete from '@material-ui/icons/DeleteOutlined'

class AchievementPage extends Component {
    
    
    constructor(props){
        super(props)
        this.achObj = new Achievements(this.props);  
    }
    
    state = { 
        selectedSkill : "",
        selectedRating : "",
        selectedCertificate : { name : '', description : '', image : null},
        ratingArr : [1,2,3,4,5,6,7,8,9,10],
        isNotEditable : true,
        skillRecord : this.props.AchievementsData.skills,
        certRecord  : this.props.AchievementsData.cert      
    }
    
    handleSkillChange = evt => this.setState({ selectedSkill : evt.target.value, selectedRating : this.state.skillRecord[evt.target.value] })
    
    handleRatingChange = evt => this.setState({ selectedRating : evt.target.value })
    
    handleCertificateChange = evt => {
        console.log(evt.target); 
        this.setState({ selectedCertificate : this.state.certRecord[evt.target.value] }); 
        document.getElementById('certImagePreview').src = `https://ipfs.infura.io/ipfs/${this.state.certRecord[evt.target.value].image}` 
    }
    
    handleEdit = () => this.setState({ isNotEditable : !this.state.isNotEditable })

    handleSkillText = evt => this.setState({ selectedSkill : evt.target.value})

    handleCertNameText = evt =>{
        let tempObj = this.state.selectedCertificate
        tempObj.name = evt.target.value
        this.setState({ selectedCertificate : tempObj })
    } 

    handleCertDescText = evt =>{
        let tempObj = this.state.selectedCertificate
        tempObj.description = evt.target.value
        this.setState({ selectedCertificate : tempObj })
    }

    handleCertImage = evt => {
        let tempObj = this.state.selectedCertificate
        tempObj.image = evt.target.files[0]
        document.getElementById('certImagePreview').src = URL.createObjectURL(evt.target.files[0])
        this.setState({ selectedCertificate : tempObj })
    }

    handleSkillDelete = () => {
        this.achObj.deleteSkill(this.state.selectedSkill)
        this.setState({ skillRecord : this.props.AchievementsData.skills, selectedSkill : "", selectedRating : "" })
    }

    handleCertDelete = () => {
        this.achObj.deleteCert(this.state.selectedCertificate.name)
        this.setState({ certRecord : this.props.AchievementsData.cert,  selectedCertificate : { name : '', description : '', image : null} })
    }

    populateSkills = () => {
        return (
           Object.keys(this.state.skillRecord).map( key => <MenuItem key={key} value={key}>{key}</MenuItem> )
        )
    }

    populateRating = () => {
        return (
            this.state.ratingArr.map( val =>  <MenuItem key={val} value={val}>{val}</MenuItem> )
        )
    }

    populateCertificates = () => {
        return (
            Object.keys(this.state.certRecord).map( key =>  <MenuItem key={key} value={key}>{key}</MenuItem> )
        )
    }

    addSkill = () => {
        this.achObj.insertSkillsData(this.state.selectedSkill, this.state.selectedRating)
        this.setState({ skillRecord : this.props.AchievementsData.skills })
    } 

    saveAchievement = () => {

        this.achObj.insertCertificatesData(this.state.selectedCertificate.name, this.state.selectedCertificate)
        this.setState({  certRecord : this.props.AchievementsData.cert })
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
                        <TextField id="skill" type="text" htmlFor="skill_drop_down"  onChange={this.handleSkillText} value={this.state.selectedSkill}/>
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
                        <Fab 
                            color="primary" 
                            aria-label="add" 
                            id="delete_card_btn" 
                                onClick={this.handleSkillDelete}
                            size="small"
                            className="header_sticky"
                        >
                            <Delete />
                        </Fab>
                    </Grid>
                    <Grid className="achievementFormRow">
                        <Select value={this.state.selectedCertificate.name} onChange={evt => this.handleCertificateChange(evt)} displayEmpty id="certificate_drop_down" className="custom_boxShadow">
                            <MenuItem value="" className="dropdown_placeholder" disabled>
                                Certificates
                            </MenuItem>
                            {
                                this.populateCertificates()
                            }
                        </Select>
                        <Fab 
                            color="primary" 
                            aria-label="add" 
                            id="delete_card_btn" 
                            onClick={this.handleCertDelete}
                            size="small"
                            className="header_sticky"
                        >
                            <Delete />
                        </Fab>
                    </Grid>
                    <Grid className="achievementFormRow">
                        <Grid className="image_container" >
                            <div className="imagePreview_div">
                                <img src='' className="thumbnail_image" id="certImagePreview"/>
                            </div>
                            <input
                                accept="image/*"
                                type="file" 
                                id="add_cert_image_btn"   
                                onChange={evt => this.handleCertImage(evt)}
                            /> 
                            <label htmlFor="add_cert_image_btn">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <AddAPhoto />
                                </IconButton>
                            </label> 
                        </Grid>
                        <Grid className="description_container" >
                            <div className="certDesc1_div">
                                <div htmlFor="certName" className="contact_form_label">Name</div>
                                <TextField className="contact_form_textfield" id="certName" type="text" onChange={this.handleCertNameText} value={this.state.selectedCertificate.name} disabled={this.state.isNotEditable}/>
                                { 
                                    this.state.isNotEditable ?
                                    <Create className="editIcon" onClick={this.handleEdit}/>
                                    : <LockOpen className="editIcon" onClick={this.handleEdit} />
                                }
                            </div>
                            <div className="certDesc2_div">
                            <div htmlFor="certDesc" className="contact_form_label">Description</div>
                                <TextField className="contact_form_textfield" id="certDesc" type="text" onChange={this.handleCertDescText} value={this.state.selectedCertificate.description} multiline rowsMax="4" disabled={this.state.isNotEditable}/>
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