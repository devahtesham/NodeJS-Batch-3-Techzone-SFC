const express = require("express");         // import 
const mongoose = require("mongoose");
const userModel = require("./model/userSchema");
const app = express();                      // initialize
const PORT = '5000'

const BASE_URI = "mongodb+srv://backendlearning921:cJkSL7PKne3tDRLz@cluster0.s3n5bsa.mongodb.net/USERS_DATA"
mongoose.connect(BASE_URI)
    .then((res)=> console.log("Mongo DB Connect !"))
    .catch((err)=> console.log("Internal Server Error"))




// creating simple APIS.

// body parser
app.use(express.json());
// GET
// syntax:- app.get("endpoint",callbackFn)

// testing
// app.get("/api/check",(req,res)=>{
//     res.send("ALL GOOD !")
// })
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
        id:1,
        name:"hassan",
        course:"JS"
    },
    {
        id:2,
        name:"kamran",
        course:"JS"
    },
    {
        id:3,
        name:"akhshy",
        course:"JS"
    },
    {
        id:4,
        name:"ahtesham",
        course:"JS"
    },
    {
        id:5,
        name:"apun",
        course:"JS"
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
app.post("/api/user",(req,res)=>{
    const {name,email,password,mobileNumber} = req.body;
    if (!name || !email || !password || !mobileNumber){
        res.json({
            message:"Required Field are missing !"
        })
        return
    }

    // send data on db
    const objToSend = {
        name,
        email,
        password,
        phone:mobileNumber
    }
    
    userModel.create(objToSend)
    .then((response)=>{
        res.json({
            status:true,
            message:"User Added Successfully !",
            data:response
        })
        // console.log('response:- ',response)
    })
    .catch((err)=>{
        res.json({
            status:false,
            message:"Internal Server Error !"
        })
    })

})
app.listen(PORT,() => console.log(`server is running on localhost:${PORT}`))