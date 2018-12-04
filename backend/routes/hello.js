var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.session.counter) {
    req.session.counter++;
    res.send(req.session.counter.toString());
  } else {
    req.session.counter = 1;
    res.send('welcome to the session demo. refresh!')
  }
});


module.exports = router;
