const express = require('express')
const app = express()
const PORT = 4000;
require("dotenv").config()
const cors = require('cors')
const connectDb = require('./db/connectDb.js')
connectDb()
app.use(cors())
app.use(express.urlencoded({extended:true}))    

app.use(express.json())

const authRoutes = require("./routes/auth.route.js")
const adminRoutes = require("./routes/admin.route.js")
const bookTiffinRoutes = require("./routes/bookTiffin.route.js")
app.use(authRoutes)
app.use(adminRoutes)
app.use("/tiffins",bookTiffinRoutes)

app.use((req,res,next)=>{
    res.status(404).json({message:"Route doesn't exist"})
})

app.listen(PORT,() => {
    console.log(`Listening on ${PORT}`)
})
