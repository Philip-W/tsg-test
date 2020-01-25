
let config = {
  kafka_address: process.env.KAFKA_ADDRESS || 'localhost:2181',
  kafka_topic: process.env.KAFKA_TOPIC || 'dev.betting',
  mongo_host: process.env.MONGO_HOST || 'mongodb://localhost',
  mongo_port: process.env.MONGO_PORT || '27017',
  mongo_table: process.env.MONGO_TABLE || 'test',
};

module.exports = { config };
