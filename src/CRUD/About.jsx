import React, { Component } from 'react';
import { readers } from '../ipfsStore'
import Collection from '../Collection';
import Util from '../Util';

const personalRecord = new Collection();
const contactRecord = new Collection();
const socialRecord = new Collection();

class ABOUT extends Component{

    constructor(props){
        super(props)
        this.Util = new Util();
    }

    state = { 
        gun : this.props.gun,
        name : "Prateek Patel",
        dp : null,
        // designation : "",
        // about : "",
        // email : "",
        // mobile : "",
        // otherLink : "",
        // socialName : "",
        // socialLink : ""
     }

     //********************* Functional Coding Area Starts ****************************

    //---------------------------- CREATE & UPDATE OPERATION -----------------------

     //method for inserting/updating the Personal Details data into the DB
     insertPersonalData = personalData => {

        if(this.state.name === "" || personalData.designation === "" || personalData.about === ""){
            //check for the empty name, designation, about field
            alert("Please enter All the Values")

        }else{
                
            //lets insert the Detials
            let obj = {
                name        : this.state.name,
                designation : personalData.designation,
                about       : personalData.about
            }

            //insert the Object containig the detailed of the project excluding the images.
            this.state.gun.get('Informations').get("Personal Details").put( obj )

            if(personalData.DP) this.uploadDP(personalData.DP)
            
            //console.log("Record Inserted", obj) 
            console.log("Record Inserted") 
               
        }           
    }

     //method for inserting/updating the Contact Details data into the DB
    insertContactData = (option, data) => {

        if(option === "contact"){
            //code for inserting Other Contact details
            if(data.email === "" || data.mobile === "" || data.otherLink === ""){
                //check for the empty name, designation, about field
                alert("Please enter All the Values")
    
            }else{

                //insert the Object containig the detailed of the project excluding the images.
                this.state.gun.get('Informations').get("Contact Details").get("Other Details").put( data )
                //console.log("Record is inserted", data)
                console.log("Record is inserted")

            }
        }
          
        if(option === "social"){
            //code for inserting social contact details
            if(data.socialLink === "" || data.socialName === ""){
                //check for the empty socail platform name, social link field
                alert("Please enter All the Values")
    
            }else{

                //insert the Object containig the detailed of the project excluding the images.
                this.state.gun.get('Informations').get('Contact Details').get("Social Details").get(`social_${data.socialName}`).put( data.socialLink )
                console.log("Record is inserted")

            }
        }
                
    }

    uploadDP = dp => {
        //insert the image into the object, Call PROMISE with iterating the IMAGES and create IMAGE HASHES Array
        readers(dp)
        .then(res => {
            //console.log(res)  
            this.state.gun.get('Informations').get("Personal Details").get("DP").put( res ) 
        })
    }


    //---------------------------- READ OPERATION -----------------------

    getPersonalRecord = () => {
        this.state.gun.get('Informations').get("Personal Details").map((data, key)=>{
            if(data != null){
                personalRecord.add(key, data)
            }
        })
        return personalRecord.collection;
    }

    getContactRecord = () => {
        this.state.gun.get('Informations').get("Contact Details").get("Other Details").map((data, key)=>{
            if(data != null){
                contactRecord.add(key, data)
            }
        })
        return contactRecord.collection;
    }

    getSocialRecord = () => {
        this.state.gun.get('Informations').get("Contact Details").get("Social Details").map((data, key)=>{
            if(data != null){
                let newKey = this.Util.splitNode(key)
                socialRecord.add(newKey, data)
            }
        })
        //console.log(socialRecord.collection)
        return socialRecord.collection;
    }


    //---------------------------- DELETE OPERATION -------------------------

    //delete the Social links from the DB
    deleteSocial  = socialName => {

        this.state.gun.get('Informations').get('Contact Details').get("Social Details").get(`social_${socialName}`).put(null)
        //console.log(`${socialName} is deleted`)
    
    }

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%% Things for Debugging %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    
    //******************** Functional Coding Area is Ended **********************************

    //******************** Event Handlers Started *******************************************

    // updateName = evt => this.setState({ name : evt.target.value })

    // updateDesignation = evt => this.setState({ designation : evt.target.value })

    // updateAbout = evt => this.setState({ about : evt.target.value })

    // getDP = evt => this.setState({ dp : evt.target.files[0] })

    // updateEmail = evt => this.setState({ email : evt.target.value })
    
    // updateMobile = evt => this.setState({ mobile : evt.target.value })

    // updateOtherLink = evt => this.setState({ otherLink : evt.target.value })

    // updateSocailName = evt => this.setState({ socialName : evt.target.value })
    
    // updateSocailLink = evt => this.setState({ socialLink : evt.target.value })

    //******************** Event Handlers Ended *********************************************

    //******************** Graphic Rendering Started ****************************************
    
    // render() { 
    //     return ( 
    //         <div>
    //             <h2>This is About</h2>
    //             <div>Personal Details</div>
    //             <br/>
    //             <input type="text" onChange={evt => this.updateName(evt)} placeholder="Full Name" value={this.state.name} />
    //             <input type="text" onChange={evt => this.updateDesignation(evt)} placeholder="Designation" />
    //             <input type="text" onChange={evt => this.updateAbout(evt)} placeholder="About"/>
    //             <input type="file" onChange={evt => this.getDP(evt)} />
    //             <br/>
    //             <button onClick={this.insertPersonalData}>Insert Data</button>
    //             <button onClick={this.insertPersonalData}>Update Data</button>
    //             <button onClick={this.getPersonalRecord}>Show Strut</button>
    //             <br/>
    //             <br/>
    //             <div>Contact Details</div>
    //             <br/>
    //             Other Details
    //             <br/>
    //             <input type="text" onChange={evt => this.updateEmail(evt)} placeholder="Email ID" />
    //             <input type="text" onChange={evt => this.updateMobile(evt)} placeholder="Mobile Number" />
    //             <input type="text" onChange={evt => this.updateOtherLink(evt)} placeholder="Other Link"/>
    //             <button onClick={() => this.insertContactData("other")}>Insert/Update Other Data</button>
    //             <br/>
    //             Social Links
    //             <br/>
    //             <input type="text" onChange={evt => this.updateSocailName(evt)} placeholder="Socail Platform Name"/>
    //             <input type="text" onChange={evt => this.updateSocailLink(evt)} placeholder="URL"/>
    //             <button onClick={() => this.insertContactData("social")}>Add Link</button>
    //             <button onClick={this.deleteSocial}>Delete</button>
    //             <br/>
    //             <button onClick={this.getSocialRecord}>Show Strut</button>
    //             <br/>

    //         </div>
    //      );
    // }

}
 
export default ABOUT;