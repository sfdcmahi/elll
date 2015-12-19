/*
* Project Elll Server.
*/

var express = require("express");
var app = express();

var bodyParser = require("body-parser");

//Support for https
/*var https = require("https");
var fs = require("fs");

var options = 
{
	key: fs.readFileSync("key.pem"),
	cert: fs.readFileSync("cert.pem")
};*/	

//Required for getting the request data.
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//Adding the required implementation files for API's.
var signup = require("./routes/ServiceSignup");
var signupVerify = require("./routes/ServiceSignupVerify");
var emergencyContacts = require("./routes/ServiceEmergencyContacts");
var invite = require("./routes/ServiceInvite");
var sos = require("./routes/ServiceSOS");
var sosLocation = require("./routes/ServiceSOSLocation");
var sosCancel = require("./routes/ServiceSOSCancel");
var currentLocation = require("./routes/ServiceCurrentLocation"); 

//Exposing the services.
app.post("/v1/signup", signup.signupImpl);
app.post("/v1/signup/verify", signupVerify.signupVerifyImpl);
app.post("/v1/emergencycontacts", emergencyContacts.emergencyContactsImpl);
app.post("/v1/invite", invite.inviteImpl);
app.post("/v1/sos", sos.sosImpl);
app.post("/v1/sos/:requestid/location", sosLocation.sosLocationImpl);
app.post("/v1/sos/:requestid/cancel", sosCancel.sosCancelImpl);
app.post("/v1/location", currentLocation.currentLocationImpl);

// Starting the http server.
app.listen(8090);
console.log("Listening on port 8090...");

//Starting the https server.
//https.createServer(options, app).listen(8086);
//console.log("Listening on port 8086...");
