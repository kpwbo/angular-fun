const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const compression = require('compression');
const spdy = require('spdy');
const fs = require('fs');
const http = require('http');

const config = require('./config');
const api = require('./api');

// Redirect HTTP to HTTPS
http.createServer((req, res) => {
  res.writeHead(301, { Location: 'https://' + req.headers['host'] + req.url });
  res.end();
}).listen(8000, (error) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }
  console.log('HTTP Listening to port 8000');
});

const app = express();
const port = +process.env.PORT || 3000;
const options = {
  key: fs.readFileSync(path.join(__dirname, 'server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'server.crt'))
};

app.use(compression());
app.use(bodyParser.text());
app.use(session({
  secret: config.session_secret,
  resave: false,
  saveUninitialized: false
}));
app.u

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api', api);

app.get('*/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

spdy.createServer(options, app).listen(port, (error) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }
  console.log(`HTTPS listening on port ${port}...`);
});
