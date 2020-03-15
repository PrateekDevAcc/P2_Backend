import React, { Component } from 'react';
import { readers } from '../ipfsStore';
import Collection from '../Collection';
import Util from '../Util';

const skillRecord = new Collection();
const certRecord = new Collection();


class Achievements extends Component {

    constructor(props){
        super(props)
        this.Util = new Util();
    }

    state = { 
        gun : this.props.gun
     }

     //********************* Functional Coding Area Starts ****************************

    //---------------------------- CREATE OPERATION -----------------------

     //method for inserting/updating the Skills Details data into the DB
    insertSkillsData = (skillName, skillValue) => {

         //code for inserting social contact details
         if(skillValue === "" || skillName === ""){
            //check for the empty skill name, skill value field
            console.log("Please enter All the Values")

        }else{

            let checkUniqueness = this.state.gun.get('Conquest').get('Skills Details').get(`skill_${skillName}`);
            
           if(checkUniqueness['_'].put == undefined){

                //insert the Object containig the detailed of the project excluding the images.
                this.state.gun.get('Conquest').get('Skills Details').get(`skill_${skillName}`).put( skillValue )
                console.log("Record is inserted")

           }else{
               console.log("This Skill is already been Inserted.");
           }

        }           
    }

     //method for inserting/updating the Certificate Details data into the DB
    insertCertificatesData = (certName, certData) => {

            if(certName === "" || certData.description === "" || certData.image === null){
                //check for the empty short name, description, image field
                console.log("Please enter All the Values")
    
            }else{

                let checkUniqueness = this.state.gun.get('Conquest').get('Certificate Details').get(`cert_${certName}`);
            
                if(checkUniqueness['_'].put == undefined){

                    readers(certData.image)
                    .then(res => {
                        console.log(res) 
                        certData.image = res
                        //insert the Object containig the detailed of the Certificates including with images.
                        this.state.gun.get('Conquest').get('Certificate Details').get(`cert_${certName}`).put( certData )
                        console.log("Record is inserted")   
                    })
                
                }else{
                    console.log("This Certification is already been Inserted.");
                }
                
            }                    
    }


    //---------------------------- READ OPERATION -----------------------

    getSkillsRecord = () => {

        this.state.gun.get('Conquest').get('Skills Details').map((data, key)=>{
            if(data != null){
                let newKey = this.Util.splitNode(key)
                skillRecord.add(newKey, data)
            }
        })
        return skillRecord.collection;
    }

    getCertRecord = () => {

        this.state.gun.get('Conquest').get("Certificate Details").map((data, key)=>{
            if(data != null){
                let newKey = this.Util.splitNode(key)
                certRecord.add(newKey, data)
            }   
        })
        return certRecord.collection;
    }

    //---------------------------- DELETE OPERATION -------------------------

    //delete the Skills from the DB
    deleteSkill  = skillName => {

        let checkUniqueness = this.state.gun.get('Conquest').get('Skills Details').get(`skill_${skillName}`);
            
        if(checkUniqueness['_'].put != undefined){
            this.state.gun.get('Conquest').get('Skills Details').get(`skill_${skillName}`).put(null)
            console.log(`${skillName} is deleted`)
        }else{
            console.log("This Skill is not available.");
        }
    }

    //delete the Certificate details from the DB
    deleteCert = certName => {

        let checkUniqueness = this.state.gun.get('Conquest').get('Certificate Details').get(`cert_${certName}`);
            
        if(checkUniqueness['_'].put != undefined){
            this.state.gun.get('Conquest').get('Certificate Details').get(`cert_${certName}`).put( null )
            console.log(`${certName} is deleted`)   
        }else{
            console.log("This Certification is not available.");
        }
    }

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%% Things for Debugging %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    
    //******************** Functional Coding Area is Ended **********************************

    //******************** Event Handlers Started *******************************************

    // updateSkillName = evt => this.setState({ skillName : evt.target.value })

    // updateSkillValue = evt => this.setState({ skillValue : evt.target.value })

    // getCertImage = evt => this.setState({ certImg : evt.target.files[0] })

    // updateSCName = evt => this.setState({ shortCName : evt.target.value })
    
    // updateCertDesc = evt => this.setState({ certDesc : evt.target.value })

    //******************** Event Handlers Ended *********************************************

    //******************** Graphic Rendering Started ****************************************
    
    // render() { 
    //     return ( 
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
    //      );
    // }

     //******************** Graphic Rendering Ends *******************************************

}
 
export default Achievements;