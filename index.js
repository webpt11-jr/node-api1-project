// implement your API here
// referencing our express module
const express = require('express');
const cors = require('express');

// importing the db.js
const db = require('./data/db');

//server object required to listen
const server = express();

//callback needed to listen via console
server.listen(4001, () => {
    console.log('listening on port 4001');
})

server.use(express.json());
server.use(cors());

//sending back a string in response to the get request [x]
server.get('/', (req,res) => {
    res.send(`<h1>Jr's Node API 1 Project</h1>`);
})




// READ - GET	/api/users	Returns an array of all the user objects contained in the database. 
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json({users});
        })
        .catch(err => {
            res.status(500).json({sucess: false, err});
        })
})





// GET	/api/users/:id	Returns the user object with the specified id.
server.get('/api/users/:id', (req, res) => {
    // const id = req.params.id; without destructuring
    const {id} = req.params;

    db.findById(id)
        .then(users => {
            res.status(200).json({users});
        })
        .catch(err => {
            res.status(500).json({success: false, err});
        })
})





// POST	/api/users	Creates a user using the information sent inside the request body.
server.post('/api/users', (req, res) => {
    const usersBody = req.body;
    console.log(usersBody);

    db.insert(usersBody)
        .then(users => {
            res.status(201).json({success: true, users})
        })
        .catch(err => {
            res.status(500).json({success: false, err})
        })
})





// PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put('/api/users/:id', (req, res) => {
    const {name, bio} = req.body;
    const {id} = req.params;

    if(!name && !bio){
        res.status(400).json(
            {errorMessage: "Please provide name and bio for the user"}
        );
    }

    db.update(id, { name, bio })
    .then(updated => {
        if (updated) {
            db.findById(id)
                .then(user => res.status(200).json(user)) //200 means good
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: 'The user information could not be modified.',
                    });
                });
        } else {
            res.status(404).json({
                message: 'The user with the specified ID does not exist.',
            });
        }
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: 'The user information could not be modified.',
        });
    });
})





// DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.
server.delete('/api/users/:id', (req,res) => {
    const {id} = req.params;

    db.remove(id)
        .then(deleted => {
            console.log('deleted', deleted);
            if (deleted){
                res.status(204).json(deleted);
            } else {
                res.status(404).json({
                    message: 'the user with the specified ID does not exist.',
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: 'the user could not be removed',
            })
        })
})