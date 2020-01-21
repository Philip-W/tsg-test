class Header {
    constructor(headerDetails) {
        this.msgId = headerDetails[0]
        this.operation = headerDetails[1]
        this.type = headerDetails[2]
        this.timestamp = headerDetails[3]
    }
}

class Event {
    constructor(header, body) {
        this.header = header;
        this.body = {}
        this.body.eventId = body[0];
        this.body.category = body[1];
        this.body.subCategory = body[2];
        this.body.name = body[3];
        this.body.startTime = body[4];
        this.body.displayed = body[5];
        this.body.suspended = body[6];
    }
}

class Market {
    constructor(header, body) {
        this.header = header;
        this.body = {}
        this.body.eventId = body[0];
        this.body.marketId = body[1];
        this.body.name = body[2];
        this.body.displayed = body[3];
        this.body.suspended = body[4];
    }
} 

class Outcome {
    constructor(header, body){
        this.header = header;
        this.body = {}
        this.body.marketId = body[0]
        this.body.outcomeId = body[1]
        this.body.name = body[2]
        this.body.price = body[3]
        this.body.displayed = body[4]
        this.body.suspended = body[5]
    }
}

module.exports = {
    Header,
    Event,
    Market,
    Outcome
}