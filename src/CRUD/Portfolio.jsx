import React, { Component } from 'react';
import { readers } from '../ipfsStore'
import Collection from '../Collection';
import Util from '../Util';

const projectRecord = new Collection();
const projectData = new Collection();
const projectImages = new Collection();

class Portfolio extends Component {

    constructor(props){
        super(props)
        this.Util = new Util();
    }

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
    insertProject = (projectData, imagesData) => {

        if(projectData.name != "" && imagesData != null){
            
            //check for the already stored Name 
            let projectRecord = this.getPortfolioRecord()
            let found = projectRecord.hasOwnProperty(projectData.name)
          
            if(found === true){
        
                console.log("Project name is already stored.")
        
            }else{

                //lets insert the Detials
                let obj = {
                    name       : projectData.name,
                    desc       : projectData.desc,
                    link       : projectData.link,
                    no_of_imgs : imagesData.length
                }    

                if(this.insertImg(imagesData, projectData.name)){

                    //insert the Object containig the detailed of the project excluding the images.
                    this.state.gun.get('Projects').get(projectData.name).get("Data").put( obj )
                    console.log("Record Inserted", obj) 

                }
                
            }
            
        }else{

            //check for the empty name
            console.log("Please Enter Name & Select Any Image")
                
        }
        
    }
    

    //-------------------------- Images CREATE OPERATION ----------------------

    //upload method, Call PROMISE with iterating the IMAGES and create IMAGE HASHES Array
    insertImg = (images, projectName) => {

        if(images){

            for(let i=0 ; i<images.length ; i++ ){
                readers(images[i])
                .then(res => {
                    console.log(res)  
                    this.state.gun.get('Projects').get(projectName).get("Images").get(`Image${i}`).put( res )

                })
            }

            return true

        }else{  

            console.log("Please select any image.")
            return false
        }
            
    }

    //---------------------------- UPDATE OPERATION -----------------------

     //method for updating the project data into the DB
     updateProject = projectData => {

        if(projectData.name != ''){
            this.state.gun.get('Projects').get(projectData.name).get("Data").put( projectData )
            console.log("Record Updated", projectData) 
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

    getPortfolioRecord = () => {
        

        this.state.gun.get('Projects').map((data,project) => {

            if(data != null){
                projectData.collection = {}
                this.state.gun.get('Projects').get(project).map((data1, key1) => {
                    if(key1 == 'Images'){
                        projectImages.collection = {}
                        Object.keys(data1).map(image =>{
                            if(image != '_')
                            if(data1[image] != null){
                                projectImages.add(image, data1[image])
                            }
                        })
                        projectData.add(key1, projectImages.collection)
                    }else{
                        projectData.add(key1, data1)
                    }
                    
                })
                projectRecord.add(project,projectData.collection)
            }   

        })
        console.log(projectRecord.collection)
        return projectRecord.collection;
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

    addImages = (projectImages, projectName) => {

        if(projectImages && projectName != ''){
           
            this.state.gun.get('Projects').get(projectName).get("Images").once((data, key)=>{       
                let arr = Object.entries(data).slice(1)
                // console.log("chal raha hai", arr.length, projectImages.length)
                for(let i= arr.length, j=0; i<projectImages.length + arr.length ; i++, j++ ){
                    
                    readers(projectImages[j])
                    .then(res => {
                        console.log(res)  
                        this.state.gun.get('Projects').get(projectName).get("Images").get(`Image${i}`).put( res )
    
                    })
                }
    
            });

            
        }else console.log("Please select any Image to add.")
    }

    //-------------------------- DELETE Functionality ----------------------

    //method for deleteing the Image from the Project
    deleteImg = (projectName, imageNode) => {
        this.state.gun.get('Projects').get(projectName).get("Images").get(imageNode).put(null)
        console.log(`${imageNode} is deleted from ${projectName}`)
    }

    //method for deleteing the Project
    deleteProject = projectName => {
        this.state.gun.get('Projects').get(projectName).put(null)
        console.log(`${projectName} project is deleted.`)
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

                <button onClick={this.insertProject}>Insert Data</button>
                <button onClick={this.viewData}>View Single Record</button>
                <button onClick={this.iterateRecords}>View Structure</button>
                <button onClick={this.addImages}>Add Image</button>
                <button onClick={this.clearData}>Delete Project</button>
                <button onClick={this.getPortfolioRecord}>Get Collection</button>

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