var assert = require('assert');
let DataTypes = require('../src/DataTypes')
let Header = DataTypes.Header;
let Event = DataTypes.Event;
let Market = DataTypes.Market;
let Outcome = DataTypes.Outcome

describe('Header', function() {
    it ('should parse a header list into the correct keys', function() {
        var input = ['1', 'operation', 'type', '1234'];
        var header = new Header(input);
        assert.equal(header.msgId, 1);
        assert.equal(header.operation, 'operation');
        assert.equal(header.type, 'type');
        assert.equal(header.timestamp, 1234);
    });
});

describe('Event', function() {
    let header = new Header(['1', 'operation', 'event', '2']);
    let input = ['eventid', 'category', 'subCat', 'name', '23131', '1', '1']

    it('should set the header correctly', function() {
        var event = new Event(header, input)
        assert.equal(event.header.msgId, 1);
        assert.equal(event.header.operation, 'operation');
        assert.equal(event.header.type, 'event');
        assert.equal(event.header.timestamp, 2);
    });

    it('should parse the contents of the input list into the correct keys', function() {
        var event = new Event(header, input)
        assert.equal(event.body.eventId, 'eventid');
        assert.equal(event.body.category, 'category');
        assert.equal(event.body.subCategory, 'subCat');
        assert.equal(event.body.name, 'name');
        assert.equal(event.body.startTime, 23131);
        assert.equal(event.body.displayed, '1');
        assert.equal(event.body.suspended, '1');
    });

    it('should raise an exception when recieving an input which is not an Event', function() {
        var wrongHeader = new Header(['1', 'operation', 'notAnEvent', 'time']);
        assert.throws(function(){new Event(wrongHeader, input)}, Error, "Expected type 'event', got: notAnEvent");
    });
});


describe('Market', function(){
    let header = new Header(['1', 'operation', 'market', '232']);
    let input = ['eventid', 'marketid', 'name','0', '1']

    it('should set the header correctly', function() {
        var market = new Market(header, input)
        assert.equal(market.header.msgId, 1);
        assert.equal(market.header.operation, 'operation');
        assert.equal(market.header.type, 'market');
        assert.equal(market.header.timestamp, 232);
    });

    it('should parse the contents of the input list into the correct keys', function(){
        var market = new Market(header, input)
        assert.equal(market.body.eventId, 'eventid');
        assert.equal(market.body.marketId, 'marketid');
        assert.equal(market.body.name, 'name');
        assert.equal(market.body.displayed, '0');
        assert.equal(market.body.suspended, '1');
    });

    it('should raise an exception when recieving an input which is not a Market', function() {
        var wrongHeader = new Header(['1', 'operation', 'notAMarket', 'time']);
        assert.throws(function(){new Market(wrongHeader, input)}, Error, "Expected type 'market', got: notAMarket");
    });
});

describe('Outcome', function() {
    let header = new Header(['1', 'operation', 'outcome', '232']);
    let input = ['marketid', 'outcomeid', 'name', 'price', 'displayed', 'suspended']

    it('should set the header correctly', function() {
        var outcome = new Outcome(header, input)
        assert.equal(outcome.header.msgId, '1');
        assert.equal(outcome.header.operation, 'operation');
        assert.equal(outcome.header.type, 'outcome');
        assert.equal(outcome.header.timestamp, '232');
    });

    it('should parse the contents of the input list into the correct keys', function(){
        var outcome = new Outcome(header, input)
        assert.equal(outcome.body.marketId, 'marketid');
        assert.equal(outcome.body.outcomeId, 'outcomeid');
        assert.equal(outcome.body.name, 'name');
        assert.equal(outcome.body.price, 'price')
        assert.equal(outcome.body.displayed, 'displayed');
        assert.equal(outcome.body.suspended, 'suspended');
    });

    it('should raise an exception when recieving an input which is not an Outcome', function() {
        var wrongHeader = new Header(['1', 'operation', 'notAnOutcome', 'time']);
        assert.throws(function(){new Outcome(wrongHeader, input)}, Error, "Expected type 'market', got: notAnOutcome");
    });
});