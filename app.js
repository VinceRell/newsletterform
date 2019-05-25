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
   const { firstName, lastName, email } = req.body;

//    checking if fields are filled in 
   if(!firstName || !lastName || !email) {
       res.redirect("/fail.html");
       return;
   }

   // Construct request data
   const data = {
       members: [
           {
               email_address: email,
               staus: "subscribed",
               merge_fields: {
                   FNAME: firstName,
                   LNAME: lastName
               }
           }
       ]
   };

   //convert post-data object to string    
   const postData = JSON.stringify(data);

   const options = {
       url: 'https://us20.api.mailchimp.com/3.0/lists/c756379f1a',
       method: 'POST',
       headers: {
           Authorization: 'auth 01cb2db8a3a7a4449c6524a652ee30f8-us20'
       },
       body: postData
   }

   request(options, (err, response, body) => {
        if(err) {
            res.redirect("/fail.html");
        } else {
            if(response.statusCode === 200) {
                res.redirect("/success.html");
            } else {
                res.redirect("/fail.html");
            }
        }
   });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server has started on ${PORT}`));

