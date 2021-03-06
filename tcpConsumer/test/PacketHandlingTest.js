var assert = require('assert');
var parsePacketBlockIntoList = require('../src/PacketHandling/RawPacketProcessing').parsePacketBlockIntoList;
var parseStringToJSON = require('../src/PacketHandling/RawPacketProcessing').parseStringToJSON;

describe('Packet Processing', function() {
  it('should correctly parse an Event string into an Event JSON object', function() {
    let eventString = '|1|create|event|1234|id|Football|Sky Bet League One|team1 vs team2|1579512782743|0|1|';
    let expectedObject = {
      header: { msgId: 1, operation: 'create', type: 'event', timestamp: 1234 },
      body:
              { eventId: 'id',
                category: 'Football',
                subCategory: 'Sky Bet League One',
                name: 'team1 vs team2',
                startTime: 1579512782743,
                displayed: '0',
                suspended: '1' },
    };

    let event = parseStringToJSON(eventString);
    assert.deepEqual(event, expectedObject);
  });

  it('should correctly parse a Market packet string into a Market JSON object', function() {
    let marketString = '|40|create|market|231|id1|id2|Full Time Result|0|1|';
    let expectedMarketObject = {
      header: { msgId: 40, operation: 'create', type: 'market', timestamp: 231 },
      body:
                { eventId: 'id1',
                  marketId: 'id2',
                  name: 'Full Time Result',
                  displayed: '0',
                  suspended: '1' },
    };

    let market = parseStringToJSON(marketString);
    assert.deepEqual(market, expectedMarketObject);
  });

  it('should parse an Outcome packet string into an Outcome JSON object', function() {
    let outcomeString = '|42|create|outcome|323|id1|id2|Draw|11/10|0|1|';
    let expectedMarketObject = {
      header: { msgId: 42, operation: 'create', type: 'outcome', timestamp: 323 },
      body:
             { marketId: 'id1',
               outcomeId: 'id2',
               name: 'Draw',
               price: '11/10',
               displayed: '0',
               suspended: '1' },
    };


    let outcome = parseStringToJSON(outcomeString);
    assert.deepEqual(outcome, expectedMarketObject);
  });

  it('should correctly parse an Event string into an Event JSON object containing escaped seperators', function() {
    let eventString = '|1|create|event|1234|id|Football|Sky Bet League One|\\|team1\\| vs \\|team2\\||1579512782743|0|1|';
    let expectedObject = {
      header: { msgId: 1, operation: 'create', type: 'event', timestamp: 1234 },
      body:
              { eventId: 'id',
                category: 'Football',
                subCategory: 'Sky Bet League One',
                name: '\\|team1\\| vs \\|team2\\|',
                startTime: 1579512782743,
                displayed: '0',
                suspended: '1' },
    };

    let event = parseStringToJSON(eventString);
    assert.deepEqual(event, expectedObject);
  });

  it('should correctly parse a Market packet string into a Market JSON object containing escaped seperators', function() {
    let marketString = '|40|create|market|231|id1|id2|\\|Full Time Result\\||0|1|';
    let expectedMarketObject = {
      header: { msgId: 40, operation: 'create', type: 'market', timestamp: 231 },
      body:
                { eventId: 'id1',
                  marketId: 'id2',
                  name: '\\|Full Time Result\\|',
                  displayed: '0',
                  suspended: '1' },
    };

    let market = parseStringToJSON(marketString);
    assert.deepEqual(market, expectedMarketObject);
  });

  it('should parse an Outcome packet string into an Outcome JSON object which contains escaped seperators', function() {
    let outcomeString = '|42|create|outcome|323|id1|id2|\\|Draw\\||\\|11/10\\||0|1|';
    let expectedMarketObject = {
      header: { msgId: 42, operation: 'create', type: 'outcome', timestamp: 323 },
      body:
             { marketId: 'id1',
               outcomeId: 'id2',
               name: '\\|Draw\\|',
               price: '\\|11/10\\|',
               displayed: '0',
               suspended: '1' },
    };


    let outcome = parseStringToJSON(outcomeString);
    assert.deepEqual(outcome, expectedMarketObject);
  });
});


describe('Packet line parsing', function() {
  it('should return a list of strings that were seperated by new line characters', function() {
    let newLineStrings = '|1|create|event|1234|id|Football|Sky Bet League One|team1 vs team2|1579512782743|0|1|\n' +
    '|1|create|event|1234|id|Football|Sky Bet League One|team1 vs team2|1579512782743|0|1|\r\n' +
    '|1|create|event|1234|id|Football|Sky Bet League One|team1 vs team2|1579512782743|0|1|';
    let expectedObject = [
      '|1|create|event|1234|id|Football|Sky Bet League One|team1 vs team2|1579512782743|0|1|',
      '|1|create|event|1234|id|Football|Sky Bet League One|team1 vs team2|1579512782743|0|1|',
      '|1|create|event|1234|id|Football|Sky Bet League One|team1 vs team2|1579512782743|0|1|'
    ];

    let event = parsePacketBlockIntoList(newLineStrings)
    assert.deepEqual(event, expectedObject);
  });
});