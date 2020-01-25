var kafka = require('kafka-node');
var Producer = kafka.Producer;
var Client = kafka.KafkaClient;

class KafkaPublisher {
    constructor(){
        var client = new Client({kafka_server: 'localhost:9092'}); // config
        this.topic = 'dev.betting'; // config

        this.producer = new Producer(client, { requireAcks: 1 });
        this.producer.on('error', function (err) {console.log('error', err)});
        this.producer.on('ready', function () { console.log('Ready to publish messages')});
    }

    publishMessageToQueue(message) {
        this.producer.send([{ topic: this.topic, messages: [message] }], function (err, result) {
            if (err){ console.warn(err) }
        });
    }
}

module.exports = { KafkaPublisher };