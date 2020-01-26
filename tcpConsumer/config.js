let config = {
	tcp_stream_host: process.env.TCP_STREAM_HOST || 'localhost',
	tcp_stream_port: process.env.TCP_STREAM_PORT || 8282
}

module.exports = { config }