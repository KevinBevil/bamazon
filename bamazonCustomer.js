// import server password, hidden by gitignore
var config = require("./config.js");
var password = config.password;

// Mysql will be used for the database
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
      // connection.end();
   })

}

// Function to print all product info to the cli.
function printAllProducts(res) {
   for (let i = 0; i < res.length; i++) {
      let item = res[i];
      console.log(`
      ID: ${item.item_id}
      Name: ${item.product_name}
      Price: $${item.price}
      *available: ${item.stock_quantity}`);

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

         if (itemID > 10) {
            console.log("Please enter a number between 1 and 10!");
            customerShop();
            return;
         }
         // Make sure the amount requested is in inventory
         var query = connection.query(`SELECT * FROM products WHERE item_id = ${itemID}`,
            function (error, data) {
               if (error) throw error;

               

               var stockQuantity = data[0].stock_quantity;
               var itemPrice = data[0].price;
               // console.log(stockQuantity - quantity);

               if (stockQuantity - quantity < 0) {
                  console.log("Insufficient quantity!");
                  console.log("Please consider purchasing a lower quantity or shopping for something else.");
                  customerShop();

                  return;
               } else if (typeof (quantity) !== 'number' || !quantity || quantity <= 0) {
                  console.log("Please make sure to enter a positive number for the quantity!");
                  customerShop();
               } else {
                  connection.query(`UPDATE products
                  SET stock_quantity = ${stockQuantity - quantity}
                  WHERE item_id = ${itemID}`, function (error1) {
                        if (error1) throw error1;
                        console.log(`Thank you for your purchase!  Your shipment is being processed.  Your account has been charged $${itemPrice * quantity}`);
                        inquirer.prompt([
                           {
                              name: 'continue',
                              type: 'input',
                              message: 'Do you wish to continue shopping? (Please enter "y" or "n")'
                           }
                        ]).then(function (cont) {
                           if (cont.continue == 'y') {
                              customerShop();
                           } else {
                              console.log('Thank you for shopping!');
                              connection.end();

                           }
                        })
                     })
               }
            })

      })

}

