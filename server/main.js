const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const config = require('./config');
const api = require('./api');

const app = express();
const port = 3000;

app.use(bodyParser.text());
app.use(session({
  secret: config.session_secret,
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api', api);

app.get('*/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
