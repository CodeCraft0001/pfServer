
//importing and configuring dotenv for accessing env-variables 
require('dotenv').config()
//importing express
const express=require('express')
//importing cors
const cors=require('cors')
//importing routes
const router=require('./Routes/routing')
//importing DB-connections
require('./DBconnection/dbconn')

const jwtmiddle=require('./Middlewares/jwtMiddleware')

//creating express server app
const pFserver=express()

//configuring cors middleware with server app
pFserver.use(cors())

//configuing json middleware
pFserver.use(express.json())

//Application level middleware
// pFserver.use(jwtmiddle)
//configuring routing module
pFserver.use(router)

const PORT=3000
//activating server
pFserver.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})

pFserver.get('/',(req,res)=>{
    res.status(200).send("<h1>Hello</h1>")
})