const express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('index');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).redirect('/')
});


module.exports = router;