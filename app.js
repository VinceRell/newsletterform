// store dependencies in constants
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path");

// initialize express
const app = express();

// BodyParser middleware to fetch the bdy of the post request
app.use(bodyParser.urlencoded({ extended: true }));

//  declare a static folder where html files will be stored for serving
app.use(express.static(path.join(__dirname, "public")));

// signup route handler 
app.post("/signup", (req, res) => {
   const { firstname, lastname, email } = req.body;

//    checking if fields are filled in 
   if(!firstname || !lastname || !email) {
       res.redirect("/fail.html");
       return;
   }

   const options = {
       url: ''
   }

   request(options, (err, response, body) => {

   });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server has started on ${PORT}`));

