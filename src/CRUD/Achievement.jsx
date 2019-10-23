import React, { Component } from 'react';
import { readers } from '../ipfsStore';

class Achievements extends Component {

    state = { 
        gun : this.props.gun,
        skillName : "",
        skillValue : "",
        certImg : null,
        shortCName : "",
        certDesc : ""
     }

     //********************* Functional Coding Area Starts ****************************

    //---------------------------- CREATE & UPDATE OPERATION -----------------------

     //method for inserting/updating the Skills Details data into the DB
     insertSkillsData = () => {

         //code for inserting social contact details
         if(this.state.skillValue === "" || this.state.skillName === ""){
            //check for the empty skill name, skill value field
            console.log("Please enter All the Values")

        }else{

            //insert the Object containig the detailed of the project excluding the images.
            this.state.gun.get('Conquest').get('Skills Details').get(`skill_${this.state.skillName}`).put( this.state.skillValue )
            console.log("Record is inserted")

        }           
    }

     //method for inserting/updating the Certificate Details data into the DB
    insertCertificatesData = () => {

            if(this.state.shortCName === "" || this.state.certDesc === "" || this.state.certImg === null){
                //check for the empty short name, description, image field
                console.log("Please enter All the Values")
    
            }else{

                readers(this.state.certImg)
                .then(res => {
                    console.log(res) 

                    let obj = {
                        shortName : this.state.shortCName,
                        Description : this.state.certDesc,
                        Image : res
                    }
    
                    //insert the Object containig the detailed of the Certificates including with images.
                    this.state.gun.get('Conquest').get('Certificate Details').get(`cert_${this.state.shortCName}`).put( obj )
                    console.log("Record is inserted")   
                })
                
            }                    
    }


    //---------------------------- READ OPERATION -----------------------

    //Get the Structure of the Conquest Root Node 
    showConquestStructure = () => {

        ////itreating in the sub-directory of Master directory (Projects->this.state.name) to fetch the Data
        this.state.gun.get('Conquest').map((data, key)=>{
            console.log(data, key)
        })
        
        
    }

    showCertificatesStructure = () => {

        ////itreating in the sub-directory of Master directory (Projects->this.state.name) to fetch the Data
        this.state.gun.get('Conquest').get("Certificate Details").map((data, key)=>{
            console.log(data, key)
        })
        
        
    }
    
    //******************** Functional Coding Area is Ended **********************************

    //******************** Event Handlers Started *******************************************

    updateSkillName = evt => this.setState({ skillName : evt.target.value })

    updateSkillValue = evt => this.setState({ skillValue : evt.target.value })

    getCertImage = evt => this.setState({ certImg : evt.target.files[0] })

    updateSCName = evt => this.setState({ shortCName : evt.target.value })
    
    updateCertDesc = evt => this.setState({ certDesc : evt.target.value })

    //******************** Event Handlers Ended *********************************************

    //******************** Graphic Rendering Started ****************************************
    
    render() { 
        return ( 
            <div>
                <h2>This is Achievements</h2>
                <div>Skills Details</div>
                <br/>
                <input type="text" onChange={evt => this.updateSkillName(evt)} placeholder="Skill Name" />
                <input type="text" onChange={evt => this.updateSkillValue(evt)} placeholder="1/3/5" />                
                <br/>
                <button onClick={this.insertSkillsData}>Insert/Update Data</button>
                <button onClick={this.showConquestStructure}>Show Strut</button>
                <br/>
                <br/>
                <div>Certificates Details</div>
                <br/>
                <input type="text" onChange={evt => this.updateSCName(evt)} placeholder="Short Cert Name" />
                <input type="text" onChange={evt => this.updateCertDesc(evt)} placeholder="Certification Description" />
                <input type="file" onChange={evt => this.getCertImage(evt)} />
                <button onClick={this.insertCertificatesData}>Insert/Update Other Data</button>
                <button onClick={this.showCertificatesStructure}>Show Strut</button>
            </div>
         );
    }

     //******************** Event Handlers Started *******************************************

}
 
export default Achievements;