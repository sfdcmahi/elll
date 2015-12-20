/*
 * Project Elll Emergency Contacts service.
 */

exports.emergencyContactsImpl = function (req, res)
{
    var mobile = req.body.authtoken;
    var cassandra = require('cassandra-driver');
    var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'elll'})

    var numbers = req.body.numbers;
    var user = {"mobile": mobile, "emergencycontacts": numbers};
    var query = "UPDATE user SET emergencycontacts = :emergencycontacts where mobile = :mobile";

    client.execute(query, user, {prepare: true}, function (err, result) {
        // Run next function in series
        if (err) {
            console.log(err);
            res.status(500).send({"error": "Unable to add emergency contacts"});
        }

        if (result) {
            res.writeHead(200, "OK", {'Content-Type': 'text/html'});
            res.end();
        }
    });
};

