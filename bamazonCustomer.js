var config = require("./config.js");

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
   // console.log("connected as id " + connection.threadId);
   start();
   // connection.end();
})

// Main app
function start() {

   connection.query(`SELECT * FROM products WHERE stock_quantity > 0`, function (err, response) {
      if (err) throw err;
      // Show all available products to the customer
      printAllProducts(response);

      // Prompt user for which item to buy and how many
      customerShop();

   })

}

// Function to print all product info to the cli.
function printAllProducts(res) {
   for (let i = 0; i < res.length; i++) {
      let item = res[i];
      console.log(`
      ID: ${item.item_id}
      Name: ${item.product_name}
      Price: $${item.price}`);

   }
}

function customerShop() {
   inquirer
      .prompt([
         {
            name: 'item',
            type: 'input',
            message: 'What is the ID of the product that you would like to buy?'
         },
         {
            name: 'quantity',
            type: 'input',
            message: 'How many would you like to buy?'
         }
      ]).then(function(response) {
         var itemID = response.item;
         var quantity = parseInt(response.quantity);

         // Find and check inventory of requested can satisfy request
         connection.query(`SELECT * FROM products WHERE item_id = ${itemID}`,
            function(err, res) {
               if (err) throw err;
// !!!!!! THIS IS WHERE STOCK QUANTITY COMES BACK AS UNDEFINED
               console.log(res.stock_quantity);
               
            })

      })
}