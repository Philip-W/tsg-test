let consumer = require('./TCPConsumer');
let config = require('../config').config

let TCPConsumer = consumer.TCPConsumer;
let KafkaPublisher = require('./queue/KafkaPublisher').KafkaPublisher;

let kafkaQueue = new KafkaPublisher();
let tcpConsumer = new TCPConsumer(
	config.tcp_stream_host,
	config.tcp_stream_port,
	kafkaQueue
);

tcpConsumer.startReceivingPackets();
