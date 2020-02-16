import React, { Component } from 'react';
import About from "../CRUD/About";
import { Grid, Button, Fab, Input, InputLabel, TextField, FormControl, Select, MenuItem, FormHelperText } from '@material-ui/core';
import '../Style/AboutPage.css'
import FilterTiltShift from '@material-ui/icons/FilterTiltShift'
import Create from '@material-ui/icons/Create'
import LockOpen from '@material-ui/icons/LockOpen'


class AboutPage extends Component {
    state = { 
        activeStep : 1,//make it 0 after dev
        isNotEditable : true,
        socialProfiles : [
           { linkedin : "linkedin.com/prateekmedy"},
           { facebook : "facebook.com/ansh_medy"},
           { github   :  "github.com/prateekmedy"},
           { instagram : "intagram.com/prateek.peet"}
        ],
        selectedProfile : ""
    }

    handleBack = () => this.setState({ activeStep : this.state.activeStep - 1 }) 

    handleNext = () => this.setState({ activeStep : this.state.activeStep + 1 })

    handleEdit = () => this.setState({ isNotEditable : !this.state.isNotEditable })

    handleSocialProfileChange = evt => { this.setState({ selectedProfile : evt.target.value }) }
    
    saveChanges = () => {
        alert("Do You sure for Saving !")
    }
    
    populateSocialProfiles = () => {
        return (
            this.state.socialProfiles.map( key =>  <MenuItem key={Object.keys(key)[0]} value={Object.keys(key)[0]}>{Object.keys(key)[0]}</MenuItem> )
        )
    }

    render() { 
        let value = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda maiores iusto modi voluptatem accusamus id eligendi animi";
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
                                <div className="dp"></div>
                            </Grid>
                            <Grid item sm={7} container direction="row" justify="flex-start" alignItems="center" className="personal_details_container">
                                <Grid item container >
                                    <div item="ture" sm={12} className="form_element" id="name">Prateek Patel</div>
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
                                        defaultValue="Designation"
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
                                        defaultValue={value}
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
                                    <Select value={this.state.selectedProfile} onChange={evt => this.handleSocialProfileChange(evt)} displayEmpty id="socail_drop_down">
                                    <MenuItem value="" disabled>
                                        Social Profile
                                    </MenuItem>
                                    {
                                        this.populateSocialProfiles()
                                    }
                                    </Select>
                                </Grid>
                                <Grid item container sm={12} direction="row" justify="center" alignItems="center" className="form_element_row">
                                    <TextField item="true" sm={6} className="contact_form_label" id="social_name" type="text" value={this.state.selectedProfile} />
                                    <TextField item="true" sm={6} className="contact_form_textfield" id="social_url" type="text" value="" />
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
                                        <TextField item="true" sm={6} className="contact_form_textfield" id="email" type="email" defaultValue="prateekmedy@gmail.com" disabled={this.state.isNotEditable}/>
                                        { 
                                            this.state.isNotEditable ?
                                            <Create className="editIcon" onClick={this.handleEdit}/>
                                            : <LockOpen className="editIcon" onClick={this.handleEdit} />
                                        }
                                </Grid>
                                <Grid item container sm={12} direction="row" justify="center" alignItems="center" className="form_element_row">
                                        <div item="true" sm={6} htmlFor="mobile" className="contact_form_label">Mobile No.</div>
                                        <TextField item="true" sm={6} className="contact_form_textfield" id="mobile" type="text" defaultValue="+91 8871697651" disabled={this.state.isNotEditable}/>
                                        { 
                                            this.state.isNotEditable ?
                                            <Create className="editIcon" onClick={this.handleEdit}/>
                                            : <LockOpen className="editIcon" onClick={this.handleEdit} />
                                        }
                                </Grid>
                                <Grid item container sm={12} direction="row" justify="center" alignItems="center" className="form_element_row">
                                        <div item="true" sm={6} htmlFor="contactLink" className="contact_form_label">Contact Link</div>
                                        <TextField item="true" sm={6} className="contact_form_textfield" id="contactLink" type="text" defaultValue="https://prateekportfolio1.ml" disabled={this.state.isNotEditable}/>
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