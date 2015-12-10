var cassandra = require('cassandra-driver');
var id = cassandra.types.Uuid.random().toString();
var mobile = '9008600881';
var email = 'gokumar@bmc.com';
var latlong = '12.967808642028006, 77.60687189419559';

var ec = []
var emergency = {"mobile": "9242263584"}
ec.push(emergency);

var emergency = {"mobile": "9900907607"}
ec.push(emergency);

var user = {"mobile": mobile, "id": id, "email":email, "latlong":latlong, "emergencycontacts":ec};

var query = 'INSERT INTO user (id, mobile, email, latlong, emergencycontacts) VALUES (:id, :mobile, :email, :latlong, :emergencycontacts)';

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'elll'});
client.execute(query, user, { prepare: true }, function(error, result){
    if(error)
        console.log(error);
    process.exit();
});