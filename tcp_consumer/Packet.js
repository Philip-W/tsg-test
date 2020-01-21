let DataTypes = require('./dataTypes')
let Header = DataTypes.Header;
let Event = DataTypes.Event;
let Market = DataTypes.Market;
let Outcome = DataTypes.Outcome

const pipeMatcherWithEscapeExclusion = /(\\.|[^\|])+/g;

class Packet {
    constructor(packetString){
        this.packetString = packetString;
    } 

    toJson() {
        var escapedString = this.packetString.match(pipeMatcherWithEscapeExclusion)
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
    }
}

module.exports = { Packet }