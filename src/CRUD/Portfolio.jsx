import React, { Component } from 'react';
import { readers } from '../ipfsStore'

class Portfolio extends Component {

    state = { 
        gun : this.props.gun,
        name : "",
        imgNode : "",
        desc : "",
        link : "",
        images : null
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
                        name       : this.state.name,
                        desc       : this.state.desc,
                        link       : this.state.link,
                        no_of_imgs : this.state.images.length
                    }
    
                    if(this.insertImg(this.state.images)){

                        //insert the Object containig the detailed of the project excluding the images.
                        this.state.gun.get('Projects').get(this.state.name).get("Data").put( obj )
                        console.log("Record Inserted", obj) 

                    }
                    
                }

            })
                
        }
        
    }

    //-------------------------- Images CREATE OPERATION ----------------------

    //upload method, Call PROMISE with iterating the IMAGES and create IMAGE HASHES Array
    insertImg = images => {

        if(images){

            for(let i=0 ; i<images.length ; i++ ){
                readers(images[i])
                .then(res => {
                    console.log(res)  
                    this.state.gun.get('Projects').get(this.state.name).get("Images").get(`Image${i}`).put( res )

                })
            }

            return true

        }else{  

            console.log("Please select any image.")
            return false
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

    addImages = () => {

        if(this.state.images && this.state.name !== ""){
           
            this.state.gun.get('Projects').get(this.state.name).get("Images").once((data, key)=>{       
                let arr = Object.entries(data).slice(1)
                console.log("chal raha hai", arr.length, this.state.images.length)
                for(let i= arr.length, j=0; i<this.state.images.length + arr.length ; i++, j++ ){
                    
                    readers(this.state.images[j])
                    .then(res => {
                        console.log(res)  
                        this.state.gun.get('Projects').get(this.state.name).get("Images").get(`Image${i}`).put( res )
    
                    })
                }
    
            });

            
        }else console.log("Please select any Image to add.")
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

    getNewImg  = evt => this.setState({ newImg : evt.target.files[0] })

    getNewImgs = evt => this.setState({ images : evt.target.files })

    //******************** Event Handlers Ended *********************************************

    //******************** Graphic Rendering Started ****************************************

    render() { 
        return ( 
            <div>
                <h2>This is Projects</h2>
                <input type="text" onChange={evt => this.updateName(evt)} placeholder="Name"/>
                <input type="text" onChange={evt => this.updateDesc(evt)} placeholder="Description" />
                <input type="text" onChange={evt => this.updateLink(evt)} placeholder="Project URL"/>
                <input type="file" onChange={evt => this.getNewImgs(evt)} multiple/>
                <img src={this.state.fetchImg} alt=""/>

                <br />

                <button onClick={this.insertData}>Insert Data</button>
                <button onClick={this.viewData}>View Single Record</button>
                <button onClick={this.iterateRecords}>View Structure</button>
                <button onClick={this.addImages}>Add Image</button>
                <button onClick={this.clearData}>Delete Project</button>

                <br/><hr/><br/>
                <p>Image Updation</p>
                <input type="text" onChange={evt => this.getImgNode(evt)} placeholder="Image Name" />
                <input type="file" onChange={evt => this.getNewImg(evt)} />

                <br />  

                <button onClick={this.updateImg}>Update Image</button>
                <button onClick={this.deleteImg}>Delete Image</button>
            </div>
         );
    }


    //******************** Event Handlers Started *******************************************
}
 
export default Portfolio;