const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Record = require('../../models/user');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;