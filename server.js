const { createConnection, createPool } = require("mysql");
const express = require("express");
const { uuid } = require('uuidv4');
const stream = require('stream');

// elastic and mysql connection
var client = require("./elasticConnection.js");
var con = require("./sqlConnection.js");


const app = express();
app.use(express.json());


//creating unique id for agentLoggerUuid
const new_id1  = uuid()
const new_id2  = uuid()
const new_id3 = uuid()
const new_id4  = uuid()
const new_id5  = uuid()
const new_id6  = uuid()
const new_id7  = uuid()
const new_id8  = uuid()


  var sql = `CREATE TABLE disposecall  (id int NOT NULL,cdrid varchar(255) not null,
  agent_talktime_sec int, start_stamp DATETIME ,
  PRIMARY KEY (id))`;

  var sql2 =
`INSERT INTO disposecall (id,cdrid, agent_talktime_sec, start_stamp) VALUES (8,'619fb659-539a-44fe-ba2d-df410529e38c',47,'2021-03-02 04:11:20'),
(2,'41c6e503-52b2-4c3b-bcd3-42590f784d5b',15,'2021-08-06 06:18:20'),
(3,'5500384a-4613-483e-b997-f2a6c68af0ec',35,'2020-02-07 07:01:20'),
(4,'31c7f279-a625-4aae-b9bd-b055f8c8423b',23,'2021-03-08 08:19:20'),
(5,'df533667-f080-4878-9e59-87bacf3ef567',08,'2020-04-09 09:18:20'),
(6,'003dc08a-278b-4673-b273-a5a29f70c071',18,'2023-07-10 10:17:20'),
(7,'039f2f5a-a824-44d2-aad2-f7011dccf4e1',38,'2022-09-11 11:16:20'),
(1,'8168fcad-767e-45f7-ae1c-fb4f758da6d1',22,'2021-09-10 10:10:20')`;

// var sql5 = `select * from disposecall` ;

con.query(`SELECT * FROM test2.disposecall`)
.on('error', function(err) {
console.log('error',err)  })
.stream()
.pipe(new stream.Transform({
  objectMode: true,
  transform: function (row, encoding, callback) {

    // console.log('row of data',row.cdrid)


    const update = {
      script: {
        source: `ctx._source.callInfo.callTime.talkTime = ${row.agent_talktime_sec}`,
    
      },
      query: {
        bool: {
          must: {
            match: {
              "callInfo.customerLegUuid.keyword":`${row.cdrid}`,
            },
          },
        },
      },
    };

    client
    .updateByQuery({
      index: "my_index",
      body: update,
    })
    .then(
      (res) => {
        console.log("Success", res);
      },
      (err) => {
        console.log("Error", err);
      }
    );

    callback();
  }
}))
.on('finish', function() {
  con.end();
});


app.listen(3000,() =>{
  console.log('app is running on port 3000')
})
