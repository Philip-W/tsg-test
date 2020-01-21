let consumer = require('./TCPConsumer')
let TCPConsumer = consumer.TCPConsumer;

let tcpConsumer = new TCPConsumer();
tcpConsumer.startReceivingPackets();