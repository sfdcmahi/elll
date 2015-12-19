var kafka= require('kafka-node');
var Consumer = kafka.Consumer;
var client = new kafka.Client();
var consumer = new Consumer(client,[{topic:"elll",partition: 0,offset:29}],{autoCommit: false,fromOffset: true});
consumer.on('message',function(message){
	console.log(message);
});
consumer.on('error',function(error){
	console.log(error);
});
