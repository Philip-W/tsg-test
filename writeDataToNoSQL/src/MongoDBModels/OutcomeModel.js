var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OutcomeSchema = new Schema({
  outcome: {
    header: {
        msgId: Number,
        operation: String,
        type: {type: String},
        timestamp: Number
     },
    body: {
      marketId: String,
      outcomeId: String, 
      name: String,
      price: String, 
      displayed: Boolean, 
      suspended: Boolean
    }
  }
});


var OutcomeModel = mongoose.model('Outcome', OutcomeSchema);

module.exports = { OutcomeModel, OutcomeSchema }