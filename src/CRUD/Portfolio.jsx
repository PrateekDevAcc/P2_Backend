import React, { Component } from 'react';
import { readers } from '../utility/ipfsStore'
import Collection from '../utility/Collection';
import Util from '../utility/Util';
import firebase from '../utility/firebase'

const firestore = firebase.firestore();

// const projectRecord = new Collection();
// const projectData = new Collection();
// const projectImages = new Collection();

class Portfolio extends Component {

    constructor(props){
        super(props)
        this.Util = new Util();
    }

    state = { 
        name : "",
        imgNode : "",
        desc : "",
        link : "",
        images : null
     }

     UNSAFE_componentWillMount(){

     }

     //********************* Functional Coding Area Starts ****************************

     //---------------------------- CREATE OPERATION -----------------------

     //method for inserting the project data into the DB
    insertProject = (projectData, imagesData) => {

        if(projectData.name != "" && imagesData != null){
            
            

            this.getPortfolioRecord.then(previousProjects => {     

                //check for the already stored Name 
                //fetching the PortfolioRecord
                let found = false

                previousProjects.map(project => {
                    if(projectData.name == project.data.name) found = true
                })

                if(found === true){
                    alert("Project name is already stored.")
                }else{

                    //lets insert the Detials
                    let obj = {
                        name       : projectData.name.trim(),
                        description: projectData.description.trim(),
                        link       : projectData.link.trim(),
                        images     : []
                    }    

                    if(imagesData.length > 0){

                        //insert the Object containig the detailed of the project excluding the images.
                        firestore
                            .collection('Projects')
                            .add(obj)
                            .then((docRef) => {
                                this.insertImg(imagesData, docRef.id, 'insert').then(resolve => {
                                    console.log('Images are added')
                                })
                                console.log("Project is Added")
                            })

                    }
                    
                }
            },error => {
                console.log(error)
            });

            
        }else{
            //check for the empty name
            alert("Please Enter Name & Select Any Image")
        }
        
    }
    

    //-------------------------- Images CREATE OPERATION ----------------------

    //upload method, Call PROMISE with iterating the IMAGES and create IMAGE HASHES Array
    insertImg = (images, projectID, operation) => {

        return new Promise( resolve => {
            if(images){
                let imgs = [];
                for(let i=0 ; i<images.length ; i++ ){
                    readers(images[i])
                    .then(res => {
                        imgs.push(res)
                        if(operation == 'insert'){
    
                            firestore
                                .collection('Projects')
                                .doc(projectID)
                                .update({
                                    images : imgs
                                })
                                .then(() => {
                                    console.log("Images are added to the Project")
                                })
    
                        }

                        if(images.length == imgs.length){
                            resolve(imgs)
                        }
                        
                    })
                }
    
                
                     
            }else{  
                alert("Please select any image.")
            }
        })
        
            
    }

    //---------------------------- UPDATE OPERATION -----------------------

     //method for updating the project data into the DB
     updateProject = ( projectData, projectID ) => {
        if(projectData.name != ''){
            firestore
                .collection('Projects')
                .doc(projectID)
                .update(projectData)
                .then(() => {
                    console.log("Project is Updated")
                })
        }
     }


    //---------------------------- READ OPERATION -----------------------

    //Iterating the Structure of the Project Root Node 
    // iterateRecords = () => {

    //     //itreating in the sub-directory of Master directory (Projects->this.state.name) to fetch the Data
    //     if(this.state.name === ""){
    //         // console.log("chal raha hai")
    //         this.state.gun.get('Projects').map((data, key)=>{
    //             console.log(data, key)
    //         })
    //     }else{
    //         this.state.gun.get('Projects').get(this.state.name).map((data, key)=>{
    //             console.log(data, key)
    //         })
    //     }
        
    // }

    //displaying single conplete record
    // viewData = () => {

    //     if(this.state.name === ""){
    //         alert("No Record Found")
    //     }else{

    //         //fetching the Data Node
    //         this.state.gun.get('Projects').get(this.state.name).get("Data").once((data, key)=>{
    //             console.log(key, data)
    //         });

    //         //fetching the Images Node
    //         this.state.gun.get('Projects').get(this.state.name).get("Images").once((data, key)=>{
    //             console.log(key, data)
    //         });
    //     }
    // }

    getPortfolioRecord = new Promise( resolve => {
        
        let projects = [];
        firestore
            .collection('Projects')
            .get()
            .then(snap => {
                snap.forEach(project => {
                    projects.push({ id : project.id, data : project.data()})
                });
            })

        resolve(projects)
    })

    //-------------------------- Images Functionality ----------------------

   //method for updating the images of the project.
    // updateImg = () => {

    //     if(this.state.imgNode === ""){
    //         alert("please enter the Image directory")
    //     }else{
    //         readers(this.state.newImg)
    //         .then(res => {
    //             //console.log(res)
    //             this.state.gun.get('Projects').get(this.state.name).get("Images").get(this.state.imgNode).put( res )
    //         })
    //     }     

    // }


    //-------------------------- DELETE Functionality ----------------------

    //method for deleteing the Image from the Project
    deleteImg = (projectID, imageNode, imageArr) => {
      

        this.getPortfolioRecord.then(previousProjects => {

            let finalImages = []

            previousProjects.map(project => {
                if(projectID == project.id){
                    finalImages = project.data.images
                    finalImages.splice(imageNode, 1)
                }
            })

            //removing all the images from the project
            firestore
                .collection('Projects')
                .doc(projectID)
                .update({ images : firebase.firestore.FieldValue.delete() })
                .then(() => {
                    console.log("Images is removed from the Project")
                })

            // dding the new set of images to the project
            firestore
                .collection('Projects')
                .doc(projectID)
                .set({ images : finalImages },{ merge : true })
                .then(() => {
                    console.log("Images is removed from the Project")
                })  
        
        },error => {
            console.log(error)
        });

        // imageArr.splice(imageNode, 1)

       
        // firestore
        //     .collection('Projects')
        //     .doc(projectID)
        //     .update({ images : imageArr })
        //     .then(() => {
        //         console.log("Images is removed from the Project")
        //     })
        // this.state.gun.get('Projects').get(projectName).get("Images").get(imageNode).put(null)
        // console.log(`${imageNode} is deleted from ${projectName}`)
    }

    //method for deleteing the Project
    deleteProject = projectID => {
        
        firestore
            .collection('Projects')
            .doc(projectID)
            .delete()
            .then(() => {
                console.log(`${projectID} project is deleted.`)
            })

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