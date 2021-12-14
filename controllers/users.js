const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  Users = require('../models/users')



module.exports.adminSignUp =(req, res) => {
    Users.find({email:req.body.email})
         .exec()
         .then(user =>{

             if(user.length >=1){
               res.status(409).json({message : 'Mail Exists'})
             }else{
                 bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            res.status(500).json({ error:err })
        }else{
            const user = new Users({
                _id :  new mongoose.Types.ObjectId(),
                profileImage:req.file.path,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                role:req.body.role, // to add the role of an admin and not use the default
                password:hash
               })
               user.save()
                   .then(result =>{
                       console.log(result)
                       res.status(201).json({message:'User created'})
                   })
                   .catch((err) =>{y
                       console.log(err)
                       res.status(500).json({error:err})
                   })

        }
    })
             }

         })
}


module.exports.adminLogin = (req, res) => {
    Users.find({email:req.body.email})
         .exec()
         .then(user =>{
             if(user.length < 1){
                  return res.status(401).json({message:'Auth failed'})
             }

         bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
             if(err){
                 return res.status(401).json({message:'Auth failed'})
             }
             if(result){

                 const token = jwt.sign({
                     email: user[0].email,
                     user_id: user[0]._id

                 }, process.env.JWT_SECRET_KEY, {expiresIn:"1hr"})

                 return res.status(201).json({
                     message:'Auth successful',
                     token:token
                    })
             }
             res.status(401).json({message:'Auth failed'})

         })
        })

         .catch((err) => {
             console.log(err)
             res.status(500).json({error:err})
         })
}


module.exports.UserSignUp = (req, res) => {
    Users.find({email:req.body.email})
         .exec()
         .then(user =>{

             if(user.length >=1){
               res.status(409).json({message : 'Mail Exists'})
             }else{
                 bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            res.status(500).json({ error:err })
        }else{
            const user = new Users({
                _id :  new mongoose.Types.ObjectId(),
                profileImage:req.file.path,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:hash
               })
               user.save()
                   .then(result =>{
                       console.log(result)
                       res.status(201).json({
                           message:'User created'
                        })
                   })
                   .catch((err) =>{
                       console.log(err)
                       res.status(500).json({error:err})
                   })

        }
    })
             }

         })
}


module.exports.userLogin =(req, res) => {
    Users.find({email:req.body.email})
         .exec()
         .then(user =>{
             if(user.length < 1){
                  return res.status(401).json({message:'Auth failed'})
             }

         bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
             if(err){
                 return res.status(401).json({message:'Auth failed'})
             }
             if(result){

                 const token = jwt.sign({
                     email: user[0].email,
                     user_id: user[0]._id

                 }, process.env.JWT_SECRET_KEY, {expiresIn:"1hr"})

                 return res.status(201).json({
                     message:'Auth successful',
                     token:token
                    })
             }
             res.status(401).json({message:'Auth failed'})

         })
        })

         .catch((err) => {
             console.log(err)
             res.status(500).json({error:err})
         })
}