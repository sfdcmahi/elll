/*
 * Project Elll Emergency Contacts service.
 */

exports.sosImpl = function (req, res)
{
        var mobile = req.body.authtoken;
        var cassandra = require('cassandra-driver');
        var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'elll'})
	
	var latlong = req.body.latlong;
 	var requestId = cassandra.types.Uuid.random().toString();
	var currTime = new Date().getTime();
        var sos = {"requestid": requestId, "timestamp": currTime, "latlong": latlong}
	var user = {"mobile": mobile, "latlong": latlong, "sos": sos};
        var query = "UPDATE user SET sos = :sos, latlong= :latlong where mobile = :mobile";
	self = this;
 
        client.execute(query, user, { prepare: true}, function (err, result) {
           // Run next function in series
        	if (err) {
	            console.log(err);
	            res.status(500).send({"error": "Unable to create sos request"});
	        }

        	if (result) {
	            res.writeHead(200, "OK", {'Content-Type': 'text/html'});
	            res.end(self.requestId);
	        }
        });
};

