require('zone.js/dist/zone-node');
require('reflect-metadata');

const { enableProdMode } = require('@angular/core');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const compression = require('compression');
const { ngExpressEngine } = require('@nguniversal/express-engine');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist/server/main.bundle');

const config = require('./config');
const api = require('./api');

enableProdMode();

const app = express();
const port = +process.env.PORT || 3000;

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../dist/browser'));

app.use(compression());
app.use(bodyParser.text());
app.use(session({
  secret: config.session_secret,
  resave: false,
  saveUninitialized: false
}));

app.use('/api', api);

app.get('*.*', express.static(path.join(__dirname, '../dist/browser')));

app.get('*', (req, res) => {
  res.render(path.join(__dirname, '../dist/browser', 'index.html'), { req });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
