/*
 * Project Elll Signup service.
 */

exports.signupImpl = function (req, res)
{
    var data = req.body;

    var cassandra = require('cassandra-driver');
    var id = cassandra.types.Uuid.random().toString();
    var name = data.name;
    var mobile = data.mobile;
    var email;
    if (data.email) {
        email = data.email;
    }
    var latlong;
    if (data.latlong) {
        latlong = data.latlong;
    }

    var user = {"mobile": mobile, "id": id, "name": name, "email": email, "latlong": latlong};

    var query = 'INSERT INTO user (mobile, name, email, latlong) VALUES (:mobile, :name, :email, :latlong)';

    var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'elll'});
    client.execute(query, user, {prepare: true}, function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send({"error": "Unable to write to cassandra"});
        }

        if (result) {
            res.writeHead(200, "OK", {'Content-Type': 'text/html'});
            var response = '{"authtoken": "' + data.mobile+ '"}';
            res.end(response);
        }
    });

};
