let consumer = require('./TCPConsumer')
let TCPConsumer = consumer.TCPConsumer;
let KafkaPublisher = require('./queue/KafkaPublisher').KafkaPublisher;

let kafkaQueue = new KafkaPublisher()
let tcpConsumer = new TCPConsumer('127.0.0.1', 8282, kafkaQueue); // config

tcpConsumer.startReceivingPackets();