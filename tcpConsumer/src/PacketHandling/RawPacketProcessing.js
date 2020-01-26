let Header = require('../DataTypes/Header').Header;
let Event = require('../DataTypes/Event').Event;
let Market = require('../DataTypes/Market').Market;
let Outcome = require('../DataTypes/Outcome').Outcome;

const newLineMatcher = /\r?\n/;
const pipeMatcherWithEscapeExclusion = /(\\.|[^\|])+/g;

var parsePacketBlockIntoList = function(packetBlock) {
  // Splits the block on new line characters and clears any empty packets created from the split
  return packetBlock.toString().split(newLineMatcher).filter(packet => packet.length > 0);
};


let parseStringToJSON = function(messageString){
  // Seperates the string based on the pipe character, ignoring any escaped character which will remain in the string.
  var escapedString = messageString.match(pipeMatcherWithEscapeExclusion);
  var header = new Header(escapedString.slice(0, 4));
  var body = escapedString.slice(4);

  switch (header.type){
    case 'event':
      return new Event(header, body);
    case 'market':
      return new Market(header, body);
    case 'outcome':
      return new Outcome(header, body);
    default:
      console.warn('Failed to parse message into JSON object');
  }
};

module.exports = { parsePacketBlockIntoList, parseStringToJSON };
