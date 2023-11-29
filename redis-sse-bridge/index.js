'use strict'

/**
 * Module dependencies
 */

const http = require('http')

/**
 * To test, publish something on 'test-http' channel
 *
 * $ redis-cli publish test-http testmessage
 */

// stream

const subscribe = require('redis-subscribe-sse')

// http server
const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
const REDIS_CHANNEL = process.env.REDIS_CHANNEL || 'hints'

let server = http.createServer((req, res) => {
  let sse = subscribe({
    ioredis: {
      host: REDIS_HOST,
    },
    host: REDIS_HOST,
    channels: REDIS_CHANNEL
  })

  console.log('New connection')

  req.setTimeout(Number.MAX_VALUE)

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  sse.pipe(res)
})

server.listen(3000, () => {
  console.log('HTTP server listening on port 3000')
  console.log('Subscribing host: ' + REDIS_HOST + ' / channel: ' + REDIS_CHANNEL)
})