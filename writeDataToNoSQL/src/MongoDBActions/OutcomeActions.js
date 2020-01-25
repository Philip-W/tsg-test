var OutcomeModel = require('../MongoDBModels/OutcomeModel').OutcomeModel;
var EventModel = require('../MongoDBModels/EventModel').EventModel;


let writeOutcomeToStore = function(outcomeData) {
  let outcomeModelInstance = new OutcomeModel({
    outcome: {
      header: {
        msgId: outcomeData.header.msgId,
        operation: outcomeData.header.operation,
        type: outcomeData.header.type,
        timestamp: outcomeData.header.timestamp,
      },
      body: {
        marketId: outcomeData.body.marketId,
        outcomeId: outcomeData.body.outcomeId,
        name: outcomeData.body.name,
        price: outcomeData.body.price,
        displayed: outcomeData.body.displayed,
        suspended: outcomeData.body.suspended,
      },
    },
  });

  EventModel.updateOne(
    {markets: {$elemMatch: {'market.body.marketId': outcomeData.body.marketId}}},
    {$push: {'markets.$.outcomes': outcomeModelInstance}},
  ).exec();
};


module.exports = { writeOutcomeToStore };
