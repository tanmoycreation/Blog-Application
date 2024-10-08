const express= require('express')
const app=express()
const mongoose= require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const multer=require('multer')
const path=require("path")
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth')
const userRouter=require('./routes/users')
const postRouter=require('./routes/posts') 
const commentRouter=require('./routes/comments') 

//database connection
const connectDB = async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URL)
       console.log("Database is conncted sucessfully!!")
    } catch (err) {
        console.log(err)
    }
}
//middlewares
dotenv.config()
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRouter)
app.use("/api/posts",postRouter)
app.use("/api/comments",commentRouter)


//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.jpg")
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("Image has been upload sucessfully")
})



app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("port is running on"+process.env.PORT)
})