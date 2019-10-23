import React, { Component } from 'react';
import { readers } from '../ipfsStore'

class Portfolio extends Component {

    state = { 
        gun : this.props.gun,
        name : "",
        imgNode : "",
        desc : "",
        link : ""
     }

     //********************* Functional Coding Area Starts ****************************

     //---------------------------- CREATE OPERATION -----------------------

     //method for inserting the project data into the DB
    insertData = () => {

        let found = true

        if(this.state.name === ""){
            //check for the empty name
            console.log("Please enter name")

        }else{
            //check for the already stored Name
            this.state.gun.get('Projects').get(this.state.name).get("Data").once((data, key)=>{
               
                if(typeof data === "undefined")
                    found = false
               
                if(found === true){
            
                    console.log("Project name is already stored.")
            
                }else{
    
                        //lets insert the Detials
                        let obj = {
                        name : this.state.name,
                        desc : this.state.desc,
                        link : this.state.link
                    }
    
                    //insert the Object containig the detailed of the project excluding the images.
                    this.state.gun.get('Projects').get(this.state.name).get("Data").put( obj )
                    console.log("Record Inserted", obj) 
                }

            })
                
        }
        
    }

    //-------------------------- Images CREATE OPERATION ----------------------

    //upload method, Call PROMISE with iterating the IMAGES and create IMAGE HASHES Array
    insertImg = evt => {

        for(let i=0;i<evt.target.files.length;i++){
            readers(evt.target.files[i])
            .then(res => {
                console.log(res)  
                this.state.gun.get('Projects').get(this.state.name).get("Images").get(`Image${i}`).put( res )

            }) 
            
        }
        
    }


    //---------------------------- READ OPERATION -----------------------

    //Iterating the Structure of the Project Root Node 
    iterateRecords = () => {

        //itreating in the sub-directory of Master directory (Projects->this.state.name) to fetch the Data
        if(this.state.name === ""){
            // console.log("chal raha hai")
            this.state.gun.get('Projects').map((data, key)=>{
                console.log(data, key)
            })
        }else{
            this.state.gun.get('Projects').get(this.state.name).map((data, key)=>{
                console.log(data, key)
            })
        }
        
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

    //-------------------------- Images Functionality ----------------------

   //method for updating the images of the project.
    updateImg = () => {

        if(this.state.imgNode === ""){
            console.log("please enter the Image directory")
        }else{
            readers(this.state.newImg)
            .then(res => {
                console.log(res)
                this.state.gun.get('Projects').get(this.state.name).get("Images").get(this.state.imgNode).put( res )
            })
        }     

    }

    //-------------------------- DELETE Functionality ----------------------

    //method for deleteing the Image from the Project
    deleteImg = () => {
        this.state.gun.get('Projects').get(this.state.name).get("Images").get(this.state.imgNode).put(null)
        console.log(`${this.state.imgNode} is deleted`)
    }
    
    //Function for Clear or remove the particular Project Data
    clearData = () => {

        this.state.gun.get("Projects").get(this.state.name).put(null);
        console.log(this.state.name, "Deleted")
    }

    //******************** Functional Coding Area is Ended **********************************

    //******************** Event Handlers Started *******************************************

    updateName = evt => this.setState({ name : evt.target.value.toLowerCase() })

    updateDesc = evt => this.setState({ desc : evt.target.value.toLowerCase() })

    updateLink = evt => this.setState({ link : evt.target.value.toLowerCase() })

    getImgNode = evt => this.setState({ imgNode : evt.target.value.toLowerCase() })

    getNewImg = evt => this.setState({ newImg : evt.target.files[0] })

    //******************** Event Handlers Ended *********************************************

    //******************** Graphic Rendering Started ****************************************

    render() { 
        return ( 
            <div>
                 <h2>This is Projects</h2>
                 <input type="text" onChange={evt => this.updateName(evt)} placeholder="Name"/>
                 <input type="text" onChange={evt => this.updateDesc(evt)} placeholder="Description" />
                 <input type="text" onChange={evt => this.updateLink(evt)} placeholder="Project URL"/>
                <input type="file" onChange={evt => this.insertImg(evt)} multiple/>
                <img src={this.state.fetchImg} alt=""/>

                <br />

                <button onClick={this.insertData}>Insert Data</button>
                <button onClick={this.viewData}>View Single Record</button>
                <button onClick={this.iterateRecords}>View Structure</button>
                <button onClick={this.clearData}>Clear</button>

                <br/><hr/><br/>

                <input type="text" onChange={evt => this.getImgNode(evt)} placeholder="Image Name" />
                <input type="file" onChange={evt => this.getNewImg(evt)} />

                <br />  

                <button onClick={this.updateImg}>Update Image</button>
                <button onClick={this.deleteImg}>Delete Image</button>

                <br />

                <button onClick={this.props.logOut  }>Logout</button>
            </div>
         );
    }


    //******************** Event Handlers Started *******************************************
}
 
export default Portfolio;