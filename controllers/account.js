const mongoose = require('mongoose');
const Account = require('../models/account')
const Users = require('../models/users')


module.exports.getAllUserAccounts =  (req, res) => {
    Account.find()
            .select('bankName bankAddress accountNumber accountType  user isActive ')
            .populate("user", "firstName lastName profileImage email role")
            .exec()
            .then(docs =>{
                console.log(docs)

                const response = {
                    count:docs.length,
                    accounts:docs.map(doc =>{
                        return {
                         _id:doc._id,
                          user:doc.user,
                          bankName:doc.bankName,
                          bankAddress:doc.bankAddress,
                          accountNumber:doc.accountNumber,
                          accountType:doc.accountType,
                          isActive:doc.isActive,


                          request:{
                            type:'GET',
                            url: 'http://localhost:6005/admin/userAccounts/'+ doc._id
                        }

                        }

                    })

                    }

                    res.status(200).json(response)
            })
            .catch(err =>{
                console.log(err)
                res.status(200).json({error:err})
            })

}

module.exports.createUserAccount =  (req,res) => {

    Users.findById(req.body.userId)
    //if this succeeds, then we create new user account otherwise, we return an error
          .then(users => {
              if(!users){ //we must not create account for users we don't have
                  res.status(404).json({
                      message: 'Users not found'
                  })

            }
    const account = new Account({
        _id :  new mongoose.Types.ObjectId(),
        user :req.body.userId, // the id of the user we are connecting to
        bankName: req.body.bankName,
        bankAddress:req.body.bankAddress,
        accountNumber : req.body.accountNumber,
        accountType:req.body.accountType,

    })
    account.save()
           .then(result =>{
               console.log(result)
               res.status(200).json({
                   message:'User Account Created by Admin',

                   createdUserAccount:{
                    _id:result._id,
                   user:result.user,
                   bankName:result.bankName,
                   bankAddress:result.bankAddress,
                   accountNumber:result.accountNumber,
                   accountType:result.accountType,

                   request:{
                    type:'GET',
                    url: 'http://localhost:6005/admin/userAccounts/'+ result._id
                }

               }
                    })

           })
           .catch(err =>{
               console.log(err)
               res.status(500).json({error:err})

        })
    })
}

module.exports.disableUserAccount =  (req, res)=>{
    const id = req.params.accountId
    const updateOps = {}
    //we loop through all the operations of the req.body
    //we expect our request body to essentially be an array here
    for(const ops of req.body){
        //This will give us an object to perform the operation we want
        updateOps[ops.propName] = ops.value

    }
    Account.update({_id: id},{$set:updateOps})
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message:"User Account Disabled",
                request:{
                    type:"GET",
                    url: 'http://localhost:6005/admin/userAccounts/'+ id
                }

            })
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}


module.exports.getAUserAccount = (req, res) =>{
    const id = req.params.accountId
   Account.findById(id)
        .select('bankName bankAddress accountNumber accountType profileImage user isActive')
        .populate("user", "firstName lastName profileImage email role")
        .exec()
        .then(doc => {
            console.log("From database", doc)
            if(doc){
                res.status(200).json({
                    account: doc,
                    request:{
                        type:'GET',
                        url: 'http://localhost:6005/admin/userAccounts'

                    }
                })
            }else{
                res.status(404).json({message: "No account entry found for the provided Id"})
            }


   }).catch(err =>{

    console.log(err)
    res.status(500).json({error: err})
   })

}

module.exports.deleteUserAccount = (req, res)=>{
    const id = req.params.accountId

    Account.deleteMany({_id:id}) // this also removes deprecation warning
          .exec()
          .then(result => {
              res.status(200).json({
                  message: 'User Account deleted successfully',
                  result: result,

                  request: {
                      type:'POST',
                      url: 'http://localhost:6005/admin/create-userAccount',
                      body:{
                      user:"ID",
                      bankName:"String",
                      bankAddress:"String",
                      accountNumber:"Number",
                      accountType:"String"
                      }
                  }
              })
          })
          .catch(err =>{
              console.log(err)
              res.status(500).json({
                  error: err
               })

          })


   }