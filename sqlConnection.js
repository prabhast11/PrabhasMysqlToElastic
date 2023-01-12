const { createConnection, createPool } = require("mysql");


const con = createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "test2",
  });
  

con.connect(function (err) {
    if (err) {
      return console.error("error: " + err.message);
    }
  
    console.log("Connected to the MySQL server.");
})

module.exports = con