var net = require('net');

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

var client = new net.Socket();
client.connect(8282, '127.0.0.1', function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
    var packets = data.toString().split(/\r?\n/).filter(packet => packet.length > 0) // Remove end of message lines 

    packets.forEach(function(value) {
        var escapedString = value.match(/(\\.|[^\|])+/g)
        var header = new Header(escapedString.slice(0, 4))
        var body = escapedString.slice(4)
        // Using header type decide which type of object to create 
        switch (header.type){
            case 'event':
                console.log(new Event(header, body))
                break;
            case 'market':
                console.log(new Market(header, body))
                break;
            case 'outcome':
                console.log(new Outcome(header, body))
                break
            default:
                console.warn ('FAiled to parse')
        }
    })

});

client.on('close', function() {
	console.log('Connection closed');
});

