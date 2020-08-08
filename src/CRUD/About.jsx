import React, { Component } from 'react';
import { readers } from '../utility/ipfsStore'
import firebase from '../utility/firebase'

const firestore = firebase.firestore();

class ABOUT extends Component {

    state = { 
        name : "Prateek Patel"
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
            firestore
                .collection('Informations')
                .doc('Personal Details')
                .update(obj).then(() => console.log('Personal Details are updated.'))
            
            if(typeof personalData.image != 'string') 
                this.uploadDP(personalData.image)
            
            //console.log("Record Inserted", obj) 
            console.log("Record Inserted") 
               
        }           
    }

     //method for inserting/updating the Contact Details data into the DB
    insertContactData = (option, data) => {

        if(option === "contact"){
            //code for inserting Other Contact details
            if(data.email === "" || data.mobile === "" || data.website === ""){
                //check for the empty name, designation, about field
                alert("Please enter All the Values")
    
            }else{

                //insert the Object containig the detailed of the project excluding the images.
                firestore
                    .collection('Informations')
                    .doc('Contact Details')
                    .update(data).then(() => console.log('Contact Details are updated.'))

            }
        }
          
        if(option === "social"){

            
            //code for inserting social contact details
            if(data.socialLink === "" || data.socialName === ""){
                //check for the empty socail platform name, social link field
                alert("Please enter All the Values")
    
            }else{

                //insert the Object containig the detailed of the project excluding the images.
                firestore
                    .collection('Informations')
                    .doc('Social Details')
                    .set({
                        [data.socialName] : data.socialLink
                     },{ merge : true }).then(() => console.log('Social Details are updated.'))

            }
        }
                
    }

    uploadDP = dp => {
        //insert the image into the object, Call PROMISE with iterating the IMAGES and create IMAGE HASHES Array
        readers(dp)
        .then(res => {
            //console.log(res)  
            firestore
                .collection('Informations')
                .doc('Personal Details')
                .update({
                    image : res
                }).then(() => console.log('Personal Detail Image is updated.'))
        })
    }


    //---------------------------- READ OPERATION -----------------------

    getPersonalRecord = new Promise( resolve => {

        firestore
            .collection('Informations')
            .doc('Personal Details')
            .onSnapshot(snap => {   
                let personalRecord = snap.data()
                //console.log(personalRecord)
                resolve(personalRecord)
            })
        
    });

    getContactRecord = new Promise( resolve => {

        firestore
            .collection('Informations')
            .doc('Contact Details')
            .onSnapshot(snap => {   
                resolve(snap.data())
            })

    });

    getSocialRecord = new Promise( resolve => {

        firestore
            .collection('Informations')
            .doc('Social Details')
            .onSnapshot(snap => {   
                resolve(snap.data())
            })

    })


    //---------------------------- DELETE OPERATION -------------------------

    //delete the Social links from the DB
    deleteSocial  = (socialName) => {

        let field = {
            [socialName] : firebase.firestore.FieldValue.delete()
        }
    
        firestore
            .collection('Informations')
            .doc('Social Details')
            .update(field).then(() => console.log("social link is deleted"))

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
                {/* <h2>This is About</h2>
                <div>Personal Details</div>
                <br/>
                <input type="text" onChange={evt => this.updateName(evt)} placeholder="Full Name" value={this.state.name} />
                <input type="text" onChange={evt => this.updateDesignation(evt)} placeholder="Designation" />
                <input type="text" onChange={evt => this.updateAbout(evt)} placeholder="About"/>
                <input type="file" onChange={evt => this.getDP(evt)} />
                <br/>
                <button onClick={this.insertPersonalData}>Insert Data</button>
                <button onClick={this.insertPersonalData}>Update Data</button>
                <button onClick={this.getPersonalRecord}>Show Strut</button>
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
                <button onClick={this.deleteSocial}>Delete</button>
                <br/>
                <button onClick={this.getSocialRecord}>Show Strut</button>
                <br/> */}

            </div>
         );
    }

     //******************** Event Handlers Started *******************************************
}
 
export default ABOUT;