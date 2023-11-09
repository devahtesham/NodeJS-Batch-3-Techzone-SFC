const express = require("express");
const app = express();
const PORT = "5000" || process.env.PORT;

/*
    RULES FOR CREATING REST api:-

    1. create api with /api.
    2. create api of the specific method which you want to use for eg if you want to update data, use put intead of post
*/

// body parser
app.use(express.json())

// --------- creating Basic APIs
// syntax:- app.get("endpoint",callbackFn)
app.get("/api/getUser",(req,res)=>{
    console.log("API Hits Successfully ")
    // res.send("User get successfully !!");
    res.json([{
        message:"User get successfully !!",
        status:true
    }])
})

app.post('/api/createUser',(req,res)=>{
    const body = req.body;
    console.log('body:- ',body)
    res.json({
        data:body,
        message:"User create successfully !!",
        status:true
    })
})



app.listen(PORT,()=> console.log(`server is running on localhost:${PORT}`))