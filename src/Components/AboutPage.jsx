import React, { Component } from 'react';
import About from "../CRUD/About";
import { Grid, Button, Fab, Input, InputLabel, TextField, FormControl, Select, MenuItem, FormHelperText, IconButton } from '@material-ui/core';
import '../Style/AboutPage.css'
import FilterTiltShift from '@material-ui/icons/FilterTiltShift'
import Create from '@material-ui/icons/Create'
import LockOpen from '@material-ui/icons/LockOpen'
import AddAPhoto from '@material-ui/icons/AddAPhoto'


class AboutPage extends Component {

    constructor(props){
        super(props)
        this.aboutObj = new About(this.props);
        this.personalRecord = this.aboutObj.getPersonalRecord();
        this.contactRecord = this.aboutObj.getContactRecord();    
        this.socialRecord = this.aboutObj.getSocialRecord();    
    }

    state = { 
        activeStep : 0,//make it 0 after dev
        isNotEditable : true,
        selectedProfile : '',
        selectedProfileUrl : '',
        personalRecord : '',
        contactRecord : '',
        socialRecord : '',
        imagePerview : ''
    }

    UNSAFE_componentWillMount(){
        this.setState({ 
            personalRecord : this.personalRecord,
            contactRecord : this.contactRecord,
            socialRecord : this.socialRecord,
            imagePerview : `https://ipfs.infura.io/ipfs/${this.personalRecord.DP}`
        }) 
        console.log(this.contactRecord)
    }

    handleBack = () => this.setState({ activeStep : this.state.activeStep - 1 }) 

    handleNext = () => this.setState({ activeStep : this.state.activeStep + 1 })

    handleEdit = () => this.setState({ isNotEditable : !this.state.isNotEditable })

    handleSocialProfileChange = evt => this.setState({ selectedProfile : evt.target.value })

    handleDesignationInput = evt => {
        let tempObj = this.state.personalRecord
        tempObj.designation = evt.target.value
        this.setState({ personalRecord : tempObj })
    }

    handleAboutInput = evt => {
        let tempObj = this.state.personalRecord
        tempObj.about = evt.target.value
        this.setState({ personalRecord : tempObj })
    }

    handleEmailText = evt => {
        let tempObj = this.state.contactRecord
        tempObj.email = evt.target.value
        this.setState({ contactRecord : tempObj })
    }

    handleMobileText = evt => {
        let tempObj = this.state.contactRecord
        tempObj.mobile = evt.target.value
        this.setState({ contactRecord : tempObj })
    }

    handleOtherLinkText = evt => {
        let tempObj = this.state.contactRecord
        tempObj.otherLink = evt.target.value
        this.setState({ contactRecord : tempObj })
    }

    handleSocialNameText = evt => {
        this.setState({ selectedProfile : evt.target.value })
    }

    handleSocialUrlText = evt => {
        this.setState({ selectedProfileUrl : evt.target.value })
    }

    handleAboutImage = evt => {
        let tempObj = this.state.personalRecord
        tempObj.DP = evt.target.files[0]
        this.setState({ imagePerview : URL.createObjectURL(evt.target.files[0]), personalRecord : tempObj })
    }
    
    saveChanges = () => {
        alert("Do You sure for Saving !")
        this.aboutObj.insertPersonalData(this.state.personalRecord)
        this.aboutObj.insertContactData('contact', this.state.contactRecord)     
    }

    addSocialProfile = () => {
        let tempObj = this.state.socialRecord
        tempObj[this.state.selectedProfile] = this.state.selectedProfileUrl
        this.setState({ socialRecord : tempObj })

        let socialData = {
            socialName : this.state.selectedProfile,
            socialLink : this.state.selectedProfileUrl
        }
        this.aboutObj.insertContactData('social', socialData )
        this.setState({ socialRecord : this.aboutObj.getSocialRecord() })
    }
    
    populateSocialProfiles = () => {
        return (
            Object.keys(this.state.socialRecord).map( key =>  <MenuItem key={key} value={key}>{key}</MenuItem> )
        )
    }

    render() { 
        return ( 
            <>
                {/* Header */}
                <Grid container justify="center" alignItems="center" className="stepper_header">
                    <Grid item sm={6} container justify="center" alignItems="center" className={this.state.activeStep == 0 ? "stepper_step" : "stepper_step_disable"}>
                        <FilterTiltShift item="true" sm={2} className={this.state.activeStep == 0 ? "stepperStep_icon" : "stepperStep_icon_disable"}/>
                        <div item="true" sm={10} className="step_label">Personal Details</div>
                    </Grid>
                    <Grid item sm={6} container justify="center" alignItems="center" className={this.state.activeStep == 1 ? "stepper_step" : "stepper_step_disable"}>
                        <FilterTiltShift className={this.state.activeStep == 1 ? "stepperStep_icon" : "stepperStep_icon_disable"}/>
                        <div item="true" sm={12} className="step_label">Contact Details</div>
                    </Grid>
                </Grid>
                {/* Body or section of content */}
                <Grid container justif="center" alignItems="center" className="stepper_body"> 
                    {
                        this.state.activeStep == 0 ?
                        // Personal Detials Section
                        <Grid item sm={12} container justify="center" alignItems="center" className="stepper_body_container">
                            <Grid item sm={5} container justify="center" alignItems="center" className="dp_container">
                                <div className="dp">
                                    <img src={this.state.imagePerview} className="thumbnail_image" id="aboutImagePreview"/>
                                </div>
                                <input
                                    accept="image/*"
                                    type="file" 
                                    id="add_cert_image_btn"   
                                    onChange={evt => this.handleAboutImage(evt)}
                                /> 
                                <label htmlFor="add_cert_image_btn">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <AddAPhoto />
                                    </IconButton>
                                </label> 
                            </Grid>
                            <Grid item sm={7} container direction="row" justify="flex-start" alignItems="center" className="personal_details_container">
                                <Grid item container >
                                    <div item="ture" sm={12} className="form_element" id="name">{this.state.personalRecord.name}</div>
                                </Grid>
                                <Grid item container>
                                    { 
                                        this.state.isNotEditable ?
                                        <Create className="editIcon" onClick={this.handleEdit}/>
                                        : <LockOpen className="editIcon" onClick={this.handleEdit} />
                                    }
                                    <Input 
                                        item="true" 
                                        sm={12}
                                        type="text" 
                                        className="form_element" 
                                        id="designation" 
                                        defaultValue={this.state.personalRecord.designation}
                                        onChange={this.handleDesignationInput}
                                        disabled={this.state.isNotEditable}
                                    />    
                                </Grid>
                                <Grid item container>
                                    { 
                                        this.state.isNotEditable ?
                                        <Create className="editIcon" onClick={this.handleEdit}/>
                                        : <LockOpen className="editIcon" onClick={this.handleEdit} />
                                    }
                                    <TextField 
                                        item="true" 
                                        sm={12} 
                                        className="form_element" 
                                        id="description" 
                                        multiline 
                                        rowsMax="4"
                                        defaultValue={this.state.personalRecord.about}
                                        onChange={this.handleAboutInput}
                                        disabled={this.state.isNotEditable}
                                    />    
                                </Grid>
                            </Grid>
                        </Grid>
                        :
                        // Contact Details Section
                        <Grid item sm={12} container justify="center" alignItems="center" className="stepper_body_container">
                            <Grid item sm={6} container direction="row" justify="flex-start" alignItems="flex-start" className="contact1_container">
                                <Grid item container sm={12} direction="row" justify="center" alignItems="center" className="form_element_row">
                                    <Select value={this.state.selectedProfile} onChange={this.handleSocialProfileChange} displayEmpty id="socail_drop_down">
                                    <MenuItem value="" disabled>
                                        Social Profile
                                    </MenuItem>
                                    {
                                        this.populateSocialProfiles()
                                    }
                                    </Select>
                                </Grid>
                                <Grid item container sm={12} direction="row" justify="center" alignItems="center" className="form_element_row">
                                    <TextField item="true" sm={6} className="contact_form_label" id="social_name" type="text" onChange={this.handleSocialNameText} value={this.state.selectedProfile} />
                                    <TextField item="true" sm={6} className="contact_form_textfield" id="social_url" type="text" onChange={this.handleSocialUrlText} value={this.state.socialRecord[this.state.selectedProfile]} />
                                </Grid>
                                <Grid item container sm={12} direction="row" justify="center" alignItems="center" className="form_element_row">
                                    <Button
                                        item="true" 
                                        sm={12}
                                        variant="contained"
                                        size="small"
                                        color="primary" 
                                        id="add_social_profile_btn"   
                                        onClick={this.addSocialProfile}
                                    >
                                        +
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item sm={6} container direction="row" justify="flex-start" alignItems="flex-start" className="contact2_container">
                                <Grid item container sm={12} direction="row" justify="center" alignItems="center" className="form_element_row">
                                        <div item="true" sm={6} htmlFor="email" className="contact_form_label">Contact Email</div>
                                        <TextField item="true" sm={6} className="contact_form_textfield" id="email" type="email" onChange={this.handleEmailText} defaultValue={this.state.contactRecord.email} disabled={this.state.isNotEditable}/>
                                        { 
                                            this.state.isNotEditable ?
                                            <Create className="editIcon" onClick={this.handleEdit}/>
                                            : <LockOpen className="editIcon" onClick={this.handleEdit} />
                                        }
                                </Grid>
                                <Grid item container sm={12} direction="row" justify="center" alignItems="center" className="form_element_row">
                                        <div item="true" sm={6} htmlFor="mobile" className="contact_form_label">Mobile No.</div>
                                        <TextField item="true" sm={6} className="contact_form_textfield" id="mobile" type="text" onChange={this.handleMobileText} defaultValue={this.state.contactRecord.mobile} disabled={this.state.isNotEditable}/>
                                        { 
                                            this.state.isNotEditable ?
                                            <Create className="editIcon" onClick={this.handleEdit}/>
                                            : <LockOpen className="editIcon" onClick={this.handleEdit} />
                                        }
                                </Grid>
                                <Grid item container sm={12} direction="row" justify="center" alignItems="center" className="form_element_row">
                                        <div item="true" sm={6} htmlFor="contactLink" className="contact_form_label">Contact Link</div>
                                        <TextField item="true" sm={6} className="contact_form_textfield" id="contactLink" type="text" onChange={this.handleOtherLinkText} defaultValue={this.state.contactRecord.otherLink} disabled={this.state.isNotEditable}/>
                                        { 
                                            this.state.isNotEditable ?
                                            <Create className="editIcon" onClick={this.handleEdit}/>
                                            : <LockOpen className="editIcon" onClick={this.handleEdit} />
                                        }
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                </Grid>
                {/* footer */}
                <Grid container justify="flex-end" alignItems="center" className="stepper_footer">  
                    {
                        this.state.activeStep == 0 ?
                        <Button
                            item="true" 
                            sm={6}
                            variant="contained"
                            size="small"
                            color="primary" 
                            className="stepper_btn"   
                            onClick={this.handleNext}
                        >
                            Next
                        </Button>
                        :<> 
                        <Button
                            item="true" 
                            sm={6}
                            size="small"
                            className="stepper_back_btn" 
                            onClick={this.handleBack}   
                        >
                            Back
                        </Button>
                        <Button
                            item="true" 
                            sm={6}
                            variant="contained"
                            size="small"
                            color="primary" 
                            className="stepper_btn" 
                            onClick={this.saveChanges}  
                        >
                            Save
                        </Button>
                        </>
                    }                 
                </Grid>
            </>
        );
    }

}
 
export default AboutPage;