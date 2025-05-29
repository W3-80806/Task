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

app.get("/", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);

    var statement = `select * from posts`;

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

//get post by ID

app.get("/:id", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);
    var id = request.params.id;
    var statement = `select * from posts where id =${id}`;

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


//create new post(authenticated)

app.post("/:id", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);

    var authorId = request.params.id;
    var title = request.body.title;
    var content = request.body.content;

    var statement = 
        `insert into posts(title,content,authorId) values('${title}','${content}','${authorId}')`;

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

//Update a Post(only the author)

app.put("/:authorid", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);
   var authorId = request.params.authorid;
    var title = request.body.title;
    var content = request.body.content;

    var statement = 
        `update posts set title='${title}',content='${content}'where authorId =${authorId}`;

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

//Delete a Post(only the author)

app.delete("/:authorid", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);

    var authorId = request.params.authorid;//This data belongs to header part 
  
    var statement = 
        `delete from usersdata where authorId =${authorId}`;

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



// POST:posts/:id/comments:Add comment to a post using userid
app.post("/:userId/comments", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);

    var userId = request.params.userId;
    var postId = request.body.postId;
    var comment = request.body.comment;

    var statement = 
        `insert into comments(postId,userId,comment) values('${postId}','${userId}','${comment}')`;

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

// GET:posts/:id/comments:Get All Comments for a post using userid
app.get("/:userId/comments", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);
    var userId = request.params.userId;
    var statement = `select * from comments where userId =${userId}`;

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