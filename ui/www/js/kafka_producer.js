var kafka = require('kafka-node');
var Producer = kafka.Producer;
var client = new kafka.Client();
var producer = new Producer(client);

var payloads = [
                 {topic:'elll',messages:['Hi Om How r U','I Am fine'],partition:0}
               ];
producer.on('ready',function(){
	producer.send(payloads,function(error,data){
		console.log(data);
	});
});
producer.on('error',function(error){
console.log(error);
});


