let net = require('net');
let DataTypes = require('./dataTypes')
let Header = DataTypes.Header;
let Event = DataTypes.Event;
let Market = DataTypes.Market;
let Outcome = DataTypes.Outcome


const newLineMatcher = /\r?\n/;
const pipeMatcherWithEscapeExclusion = /(\\.|[^\|])+/g;

let parsePacket = function(data) {
    var packets = data.toString().split(newLineMatcher).filter(packet => packet.length > 0) // Remove end of message lines 

    packets.forEach(function(value) {
        var escapedString = value.match(pipeMatcherWithEscapeExclusion)
        var header = new Header(escapedString.slice(0, 4))
        var body = escapedString.slice(4)

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
                console.warn ('Failed to parse')
        }
    })

}


class TCPConsumer {

    constructor(host = '127.0.0.1', port = 8282) {
        this.port = port;
        this.host = host;
        this.client = new net.Socket();
        this.client.on('data', data => parsePacket(data));
        this.client.on('close', () => {console.log('Connection closed')})
    }


    startReceivingPackets() {
        this.client.connect(this.port, this.host, function() {
            console.log('Connected');
        });
    }
}


let consumer = new TCPConsumer();
consumer.startReceivingPackets();