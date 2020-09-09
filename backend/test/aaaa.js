const fetch = require('node-fetch');
const axios = require('axios')
axios.defaults.withCredentials = true;

// Sign in with admin credentials
function Test1() {
    return fetch(
        `http://localhost:5000/signin`,
        {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': 'admin',
                'password': 'admin',
                'rememberMe': 'false'
            })
        }).then(fetchResponse => fetchResponse.text()
        ).then(function (value) {
            let succeeded = value;
            console.log(value)

            if (succeeded) {
                console.log(`Test 1 succeeded`);
            }
            else {
                console.log(`Test 1 failed`)
            }
        })
        .catch(function (err) {
            console.log('Test 1 FAILURE with error');
        });
}

// Sign in with wrong admin credentials
function Test2() {
    return fetch(
        `http://localhost:5000/signin`,
        {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': 'admin',
                'password': 'wrongPassword',
                'rememberMe': 'false'
            })
        }).then(fetchResponse => fetchResponse.text()
        ).then(function (value) {
            console.log(value)
            let succeeded = !value;
            if (succeeded) {
                console.log(`Test 2 succeeded`);
            }
            else {
                console.log(`Test 2 failed`)
            }
        })
        .catch(function (err) {
            console.log('Test 2 FAILURE with error');
        });
}


// Sign in with wrong admin credentials
function Test3() {
    return fetch(
        `http://localhost:5000/getAllUsersActivity`,
        {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(fetchResponse => fetchResponse.text()
        ).then(function (value) {
            console.log(value)
            let succeeded = !value;
            if (succeeded) {
                console.log(`Test 3 succeeded`);
            }
            else {
                console.log(`Test 3 failed`)
            }
        })
        .catch(function (err) {
            console.log('Test 3 FAILURE with error ' + err);
        });
}


function Test4() {
    return fetch(`http://localhost:5000/getAllUsersActivity`
        ).then(fetchResponse => fetchResponse.text()
        ).then(function (value) {
            console.log(value)
            let succeeded = !value;
            if (succeeded) {
                console.log(`Test 3 succeeded`);
            }
            else {
                console.log(`Test 3 failed`)
            }
        })
        .catch(function (err) {
            console.log('Test 3 FAILURE with error ' + err);
        });
}

function Test6() {
    return fetch(`http://localhost:5000/testing`
        ).then(fetchResponse => fetchResponse.text()
        ).then(function (value) {
            console.log(value)
            let succeeded = !value;
            if (succeeded) {
                console.log(`Test 3 succeeded`);
            }
            else {
                console.log(`Test 3 failed`)
            }
        })
        .catch(function (err) {
            console.log('Test 3 FAILURE with error ' + err);
        });
}

function Test7() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://localhost:5000/testing", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

Test7()