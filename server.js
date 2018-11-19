console.log('Starting Flashcards application...');

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var request = require('request');

const port = process.env.PORT || 8080;

var app = express();

var getDB = require('./connect.js');

// handlebars setup
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

// bodyparser setup
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(bodyParser.json())

app.get('/', (request, response) => {
    response.render('log.hbs')
});

/**
 * sends the username and password to the DB for validation, if true it redirects to the homepage, 
 * else it renders the login page with a error message
 */
app.post('/login', function(req, res) {
    getDB.login(req.body.email, req.body.password, (user) => {
        if (user === 'failed') {
            res.render('log.hbs', {
                error: 'Wrong email or password'
            });
        } else {
            req.user = user
            res.redirect('/home')
        }
    });
});

/**
 * sends the signup data to the DB for validation, if true it redirects to the homepage, 
 * else it renders the signup page again
 */
app.post('/signup', function (req, res) {
    getDB.signup(req.body.username, req.body.email, req.body.password, (msg) => {
        if (msg === 'failed') {
            // res.render('signup.hbs')
        } else {
            req.msg = msg
            res.redirect('/')
        }
    });
});

/**
 * renders the signup page
 */
app.get('/signup', (request, response) => {
    response.render('log.hbs')
});

app.get('/home', (request, response) => {
    response.render('home.hbs');
});

/**
 * This takes the username and go to the home page at home.hbs
 */
app.get('/home', (req, res) => {
    getDB.readFile(req.user.email, (user) => {
        req.user = user
        res.render('home.hbs', {
            username: req.user.username,
            lists: req.user.lists
        });
    });
});

/**
 * sends the new lists name to the DB to add it. if it returns true then the function sends a response to the webpage.
 */
app.post('/addList', (req, res) => {
    var email = req.user.email
    var list = req.body
    getDB.addListDB(email, list, (msg) => {
        if (msg === 'success') {
            res.send('ok')
        }
    });
});

/**
 * sends a the lists name to the DB to delete it. if it returns true then the function sends a response to the webpage.
 */
app.post('/deleteList', (req, res) => {
    var email = req.user.email
    var list = req.body.list
    getDB.deleteListDB(email, list, (msg) => {
        if (msg === 'success') {
            res.send('ok')
        }
    })
});

/*app.post('/flashList', (req, res) => {
    getDB.readFile(req.user.email, (user) => {
        req.user = user
        req.user.currentList = req.body.radioList
        listIndex = getDB.getListIndex(req.body.radioList, req.user)
        res.render('list.hbs', {
            list: req.user.lists[listIndex]
        });
    });
});*/

app.get('/logout', (req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});