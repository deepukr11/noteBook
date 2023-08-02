const mongoose = require('mongoose');

const url="mongodb+srv://techiittechiit:UYGOBopsW1WuS3ld@cluster0.ylwpkhq.mongodb.net/?retryWrites=true&w=majority";

  
const connectToMongo = ()=>{ 
    mongoose.connect(url,{})
    .then(result => console.log("Connected to MongoDB") )
      .catch(error =>  console.log("error: Not connected\n",error));  
}
   
    module.exports = connectToMongo;
