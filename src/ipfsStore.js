import ipfs from './ipfs'
// const CID = require('cids')

// function for sending any file into IPFS and returns the hash.
export const ipfsSender = (file) => {

    return new Promise((resolve, reject) => {

      let buffer = Buffer.from(JSON.stringify(file))
      ipfs.add(buffer, (err, ipfsHash) => {
        if(ipfsHash){
          resolve(ipfsHash[0].hash)

          //this.setState({ ipfsHash:ipfsHash[0].hash })
        }else{
          reject("something is not good :(" + err);
        }   
      })

    })

  }

//function for fetching the data from the IPFS through the hash.
export const ipfsFetcher = (hash) => {
    
    // const cid = new CID(hash)
    return new Promise((resolve, reject) => {
      // ipfs.block.get(cid, function (err, block) {
      //   if (err) {
      //     throw err
      //     reject(err)
      //   }   
      //     let obj = block.data.toString().substring(8,block.data.length - 3)
      //     obj = JSON.parse(obj) 
      //     console.log("kaam kr raha hai")      
      //     console.log(obj)
      //     resolve(obj)
      // })
      fetch(`https://ipfs.io/ipfs/${hash}`)
      .then(res => res.json())
      .then(
          (result) => {
            if(result){
              resolve(result)
              //this.setState({ipfsData:result})
            } 
          },
          (error) => {
            reject(error)
          }
      )
    })

  }