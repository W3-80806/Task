const express = require('express');
const config = require('config');
const PORT = config.get("port");
const cors =require('cors');
const Users = require('./routes/users');
const Login = require('./routes/login');
const Post = require('./routes/post');
const Posts = require('./routes/posts');

const app =  express();

app.use(express.json());
app.use(cors());
app.use("/users", Users);
app.use("/login", Login);
app.use("/post", Post);
app.use("/posts", Posts);

app.listen(PORT, ()=>{console.log(`server started listening at port ${PORT}`);});

