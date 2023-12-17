const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../model/userSchema");
const tasksModel = require("../model/taskSchema");

const controllers = {
    check: (req, res) => {
        res.send("ALL GOOD !")
    },

    signup: (req, res) => {
        const { name, email, password, phone } = req.body;
        if (!name || !email || !password || !phone) {
            res.send("Required Fields are missing !")
            return
        }

        userModel.findOne({ email })
            .then(async (user) => {
                if (user) {
                    res.json({
                        message: "Email Address Already In Use"
                    })
                } else {
                    // password hashing
                    let encryptedPassword = await bcrypt.hash(password, 10);
                    // sending data on db
                    let objToSend = {
                        name,
                        email,
                        password: encryptedPassword,
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
    },

    login: (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.send("Required Fields are missing !")
            return
        }

        userModel.findOne({ email })
            .then(async (user) => {
                if (!user) {
                    res.json({
                        message: "Email Not Found !"
                    })
                } else {
                    // sending data on db
                    let isPasswordMatch = await bcrypt.compare(password, user.password)
                    if (!isPasswordMatch) {
                        res.json({
                            message: "Incorrect email or password"
                        })
                    } else {
                        const tokenObj = {
                            ...user
                        }
                        const token = jwt.sign(tokenObj, 'isUserLogin');
                        // console.log('token:- ',token)
                        res.json({
                            message: `${user.name} login successfully !`,
                            token: token
                        })
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },

    addToCart: (req, res) => {
        res.send("Eligible to create a post")
    },

    addTask: (req, res) => {
        const { title, description, status } = req.body;
        if (!title || !description || !status) {
            res.json({
                message: "Required Field are missing !"
            })
            return
        }

        // send data on db
        const objToSend = {
            title,
            description,
            status,
        }

        tasksModel.create(objToSend)
            .then((response) => {
                res.json({
                    status: true,
                    message: "Task Added Successfully !",
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

    },

    getTasks: (req, res) => {
        const findQuery = {};
        tasksModel.find(findQuery)
            .then((response) => {
                res.json({
                    status: true,
                    message: "Tasks Fetches Successfully !",
                    data: response
                })
            })
            .catch((err) => {
                res.json({
                    status: false,
                    message: "Internal Server Error !"
                })
            })
    },

    updateTask: (req, res) => {
        const { id, ...updatedData } = req.body
        tasksModel.findByIdAndUpdate(id, updatedData, { new: true })
            .then((response) => {
                res.json({
                    status: true,
                    message: "Taks updated Successfully !",
                    data: response
                })
            })
            .catch((err) => {
                res.json({
                    status: false,
                    message: "Internal Server Error !"
                })
            })
    },

    deleteTask: (req, res) => {
        const { id } = req.params;
        if (!id) {
            res.json({
                message: "Id is required !"
            })
            return
        }
        // sending to db
        tasksModel.findByIdAndDelete(id)
            .then((response) => {
                res.json({
                    status: true,
                    message: "Task Deleted Successfully !",
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
    }


}

// to get specific data
// app.get("/api/tasks/:id", (req, res) => {
//     const { id } = req.params;
//     const findQuery = {
//         _id: id
//     }

//     // userModel.findOne(findQuery)
//     userModel.findById(findQuery)
//         .then((response) => {
//             console.log('response:- ', response)
//             res.json({
//                 status: true,
//                 message: "Users get Successfully !",
//                 data: response
//             })
//         })
//         .catch((err) => {
//             res.json({
//                 status: false,
//                 message: "Internal Server Error !"
//             })
//         })
// })

module.exports = controllers