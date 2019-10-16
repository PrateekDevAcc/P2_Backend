import ipfs from './ipfs'

//PROMISE for converting the FILE into BUFFER and send it to IPFS and GET the HASH
export const readers = (file) => {

  if(file != null){
    return new Promise((resolve, reject) => {
        const reader = new FileReader()  
        reader.readAsArrayBuffer(file)
        reader.onload = () => {
            console.log(Buffer(reader.result))
            // let buffer = Buffer.from("Hello Everyone this is IPFS")
            ipfs.add(Buffer(reader.result), (err, ipfsHash) => {
                if(ipfsHash){
                    resolve(ipfsHash[0].hash)
                  }else{
                    reject("something is not good :(" + err);
                  }
            })   
        }  
    })
  }else{
      console.error("Please select the Image first")
  }

}
