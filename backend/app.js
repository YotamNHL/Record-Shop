const express = require('express')
const cors = require('cors')
const axios = require('axios')

const redis = require('redis');
const client = redis.createClient();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json());



client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});




app.get('/', (req,res) => {
    console.log("You made it yotam")
    client.set('my test key', 'Fuck it', redis.print);

    client.get('my test key', function (error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log('GET result ->' + result);
    });
})

app.post('/signup', (req, res) => {
    // client.set('my test key', 'Fuck it', redis.print);
    let username = req.body.username;
    let password = req.body.password;
    console.log("Username is:" + username)
    console.log("Password is:" + password)
    client.set(username, password)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})