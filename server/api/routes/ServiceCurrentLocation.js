/*
 * Project Elll Emergency Contacts service.
 */

exports.currentLocationImpl = function (req, res)
{
        var mobile = req.body.authtoken;
        var cassandra = require('cassandra-driver');
        var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'elll'})
	
	var latlong = req.body.latlong;
	var user = {"mobile": mobile, "latlong": latlong};
        var query = "UPDATE user SET latlong = :latlong where mobile = :mobile";
 
        client.execute(query, user, { prepare: true}, function (err, result) {
           // Run next function in series
        	if (err) {
	            console.log(err);
	            res.status(500).send({"error": "Unable to update current location"});
	        }

        	if (result) {
	            res.writeHead(200, "OK", {'Content-Type': 'text/html'});
	            res.end();
	        }
        });
};

