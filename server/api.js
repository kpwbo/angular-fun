const express = require('express');
const request = require('request');
const config = require('./config');
const router = express.Router();

router.post('/getReply', (req, res) => {
  const input = req.body;
  const cs = req.session.cs || '';
  request(`https://www.cleverbot.com/getreply?key=${config.api_key}&input=${input}&cs=${cs}`, (error, response, body) => {
    if (error) {
      res.status(404).send(error);
    } else {
      const parsed = JSON.parse(body);
      req.session.cs = parsed.cs;
      res.send(parsed.output);
    }
  });
});

module.exports = router;
