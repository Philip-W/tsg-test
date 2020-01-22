var assert = require('assert');
var Packet = require('../src/Packet').Packet;

describe('Packet', function() {
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
                suspended: '1' } 
            }
          
        let event = new Packet(eventString).toJson()
        assert.deepEqual(event, expectedObject);
    });

    it('should correctly parse a Market packet string into a Market JSON object', function() {
        let marketString = '|40|create|market|231|id1|id2|Full Time Result|0|1|';
        let expectedMarketObject =  {
            header: { msgId: 40, operation: 'create', type: 'market', timestamp: 231 },
            body: 
                { eventId: 'id1',
                marketId: 'id2',
                name: 'Full Time Result',
                displayed: '0',
                suspended: '1' } 
        }
      
        let market = new Packet(marketString).toJson()
        assert.deepEqual(market, expectedMarketObject);
    });

    it('should parse an Outcome packet string into an Outcome JSON object', function() {
        let outcomeString = '|42|create|outcome|323|id1|id2|Draw|11/10|0|1|';
        let expectedMarketObject =  {
            header:{ msgId: 42, operation: 'create', type: 'outcome', timestamp: 323 },
            body:
             { marketId: 'id1',
               outcomeId: 'id2',
               name: 'Draw',
               price: '11/10',
               displayed: '0',
               suspended: '1' } 
            }
          
      
        let outcome = new Packet(outcomeString).toJson()
        //console.log(outcome)
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
                suspended: '1' } 
            }
          
        let event = new Packet(eventString).toJson()
        assert.deepEqual(event, expectedObject);
    });

    it('should correctly parse a Market packet string into a Market JSON object containing escaped seperators', function() {
        let marketString = '|40|create|market|231|id1|id2|\\|Full Time Result\\||0|1|';
        let expectedMarketObject =  {
            header: { msgId: 40, operation: 'create', type: 'market', timestamp: 231 },
            body: 
                { eventId: 'id1',
                marketId: 'id2',
                name: '\\|Full Time Result\\|',
                displayed: '0',
                suspended: '1' } 
        }
      
        let market = new Packet(marketString).toJson()
        assert.deepEqual(market, expectedMarketObject);
    });

    it('should parse an Outcome packet string into an Outcome JSON object which contains escaped seperators', function() {
        let outcomeString = '|42|create|outcome|323|id1|id2|\\|Draw\\||\\|11/10\\||0|1|';
        let expectedMarketObject =  {
            header:{ msgId: 42, operation: 'create', type: 'outcome', timestamp: 323 },
            body:
             { marketId: 'id1',
               outcomeId: 'id2',
               name: '\\|Draw\\|',
               price: '\\|11/10\\|',
               displayed: '0',
               suspended: '1' } 
            }
          
      
        let outcome = new Packet(outcomeString).toJson()
        //console.log(outcome)
        assert.deepEqual(outcome, expectedMarketObject);
    });
});

// |40|create|market|1579515914230|ff84e1b2-f224-4e51-9556-3f8f54324ba7|e7ca6259-ea78-4b83-9f22-70c8d92d0a18|Full Time Result|0|1|
// |41|create|outcome|1579515914230|e7ca6259-ea78-4b83-9f22-70c8d92d0a18|d50bb0e4-70d8-418e-a16f-aa5e949b256d|\|Peterborough\||2/5|0|1|
// |42|create|outcome|1579515914230|e7ca6259-ea78-4b83-9f22-70c8d92d0a18|d002b0f7-6ae9-4e7d-9209-0ed527e4b5f8|Draw|11/10|0|1|
