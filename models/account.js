const mongoose = require("mongoose")
const Schema = mongoose.Schema


const accountSchema = new Schema({
    _id : Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
      },
    
    bankName:{
        type:String,
        required:true

    },
    bankAddress:{
        type: String,
        required: true
    },
    accountNumber: {
    type: Number,
    required: true,
    unique: true

    },

    accountType :{
        type: String,
        required: true,
        enum:["savings", "current","domicillary"],
        default:"savings"
    },

    isActive:{
        type:Boolean,
        default:true
    }

},
{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  },



)


module.exports = mongoose.model("Account", accountSchema)
