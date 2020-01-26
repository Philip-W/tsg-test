let consumer = require('./TCPConsumer');
let config = require('../config').config

let TCPConsumer = consumer.TCPConsumer;
let KafkaPublisher = require('./queue/KafkaPublisher').KafkaPublisher;

let kafkaQueue = new KafkaPublisher(
	config.kafka_host,
	config.kafka_topic
);
let tcpConsumer = new TCPConsumer(
	config.tcp_stream_host,
	config.tcp_stream_port,
	kafkaQueue
);

tcpConsumer.startReceivingPackets();
