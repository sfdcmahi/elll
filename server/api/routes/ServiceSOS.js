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

    client.execute(query, user, {prepare: true}, function (err, result) {
        // Run next function in series
        if (err) {
            console.log(err);
            res.status(500).send({"error": "Unable to create sos request"});
        }

        if (result) {

            var http = require('http');
            var urlencode = require('urlencode');
            latlong = latlong.replace(/ /g, '');
            var optionsget = {
                host: 'localhost',
                port: 8983,
                path: '/solr/elll.user/select?q=*%3A*&fq=%7B!geofilt+pt%3D' + urlencode(latlong) + '+sfield%3Dlatlong+d%3D5%7D&wt=json&indent=true',
                method: 'GET'
            };

            var reqGet = http.request(optionsget, function (respo) {
                //console.log("statusCode: ", respo.statusCode);
                // console.log(res);

                respo.on('data', function (d) {
                    //console.info('GET result:\n');
                    //console.log(d);
                    //process.stdout.write(d);
                    //console.info('\n\nCall completed');

                    var data = JSON.parse(d);
                    var docs = data.response.docs;
                    var gcm = require('node-gcm');

                    var message = new gcm.Message();

                    //API Server Key
                    var sender = new gcm.Sender('AIzaSyDvYAfMt6tY6YuXnjJ2GUzmUQdLy5LCo4A');

                    var registrationIds = [];

                    // Value the payload data to send...
                    message.addData('message', 'Please help, someone is in trouble!');
                    message.addData('body', 'Please help, someone is in trouble!');
                    message.addData('title', 'Elll');
                    message.addData('requestid', requestId);
                    message.addData('victimmobile', mobile);
                    message.addData('victimlatlong', latlong);
                    message.addData('msgcnt', '1'); // Shows up in the notification in the status bar
                    message.addData('soundname', 'beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
                    message.collapseKey = 'demo';
                    message.delayWhileIdle = true; //Default is false
                    message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.

                    for (var indx = 0; indx < docs.length; ++indx) {
                        console.log(docs[indx].mobile);
                        console.log(docs[indx].gcmid);
                        registrationIds.push(docs[indx].gcmid);
                    }

                    console.log("Sending push notifications to " + docs.length + " person(s).");
                    sender.send(message, registrationIds, 4, function (err, result) {
                        console.log(result);
                    });

                    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
                    var response = '{"requiestid": ' + requestId + ', "pushnotificationscount": ' + docs.length + '}';
                    res.end(response);
                });
            });

            reqGet.end();
            reqGet.on('error', function (e) {
                console.error(e);
            });
        }
    });


};

