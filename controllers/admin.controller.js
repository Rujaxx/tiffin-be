const TiffinModel = require('../models/tiffin.model')

exports.getDeliveries = async (req, res) => {
    try {
        // should use indian time zone
        // format should be yyyy-mm-dd
        const date = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
        const tiffins = await TiffinModel.find({deletedOn:null,date:date}).lean()
        return res.status(200).json({message:"Deliveries fetched successfully",data:tiffins})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

exports.assignRider = async (req, res) => {
    try {
        const {selectedItems,riderName} = req.body
        await TiffinModel.updateMany({_id:{$in:selectedItems}},{riderName})
        const deliveries = await TiffinModel.find({_id:{$in:selectedItems},deletedOn:null}).lean()
        return res.status(200).json({message:"Rider assigned successfully",data:{deliveries}})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}