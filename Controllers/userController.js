
const users=require('../Models/userModel')
const jwt=require('jsonwebtoken')

exports.register=async(req,res)=>{
    const {username,password,email}=req.body
    console.log(username,password,email);

    try{
        const existingUser= await users.findOne({email})
        if(!existingUser){
            const newUser= new users({
                username,password,email,profile_pic:'',github:'',linkedin:''
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        else{
            res.status(406).json("User already exist!!")
        }
    }
    catch(err){
        res.status(404).json(err)
    }

    
}

exports.login= async (req,res)=>{
    const {email,password}=req.body
    console.log(email,password);

   try {
    const existingUser = await users.findOne({email,password})
    if(existingUser){
        const token=jwt.sign(existingUser._id,process.env.SECRET_KEY) 
        res.status(200).json({token,username:existingUser.username})
    }
    else{
        res.status(406).json("Login Failed!...invalid Email/Password")
    }
}
catch(err){
    res.status(404).json(err)
}
}