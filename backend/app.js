const express = require('express')
const cors = require('cors')
const axios = require('axios')
const asyncRedis = require('async-redis')
const { Console } = require('console');
const { userInfo } = require('os');
const { json } = require('body-parser');
var crypto = require('crypto');

const client = asyncRedis.createClient();
const app = express()
const port = 5000

let config = {
    origin: true,
    credentials: true
}

app.use(cors(config));
app.options('*', cors(config))
app.use(express.json());



client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});


let getItemInfo = async (id) => {
    let userInfo = await client.get(id);
    return userInfo;
}

app.post('/getUsernameFromCookie', async (req, res) => {
    let sessionCookie = req.body.sessionCookie;
    let username = await client.get(sessionCookie);
    res.send(username)
})

app.post('/signup', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let getUserName = await getItemInfo(username)
    if(!getUserName) {
        let cred_dict = {'password': password,
                         'shopping_cart': {},
                         'instance_type': 'user_info'}
        await client.set(username, JSON.stringify(cred_dict))
        console.log("OKAY! You signed up now");
        res.send(false);
        }
    else {
        console.log("USERNAME TAKEN");
        res.send(true);
    }  
})

app.post('/signin', async (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    let userInfo = await getItemInfo(username)
    const token = crypto.randomBytes(20).toString('hex');

    if(!userInfo) {
        console.log('Username doesnt exist')
        res.send(false)
    }
    else if (JSON.parse(userInfo).password !== password) {
        console.log('Wrong password')
        res.send(false)
    }
    else {
        console.log(token)
        await client.set(token, username)
        res.cookie('session_cookie', token)
        res.send(true)
    }
})

app.post('/addItemToCart', async (req, res) => {
    let username = req.body.username;
    let itemId = req.body.itemId;
    let userInfo = await getItemInfo(username);
    userInfo = JSON.parse(userInfo);
    console.log('Adding The Item' + String(itemId))
    let newAmountOfItem = 1;
    try {
        if(!userInfo['shopping_cart']) {
            let tempDict = {};
            tempDict[String(itemId)] = newAmountOfItem;
            userInfo['shopping_cart'][String(itemId)] = tempDict 
        }
        else if(String(itemId) in userInfo['shopping_cart']) {
            newAmountOfItem += userInfo['shopping_cart'][String(itemId)];
        }
        userInfo['shopping_cart'][String(itemId)] = newAmountOfItem;
        await client.set(username, JSON.stringify(userInfo));
        console.log('Current user info: ' + JSON.stringify(userInfo))
    }
    catch(e) {
        Promise.reject;
    }
    res.sendStatus(200);
})

app.post('/getUserShoppingCart', async (req, res) => {
    let username = req.body.username;
    let userInfo = await getItemInfo(username);
    shoppingCart = userInfo['shopping_cart'];
    finalShoppingCart = [];
    totalPriceOfEverything = 0.0
    shoppingCart.array.forEach(id => {
        numOfItems = shoppingCart[id];
        itemInfo = getItemInfo(id);
        itemTitle = itemInfo['title']
        imageUrl = itemInfo['image_url']
        priceOfOneItem = itemInfo['price'];
        priceOfAllItems = priceOfOneItem * numOfItems;
        totalPriceOfEverything += priceOfAllItems
        finalShoppingCart.append({id: {'title': title,
                                       'imageUrl': imageUrl,
                                       'amount': numOfItems,
                                       'total_price': priceOfAllItems}});
    });        
    
    res.send([finalShoppingCart, totalPriceOfEverything]);
})

app.post('/checkout', async (req,res) => {
    let username = req.body.username;
    let userInfo = await getItemInfo(username);
    userInfo = JSON.parse(userInfo);
    userInfo['shopping_cart'] = {};
    await client.set(username, JSON.stringify(userInfo));
    res.sendStatus(200);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})