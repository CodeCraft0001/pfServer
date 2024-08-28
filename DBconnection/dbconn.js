const mongoose=require('mongoose')

const connString=process.env.DATABASE

const connection=mongoose.connect(connString)

connection.then(()=>{
    console.log("Server Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
    
})