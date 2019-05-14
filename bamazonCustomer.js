var config = requires("./config.js");

var password = config.password;

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
   host: "localhost",
   port: 3306,
   user: "root",
   password: password,
   database: "bamazon_DB"
})

connection.connect(function (err) {
   if (err) throw err;
   console.log("connected as id " + connection.threadId);

   connection.end();
})
