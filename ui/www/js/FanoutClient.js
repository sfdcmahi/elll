
//var client = new Faye.Client('http://pubsub.fanout.io/r/22b8d59d/bayeux');
var client = new Faye.Client('http://22b8d59d.fanoutcdn.com/bayeux');
client.subscribe('/ELLL', function (data) {
    alert('got data: ' + data);
}).then(function() {
    alert('subscribed!');
});