const TiffinModel = require('../models/tiffin.model')

exports.bookTiffin = async (req, res) => {
    try {
        let { fullName, kitchen, date, address, landmark, quantity, mobileNumber} = req.body
        date = new Date(date)
        const tiffin = await TiffinModel.findOne({ date, mobileNumber})
        if (tiffin) {
            return res.status(400).json({ message: "Tiffin already booked for today" })
        }
        await TiffinModel.create({ fullName, kitchen, date, address, landmark, quantity, mobileNumber	 })
        // create a new tiffin
        return res.status(200).json({ message: "Tiffin booked successfully", data: { tiffin } })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
