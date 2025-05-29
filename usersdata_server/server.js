const express = require('express');
const config = require('config');
const PORT = config.get("port");
const cors =require('cors');
const usersRouteHandlerApp = require('./routes/users');
const searchRouteHandlerApp = require('./routes/login');

const app =  express();

app.use(express.json());
app.use(cors());
app.use("/users", usersRouteHandlerApp);
app.use("/login", searchRouteHandlerApp);

app.listen(PORT, ()=>{console.log(`server started listening at port ${PORT}`);});

