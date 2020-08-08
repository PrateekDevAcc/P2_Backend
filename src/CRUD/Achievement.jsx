import React, { Component } from 'react';
import { readers } from '../utility/ipfsStore';
import Util from '../utility/Util';
import firebase from '../utility/firebase'

const firestore = firebase.firestore();

class Achievements extends Component {

    constructor(props){
        super(props)
        this.Util = new Util();
    }


     //********************* Functional Coding Area Starts ****************************

    //---------------------------- CREATE OPERATION -----------------------

     //method for inserting/updating the Skills Details data into the DB
    insertSkillsData = (skillName, skillValue) => {

         //code for inserting social contact details
         if(skillValue === "" || skillName === ""){
            //check for the empty skill name, skill value field
            alert("Please enter All the Values")

        }else{

            // let checkUniqueness = this.state.gun.get('Conquest').get('Skills Details').get(`skill_${skillName}`);
            
           // if(checkUniqueness['_'].put == undefined){

                //insert the Object containig the detailed of the project excluding the images.  
                firestore
                    .collection('Conquest')
                    .doc('Skills')
                    .update({
                        [skillName] : skillValue
                    }).then(() => console.log('Skills are updated.'))

           // }else{
           //     console.log("This Skill is already been Inserted.");
           // }

        }           
    }

     //method for inserting/updating the Certificate Details data into the DB
    insertCertificatesData = (certName, certData) => {

            if(certName === "" || certData.description === "" || certData.image === null){
                //check for the empty short name, description, image field
                alert("Please enter All the Values")
    
            }else{

                if(typeof certData.image == 'string'){

                    //insert the Object containig the detailed of the Certificates including with images.
                    firestore
                    .collection('Conquest')
                    .doc('Certificates')
                    .update({
                        [certData.name] : certData
                    }).then(() => console.log('Certificate Details are updated.'))

                }else if(typeof certData.image == 'object'){

                    readers(certData.image)
                    .then(res => {
                        //console.log(res) 
                        certData.image = res
                        //insert the Object containig the detailed of the Certificates including with images.
                        firestore
                            .collection('Conquest')
                            .doc('Certificates')
                            .update({
                                [certData.name] : certData
                            }).then(() => console.log('Certificate Details are updated.'))
                        // this.state.gun.get('Conquest').get('Certificate Details').get(`cert_${certName}`).put( certData )
                     
                    })
                }  
                    
                
                // }else{
                //     alert("This Certification is already been Inserted.");
                // }
                
            }                    
    }


    //---------------------------- READ OPERATION -----------------------

    getSkillsRecord = new Promise( resolve => {

        firestore
            .collection('Conquest')
            .doc('Skills')
            .onSnapshot(snap => {   
                let skillsRecord = snap.data()
                //console.log(personalRecord)
                resolve(skillsRecord)
            })

    })

    getCertRecord = new Promise( resolve => {

        firestore
            .collection('Conquest')
            .doc('Certificates')
            .onSnapshot(snap => {   
                let certificatesRecord = snap.data()
                //console.log(personalRecord)
                resolve(certificatesRecord)
            })
    })

    //---------------------------- DELETE OPERATION -------------------------

    //delete the Skills from the DB
    deleteSkill  = skillName => {

        let field = {
            [skillName] : firebase.firestore.FieldValue.delete()
        }
    
        firestore
            .collection('Conquest')
            .doc('Skills')
            .update(field).then(() => console.log("skills is deleted"))
    }

    //delete the Certificate details from the DB
    deleteCert = certName => {

        let field = {
            [certName] : firebase.firestore.FieldValue.delete()
        }
    
        firestore
            .collection('Conquest')
            .doc('Certificates')
            .update(field).then(() => console.log("Certifcate is deleted"))

    }
    
    //******************** Functional Coding Area is Ended **********************************

    //******************** Event Handlers Started *******************************************

    // updateSkillName = evt => this.setState({ skillName : evt.target.value })

    // updateSkillValue = evt => this.setState({ skillValue : evt.target.value })

    // getCertImage = evt => this.setState({ certImg : evt.target.files[0] })

    // updateSCName = evt => this.setState({ shortCName : evt.target.value })
    
    // updateCertDesc = evt => this.setState({ certDesc : evt.target.value })

    //******************** Event Handlers Ended *********************************************

    //******************** Graphic Rendering Started ****************************************
    
    render() { 
        return ( 
            <></>
            // <div>
            //     <h2>This is Achievements</h2>
            //     <div>Skills Details</div>
            //     <br/>
            //     <input type="text" onChange={evt => this.updateSkillName(evt)} placeholder="Skill Name" />
            //     <input type="text" onChange={evt => this.updateSkillValue(evt)} placeholder="1/3/5" />                
            //     <br/>
            //     <button onClick={this.insertSkillsData}>Insert/Update Data</button>
            //     <button onClick={this.deleteSkill}>Delete Skill</button>
            //     <button onClick={this.getSkillsRecord}>Show Strut</button>
            //     <br/>
            //     <br/>
            //     <div>Certificates Details</div>
            //     <br/>
            //     <input type="text" onChange={evt => this.updateSCName(evt)} placeholder="Short Cert Name" />
            //     <input type="text" onChange={evt => this.updateCertDesc(evt)} placeholder="Certification Description" />
            //     <input type="file" onChange={evt => this.getCertImage(evt)} />
            //     <br/>
            //     <button onClick={this.insertCertificatesData}>Insert/Update Other Data</button>
            //     <button onClick={this.deleteCert}>Delete Certificate</button>
            //     <button onClick={this.getCertRecord}>Show Strut</button>
            // </div>
         );
    }

     //******************** Graphic Rendering Ends *******************************************

}
 
export default Achievements;