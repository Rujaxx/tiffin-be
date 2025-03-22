const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
        trim:true,
    },
    description:{
        type:String,
        default:"",
        trim:true,
    },
    companyName:{
        type:String,
        required:[true,"Title is required"],
        trim:true
    },
    status:{
        type:String,
        enum:["Completed","Pending"]
    },
    deletedOn:{
        type: Date,
        default:null
    },
    assignedTo:{
        type: mongoose.Types.ObjectId,
        ref:"users"
    }
},{
    timestamps:true
})

const Job = mongoose.model("job",JobSchema)
module.exports = Job