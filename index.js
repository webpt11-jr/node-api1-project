// implement your API here

// referencing our express module
const express = require('express');
const cors = require('express');

// 
const db = require('./data/db');

//server object required to listen
const server = express();

//callback needed to listen via console
server.listen(4001, () => {
    console.log('listening on port 4001');
})

server.use(express.json());
server.use(cors());

server.get('/', (req,res) => {
    res.send(`<h1>Jr's Node API 1 Project</h1>`);
})