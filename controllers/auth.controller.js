const jwt = require("jsonwebtoken")

exports.login = async (req, res) => {
    // take input from req.body
    const { username, password} = req.body
    // check if it exists in jaali db
    if(username ==  process.env.USERNAME && password == process.env.PASSWORD){
        const payload = {userId:"admin"}
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"7d"})
        return res.status(200).json({token:token})
    }else{
        return res.status(404).json({message:"User not found"})
    }  
}