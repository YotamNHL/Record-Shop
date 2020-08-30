const express = require('express')
const cors = require('cors')
const axios = require('axios')
const asyncRedis = require('async-redis')
const { Console } = require('console');
const { userInfo } = require('os');
const { json } = require('body-parser');
const client = asyncRedis.createClient();
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

getUserInfo = async (username) => {
    let userInfo = await client.get('username:' + username);
    return userInfo;
}


app.post('/signup', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let getUserName = await getUserInfo(username)
    if(!getUserName) {
        let cred_dict = {'password': password,
                                    'instance_type': 'credentials'}
        await client.set('username:' + username, JSON.stringify(cred_dict))
        console.log("OKAY! You signed up now");
        res.send(false);
        }
    else {
        console.log("USERNAME TAKEN");
        res.send(true);
    }  
})

app.post('/signin', async (req,res) => {
    let given_username = req.body.username;
    let given_password = req.body.password;
    let userInfo = await getUserInfo(given_username)
    console.log(given_username)
    console.log(given_password)
    console.log(userInfo)
    if(!userInfo) {
        console.log('Username doesnt exist')
        res.send(false)
    }
    else if (JSON.parse(userInfo).password !== given_password) {
        console.log('Wrong password')
        res.send(false)
    }
    else {
        res.send(true)
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})