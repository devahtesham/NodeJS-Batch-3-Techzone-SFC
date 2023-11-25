const express = require("express");         // import 
const mongoose = require("mongoose");
const userModel = require("./model/userSchema");
const app = express();                      // initialize
const bcrypt = require("bcrypt")
const cors = require("cors")
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

// testing
app.get("/api/check", (req, res) => {
    res.send("ALL GOOD !")
})
// app.get('/api/user',(req,res)=>{
//     console.log("Get API Hits !!")
//     res.send("user Get Successfully !")
// })

//POST
// app.post('/api/user',(req,res)=>{
//     const body = req.body
//     console.log("Post API Hits !!",body);
//     res.json({
//         status:true,
//         message:"user Created Successfully !",
//         data:body
//     })
// })

// Dummy Data base (Global)
const DB = [
    {
        id: 1,
        name: "hassan",
        course: "JS"
    },
    {
        id: 2,
        name: "kamran",
        course: "JS"
    },
    {
        id: 3,
        name: "akhshy",
        course: "JS"
    },
    {
        id: 4,
        name: "ahtesham",
        course: "JS"
    },
    {
        id: 5,
        name: "apun",
        course: "JS"
    },
]
// Get specific user details from all users.(using parameter)
// app.get("/api/users/:name",(req,res)=>{
//     let {name} = req.params;
//     name = name.toLowerCase();
//     console.log(name)
//     let filteredResponse = DB.filter((user)=>{
//         return user.name === name
//     })

//     if (filteredResponse.length > 0){
//         res.json({
//             status:true,
//             message:"All Users Get Successfully !",
//             user:{...filteredResponse[0]}
//         })
//     }else{
//         res.json({
//             status:true,
//             message:"User Not Found !"
//         })
//     }




// })

// app.get("/api/users",(req,res)=>{
//     let {name} = req.query;
//     name = name.toLowerCase();
//     // console.log(query)
//     let filteredResponse = DB.filter((user)=>{
//         return user.name === name
//     })

//     if (filteredResponse.length > 0){
//         res.json({
//             status:true,
//             message:"All Users Get Successfully !",
//             user:{...filteredResponse[0]}
//         })
//     }else{
//         res.json({
//             status:true,
//             message:"User Not Found !"
//         })
//     }

// })

// update
// app.put("/api/users/:user",(req,res)=>{
//     let {user} = req.params
//     console.log('user:- ',user)
//     user = user.toLowerCase();
//     let filteredResponse = DB.filter((userObj) => userObj.name === user)
//     filteredResponse[0]['course'] = "MERN";

//     res.json({
//         status:true,
//         message:"User Updated Successfully !",
//         user:{...filteredResponse[0]}
//     })


// })


// =============== CRUD APIs
// [post]
app.post("/api/user", (req, res) => {
    const { name, email, password, mobileNumber } = req.body;
    if (!name || !email || !password || !mobileNumber) {
        res.json({
            message: "Required Field are missing !"
        })
        return
    }

    // send data on db
    const objToSend = {
        name,
        email,
        password,
        phone: mobileNumber
    }

    userModel.create(objToSend)
        .then((response) => {
            res.json({
                status: true,
                message: "User Added Successfully !",
                data: response
            })
            // console.log('response:- ',response)
        })
        .catch((err) => {
            res.json({
                status: false,
                message: "Internal Server Error !"
            })
        })

})

//[get] (for all users/data)
/*
 find:- get more than one record/data,
 findOne:- to get one record
 findById
*/
// to get all the data from DB
app.get("/api/users", (req, res) => {
    // const findQuery = {phone:"3331377219"};
    // const findQuery = { name: "ahtesham", phone: "3331377219" };
    const findQuery = {};

    userModel.find(findQuery)
        // userModel.findOne(findQuery)
        .then((response) => {
            console.log('response:- ', response)
            res.json({
                status: true,
                message: "Users get Successfully !",
                data: response
            })
        })
        .catch((err) => {
            res.json({
                status: false,
                message: "Internal Server Error !"
            })
        })
})

// to get specific data
app.get("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const findQuery = {
        _id: id
    }

    // userModel.findOne(findQuery)
    userModel.findById(findQuery)
        .then((response) => {
            console.log('response:- ', response)
            res.json({
                status: true,
                message: "Users get Successfully !",
                data: response
            })
        })
        .catch((err) => {
            res.json({
                status: false,
                message: "Internal Server Error !"
            })
        })
})

// to update specific data
// findByIdAndUpdate(jisko update kraana hyy, jis se update krana hyy,optional)
app.put("/api/user", (req, res) => {
    const { id, ...updatedData } = req.body
    userModel.findByIdAndUpdate(id, updatedData, { new: true })
        .then((response) => {
            console.log('response:- ', response)
            res.json({
                status: true,
                message: "Users updated Successfully !",
                data: response
            })
        })
        .catch((err) => {
            res.json({
                status: false,
                message: "Internal Server Error !"
            })
        })
})

//delete
// findByIdAndDelete
app.delete("/api/user/:id", (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.json({
            message: "Id is required !"
        })
        return
    }
    // sending to db
    userModel.findByIdAndDelete(id)
        .then((response) => {
            console.log('response:- ', response)
            res.json({
                status: true,
                message: "Users Deleted Successfully !",
                data: response
            })
        })
        .catch((err) => {
            console.log(err)
            res.json({
                status: false,
                message: "Internal Server Error !"
            })
        })
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
                    res.json({
                        message:`${user.name} login successfully !`
                    })
                }
            }
        })
        .catch((err) => {
            console.log(err)
        })
})


app.listen(PORT, () => console.log(`server is running on localhost:${PORT}`))