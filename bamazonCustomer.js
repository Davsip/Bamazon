
var mysql = require ('mysql');
var inquirer = require('inquirer')

var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,

    user:"root",
    password: "central1889",
    database:"Bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
   start();

  });
 
 
// will display the data 
function start() {

  connection.query("SELECT * FROM products", function(err,res) {
      if(err) throw err;
      console.log(res);
      
  });
}

inquirer 
.prompt([

{ 
type: "input", 
message:" What product would you like to buy?",
name:"The_buy_ID"
},

{
    type: "input", 
    message:"How many items do you want ?",
    name:"Total_amount"

}

]).then(function(results){
    console.log(results)// results 
})

var quantity = 0;
connection.query(`SELECT stock_quantity FROM products WHERE item_id=${results.The_wanted_ID}`, function(err,result){
    if (err) throw err;
    
    quantity = result;
    
});



var stockQty = quantity - results.The_wanted_ID; 
connection.query(`UPDATE products SET stock_quantity=${stockQty} WHERE item_id=${results.The_wanted_ID}`, function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
});
