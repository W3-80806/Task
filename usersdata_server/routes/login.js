const mysql = require('mysql');
const express = require('express');
const config = require('config');
const app =  express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { json } = require('body-parser');


// Required to parse JSON request bodies
app.use(express.json());

// Use environment variables or replace these with your DB details
var connectionDetails = {
                            host: config.get("server"),
                            database: config.get("database"),
                            user: config.get("user"),
                            password: config.get("password")
                        }

const jwtSecret = "your_jwt_secret_key"; // Use .env in real apps

app.post("/logins", (request, response) => {
    const connection = mysql.createConnection(connectionDetails);

    const email = request.body.email;
    const password = request.body.password;

  const statement = `SELECT * FROM users WHERE email =? AND password =?`;

    connection.query(statement, [email,password], async (error, results) => {
      console.log(JSON.stringify(results));
        if (error) {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify({ error: "Database error", details: error }));
            connection.end();
            return response.end();
        }

        if (results.length === 0) {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify({ error: "Invalid email or password" }));
            connection.end();
            return response.end();
        }

        const user = results[0];

        // Check password using bcrypt
        console.log(password,user.password);
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify({ error: "Invalid email or password" }));
            connection.end();
            return response.end();
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, email: user.email,password:user.password }, jwtSecret, {
            expiresIn: "1h"
        });

        console.log(token);

        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify({ message: "Login successful", token }));
        connection.end();
        response.end();
    });
});


module.exports =app;