/***** import primary materials in order to build the Api code *****/
// import Google api library
var {
  google
} = require("googleapis");
// import the Google drive module in google library
var drive = google.drive("v3");
// import our private key
var key = require("./private_key.json");

// import path ° directories calls °
var path = require("path");
// import fs ° handle data in the file system °
var fs = require("fs");


/***** make the request to retrieve an authorization allowing to work with the Google drive web service *****/
// retrieve a JWT
var jwToken = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key, ["https://www.googleapis.com/auth/drive"],
  null
);
jwToken.authorize((authErr) => {
  if (authErr) {
    console.log("error : " + authErr);
    return;
  } else {
    console.log("Authorization accorded");
  }
});

/**** make request to the Google drive web service ****/
// list file in speciifcs folder
var folder = "0B-5fNi8tMjJneU5MWTMxZmtuQ2c"
drive.files.list({

  auth: jwToken,
  pageSize: 10,
  q: "'" + folder + "' in parents and trashed=false",
  fields: 'files(id, name)',
}, (err, {
  data
}) => {
  if (err) return console.log('The API returned an error: ' + err);
  var files = data.files;
  if (files.length) {
    console.log('Files:');
    files.map((file) => {
      console.log(`${file.name} (${file.id})`);
    });
  } else {
    console.log('No files found.');
  }
});


