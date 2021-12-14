const mongoose = require('mongoose');
const Transact = require('../models/transactions')



module.exports.getAllTransactions = (req, res) => {
    Transact.find()
    .select('transaction reverseTransaction account_Id user ')
    .populate("account_Id", "bankName bankAddress accountNumber accountType user")
    .populate("user", "firstName lastName profileImage email role")
    .exec()
    .then(docs =>{
        console.log(docs)

        const response = {
            count:docs.length,
            accounts:docs.map(doc =>{
                return {
                  _id:doc._id,
                  account_Id:doc.accountId,
                  user:doc.userId,
                  transaction:doc.transaction,


                  request:{
                    type:'GET',
                    url: 'http://localhost:6005/users/transactions/'+ doc._id
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

module.exports.getUserTransaction =  (req, res) =>{
    const id = req.params.userId
    Transact.findById(id)
         .select('transaction reverseTransaction account_Id user ')
         .populate("account_Id", "bankName bankAddress accountNumber accountType user")
         .populate("user", "firstName lastName profileImage email role")
         .exec()
         .then(doc => {
             console.log("From database", doc)
             if(doc){
                 res.status(200).json({
                     transact: doc,
                     request:{
                         type:'GET',
                         url: 'http://localhost:6005/users/transactions'

                     }
                 })
             }else{
                 res.status(404).json({message: "No valid transaction found for a user with the provided Id"})
             }


    }).catch(err =>{

     console.log(err)
     res.status(500).json({error: err})
    })

}

module.exports.depositTransaction = (req, res) => {

    const transact = new Transact({
        _id :  new mongoose.Types.ObjectId(),
        account_Id :req.body.accountId, // the id of the user we are connecting to
        user:req.body.userId,
        transaction: req.body.transaction

    })
     transact.save()
           .then(result =>{
               console.log(result)
               res.status(200).json({
                   message:'Deposit transaction successful by the user',

                   Deposit:{
                    _id:result._id,
                   account_Id:result.account_Id,
                   user:result.user,
                   transaction:result.transaction,

                   request:{
                    type:'GET',
                    url: 'http://localhost:6005/users/transactions/'+ result._id
                }

               }
                    })

           })
           .catch(err =>{
               console.log(err)
               res.status(500).json({error:err})

        })
    }

    module.exports.withdrawTransaction = (req, res)=>{
        const transact = new Transact({
            _id :  new mongoose.Types.ObjectId(),
            account_Id :req.body.accountId, // the id of the user we are connecting to
            user:req.body.userId,
            transaction: req.body.transaction

        })
        transact.save()
        .then(result =>{
            console.log(result)
            res.status(200).json({
                message:'Withdrawal transaction successful by the user',

                withdrawal:{
                 _id:result._id,
                account_Id:result.account_Id,
                user:result.user,
                transaction:result.transaction,

                request:{
                 type:'GET',
                 url: 'http://localhost:6005/users/transactions/'+ result._id
             }

            }
                 })

        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({error:err})

     })

    }


    module.exports.transferTransaction =  (req, res)=>{
        const transact = new Transact({
            _id :  new mongoose.Types.ObjectId(),
            account_Id :req.body.accountId, // the id of the user we are connecting to
            user:req.body.userId,
            transaction: req.body.transaction

        })
        transact.save()
        .then(result =>{
            console.log(result)
            res.status(200).json({
                message:'Transfer transaction successful by the user',

                transfer:{
                 _id:result._id,
                account_Id:result.account_Id,
                user:result.user,
                transaction:result.transaction,

                request:{
                 type:'GET',
                 url: 'http://localhost:6005/users/transactions/'+ result._id
             }

            }
                 })

        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({error:err})

     })

    }

    module.exports.adminReverseTransaction = (req, res) =>{
        const id = req.params.transactId
        const updateOps = {}
        //we loop through all the operations of the req.body
        //we expect our request body to essentially be an array here
        for(const ops of req.body){
            //This will give us an object to perform the operation we want
            updateOps[ops.propName] = ops.value

        }
        Transact.update({_id: id},{$set:updateOps})
            .exec()
            .then(result => {
                console.log(result)
                res.status(200).json({
                    message:"Transaction reversed",
                    request:{
                        type:"GET",
                        url: 'http://localhost:6005/users/transactions/'+ id
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