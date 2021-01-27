const fs = require("fs");
const express = require('express');
const path = require('path');
const app = express();
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const MemoryStore = require('memorystore')(session)
let users = {};

const databasePath = process.cwd() + '/UCLEI_server';

const publicPath = path.join(__dirname, '../build');

app.use(express.static(publicPath));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
app.get('/account', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
app.get('/trading', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
app.get('/market', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
app.get('/market/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });

app.use(session({
    name: 'Plumbus',
    secret: 'fleeb_juice',
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, //true by default
        maxAge: 3600000, //milliseconds (1hr)
        sameSite: true //strict
    }
}));

/* begins the event watcher on server start
 * eventWatcher fires every 5 minutes,
 * checking each user's events subscriptions
 * and updating the user's data as required
*/
let today = new Date().toISOString().slice(0,10);


/**********************************************
    Helper Functions
     - handles:
        - checking for valid sessions
        - updating data base  (currently JSON files)
**********************************************/

function isSessionValid(s, u){
    if(s && u){
        return true;
    }
    return false;
}

function updateUserDataBase(){
    fs.writeFileSync(databasePath+ "/database/users/users.json", JSON.stringify(users, null, 2));
    eventWatcher.updateUserDataBase(users);
}

/**********************************************
    Account authentication Get and Post Requests:
     - handles a users:
        - authentication to the server
        - logging in / out
        - creating session & cookie
        - destroying cookie on logout
**********************************************/
app.post('/authentication', (req, res) => {
    users = JSON.parse(fs.readFileSync(databasePath + "/database/users/users.json"));
    let data = "";
    req.on('data', (chunk) => {
        data = JSON.parse(chunk);
    });

    req.on('end', () => {
      console.log(data);

    let username = data.username;
    let password = data.password;
    authenticate(username, password);
    res.end();
    });

    function authenticate(username, password) {
        if(users[username] && users[username]['password'] === password) {
            console.log(`Client ${username} authenticated succesfully.`);
            req.session.user = users[username]['username'];
            const login_data = {
                authentication: 'true',
                session_id: req.sessionID
            };
            res.write(JSON.stringify(login_data));
        }
        else if(users[username] && users[username]['password'] !== password) {
          const login_data = {
              authentication: 'passwordError',
              session_id: false
          };
          res.write(JSON.stringify(login_data));
        } else {
            const login_data = {
                authentication: 'usernameError',
                session_id: false
            };
            res.write(JSON.stringify(login_data));
        }
    }
});

app.post('/register', (req, res) => {

    users = JSON.parse(fs.readFileSync(databasePath + "/database/users/users.json"));

    let data = "";
    req.on('data', (chunk) => {
        data = JSON.parse(chunk);
    });

    req.on('end', () => {
        console.log(data);

    let username = data.username;
    let password = data.password;
    let name = data.name;
    register(username, password, name);
    res.end();
    });

    function register(username, password, name) {
        if(!users[username]) {
            let newUser = {
                username: username,
                password: password,
                name: name,
                watchlist: [],
                openOrders: [],
                eventList: [],
                ownedStocks: [],
                activity: [],
                account: {
                    accountName: "Tax Free Savings Account",
                    cashBalance: 0,
                    investmentBalance: 0,
                    totalDeposit: 0
                },
                balanceGrowth: "0"
            }

            users[username] = newUser;
            req.session.user = users[username]['username'];

            const login_data = {
                authentication: 'true',
                session_id: req.sessionID
            };
            updateUserDataBase();
            res.write(JSON.stringify(login_data));
        }
        else if(users[username]) {
            const login_data = {
                authentication: 'usernameError',
                session_id: false
            };
            res.write(JSON.stringify(login_data));
        }
        else {
            res.write("false");
            console.log(`\n${username} attempted to register.\n`);
        }
    }
});

app.get("/logout", function(req, res){
    console.log(`${req.session.user} Logged Out, Cookie destroyed`);
    req.session.destroy();

});

app.get("/session", function(req, res){
    let data = '';
    if (req.session.user){
        data = req.sessionID;  
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/JSON");
    res.write(JSON.stringify(data));
    res.end();
});

/**********************************************
 Server Information
********************************************* */

app.listen(process.env.PORT || 5000);

    console.log(`Please ensure the react-app is running and navigate to ${process.env.PORT || 5000}`);
