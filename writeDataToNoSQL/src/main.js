var EventActions = require('./MongoDBActions/EventActions');
var MarketActions = require('./MongoDBActions/MarketActions');
var OutcomeActions = require('./MongoDBActions/OutcomeActions');
var config = require('../config').config;
var mongoose = require('mongoose');


var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
var Client = kafka.KafkaClient;
var topic = config.kafka_topic;

var topics = [{ topic: topic, partition: 0 }];
var options = {
  autoCommit: true,
  autoCommitIntervalMs: 100,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
};


let storeMessageInDB = function(message) {
  var parsedMessage = JSON.parse(message.value);
  console.log(`Attemping to store message with ID: ${parsedMessage.header.msgId}`);
  switch (parsedMessage.header.type){
    case 'event':
      EventActions.writeEventToStore(parsedMessage);
      break;
    case 'market':
      MarketActions.writeMarketToStore(parsedMessage);
      break;
    case 'outcome':
      OutcomeActions.writeOutcomeToStore(parsedMessage);
      break;
    default:
      console.warn('Failed publish write message to store');
  }
};



mongoose.connect(
    `${config.mongo_host}:${config.mongo_port}/${config.mongo_table}`,
    {useNewUrlParser: true}
);


console.log("Attempting Kafka connection:", config.kafka_address);
var client = new Client();
client.on('ready', function () { console.log('client ready!') });

var consumer = new Consumer(client, topics, options);
consumer.on('message', message => storeMessageInDB(message));
consumer.on('error', function (err) { console.log('error', err) });

