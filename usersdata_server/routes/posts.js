const mysql = require('mysql');
const express = require('express');
const config = require('config');

const app =  express.Router();

var connectionDetails = {
                            host: config.get("server"),
                            database: config.get("database"),
                            user: config.get("user"),
                            password: config.get("password")
                        }

//Below code handles Users GET, POST, PUT,DELETE

//Pagination for GET /posts
app.get("/", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);
    var offset = parseInt(request.query.offset) ;
    var limit = parseInt(request.query.limit) ;
    // var offset=(page-1) *limit;
    var statement = `SELECT * FROM posts ORDER BY createdAt DESC LIMIT ${limit} OFFSET ${offset}`;

    connection.query(statement, (error, result)=>{
        if(error==null)
        {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(result));
            connection.end();
            response.end();
        }
        else
        {
            response.setHeader("Content-Type", "application/json");
             response.write(JSON.stringify(error));
            connection.end();
            response.end();
        }
    })
});


module.exports =app;