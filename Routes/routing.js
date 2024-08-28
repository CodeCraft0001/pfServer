const express=require('express')
const userController=require('../Controllers/userController')
const projectController=require('../Controllers/projectController')
const jwtmiddle=require('../Middlewares/jwtMiddleware')
const multerMiddle=require('../Middlewares/multerMiddleware')

const route=express.Router()

//localhost:3000/reg
route.post('/reg',userController.register)
route.post('/log',userController.login)

route.post('/addproject',jwtmiddle,multerMiddle.single('picture'),projectController.addProject)
route.get('/userprojects',jwtmiddle,projectController.getUserProjects)


module.exports=route