const express = require("express");
const app= express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path= require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

const sessionOptions = ({
    secret: "mysupersecretstring",
    resave: false,
    saveUnintialized: true,
});
app.use(session(sessionOptions));
app.use(flash());

app.get("/register", (req,res)=>{
    let { name = "anonymous"} = res.query;
    req.session.name = name;
    req.flash("success", "user registerd successfully")
    res.redirect("/hello");
});

app.get("/hello" ,(req, res) =>{
    res.locals.messages = req.flash("success");
    res.render("page.ejs", {name: req.session.name});
});