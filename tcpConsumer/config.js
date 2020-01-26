let config = {
	tcp_stream_host: process.env.TCP_STREAM_HOST || 'localhost',
	tcp_stream_port: process.env.TCP_STREAM_PORT || 8282,
	kafka_host: process.env.KAFKA_HOST || 'localhost:9092',
	kafka_topic: process.env.KAFKA_TOPIC || 'dev.betting'
}

module.exports = { config }