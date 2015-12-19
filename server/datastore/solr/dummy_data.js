var cassandra = require('cassandra-driver');
var id = cassandra.types.Uuid.random().toString();
console.log(">>>>>>>"+id);
var mobile = '9008600881';
var email = 'gokumar@bmc.com';
var latlong = '36.03403034, -79.60687189419559';

var ec = []
var emergency = {"mobile": "9242263584"}
ec.push(emergency);

var emergency = {"mobile": "9900907607"}
ec.push(emergency);

var user = {"mobile": mobile, "id": id, "email":email, "latlong":latlong, "emergencycontacts":ec};

var query = 'INSERT INTO user (userid, mobile, email, latlong) VALUES (:id, :mobile, :email, :latlong)';

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'elll'});
client.execute(query, user, { prepare: true }, function(error, result){
    if(error)
        console.log(error);
    process.exit();
});
