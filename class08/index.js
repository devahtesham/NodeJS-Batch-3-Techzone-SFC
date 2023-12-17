const express = require("express");         // import 
const mongoose = require("mongoose");
const userModel = require("./model/userSchema");
const app = express();                      // initialize
const bcrypt = require("bcrypt")
const cors = require("cors");
const jwt = require("jsonwebtoken")
const middlewares = require("./middlewares/authMiddleware");
const PORT = '5000';

const BASE_URI = "mongodb+srv://backendlearning921:cJkSL7PKne3tDRLz@cluster0.s3n5bsa.mongodb.net/USERS_DATA"
mongoose.connect(BASE_URI)
    .then((res) => console.log("Mongo DB Connect !"))
    .catch((err) => console.log("Internal Server Error"))




// creating simple APIS.
app.use(cors())
// body parser
app.use(express.json());
// GET
// syntax:- app.get("endpoint",callbackFn)

app.get("/api/addToCart",middlewares.AUTH_MIDDLEWARE,(req,res)=>{
    res.send("Eligible to create a post")
})

// testing
app.get("/api/check",(req, res) => {
    res.send("ALL GOOD !")
})


// =========== AUTHENTICATION =========
app.post("/api/signup", (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
        res.send("Required Fields are missing !")
        return
    }

    userModel.findOne({ email })
        .then(async(user) => {
            if (user) {
                res.json({
                    message: "Email Address Already In Use"
                })
            } else {
                // password hashing
                let encryptedPassword = await bcrypt.hash(password,10);
                // sending data on db
                let objToSend = {
                    name,
                    email,
                    password:encryptedPassword,
                    phone,
                }
                userModel.create(objToSend)
                    .then((response) => {
                        res.json({
                            status: true,
                            message: `${response.name}, You have registered`
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            }
        })
        .catch((err) => {
            console.log(err)
        })
})

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.send("Required Fields are missing !")
        return
    }

    userModel.findOne({ email })
        .then(async(user) => {
            if (!user) {
                res.json({
                    message: "Email Not Found !"
                })
            } else {
                // sending data on db
                let isPasswordMatch = await bcrypt.compare(password,user.password)
                if(!isPasswordMatch){
                    res.json({
                        message:"Incorrect email or password"
                    })
                }else{
                    const tokenObj = {
                        ...user
                    }
                    const token = jwt.sign(tokenObj,'isUserLogin');
                    // console.log('token:- ',token)
                    res.json({
                        message:`${user.name} login successfully !`,
                        token:token
                    })
                }
            }
        })
        .catch((err) => {
            console.log(err)
        })
})


app.listen(PORT, () => console.log(`server is running on localhost:${PORT}`))