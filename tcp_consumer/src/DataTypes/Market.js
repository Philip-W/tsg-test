
class Market {
    constructor(header, body) {
        if(header.type != 'market') {throw new Error("Expected type 'market', got: " + header.type); }
        this.header = header;
        this.body = {}
        this.body.eventId = body[0];
        this.body.marketId = body[1];
        this.body.name = body[2];
        this.body.displayed = body[3];
        this.body.suspended = body[4];
    }
} 

module.exports = { Market }