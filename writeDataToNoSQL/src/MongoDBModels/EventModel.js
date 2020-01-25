var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MarketSchema = require('./MarketModel').MarketSchema;

var EventSchema = new Schema({
  event: {
    header: {
      msgId: Number,
      operation: String,
      type: {type: String},
      timestamp: Number,
    },
    body: {
      eventId: String,
      category: String,
      subCategory: String,
      name: String,
      startTime: Number,
      displayed: Boolean,
      suspended: Boolean,
    },
  },
  markets: [MarketSchema],
});


var EventModel = mongoose.model('Event', EventSchema);

module.exports = { EventModel };
