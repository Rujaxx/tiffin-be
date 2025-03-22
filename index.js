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
// hea;th check
app.get("/",(req,res)=>{
    res.json({message:"Server is running"})
})
app.use(authRoutes)
app.use(adminRoutes)
app.use("/tiffins",bookTiffinRoutes)

app.use((req,res,next)=>{
    res.status(404).json({message:"Route doesn't exist"})
})

app.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).json({message:"Something went wrong"})
})

app.listen(PORT,() => {
    console.log(`Listening on ${PORT}`)
})
