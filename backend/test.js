const fetch = require('node-fetch');

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
            let succeeded = value;
            succeeded != succeeded;
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


// Get Users activity
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
            succeeded = false;
            returned_arr = JSON.parse(value)
            returned_arr.forEach(userActivity => {
                if (userActivity[0] == 'admin') {
                    succeeded = userActivity[1][0] == 'Signed up at the beginning of time';
                }
            });
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

Test1()
Test2()
Test3()