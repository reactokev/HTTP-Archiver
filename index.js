const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const generatePassword = require('password-generator');
let Nightmare = require('nightmare')
let harPlugin = require('nightmare-har-plugin')
var data1;
var facebookdata;
var googledata;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.post('/api/post/facebook', function (req, res) {
  res.send(req.body);
  facebookdata = req.body;
})

app.post('/api/post/google', function (req, res) {
  res.send(req.body);
  googledata = req.body;
})

app.post('/api/post/url', function (req, res) {
  res.send(req.body);
  data1 = req.body;
})

app.get('/api/get/facebook', (req, res) => {
  harPlugin.install(Nightmare)

  let nightmare = Nightmare(Object.assign(harPlugin.getDevtoolsOptions()))
  nightmare
    .waitForDevtools()
    .goto('http://facebook.com/login')
    .getHAR()
    .type('input[type="text"]','')
    .type('input[type="text"]',`${facebookdata.username}`)
    .type('input[type="password"]',`${facebookdata.password}`)
    .click('button[type="submit"]')
    .wait(20000)
    .getHAR()
    .then((result) => { res.json(result) })
    .catch((error) => console.error(error))
});

app.get('/api/get/url', (req, res) => {
  harPlugin.install(Nightmare)

  let nightmare = Nightmare(Object.assign(harPlugin.getDevtoolsOptions()))
    nightmare
    .waitForDevtools()
    .goto(`${data1.url}`)
    .getHAR()
    .then((result) => { res.json(result) })
    .catch((error) => console.error(error))
  
});

app.get('/api/get/google', (req, res) => {
  harPlugin.install(Nightmare)

  let nightmare = Nightmare(Object.assign(harPlugin.getDevtoolsOptions()))
    nightmare
    .waitForDevtools()
    .goto('http://www.google.com')
    .type('input[type="text"]',`${googledata.content}`)
    .click('button[type="submit"]')
    .getHAR()
    .then((result) => { res.json(result) })
    .catch((error) => console.error(error))
  
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

