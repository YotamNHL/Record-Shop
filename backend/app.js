const express = require('express')
const cors = require('cors')
const axios = require('axios')
const asyncRedis = require('async-redis')
const { Console } = require('console');
const { userInfo } = require('os');
const { json } = require('body-parser');
const moment = require('moment')
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
    client.set('admin', JSON.stringify({'password': 'admin',
                                            'shopping_cart': {},
                                            'user_activity': ['Signed up at the beginning of time'],
                                            'instance_type': 'user_info'}))
    client.set('R1', JSON.stringify({'title': 'Dark Side of the Moon', 'image_url': '../images/R1.jpg', 'price': '15', 'instance_type': 'item_info'}));
    client.set('R2', JSON.stringify({'title': 'And Justice For All', 'image_url': '../images/R2.jpg', 'price': '15', 'instance_type': 'item_info'}));
    client.set('R3', JSON.stringify({'title': 'Scence from a Memory', 'image_url': '../images/R3.jpg', 'price': '15', 'instance_type': 'item_info'}));
    client.set('R4', JSON.stringify({'title': 'Hail Stan', 'image_url': '../images/R4.jpg', 'price': '15', 'instance_type': 'item_info'}));
    client.set('R5', JSON.stringify({'title': 'Toxicity', 'image_url': '../images/R5.jpg', 'price': '15', 'instance_type': 'item_info'}));
    client.set('P1', JSON.stringify({'title': 'Crosley Supreme edition', 'image_url': '../images/P1.png', 'price': '50', 'instance_type': 'item_info'}));
    client.set('P2', JSON.stringify({'title': 'Crosley Ultra light edition', 'image_url': '../images/P2.png', 'price': '50', 'instance_type': 'item_info'}));
    client.set('P3', JSON.stringify({'title': 'Flatpack Bluetooth enabled mode', 'image_url': '../images/P3.png', 'price': '50', 'instance_type': 'item_info'}));
    client.set('P4', JSON.stringify({'title': 'TurnTable Mclarence', 'image_url': '../images/P4.png', 'price': '50', 'instance_type': 'item_info'}));
    client.set('P5', JSON.stringify({'title': 'CompactDisc Coolz', 'image_url': '../images/P5.png', 'price': '50', 'instance_type': 'item_info'}));
    client.set('C1', JSON.stringify({'title': '10,000 Days', 'image_url': '../images/C1.jpg', 'price': '10', 'instance_type': 'item_info'}));
    client.set('C2', JSON.stringify({'title': 'In Absentia', 'image_url': '../images/C2.jpg', 'price': '10', 'instance_type': 'item_info'}));
    client.set('C3', JSON.stringify({'title': 'Flying Colors', 'image_url': '../images/C3.jpg', 'price': '10', 'instance_type': 'item_info'}));
    client.set('C4', JSON.stringify({'title': 'All Is One', 'image_url': '../images/C4.jpg', 'price': '10', 'instance_type': 'item_info'}));
    client.set('C5', JSON.stringify({'title': 'Shabaq Sameh', 'image_url': '../images/C5.jpg', 'price': '10', 'instance_type': 'item_info'}));
    client.set('V1', JSON.stringify({'title': 'Signed picture of Bob Saget', 'image_url': '../images/V1.jpg', 'price': '100', 'instance_type': 'item_info'}));
    client.set('V2', JSON.stringify({'title': 'Vintage unused YoYo', 'image_url': '../images/V2.jpg', 'price': '100', 'instance_type': 'item_info'}));
    client.set('V3', JSON.stringify({'title': 'Empty box', 'image_url': '../images/V3.jpg', 'price': '100', 'instance_type': 'item_info'}));
    client.set('V4', JSON.stringify({'title': 'Cat', 'image_url': '../images/V4.jpg', 'price': '100', 'instance_type': 'item_info'}));
    client.set('V5', JSON.stringify({'title': 'Discoball', 'image_url': '../images/V5.jpg', 'price': '100', 'instance_type': 'item_info'}));

});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});


let getItemInfo = async (id) => {
    let userInfo = await client.get(id);
    return userInfo;
}

app.post('/signup', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let getUserName = await getItemInfo(username)
    if(!getUserName) {
        let cred_dict = {'password': password,
                         'shopping_cart': {},
                         'user_activity': ['Signed up at ' + moment().format()],
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
    let rememberMe = req.body.rememberMe;
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
        console.log(token);
        userInfo = JSON.parse(userInfo);
        userActivity = userInfo['user_activity'];
        userActivity.push('New login at ' + moment().format());
        userInfo['user_activity'] = userActivity;
        await client.set(username, JSON.stringify(userInfo));
        console.log(rememberMe)
        await client.set(token, username);
        if(rememberMe) {
            res.cookie('session_cookie', token);
        }
        else {
            var date = new Date();
            date.setTime(date.getTime() + (1800000));
            res.cookie('session_cookie', token, {expires: date});
        }
        res.send(true)
    }
})

app.post('/logout', async (req,res) => {
    let username = req.body.username;
    let userInfo = await getItemInfo(username);
    userInfo = JSON.parse(userInfo);
    let userActivity = userInfo['user_activity'];
    userActivity.push('New logout at ' + moment().format());
    userInfo['user_activity'] = userActivity;
    await client.set(username, JSON.stringify(userInfo));
    res.send(true);
})

app.post('/getUsernameFromCookie', async (req, res) => {
    let sessionCookie = req.body.sessionCookie;
    let username = await client.get(sessionCookie);
    res.send(username);
})

app.post('/addItemToCart', async (req, res) => {
    let username = req.body.username;
    let itemId = req.body.itemId;
    let userInfo = await getItemInfo(username);
    userInfo = JSON.parse(userInfo);
    console.log('Adding The Item' + String(itemId));
    let userActivity = userInfo['user_activity'];
    userActivity.push('Added the item ' + itemId + ' at ' + moment().format());
    userInfo['user_activity'] = userActivity;
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
    console.log('Username is: ' + username);
    let userInfo = await getItemInfo(username);
    userInfo = JSON.parse(userInfo);
    console.log('Userinfo is: ' + JSON.stringify(userInfo));
    let shoppingCart = userInfo['shopping_cart'];
    console.log('Shopping cart is: ' + JSON.stringify(shoppingCart));
    let finalShoppingCart = [];
    let totalPriceOfEverything = 0.0;
    for (let id in shoppingCart){
        console.log('Item ID is: ' + id);
        let numOfItems = shoppingCart[id];
        console.log('Number Of Items: ' + numOfItems);
        let itemInfo = await getItemInfo(id);
        console.log('Item Info is: ' + itemInfo);
        itemInfo = JSON.parse(itemInfo);
        console.log('Type of ItemInfo variable is: ' + typeof(itemInfo))
        let itemTitle = itemInfo['title'];
        console.log('Item title is: ' + itemTitle);
        let imageUrl = itemInfo['image_url'];
        console.log('Item URL is: ' + imageUrl);
        let priceOfOneItem = itemInfo['price'];
        console.log('Item price is: ' + priceOfOneItem);
        let priceOfAllItems = priceOfOneItem * numOfItems;
        console.log('Price of all items is: ' + priceOfAllItems)
        totalPriceOfEverything += priceOfAllItems;
        finalShoppingCart.push({id: {'title': itemTitle,
                                    'imageUrl': imageUrl,
                                    'amount': numOfItems,
                                    'total_price': priceOfAllItems}});
    }

    console.log('Final Shopping Cart is: ' + finalShoppingCart);
    res.send([finalShoppingCart, totalPriceOfEverything]);
})

app.get('/getAllUsersActivity', async (req,res) => {
    let listOfAllKeys = await client.keys('*');
    let final_payload = []
    for (let key in listOfAllKeys) {
        try {
            let itemInfo = await getItemInfo(listOfAllKeys[key]);
            itemInfo = JSON.parse(itemInfo);
            if(itemInfo['user_activity']) {
                final_payload.push([listOfAllKeys[key], itemInfo['user_activity']])
            }
        }
        catch(e) {
        }
    }
    res.send(final_payload)
})

app.post('/checkout', async (req,res) => {
    let username = req.body.username;
    let pricePaid = req.body.pricePaid;
    let userInfo = await getItemInfo(username);
    userInfo = JSON.parse(userInfo);
    userInfo['shopping_cart'] = {};
    let userActivity = userInfo['user_activity']
    userActivity.push('New payment for an amount of ' + pricePaid + '$ at ' +  moment().format());
    userInfo['user_activity'] = userActivity;
    await client.set(username, JSON.stringify(userInfo));
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

