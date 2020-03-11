// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();

server.listen(4001, () => {
    console.log('listening on port 4001');
})

server.use(express.json());
