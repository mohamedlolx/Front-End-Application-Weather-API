// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3030;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

// post request side
app.post("/addWeather", (req, res) => {
  const date = req.body.date;
  const temp = req.body.temp;
  const content = req.body.content;
  projectData = { date, temp, content };
  //here to make sure that the data is posted to the server so i make console.log in the server with the specific date got from th e client
  console.log(
    `The POST request is done, feeling is( ${content} ) also temp is ( ${temp} ) celsius and the date is ( ${date} )`
  );
  //here we use res.end so i can go to the other requests
  res.end();
});

//get request side
app.get("/getWeather", (req, res) => {
  //here we send the data that the client enter it
  res.send(projectData);
  //to maek sure that the request is done i just log this data in the server side
  console.log("The GET request also done and all data is shown in the page");
});
