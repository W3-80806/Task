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


//get likes data


app.get("/likes", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);

    var statement = `select * from likes`;

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

// POST /posts/:id/like
app.post("/:id/like", (request, response) => {
    var connection = mysql.createConnection(connectionDetails);

    var post_id = request.params.id;
    var user_id = request.body.user_id;
    var action = request.body.action; // 'like' or 'dislike'

    var checkStatement = `SELECT * FROM likes WHERE post_id = '${post_id}' AND user_id = '${user_id}'`;

    connection.query(checkStatement, [post_id, user_id], (checkError, checkResult) => {
        if (checkError) {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify({ error: "Failed to check like", details: checkError }));
            connection.end();
            return response.end();
        }

        var likeExists = checkResult.length > 0;
console.log(likeExists);
        var statement;
        var values;

        if (likeExists) {
            statement = `UPDATE likes SET action = '${action}' WHERE post_id = '${post_id}' AND user_id = '${user_id}'`;
            values = [action, post_id, user_id];
        } else {
            statement = `INSERT INTO likes (post_id, user_id, action) VALUES ('${post_id}','${user_id}','${action}')`;
            values = [post_Id, user_id, action];
        }

        connection.query(statement, values, (error, result) => {
            response.setHeader("Content-Type", "application/json");

            if (error == null) {
                response.write(JSON.stringify({ message: `${action} recorded` }));
            } else {
                response.write(JSON.stringify({ error: "Failed to update like/dislike", details: error }));
            }

            connection.end();
            response.end();
        });
    });
});

module.exports =app;