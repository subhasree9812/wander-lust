const express = require("express");
const router = express.Router();

//Index-users
router.get("/users",(req,res)=>{
    res.send("GET for users");
});

//SHOW-users
router.get("/users:id", (req,res) =>{
    res.send("GET for user id");
});

//POST-users
router.post("/users", (req,res)=>{
    res.send("POST for users");
});

//DELETE-users
router.delete("/users/id", (req,res)=>{
    res.send("DELETE for user id");
});

module.exports = router;