import React, { Component } from 'react';
import { readers } from '../ipfsStore'

class ABOUT extends Component {
    state = { 
        gun : this.props.gun,
        name : "",
        dp : null,
        designation : "",
        about : "",
        email : "",
        mobile : "",
        otherLink : "",
        socialName : "",
        socialLink : ""
     }

     //********************* Functional Coding Area Starts ****************************

    //---------------------------- CREATE & UPDATE OPERATION -----------------------

     //method for inserting/updating the Personal Details data into the DB
     insertPersonalData = () => {

        if(this.state.name === "" || this.state.designation === "" || this.state.about === ""){
            //check for the empty name, designation, about field
            console.log("Please enter All the Values")

        }else{

                
            //lets insert the Detials
            let obj = {
                name        : this.state.name,
                designation : this.state.designation,
                about       : this.state.about
            }

            
            //insert the Object containig the detailed of the project excluding the images.
            this.state.gun.get('Informations').get("Personal Details").put( obj )

            if(this.state.dp) this.uploadDP()
            
            console.log("Record Inserted", obj) 
        
          
            }           
    }

     //method for inserting/updating the Contact Details data into the DB
    insertContactData = option => {

        if(option === "other"){
            //code for inserting Other Contact details
            if(this.state.email === "" || this.state.mobile === "" || this.state.otherLink === ""){
                //check for the empty name, designation, about field
                console.log("Please enter All the Values")
    
            }else{

                let obj = {
                    email : this.state.email,
                    mobile : this.state.mobile,
                    otherLink : this.state.otherLink
                }

                //insert the Object containig the detailed of the project excluding the images.
                this.state.gun.get('Informations').get("Contact Details").get("Other Details").put( obj )
                console.log("Record is inserted")

            }
        }
          
        if(option === "social"){
            //code for inserting social contact details
            if(this.state.socialLink === "" || this.state.socialName === ""){
                //check for the empty socail platform name, social link field
                console.log("Please enter All the Values")
    
            }else{

                //insert the Object containig the detailed of the project excluding the images.
                this.state.gun.get('Informations').get('Contact Details').get("Social Details").get(`social_${this.state.socialName}`).put( this.state.socialLink )
                console.log("Record is inserted")

            }
        }
                
    }

    uploadDP = () => {
        //insert the image into the object, Call PROMISE with iterating the IMAGES and create IMAGE HASHES Array
        readers(this.state.dp)
        .then(res => {
            console.log(res)  
            this.state.gun.get('Informations').get("Personal Details").get("DP").put( res ) 
        })
    }


    //---------------------------- READ OPERATION -----------------------

    //Get the Structure of the Project Root Node 
    showPersonalStructure = () => {

        ////itreating in the sub-directory of Master directory (Projects->this.state.name) to fetch the Data
        this.state.gun.get('Informations').map((data, key)=>{
            console.log(data, key)
        })
        
        
    }

    showContactStructure = () => {

        ////itreating in the sub-directory of Master directory (Projects->this.state.name) to fetch the Data
        this.state.gun.get('Informations').get("Contact Details").map((data, key)=>{
            console.log(data, key)
        })
        
        
    }

    //displaying single conplete record
    viewData = () => {

        if(this.state.name === ""){
            console.log("No Record Found")
        }else{

            //fetching the Data Node
            this.state.gun.get('Projects').get(this.state.name).get("Data").once((data, key)=>{
                console.log(key, data)
            });

            //fetching the Images Node
            this.state.gun.get('Projects').get(this.state.name).get("Images").once((data, key)=>{
                console.log(key, data)
            });
        }
    }
    
    
    //******************** Functional Coding Area is Ended **********************************

    //******************** Event Handlers Started *******************************************

    updateName = evt => this.setState({ name : evt.target.value })

    updateDesignation = evt => this.setState({ designation : evt.target.value })

    updateAbout = evt => this.setState({ about : evt.target.value })

    getDP = evt => this.setState({ dp : evt.target.files[0] })

    updateEmail = evt => this.setState({ email : evt.target.value })
    
    updateMobile = evt => this.setState({ mobile : evt.target.value })

    updateOtherLink = evt => this.setState({ otherLink : evt.target.value })

    updateSocailName = evt => this.setState({ socialName : evt.target.value })
    
    updateSocailLink = evt => this.setState({ socialLink : evt.target.value })

    //******************** Event Handlers Ended *********************************************

    //******************** Graphic Rendering Started ****************************************
    
    render() { 
        return ( 
            <div>
                <h1>This is About</h1>
                <div>Personal Details</div>
                <br/>
                <input type="text" onChange={evt => this.updateName(evt)} placeholder="Full Name" value={this.state.name} />
                <input type="text" onChange={evt => this.updateDesignation(evt)} placeholder="Designation" />
                <input type="text" onChange={evt => this.updateAbout(evt)} placeholder="About"/>
                <input type="file" onChange={evt => this.getDP(evt)} />
                <br/>
                <button onClick={this.insertPersonalData}>Insert Data</button>
                <button onClick={this.insertPersonalData}>Update Data</button>
                <button onClick={this.showPersonalStructure}>Show Strut</button>
                <br/>
                <br/>
                <div>Contact Details</div>
                <br/>
                Other Details
                <br/>
                <input type="text" onChange={evt => this.updateEmail(evt)} placeholder="Email ID" />
                <input type="text" onChange={evt => this.updateMobile(evt)} placeholder="Mobile Number" />
                <input type="text" onChange={evt => this.updateOtherLink(evt)} placeholder="Other Link"/>
                <button onClick={() => this.insertContactData("other")}>Insert/Update Other Data</button>
                <br/>
                Social Links
                <br/>
                <input type="text" onChange={evt => this.updateSocailName(evt)} placeholder="Socail Platform Name"/>
                <input type="text" onChange={evt => this.updateSocailLink(evt)} placeholder="URL"/>
                <button onClick={() => this.insertContactData("social")}>Add Link</button>
                <br/>
                <button onClick={this.showContactStructure}>Show Strut</button>
                <br/>

            </div>
         );
    }

     //******************** Event Handlers Started *******************************************
}
 
export default ABOUT;