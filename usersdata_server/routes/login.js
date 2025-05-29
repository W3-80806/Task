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

//Below code handles Users GET
app.get("/login", (request, response) => {
  const connection = mysql.createConnection(connectionDetails);

  const username = request.query.username;
  const password = request.query.password;

  const statement = `SELECT * FROM usersdata WHERE username = ? AND password = ?`;

  connection.query(statement, [username, password], (error, result) => {
    response.setHeader("Content-Type", "application/json");

    if (!error) {
      response.write(JSON.stringify(result));
    } else {
      response.write(JSON.stringify({ error: error.message }));
    }

    connection.end();
    response.end();
  });
});

module.exports =app;