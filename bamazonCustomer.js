var config = require("./config.js");

var password = config.password;

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
   host: "localhost",
   port: 3306,
   user: "root",
   password: password,
   database: "bamazon_db"
})

connection.connect(function (err) {
   if (err) throw err;
   // console.log("connected as id " + connection.threadId);
   start();
   // connection.end();
})
var itemID;
var quantity;
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
      ]).then(function (answers) {
         itemID = parseInt(answers.item);
         quantity = parseInt(answers.quantity);

         // Make sure the amount requested is in inventory
         var query = connection.query('SELECT * FROM products WHERE item_id = 1',
            function (error, data) {
               if (error) throw err;
               console.log(itemID);

               console.log(data[0].stock_quantity);
            })
         console.log(query.sql);

      })

}

