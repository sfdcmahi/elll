/*
 * Project Elll Emergency Contacts service.
 */

exports.updateGcmImpl = function (req, res)
{
    var mobile = req.body.authtoken;
    var cassandra = require('cassandra-driver');
    var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'elll'})

    var gcmId = req.body.gcmid;
    var user = {"mobile": mobile, "gcmid": gcmId};
    var query = "UPDATE user SET gcmid = :gcmid where mobile = :mobile";

    client.execute(query, user, {prepare: true}, function (err, result) {
        // Run next function in series
        if (err) {
            console.log(err);
            res.status(500).send({"error": "Unable to update gcm id"});
        }

        if (result) {
            res.writeHead(200, "OK", {'Content-Type': 'text/html'});
            res.end();
        }
    });
};

