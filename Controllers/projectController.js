const { json } = require('express')
const projects = require('../Models/projectModel')

exports.addProject = async (req, res) => {
    const { title, description, languages, github, demo, image } = req.body
    const picture=req.file.filename
    const userId=req.payload
    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(406).json("Project Already Exist!")
        }
        else {
            const newProject = new projects({
                title, description, languages, github, demo, picture, userId
            })
            await newProject.save()
            res.status(201).json(newProject)
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }

}

exports.deleteProject = async (req,res) =>{

}

exports.updateProject = async (req,res) =>{
    try{
        const {id} = req.params
        const {title, description, languages, github, demo, picture} = req.body
        const projectImage = req.file?req.file.filename:picture
        const result = await projects.findByIdAndUpdate({_id:id},{title, description, languages, github, demo, picture})
        await result.save()
        res.status(200).json(result)
    }
    catch(err){
        console.log(err);
        res.status(400).json(err)
        
    }
}

exports.getUserProjects=async(req,res)=>{
    const userId=req.payload
    try{
        const userProjects= await projects.find({userId}) 
        res.status(200).json(userProjects)
    }
   catch(err){
    res.status(400).json(err)
   }
}