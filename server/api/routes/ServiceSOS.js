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

			var http=require('http');
			var urlencode = require('urlencode');
			latlong = latlong.replace(/ /g,'');
			var optionsget={
		                host:'localhost',
		                port:8983,
		                path:'/solr/elll.user/select?q=*%3A*&fq=%7B!geofilt+pt%3D'+urlencode(latlong)+'+sfield%3Dlatlong+d%3D5%7D&wt=json&indent=true',
		                method:'GET'
			};
	
			var reqGet = http.request(optionsget, function(respo) {
		    		console.log("statusCode: ", respo.statusCode);
			    	// console.log(res);
     
			    	respo.on('data', function(d) {
		   		    console.info('GET result:\n');
		        	    process.stdout.write(d);
				    console.info('\n\nCall completed');

				    var docs = d.response.docs;
				    
			            res.writeHead(200, "OK", {'Content-Type': 'text/html'});
			    	    var response = '{"requiestid": '+requestId+'}';
			            res.end(response);
				});
		
			});
	
			reqGet.end();
			reqGet.on('error', function(e) {
			        console.log("ddddddddddddddddddddddddd");
			    	console.error(e);
			});
	        }
        });


};

