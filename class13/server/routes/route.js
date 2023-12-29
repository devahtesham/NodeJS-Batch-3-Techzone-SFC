const express = require('express');
const route = express.Router();
const middlewares = require("../middlewares/authMiddleware");
const controllers = require('../controllers/controllers');


// testing
route.get("/check",controllers.check)


// =========== AUTHENTICATION =========
route.post("/signup", controllers.signup)
route.post("/login", controllers.login)

// private API
// route.get("/api/addToCart",middlewares.AUTH_MIDDLEWARE)


// ============== TASK MANAGEMENT APIs

route.post("/addTask",middlewares.AUTH_MIDDLEWARE, controllers.addTask)
route.get("/tasks",middlewares.AUTH_MIDDLEWARE, controllers.getTasks)
route.put("/task",middlewares.AUTH_MIDDLEWARE, controllers.updateTask)
route.delete("/tasks/:id",middlewares.AUTH_MIDDLEWARE, controllers.deleteTask)

module.exports = route