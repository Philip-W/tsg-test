var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OutcomeSchema = require('./OutcomeModel').OutcomeSchema;

var MarketSchema = new Schema({
  market: {
    header: {
      msgId: Number,
      operation: String,
      type: {type: String},
      timestamp: Number
    },
    body: {
      eventId: String, 
      marketId: String, 
      name: String, 
      displayed: Boolean,
      suspended: Boolean
    }
  },
  outcomes: [OutcomeSchema]
})

var MarketModel = mongoose.model('Market', MarketSchema);

module.exports = { MarketModel, MarketSchema }