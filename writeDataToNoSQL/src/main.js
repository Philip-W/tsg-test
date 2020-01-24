var EventActions = require('./MongoDBActions/EventActions').EventActions;
var MarketActions = require('./MongoDBActions/MarketActions').MarketActions;
var OutcomeActions = require('./MongoDBActions/OutcomeActions').OutcomeActions;

var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
var Client = kafka.KafkaClient;
var topic = 'dev.betting'; // config

var topics = [{ topic: topic, partition: 0 }];
var options = { 
  autoCommit: true,
  autoCommitIntervalMs: 100,
  fetchMaxWaitMs: 1000, 
  fetchMaxBytes: 1024 * 1024
};


let storeMessageInDB = function(message) {
  var parsedMessage = JSON.parse(message.value)
    switch(parsedMessage.header.type){
      case 'event':
          EventActions.writeEventToStore(parsedMessage);
          break
      case 'market':
          MarketActions.writeMarketToStore(parsedMessage);
          break;
      case 'outcome':
          OutcomeActions.writeOutcomeToStore(parsedMessage);
          break;
      default:
          console.warn ('Failed publish write message to store');
    }
}


var client = new Client('localhost:2181'); // config

client.on('ready', function () { console.log('client ready!') })

var consumer = new Consumer(client, topics, options);

consumer.on('message', message => storeMessageInDB(message));

consumer.on('error', function (err) { console.log('error', err) });

