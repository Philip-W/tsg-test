class Header {
  constructor(headerDetails) {
    this.msgId = parseInt(headerDetails[0]);
    this.operation = headerDetails[1];
    this.type = headerDetails[2];
    this.timestamp = parseInt(headerDetails[3]);
  }
}

module.exports = { Header };
