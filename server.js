const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');

const app = express();



const database = {
    users: [
        {
            id: '123',
            name: 'john',
            password: 'cookies',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            password: 'bananas',
            email: 'sally@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
}

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    bcrypt.compare("apples", '$2b$10$9FD2/cEUaw4981qWoXLiuOyAzlCoRgF9lyGdt9itT1DsoInZt3WDa').then(function(result) {
    });
    bcrypt.compare("veggies", '$2b$10$9FD2/cEUaw4981qWoXLiuOyAzlCoRgF9lyGdt9itT1DsoInZt3WDa').then(function(result) {
    });

    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('success');
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        console.log(hash);
    });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    const found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        } 
    })
    if (!found) {
        res.status(400).json('not found');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    const found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            let found = true;
            user.entries++;
            return res.json(user.entries);
        } 
    });
    if (!found) {
        res.status(400).json('not found');
    }
});

app.listen(3000, ()=> {
    console.log('app is running');
});