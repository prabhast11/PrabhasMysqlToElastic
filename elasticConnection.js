
var elasticsearch = require("elasticsearch");

var client = new elasticsearch.Client({
  hosts: ["https://elastic-50-uat.slashrtc.in/elastic"],
});

client.ping(
    {
      requestTimeout: 30000,
    },
    function (error) {
      if (error) {
        console.error("Cannot connect to Elasticsearch.");
        console.error(error);
      } else {
        console.log("Connected to Elasticsearch was successful!");
      }
    }
  );

module.exports = client