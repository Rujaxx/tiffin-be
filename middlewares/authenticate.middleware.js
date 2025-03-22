const jwt = require("jsonwebtoken")

const authenticate = (req,res,next) => {
    try{
        const token = req.headers.authorization.replace("Bearer ","")
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports = authenticate