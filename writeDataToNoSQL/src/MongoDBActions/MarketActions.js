var MarketModel = require('../MongoDBModels/MarketModel').MarketModel;
var EventModel = require('../MongoDBModels/EventModel').EventModel;

let writeMarketToStore = function(marketData) {
  let marketModelInstance = new MarketModel({
    market: {
      header: {
        msgId: marketData.header.msgId,
        operation: marketData.header.operation,
        type: marketData.header.type,
        timestamp: marketData.header.timestamp,
      },
      body: {
        eventId: marketData.body.eventId,
        marketId: marketData.body.marketId,
        name: marketData.body.name,
        displayed: marketData.body.displayed,
        suspended: marketData.body.suspended,
      },
    },
  });

  EventModel.updateOne(
    {'event.body.eventId': marketData.body.eventId},
    {$push: {markets: marketModelInstance}},
  ).exec();
};


module.exports = { writeMarketToStore };
