const mongoose = require("mongoose")
const Schema = mongoose.Schema


const transactSchema = new Schema({
    _id : Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
      },
    account_Id:{
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    transaction:{
        type:String,
        required:true,
        enum:["deposit", "withdrawal","transfer"],
        default: "deposit"
    },
    reverseTransaction:{
        type:Boolean,
        required:true,
        default:false
    }
},
{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  },
)

module.exports = mongoose.model('Transact', transactSchema)