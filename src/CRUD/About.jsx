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
        otherLink : ""
     }

     //********************* Functional Coding Area Starts ****************************

    //---------------------------- CREATE OPERATION -----------------------

     //method for inserting the Personal Details data into the DB
     insertPersonalData = option => {

        if(this.state.name === "" || this.state.designation === "" || this.state.about === "" || this.state.dp === null){
            //check for the empty name, designation, about field
            console.log("Please enter All the Values")

        }else{

                let found  = true

                if(option === "insert"){
                    
                    this.state.gun.get('Informations').get("Personal Details").once((data, key)=>{
                        if(typeof data === "undefined")
                            found = false

                        if(found === true){
                            console.log("The Details are already inserted")
                        }
                    });
                }

                if(option === "update" || found === false){
                    //lets insert the Detials
                    let obj = {
                        name        : this.state.name,
                        designation : this.state.designation,
                        about       : this.state.about
                    }

                    //insert the Object containig the detailed of the project excluding the images.
                    this.state.gun.get('Informations').get("Personal Details").put( obj )

                    //insert the image into the object, Call PROMISE with iterating the IMAGES and create IMAGE HASHES Array
                    if(this.state.dp){
                        readers(this.state.dp)
                        .then(res => {
                            console.log(res)  
                            this.state.gun.get('Informations').get("Personal Details").get("DP").put( res )
            
                        }) 
                    } 

                    console.log("Record Inserted", obj) 
                } 
                
            }           
    }

    insertContactData = option => {

        if(this.state.email === "" || this.state.mobile === "" || this.state.otherLink === ""){
            //check for the empty name, designation, about field
            console.log("Please enter All the Values")

        }else{

            if(option === "other"){
                //lets insert the Other Detials
                let obj = {
                    email : this.state.email,
                    mobile : this.state.mobile,
                    otherLink : this.state.otherLink
                }

                 //insert the Object containig the detailed of the project excluding the images.
                 this.state.gun.get('Informations').get("Contact Details").get("Other Details").put( obj )
                 console.log("Record is inserted")
            }

            if(option === "social"){
                //lets insert the Socail Details
            }
        }
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

    //******************** Event Handlers Ended *********************************************

    //******************** Graphic Rendering Started ****************************************
    
    render() { 
        return ( 
            <div>
                <h1>This is About</h1>
                <div>Personal Details</div>
                <br/>
                <input type="text" onChange={evt => this.updateName(evt)} placeholder="Full Name" required/>
                <input type="text" onChange={evt => this.updateDesignation(evt)} placeholder="Designation" />
                <input type="text" onChange={evt => this.updateAbout(evt)} placeholder="About"/>
                <input type="file" onChange={evt => this.getDP(evt)} />
                <br/>
                <button onClick={() => this.insertPersonalData("insert")}>Insert Data</button>
                <button onClick={() => this.insertPersonalData("update")}>Update Data</button>
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
                <br/>
                <button onClick={() => this.insertContactData("other")}>Insert Other Data</button>
                <button onClick={this.showContactStructure}>Show Strut</button>
                <br/>

            </div>
         );
    }

     //******************** Event Handlers Started *******************************************
}
 
export default ABOUT;