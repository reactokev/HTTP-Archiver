const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const generatePassword = require('password-generator');
let Nightmare = require('nightmare')
let harPlugin = require('nightmare-har-plugin')
var data1;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.post('/api/post', function (req, res) {
  res.send(req.body);
  data1 = req.body;
})

app.get('/api/get', (req, res) => {
  harPlugin.install(Nightmare)

  let nightmare = Nightmare(Object.assign(harPlugin.getDevtoolsOptions()))

  nightmare
    .waitForDevtools()
    .goto(`${data1.url}`)
    .getHAR()
    // .type('input[title="Search"]', 'facebook')
    // .click('input[type="submit"]')
    // .click('a[href^="https://www.facebook.com/login/"]')
    .type('input[type="text"]','')
    .type('input[type="text"]','917892621974')
    .type('input[type="password"]','justicehabs1')
    .click('button[type="submit"]')
    .wait(20000)
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

