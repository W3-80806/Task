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



app.post("/register", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);

    var name = request.body.name;
    var email = request.body.email;
    var password = request.body.password;

    var statement = 
        `insert into users(name,email,password) values('${name}','${email}','${password}')`;

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



app.get("/", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);

    var statement = `select * from users`;

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

// app.put("/:id", (request, response)=>{
//     var connection = mysql.createConnection(connectionDetails);
//     var id = request.params.id;
//     var username = request.body.username;
//     var password = request.body.password;
//     var email = request.body.email;
//     var contactNo = request.body.contactNo;

//     var statement = 
//         `update usersdata set username='${username}',password='${password}',email='${email}',contactNo='${contactNo}'where id =${id}`;

//     connection.query(statement, (error, result)=>{
//         if(error==null)
//         {
//             response.setHeader("Content-Type", "application/json");
//             response.write(JSON.stringify(result));
//             connection.end();
//             response.end();
//         }
//         else
//         {
//             response.setHeader("Content-Type", "application/json");
//             response.write(JSON.stringify(error));
//             connection.end();
//             response.end();
//         }
//     })
// });
// app.delete("/:id", (request, response)=>{
//     var connection = mysql.createConnection(connectionDetails);

//     var id = request.params.id;//This data belongs to header part 
  
//     var statement = 
//         `delete from usersdata where id =${id}`;

//     connection.query(statement, (error, result)=>{
//         if(error==null)
//         {
//             response.setHeader("Content-Type", "application/json");
//             response.write(JSON.stringify(result));
//             connection.end();
//             response.end();
//         }
//         else
//         {
//             response.setHeader("Content-Type", "application/json");
//             response.write(JSON.stringify(error));
//             connection.end();
//             response.end();
//         }
//     })
// });

module.exports =app;